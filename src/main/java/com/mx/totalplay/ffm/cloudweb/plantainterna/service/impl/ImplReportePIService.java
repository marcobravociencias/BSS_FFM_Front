package com.mx.totalplay.ffm.cloudweb.plantainterna.service.impl;
 
import java.util.HashMap;
 
import java.util.Map;
 
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;
 
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.mx.totalplay.ffm.cloudweb.plantainterna.model.consultaOTPI.ImagenesConfig;
import com.mx.totalplay.ffm.cloudweb.plantainterna.model.consultaOTPI.ParamConsultaOTPI;
import com.mx.totalplay.ffm.cloudweb.plantainterna.model.consultaOTPI.ResponseImagenEvidencia;
import com.mx.totalplay.ffm.cloudweb.plantainterna.service.ReportePIService;
import com.mx.totalplay.ffm.cloudweb.plantainterna.utils.ConstConsultaOT;
import com.mx.totalplay.ffm.cloudweb.plantainterna.utils.ConstReportePI;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.DataTableResponse;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.LoginResult;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.ServiceResponseResult;
import com.mx.totalplay.ffm.cloudweb.utilerias.utils.ConstantesGeneric;
import com.mx.totalplay.ffm.cloudweb.utilerias.utils.ConsumeRest;
import com.mx.totalplay.ffm.cloudweb.utilerias.utils.UtileriaGeneral;
 
 
@Service
public class ImplReportePIService implements ReportePIService{
  
  private final Logger logger = LogManager.getLogger(ImplReportePIService.class.getName());
  private final ConsumeRest restCaller;
    private final ConstantesGeneric constantesGeneric;
    private final Environment env;
    private final UtileriaGeneral utilerias;
    private final ConstReportePI constReportePI;
    Gson gson = new Gson();
    
    @Autowired
    public ImplReportePIService(ConsumeRest restCaller, ConstantesGeneric constantesGeneric, Environment env, ConstReportePI constReportePI, UtileriaGeneral utilerias) {
        this.restCaller = restCaller;
        this.constantesGeneric = constantesGeneric;
        this.env = env;
        this.constReportePI=constReportePI;
        this.utilerias = utilerias;
    }
 
  
  
  @Override
  public DataTableResponse consultaReporteOrdenes(ParamConsultaOTPI paramsOT) {
    logger.info("ImplReportePIService.class [metodo consultaInformacionDetalleOt() ]\n" + gson.toJson(paramsOT));
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
        String urlRequest = principalDetail.getDireccionAmbiente().concat(constReportePI.getConsultaGeneralOt());
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
  public DataTableResponse consultaReporteTecnico(ParamConsultaOTPI paramsOT) {
    logger.info("ImplReportePIService.class [metodo consultaInformacionDetalleOt() ]\n" + gson.toJson(paramsOT));
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
        String urlRequest = principalDetail.getDireccionAmbiente().concat(constReportePI.getConsultaGeneralOt());
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
  public DataTableResponse consultaReporteDespacho(ParamConsultaOTPI paramsOT) {
    logger.info("ImplReportePIService.class [metodo consultaInformacionDetalleOt() ]\n" + gson.toJson(paramsOT));
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
        String urlRequest = principalDetail.getDireccionAmbiente().concat(constReportePI.getConsultaGeneralOt());
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
  public DataTableResponse consultaReporteAuxiliar(ParamConsultaOTPI paramsOT) {
    logger.info("ImplReportePIService.class [metodo consultaInformacionDetalleOt() ]\n" + gson.toJson(paramsOT));
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
        String urlRequest = principalDetail.getDireccionAmbiente().concat(constReportePI.getConsultaGeneralOt());
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
  
}
           