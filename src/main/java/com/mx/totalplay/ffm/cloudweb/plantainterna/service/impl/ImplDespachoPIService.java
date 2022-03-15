package com.mx.totalplay.ffm.cloudweb.plantainterna.service.impl;

import com.google.gson.JsonArray;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.mx.totalplay.ffm.cloudweb.plantainterna.service.DespachoPIService;
import com.mx.totalplay.ffm.cloudweb.plantainterna.utils.ConstDespachoPI;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.LoginResult;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.Permiso;
import com.mx.totalplay.ffm.cloudweb.utilerias.utils.ConstantesGeneric;
import com.mx.totalplay.ffm.cloudweb.utilerias.utils.ConsumeRest;
import com.mx.totalplay.ffm.cloudweb.utilerias.utils.UtileriaGeneral;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.ServiceResponseResult;
import com.mx.totalplay.ffm.cloudweb.plantainterna.model.consultaOTPI.ParamConsultaOTPI;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.DataTableResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

@Service
public class ImplDespachoPIService implements DespachoPIService {
    private final Logger logger = LogManager.getLogger(ImplDespachoPIService.class.getName());
    private final ConstantesGeneric constantesAmbiente;
    private final ConstDespachoPI constDespachoPI;
    private final ConsumeRest restCaller;
    private final UtileriaGeneral utilerias;
    private final Environment env;
    private Gson gson = new Gson();

    @Autowired
    public ImplDespachoPIService(ConstantesGeneric constantesAmbiente, ConstDespachoPI constDespachoPI, ConsumeRest restCaller, UtileriaGeneral utilerias, Environment env) {
        this.constantesAmbiente = constantesAmbiente;
        this.constDespachoPI = constDespachoPI;
        this.restCaller = restCaller;
        this.utilerias = utilerias;
        this.env = env;
    }

    @Override
    public ServiceResponseResult consultarCatalogosPI(String params) {
        JsonObject jsonObject = gson.fromJson(params, JsonObject.class);

        JsonObject login = new JsonObject();
        login.addProperty(env.getProperty("param.textus.pI"), constantesAmbiente.getTextIpUsuario());
        login.addProperty(env.getProperty("param.textus.drowssaP"), constantesAmbiente.getTextCredPad());
        login.addProperty(env.getProperty("param.textus.resU"), constantesAmbiente.getTextCredUs());

        jsonObject.add("Login", login);

        logger.info("json object params## " + jsonObject.toString());

        String url = "http://10.216.47.89" + constDespachoPI.getFiltrosDespachoPI();
        ServiceResponseResult response = restCaller.callPostParamString(url, jsonObject.toString());
        logger.info("RESULT" + gson.toJson(response));
        return response;
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


    public ServiceResponseResult consultarCatalogoTipoOrdenUsuarioDespacho() {
        logger.info("ImplDespachoPIService.class [metodo = consultarCatalogoTipoOrdenUsuarioDespacho() ]\n");
        //logger.info("env --------------------"+env.getProperty("variable.entorno.ambiente"));


        LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
        String tokenAcces = principalDetail.getAccess_token();
        logger.info("consultarCatalogoTipoOrdenUsuarioDespacho ##+" + tokenAcces);
        String urlRequest = principalDetail.getDireccionAmbiente().concat(constDespachoPI.getConsultaCatalogoTipoOrdenUsuarioDespacho());
        Map<String, String> paramsRequestGet = new HashMap<String, String>();
        paramsRequestGet.put("idUsuario", String.valueOf(principalDetail.getIdUsuario()));

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


    public ServiceResponseResult consultarCatalogoEstatusOrden() {
        logger.info("ImplDespachoPIService.class [metodo = consultarCatalogoEstatusOrden() ]\n");

        LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
        String tokenAcces = principalDetail.getAccess_token();
        String tokenAccess = principalDetail.getAccess_token();
        logger.info("consultarCatalogoEstatusOrden ##+" + tokenAccess);
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

    public ServiceResponseResult consultarCatalogoGeografiaUsuario() {
        logger.info("ImplDespachoPIService.class [metodo = consultarCatalogoGeografiaUsuario() ]\n");

        LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
        String tokenAcces = principalDetail.getAccess_token();
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
    public ServiceResponseResult consultarCatalogoTurnosPI() {
        logger.info("ImplDespachoPIService.class [metodo = consultarCatalogoTurnosPI() ]\n");


        LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
        String tokenAcces = principalDetail.getAccess_token();
        logger.info("consultarCatalogoTurnosPI ##+" + tokenAcces);
        String urlRequest = principalDetail.getDireccionAmbiente().concat(constDespachoPI.getConsultarCatalogoTurnosPi());
        logger.info("urlRequest ##+" + urlRequest);

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

        ServiceResponseResult response = restCaller.callGetBearerTokenRequest(
                paramsRequestGet,
                urlRequest,
                ServiceResponseResult.class,
                tokenAcces);
        return response;
    }


    @Override
    public ServiceResponseResult consultarOperariosAsignadosDespacho() {
        logger.info("ImplDespachoPIService.class [metodo = consultarOperariosAsignadosDespacho() ]");

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


        String urlRequest = principalDetail.getDireccionAmbiente().concat(constDespachoPI.getOrdenesPendientesDespachoP());

        ServiceResponseResult response = restCaller.callPostBearerTokenRequest(
                params,
                urlRequest,
                ServiceResponseResult.class,
                tokenAcces);

        logger.info("RESULT" + gson.toJson(response));
        return response;
    }

    public ServiceResponseResult consultarConfiguracionDespachoDespachoServ(String params) {
        LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();

        JsonObject jsonObject = gson.fromJson(params, JsonObject.class);

        Map<String, Object> mapResponse = principalDetail.getConfiguraciones();

        if (jsonObject != null) {
            String claveBusqueda = jsonObject.get("moduloAccionesUsuario").getAsString();
            Permiso permiso = principalDetail.getModulos()
                    .stream()
                    .filter(e -> claveBusqueda.equals(e.getClave()))
                    .findAny()
                    .orElse(null);

            mapResponse.put("MODULO_ACCIONES_USUARIO", permiso);
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
    public ServiceResponseResult cambiarEstatusTecnicoDespachoPI(String params) {
        JsonObject jsonObject = gson.fromJson(params, JsonObject.class);

        JsonObject login = new JsonObject();
        login.addProperty(env.getProperty("param.textus.pI"), constantesAmbiente.getTextIpUsuario());
        login.addProperty(env.getProperty("param.textus.drowssaP"), constantesAmbiente.getTextCredPad());
        login.addProperty(env.getProperty("param.textus.resU"), constantesAmbiente.getTextCredUs());

        jsonObject.add("Login", login);
        logger.info("json object params## " + jsonObject.toString());
        String url = "http://10.216.47.89" + constDespachoPI.getCambiarEstatusOperarioPI();
        ServiceResponseResult response = restCaller.callPostParamString(url, jsonObject.toString());

        logger.info("RESULT" + gson.toJson(response));
        return response;
    }

    @Override
    public ServiceResponseResult consultarOtsTrabajadasDespachoPI(String params) {
        JsonObject jsonObject = gson.fromJson(params, JsonObject.class);

        JsonObject login = new JsonObject();
        login.addProperty(env.getProperty("param.textus.pI"), constantesAmbiente.getTextIpUsuario());
        login.addProperty(env.getProperty("param.textus.drowssaP"), constantesAmbiente.getTextCredPad());
        login.addProperty(env.getProperty("param.textus.resU"), constantesAmbiente.getTextCredUs());

        jsonObject.add("Login", login);
        logger.info("json object params## " + jsonObject.toString());
        String url = "http://10.216.47.89" + constDespachoPI.getConsultaOtsTrabajadasDespachoPI();
        ServiceResponseResult response = restCaller.callPostParamString(url, jsonObject.toString());

        logger.info("RESULT" + gson.toJson(response));
        return response;
    }

    @Override
    public ServiceResponseResult consultarInformacionVehiculoOperario(String params) {
        JsonObject jsonObject = gson.fromJson(params, JsonObject.class);

        JsonObject login = new JsonObject();
        login.addProperty(env.getProperty("param.textus.pI"), constantesAmbiente.getTextIpUsuario());
        login.addProperty(env.getProperty("param.textus.drowssaP"), constantesAmbiente.getTextCredPad());
        login.addProperty(env.getProperty("param.textus.resU"), constantesAmbiente.getTextCredUs());

        jsonObject.add("Login", login);
        logger.info("json object params## " + jsonObject.toString());
        String url = "http://10.216.47.89" + constDespachoPI.getConsultaInformacionVehiculoOper();
        ServiceResponseResult response = restCaller.callPostParamString(url, jsonObject.toString());
        logger.info("RESULT" + gson.toJson(response));
        return response;
    }

    @Override
    public ServiceResponseResult consultarMaterialesOperarioPI(String params) {
        JsonObject jsonObject = gson.fromJson(params, JsonObject.class);

        JsonObject login = new JsonObject();
        login.addProperty(env.getProperty("param.textus.pI"), constantesAmbiente.getTextIpUsuario());
        login.addProperty(env.getProperty("param.textus.drowssaP"), constantesAmbiente.getTextCredPad());
        login.addProperty(env.getProperty("param.textus.resU"), constantesAmbiente.getTextCredUs());

        jsonObject.add("Login", login);
        logger.info("json object params## " + jsonObject.toString());
        String url = "http://10.216.47.89" + constDespachoPI.getConsultaInformacionMaterialesOperario();
        ServiceResponseResult response = restCaller.callPostParamString(url, jsonObject.toString());
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
    public ServiceResponseResult cambiarEstatusIntegrador(String params) {
        JsonObject jsonObject = gson.fromJson(params, JsonObject.class);

        JsonObject login = new JsonObject();
        login.addProperty(env.getProperty("param.textus.pI"), constantesAmbiente.getTextIpUsuario());
        login.addProperty(env.getProperty("param.textus.drowssaP"), constantesAmbiente.getTextCredPad());
        login.addProperty(env.getProperty("param.textus.resU"), constantesAmbiente.getTextCredUs());

        jsonObject.add("Login", login);
        logger.info("json object params## " + jsonObject.toString());
        String url = "http://10.216.47.89" + constDespachoPI.getCanalizarAlerta();
        ServiceResponseResult response = restCaller.callPostParamString(url, jsonObject.toString());
        logger.info("RESULT" + gson.toJson(response));
        return response;
    }

    @Override
    public ServiceResponseResult setComentariosIntegrador(String params) {
        JsonObject jsonObject = gson.fromJson(params, JsonObject.class);

        JsonObject login = new JsonObject();

        login.addProperty(env.getProperty("param.textus.pI"), constantesAmbiente.getTextIpUsuario());
        login.addProperty(env.getProperty("param.textus.drowssaP"), constantesAmbiente.getTextCredPad());
        login.addProperty(env.getProperty("param.textus.resU"), constantesAmbiente.getTextCredUs());

        jsonObject.add("Login", login);
        logger.info("json object params## " + jsonObject.toString());
        String url = "http://10.216.47.89" + constDespachoPI.getAgregarComentarioAlerta();
        ServiceResponseResult response = restCaller.callPostParamString(url, jsonObject.toString());
        logger.info("RESULT" + gson.toJson(response));
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
    public ServiceResponseResult consultarComentariosAlertaPI(String params) {
        JsonObject jsonObject = gson.fromJson(params, JsonObject.class);

        JsonObject login = new JsonObject();
        login.addProperty(env.getProperty("param.textus.pI"), constantesAmbiente.getTextIpUsuario());
        login.addProperty(env.getProperty("param.textus.drowssaP"), constantesAmbiente.getTextCredPad());
        login.addProperty(env.getProperty("param.textus.resU"), constantesAmbiente.getTextCredUs());

        jsonObject.add("Login", login);
        logger.info("json object params## " + jsonObject.toString());
        String url = "http://10.216.47.89" + constDespachoPI.getConsultarComentariosAlerta();
        ServiceResponseResult response = restCaller.callPostParamString(url, jsonObject.toString());
        logger.info("RESULT" + gson.toJson(response));
        return response;
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
       
        paramsRequestGet.put("idUsuario", jsonObject.get("idUsuario").getAsString() );
        
        
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
}
