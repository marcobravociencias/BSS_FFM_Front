package com.mx.totalplay.ffm.cloudweb.plantainterna.service.impl;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import java.util.HashMap;
import java.util.Map;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;
import com.google.gson.Gson;
import com.mx.totalplay.ffm.cloudweb.plantainterna.model.consultaOTPI.ImagenesConfig;
import com.mx.totalplay.ffm.cloudweb.plantainterna.model.consultaOTPI.ParamConsultaOTPI;
import com.mx.totalplay.ffm.cloudweb.plantainterna.model.consultaOTPI.ResponseImagenEvidencia;
import com.mx.totalplay.ffm.cloudweb.plantainterna.service.ConsultaOTService;
import com.mx.totalplay.ffm.cloudweb.plantainterna.utils.ConstConsultaOT;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.DataTableResponse;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.LoginResult;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.ServiceResponseResult;
import com.mx.totalplay.ffm.cloudweb.utilerias.utils.ConstantesGeneric;
import com.mx.totalplay.ffm.cloudweb.utilerias.utils.ConsumeRest;
import com.mx.totalplay.ffm.cloudweb.utilerias.utils.UtileriaGeneral;

@Service
public class ImplConsultaOTService implements ConsultaOTService {

    private final Logger logger = LogManager.getLogger(ImplConsultaOTService.class.getName());
    private final ConsumeRest restCaller;
    private final ConstantesGeneric constantesGeneric;
    private final Environment env;
    private final ConstConsultaOT constConsultaOT;
    private final UtileriaGeneral utilerias;
    Gson gson = new Gson();

    @Autowired
    public ImplConsultaOTService(ConsumeRest restCaller, ConstantesGeneric constantesGeneric, Environment env, ConstConsultaOT constConsultaOT, UtileriaGeneral utilerias) {
        this.restCaller = restCaller;
        this.constantesGeneric = constantesGeneric;
        this.env = env;
        this.constConsultaOT = constConsultaOT;
        this.utilerias = utilerias;
    }


    @Override
    public ServiceResponseResult consultaFiltros(String params) {
        JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
        JsonObject login = new JsonObject();
        login.addProperty(env.getProperty("param.textus.PI"), constantesGeneric.getTextIpUsuario());
        login.addProperty(env.getProperty("param.textus.drowssap"), constantesGeneric.getTextCredPad());
        login.addProperty(env.getProperty("param.textus.resU"), constantesGeneric.getTextCredUs());
        jsonObject.add("Login", login);

        logger.info("json object params## " + jsonObject.toString());

        String url = "http://10.216.47.89" + constConsultaOT.getFiltrosConsultaOT();
        ServiceResponseResult response = restCaller.callPostParamString(url, jsonObject.toString());
        logger.info("Result ImplConsultaOTService metodo consultaFiltros" + gson.toJson(response));
        return response;
    }

    @Override
    public DataTableResponse consultaOT(ParamConsultaOTPI paramsOT) {
        logger.info("ImplConsultaOTService.class [metodo consultaInformacionDetalleOt() ]\n" + gson.toJson(paramsOT));
        LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
        String[][] dataArray = null;
        DataTableResponse dataResponse = DataTableResponse.builder()
                .isRespuesta(false)
                .data(new String[0][10])
                .paginaActual(0)
                .registrosTotales(0)
                .recordsFiltered("0")
                .recordsTotal("0")
                .draw(paramsOT.getDraw() + "")
                .result(null).build();
        paramsOT.setPagina((Integer.parseInt(paramsOT.getStart()) + 10) / 10);
        paramsOT.setIdOrden(!paramsOT.getIdOrden().equals("") ? paramsOT.getIdOrden() : null);
        paramsOT.setFolioSistema(!paramsOT.getFolioSistema().equals("") ? paramsOT.getFolioSistema() : null);
        paramsOT.setClaveCliente(!paramsOT.getClaveCliente().equals("") ? paramsOT.getClaveCliente() : null);

        logger.info("### Object: " + gson.toJson(paramsOT));

        String tokenAcces = principalDetail.getAccess_token();
        logger.info("consultaInformacionDetalleOt ##+" + tokenAcces);
        String urlRequest = principalDetail.getDireccionAmbiente().concat(constConsultaOT.getConsultaGeneralOt());
        logger.info("URL ##+" + urlRequest);

        ServiceResponseResult response = restCaller.callPostBearerTokenRequest(gson.toJson(paramsOT), urlRequest,
                ServiceResponseResult.class, tokenAcces);
        if (response.getResult() instanceof Integer){
            dataResponse = DataTableResponse.builder()
                    .isRespuesta(false)
                    .data(new String[0][10])
                    .paginaActual(0)
                    .registrosTotales(0)
                    .recordsFiltered("0")
                    .recordsTotal("0")
                    .draw(paramsOT.getDraw() + "")
                    .result(response.getResult()).build();
        } else {
            JsonObject jsonObjectResponse = gson.fromJson(gson.toJson(response.getResult()), JsonObject.class);
            JsonArray ordenesArray = jsonObjectResponse.getAsJsonArray("ordenes");
            if (ordenesArray.size() > 0) {
                if (jsonObjectResponse.get("registrosTotales").getAsInt() > 0) {
                    int count = 0;
                    dataArray = new String[ordenesArray.size()][11];
                    for (int i = 0; i < ordenesArray.size(); i++) {
                        JsonObject object = (JsonObject) ordenesArray.get(i);
                        logger.info("objeto: " + object);
                        dataArray[count][0] = object.get("idOrden").getAsInt() != 0 ? String.valueOf(object.get("idOrden").getAsInt()) : "";
                        dataArray[count][1] = object.get("nombreCliente") != null ? object.get("nombreCliente").getAsString().trim() : "";
                        dataArray[count][2] = object.get("claveCliente") != null ? object.get("claveCliente").getAsString().trim() : "";
                        dataArray[count][3] = object.get("ciudad") != null ? object.get("ciudad").getAsString().trim() : "";
                        dataArray[count][4] = object.get("fechaAgenda") != null ? object.get("fechaAgenda").getAsString().trim() : "";
                        dataArray[count][5] = object.get("descripcionMotivo") != null ? object.get("descripcionMotivo").getAsString().trim() : "";
                        dataArray[count][6] = object.get("descripcionEstatus") != null ? object.get("descripcionEstatus").getAsString().trim() : "";
                        dataArray[count][7] = object.get("descripcionEstado") != null ? object.get("descripcionEstado").getAsString().trim() : "";
                        // dataArray[count][8] = "<div class='tooltip-btn'> <span onclick='consultaMaterialesOT(" + String.valueOf(object.get("idOrden").getAsInt()) + ")' class='btn-floating btn-option btn-sm btn-default waves-effect waves-light'><th><i class='icono_cons_bg fa fa-wrench' aria-hidden='true'></i></th></span></div>";
                        // dataArray[count][9] = "<div class='tooltip-btn'> <span onclick='consultaImagenesOT(" + String.valueOf(object.get("idOrden").getAsInt()) + ")' class='btn-option btn-floating btn-evidencia btn-sm btn-secondary waves-effect waves-light'><th><i class='icono_cons_bg fa fa-picture-o' aria-hidden='true'></i></th></span></div>";
                        dataArray[count][8] = "<div class='tooltip-btn'> <span onclick='consultaDetalleOt(" + String.valueOf(object.get("idOrden").getAsInt()) + ")' class='btn-floating btn-option btn-sm btn-secondary waves-effect waves-light acciones'><th><i class='icono_cons_bg fa fa-bars' aria-hidden='true'></i></th></span></div>";
                        count++;

                    }
                    dataResponse = DataTableResponse.builder()
                            .isRespuesta(true)
                            .data(dataArray)
                            .paginaActual(jsonObjectResponse.get("paginaActual").getAsInt())
                            .registrosTotales(jsonObjectResponse.get("registrosTotales").getAsInt())
                            .recordsFiltered(jsonObjectResponse.get("registrosTotales").getAsInt() + "")
                            .recordsTotal(jsonObjectResponse.get("registrosTotales").getAsInt() + "")
                            .draw(paramsOT.getDraw() + "").build();
                } else {
                    dataResponse = DataTableResponse.builder()
                            .isRespuesta(true)
                            .data(new String[0][10])
                            .paginaActual(jsonObjectResponse.get("paginaActual").getAsInt())
                            .registrosTotales(jsonObjectResponse.get("registrosTotales").getAsInt())
                            .recordsFiltered(jsonObjectResponse.get("registrosTotales").getAsInt() + "")
                            .recordsTotal(jsonObjectResponse.get("registrosTotales").getAsInt() + "")
                            .draw(paramsOT.getDraw() + "").build();
                }
            }
        }



        logger.info("*** Objeto Response: " + gson.toJson(dataResponse));

        return dataResponse;
    }

    @Override
    public ServiceResponseResult consultaImagenesOt(String params) {
        ServiceResponseResult responseS = ServiceResponseResult.builder().isRespuesta(false)
                .resultDescripcion("sin datos").result(null).build();
        JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
        JsonObject login = new JsonObject();
        login.addProperty(env.getProperty("param.textus.pi"), constantesGeneric.getTextIpUsuario());
        login.addProperty(env.getProperty("param.textus.drowssap"), constantesGeneric.getTextCredPad());
        login.addProperty(env.getProperty("param.textus.diresu"), constantesGeneric.getTextCredUs());
        jsonObject.add("Login", login);
        jsonObject.addProperty(env.getProperty("param.header.grant_type"), env.getProperty("param.textus.grant_type"));

        logger.info("json object params## " + jsonObject.toString());
        try {
            String url = "http://10.216.47.89" + constConsultaOT.getConsultaImagenesOt();
            ResponseImagenEvidencia response = (ResponseImagenEvidencia) restCaller.callPostReturnClassBasicAuth(url,
                    jsonObject.toString(), ResponseImagenEvidencia.class);

            if (response.getImagen() != null) {
                for (ImagenesConfig imagen : response.getImagen()) {
                    if (imagen.getPath_imagen() != null) {
                        try {
                            String img64 = UtileriaGeneral
                                    .encoderImg(UtileriaGeneral.desEncrypt(imagen.getPath_imagen()));
                            if (img64.equals("")) {
                                imagen.setPath_imagen("");
                            } else {
                                imagen.setPath_imagen(img64);
                            }
                        } catch (Exception e) {
                            imagen.setPath_imagen("");
                            logger.warn("Se encontro un problema en la imagen de la evidencia");
                        }
                    } else {
                        imagen.setPath_imagen("");
                    }
                }
            }

            logger.info("Result ImplConsultaOTService metodo consultaImagenesOt: " + gson.toJson(response));
            responseS = ServiceResponseResult.builder().isRespuesta(true).resultDescripcion("Accion completada")
                    .result(response).build();

        } catch (Exception e) {
            logger.info(e);
            responseS = ServiceResponseResult.builder().isRespuesta(false).resultDescripcion("ERROR GENERAL")
                    .result(null).build();
        }

        return responseS;
    }

    @Override
    public ServiceResponseResult consultaInformacionDetalleOt(String params) {
        logger.info("ImplConsultaOTService.class [metodo = consultaInformacionDetalleOt() ]\n" + params);
        LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();

        JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
        String idot = jsonObject.get("Id_ot").getAsString();

        String tokenAcces = principalDetail.getAccess_token();
        logger.info("consultaInformacionDetalleOt ##+" + tokenAcces);
        String urlRequest = principalDetail.getDireccionAmbiente().concat(constConsultaOT.getConsultaOtInfoGeneral());
        logger.info("URL ##+" + urlRequest);

        Map<String, String> paramsRequestGet = new HashMap<String, String>();
        paramsRequestGet.put("idot", idot);

        ServiceResponseResult response = restCaller.callGetBearerTokenRequest(paramsRequestGet, urlRequest,
                ServiceResponseResult.class, tokenAcces);
        return response;
    }

    @Override
    public ServiceResponseResult consultaMaterialesOts(ParamConsultaOTPI paramsOT) {
        ServiceResponseResult response = ServiceResponseResult.builder().isRespuesta(false)
                .resultDescripcion("sin datos").result(null).build();
        //List<ConsultaOTVO> responseMateriales = new ArrayList<ConsultaOTVO>();
        //ConsultaOTVO responseConsulta = new ConsultaOTVO();
        try {
//			responseMateriales = consultaOTPIRepository.consultaMaterialesOt(paramsOT);
//			logger.info("### RESULT ### " + gson.toJson(responseMateriales));
//
//			if (responseMateriales.isEmpty()) {
//				String params = gson.toJson(paramsOT);
//				JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
//				JsonObject login = new JsonObject();
//				login.addProperty(env.getProperty("param.textus.pi"), constantesGeneric.getTextIpUsuario());
//				login.addProperty(env.getProperty("param.textus.drowssap"), constantesGeneric.getTextCredPad());
//				login.addProperty(env.getProperty("param.textus.resu"), constantesGeneric.getTextCredUs());
//				jsonObject.add("Login", login);
//				jsonObject.addProperty(env.getProperty("param.header.grant_type"),
//						env.getProperty("param.textus.grant_type"));
//
//				logger.info("json object params## " + jsonObject.toString());
//				String url = "http://10.216.47.89" + constConsultaOT.getConsultaMaterialesOt();
//				responseConsulta = (ConsultaOTVO) restCaller.callPostReturnClassBasicAuth(url, jsonObject.toString(),
//						ConsultaOTVO.class);
//				logger.info("### RESULT ### " + gson.toJson(responseConsulta));
//				if (responseConsulta.getDescripcion() != null) {
//					response = ServiceResponseResult.builder().isRespuesta(true).resultDescripcion("Accion completada")
//							.result(responseConsulta).build();
//				} else {
//					response = ServiceResponseResult.builder().isRespuesta(true).resultDescripcion("Accion completada")
//							.result(null).build();
//				}
//
//			} else {
//				response = ServiceResponseResult.builder().isRespuesta(true).resultDescripcion("Accion completada")
//						.result(responseMateriales).build();
//			}

        } catch (Exception e) {
            logger.info(e);
            response = ServiceResponseResult.builder().isRespuesta(false).resultDescripcion("ERROR GENERAL")
                    .result(null).build();
        }
        logger.info("### RESULT ### " + gson.toJson(response));
        return response;
    }

    @Override
    public ServiceResponseResult consultaActividadTecnico(String params) {
        JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
        JsonObject login = new JsonObject();
        login.addProperty(env.getProperty("param.textus.pI"), constantesGeneric.getTextIpUsuario());
        login.addProperty(env.getProperty("param.textus.drowssaP"), constantesGeneric.getTextCredPad());
        login.addProperty(env.getProperty("param.textus.resU"), constantesGeneric.getTextCredUs());
        jsonObject.add("Login", login);

        logger.info("json object params## " + jsonObject.toString());

        String url = "http://10.216.47.89" + constConsultaOT.getConsultaActividad();
        ServiceResponseResult response = restCaller.callPostParamString(url, jsonObject.toString());
        logger.info("Result ImplConsultaOTService metodo consultaActividadTecnico" + gson.toJson(response));
        return response;
    }

    @Override
    public ServiceResponseResult consultaInfoTrayectoria(String params) {
        ServiceResponseResult response = ServiceResponseResult.builder().isRespuesta(false)
                .resultDescripcion("sin datos").result(null).build();
        JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
        try {
//			String idot = jsonObject.get("idot").getAsString();
//			List<ConsultaTrayectoriaVO> consulta = consultaOTPIRepository.consultaInfoTrayectoria(idot);
//			logger.info("### RESULT ### " + gson.toJson(consulta));
//
//			response = ServiceResponseResult.builder().isRespuesta(true).resultDescripcion("Accion completada")
//					.result(consulta).build();

        } catch (Exception e) {
            logger.info(e);
            response = ServiceResponseResult.builder().isRespuesta(false).resultDescripcion("ERROR GENERAL")
                    .result(null).build();
        }

        return response;
    }

    @Override
    public ServiceResponseResult consultaInformacionRed(String params) {
        JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
        JsonObject login = new JsonObject();
        login.addProperty(env.getProperty("param.textus.pI"), constantesGeneric.getTextIpUsuario());
        login.addProperty(env.getProperty("param.textus.drowssaP"), constantesGeneric.getTextCredPad());
        login.addProperty(env.getProperty("param.textus.resU"), constantesGeneric.getTextCredUs());
        jsonObject.add("Login", login);

        logger.info("json object params## " + jsonObject.toString());

        String url = "http://10.216.47.89" + constConsultaOT.getConsultaInformacionRed();
        ServiceResponseResult response = restCaller.callPostParamString(url, jsonObject.toString());
        logger.info("Result ImplConsultaOTService metodo consultaInformacionRed" + gson.toJson(response));
        return response;
    }

    @Override
    public ServiceResponseResult consultaCambioEquipo(String params) {
        JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
        JsonObject login = new JsonObject();
        login.addProperty(env.getProperty("param.textus.pI"), constantesGeneric.getTextIpUsuario());
        login.addProperty(env.getProperty("param.textus.drowssaP"), constantesGeneric.getTextCredPad());
        login.addProperty(env.getProperty("param.textus.resU"), constantesGeneric.getTextCredUs());
        jsonObject.add("Login", login);

        logger.info("json object params## " + jsonObject.toString());

        String url = "http://10.216.47.89" + constConsultaOT.getConsultaCambioEquipo();
        ServiceResponseResult response = restCaller.callPostParamString(url, jsonObject.toString());
        logger.info("Result ImplConsultaOTService metodo consultaInformacionRed" + gson.toJson(response));
        return response;
    }

    @Override
    public ServiceResponseResult consultaReporteConsultaOt(String params) {
        logger.info("ImplConsultaOTService.class [metodo consultaReporteConsultaOt() ]\n" + params);
        LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
        String tokenAcces = principalDetail.getAccess_token();
        logger.info("consultaInformacionDetalleOt ##+" + tokenAcces);
        String urlRequest = principalDetail.getDireccionAmbiente().concat(constConsultaOT.getConsultaGeneralOt());
        logger.info("URL ##+" + urlRequest);

        ServiceResponseResult response = restCaller.callPostBearerTokenRequest(params, urlRequest,
                ServiceResponseResult.class, tokenAcces);
        if (response.getResult() instanceof Integer){
            response = ServiceResponseResult.builder()
                    .isRespuesta(false)
                    .result(response.getResult()).build();
        } else {
            JsonObject jsonObjectResponse = gson.fromJson(gson.toJson(response.getResult()), JsonObject.class);
            JsonArray ordenesArray = jsonObjectResponse.getAsJsonArray("ordenes");
            JsonArray ordenesReporte = new JsonArray();
            JsonObject ordenesR = new JsonObject();
            if (ordenesArray.size() > 0) {
                if (jsonObjectResponse.get("registrosTotales").getAsInt() > 0) {
                    for (int i = 0; i < ordenesArray.size(); i++) {
                        JsonObject object = (JsonObject) ordenesArray.get(i);
                        JsonObject result = new JsonObject();
                        logger.info("objeto: " + object);
                        result.addProperty("OT", object.get("idOrden").getAsInt() != 0 ? String.valueOf(object.get("idOrden").getAsInt()) : "");
                        result.addProperty("CLIENTE", object.get("nombreCliente") != null ? object.get("nombreCliente").getAsString().trim() : "");
                        result.addProperty("CUENTA", object.get("claveCliente") != null ? object.get("claveCliente").getAsString().trim() : "");
                        result.addProperty("CIUDAD", object.get("ciudad") != null ? object.get("ciudad").getAsString().trim() : "");
                        result.addProperty("FECHA AGENDA", object.get("fechaAgenda") != null ? object.get("fechaAgenda").getAsString().trim() : "");
                        result.addProperty("MOTIVO", object.get("descripcionMotivo") != null ? object.get("descripcionMotivo").getAsString().trim() : "");
                        result.addProperty("ESTATUS", object.get("descripcionEstatus") != null ? object.get("descripcionEstatus").getAsString().trim() : "");
                        result.addProperty("ESTADO", object.get("descripcionEstado") != null ? object.get("descripcionEstado").getAsString().trim() : "");
                        ordenesReporte.add(result);
                    }
                    ordenesR.add("ordenes", ordenesReporte);
                    response = ServiceResponseResult.builder()
                            .isRespuesta(true)
                            .result(gson.toJson(ordenesR)).build();
                } else {
                    response = ServiceResponseResult.builder()
                            .isRespuesta(true)
                            .result(null).build();
                }
            } else {
                response = ServiceResponseResult.builder()
                        .isRespuesta(true)
                        .result(null).build();
            }
        }



        logger.info("*** Objeto Response: " + gson.toJson(response));

        return response;
    }
}
