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
import com.mx.totalplay.ffm.cloudweb.plantainterna.model.CoordInstalacionesPI.ParamFFMCoordInstalacionesVO;
import com.mx.totalplay.ffm.cloudweb.plantainterna.model.consultaOTPI.ParamConsultaOTPI;
import com.mx.totalplay.ffm.cloudweb.plantainterna.service.CoordInstalacionesService;
import com.mx.totalplay.ffm.cloudweb.plantainterna.utils.ConstCoordInst;
import com.mx.totalplay.ffm.cloudweb.plantainterna.utils.ConstReportePI;
import com.mx.totalplay.ffm.cloudweb.plantainterna.utils.ConstSkills;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.DataTableResponse;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.LoginResult;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.ServiceResponseResult;
import com.mx.totalplay.ffm.cloudweb.utilerias.utils.ConstantesGeneric;
import com.mx.totalplay.ffm.cloudweb.utilerias.utils.ConsumeRest;
import com.mx.totalplay.ffm.cloudweb.utilerias.utils.UtileriaGeneral;

@Service
public class ImplCoordInstalacionesService implements CoordInstalacionesService{
	private  final Logger logger = LogManager.getLogger(ImplCoordInstalacionesService.class.getName());
	private Gson gson=new Gson();
	private final ConstReportePI constCoordInst;
	private final ConsumeRest restCaller;
	private final UtileriaGeneral utilerias;
	private final Environment env;
	private final ConstantesGeneric constantesAmbiente;
	
	@Autowired
	public ImplCoordInstalacionesService(ConstantesGeneric constantesAmbiente, ConstReportePI constCoordInst, ConsumeRest restCaller, UtileriaGeneral utilerias, Environment env) {
		this.constantesAmbiente = constantesAmbiente;
		this.constCoordInst = constCoordInst;
		this.restCaller = restCaller;
		this.utilerias = utilerias;
		this.env = env;
	}

	@Override
	public ServiceResponseResult busquedaGral(String params) {
		logger.info("ImplCoordInstalacionesService.class [metodo = busquedaGral() ]\n");
		LoginResult principalDetail=utilerias.obtenerObjetoPrincipal();
		JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
		String tokenAcces=principalDetail.getAccess_token();
		logger.info("json object params## "+jsonObject.toString());	 
		String url="";//"http://94.74.70.52:8149"+constCoordInst.getBusquedaGralConstante();
		ServiceResponseResult response= restCaller.callPostBearerTokenRequest(
				jsonObject.toString(),
				url,
				ServiceResponseResult.class,
				tokenAcces);
		logger.info("RESULT busqueda"+gson.toJson(response));
		return response;
	}

	@Override
	public DataTableResponse consultaPendientesAgenda(ParamConsultaOTPI paramsOT) {
		logger.info("ImplCoordInstalacionesService.class [metodo consultaPendientesAgenda() ]\n" + gson.toJson(paramsOT));
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
        String urlRequest = principalDetail.getDireccionAmbiente().concat(constCoordInst.getConsultaGeneralOt());
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
                        dataArray[count][4] = object.get("claveCliente") != null ? object.get("claveCliente").getAsString().trim() : "";
                        dataArray[count][5] = object.get("descripcionMotivo") != null ? object.get("descripcionMotivo").getAsString().trim() : "";
                        dataArray[count][6] = object.get("descripcionEstatus") != null ? object.get("descripcionEstatus").getAsString().trim() : "";
                        dataArray[count][7] = object.get("descripcionEstado") != null ? object.get("descripcionEstado").getAsString().trim() : "";
                        // dataArray[count][8] = "<div class='tooltip-btn'> <span onclick='consultaMaterialesOT(" + String.valueOf(object.get("idOrden").getAsInt()) + ")' class='btn-floating btn-option btn-sm btn-default waves-effect waves-light'><th><i class='icono_cons_bg fa fa-wrench' aria-hidden='true'></i></th></span></div>";
                        // dataArray[count][9] = "<div class='tooltip-btn'> <span onclick='consultaImagenesOT(" + String.valueOf(object.get("idOrden").getAsInt()) + ")' class='btn-option btn-floating btn-evidencia btn-sm btn-secondary waves-effect waves-light'><th><i class='icono_cons_bg fa fa-picture-o' aria-hidden='true'></i></th></span></div>";
                        dataArray[count][8] = object.get("fechaAgenda") != null ? object.get("fechaAgenda").getAsString().trim() : "";
                        dataArray[count][9] = "<div style='margin-rigth:1em' class='tooltip-btn'> <span class='tooltiptext-btn'>Comentarios  </span> <span tag-tipo-orden='pendientes'  tag-cuentafactura="+String.valueOf(object.get("claveCliente"))+" tag-indextr='"+String.valueOf(i)+"' class='abrir-modal-chat icono-accion icono-asigancion fa fa-fw fa-commenting'></span> </div> "
                        		+ "<div style='margin-rigth:1em' class='tooltip-btn'> <span class='tooltiptext-btn'>Informaci&oacute;n  </span> <span onclick='consultarDetalleFunction()' tag-tipo-orden='pendientes'  tag-cuentafactura="+String.valueOf(object.get("claveCliente"))+" tag-indextr="+String.valueOf(i)+" class='abrir-modal-detail icono-accion icono-asigancion fa fa-fw fa-tasks'></span> </div> "
                        	 + "<div class='tooltip-btn'> <span class='tooltiptext-btn'>Agendar </span> <span onclick='consultarAgendamientoFunction()' tag-tipo-orden='pendientes'  tag-cuentafactura="+String.valueOf(object.get("claveCliente"))+" tag-num-cuenta-factura="+String.valueOf(object.get("claveCliente"))+" tag-indextr="+String.valueOf(i)+" class='abrir-agendamiento icono-accion icono-asigancion fa fa-fw fa-calendar'></span> </div>";
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
	public DataTableResponse consultaRescataventas(ParamConsultaOTPI paramsOT) {
		logger.info("ImplCoordInstalacionesService.class [metodo consultaRescataventas() ]\n" + gson.toJson(paramsOT));
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
        String urlRequest = principalDetail.getDireccionAmbiente().concat(constCoordInst.getConsultaGeneralOt());
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
                        dataArray[count][4] = object.get("claveCliente") != null ? object.get("claveCliente").getAsString().trim() : "";
                        dataArray[count][5] = object.get("descripcionMotivo") != null ? object.get("descripcionMotivo").getAsString().trim() : "";
                        dataArray[count][6] = object.get("descripcionEstatus") != null ? object.get("descripcionEstatus").getAsString().trim() : "";
                        dataArray[count][7] = object.get("descripcionEstado") != null ? object.get("descripcionEstado").getAsString().trim() : "";
                        // dataArray[count][8] = "<div class='tooltip-btn'> <span onclick='consultaMaterialesOT(" + String.valueOf(object.get("idOrden").getAsInt()) + ")' class='btn-floating btn-option btn-sm btn-default waves-effect waves-light'><th><i class='icono_cons_bg fa fa-wrench' aria-hidden='true'></i></th></span></div>";
                        // dataArray[count][9] = "<div class='tooltip-btn'> <span onclick='consultaImagenesOT(" + String.valueOf(object.get("idOrden").getAsInt()) + ")' class='btn-option btn-floating btn-evidencia btn-sm btn-secondary waves-effect waves-light'><th><i class='icono_cons_bg fa fa-picture-o' aria-hidden='true'></i></th></span></div>";
                        dataArray[count][8] = object.get("fechaAgenda") != null ? object.get("fechaAgenda").getAsString().trim() : "";
                        dataArray[count][9] = "<div style='margin-rigth:1em' class='tooltip-btn'> <span class='tooltiptext-btn'>Comentarios  </span> <span tag-tipo-orden='pendientes'  tag-cuentafactura="+String.valueOf(object.get("claveCliente"))+" tag-indextr='"+String.valueOf(i)+"' class='abrir-modal-chat icono-accion icono-asigancion fa fa-fw fa-commenting'></span> </div> "
                        		+ "<div style='margin-rigth:1em' class='tooltip-btn'> <span class='tooltiptext-btn'>Informaci&oacute;n  </span> <span onclick='consultarDetalleFunction()' tag-tipo-orden='pendientes'  tag-cuentafactura="+String.valueOf(object.get("claveCliente"))+" tag-indextr="+String.valueOf(i)+" class='abrir-modal-detail icono-accion icono-asigancion fa fa-fw fa-tasks'></span> </div> "
                        	 + "<div class='tooltip-btn'> <span class='tooltiptext-btn'>Agendar </span> <span onclick='consultarAgendamientoFunction()' tag-tipo-orden='pendientes'  tag-cuentafactura="+String.valueOf(object.get("claveCliente"))+" tag-num-cuenta-factura="+String.valueOf(object.get("claveCliente"))+" tag-indextr="+String.valueOf(i)+" class='abrir-agendamiento icono-accion icono-asigancion fa fa-fw fa-calendar'></span> </div>";count++;
 
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
	public DataTableResponse consultaPendientesActivar(ParamConsultaOTPI paramsOT) {
		logger.info("ImplCoordInstalacionesService.class [metodo consultaPendientesAgenda() ]\n" + gson.toJson(paramsOT));
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
        String urlRequest = principalDetail.getDireccionAmbiente().concat(constCoordInst.getConsultaGeneralOt());
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
                        dataArray[count][4] = object.get("claveCliente") != null ? object.get("claveCliente").getAsString().trim() : "";
                        dataArray[count][5] = object.get("descripcionMotivo") != null ? object.get("descripcionMotivo").getAsString().trim() : "";
                        dataArray[count][6] = object.get("descripcionEstatus") != null ? object.get("descripcionEstatus").getAsString().trim() : "";
                        dataArray[count][7] = object.get("descripcionEstado") != null ? object.get("descripcionEstado").getAsString().trim() : "";
                        // dataArray[count][8] = "<div class='tooltip-btn'> <span onclick='consultaMaterialesOT(" + String.valueOf(object.get("idOrden").getAsInt()) + ")' class='btn-floating btn-option btn-sm btn-default waves-effect waves-light'><th><i class='icono_cons_bg fa fa-wrench' aria-hidden='true'></i></th></span></div>";
                        // dataArray[count][9] = "<div class='tooltip-btn'> <span onclick='consultaImagenesOT(" + String.valueOf(object.get("idOrden").getAsInt()) + ")' class='btn-option btn-floating btn-evidencia btn-sm btn-secondary waves-effect waves-light'><th><i class='icono_cons_bg fa fa-picture-o' aria-hidden='true'></i></th></span></div>";
                        dataArray[count][8] = object.get("fechaAgenda") != null ? object.get("fechaAgenda").getAsString().trim() : "";
                        dataArray[count][9] = "<div style='margin-rigth:1em' class='tooltip-btn'> <span class='tooltiptext-btn'>Comentarios  </span> <span tag-tipo-orden='pendientes'  tag-cuentafactura="+String.valueOf(object.get("claveCliente"))+" tag-indextr='"+String.valueOf(i)+"' class='abrir-modal-chat icono-accion icono-asigancion fa fa-fw fa-commenting'></span> </div> "
                        		+ "<div style='margin-rigth:1em' class='tooltip-btn'> <span class='tooltiptext-btn'>Informaci&oacute;n  </span> <span onclick='consultarDetalleFunction()' tag-tipo-orden='pendientes'  tag-cuentafactura="+String.valueOf(object.get("claveCliente"))+" tag-indextr="+String.valueOf(i)+" class='abrir-modal-detail icono-accion icono-asigancion fa fa-fw fa-tasks'></span> </div> "
                        	 + "<div class='tooltip-btn'> <span class='tooltiptext-btn'>Agendar </span> <span onclick='consultarAgendamientoFunction()' tag-tipo-orden='pendientes'  tag-cuentafactura="+String.valueOf(object.get("claveCliente"))+" tag-num-cuenta-factura="+String.valueOf(object.get("claveCliente"))+" tag-indextr="+String.valueOf(i)+" class='abrir-agendamiento icono-accion icono-asigancion fa fa-fw fa-calendar'></span> </div>";count++;
 
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
	public DataTableResponse consultaCandelarizado(ParamConsultaOTPI paramsOT) {
		logger.info("ImplCoordInstalacionesService.class [metodo consultaPendientesAgenda() ]\n" + gson.toJson(paramsOT));
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
        String urlRequest = principalDetail.getDireccionAmbiente().concat(constCoordInst.getConsultaGeneralOt());
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
                        dataArray[count][3] = object.get("claveCliente") != null ? object.get("claveCliente").getAsString().trim() : "";
                        dataArray[count][4] = object.get("fechaAgenda") != null ? object.get("fechaAgenda").getAsString().trim() : "";
                        dataArray[count][5] = object.get("descripcionMotivo") != null ? object.get("descripcionMotivo").getAsString().trim() : "";
                        dataArray[count][6] = object.get("descripcionEstatus") != null ? object.get("descripcionEstatus").getAsString().trim() : "";
                        dataArray[count][7] = object.get("descripcionEstado") != null ? object.get("descripcionEstado").getAsString().trim() : "";
                        // dataArray[count][8] = "<div class='tooltip-btn'> <span onclick='consultaMaterialesOT(" + String.valueOf(object.get("idOrden").getAsInt()) + ")' class='btn-floating btn-option btn-sm btn-default waves-effect waves-light'><th><i class='icono_cons_bg fa fa-wrench' aria-hidden='true'></i></th></span></div>";
                        // dataArray[count][9] = "<div class='tooltip-btn'> <span onclick='consultaImagenesOT(" + String.valueOf(object.get("idOrden").getAsInt()) + ")' class='btn-option btn-floating btn-evidencia btn-sm btn-secondary waves-effect waves-light'><th><i class='icono_cons_bg fa fa-picture-o' aria-hidden='true'></i></th></span></div>";
                        dataArray[count][8] = object.get("ciudad") != null ? object.get("ciudad").getAsString().trim() : "";
                        dataArray[count][9] = "";
                        dataArray[count][9] = "<div style='margin-rigth:1em' class='tooltip-btn'> <span class='tooltiptext-btn'>Comentarios  </span> <span tag-tipo-orden='pendientes'  tag-cuentafactura="+String.valueOf(object.get("claveCliente"))+" tag-indextr='"+String.valueOf(i)+"' class='abrir-modal-chat icono-accion icono-asigancion fa fa-fw fa-commenting'></span> </div> "
                        		+ "<div style='margin-rigth:1em' class='tooltip-btn'> <span class='tooltiptext-btn'>Informaci&oacute;n  </span> <span onclick='consultarDetalleFunction()' tag-tipo-orden='pendientes'  tag-cuentafactura="+String.valueOf(object.get("claveCliente"))+" tag-indextr="+String.valueOf(i)+" class='abrir-modal-detail icono-accion icono-asigancion fa fa-fw fa-tasks'></span> </div> "
                        	 + "<div class='tooltip-btn'> <span class='tooltiptext-btn'>Agendar </span> <span onclick='consultarAgendamientoFunction()' tag-tipo-orden='pendientes'  tag-cuentafactura="+String.valueOf(object.get("claveCliente"))+" tag-num-cuenta-factura="+String.valueOf(object.get("claveCliente"))+" tag-indextr="+String.valueOf(i)+" class='abrir-agendamiento icono-accion icono-asigancion fa fa-fw fa-calendar'></span> </div>";count++;
 
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
	public DataTableResponse consultaPlazasComerciales(ParamConsultaOTPI paramsOT) {
		logger.info("ImplCoordInstalacionesService.class [metodo consultaPendientesAgenda() ]\n" + gson.toJson(paramsOT));
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
        String urlRequest = principalDetail.getDireccionAmbiente().concat(constCoordInst.getConsultaGeneralOt());
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
                        dataArray[count][4] = object.get("claveCliente") != null ? object.get("claveCliente").getAsString().trim() : "";
                        dataArray[count][5] = object.get("descripcionMotivo") != null ? object.get("descripcionMotivo").getAsString().trim() : "";
                        dataArray[count][6] = object.get("descripcionEstatus") != null ? object.get("descripcionEstatus").getAsString().trim() : "";
                        dataArray[count][7] = object.get("descripcionEstado") != null ? object.get("descripcionEstado").getAsString().trim() : "";
                        // dataArray[count][8] = "<div class='tooltip-btn'> <span onclick='consultaMaterialesOT(" + String.valueOf(object.get("idOrden").getAsInt()) + ")' class='btn-floating btn-option btn-sm btn-default waves-effect waves-light'><th><i class='icono_cons_bg fa fa-wrench' aria-hidden='true'></i></th></span></div>";
                        // dataArray[count][9] = "<div class='tooltip-btn'> <span onclick='consultaImagenesOT(" + String.valueOf(object.get("idOrden").getAsInt()) + ")' class='btn-option btn-floating btn-evidencia btn-sm btn-secondary waves-effect waves-light'><th><i class='icono_cons_bg fa fa-picture-o' aria-hidden='true'></i></th></span></div>";
                        dataArray[count][8] = object.get("fechaAgenda") != null ? object.get("fechaAgenda").getAsString().trim() : "";
                        dataArray[count][9] = "<div style='margin-rigth:1em' class='tooltip-btn'> <span class='tooltiptext-btn'>Comentarios  </span> <span tag-tipo-orden='pendientes'  tag-cuentafactura="+String.valueOf(object.get("claveCliente"))+" tag-indextr='"+String.valueOf(i)+"' class='abrir-modal-chat icono-accion icono-asigancion fa fa-fw fa-commenting'></span> </div> "
                        		+ "<div style='margin-rigth:1em' class='tooltip-btn'> <span class='tooltiptext-btn'>Informaci&oacute;n  </span> <span onclick='consultarDetalleFunction()' tag-tipo-orden='pendientes'  tag-cuentafactura="+String.valueOf(object.get("claveCliente"))+" tag-indextr="+String.valueOf(i)+" class='abrir-modal-detail icono-accion icono-asigancion fa fa-fw fa-tasks'></span> </div> "
                        	 + "<div class='tooltip-btn'> <span class='tooltiptext-btn'>Agendar </span> <span onclick='consultarAgendamientoFunction()' tag-tipo-orden='pendientes'  tag-cuentafactura="+String.valueOf(object.get("claveCliente"))+" tag-num-cuenta-factura="+String.valueOf(object.get("claveCliente"))+" tag-indextr="+String.valueOf(i)+" class='abrir-agendamiento icono-accion icono-asigancion fa fa-fw fa-calendar'></span> </div>";count++;
 
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
	public DataTableResponse consultaCanceladas(ParamConsultaOTPI paramsOT) {
		logger.info("ImplCoordInstalacionesService.class [metodo consultaPendientesAgenda() ]\n" + gson.toJson(paramsOT));
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
        String urlRequest = principalDetail.getDireccionAmbiente().concat(constCoordInst.getConsultaGeneralOt());
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
                        dataArray[count][2] = object.get("claveCliente") != null ? object.get("claveCliente").getAsString().trim() : "";
                        dataArray[count][5] = object.get("descripcionMotivo") != null ? object.get("descripcionMotivo").getAsString().trim() : "";
                        dataArray[count][6] = object.get("descripcionEstatus") != null ? object.get("descripcionEstatus").getAsString().trim() : "";
                        dataArray[count][7] = object.get("descripcionEstado") != null ? object.get("descripcionEstado").getAsString().trim() : "";
                        // dataArray[count][8] = "<div class='tooltip-btn'> <span onclick='consultaMaterialesOT(" + String.valueOf(object.get("idOrden").getAsInt()) + ")' class='btn-floating btn-option btn-sm btn-default waves-effect waves-light'><th><i class='icono_cons_bg fa fa-wrench' aria-hidden='true'></i></th></span></div>";
                        // dataArray[count][9] = "<div class='tooltip-btn'> <span onclick='consultaImagenesOT(" + String.valueOf(object.get("idOrden").getAsInt()) + ")' class='btn-option btn-floating btn-evidencia btn-sm btn-secondary waves-effect waves-light'><th><i class='icono_cons_bg fa fa-picture-o' aria-hidden='true'></i></th></span></div>";
                        dataArray[count][8] = object.get("fechaAgenda") != null ? object.get("fechaAgenda").getAsString().trim() : "";
                        dataArray[count][9] = "<div style='margin-rigth:1em' class='tooltip-btn'> <span class='tooltiptext-btn'>Comentarios  </span> <span tag-tipo-orden='pendientes'  tag-cuentafactura="+String.valueOf(object.get("claveCliente"))+" tag-indextr='"+String.valueOf(i)+"' class='abrir-modal-chat icono-accion icono-asigancion fa fa-fw fa-commenting'></span> </div> "
                        		+ "<div style='margin-rigth:1em' class='tooltip-btn'> <span class='tooltiptext-btn'>Informaci&oacute;n  </span> <span onclick='consultarDetalleFunction()' tag-tipo-orden='pendientes'  tag-cuentafactura="+String.valueOf(object.get("claveCliente"))+" tag-indextr="+String.valueOf(i)+" class='abrir-modal-detail icono-accion icono-asigancion fa fa-fw fa-tasks'></span> </div> "
                        	 + "<div class='tooltip-btn'> <span class='tooltiptext-btn'>Agendar </span> <span onclick='consultarAgendamientoFunction()' tag-tipo-orden='pendientes'  tag-cuentafactura="+String.valueOf(object.get("claveCliente"))+" tag-num-cuenta-factura="+String.valueOf(object.get("claveCliente"))+" tag-indextr="+String.valueOf(i)+" class='abrir-agendamiento icono-accion icono-asigancion fa fa-fw fa-calendar'></span> </div>";count++;
 
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
	public DataTableResponse consultaReagenda(ParamConsultaOTPI paramsOT) {
		logger.info("ImplCoordInstalacionesService.class [metodo consultaPendientesAgenda() ]\n" + gson.toJson(paramsOT));
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
        String urlRequest = principalDetail.getDireccionAmbiente().concat(constCoordInst.getConsultaGeneralOt());
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
                        dataArray[count][4] = object.get("claveCliente") != null ? object.get("claveCliente").getAsString().trim() : "";
                        dataArray[count][5] = object.get("descripcionMotivo") != null ? object.get("descripcionMotivo").getAsString().trim() : "";
                        dataArray[count][6] = object.get("descripcionEstatus") != null ? object.get("descripcionEstatus").getAsString().trim() : "";
                        dataArray[count][7] = object.get("descripcionEstado") != null ? object.get("descripcionEstado").getAsString().trim() : "";
                        // dataArray[count][8] = "<div class='tooltip-btn'> <span onclick='consultaMaterialesOT(" + String.valueOf(object.get("idOrden").getAsInt()) + ")' class='btn-floating btn-option btn-sm btn-default waves-effect waves-light'><th><i class='icono_cons_bg fa fa-wrench' aria-hidden='true'></i></th></span></div>";
                        // dataArray[count][9] = "<div class='tooltip-btn'> <span onclick='consultaImagenesOT(" + String.valueOf(object.get("idOrden").getAsInt()) + ")' class='btn-option btn-floating btn-evidencia btn-sm btn-secondary waves-effect waves-light'><th><i class='icono_cons_bg fa fa-picture-o' aria-hidden='true'></i></th></span></div>";
                        dataArray[count][8] = object.get("fechaAgenda") != null ? object.get("fechaAgenda").getAsString().trim() : "";
                        dataArray[count][9] = "<div style='margin-rigth:1em' class='tooltip-btn'> <span class='tooltiptext-btn'>Comentarios  </span> <span tag-tipo-orden='pendientes'  tag-cuentafactura="+String.valueOf(object.get("claveCliente"))+" tag-indextr='"+String.valueOf(i)+"' class='abrir-modal-chat icono-accion icono-asigancion fa fa-fw fa-commenting'></span> </div> "
                        		+ "<div style='margin-rigth:1em' class='tooltip-btn'> <span class='tooltiptext-btn'>Informaci&oacute;n  </span> <span onclick='consultarDetalleFunction()' tag-tipo-orden='pendientes'  tag-cuentafactura="+String.valueOf(object.get("claveCliente"))+" tag-indextr="+String.valueOf(i)+" class='abrir-modal-detail icono-accion icono-asigancion fa fa-fw fa-tasks'></span> </div> "
                        	 + "<div class='tooltip-btn'> <span class='tooltiptext-btn'>Agendar </span> <span onclick='consultarAgendamientoFunction()' tag-tipo-orden='pendientes'  tag-cuentafactura="+String.valueOf(object.get("claveCliente"))+" tag-num-cuenta-factura="+String.valueOf(object.get("claveCliente"))+" tag-indextr="+String.valueOf(i)+" class='abrir-agendamiento icono-accion icono-asigancion fa fa-fw fa-calendar'></span> </div>";
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
	public DataTableResponse consultaCalendarizadoVencido(ParamConsultaOTPI paramsOT) {
		logger.info("ImplCoordInstalacionesService.class [metodo consultaPendientesAgenda() ]\n" + gson.toJson(paramsOT));
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
        String urlRequest = principalDetail.getDireccionAmbiente().concat(constCoordInst.getConsultaGeneralOt());
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
                        dataArray[count][4] = object.get("claveCliente") != null ? object.get("claveCliente").getAsString().trim() : "";
                        dataArray[count][5] = object.get("descripcionMotivo") != null ? object.get("descripcionMotivo").getAsString().trim() : "";
                        dataArray[count][6] = object.get("descripcionEstatus") != null ? object.get("descripcionEstatus").getAsString().trim() : "";
                        dataArray[count][7] = object.get("descripcionEstado") != null ? object.get("descripcionEstado").getAsString().trim() : "";
                        // dataArray[count][8] = "<div class='tooltip-btn'> <span onclick='consultaMaterialesOT(" + String.valueOf(object.get("idOrden").getAsInt()) + ")' class='btn-floating btn-option btn-sm btn-default waves-effect waves-light'><th><i class='icono_cons_bg fa fa-wrench' aria-hidden='true'></i></th></span></div>";
                        // dataArray[count][9] = "<div class='tooltip-btn'> <span onclick='consultaImagenesOT(" + String.valueOf(object.get("idOrden").getAsInt()) + ")' class='btn-option btn-floating btn-evidencia btn-sm btn-secondary waves-effect waves-light'><th><i class='icono_cons_bg fa fa-picture-o' aria-hidden='true'></i></th></span></div>";
                        dataArray[count][8] = object.get("fechaAgenda") != null ? object.get("fechaAgenda").getAsString().trim() : "";
                        dataArray[count][9] = "<div style='margin-rigth:1em' class='tooltip-btn'> <span class='tooltiptext-btn'>Comentarios  </span> <span tag-tipo-orden='pendientes'  tag-cuentafactura="+String.valueOf(object.get("claveCliente"))+" tag-indextr='"+String.valueOf(i)+"' class='abrir-modal-chat icono-accion icono-asigancion fa fa-fw fa-commenting'></span> </div> "
                        		+ "<div style='margin-rigth:1em' class='tooltip-btn'> <span class='tooltiptext-btn'>Informaci&oacute;n  </span> <span onclick='consultarDetalleFunction()' tag-tipo-orden='pendientes'  tag-cuentafactura="+String.valueOf(object.get("claveCliente"))+" tag-indextr="+String.valueOf(i)+" class='abrir-modal-detail icono-accion icono-asigancion fa fa-fw fa-tasks'></span> </div> "
                        	 + "<div class='tooltip-btn'> <span class='tooltiptext-btn'>Agendar </span> <span onclick='consultarAgendamientoFunction()' tag-tipo-orden='pendientes'  tag-cuentafactura="+String.valueOf(object.get("claveCliente"))+" tag-num-cuenta-factura="+String.valueOf(object.get("claveCliente"))+" tag-indextr="+String.valueOf(i)+" class='abrir-agendamiento icono-accion icono-asigancion fa fa-fw fa-calendar'></span> </div>";
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
	public DataTableResponse consultaTerminada(ParamConsultaOTPI paramsOT) {
		logger.info("ImplCoordInstalacionesService.class [metodo consultaPendientesAgenda() ]\n" + gson.toJson(paramsOT));
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
        String urlRequest = principalDetail.getDireccionAmbiente().concat(constCoordInst.getConsultaGeneralOt());
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
                        dataArray[count][4] = object.get("claveCliente") != null ? object.get("claveCliente").getAsString().trim() : "";
                        dataArray[count][5] = object.get("descripcionMotivo") != null ? object.get("descripcionMotivo").getAsString().trim() : "";
                        dataArray[count][6] = object.get("descripcionEstatus") != null ? object.get("descripcionEstatus").getAsString().trim() : "";
                        dataArray[count][7] = object.get("descripcionEstado") != null ? object.get("descripcionEstado").getAsString().trim() : "";
                        // dataArray[count][8] = "<div class='tooltip-btn'> <span onclick='consultaMaterialesOT(" + String.valueOf(object.get("idOrden").getAsInt()) + ")' class='btn-floating btn-option btn-sm btn-default waves-effect waves-light'><th><i class='icono_cons_bg fa fa-wrench' aria-hidden='true'></i></th></span></div>";
                        // dataArray[count][9] = "<div class='tooltip-btn'> <span onclick='consultaImagenesOT(" + String.valueOf(object.get("idOrden").getAsInt()) + ")' class='btn-option btn-floating btn-evidencia btn-sm btn-secondary waves-effect waves-light'><th><i class='icono_cons_bg fa fa-picture-o' aria-hidden='true'></i></th></span></div>";
                        dataArray[count][8] = object.get("fechaAgenda") != null ? object.get("fechaAgenda").getAsString().trim() : "";
                        dataArray[count][9] = "<div style='margin-rigth:1em' class='tooltip-btn'> <span class='tooltiptext-btn'>Comentarios  </span> <span tag-tipo-orden='pendientes'  tag-cuentafactura="+String.valueOf(object.get("claveCliente"))+" tag-indextr='"+String.valueOf(i)+"' class='abrir-modal-chat icono-accion icono-asigancion fa fa-fw fa-commenting'></span> </div> "
                        		+ "<div style='margin-rigth:1em' class='tooltip-btn'> <span class='tooltiptext-btn'>Informaci&oacute;n  </span> <span onclick='consultarDetalleFunction()' tag-tipo-orden='pendientes'  tag-cuentafactura="+String.valueOf(object.get("claveCliente"))+" tag-indextr="+String.valueOf(i)+" class='abrir-modal-detail icono-accion icono-asigancion fa fa-fw fa-tasks'></span> </div> "
                        	 + "<div class='tooltip-btn'> <span class='tooltiptext-btn'>Agendar </span> <span onclick='consultarAgendamientoFunction()' tag-tipo-orden='pendientes'  tag-cuentafactura="+String.valueOf(object.get("claveCliente"))+" tag-num-cuenta-factura="+String.valueOf(object.get("claveCliente"))+" tag-indextr="+String.valueOf(i)+" class='abrir-agendamiento icono-accion icono-asigancion fa fa-fw fa-calendar'></span> </div>";
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
	public DataTableResponse consultaDetenidas(ParamConsultaOTPI paramsOT) {
		logger.info("ImplCoordInstalacionesService.class [metodo consultaPendientesAgenda() ]\n" + gson.toJson(paramsOT));
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
        String urlRequest = principalDetail.getDireccionAmbiente().concat(constCoordInst.getConsultaGeneralOt());
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
                        dataArray[count][4] = object.get("claveCliente") != null ? object.get("claveCliente").getAsString().trim() : "";
                        dataArray[count][5] = object.get("descripcionMotivo") != null ? object.get("descripcionMotivo").getAsString().trim() : "";
                        dataArray[count][6] = object.get("descripcionEstatus") != null ? object.get("descripcionEstatus").getAsString().trim() : "";
                        dataArray[count][7] = object.get("descripcionEstado") != null ? object.get("descripcionEstado").getAsString().trim() : "";
                        // dataArray[count][8] = "<div class='tooltip-btn'> <span onclick='consultaMaterialesOT(" + String.valueOf(object.get("idOrden").getAsInt()) + ")' class='btn-floating btn-option btn-sm btn-default waves-effect waves-light'><th><i class='icono_cons_bg fa fa-wrench' aria-hidden='true'></i></th></span></div>";
                        // dataArray[count][9] = "<div class='tooltip-btn'> <span onclick='consultaImagenesOT(" + String.valueOf(object.get("idOrden").getAsInt()) + ")' class='btn-option btn-floating btn-evidencia btn-sm btn-secondary waves-effect waves-light'><th><i class='icono_cons_bg fa fa-picture-o' aria-hidden='true'></i></th></span></div>";
                        dataArray[count][8] = object.get("fechaAgenda") != null ? object.get("fechaAgenda").getAsString().trim() : "";
                        dataArray[count][9] = "<div style='margin-rigth:1em' class='tooltip-btn'> <span class='tooltiptext-btn'>Comentarios  </span> <span tag-tipo-orden='pendientes'  tag-cuentafactura="+String.valueOf(object.get("claveCliente"))+" tag-indextr='"+String.valueOf(i)+"' class='abrir-modal-chat icono-accion icono-asigancion fa fa-fw fa-commenting'></span> </div> "
                        		+ "<div style='margin-rigth:1em' class='tooltip-btn'> <span class='tooltiptext-btn'>Informaci&oacute;n  </span> <span onclick='consultarDetalleFunction()' tag-tipo-orden='pendientes'  tag-cuentafactura="+String.valueOf(object.get("claveCliente"))+" tag-indextr="+String.valueOf(i)+" class='abrir-modal-detail icono-accion icono-asigancion fa fa-fw fa-tasks'></span> </div> "
                        	 + "<div class='tooltip-btn'> <span class='tooltiptext-btn'>Agendar </span> <span onclick='consultarAgendamientoFunction()' tag-tipo-orden='pendientes'  tag-cuentafactura="+String.valueOf(object.get("claveCliente"))+" tag-num-cuenta-factura="+String.valueOf(object.get("claveCliente"))+" tag-indextr="+String.valueOf(i)+" class='abrir-agendamiento icono-accion icono-asigancion fa fa-fw fa-calendar'></span> </div>";
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
	public ServiceResponseResult consultaDetalleOTBsqGeneral(String params) {
		JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
		logger.info("ImplCoordInstalacionesService.class [metodo = consultaDetalleOTBsqGeneral() ]\n"+params);
		LoginResult principalDetail=utilerias.obtenerObjetoPrincipal();
		String tokenAcces=principalDetail.getAccess_token() ;
		logger.info("consultaDetalleOTBsqGeneral ##+"+tokenAcces);	
		String parametro=jsonObject.get("name_os").getAsString();
		logger.info(parametro);
			 
		String urlRequest="http://10.216.48.100"+constCoordInst.getBusquedaDetalleGralConstante();
		Map<String, String> paramsRequestGet = new HashMap<String, String>();
		paramsRequestGet.put("id", parametro.trim());	 
		ServiceResponseResult response=restCaller.callGetBearerTokenRequest(paramsRequestGet, 
				urlRequest, 
				ServiceResponseResult.class, 
				tokenAcces);
		logger.info("RESULT"+gson.toJson(response));
		return response;
	}

	@Override
	public DataTableResponse consultarBandejaFFM(ParamFFMCoordInstalacionesVO params) {
		//JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
		logger.info("ImplCoordInstalacionesService.class [metodo = consultarBandejaFFM() ]\n"+params);
		LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
		 String[][] dataArray = null;
		DataTableResponse dataResponse = DataTableResponse.builder()
                .isRespuesta(false)
                .data(new String[0][10])
                .paginaActual(0)
                .registrosTotales(0)
                .recordsFiltered("0")
                .recordsTotal("0")
                .draw(params.getDraw() + "")
                .result(null).build();
		params.setPagina((Integer.parseInt(params.getStart()) + 10) / 10);
		
		//jsonObject.set
		
		//jsonObject.get("name_os").getAsString();
		logger.info("### Object: " + gson.toJson(params));
		
        try {
        	ServiceResponseResult response = restCaller.callPostBearerTokenRequest(gson.toJson(params), principalDetail.getDireccionAmbiente().concat(constCoordInst.getConsultarBandejaFFM()),
                    ServiceResponseResult.class, principalDetail.getAccess_token());
    		logger.info("##### RESULT" + gson.toJson(response) + " #######");
        	if (response.getResult() instanceof Integer){
        		dataResponse = DataTableResponse.builder()
	                .isRespuesta(false)
	                .data(new String[0][10])
	                .paginaActual(0)
	                .registrosTotales(0)
	                .recordsFiltered("0")
	                .recordsTotal("0")
	                .draw(params.getDraw() + "")
	                .result(response.getResult()).build();
        	} else {
        		JsonObject jsonObjectResponse = gson.fromJson(gson.toJson(response.getResult()), JsonObject.class);
        		JsonArray ordenesArray = jsonObjectResponse.getAsJsonArray("ordenes");
        		if (ordenesArray.size() > 0) {
        			if (jsonObjectResponse.get("registrosTotales").getAsInt() > 0) {
        				//TABLA
        				int count = 0;
                        dataArray = new String[ordenesArray.size()][10];
                        for (int i = 0; i < ordenesArray.size(); i++) {
                        	JsonObject object = (JsonObject) ordenesArray.get(i);
                        	dataArray[count][0] = object.get("idOrden").getAsInt() != 0 ? String.valueOf(object.get("idOrden").getAsInt()) : "";
                        	dataArray[count][1] = object.get("folioSistema") != null ? object.get("folioSistema").getAsString().trim() : "";
                        	dataArray[count][2] = object.get("claveCliente") != null ? object.get("claveCliente").getAsString().trim() : "";
                        	dataArray[count][3] = object.get("cliente") != null ? object.get("cliente").getAsString().trim() : "";
                        	dataArray[count][4] = object.get("fechaActualizacion") != null ? object.get("fechaActualizacion").getAsString().trim() : "";
                        	dataArray[count][5] = object.get("estatus") != null ? object.get("estatus").getAsString().trim() : "";
                        	dataArray[count][6] = object.get("estado") != null ? object.get("estado").getAsString().trim() : "";
                        	dataArray[count][7] = object.get("motivo") != null ? object.get("motivo").getAsString().trim() : "";
                        	dataArray[count][8] = object.get("usuarioActualiza") != null ? object.get("usuarioActualiza").getAsString().trim() : "";
                        	//dataArray[count][9] = object.get("tipoOrden") != null ? object.get("tipoOrden").getAsString().trim() : "";
                        	//dataArray[count][10] = object.get("subTipoOrden") != null ? object.get("subTipoOrden").getAsString().trim() : "";
                        	dataArray[count][9] = "<div class='tooltip-btn'> <span onclick='consultaDetalleOt(" + object.get("idOrden").getAsInt() + 
                        			")' class='btn-floating btn-option btn-sm btn-secondary waves-effect waves-light acciones'><th><i class='icono_cons_bg fa fa-bars' aria-hidden='true'></i></th></span></div>";
                        	count++;
                        }
                        dataResponse = DataTableResponse.builder()
                                .isRespuesta(true)
                                .data(dataArray)
                                .paginaActual(jsonObjectResponse.get("paginaActual").getAsInt())
                                .registrosTotales(jsonObjectResponse.get("registrosTotales").getAsInt())
                                .recordsFiltered(jsonObjectResponse.get("registrosTotales").getAsInt() + "")
                                .recordsTotal(jsonObjectResponse.get("registrosTotales").getAsInt() + "")
                                .draw(params.getDraw() + "")
                                .result(response.getResult()).build();
        			} else {
        				dataResponse = DataTableResponse.builder()
                                .isRespuesta(true)
                                .data(new String[0][10])
                                .paginaActual(jsonObjectResponse.get("paginaActual").getAsInt())
                                .registrosTotales(jsonObjectResponse.get("registrosTotales").getAsInt())
                                .recordsFiltered(jsonObjectResponse.get("registrosTotales").getAsInt() + "")
                                .recordsTotal(jsonObjectResponse.get("registrosTotales").getAsInt() + "")
                                .draw(params.getDraw() + "")
                                .result(response.getResult()).build();
        			}
        		}
        	}
        } catch (Exception ex) {
        	logger.info("Error: "+ex);
        }
        
        logger.info("*** Objeto Response: " + gson.toJson(dataResponse));
		
		return dataResponse;
	}
	
}
