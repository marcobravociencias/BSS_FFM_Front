package com.mx.totalplay.ffm.cloudweb.projectmanager.service.impl;

import java.util.HashMap;
import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.mx.totalplay.ffm.cloudweb.plantainterna.service.impl.ImplCoordInstalacionesService;
import com.mx.totalplay.ffm.cloudweb.projectmanager.model.ParamFFMBandejasEimVO;
import com.mx.totalplay.ffm.cloudweb.projectmanager.service.BandejasEimPMService;
import com.mx.totalplay.ffm.cloudweb.projectmanager.utils.ConstBandejasEim;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.DataTableResponse;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.LoginResult;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.ServiceResponseResult;
import com.mx.totalplay.ffm.cloudweb.utilerias.utils.ConsumeRest;
import com.mx.totalplay.ffm.cloudweb.utilerias.utils.UtileriaGeneral;


@Service
public class ImplBandejaEimService implements BandejasEimPMService {
	private  final Logger logger = LogManager.getLogger(ImplCoordInstalacionesService.class.getName());
	private Gson gson=new Gson();
	private final ConsumeRest restCaller;
	private final UtileriaGeneral utilerias;
	private final ConstBandejasEim constBandejasEim;
	
	@Autowired
	public ImplBandejaEimService(ConstBandejasEim constBandejasEim,ConsumeRest restCaller, UtileriaGeneral utilerias) {
		this.constBandejasEim = constBandejasEim;
		this.restCaller = restCaller;
		this.utilerias = utilerias;
	}
	
	@Override
	public DataTableResponse consultarBandejaEim(ParamFFMBandejasEimVO params) {
		//JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
				logger.info("ImplBandejaEimService.class [metodo = consultarBandejaEim() ]\n"+params);
				LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
				 String[][] dataArray = null;
				DataTableResponse dataResponse = DataTableResponse.builder()
		                .isRespuesta(false)
		                .data(new String[0][7])
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
		        	ServiceResponseResult response = restCaller.callPostBearerTokenRequest(gson.toJson(params), principalDetail.getDireccionAmbiente().concat(constBandejasEim.getConsultaBandejaSinEimApi()),
		                    ServiceResponseResult.class, principalDetail.getAccess_token());
		    		logger.info("##### RESULT" + gson.toJson(response) + " #######");
		        	if (response.getResult() instanceof Integer){
		        		dataResponse = DataTableResponse.builder()
			                .isRespuesta(false)
			                .data(new String[0][7])
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
		                        dataArray = new String[ordenesArray.size()][7];
		                        for (int i = 0; i < ordenesArray.size(); i++) {
		                        	JsonObject object = (JsonObject) ordenesArray.get(i);
		                        	dataArray[count][0] = "<input type='checkbox'/>";
		                        	dataArray[count][1] = object.get("idOrden").getAsInt() != 0 ? String.valueOf(object.get("idOrden").getAsInt()) : "";
		                        	dataArray[count][2] = object.get("folioSistema") != null ? object.get("folioSistema").getAsString().trim() : "";
		                        	dataArray[count][3] = object.get("claveCliente") != null ? object.get("claveCliente").getAsString().trim() : "";
		                        	dataArray[count][4] = object.get("cliente") != null ? object.get("cliente").getAsString().trim() : "";
		                        	dataArray[count][5] = object.get("fechaActualizacion") != null ? object.get("fechaActualizacion").getAsString().trim() : "";
		                        	dataArray[count][6] = object.get("estatus") != null ? object.get("estatus").getAsString().trim() : "";
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
	
	
	@Override
	public DataTableResponse consultarPendientesPorImplementar(ParamFFMBandejasEimVO params) {
		//JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
				logger.info("ImplBandejaEimService.class [metodo = consultarBandejaEim() ]\n"+params);
				LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
				 String[][] dataArray = null;
				DataTableResponse dataResponse = DataTableResponse.builder()
		                .isRespuesta(false)
		                .data(new String[0][18])
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
		        	ServiceResponseResult response = restCaller.callPostBearerTokenRequest(gson.toJson(params), principalDetail.getDireccionAmbiente().concat(constBandejasEim.getConsultaBandejaSinEimApi()),
		                    ServiceResponseResult.class, principalDetail.getAccess_token());
		    		logger.info("##### RESULT" + gson.toJson(response) + " #######");
		        	if (response.getResult() instanceof Integer){
		        		dataResponse = DataTableResponse.builder()
			                .isRespuesta(false)
			                .data(new String[0][18])
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
		                        dataArray = new String[ordenesArray.size()][18];
		                        for (int i = 0; i < ordenesArray.size(); i++) {
		                        	JsonObject object = (JsonObject) ordenesArray.get(i);
		                        	dataArray[count][0] = "<input type='checkbox'/>";
		                        	dataArray[count][1] = object.get("idOrden").getAsInt() != 0 ? String.valueOf(object.get("idOrden").getAsInt()) : "";
		                        	dataArray[count][2] = object.get("folioSistema") != null ? object.get("folioSistema").getAsString().trim() : "";
		                        	dataArray[count][3] = object.get("claveCliente") != null ? object.get("claveCliente").getAsString().trim() : "";
		                        	dataArray[count][4] = object.get("cliente") != null ? object.get("cliente").getAsString().trim() : "";
		                        	dataArray[count][5] = object.get("fechaActualizacion") != null ? object.get("fechaActualizacion").getAsString().trim() : "";
		                        	dataArray[count][6] = object.get("estatus") != null ? object.get("estatus").getAsString().trim() : "";
		                        	dataArray[count][7] = "<input type='checkbox'/>";
		                        	dataArray[count][8] = object.get("idOrden").getAsInt() != 0 ? String.valueOf(object.get("idOrden").getAsInt()) : "";
		                        	dataArray[count][9] = object.get("folioSistema") != null ? object.get("folioSistema").getAsString().trim() : "";
		                        	dataArray[count][10] = object.get("claveCliente") != null ? object.get("claveCliente").getAsString().trim() : "";
		                        	dataArray[count][11] = object.get("cliente") != null ? object.get("cliente").getAsString().trim() : "";
		                        	dataArray[count][12] = object.get("fechaActualizacion") != null ? object.get("fechaActualizacion").getAsString().trim() : "";
		                        	dataArray[count][13] = object.get("estatus") != null ? object.get("estatus").getAsString().trim() : "";
		                        	dataArray[count][14] = "<input type='checkbox'/>";
		                        	dataArray[count][15] = object.get("idOrden").getAsInt() != 0 ? String.valueOf(object.get("idOrden").getAsInt()) : "";   
		                        	dataArray[count][16] = object.get("folioSistema") != null ? object.get("folioSistema").getAsString().trim() : "";
		                        	dataArray[count][17] = object.get("claveCliente") != null ? object.get("claveCliente").getAsString().trim() : "";
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
	
    @Override
	public ServiceResponseResult consultarSinEim(String params) {
		logger.info("ImplBandejaEimService.class [metodo = consultarSinEim() ]\n" + params);
		JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
	    String scot = jsonObject.get("cot").getAsString();
	    String scsp = jsonObject.get("csp").getAsString();
	    String scliente = jsonObject.get("cliente").getAsString();
		LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
		String tokenAcces = principalDetail.getAccess_token();
		String urlRequest = principalDetail.getDireccionAmbiente()
				.concat(constBandejasEim.getConsultaBandejaSinEimApi().concat("?").concat("cot=").concat(scot).concat("&csp=").concat(scsp).concat("&cliente=").concat(scliente));

		logger.info("URL: " + urlRequest);

		Map<String, String> paramsRequestGet = new HashMap<String, String>();
		ServiceResponseResult response = restCaller.callGetBearerTokenRequest(paramsRequestGet, urlRequest,
				ServiceResponseResult.class, tokenAcces);
		return response;
	}

	@Override
	public ServiceResponseResult consultarListaEim() {
		logger.info("ImplBandejaEimService.class [metodo = consultarListaEim() ]\n");
		LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
		String tokenAcces = principalDetail.getAccess_token();
		String urlRequest = principalDetail.getDireccionAmbiente()
				.concat(constBandejasEim.getConsultaListaEim());

		logger.info("URL: " + urlRequest);

		Map<String, String> paramsRequestGet = new HashMap<String, String>();
		ServiceResponseResult response = restCaller.callGetBearerTokenRequest(paramsRequestGet, urlRequest,
				ServiceResponseResult.class, tokenAcces);
		return response;
	}
	
	@Override
	public ServiceResponseResult updateEim(String params) {
        logger.info("ImplBandejaEimService.class [metodo = updateEim() ]\n" + params);
        LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();

        JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
        String tokenAcces = principalDetail.getAccess_token();
        String urlRequest = principalDetail.getDireccionAmbiente().concat(constBandejasEim.getUpdateEim());
        logger.info("URL ##" + urlRequest);

        Map<String, String> paramsRequestGet = new HashMap<String, String>();

        ServiceResponseResult response = restCaller.callPostBearerTokenRequest(jsonObject.toString(), urlRequest,
                ServiceResponseResult.class, tokenAcces);
        logger.info(response);
        return response;
    }

	//solTorreLiderTec
	@Override
	public ServiceResponseResult solTorreLiderTec(String params) {
		logger.info("ImplBandejaEimService.class [metodo = solTorreLiderTec() ]\n" + params);
		LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();

		JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
		String tokenAcces = principalDetail.getAccess_token();
		String urlRequest = principalDetail.getDireccionAmbiente().concat(constBandejasEim.getSolTorreLiderTec());
		logger.info("URL ##" + urlRequest);

		Map<String, String> paramsRequestGet = new HashMap<String, String>();

		ServiceResponseResult response = restCaller.callPostBearerTokenRequest(jsonObject.toString(), urlRequest,
				ServiceResponseResult.class, tokenAcces);
		logger.info(response);
		return response;
	}

	@Override
	public ServiceResponseResult bandejaPendientes(String params) {
	    logger.info("ImplBandejaEimService.class [metodo = bandejaPendientes() ]\n" + params);
	    JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
        String celula = jsonObject.get("celula").getAsString();
        String vertical = jsonObject.get("vertical").getAsString();
        String eim = jsonObject.get("eim").getAsString();
        String cliente = jsonObject.get("cliente").getAsString();
        String tipoSitio = jsonObject.get("tipoSitio").getAsString();
        String cot = jsonObject.get("cot").getAsString();
        String csp = jsonObject.get("csp").getAsString();
        LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
        String tokenAcces = principalDetail.getAccess_token();
        String urlRequest = principalDetail.getDireccionAmbiente()
                .concat(constBandejasEim.getBandejaPendientes().concat("&vertical="+ vertical).concat("&celula="+ celula).concat("&eim="+ eim).concat("&cliente="+ cliente).concat("&tipoSitio="+ tipoSitio).concat("&cot="+ cot).concat("&csp="+ csp));

        logger.info("URL: " + urlRequest);

        Map<String, String> paramsRequestGet = new HashMap<String, String>();
        ServiceResponseResult response = restCaller.callGetBearerTokenRequest(paramsRequestGet, urlRequest,
                ServiceResponseResult.class, tokenAcces);
        return response;
	}
	
	@Override
    public ServiceResponseResult bandejaDependencias(String params) {
        logger.info("ImplBandejaEimService.class [metodo = bandejaDependencias() ]\n" + params);
        JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
        String celula = jsonObject.get("celula").getAsString();
        String vertical = jsonObject.get("vertical").getAsString();
        String eim = jsonObject.get("eim").getAsString();
        String cliente = jsonObject.get("cliente").getAsString();
        String tipoSitio = jsonObject.get("tipoSitio").getAsString();
        String cot = jsonObject.get("cot").getAsString();
        String csp = jsonObject.get("csp").getAsString();
        LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
        String tokenAcces = principalDetail.getAccess_token();
        String urlRequest = principalDetail.getDireccionAmbiente()
                .concat(constBandejasEim.getBandejaPendientes().concat("&vertical="+ vertical).concat("&celula="+ celula).concat("&eim="+ eim).concat("&cliente="+ cliente).concat("&tipoSitio="+ tipoSitio).concat("&cot="+ cot).concat("&csp="+ csp));

        logger.info("URL: " + urlRequest);

        Map<String, String> paramsRequestGet = new HashMap<String, String>();
        ServiceResponseResult response = restCaller.callGetBearerTokenRequest(paramsRequestGet, urlRequest,
                ServiceResponseResult.class, tokenAcces);
        return response;
    }
	
	@Override
    public ServiceResponseResult bandejaImplementacion(String params) {
        logger.info("ImplBandejaEimService.class [metodo = bandejaImplementacion() ]\n" + params);
        LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
        JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
		String eim = jsonObject.get("eim").getAsString();
		String cliente = jsonObject.get("cliente").getAsString();
		String tipoSitio = jsonObject.get("tipoSitio").getAsString();
		String vertical = jsonObject.get("vertical").getAsString();
		String celula = jsonObject.get("celula").getAsString();
		String cot = jsonObject.get("cot").getAsString();
		String csp = jsonObject.get("csp").getAsString();

		String tokenAcces = principalDetail.getAccess_token();
		String urlRequest = principalDetail.getDireccionAmbiente()
				.concat(constBandejasEim.getBandejaImplementacion().concat("&celula="+ celula).concat("&cot="+ cot)
						.concat("&vertical="+ vertical).concat("&eim="+ eim).concat("&csp="+ csp)
						.concat("&cliente="+ cliente).concat("&tipoSitio="+ tipoSitio));

		logger.info("URL: " + urlRequest);

        Map<String, String> paramsRequestGet = new HashMap<String, String>();
        ServiceResponseResult response = restCaller.callGetBearerTokenRequest(paramsRequestGet, urlRequest,
                ServiceResponseResult.class, tokenAcces);
        return response;
    }

    @Override
    public ServiceResponseResult consultarValidacion(String params) {
        // TODO Auto-generated method stub
        logger.info("ImplBandejaEimService.class [metodo = consultarValidacion() ]\n" + params);
        JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
        String vcot = jsonObject.get("cotizacion").getAsString();
        String vcsp = jsonObject.get("numeroCSPsTotales").getAsString();
        String vcliente = jsonObject.get("cliente").getAsString();
        LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
        String tokenAcces = principalDetail.getAccess_token();
        String urlRequest = principalDetail.getDireccionAmbiente()
                .concat(constBandejasEim.getConsultarValidacion().concat("?cliente=" + vcliente).concat("&cotizacion=" + vcot).concat("&numeroCSPsTotales=" + vcsp));

        logger.info("URL: " + urlRequest);

        Map<String, String> paramsRequestGet = new HashMap<String, String>();
        ServiceResponseResult response = restCaller.callGetBearerTokenRequest(paramsRequestGet, urlRequest,
                ServiceResponseResult.class, tokenAcces);
        return response;
    }
    
    @Override
    public ServiceResponseResult localizaOrden(String params) {
        // TODO Auto-generated method stub
        logger.info("ImplBandejaEimService.class [metodo = localizaOrden() ]\n" + params);
        JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
        String os = jsonObject.get("os").getAsString();
        LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
        String tokenAcces = principalDetail.getAccess_token();
        String urlRequest = principalDetail.getDireccionAmbiente()
                .concat(constBandejasEim.getLocalizaOrden().concat(os));

        logger.info("URL: " + urlRequest);

        Map<String, String> paramsRequestGet = new HashMap<String, String>();
        ServiceResponseResult response = restCaller.callGetBearerTokenRequest(paramsRequestGet, urlRequest,
                ServiceResponseResult.class, tokenAcces);
        return response;
    }

    @Override
    public ServiceResponseResult otDia(String params) {
        // TODO Auto-generated method stub
        logger.info("ImplBandejaEimService.class [metodo = otDia() ]\n" + params);
        LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
        String tokenAcces = principalDetail.getAccess_token();
        String urlRequest = principalDetail.getDireccionAmbiente()
                .concat(constBandejasEim.getOtDia());

        logger.info("URL: " + urlRequest);

        Map<String, String> paramsRequestGet = new HashMap<String, String>();
        ServiceResponseResult response = restCaller.callGetBearerTokenRequest(paramsRequestGet, urlRequest,
                ServiceResponseResult.class, tokenAcces);
        return response;
    }

	//bandejaSolicitudesRechazadas
	@Override
	public ServiceResponseResult bandejaSolicitudesRechazadas(String params) {
		// TODO Auto-generated method stub
		logger.info("ImplBandejaEimService.class [metodo = bandejaSolicitudesRechazadas() ]\n" + params);
		JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
		String srcot = jsonObject.get("cotizacion").getAsString();
		String srcsp = jsonObject.get("numeroCSPsTotales").getAsString();
		String srcliente = jsonObject.get("cliente").getAsString();
		LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
		String tokenAcces = principalDetail.getAccess_token();
		String urlRequest = principalDetail.getDireccionAmbiente()
				.concat(constBandejasEim.getBandejaSolicitudesRechazadas().concat("?cliente=" + srcliente).concat("&cotizacion=" + srcot).concat("&numeroCSPsTotales=" + srcsp));

		logger.info("URL: " + urlRequest);

		Map<String, String> paramsRequestGet = new HashMap<String, String>();
		ServiceResponseResult response = restCaller.callGetBearerTokenRequest(paramsRequestGet, urlRequest,
				ServiceResponseResult.class, tokenAcces);
		return response;
	}
	//bandejaSolicitudesPendientes
	@Override
	public ServiceResponseResult bandejaSolicitudesPendientes(String params) {
		// TODO Auto-generated method stub
		logger.info("ImplBandejaEimService.class [metodo = bandejaSolicitudesPendientes() ]\n" + params);
		JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
		String spCot = jsonObject.get("cotizacion").getAsString();
		String spCsp = jsonObject.get("numeroCSPsTotales").getAsString();
		String spCliente = jsonObject.get("cliente").getAsString();
		LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
		String tokenAcces = principalDetail.getAccess_token();
		String urlRequest = principalDetail.getDireccionAmbiente()
				.concat(constBandejasEim.getBandejaSolicitudesPendientes().concat("?cliente=" + spCliente).concat("&cotizacion=" + spCot).concat("&numeroCSPsTotales=" + spCsp));

		logger.info("URL: " + urlRequest);

		Map<String, String> paramsRequestGet = new HashMap<String, String>();
		ServiceResponseResult response = restCaller.callGetBearerTokenRequest(paramsRequestGet, urlRequest,
				ServiceResponseResult.class, tokenAcces);
		return response;
	}
	
}