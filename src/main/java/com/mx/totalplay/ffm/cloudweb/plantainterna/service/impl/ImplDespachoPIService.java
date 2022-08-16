package com.mx.totalplay.ffm.cloudweb.plantainterna.service.impl;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.mx.totalplay.ffm.cloudweb.plantainterna.service.DespachoPIService;
import com.mx.totalplay.ffm.cloudweb.plantainterna.utils.ConstDespachoPI;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.*;
import com.mx.totalplay.ffm.cloudweb.utilerias.service.AutentificacionService;
import com.mx.totalplay.ffm.cloudweb.utilerias.service.GenericAccionesService;
import com.mx.totalplay.ffm.cloudweb.utilerias.utils.ConstantesGeneric;
import com.mx.totalplay.ffm.cloudweb.utilerias.utils.ConsumeRest;
import com.mx.totalplay.ffm.cloudweb.utilerias.utils.UtileriaGeneral;
import com.mx.totalplay.ffm.cloudweb.plantainterna.model.consultaOTPI.ParamConsultaOTPI;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import javax.servlet.http.HttpSession;

@Service
public class ImplDespachoPIService implements DespachoPIService {
    private final Logger logger = LogManager.getLogger(ImplDespachoPIService.class.getName());
    private final ConstantesGeneric constantesAmbiente;
    private final ConstDespachoPI constDespachoPI;
    private final ConsumeRest restCaller;
    private final UtileriaGeneral utilerias;
    private final Environment env;
    private Gson gson = new Gson();
    private final HttpSession session;
    private GenericAccionesService genericAccionesService;


    @Autowired
    public ImplDespachoPIService(ConstantesGeneric constantesAmbiente, ConstDespachoPI constDespachoPI, ConsumeRest restCaller, UtileriaGeneral utilerias, Environment env, HttpSession session, GenericAccionesService genericAccionesService) {
        this.constantesAmbiente = constantesAmbiente;
        this.constDespachoPI = constDespachoPI;
        this.restCaller = restCaller;
        this.utilerias = utilerias;
        this.env = env;
        this.session = session;
        this.genericAccionesService = genericAccionesService;
    }

    public ServiceResponseResult consultarCotizacionOTSe(String params) {
        logger.info("ImplDespachoPIService.class [metodo = consultarCotizacionOTSe() ]\n" + params);
        JsonObject jsonObject = gson.fromJson(params, JsonObject.class);

        LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
        String tokenAcces = principalDetail.getAccess_token();
        logger.info("consultarCotizacionOTSe ##+" + tokenAcces);
        String urlRequest = principalDetail.getDireccionAmbiente().concat(constDespachoPI.getConsultarCotizacionDespacho());
        logger.info("url--- " + urlRequest);
        Map<String, String> paramsRequestGet = new HashMap<String, String>();
        paramsRequestGet.put("idOt", jsonObject.get("idOt").getAsString());
        ServiceResponseResult response = restCaller.callGetBearerTokenRequest(
                paramsRequestGet,
                urlRequest,
                ServiceResponseResult.class,
                tokenAcces);
        logger.info("RESULT" + gson.toJson(response));
        return response;

    }

    public ServiceResponseResult consultarCatalogoTipoOrdenGeneralDespacho() {
        logger.info("ImplDespachoPIService.class [metodo = consultarCatalogoTipoOrdenGeneralDespacho() ]\n");

        LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
        String tokenAcces = principalDetail.getAccess_token();
        logger.info("consultarCatalogoTipoOrdenGeneralDespacho ##+" + tokenAcces);
        String urlRequest = principalDetail.getDireccionAmbiente().concat(constDespachoPI.getConsultaCatalogoTipoOrdenConfigDespacho());
        Map<String, String> paramsRequestGet = new HashMap<String, String>();
        ServiceResponseResult response = restCaller.callGetBearerTokenRequest(
                paramsRequestGet,
                urlRequest,
                ServiceResponseResult.class,
                tokenAcces);
        logger.info("RESULT" + gson.toJson(response));
        return response;

    }


    public List<ServiceResponseResult> consultarComplementosDespacho() {
        logger.info("ImplDespachoPIService.class [metodo = consultarComplementosDespacho() ]\n");
        //logger.info("env --------------------"+env.getProperty("variable.entorno.ambiente"));

        List<ServiceResponseResult> resultsCatalogos = new ArrayList<ServiceResponseResult>();
        LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
        String tokenAcces = principalDetail.getAccess_token();
        logger.info("consultarComplementosDespacho ##+" + tokenAcces);
        String urlRequestBase = principalDetail.getDireccionAmbiente().concat(constDespachoPI.getConsultarComplementosDespacho());

        Map<String, String> paramsRequestGet = new HashMap<String, String>();

        String urlIconos = urlRequestBase.concat("iconografia");
        ServiceResponseResult responseIconos = restCaller.callGetBearerTokenRequest(
                paramsRequestGet,
                urlIconos,
                ServiceResponseResult.class,
                tokenAcces);
    
        
        
        String urlEstatusOrden = urlRequestBase.concat("estatusOrdenes");

        ServiceResponseResult responseEstatusOrden = restCaller.callGetBearerTokenRequest(
                paramsRequestGet,
                urlEstatusOrden,
                ServiceResponseResult.class,
                tokenAcces);


        String urlTipoOrden = urlRequestBase.concat("tiposOrdenes");
        ServiceResponseResult responseTipoOrden = restCaller.callGetBearerTokenRequest(
                paramsRequestGet,
                urlTipoOrden,
                ServiceResponseResult.class,
                tokenAcces);

        String urlEstatusTecnico = urlRequestBase.concat("estatusTecnicos");
        ServiceResponseResult responseEstatusTecnico = restCaller.callGetBearerTokenRequest(
                paramsRequestGet,
                urlEstatusTecnico,
                ServiceResponseResult.class,
                tokenAcces);


        resultsCatalogos.add(responseTipoOrden);
        resultsCatalogos.add(responseEstatusOrden);
        resultsCatalogos.add(responseIconos);
        resultsCatalogos.add(responseEstatusTecnico);

        logger.info("RESULT" + gson.toJson(resultsCatalogos));
        return resultsCatalogos;

    }

    public ServiceResponseResult consultarComplementosDespachoIdentificador(String params) {
        logger.info("ImplDespachoPIService.class [metodo = consultarComplementosDespachoIdentificador() ]\n" + params);
        //logger.info("env --------------------"+env.getProperty("variable.entorno.ambiente"));

        JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
        String tipoRequest = jsonObject.get("tipoRequest").getAsString();
        logger.info("ImplDespachoP  tipoRequest " + tipoRequest + " --- " + jsonObject.toString());
        LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
        String tokenAcces = principalDetail.getAccess_token();
        logger.info("consultarCatalogoTipoOrdenUsuarioDespacho ##+" + tokenAcces);
        String urlRequest = principalDetail.getDireccionAmbiente().concat(constDespachoPI.getConsultarComplementosDespacho());

        switch (tipoRequest) {
            case "iconografia":
                urlRequest = urlRequest.concat("iconografia");
                break;
            case "estatusTecnico":
                urlRequest = urlRequest.concat("estatusTecnicos");
                break;
            case "estatusOrdenes":
                urlRequest = urlRequest.concat("estatusOrdenes");
                break;
            case "estatusTipoOrdenes":
                urlRequest = urlRequest.concat("tiposOrdenes");
                break;
            default:

        }
        logger.info("tipoRequest" + urlRequest);
        Map<String, String> paramsRequestGet = new HashMap<String, String>();
        ServiceResponseResult response = restCaller.callGetBearerTokenRequest(
                paramsRequestGet,
                urlRequest,
                ServiceResponseResult.class,
                tokenAcces);
        logger.info("RESULT" + gson.toJson(response));
        return response;

    }


    public ServiceResponseResult consultarCatalogoTipoOrdenUsuarioDespacho(String params) {
        logger.info("ImplDespachoPIService.class [metodo = consultarCatalogoTipoOrdenUsuarioDespacho() ]\n");
        //logger.info("env --------------------"+env.getProperty("variable.entorno.ambiente"));


        LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
        String tokenAcces = principalDetail.getAccess_token();
        logger.info("consultarCatalogoTipoOrdenUsuarioDespacho ##+" + tokenAcces);
        String urlRequest = principalDetail.getDireccionAmbiente().concat(constDespachoPI.getConsultaCatalogoTipoOrdenUsuarioDespacho());
        Map<String, String> paramsRequestGet = new HashMap<String, String>();
        paramsRequestGet.put("idUsuario", String.valueOf(principalDetail.getIdUsuario()));
        
        if(params != null && !params.equals("null")) {
        	JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
        	tokenAcces = jsonObject.get("token").getAsString();
        }
        
        logger.info("idUsuario##+" + principalDetail.getIdUsuario());
        logger.info("urlRequest##+" + urlRequest);

        ServiceResponseResult response = restCaller.callGetBearerTokenRequest(
                paramsRequestGet,
                urlRequest,
                ServiceResponseResult.class,
                tokenAcces);
        logger.info("RESULT" + gson.toJson(response));
        return response;

    }


    public ServiceResponseResult consultarCatalogoEstatusOrden(String params) {
        logger.info("ImplDespachoPIService.class [metodo = consultarCatalogoEstatusOrden() ]\n");

        LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
        String tokenAcces = principalDetail.getAccess_token();
        logger.info("consultarCatalogoEstatusOrden ##+" + tokenAcces);
        
        if(params != null && !params.equals("null")) {
        	JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
        	tokenAcces = jsonObject.get("token").getAsString();
        }
        
        String urlRequest = principalDetail.getDireccionAmbiente().concat(constDespachoPI.getConsultaCatalogoEstatusOrdenDespacho());
        logger.info("consultarCatalogoEstatusOrden" + urlRequest);
        Map<String, String> paramsRequestGet = new HashMap<String, String>();
        ServiceResponseResult response = restCaller.callGetBearerTokenRequest(
                paramsRequestGet,
                urlRequest,
                ServiceResponseResult.class,
                tokenAcces);
        logger.info("RESULT" + gson.toJson(response));
        return response;
    }


    public ServiceResponseResult consultarCatalogoGeografiaGeneral() {
        logger.info("ImplDespachoPIService.class [metodo = consultarCatalogoGeografiaGeneral() ]\n");


        LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
        String tokenAcces = principalDetail.getAccess_token();
        logger.info("consultarCatalogoGeografiaGeneral ##+" + tokenAcces);
        String urlRequest = principalDetail.getDireccionAmbiente().concat(constDespachoPI.getConsultarCatalogoGeografiaGeneralPI());

        Map<String, String> paramsRequestGet = new HashMap<String, String>();
        //paramsRequestGet.put("idDespacho", principalDetail.getIdUsuario()+"");
        ServiceResponseResult response = restCaller.callGetBearerTokenRequest(
                paramsRequestGet,
                urlRequest,
                ServiceResponseResult.class,
                tokenAcces);
        logger.info("RESULT" + gson.toJson(response));
        return response;
    }

    public ServiceResponseResult consultarCatalogoGeografiaUsuario(String params) {
        logger.info("ImplDespachoPIService.class [metodo = consultarCatalogoGeografiaUsuario() ]\n");
        LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
        String tokenAcces = principalDetail.getAccess_token();
        
        if(params != null && !params.equals("null")) {
        	JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
        	tokenAcces = jsonObject.get("token").getAsString();
        }
        
        logger.info("consultarCatalogoGeografiaUsuario ##+" + tokenAcces);
        String urlRequest = principalDetail.getDireccionAmbiente().concat(constDespachoPI.getConsultarCatalogoGeografiaUsuarioPI());
        logger.info("urlRequest ##+" + urlRequest);
        Map<String, String> paramsRequestGet = new HashMap<String, String>();
        //paramsRequestGet.put("idDespacho", principalDetail.getIdUsuario()+"");
        ServiceResponseResult response = restCaller.callGetBearerTokenRequest(
                paramsRequestGet,
                urlRequest,
                ServiceResponseResult.class,
                tokenAcces);
        logger.info("RESULT" + gson.toJson(response));
        return response;
    }

    @Override
    public ServiceResponseResult consultarCatalogoTurnosPI(String params) {
        logger.info("ImplDespachoPIService.class [metodo = consultarCatalogoTurnosPI() ]\n");


        LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
        String tokenAcces = principalDetail.getAccess_token();
        logger.info("consultarCatalogoTurnosPI ##+" + tokenAcces);
        String urlRequest = principalDetail.getDireccionAmbiente().concat(constDespachoPI.getConsultarCatalogoTurnosPi());
        logger.info("urlRequest ##+" + urlRequest);
        
        if(params != null && !params.equals("null")) {
        	JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
        	tokenAcces = jsonObject.get("token").getAsString();
        }
        
        Map<String, String> paramsRequestGet = new HashMap<String, String>();
        //paramsRequestGet.put("idDespacho", principalDetail.getIdUsuario()+"");
        logger.info("idDespacho ##+" + principalDetail.getIdUsuario());
        ServiceResponseResult response = restCaller.callGetBearerTokenRequest(
                paramsRequestGet,
                urlRequest,
                ServiceResponseResult.class,
                tokenAcces);
        logger.info("RESULT" + gson.toJson(response));
        return response;
    }

    @Override
    public ServiceResponseResult consultarlocalizacionOtPIDespacho(String params) {
        logger.info("ImplDespachoPIService.class [metodo = consultarlocalizacionOtPIDespacho() ]\n" + params);

        JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
        String paramacc = jsonObject.get("yekparam").getAsString();

        LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
        String tokenAcces = principalDetail.getAccess_token();
        logger.info("consultarlocalizacionOtPIDespacho ##+" + tokenAcces);
        String urlRequest = principalDetail.getDireccionAmbiente().concat(constDespachoPI.getConsultaLocalizacionOT());

        Map<String, String> paramsRequestGet = new HashMap<String, String>();
        paramsRequestGet.put("yekparam", paramacc);

        ServiceResponseResult response = restCaller.callGetBearerTokenRequest(
                paramsRequestGet,
                urlRequest,
                ServiceResponseResult.class,
                tokenAcces);
        logger.info("RESULT" + gson.toJson(response));
        return response;
    }

    @Override
    public ServiceResponseResult consultarCatalogoAccionesOTPI() {
        logger.info("ImplDespachoPIService.class [metodo = consultarCatalogoAccionesOTPI() ]\n");


        LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
        String tokenAcces = principalDetail.getAccess_token();
        logger.info("consultarOperariosAsignadosDespacho ##+" + tokenAcces);
        String urlRequest = principalDetail.getDireccionAmbiente().concat(constDespachoPI.getConsultarOperariosAsignadosDespachoPI());

        Map<String, String> paramsRequestGet = new HashMap<String, String>();
        paramsRequestGet.put("idDespacho", principalDetail.getIdUsuario() + "");
        logger.info("idDespacho ##+" + principalDetail.getIdUsuario());
        ServiceResponseResult response = restCaller.callGetBearerTokenRequest(
                paramsRequestGet,
                urlRequest,
                ServiceResponseResult.class,
                tokenAcces);
        logger.info("RESULT" + gson.toJson(response));
        return response;
    }


    @Override
    public ServiceResponseResult cambiarEstatusOrdenTrabajo(String params) {
        logger.info("ImplDespachoPIService.class [metodo = cambiarEstatusOrdenTrabajo() ]\n" + params);
        LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
        JsonObject jsonObject = gson.fromJson(params, JsonObject.class);

        jsonObject.addProperty("idUsuarioDespacho", principalDetail.getIdUsuario());
        jsonObject.addProperty("latitud", 1651651.5);
        jsonObject.addProperty("longitud", 65465);
        String tokenAcces = principalDetail.getAccess_token();

        String idOtEnvio = jsonObject.get("idOtEnvio").getAsString();
        String textAccionCambioEstatus = jsonObject.get("textAccionCambioEstatus").getAsString();
        logger.info("json object params## " + jsonObject.toString());

        String urlRequest = principalDetail.getDireccionAmbiente()
                .concat(constDespachoPI.getCambiarEstatusOrdenTrabajoPI())
                .concat(textAccionCambioEstatus)
                .concat("/").concat(idOtEnvio);

        ServiceResponseResult response = restCaller.callPostBearerTokenRequest(
                jsonObject.toString(),
                urlRequest,
                ServiceResponseResult.class,
                tokenAcces);

        logger.info("RESULT" + gson.toJson(response));
        return response;
    }


    @Override
    public ServiceResponseResult consultarOrdenesAsignadasOperario(String params) {
        logger.info("ImplDespachoPIService.class [metodo = consultarOrdenesAsignadasOperario() ]\n" + params);
        LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();

        JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
        String fechaInicioParams = jsonObject.get("fechaInicio").getAsString();
        String fechaFinParams = jsonObject.get("fechaFin").getAsString();

        logger.info("fechaInicioParams ##" + fechaInicioParams);
        logger.info("fechaFinParams ##" + fechaFinParams);
        logger.info("iddespacho ## " + principalDetail.getIdUsuario());
        String tokenAcces = principalDetail.getAccess_token();
        logger.info("consultarOperariosAsignadosDespacho ##+" + tokenAcces);
        String urlRequest = principalDetail.getDireccionAmbiente().concat(constDespachoPI.getConsultaOrdenesAsignadasOperarioPI());
        logger.info("URL ##+" + urlRequest);
        
        Map<String, String> paramsRequestGet = new HashMap<String, String>();
        paramsRequestGet.put("idDespacho", principalDetail.getIdUsuario() + "");
        paramsRequestGet.put("fechaInicio", fechaInicioParams);
        paramsRequestGet.put("fechaFin", fechaFinParams);
        
        if(jsonObject.get("token") != null && jsonObject.get("token").getAsString().trim() != "") {
        	tokenAcces = jsonObject.get("token").getAsString();
        	paramsRequestGet.put("idDespacho",jsonObject.get("usuario").getAsString());
        }
        
       

        ServiceResponseResult response = restCaller.callGetBearerTokenRequest(
                paramsRequestGet,
                urlRequest,
                ServiceResponseResult.class,
                tokenAcces);
        return response;
    }


    @Override
    public ServiceResponseResult consultarOperariosAsignadosDespacho(String params) {
        logger.info("ImplDespachoPIService.class [metodo = consultarOperariosAsignadosDespacho() ]");

        LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
        String tokenAcces = principalDetail.getAccess_token();
        logger.info("consultarOperariosAsignadosDespacho ##+" + tokenAcces);
        String urlRequest = principalDetail.getDireccionAmbiente().concat(constDespachoPI.getConsultarOperariosAsignadosDespachoPI());
        Map<String, String> paramsRequestGet = new HashMap<String, String>();
        paramsRequestGet.put("idDespacho", principalDetail.getIdUsuario() + "");
        
        if(params != null && !params.equals("null")) {
        	JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
        	tokenAcces = jsonObject.get("token").getAsString();
        	paramsRequestGet.put("idDespacho", jsonObject.get("usuario").getAsString());
        }
        
       
        logger.info("idDespacho ##+" + principalDetail.getIdUsuario());
        ServiceResponseResult response = restCaller.callGetBearerTokenRequest(
                paramsRequestGet,
                urlRequest,
                ServiceResponseResult.class,
                tokenAcces);
        logger.info("RESULT" + gson.toJson(response));
        return response;
    }

    @Override
    public ServiceResponseResult consultarDetalleOTPI(String params) {
        logger.info("ImplDespachoPIService.class [metodo = consultarDetalleOTPI() ]\n" + params);

        JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
        String idotdetalle = jsonObject.get("idOt").getAsString();

        LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
        String tokenAcces = principalDetail.getAccess_token();
        logger.info("consultarOperariosAsignadosDespacho ##+" + tokenAcces);
        String urlRequest = principalDetail.getDireccionAmbiente().concat(constDespachoPI.getConsultaDetalleOrdenPI());
        logger.info("#########3--" + urlRequest);

        logger.info("#######idotdetalle------" + idotdetalle);
        Map<String, String> paramsRequestGet = new HashMap<String, String>();
        paramsRequestGet.put("idotasign", idotdetalle);

        ServiceResponseResult response = restCaller.callGetBearerTokenRequest(
                paramsRequestGet,
                urlRequest,
                ServiceResponseResult.class,
                tokenAcces);

        JsonObject jsonResponse = gson.fromJson(gson.toJson(response).toString(), JsonObject.class);
        if (jsonResponse.get("codigoEstatusService").getAsInt() == 200) {
        	JsonObject jsonResult = jsonResponse.get("result").getAsJsonObject();
        	JsonObject jsonOrden = jsonResult.get("orden").getAsJsonObject();
        	if (jsonOrden.get("telefonoCliente") != null) {
        		jsonOrden.addProperty("telefonoCliente", utilerias.ocultarNumero(jsonOrden.get("telefonoCliente").getAsString()));
        	}
        	if (jsonOrden.get("telefonoContacto") != null) {
        		jsonOrden.addProperty("telefonoContacto", utilerias.ocultarNumero(jsonOrden.get("telefonoContacto").getAsString()));
        	}
        	jsonResult.add("orden", jsonOrden);
        	jsonResponse.add("result", jsonResult);
        	response = gson.fromJson(jsonResponse, ServiceResponseResult.class);
        }
        logger.info("RESULT" + gson.toJson(response));
        return response;
    }

    @Override
    public ServiceResponseResult consultarComentariosOTPI(String params) {
        logger.info("ImplDespachoPIService.class [metodo = consultarComentariosOTPI() ]\n" + params);
        JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
        String idOt = jsonObject.get("idOt").getAsString();

        LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
        String tokenAcces = principalDetail.getAccess_token();
        logger.info("consultarOperariosAsignadosDespacho ##+" + tokenAcces);
        String urlRequest = principalDetail.getDireccionAmbiente().concat(constDespachoPI.getConsultaComentariosOrdenPI());

        Map<String, String> paramsRequestGet = new HashMap<String, String>();
        paramsRequestGet.put("idOt", idOt);
        //paramsRequestGet.put("idOperario", idOperario);

        ServiceResponseResult response = restCaller.callGetBearerTokenRequest(
                paramsRequestGet,
                urlRequest,
                ServiceResponseResult.class,
                tokenAcces);
        logger.info("RESULT" + gson.toJson(response));
        return response;
    }

    @Override
    public ServiceResponseResult consultarHistoricoOTPI(String params) {
        logger.info("ImplDespachoPIService.class [metodo = consultarHistoricoOTPI() ]\n" + params);

        JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
        String idOt = jsonObject.get("idOt").getAsString();

        LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
        String tokenAcces = principalDetail.getAccess_token();
        logger.info("consultarOperariosAsignadosDespacho ##+" + tokenAcces);
        String urlRequest = principalDetail.getDireccionAmbiente().concat(constDespachoPI.getConsultaHistoricoOrdenPI());

        Map<String, String> paramsRequestGet = new HashMap<String, String>();
        paramsRequestGet.put("idOt", idOt);

        ServiceResponseResult response = restCaller.callGetBearerTokenRequest(
                paramsRequestGet,
                urlRequest,
                ServiceResponseResult.class,
                tokenAcces);
        logger.info("RESULT" + gson.toJson(response));
        return response;
    }
    
    @Override
    public ServiceResponseResult confirmaDesconfirmaOtDespacho(String params) {
        logger.info("ImplDespachoPIService.class [metodo = confirmaDesconfirmaOtDespacho() ]\n" + params);
        logger.info(" constDespachoPI.getOrdenesPendientesDespachoP()" + constDespachoPI.getConfirmarDesconfirmarOtDespacho());
      
        JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
        String idOrden = jsonObject.get("idOrden").getAsString();
        
        LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
        String tokenAcces = principalDetail.getAccess_token();
        logger.info("consultarOperariosAsignadosDespacho ##+" + tokenAcces);

        String urlRequest = principalDetail.getDireccionAmbiente().concat(constDespachoPI.getConfirmarDesconfirmarOtDespacho()).concat(idOrden);

        Map<String, String> paramsRequestGet = new HashMap<String, String>();
        paramsRequestGet.put("idOrden", idOrden);
        paramsRequestGet.put("idOrigen", idOrden);
        paramsRequestGet.put("esConfirmada", idOrden);
        paramsRequestGet.put("comentarios", idOrden);

        ServiceResponseResult response = restCaller.callPatchBearerTokenRequest(
                params,
                urlRequest,
                ServiceResponseResult.class,
                tokenAcces);

        logger.info("RESULT" + gson.toJson(response));
        return response;
    }
    @Override
    public ServiceResponseResult obtenerOrdenesTrabajoPendientesDespacho(String params) {
        logger.info("ImplDespachoPIService.class [metodo = obtenerOrdenesTrabajoPendientesDespacho() ]\n" + params);
        logger.info(" constDespachoPI.getOrdenesPendientesDespachoP()" + constDespachoPI.getOrdenesPendientesDespachoP());

        LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
        String tokenAcces = principalDetail.getAccess_token();
        logger.info("consultarOperariosAsignadosDespacho ##+" + tokenAcces);
        
    	JsonObject jsonObjectToken = gson.fromJson(params, JsonObject.class);

        if(jsonObjectToken.get("token") != null && jsonObjectToken.get("token").getAsString().trim() != "") {
        	tokenAcces = jsonObjectToken.get("token").getAsString();	
        }

        String urlRequest = principalDetail.getDireccionAmbiente().concat(constDespachoPI.getOrdenesPendientesDespachoP());

        ServiceResponseResult response = restCaller.callPostBearerTokenRequest(
                params,
                urlRequest,
                ServiceResponseResult.class,
                tokenAcces);
        
        JsonObject jsonResponse = gson.fromJson(gson.toJson(response).toString(), JsonObject.class);
        if (jsonResponse.get("codigoEstatusService").getAsInt() == 200) {
        	if (jsonResponse.get("result") != null) {
        		JsonObject jsonResult =  jsonResponse.get("result").getAsJsonObject();
        		if (jsonResult.get("detalleOrdenes") != null) {
        			JsonArray ots = jsonResult.get("detalleOrdenes").getAsJsonArray();
                	JsonArray nuevaOts = new JsonArray();
                	for(JsonElement ot : ots) {
                		JsonObject otObject = gson.fromJson(ot.toString(), JsonObject.class);
                		if (otObject.get("telefono") != null) {
                			otObject.addProperty("telefono", utilerias.ocultarNumero(otObject.get("telefono").getAsString()));
                		}
                		nuevaOts.add(otObject);
                	}
            		jsonResult.add("detalleOrdenes", nuevaOts);
                    jsonResponse.add("result", jsonResult);
                    response = gson.fromJson(jsonResponse, ServiceResponseResult.class);
        		}
        	}
        }
        logger.info("RESULT" + gson.toJson(response));
        return response;
    }

    public ServiceResponseResult consultarConfiguracionDespachoDespachoServ(String params) {
        List<Accion> accionesListSession;
        List<Accion> accionesListResponse = new ArrayList<>();

        LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
        
        JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
        String claveBusqueda = jsonObject.get("moduloAccionesUsuario").getAsString();
        
       
  
        if (session.getAttribute("MODULO_MENSAJES_ACCIONES_RECIENTES") != null)
            accionesListSession = (List<Accion>) session.getAttribute("MODULO_MENSAJES_ACCIONES_RECIENTES");
        else
            accionesListSession = new ArrayList<>();

        Map<String, Object> mapResponse = principalDetail.getConfiguraciones();
        
        if (jsonObject != null) {
            Permiso permiso = principalDetail.getModulos()
                    .stream()
                    .filter(e -> claveBusqueda.equals(e.getClave()))
                    .findAny()
                    .orElse(null);

            mapResponse.put("MODULO_ACCIONES_USUARIO", permiso);
        }
        if (accionesListSession.size() > 0) {
            accionesListResponse = accionesListSession.stream()
                    .filter(e -> claveBusqueda.equals(e.getIdentificadorModulo()))
                    .collect(Collectors.toList());
        }
        mapResponse.put("MODULO_MENSAJES_ACCIONES_RECIENTES", accionesListResponse);
        
      //Validacion sesion jerarquia
        if(jsonObject.get("usuario") != null && jsonObject.get("usuario").getAsInt() != 0) {
        	String urlPermisos=env.getProperty("dep.envirom.web").concat(":8133").concat(env.getProperty("ws.url.validausrffmpermisos"));
    		Map<String, String> paramsGet = new HashMap<String, String>();
    		paramsGet.put("idUsuario", ""+jsonObject.get("usuario").getAsInt());
    		paramsGet.put("idOrigen", "1");
    		LoginResult permisosModulos = (LoginResult) restCaller.callGetBearerTokenRequestReturnClass(paramsGet, urlPermisos, LoginResult.class,  jsonObject.get("token").getAsString());
    		mapResponse = permisosModulos.getConfiguracionesGenerales();
    		
    		if (jsonObject != null) {
                Permiso permiso = permisosModulos.getModulos()
                        .stream()
                        .filter(e -> claveBusqueda.equals(e.getClave()))
                        .findAny()
                        .orElse(null);

                mapResponse.put("MODULO_ACCIONES_USUARIO", permiso);
            }
        }
        
        ServiceResponseResult response = ServiceResponseResult.builder().isRespuesta(true).result(mapResponse).build();
        return response;
    }

    @Override
    public ServiceResponseResult consultarConteoAlertasPI(String params) {
        logger.info("ImplDespachoPIService.class [metodo = consultarConteoAlertasPI() ]\n" + params);

        JsonObject jsonObject = gson.fromJson(params, JsonObject.class);

        LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();

        String tokenAcces = principalDetail.getAccess_token();
        logger.info("consultarOperariosAsignadosDespacho ##+" + tokenAcces);
        logger.info("json object params## " + jsonObject.toString());
        
        if(jsonObject.get("token") != null && jsonObject.get("token").getAsString().trim() != "") {
        	tokenAcces = jsonObject.get("token").getAsString();
        }
        
        String urlRequest = principalDetail.getDireccionAmbiente().concat(constDespachoPI.getConteoAlertasDespachoPI());
        Map<String, String> paramsRequestGet = new HashMap<String, String>();

        ServiceResponseResult response = restCaller.callGetBearerTokenRequest(
                paramsRequestGet,
                urlRequest,
                ServiceResponseResult.class,
                tokenAcces);
        logger.info("RESULT" + gson.toJson(response));
        return response;
    }

    @Override
    public ServiceResponseResult getDetalleAlertas(String params) {
        logger.info("ImplDespachoPIService.class [metodo = getDetalleAlertas() ]\n" + params);

        JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
        String idTipoAlerta = jsonObject.get("idTipoAlerta").getAsString();

        LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
        String tokenAcces = principalDetail.getAccess_token();
        logger.info("consultarOperariosAsignadosDespacho ##+" + tokenAcces);
        String urlRequest = principalDetail.getDireccionAmbiente().concat(constDespachoPI.getConsultarDetalleAlerta());
        logger.info("#########url--" + urlRequest);

        logger.info("#######idTipoAlerta------" + idTipoAlerta);
        Map<String, String> paramsRequestGet = new HashMap<String, String>();
        paramsRequestGet.put("idTipoAlerta", idTipoAlerta);

        ServiceResponseResult response = restCaller.callGetBearerTokenRequest(
                paramsRequestGet,
                urlRequest,
                ServiceResponseResult.class,
                tokenAcces);
        logger.info("RESULT" + gson.toJson(response));
        return response;
    }


    @Override
    public ServiceResponseResult consultaAcciones(String params) {
        JsonObject jsonObject = gson.fromJson(params, JsonObject.class);

/*
		JsonObject login = new JsonObject();
		login.addProperty( env.getProperty("param.textus.pI") 		, constantesAmbiente.getTextIpUsuario());
		login.addProperty( env.getProperty("param.textus.drowssaP") , constantesAmbiente.getTextCredPad());
		login.addProperty( env.getProperty("param.textus.resU") 	, constantesAmbiente.getTextCredUs());
		jsonObject.add("Login", login);
		*/

        logger.info("json object params## " + jsonObject.toString());
        LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
        //String url="http://10.216.47.89"+constDespachoPI.getConsultarDetalleAlerta();
        String tokenAcces = principalDetail.getAccess_token();
        String url = principalDetail.getDireccionAmbiente().concat(constDespachoPI.getConsultarAccionesAlerta());
        logger.info("url ### "+url);
        Map<String, String> paramsRequestGet = new HashMap<String, String>();
        paramsRequestGet.put("idTipoAlerta", jsonObject.get("idTipoAlerta").getAsString());
        ServiceResponseResult response = restCaller.callGetBearerTokenRequest(paramsRequestGet, url, ServiceResponseResult.class, tokenAcces);
        logger.info("##### RESULT" + gson.toJson(response) + " #######");
        return response;
    }


    @Override
    public ServiceResponseResult getCatalogoStatusEstadoMotivo(String params) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public ServiceResponseResult cambiarEstatusTecnicoPI(String params) {
        logger.info("ImplDespachoPIService.class [metodo = cambiarEstatusTecnicoPI() ]\n" + params);

        JsonObject jsonObject = gson.fromJson(params, JsonObject.class);

        String idUsuario = jsonObject.get("idUsuario").getAsString();
        String idEstatus = jsonObject.get("idEstatusUsuario").getAsString();

        LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();

        logger.info("json object params## " + jsonObject.toString());

        String tokenAcces = principalDetail.getAccess_token();
        String url = principalDetail.getDireccionAmbiente().concat(constDespachoPI.getCambiarEstatusTecPi());
        logger.info("URL ##+" + url);

        Map<String, String> paramsRequestGet = new HashMap<String, String>();
        paramsRequestGet.put("idUsuario", idUsuario);
        paramsRequestGet.put("idEstatusUsuario", idEstatus);

        ServiceResponseResult response = restCaller.callPostBearerTokenRequestURL(paramsRequestGet, url,
                ServiceResponseResult.class, tokenAcces);
        logger.info("##### RESULT" + gson.toJson(response) + " #######");
        return response;
    }

    @Override
    public ServiceResponseResult consultarDetalleTecnicoOt(String params) {
        logger.info("ImplDespachoPIService.class [metodo = consultarDetalleTecnicoOt() ]\n" + params);

        JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
        String idotdetalle = jsonObject.get("idOt").getAsString();

        LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
        String tokenAcces = principalDetail.getAccess_token();
        logger.info("consultarOperariosAsignadosDespacho ##+" + tokenAcces);
        String urlRequest = principalDetail.getDireccionAmbiente().concat(constDespachoPI.getConsultarDetalleTecnicoOt());
        logger.info("#########3--" + urlRequest);

        logger.info("#######idOt------" + idotdetalle);
        Map<String, String> paramsRequestGet = new HashMap<String, String>();
        paramsRequestGet.put("idOt", idotdetalle);

        ServiceResponseResult response = restCaller.callGetBearerTokenRequest(
                paramsRequestGet,
                urlRequest,
                ServiceResponseResult.class,
                tokenAcces);
        logger.info("RESULT" + gson.toJson(response));
        return response;
    }

    @Override
    public ServiceResponseResult agregarComentariosOt(String params) {
        logger.info("ImplDespachoPIService.class [metodo = agregarComentariosOt() ]\n" + params);

        JsonObject jsonObject = gson.fromJson(params, JsonObject.class);

        LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();

        logger.info("json object params## " + jsonObject.toString());

        String tokenAcces = principalDetail.getAccess_token();
        String url = principalDetail.getDireccionAmbiente().concat(constDespachoPI.getAgregarComentariosOt());
        logger.info("URL ##+" + url);

        ServiceResponseResult response = restCaller.callPostBearerTokenRequest(params, url,
                ServiceResponseResult.class, tokenAcces);
        logger.info("##### RESULT" + gson.toJson(response) + " #######");
        return response;
    }


    @Override
    public ServiceResponseResult consultarEvidenciaAlertaPI(String params) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public DataTableResponse consultarReporteDiario(ParamConsultaOTPI params) {
        logger.info("ImplDespachiPIService.class [metodo consultarReporteDiario() ]\n" + gson.toJson(params));
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

        logger.info("### Object: " + gson.toJson(params));
        String tokenAcces = principalDetail.getAccess_token();
        logger.info("consultaInformacionDetalleOt ##+" + tokenAcces);
        String urlRequest = principalDetail.getDireccionAmbiente().concat(constDespachoPI.getConsultarReporteDiario());
        logger.info("URL ##+" + urlRequest);

        ServiceResponseResult response = restCaller.callPostBearerTokenRequest(gson.toJson(params), urlRequest,
                ServiceResponseResult.class, tokenAcces);
        logger.info("#### RESULT CONSULTA DE REPORTE DIARIO: \n" + gson.toJson(response));

        if (response.getResult() == null || response.getResult() instanceof Integer) {
            dataResponse = DataTableResponse.builder()
                    .isRespuesta(false)
                    .data(new String[0][15])
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
                    int count = 0;
                    dataArray = new String[ordenesArray.size()][15];
                    for (int i = 0; i < ordenesArray.size(); i++) {
                        JsonObject object = (JsonObject) ordenesArray.get(i);
                        logger.info("objeto: " + object);
                        dataArray[count][0] = object.get("ot").getAsInt() != 0 ? String.valueOf(object.get("ot").getAsInt()) : "";
                        dataArray[count][1] = object.get("os") != null && object.get("os").getAsString() != "" ? object.get("os").getAsString().trim() : "";
                        dataArray[count][2] = object.get("cuenta") != null && object.get("cuenta").getAsString() != "" ? object.get("cuenta").getAsString().trim() : "";
                        dataArray[count][3] = object.get("tipo") != null && object.get("tipo").getAsString() != "" ? object.get("tipo").getAsString().trim() : "";
                        dataArray[count][4] = object.get("subTipo") != null && object.get("subTipo").getAsString() != "" ? object.get("subTipo").getAsString().trim() : "";
                        dataArray[count][5] = object.get("estatusOrden") != null && object.get("estatusOrden").getAsString() != "" ? object.get("estatusOrden").getAsString().trim() : "";
                        dataArray[count][6] = object.get("estadoOrden") != null && object.get("estadoOrden").getAsString() != "" ? object.get("estadoOrden").getAsString().trim() : "";
                        dataArray[count][7] = object.get("motivoOrden") != null && object.get("motivoOrden").getAsString() != "" ? object.get("motivoOrden").getAsString().trim() : "";
                        dataArray[count][8] = object.get("ciudad") != null && object.get("ciudad").getAsString() != "" ? object.get("ciudad").getAsString().trim() : "";
                        dataArray[count][9] = object.get("geo1") != null && object.get("geo1").getAsString() != "" ? object.get("geo1").getAsString().trim() : "";
                        dataArray[count][10] = object.get("numEmpleadoTecnico") != null && object.get("numEmpleadoTecnico").getAsString() != "" ? object.get("numEmpleadoTecnico").getAsString().trim() : "";
                        dataArray[count][11] = object.get("usuarioTecnico") != null && object.get("usuarioTecnico").getAsString() != "" ? object.get("usuarioTecnico").getAsString().trim() : "";
                        dataArray[count][12] = object.get("nombreTecnico") != null && object.get("nombreTecnico").getAsString() != "" ? object.get("nombreTecnico").getAsString().trim() : "";
                        dataArray[count][13] = object.get("fechaUltimaAgenda") != null && object.get("fechaUltimaAgenda").getAsString() != "" ? object.get("fechaUltimaAgenda").getAsString().trim() : "";
                        dataArray[count][14] = object.get("fechaFin") != null && object.get("fechaFin").getAsString() != "" ? object.get("fechaFin").getAsString().trim() : "";

                        count++;

                    }
                    dataResponse = DataTableResponse.builder()
                            .isRespuesta(true)
                            .data(dataArray)
                            .paginaActual(jsonObjectResponse.get("paginaActual").getAsInt())
                            .registrosTotales(jsonObjectResponse.get("registrosTotales").getAsInt())
                            .recordsFiltered(jsonObjectResponse.get("registrosTotales").getAsInt() + "")
                            .recordsTotal(jsonObjectResponse.get("registrosTotales").getAsInt() + "")
                            .draw(params.getDraw() + "").build();
                } else {
                    dataResponse = DataTableResponse.builder()
                            .isRespuesta(true)
                            .data(new String[0][15])
                            .paginaActual(jsonObjectResponse.get("paginaActual").getAsInt())
                            .registrosTotales(jsonObjectResponse.get("registrosTotales").getAsInt())
                            .recordsFiltered(jsonObjectResponse.get("registrosTotales").getAsInt() + "")
                            .recordsTotal(jsonObjectResponse.get("registrosTotales").getAsInt() + "")
                            .draw(params.getDraw() + "").build();
                }
            }
        }
        logger.info("*** Objeto Response: " + gson.toJson(dataResponse));

        return dataResponse;
    }


    @Override
    public ServiceResponseResult obtenerResumenPaquete(String params) {
        JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
        LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
        String tokenAcces = principalDetail.getAccess_token();
        String urlRequest = principalDetail.getDireccionAmbiente().concat(constDespachoPI.getResumenPaquete());
        logger.info("### URL obtenerResumenPaquete(): \n" + urlRequest);
        Map<String, String> paramsRequestGet = new HashMap<>();
        paramsRequestGet.put("folio-os", jsonObject.get("folio").getAsString());

        ServiceResponseResult response = restCaller.callGetBearerTokenRequest(
                paramsRequestGet,
                urlRequest,
                ServiceResponseResult.class,
                tokenAcces);

        logger.info("### RESULT obtenerResumenPaquete(): " + gson.toJson(response));
        return response;
    }

    @Override
    public ServiceResponseResult consultaRepoDiarioEx(String params) {
        logger.info("ImplDespachiPIService.class [metodo consultaRepoDiarioEx() ]\n" + params);
        LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
        logger.info("### Object: " + gson.toJson(params));
        String tokenAcces = principalDetail.getAccess_token();
        logger.info("consultaInformacionDetalleOt ##+" + tokenAcces);
        String urlRequest = principalDetail.getDireccionAmbiente().concat(constDespachoPI.getConsultarReporteDiario());
        logger.info("URL ##+" + urlRequest);

        ServiceResponseResult response = restCaller.callPostBearerTokenRequest(params, urlRequest,
                ServiceResponseResult.class, tokenAcces);

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
                    result.add("OT", object.get("ot"));
                    result.addProperty("OS", object.get("os") != null && object.get("os").getAsString() != "" ? object.get("os").getAsString() : "");
                    result.addProperty("CUENTA", object.get("cuenta") != null && object.get("cuenta").getAsString() != "" ? object.get("cuenta").getAsString() : "");
                    result.addProperty("TIPO", object.get("tipo") != null && object.get("tipo").getAsString() != "" ? object.get("tipo").getAsString() : "");
                    result.addProperty("SUBTIPO", object.get("subTipo") != null && object.get("subTipo").getAsString() != "" ? object.get("subTipo").getAsString() : "");
                    result.addProperty("ESTATUS", object.get("estatusOrden") != null && object.get("estatusOrden").getAsString() != "" ? object.get("estatusOrden").getAsString() : "");
                    result.addProperty("ESTADO", object.get("estadoOrden") != null && object.get("estadoOrden").getAsString() != "" ? object.get("estadoOrden").getAsString() : "");
                    result.addProperty("MOTIVO", object.get("motivoOrden") != null && object.get("motivoOrden").getAsString() != "" ? object.get("motivoOrden").getAsString() : "");
                    result.addProperty("CIUDAD", object.get("ciudad") != null && object.get("ciudad").getAsString() != "" ? object.get("ciudad").getAsString() : "");
                    result.addProperty("GEOGRAFÍA", object.get("geo1") != null && object.get("geo1").getAsString() != "" ? object.get("geo1").getAsString() : "");
                    result.addProperty("#EMPLEADO", object.get("numEmpleadoTecnico") != null && object.get("numEmpleadoTecnico").getAsString() != "" ? object.get("numEmpleadoTecnico").getAsString() : "");
                    result.addProperty("#USUARIO", object.get("usuarioTecnico") != null && object.get("usuarioTecnico").getAsString() != "" ? object.get("usuarioTecnico").getAsString() : "");
                    result.addProperty("TÉCNICO", object.get("nombreTecnico") != null && object.get("nombreTecnico").getAsString() != "" ? object.get("nombreTecnico").getAsString() : "");
                    result.addProperty("FECHA AGENDA", object.get("fechaUltimaAgenda") != null && object.get("fechaUltimaAgenda").getAsString() != "" ? object.get("fechaUltimaAgenda").getAsString() : "");
                    result.addProperty("FECHA FIN", object.get("fechaFin") != null && object.get("fechaFin").getAsString() != "" ? object.get("fechaFin").getAsString() : "");

                    ordenesReporte.add(result);
                }
            }
            ordenesR.add("ordenes", ordenesReporte);
            response = ServiceResponseResult.builder()
                    .result(ordenesR.toString())
                    .isRespuesta(true).build();
        }
        logger.info("#### RESULT CONSULTA DE REPORTE DIARIO: \n" + gson.toJson(response));
        return response;
    }

    @Override
    public ServiceResponseResult consultaInformacionVehiculoTecnico(String params) {
        JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
        LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
        String tokenAcces = principalDetail.getAccess_token();
        String urlRequest = principalDetail.getDireccionAmbiente().concat(constDespachoPI.getConsultaInformacionVehiculoTecnico());
        logger.info("### URL consultaInformacionVehiculoTecnico(): \n" + urlRequest);
        Map<String, String> paramsRequestGet = new HashMap<>();
        paramsRequestGet.put("idUsuario", jsonObject.get("idTecnico").getAsString());

        ServiceResponseResult response = restCaller.callGetBearerTokenRequest(
                paramsRequestGet,
                urlRequest,
                ServiceResponseResult.class,
                tokenAcces);

        logger.info("### RESULT consultaInformacionVehiculoTecnico(): " + gson.toJson(response));
        return response;
    }

    @Override
    public ServiceResponseResult consultarCentroAlmacenByNumeroEmpleado(String params) {
        JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
        LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
        String tokenAcces = principalDetail.getAccess_token();
        String urlRequest = principalDetail.getDireccionAmbiente().concat(constDespachoPI.getConsultaCentroAlmacen());
        logger.info("### URL consultarCentroAlmacenByNumeroEmpleado(): \n" + urlRequest);
        
        //https://totalplay-dev.apigee.net/ffm/materiales?centro=TP01&almacen=0113&idUsuario=233
        Map<String, String> paramsRequestGet = new HashMap<>();
        paramsRequestGet.put("numeroEmpleado", jsonObject.get("numEmpleado").getAsString());
        logger.info("------paramsMap"+paramsRequestGet.toString());
        ServiceResponseResult response = restCaller.callGetBearerTokenRequest(
                paramsRequestGet,
                urlRequest,
                ServiceResponseResult.class,
                tokenAcces);

        logger.info("### RESULT consultarCentroAlmacenByNumeroEmpleado(): " + gson.toJson(response));
        return response;
    }

    @Override
    public ServiceResponseResult consultaMaterialesTecnico(String params) {
        JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
        LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
        String tokenAcces = principalDetail.getAccess_token();
        String urlRequest = principalDetail.getDireccionAmbiente().concat(constDespachoPI.getConsultaMateriales());
        logger.info("### URL consultaMaterialesTecnico(): \n" + urlRequest);
        Map<String, String> paramsRequestGet = new HashMap<>(); 
        paramsRequestGet.put("centro", jsonObject.get("centro").getAsString());
        paramsRequestGet.put("almacen", jsonObject.get("almacen").getAsString());
        //paramsRequestGet.put("idFlujo", jsonObject.get("idFlujo").getAsString());
        //paramsRequestGet.put("idUsuario", String.valueOf(principalDetail.getIdUsuario()));
        paramsRequestGet.put("idUsuario", jsonObject.get("idUsuario").getAsString() );
        
        
        ServiceResponseResult response = restCaller.callGetBearerTokenRequest(
                paramsRequestGet,
                urlRequest,
                ServiceResponseResult.class,
                tokenAcces);

        logger.info("### RESULT consultaMaterialesTecnico(): " + gson.toJson(response));
        return response;
    }
    
    @Override
    public ServiceResponseResult consultaPagosTecnico(String params) {
        JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
        LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
        String tokenAcces = principalDetail.getAccess_token();
        String urlRequest = principalDetail.getDireccionAmbiente().concat(constDespachoPI.getConsultaInformacionPagosTecnico());
        logger.info("### URL consultaPagosTecnico(): \n" + urlRequest);
        Map<String, String> paramsRequestGet = new HashMap<>(); 
       
        paramsRequestGet.put("idTecnico", jsonObject.get("idTecnico").getAsString() );
        paramsRequestGet.put("fechaInicio", jsonObject.get("fechaInicio").getAsString() );
        paramsRequestGet.put("fechaFin", jsonObject.get("fechaFin").getAsString() );
        
        ServiceResponseResult response = restCaller.callGetBearerTokenRequest(
                paramsRequestGet,
                urlRequest,
                ServiceResponseResult.class,
                tokenAcces);

        logger.info("### RESULT consultaPagosTecnico(): " + gson.toJson(response));
        return response;
    }
    
    @Override
    public ServiceResponseResult consultaDetalleOtPe(String params) {
        logger.info("ImplDespachoPIService.class [metodo = consultaDetalleOtPe() ]\n" + params);
        LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
        JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
        String idOT = jsonObject.get("idOT").getAsString();
        String idFlujo = jsonObject.get("idFlujo").getAsString();
        String tokenAcces = principalDetail.getAccess_token();
        logger.info("ACCESOS consultaDetalleOtPe ##+" + tokenAcces);
        String urlRequest = principalDetail.getDireccionAmbiente().concat(constDespachoPI.getConsultaDetalleOtPe());
        logger.info("URL ##+" + urlRequest);
        Map<String, String> paramsRequestGet = new HashMap<String, String>();
        paramsRequestGet.put("idOT", idOT);
        paramsRequestGet.put("idFlujo", idFlujo);
        ServiceResponseResult response = restCaller.callGetBearerTokenRequest(paramsRequestGet, urlRequest, ServiceResponseResult.class, tokenAcces);
        return response;
    }

	@Override
	public ServiceResponseResult actualizarDireccionOt(String params) {
		logger.info("### URL actualizarDireccionOt(): \n" + params);

		JsonObject jsonObject = new Gson().fromJson(params, JsonObject.class);
		LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
		String tokenAcces = principalDetail.getAccess_token();

		String urlRequest = principalDetail.getDireccionAmbiente().concat(constDespachoPI.getActualizarDireccionOt());
		jsonObject.addProperty("idOrigen", principalDetail.getIdOrigen());
		logger.info("### URL actualizarDireccionOt(): \n" + urlRequest);

		ServiceResponseResult response = restCaller.callPatchBearerTokenRequest(
				jsonObject.toString(),
				urlRequest,
				ServiceResponseResult.class,
				tokenAcces);

		logger.info("### RESULT actualizarDireccionOt(): \n" + gson.toJson(response));
		return response;
	}

	@Override
	public ServiceResponseResult consultarDetalleOTPIToken(String params, String token, String direccionAmbiente) {
		logger.info("ImplDespachoPIService.class [metodo = consultarDetalleOTPIToken() ]\n" + params);
        JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
        String idotdetalle = jsonObject.get("idOt").getAsString();
        logger.info("consultarDetalleOTPIToken ##+" + token);
        String urlRequest = direccionAmbiente.concat(constDespachoPI.getConsultaDetalleOrdenPI());
        logger.info("#########3--" + urlRequest);
        logger.info("#######idotdetalle------" + idotdetalle);
        Map<String, String> paramsRequestGet = new HashMap<String, String>();
        paramsRequestGet.put("idotasign", idotdetalle);

        ServiceResponseResult response = restCaller.callGetBearerTokenRequest(
                paramsRequestGet,
                urlRequest,
                ServiceResponseResult.class,
                token);
        logger.info("RESULT" + gson.toJson(response));
        return response;
	}

	@Override
	public ServiceResponseResult consultarCatalogoEstatusOrdenToken(String token, String direccionAmbiente) {
		logger.info("ImplDespachoPIService.class [metodo = consultarCatalogoEstatusOrdenToken() ]\n");
        logger.info("consultarCatalogoEstatusOrdenToken ##+" + token);
        String urlRequest = direccionAmbiente.concat(constDespachoPI.getConsultaCatalogoEstatusOrdenDespacho());
        logger.info("consultarCatalogoEstatusOrdenToken" + urlRequest);
        Map<String, String> paramsRequestGet = new HashMap<String, String>();
        ServiceResponseResult response = restCaller.callGetBearerTokenRequest(
                paramsRequestGet,
                urlRequest,
                ServiceResponseResult.class,
                token);
        logger.info("RESULT" + gson.toJson(response));
        return response;
	}

	@Override
	public ServiceResponseResult confirmaDesconfirmaOtDespachoToken(String params, String token, String direccionAmbiente) {
		logger.info("ImplDespachoPIService.class [metodo = confirmaDesconfirmaOtDespachoToken() ]\n" + params);
        logger.info(" constDespachoPI.confirmaDesconfirmaOtDespachoToken()" + constDespachoPI.getConfirmarDesconfirmarOtDespacho());
      
        JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
        String idOrden = jsonObject.get("idOrden").getAsString();
        
        logger.info("confirmaDesconfirmaOtDespachoToken ##+" + token);

        String urlRequest = direccionAmbiente.concat(constDespachoPI.getConfirmarDesconfirmarOtDespacho()).concat(idOrden);

        Map<String, String> paramsRequestGet = new HashMap<String, String>();
        paramsRequestGet.put("idOrden", idOrden);
        paramsRequestGet.put("idOrigen", idOrden);
        paramsRequestGet.put("esConfirmada", idOrden);
        paramsRequestGet.put("comentarios", idOrden);

        ServiceResponseResult response = restCaller.callPatchBearerTokenRequest(
                params,
                urlRequest,
                ServiceResponseResult.class,
                token);

        logger.info("RESULT" + gson.toJson(response));
        return response;
	}

	@Override
	public ServiceResponseResult consultarJerarquiaOrganigrama(String params) {
		logger.info("ImplDespachoPIService.class [metodo = consultarJerarquiaOrganigrama() ]\n" + params);
        LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
        JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
        String tokenAcces = principalDetail.getAccess_token();
        logger.info("ACCESOS consultarJerarquiaOrganigrama ##+" + tokenAcces);
        String urlRequest = principalDetail.getDireccionAmbiente().concat(constDespachoPI.getConsultarJerarquiaOrganigrama());
        logger.info("URL ##+" + urlRequest);
        Map<String, String> paramsRequestGet = new HashMap<String, String>();
        paramsRequestGet.put("idSupervisor", jsonObject.get("idSupervisor").getAsString());
        logger.info(paramsRequestGet);
        ServiceResponseResult response = restCaller.callGetBearerTokenRequest(paramsRequestGet, urlRequest, ServiceResponseResult.class, tokenAcces);

        return response;
	}

	@Override
	public ServiceResponseResult asignarTecnicoGeocerca(String params) {
		logger.info("ImplDespachoPIService.class [metodo = asignarTecnicoGeocerca() ]\n" + params);
		LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
        JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
        String tokenAcces = principalDetail.getAccess_token();
        logger.info("ACCESOS asignarTecnicoGeocerca ##+" + tokenAcces);
        String urlRequest = principalDetail.getDireccionAmbiente().concat(constDespachoPI.getAsignarTecnicoGeocerca());
        logger.info("URL ##+" + urlRequest);
                
        ServiceResponseResult response = restCaller.callPatchBearerTokenRequest(jsonObject.toString(), urlRequest, ServiceResponseResult.class, tokenAcces);
        
        logger.info("### RESULT asignarTecnicoGeocerca(): \n" + gson.toJson(response));
		return response;
	}
}
