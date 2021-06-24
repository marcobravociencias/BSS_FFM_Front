package com.mx.totalplay.ffm.cloudweb.plantainterna.service.impl;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.mx.totalplay.ffm.cloudweb.plantainterna.service.DisponibilidadService;
import com.mx.totalplay.ffm.cloudweb.plantainterna.utils.ConstDisponbilidadPI;
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
public class ImplDisponibilidadService implements DisponibilidadService {

    private final Logger logger = LogManager.getLogger(ImplDisponibilidadService.class.getName());
    private final ConstDisponbilidadPI constDisponbilidadPI;
    private final ConstantesGeneric constantesGeneric;
    private final ConsumeRest consumeRest;
    private final UtileriaGeneral utileriaGeneral;
    private final Environment environment;
    private Gson gson = new Gson();

    @Autowired
    public ImplDisponibilidadService(ConstDisponbilidadPI constDisponbilidadPI, ConstantesGeneric constantesGeneric, ConsumeRest consumeRest, UtileriaGeneral utileriaGeneral, Environment environment) {
        this.constDisponbilidadPI = constDisponbilidadPI;
        this.constantesGeneric = constantesGeneric;
        this.consumeRest = consumeRest;
        this.utileriaGeneral = utileriaGeneral;
        this.environment = environment;
    }

    @Override
    public ServiceResponseResult insertarDisponibilidad(String params) {
        logger.info("ImplDisponibilidadService.class [metodo = insertarDisponibilidad() ]\n" + params);

        JsonObject jsonObject = gson.fromJson(params, JsonObject.class);

        LoginResult principalDetail = utileriaGeneral.obtenerObjetoPrincipal();
        String tokenAcces = principalDetail.getAccess_token();
        logger.info("insertarDisponibilidad ##+" + tokenAcces);
        String urlRequest = principalDetail.getDireccionAmbiente().concat(constDisponbilidadPI.getCrearDisponibilidad());
        ;
        ServiceResponseResult response = consumeRest.callPostBearerTokenRequest(
                params,
                urlRequest,
                ServiceResponseResult.class,
                tokenAcces);
        logger.info("RESULT" + gson.toJson(response));
        return response;
    }

    @Override
    public ServiceResponseResult consultarDisponibilidad(String params) {
        logger.info("ImplDisponibilidadService.class [metodo = consultarDisponibilidad() ]\n" + params);

        JsonObject jsonObject = gson.fromJson(params, JsonObject.class);

        LoginResult principalDetail = utileriaGeneral.obtenerObjetoPrincipal();
        String tokenAcces = principalDetail.getAccess_token();
        logger.info("consultarDisponibilidad ##+" + tokenAcces);
        String urlRequest = principalDetail.getDireccionAmbiente().concat(constDisponbilidadPI.getFfmDisponibilidad() + "?subtipoIntervencion=" + jsonObject.get("subtipoIntervencion").getAsString() + "&geografia2=" + jsonObject.get("geografia2").getAsString());

        Map<String, String> paramsRequestGet = new HashMap<String, String>();
        paramsRequestGet.put("subtipoIntervencion", jsonObject.get("subtipoIntervencion").getAsString());
        paramsRequestGet.put("geografia2", jsonObject.get("geografia2").getAsString());

        ServiceResponseResult response = consumeRest.callGetBearerTokenRequest(paramsRequestGet, urlRequest,
                ServiceResponseResult.class, tokenAcces);
        logger.info("RESULT" + gson.toJson(response));
        return response;
    }

    @Override
    public ServiceResponseResult actualizarDisponibilidad(String params) {
        logger.info("ImplDisponibilidadService.class [metodo = actualizarDisponibilidad() ]\n" + params);

        JsonObject jsonObject = gson.fromJson(params, JsonObject.class);

        LoginResult principalDetail = utileriaGeneral.obtenerObjetoPrincipal();
        String tokenAcces = principalDetail.getAccess_token();
        logger.info("actualizarDisponibilidad ##+" + tokenAcces);
        String urlRequest = principalDetail.getDireccionAmbiente().concat(constDisponbilidadPI.getActualizarDisponibilidad());

        ServiceResponseResult response = consumeRest.callPutBearerTokenRequest(params, urlRequest,
                ServiceResponseResult.class, tokenAcces);
        logger.info("RESULT" + gson.toJson(response));
        return response;
    }

    @Override
    public ServiceResponseResult consultarIntervenciones() {
        JsonObject jsonObject = new JsonObject();

        JsonObject login = new JsonObject();
        login.addProperty(environment.getProperty("param.textus.pI"), constantesGeneric.getTextIpUsuario());
        login.addProperty(environment.getProperty("param.textus.drowssaP"), constantesGeneric.getTextCredPad());
        login.addProperty(environment.getProperty("param.textus.resU"), constantesGeneric.getTextCredUs());

        jsonObject.add("Login", login);
        jsonObject.addProperty(environment.getProperty("param.textus.ohcapseDDI"), "6");

        logger.info("json object params## " + jsonObject.toString());

        String url = "http://10.216.47.89" + constDisponbilidadPI.getRestconsultaintervencidisponibilidad();
        ServiceResponseResult response = consumeRest.callPostParamString(url, jsonObject.toString());
        logger.info("RESULT" + gson.toJson(response));
        return response;
    }
}
