package com.mx.totalplay.ffm.cloudweb.plantainterna.service.impl;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.mx.totalplay.ffm.cloudweb.plantainterna.service.BusquedaService;
import com.mx.totalplay.ffm.cloudweb.plantainterna.utils.ConstBusqueda;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.LoginResult;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.ServiceResponseResult;
import com.mx.totalplay.ffm.cloudweb.utilerias.utils.ConstantesGeneric;
import com.mx.totalplay.ffm.cloudweb.utilerias.utils.ConsumeRest;
import com.mx.totalplay.ffm.cloudweb.utilerias.utils.UtileriaGeneral;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class ImplBusquedaService implements BusquedaService {
    private final Logger logger = LogManager.getLogger(ImplBusquedaService.class.getName());
    private final ConsumeRest restCaller;
    private ServiceResponseResult response;
    private final Environment environment;
    private final UtileriaGeneral utilerias;
    private Gson gson = new Gson();
    private final ConstantesGeneric constantesGeneric;
    private final ConstBusqueda constBusqueda;
    private String despFFM = "DESPACHO FFM WEB";

    @Autowired
    public ImplBusquedaService(ConsumeRest restCaller, Environment environment, UtileriaGeneral utilerias, ConstantesGeneric constantesGeneric, ConstBusqueda constBusqueda) {
        this.restCaller = restCaller;
        this.environment = environment;
        this.utilerias = utilerias;
        this.constantesGeneric = constantesGeneric;
        this.constBusqueda = constBusqueda;
    }

    
    
    @Override
    public ServiceResponseResult busquedaGeneralSF(String params) {
        JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
        LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
        String tokenAcces = principalDetail.getAccess_token();
        String urlRequest = principalDetail.getDireccionAmbiente().concat(constBusqueda.getBusquedaSaleForces());
        logger.info("### URL busquedaGeneralSF(): \n" + urlRequest);
        Map<String, String> paramsRequestGet = new HashMap<>();
        paramsRequestGet.put("parametro", jsonObject.get("busqueda").getAsString());

        ServiceResponseResult response = restCaller.callGetBearerTokenRequest(
                paramsRequestGet,
                urlRequest,
                ServiceResponseResult.class,
                tokenAcces);

        logger.info("### RESULT busquedaGeneralSF(): " + gson.toJson(response));
        return response;
    }

    @Override
    public ServiceResponseResult consultarDetalleObjectSF(String params) {
        logger.info("ImplBusquedaService.class consultarDetalleObjectSF(): \n" + params);
        JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
        LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
        String tokenAcces = principalDetail.getAccess_token();
        String urlRequest = principalDetail.getDireccionAmbiente().concat(constBusqueda.getConsultaDetalleObjetoSF());
        logger.info("###URL consultarDetalleObjectSF(): "+ urlRequest);
        ServiceResponseResult response = restCaller.callPostBearerTokenRequest(
                params,
                urlRequest,
                ServiceResponseResult.class,
                tokenAcces);
        response = ocultarNumeroDetalleSalesforce(response, jsonObject.get("typeObjectSF").getAsString());
        logger.info("####RESULT: " + gson.toJson(response));
        return response;
    }

    @Override
    public ServiceResponseResult consultaComentariosNoticiasSF(String params) {
        JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
        LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
        String tokenAcces = principalDetail.getAccess_token();
        String urlRequest = principalDetail.getDireccionAmbiente().concat(constBusqueda.getConsultarNoticias());
        logger.info("### URL consultaComentariosNoticiasSF(): \n" + urlRequest);
        Map<String, String> paramsRequestGet = new HashMap<>();
        paramsRequestGet.put("objectId", jsonObject.get("objectId").getAsString());
        paramsRequestGet.put("objectType", jsonObject.get("objectType").getAsString());

        ServiceResponseResult response = restCaller.callGetBearerTokenRequest(
                paramsRequestGet,
                urlRequest,
                ServiceResponseResult.class,
                tokenAcces);

        logger.info("### RESULT consultaComentariosNoticiasSF(): " + gson.toJson(response));
        return response;
    }

    @Override
    public ServiceResponseResult agregarComentariosNoticiaSF(String params) {
        JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
        LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
        String tokenAcces = principalDetail.getAccess_token();
        String urlRequest = principalDetail.getDireccionAmbiente().concat(constBusqueda.getCrearNoticias());
        String nombreE = principalDetail.getUsuarioNombre().concat(" " + principalDetail.getUsuarioApellidoPaterno() + " " + principalDetail.getUsuarioApellidoMaterno());
        String text = jsonObject.get("text").getAsString();
        jsonObject.addProperty("text", principalDetail.getNumEmpleado() + " - " + nombreE + " - " + despFFM + ": " + text);
        logger.info("##### OBJECT: #####" + gson.toJson(jsonObject));
        response = restCaller.callPostBearerTokenRequest(jsonObject.toString(),urlRequest, ServiceResponseResult.class, tokenAcces);
        logger.info("##### RESULT CREACION NOTICIAS: \n" + gson.toJson(response));
        return response;
    }

    @Override
    public ServiceResponseResult consultarEquiposConfigurados(String params) {
    	logger.info("ImplBusquedaService.class [metodo = consultarEquiposConfigurados() ]\n" + params);
        JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
        LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
        String tokenAcces = principalDetail.getAccess_token();
        String urlRequest = principalDetail.getDireccionAmbiente().concat(constBusqueda.getConsultarEquiposConfigurados());
        logger.info("url--- " + urlRequest);
        Map<String, String> paramsRequest = new HashMap<String, String>();
        paramsRequest.put("folioOs", jsonObject.get("folioOs").getAsString());
        ServiceResponseResult response = restCaller.callGetBearerTokenRequest(paramsRequest, urlRequest, ServiceResponseResult.class, tokenAcces);
        logger.info("RESULT" + gson.toJson(response));
        return response;
    }
    
    @Override
	public ServiceResponseResult consultarEquipos(String params) {
    	logger.info("ImplBusquedaService.class [metodo = consultarEquipos() ]\n" + params);
        JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
        LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
        String tokenAcces = principalDetail.getAccess_token();
        String urlRequest = principalDetail.getDireccionAmbiente().concat(constBusqueda.getConsultarEquipos());
        logger.info("url--- " + urlRequest);
        Map<String, String> paramsRequest = new HashMap<String, String>();
        paramsRequest.put("idCotSitioPlan", jsonObject.get("idCotSitioPlan").getAsString());
        ServiceResponseResult response = restCaller.callGetBearerTokenRequest(paramsRequest, urlRequest, ServiceResponseResult.class, tokenAcces);
        logger.info("RESULT" + gson.toJson(response));
        return response;
	}

	@Override
	public ServiceResponseResult consultarCotizacionesEquipos(String params) {
		logger.info("ImplBusquedaService.class [metodo = consultarCotizacionesEquipos() ]\n" + params);
        JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
        LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
        String tokenAcces = principalDetail.getAccess_token();
        String urlRequest = principalDetail.getDireccionAmbiente().concat(constBusqueda.getConsultarCotizacionesEquipo());
        logger.info("url--- " + urlRequest);
        Map<String, String> paramsRequest = new HashMap<String, String>();
        paramsRequest.put("folioOs", jsonObject.get("folioOs").getAsString());
        ServiceResponseResult response = restCaller.callGetBearerTokenRequest(paramsRequest, urlRequest, ServiceResponseResult.class, tokenAcces);
        logger.info("RESULT" + gson.toJson(response));
        return response;
	}

	@Override
	public ServiceResponseResult configurarServicios(String params) {
		JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
		LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
        String tokenAcces = principalDetail.getAccess_token();
        logger.info(principalDetail.toString());
        String urlRequest = principalDetail.getDireccionAmbiente().concat(constBusqueda.getConfigurarServicios());
        Map<String, String> paramUri = new HashMap<String, String>();
        logger.info("### json object params ## \n" + jsonObject.toString());
        ServiceResponseResult response = restCaller.callPatchBearerTokenRequestURL(paramUri, gson.toJson(jsonObject), urlRequest, ServiceResponseResult.class, tokenAcces);
        logger.info("RESULT" + gson.toJson(response));
        return response;
	}

	@Override
	public ServiceResponseResult configurarDns(String params) {
		JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
		LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
        String tokenAcces = principalDetail.getAccess_token();
        String urlRequest = principalDetail.getDireccionAmbiente().concat(constBusqueda.getConfigurarDns());
        Map<String, String> paramUri = new HashMap<String, String>();
        logger.info("### json object params ## \n" + jsonObject.toString());
        ServiceResponseResult response = restCaller.callPatchBearerTokenRequestURL(paramUri, gson.toJson(jsonObject), urlRequest, ServiceResponseResult.class, tokenAcces);
        logger.info("RESULT" + gson.toJson(response));
        return response;
	}

	@Override
	public ServiceResponseResult activarServicios(String params) {
		JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
        LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
        jsonObject.addProperty("idUser", principalDetail.getIdUsuario());
        String tokenAcces = principalDetail.getAccess_token();
        String urlRequest = principalDetail.getDireccionAmbiente().concat(constBusqueda.getActivarServicios());
        
        logger.info( "-- idUser              * "+  jsonObject.get( "idUser" ).toString()); 
        logger.info( "-- documentName        * "+  jsonObject.get( "documentName" ).toString()); 
        logger.info( "-- documentExtension   * "+  jsonObject.get( "documentExtension" ).toString()); 
        logger.info( "-- sistemaActivacion   * "+  jsonObject.get( "sistemaActivacion" ).toString()); 
        logger.info( "-- idMotivoActivacion  * "+  jsonObject.get( "idMotivoActivacion" ).toString()); 
        logger.info( "-- motivoActivacion    * "+  jsonObject.get( "motivoActivacion" ).toString()); 
        logger.info( "-- idOT                * "+  jsonObject.get( "idOT" ).toString()); 
        logger.info( "-- idCsp               * "+  jsonObject.get( "idCsp" ).toString()); 
        logger.info( "-- idClientKey         * "+  jsonObject.get( "idClientKey" ).toString()); 
        logger.info( "-- folioSystem         * "+  jsonObject.get( "folioSystem" ).toString()); 
        logger.info( "-- comments            * "+  jsonObject.get( "comments" ).toString()); 
        logger.info( "-- idFlujo             * "+  jsonObject.get( "idFlujo" ).toString()); 
        logger.info( "-- latitude            * "+  jsonObject.get( "latitude" ).toString()); 
        logger.info( "-- longitude           * "+  jsonObject.get( "longitude" ).toString()); 
        logger.info( "-- document      size  * "+  jsonObject.get( "document" ).toString().length()); 

        logger.info("###URL consultarDetalleObjectSF(): "+ urlRequest);
        ServiceResponseResult response = restCaller.callPostBearerTokenRequest(gson.toJson(jsonObject), urlRequest, ServiceResponseResult.class, tokenAcces);
        logger.info("####RESULT: " + gson.toJson(response));
        return response;
	}

	@Override
	public ServiceResponseResult consultarEstatusActivacion(String params) {
		JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
        LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
        String tokenAcces = principalDetail.getAccess_token();
        String urlRequest = principalDetail.getDireccionAmbiente().concat(constBusqueda.getConsultarEstatusActivacion());
        logger.info("### URL busquedaGeneralSF(): \n" + urlRequest);
        Map<String, String> paramsRequestGet = new HashMap<>();
        paramsRequestGet.put("idCsp", jsonObject.get("idCsp").getAsString());
        paramsRequestGet.put("idOt", jsonObject.get("idOt").getAsString());
        ServiceResponseResult response = restCaller.callGetBearerTokenRequest(paramsRequestGet, urlRequest, ServiceResponseResult.class, tokenAcces);

        logger.info("### RESULT busquedaGeneralSF(): " + gson.toJson(response));
        return response;
	}

    @Override
    public ServiceResponseResult agregarSubComentarioNoticiaSF(String params) {
        JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
        LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
        String tokenAcces = principalDetail.getAccess_token();
        String urlRequest = principalDetail.getDireccionAmbiente().concat(constBusqueda.getCrearSubComentariosNoticias());
        String nombreE = principalDetail.getUsuarioNombre().concat(" " + principalDetail.getUsuarioApellidoPaterno() + " " + principalDetail.getUsuarioApellidoMaterno());
        String text = jsonObject.get("text").getAsString();
        jsonObject.addProperty("text", principalDetail.getNumEmpleado() + " - " + nombreE + " - " + despFFM + ": " + text);
        logger.info("##### OBJECT: #####" + gson.toJson(jsonObject));
        response = restCaller.callPostBearerTokenRequest(jsonObject.toString(),urlRequest, ServiceResponseResult.class, tokenAcces);
        logger.info("##### RESULT CREACION NOTICIAS: \n" + gson.toJson(response));
        return response;
    }

    @Override
    public ServiceResponseResult eliminarComentarioNoticias(String params) {
        JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
        LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
        String tokenAcces = principalDetail.getAccess_token();
        String urlRequest = principalDetail.getDireccionAmbiente().concat(constBusqueda.getEliminarComentarioNoticiasSF());
        
        Map<String, String> paramsRequest = new HashMap<>();
        paramsRequest.put("idNew", jsonObject.get("newId").getAsString());
        paramsRequest.put("objectType", jsonObject.get("objectType").getAsString());

        logger.info("##### OBJECT: #####" + gson.toJson(paramsRequest));

        response = restCaller.callDeleteBearerTokenRequest(paramsRequest,urlRequest, ServiceResponseResult.class, tokenAcces);
        logger.info("##### RESULT ELIMINAR NOTICIAS: \n" + gson.toJson(response));
        return response;
    }

    @Override
    public ServiceResponseResult eliminarSubComentarioNoticias(String params) {
        JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
        LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
        String tokenAcces = principalDetail.getAccess_token();
        String urlRequest = principalDetail.getDireccionAmbiente().concat(constBusqueda.getEliminarSubComentarioNoticiasSF());
        
        Map<String, String> paramsRequest = new HashMap<>();
        paramsRequest.put("idNew", jsonObject.get("subNewId").getAsString());
        paramsRequest.put("objectType", jsonObject.get("objectType").getAsString());

        logger.info("##### OBJECT: #####" + gson.toJson(paramsRequest));
        logger.info("##### URL: #####" + urlRequest);
        
        response = restCaller.callDeleteBearerTokenRequest(paramsRequest,urlRequest, ServiceResponseResult.class, tokenAcces);
        logger.info("##### RESULT ELIMINAR NOTICIAS: \n" + gson.toJson(response));
        return response;
    }
    
    public ServiceResponseResult ocultarNumeroDetalleSalesforce(ServiceResponseResult response, String typeObject) {
    	JsonObject jsonResponse = gson.fromJson(gson.toJson(response).toString(), JsonObject.class);
    	if (jsonResponse.get("codigoEstatusService").getAsInt() == 200) {
        	if (jsonResponse.get("result") != null) {
        		JsonObject jsonResult =  jsonResponse.get("result").getAsJsonObject();
        		switch (typeObject) {
        		case "CU":
        			if (jsonResult.get("detalleCuenta") != null) {
        				//informacion general
        				JsonObject detalleCuenta = jsonResult.get("detalleCuenta").getAsJsonObject();
        				if (detalleCuenta.get("telefono") != null) {
        					detalleCuenta.addProperty("telefono", utilerias.ocultarNumero(detalleCuenta.get("telefono").getAsString()));
        				}
        				//contactoPrincipal
        				if (detalleCuenta.get("contactoPrincipal") != null) {
        					JsonObject contactoPrincipal = detalleCuenta.get("contactoPrincipal").getAsJsonObject();
        					if (contactoPrincipal.get("telefono") != null) {
        						contactoPrincipal.addProperty("telefono", utilerias.ocultarNumero(contactoPrincipal.get("telefono").getAsString()));
            				}
        					if (contactoPrincipal.get("celular") != null) {
        						contactoPrincipal.addProperty("celular", utilerias.ocultarNumero(contactoPrincipal.get("celular").getAsString()));
            				}
        					detalleCuenta.add("contactoPrincipal", contactoPrincipal);
        				}
        				jsonResult.add("detalleCuenta", detalleCuenta);
            		}
        			jsonResponse.add("result", jsonResult);
        			
        			break;
        			
        		case "CF":
        			if (jsonResult.get("detalleCuentaFactura") != null) {
        				//detalleCuentaFactura
        				JsonObject detalleCuentaFactura = jsonResult.get("detalleCuentaFactura").getAsJsonObject();
        				if (detalleCuentaFactura.get("telefonoPrincipal") != null) {
        					detalleCuentaFactura.addProperty("telefonoPrincipal", utilerias.ocultarNumero(detalleCuentaFactura.get("telefonoPrincipal").getAsString()));
        				}
        				if (detalleCuentaFactura.get("celular") != null) {
        					detalleCuentaFactura.addProperty("celular", utilerias.ocultarNumero(detalleCuentaFactura.get("celular").getAsString()));
        				}
        			}
        			break;
        		default:
        			
        			break;
        		}
        		response = gson.fromJson(jsonResponse, ServiceResponseResult.class);
        	}
    	}
    	return response;
    }



	@Override
	public ServiceResponseResult consultarSerieExistenteActivacion(String params) {
		JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
        LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
        String tokenAcces = principalDetail.getAccess_token();
        String urlRequest = principalDetail.getDireccionAmbiente().concat(constBusqueda.getConsultarSerieExistenteActivacion());
        
        Map<String, String> paramsRequest = new HashMap<>();
        paramsRequest.put("numeroSerie", jsonObject.get("numeroSerie").getAsString());

        logger.info("##### OBJECT: #####" + gson.toJson(paramsRequest));
        logger.info("##### URL: #####" + urlRequest);
        
        response = restCaller.callGetBearerTokenRequest(paramsRequest,urlRequest, ServiceResponseResult.class, tokenAcces);
        
        logger.info("##### Consultar serie existente: \n" + gson.toJson(response));        
        return response; 
	}



	@Override
	public ServiceResponseResult consultarMacNumeroSerie(String params) {
		JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
        LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
        String tokenAcces = principalDetail.getAccess_token();
        String urlRequest = principalDetail.getDireccionAmbiente().concat(constBusqueda.getConsultarMacNumeroSerie());
        logger.info("##### OBJECT:jsonObject #####" + gson.toJson(jsonObject));

        Map<String, String> paramsRequest = new HashMap<>();
        paramsRequest.put("numeroSerie", jsonObject.get("numeroSerie").getAsString());

        logger.info("##### OBJECT: #####" + gson.toJson(paramsRequest));
        logger.info("##### URL: #####" + urlRequest);
        
        response = restCaller.callGetBearerTokenRequest(paramsRequest,urlRequest, ServiceResponseResult.class, tokenAcces);
        
        logger.info("##### Consultar mac numero serie: \n" + gson.toJson(response));        
        return response; 
	}



	@Override
	public ServiceResponseResult consultarAutofindActivacion(String params) {        
		JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
        LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
        String tokenAcces = principalDetail.getAccess_token();
        String urlRequest = principalDetail.getDireccionAmbiente().concat(constBusqueda.getConsultarAutofindActivacion());
        
        Map<String, String> paramsRequest = new HashMap<>();
        paramsRequest.put("numeroSerie", jsonObject.get("numeroSerie").getAsString());

        logger.info("##### OBJECT: #####" + gson.toJson(paramsRequest));
        logger.info("##### URL: #####" + urlRequest);
        
        response = restCaller.callGetBearerTokenRequest(paramsRequest,urlRequest, ServiceResponseResult.class, tokenAcces);
        
        logger.info("##### Consultar autofind: \n" + gson.toJson(response));        
        return response; 
	}

	
	@Override
	public ServiceResponseResult generarDnsActivacion(String params) {
    	JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
	    LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
	    String tokenAcces = principalDetail.getAccess_token();
	    String urlRequest = principalDetail.getDireccionAmbiente().concat(constBusqueda.getGenerarDnsActivacion());
	    
	    Map<String, String> paramsRequest = new HashMap<>();
	    paramsRequest.put("codigoPostal", jsonObject.get("codigoPostal").getAsString());
	    paramsRequest.put("cantidad", jsonObject.get("cantidad").getAsString());

	    logger.info("##### OBJECT: #####" + gson.toJson(paramsRequest));
	    logger.info("##### URL: #####" + urlRequest);
	    
	    response = restCaller.callGetBearerTokenRequest(paramsRequest,urlRequest, ServiceResponseResult.class, tokenAcces);
	    
	    logger.info("##### Consultar autofind: \n" + gson.toJson(response));        
    return response; 
}



	@Override
	public ServiceResponseResult consultarResumenPaquetePorCSP(String params) {
        JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
        LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
        String tokenAcces = principalDetail.getAccess_token();
        String urlRequest = principalDetail.getDireccionAmbiente().concat(constBusqueda.getResumenPaquetePorCSP());
        logger.info("### URL obtenerResumenPaquete(): \n" + urlRequest);
        Map<String, String> paramsRequestGet = new HashMap<>();
        paramsRequestGet.put("folioCps", jsonObject.get("folioCps").getAsString());

        ServiceResponseResult response = restCaller.callGetBearerTokenRequest(
                paramsRequestGet,
                urlRequest,
                ServiceResponseResult.class,
                tokenAcces);

        logger.info("### RESULT consultarResumenPaquetePorCSP(): " + gson.toJson(response));
		return response;
	}



	@Override
	public ServiceResponseResult consultarCatalogoJustificacionActivacion() {
        LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
        String tokenAcces = principalDetail.getAccess_token();
        String urlRequest = principalDetail.getDireccionAmbiente().concat(constBusqueda.getConsultarCatalogoJustificacionActivacion());
        logger.info("### URL consultarCatalogoJustificacionActivacion(): \n" + urlRequest);
        /**Map<String, String> paramsRequestGet = new HashMap<>();

        ServiceResponseResult response = restCaller.callGetBearerTokenRequest(
                paramsRequestGet,
                urlRequest,
                ServiceResponseResult.class,
                tokenAcces);
        */
        ServiceResponseResult response=ServiceResponseResult.builder()
                .isRespuesta(true)
                .resultDescripcion("Accion completada")
                .result(null)
                .codigoEstatusService(200)
                .build();
        logger.info("### RESULT consultarResumenPaquetePorCSP(): " + gson.toJson(response));
		return response;
	}


}
