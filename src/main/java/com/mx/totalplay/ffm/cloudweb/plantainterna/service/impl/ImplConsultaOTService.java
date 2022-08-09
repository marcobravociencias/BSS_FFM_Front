package com.mx.totalplay.ffm.cloudweb.plantainterna.service.impl;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;


import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFFont;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.BorderStyle;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.FillPatternType;
import org.apache.poi.ss.usermodel.HorizontalAlignment;
import org.apache.poi.ss.usermodel.IndexedColors;
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
    private final int CANTIDAD_COLUMNS_COLUMNSOT=13;
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
        String[][] dataArray = new String[0][CANTIDAD_COLUMNS_COLUMNSOT];
        DataTableResponse dataResponse = DataTableResponse.builder()
                .isRespuesta(false)
                .data( dataArray )
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
        
        
        if (response.getResult() == null || response.getResult() instanceof Integer){
            dataResponse = DataTableResponse.builder()
                    .isRespuesta(false)
                    .data( dataArray )
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
                    dataArray = new String[ordenesArray.size()][CANTIDAD_COLUMNS_COLUMNSOT];
                    int idOrden=0;
                    for (int i = 0; i < ordenesArray.size(); i++) {
                        JsonObject object = (JsonObject) ordenesArray.get(i);
                        
                        dataArray[count][0] = object.get("idOrden").getAsInt() != 0 ? String.valueOf(object.get("idOrden").getAsInt()) : "";
                        dataArray[count][1] = ( object.get("folioSistema") != null && object.get("folioSistema").getAsString().trim() !="" )  ? object.get("folioSistema").getAsString().trim() : "Sin dato";
                        dataArray[count][2] = ( object.get("nombreCliente") != null && object.get("nombreCliente").getAsString().trim() !="" )  ? object.get("nombreCliente").getAsString().trim() : "Sin dato";
                        dataArray[count][3] = ( object.get("claveCliente") != null && object.get("claveCliente").getAsString().trim() !="" )  ? object.get("claveCliente").getAsString().trim() : "Sin dato";
                        dataArray[count][4] = ( object.get("cluster") != null && object.get("cluster").getAsString().trim() !="" )  ? object.get("cluster").getAsString().trim() : "Sin dato";
                        dataArray[count][5] = ( object.get("fechaAgenda") != null && object.get("fechaAgenda").getAsString().trim() !="" )  ? object.get("fechaAgenda").getAsString().trim() : "Sin dato";
                        dataArray[count][6] = ( object.get("descTipo") != null && object.get("descTipo").getAsString().trim() !="" )  ? object.get("descTipo").getAsString().trim() : "Sin dato";
                        dataArray[count][7] = ( object.get("descSubTipo") != null && object.get("descSubTipo").getAsString().trim() !="" )  ? object.get("descSubTipo").getAsString().trim() : "Sin dato";
                        dataArray[count][8] = ( object.get("descripcionEstatus") != null && object.get("descripcionEstatus").getAsString().trim() !="" )  ? object.get("descripcionEstatus").getAsString().trim() : "Sin dato";
                        dataArray[count][9] = ( object.get("descripcionEstado") != null && object.get("descripcionEstado").getAsString().trim() !="" )  ? object.get("descripcionEstado").getAsString().trim() : "Sin dato";
                        dataArray[count][10] = ( object.get("descripcionMotivo") != null && object.get("descripcionMotivo").getAsString().trim() !="" )  ? object.get("descripcionMotivo").getAsString().trim() : "Sin dato";

                        dataArray[count][11] = "<div class='tooltip-btn'> <span onclick='consultaImagenesOT(" + String.valueOf(object.get("idOrden").getAsInt()) + ", "+ String.valueOf(object.get("claveCliente")) + ")' class='btn-option btn-floating btn-evidencia btn-sm btn-secondary waves-effect waves-light'><th><i class='icono_cons_bg fa fa-picture-o' aria-hidden='true'></i></th></span></div>";
                        dataArray[count][12] = "<div class='tooltip-btn'> <span onclick='consultaDetalleOt("+ String.valueOf(object.get("idOrden").getAsInt()) +")' class='btn-floating btn-option btn-sm btn-secondary waves-effect waves-light acciones'><th><i class='icono_cons_bg fa fa-bars' aria-hidden='true'></i></th></span></div>";

                        count++;

                    }
                    dataResponse = DataTableResponse.builder()
                            .isRespuesta(true)
                            .data( dataArray )
                            .paginaActual(jsonObjectResponse.get("paginaActual").getAsInt())
                            .registrosTotales(jsonObjectResponse.get("registrosTotales").getAsInt())
                            .recordsFiltered(jsonObjectResponse.get("registrosTotales").getAsInt() + "")
                            .recordsTotal(jsonObjectResponse.get("registrosTotales").getAsInt() + "")
                            .draw(paramsOT.getDraw() + "")
                             .result(response.getResult()) 
                            .build();
                } else {
                    dataResponse = DataTableResponse.builder()
                            .isRespuesta(true)
                            .data( dataArray )
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
        
        JsonObject jsonResponse = gson.fromJson(gson.toJson(response).toString(), JsonObject.class);
        if (jsonResponse.get("codigoEstatusService").getAsInt() == 200) {
        	if (jsonResponse.get("result") != null) {
        		JsonObject jsonResult = jsonResponse.get("result").getAsJsonObject();
        		if (jsonResult.get("orden") != null) {
        			JsonObject jsonOrden = jsonResult.get("orden").getAsJsonObject();
        			if (jsonOrden.get("telefonoCliente") != null) {
                		jsonOrden.addProperty("telefonoCliente", utilerias.ocultarNumero(jsonOrden.get("telefonoCliente").getAsString()));
                	}
        			if (jsonOrden.get("telefonoContacto") != null) {
                		jsonOrden.addProperty("telefonoContacto", utilerias.ocultarNumero(jsonOrden.get("telefonoContacto").getAsString()));
                	}
        			jsonResult.add("orden", jsonOrden);
        		}
        		jsonResponse.add("result", jsonResult);
        	}
        	response = gson.fromJson(jsonResponse, ServiceResponseResult.class);
        }
        
        logger.info("RESULT" + gson.toJson(response));
        return response;
    }

    @Override
    public ServiceResponseResult consultaMaterialesOts(String params) {
    	logger.info("params ---->"+params);
        JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
        LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
        String tokenAcces = principalDetail.getAccess_token();
        String urlRequest = principalDetail.getDireccionAmbiente().concat(constConsultaOT.getConsultaMaterialesOt());
        logger.info("### URL consultaMaterialesOts(): \n" + urlRequest);
        Map<String, String> paramsRequestGet = new HashMap<>();
        paramsRequestGet.put("idOrden", jsonObject.get("idOrden").getAsString());
        logger.info("##idOrden "+jsonObject.get("idOrden").getAsString());
        ServiceResponseResult response = restCaller.callGetBearerTokenRequest(
                paramsRequestGet,
                urlRequest,
                ServiceResponseResult.class,
                tokenAcces);

        logger.info("### RESULT consultaMaterialesOts(): " + gson.toJson(response));
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
                        result.addProperty("OS", object.get("folioSistema") != null ? object.get("folioSistema").getAsString().trim() : "");
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

    @Override
    public ServiceResponseResult consultaDetallePostVenta(String params) {
        JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
        LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
        String tokenAcces = principalDetail.getAccess_token();
        String urlRequest = principalDetail.getDireccionAmbiente().concat(constConsultaOT.getConsultaPosventaDetalleSoporte());
        logger.info("### URL consultaDetallePostVenta(): \n" + urlRequest);
        Map<String, String> paramsRequestGet = new HashMap<>();
        paramsRequestGet.put("idOrden", jsonObject.get("orden").getAsString());

        ServiceResponseResult response = restCaller.callGetBearerTokenRequest(
                paramsRequestGet,
                urlRequest,
                ServiceResponseResult.class,
                tokenAcces);

        logger.info("### RESULT consultaDetallePostVenta(): " + gson.toJson(response));
        return response;
    }

    @Override
    public ServiceResponseResult consultaPagos(String params) {
        JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
        LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
        String tokenAcces = principalDetail.getAccess_token();
        String urlRequest = principalDetail.getDireccionAmbiente().concat(constConsultaOT.getConsultaPagos());
        logger.info("### URL consultaPagos(): \n" + urlRequest);
        Map<String, String> paramsRequestGet = new HashMap<>();
        paramsRequestGet.put("idOrden", jsonObject.get("orden").getAsString());
        //paramsRequestGet.put("idUsuario", jsonObject.get("usuario").getAsString());

        ServiceResponseResult response = restCaller.callGetBearerTokenRequest(
                paramsRequestGet,
                urlRequest,
                ServiceResponseResult.class,
                tokenAcces);

        logger.info("### RESULT consultaPagos(): " + gson.toJson(response));
        return response;
    }

    @Override
    public ServiceResponseResult consultaEvidencia(String params) {
        JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
        LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
        String tokenAcces = principalDetail.getAccess_token();
        String urlRequest = principalDetail.getDireccionAmbiente().concat(constConsultaOT.getConsultaEvidencia());
        logger.info("### URL consultaEvidencia(): \n" + urlRequest);
        Map<String, String> paramsRequestGet = new HashMap<>();
        paramsRequestGet.put("idOrden", jsonObject.get("orden").getAsString());
        //paramsRequestGet.put("idUsuario", jsonObject.get("usuario").getAsString());

        ServiceResponseResult response = restCaller.callGetBearerTokenRequest(
                paramsRequestGet,
                urlRequest,
                ServiceResponseResult.class,
                tokenAcces);

        logger.info("### RESULT consultaEvidencia(): " + gson.toJson(response));
        return response;
    }

    @Override
    public ServiceResponseResult consultaDispositivos(String params) {
        JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
        LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
        String tokenAcces = principalDetail.getAccess_token();
        String urlRequest = principalDetail.getDireccionAmbiente().concat(constConsultaOT.getConsultaDispositivos());
        logger.info("### URL consultaDispositivos(): \n" + urlRequest);
        Map<String, String> paramsRequestGet = new HashMap<>();
        paramsRequestGet.put("idOrden", jsonObject.get("orden").getAsString());

        ServiceResponseResult response = restCaller.callGetBearerTokenRequest(
                paramsRequestGet,
                urlRequest,
                ServiceResponseResult.class,
                tokenAcces);

        logger.info("### RESULT consultaDispositivos(): " + gson.toJson(response));
        return response;
    }

    @Override
    public ServiceResponseResult consultaRecoleccionConsultaOt(String params) {
    	logger.info("ImplConsultaOTService.class [metodo = consultaRecoleccionConsultaOt() ] \n"+ gson.toJson(params));
        JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
        LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
    	String tokenAccess = principalDetail.getAccess_token();
		logger.info("consultaRecoleccionConsultaOt ## "+ tokenAccess);
		
		String urlRequest = principalDetail.getDireccionAmbiente().concat(constConsultaOT.getConsultaRecoleccionOt());
		logger.info("### URL consultaRecoleccionConsultaOt(): \n" + urlRequest);
		
		logger.info("### IDORDEN" + jsonObject.get("idOrden").getAsString());
		Map<String, String> paramsRequestGet = new HashMap<>();
	    paramsRequestGet.put("idOrden", jsonObject.get("idOrden").getAsString());
	    
	    ServiceResponseResult response = restCaller.callGetBearerTokenRequest(
                paramsRequestGet,
                urlRequest,
                ServiceResponseResult.class,
                tokenAccess);

        logger.info("### RESULT consultaRecoleccionConsultaOt(): " + gson.toJson(response));
        return response;
    }


	@Override
	public ServiceResponseResult consultaOrdenesPlantaExternaOt(String params) {
		logger.info("ImplConsultaOTService.class [metodo = consultaOrdenesPlantaExternaOt() ] \n"+ gson.toJson(params));
        JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
        LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
    	String tokenAccess = principalDetail.getAccess_token();
		logger.info("consultaOrdenesPlantaExternaOt ## "+ tokenAccess);
		
		String urlRequest = principalDetail.getDireccionAmbiente().concat(constConsultaOT.getConsultaOrdenesPlantaExternaOt());
		logger.info("### URL consultaOrdenesPlantaExternaOt(): \n" + urlRequest);
		
		Map<String, String> paramsRequestGet = new HashMap<>();
	    paramsRequestGet.put("idOrden", jsonObject.get("idOrden").getAsString());
	    
	    ServiceResponseResult response = restCaller.callGetBearerTokenRequest(
                paramsRequestGet,
                urlRequest,
                ServiceResponseResult.class,
                tokenAccess);

        logger.info("### RESULT consultaOrdenesPlantaExternaOt(): " + gson.toJson(response));
        return response;
	}


	@Override
	public ByteArrayInputStream exportarExcelConsultaOT(String params) {
		logger.info("ImplConsultaOTService.class [metodo = exportarExcelConsultaOT() ] \n"+ gson.toJson(params));

		String[] headers = new String[] { "OT", "OS", "CLIENTE", "CUENTA", "CIUDAD", "FECHA AGENDA", "TIPO", "SUBTIPO",
				"ESTATUS", "ESTADO", "MOTIVO" };
//		CREA EL LIBRO
		HSSFWorkbook book = new HSSFWorkbook();

//		CREA LA HOJA
		HSSFSheet sheet = book.createSheet("Reporte Consulta OT");
		HSSFFont thFontTitle = (HSSFFont) book.createFont();
		thFontTitle.setFontName(HSSFFont.FONT_ARIAL);
		thFontTitle.setFontHeightInPoints((short) 8);
		thFontTitle.setBold(true);
		thFontTitle.setColor(IndexedColors.WHITE.getIndex());

//		FORMATO DEL TITULO DE LAS COLUMNAS
		CellStyle thStyleTitle = book.createCellStyle();
		thStyleTitle.setWrapText(true);
		thStyleTitle.setFont(thFontTitle);
		thStyleTitle.setBorderBottom(BorderStyle.MEDIUM);
		thStyleTitle.setBottomBorderColor((short) 8);
		thStyleTitle.setBorderTop(BorderStyle.MEDIUM);
		thStyleTitle.setTopBorderColor((short) 8);
		thStyleTitle.setWrapText(true);
		thStyleTitle.setAlignment(HorizontalAlignment.CENTER);
		thStyleTitle.setFillForegroundColor(IndexedColors.ROYAL_BLUE.getIndex());
		thStyleTitle.setFillPattern(FillPatternType.SOLID_FOREGROUND);

//		CREA FILA
		HSSFRow row;

//		CREA CELDA
		HSSFCell cell = null;
		int rowsCantidad = 0;
		row = sheet.createRow(++rowsCantidad);
		row.setHeightInPoints((2 * sheet.getDefaultRowHeightInPoints()));
		int aux = 0;

		for (String header : headers) {
			cell = row.createCell(++aux);
			cell.setCellValue(header);
			cell.setCellStyle(thStyleTitle);
			sheet.setColumnWidth(aux, 20 * 256);
		}

		aux = 0;
		HSSFFont thFontContent = (HSSFFont) book.createFont();
		thFontContent.setFontName(HSSFFont.FONT_ARIAL);
		thFontContent.setFontHeightInPoints((short) 8);
		thFontContent.setBold(false);

//		FORMATO DE LAS CELDAS DE CONTENIDO
		HSSFCellStyle thStyleContent = book.createCellStyle();
		thStyleContent.setWrapText(true);
		thStyleContent.setFont(thFontContent);
		thStyleContent.setAlignment(HorizontalAlignment.CENTER);

//		INVOCACION DE SERVICIO

		LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
		String tokenAcces = principalDetail.getAccess_token();
		logger.info("consultaInformacionDetalleOt ##+" + tokenAcces);
		String urlRequest = principalDetail.getDireccionAmbiente().concat(constConsultaOT.getConsultaGeneralOt());
		logger.info("URL ##+" + urlRequest);

		ServiceResponseResult response = restCaller.callPostBearerTokenRequest(params, urlRequest,
				ServiceResponseResult.class, tokenAcces);

		logger.info("RESULT/n" + gson.toJson(response));

//		LLENADO DE CELDAS DE CONTENIDO
		if (response.getResult() == null || response.getResult() instanceof Integer) {
		} else {
			JsonObject jsonObjectResponse = gson.fromJson(gson.toJson(response.getResult()), JsonObject.class);
			logger.info("jsonObjectResponse****************/n" + response.getResult());
			JsonArray ordenesArray = jsonObjectResponse.getAsJsonArray("ordenes");
			if (ordenesArray.size() > 0) {
				for (int i = 0; i < ordenesArray.size(); i++) {
					JsonObject object = (JsonObject) ordenesArray.get(i);
					row = sheet.createRow(++rowsCantidad);
					row.setHeightInPoints((1 * sheet.getDefaultRowHeightInPoints()));

					cell = row.createCell(++aux);
					cell.setCellValue(object.get("idOrden").getAsInt() != 0 ? String.valueOf(object.get("idOrden").getAsInt()) : "");
					cell.setCellStyle(thStyleContent);

					cell = row.createCell(++aux);
					cell.setCellValue((object.get("folioSistema") != null && object.get("folioSistema").getAsString().trim() != "") ? object.get("folioSistema").getAsString().trim() : "Sin dato");
					cell.setCellStyle(thStyleContent);

					cell = row.createCell(++aux);
					cell.setCellValue((object.get("nombreCliente") != null && object.get("nombreCliente").getAsString().trim() != "") ? object.get("nombreCliente").getAsString().trim() : "Sin dato");
					cell.setCellStyle(thStyleContent);

					cell = row.createCell(++aux);
					cell.setCellValue((object.get("claveCliente") != null && object.get("claveCliente").getAsString().trim() != "") ? object.get("claveCliente").getAsString().trim() : "Sin dato");
					cell.setCellStyle(thStyleContent);

					cell = row.createCell(++aux);
					cell.setCellValue((object.get("ciudad") != null && object.get("ciudad").getAsString().trim() != "") ? object.get("ciudad").getAsString().trim() : "Sin dato");
					cell.setCellStyle(thStyleContent);

					cell = row.createCell(++aux);
					cell.setCellValue((object.get("fechaAgenda") != null && object.get("fechaAgenda").getAsString().trim() != "") ? object.get("fechaAgenda").getAsString().trim() : "Sin dato");
					cell.setCellStyle(thStyleContent);

					cell = row.createCell(++aux);
					cell.setCellValue((object.get("descTipo") != null && object.get("descTipo").getAsString().trim() != "") ? object.get("descTipo").getAsString().trim(): "Sin dato");
					cell.setCellStyle(thStyleContent);

					cell = row.createCell(++aux);
					cell.setCellValue((object.get("descSubTipo") != null && object.get("descSubTipo").getAsString().trim() != "") ? object.get("descSubTipo").getAsString().trim() : "Sin dato");
					cell.setCellStyle(thStyleContent);

					cell = row.createCell(++aux);
					cell.setCellValue((object.get("descripcionEstatus") != null && object.get("descripcionEstatus").getAsString().trim() != "") ? object.get("descripcionEstatus").getAsString().trim(): "Sin dato");
					cell.setCellStyle(thStyleContent);

					cell = row.createCell(++aux);
					cell.setCellValue((object.get("descripcionEstado") != null && object.get("descripcionEstado").getAsString().trim() != "") ? object.get("descripcionEstado").getAsString().trim() : "Sin dato");
					cell.setCellStyle(thStyleContent);

					cell = row.createCell(++aux);
					cell.setCellValue((object.get("descripcionMotivo") != null && object.get("descripcionMotivo").getAsString().trim() != "") ? object.get("descripcionMotivo").getAsString().trim() : "Sin dato");
					cell.setCellStyle(thStyleContent);

					aux = 0;

				}
			}
		}
		try {
			ByteArrayOutputStream fileToDownload = new ByteArrayOutputStream();
			book.write(fileToDownload);
			return new ByteArrayInputStream(fileToDownload.toByteArray());
		} catch (IOException e) {
			logger.error(" Error ");
			return null;
		}
	}
}
