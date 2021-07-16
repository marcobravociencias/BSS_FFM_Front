package com.mx.totalplay.ffm.cloudweb.plantainterna.service.impl;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.mx.totalplay.ffm.cloudweb.plantainterna.service.DisponibilidadService;
import com.mx.totalplay.ffm.cloudweb.plantainterna.utils.ConstDisponbilidadPI;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.LoginResult;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.ServiceResponseResult;
import com.mx.totalplay.ffm.cloudweb.utilerias.utils.ConsumeRest;
import com.mx.totalplay.ffm.cloudweb.utilerias.utils.UtileriaGeneral;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class ImplDisponibilidadService implements DisponibilidadService {

    private final Logger logger = LogManager.getLogger(ImplDisponibilidadService.class.getName());
    private final ConstDisponbilidadPI constDisponbilidadPI;
    private final ConsumeRest consumeRest;
    private final UtileriaGeneral utileriaGeneral;
    private Gson gson = new Gson();

    @Autowired
    public ImplDisponibilidadService(ConstDisponbilidadPI constDisponbilidadPI, ConsumeRest consumeRest, UtileriaGeneral utileriaGeneral) {
        this.constDisponbilidadPI = constDisponbilidadPI;
        this.consumeRest = consumeRest;
        this.utileriaGeneral = utileriaGeneral;
    }

    @Override
    public ServiceResponseResult insertarDisponibilidad(String params) {
        logger.info("ImplDisponibilidadService.class [metodo = insertarDisponibilidad() ]\n" + params);
        
        LoginResult principalDetail = utileriaGeneral.obtenerObjetoPrincipal();
        String tokenAcces = principalDetail.getAccess_token();
        logger.info("insertarDisponibilidad ##+" + tokenAcces);
        String urlRequest = principalDetail.getDireccionAmbiente().concat(constDisponbilidadPI.getCrearDisponibilidad());
        logger.info("***URL: "+ urlRequest);
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
        logger.info("***URL: "+ urlRequest);
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

        LoginResult principalDetail = utileriaGeneral.obtenerObjetoPrincipal();
        String tokenAcces = principalDetail.getAccess_token();
        logger.info("actualizarDisponibilidad ##+" + tokenAcces);
        String urlRequest = principalDetail.getDireccionAmbiente().concat(constDisponbilidadPI.getActualizarDisponibilidad());
        logger.info("***URL: "+ urlRequest);
        ServiceResponseResult response = consumeRest.callPutBearerTokenRequest(params, urlRequest,
                ServiceResponseResult.class, tokenAcces);
        logger.info("RESULT" + gson.toJson(response));
        return response;
    }
}
