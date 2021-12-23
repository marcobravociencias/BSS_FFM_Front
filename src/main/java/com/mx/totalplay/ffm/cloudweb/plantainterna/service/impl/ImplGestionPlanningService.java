package com.mx.totalplay.ffm.cloudweb.plantainterna.service.impl;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.mx.totalplay.ffm.cloudweb.plantainterna.service.GestionPlanningService;
import com.mx.totalplay.ffm.cloudweb.plantainterna.utils.ConstGestionPlanning;
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
public class ImplGestionPlanningService implements GestionPlanningService {

    private final Logger logger = LogManager.getLogger(ImplGestionPlanningService.class.getName());
    private final ConstGestionPlanning constGestionPlanning;
    private final ConsumeRest consumeRest;
    private final UtileriaGeneral utileriaGeneral;
    private Gson gson = new Gson();

    @Autowired
    public ImplGestionPlanningService(ConstGestionPlanning constGestionPlanning, ConsumeRest consumeRest,
            UtileriaGeneral utileriaGeneral) {
        this.constGestionPlanning = constGestionPlanning;
        this.consumeRest = consumeRest;
        this.utileriaGeneral = utileriaGeneral;
    }

    @Override
    public ServiceResponseResult consultarPagosTecnico(String params) {
        logger.info("ImplGestionPlanningService.class [metodo = consultarPagosTecnico() ]\n" + params);

        LoginResult principalDetail = utileriaGeneral.obtenerObjetoPrincipal();
        String tokenAcces = principalDetail.getAccess_token();
        logger.info("consultarPagosTecnico ##+" + tokenAcces);
        String urlRequest = principalDetail.getDireccionAmbiente()
                .concat(constGestionPlanning.getConsultaPagosLiberarTecnico());
        logger.info("***URL: " + urlRequest);

        ServiceResponseResult response = consumeRest.callPostBearerTokenRequest(params, urlRequest,
                ServiceResponseResult.class, tokenAcces);
        logger.info("RESULT" + gson.toJson(response));
        return response;
    }

    @Override
    public ServiceResponseResult liberarPagosTecnicos(String params) {
        logger.info("ImplGestionPlanningService.class [metodo = liberarPagosTecnico() ]\n" + params);

        JsonObject jsonObject = gson.fromJson(params, JsonObject.class);

        LoginResult principalDetail = utileriaGeneral.obtenerObjetoPrincipal();
        String tokenAcces = principalDetail.getAccess_token();
        logger.info("liberarPagosTecnico ##+" + tokenAcces);
        String urlRequest = principalDetail.getDireccionAmbiente()
                .concat(constGestionPlanning.getLiberarPagosTecnico());
        logger.info("***URL: " + urlRequest);
        Map<String, String> paramUri = new HashMap<String, String>();

        ServiceResponseResult response = consumeRest.callPatchBearerTokenRequestURL(paramUri,
                gson.toJson(jsonObject), urlRequest, ServiceResponseResult.class, tokenAcces);
        logger.info("RESULT" + gson.toJson(response));
        return response;
    }

    @Override
    public ServiceResponseResult restaurarContraseniaUsuario(String params) {
        logger.info("ImplGestionPlanningService.class [metodo = restaurarContraseniaUsuario() ]\n" + params);

        JsonObject jsonObject = gson.fromJson(params, JsonObject.class);

        LoginResult principalDetail = utileriaGeneral.obtenerObjetoPrincipal();
        String tokenAcces = principalDetail.getAccess_token();
        logger.info("restaurarContraseniaUsuario ##+" + tokenAcces);
        String urlRequest = principalDetail.getDireccionAmbiente()
                .concat(constGestionPlanning.getRestaurarContrasenaUsuario());
        logger.info("***URL: " + urlRequest);
        Map<String, String> paramUri = new HashMap<String, String>();

        ServiceResponseResult response = consumeRest.callPatchBearerTokenRequestURL(paramUri,
                gson.toJson(jsonObject), urlRequest, ServiceResponseResult.class, tokenAcces);
        logger.info("RESULT" + gson.toJson(response));
        return response;
    }

    @Override
    public ServiceResponseResult gestionGeocercasPlanning(String params) {
        logger.info("ImplGestionPlanningService.class [metodo = gestionGeocercasPlanning() ]\n" + params);

        JsonObject jsonObject = gson.fromJson(params, JsonObject.class);

        LoginResult principalDetail = utileriaGeneral.obtenerObjetoPrincipal();
        String tokenAcces = principalDetail.getAccess_token();
        logger.info("gestionGeocercasPlanning ##+" + tokenAcces);
        String urlRequest = principalDetail.getDireccionAmbiente()
                .concat(constGestionPlanning.getGestionGeocercasPlanning());
        logger.info("***URL: " + urlRequest);
        Map<String, String> paramUri = new HashMap<String, String>();

        ServiceResponseResult response = consumeRest.callPatchBearerTokenRequestURL(paramUri,
                gson.toJson(jsonObject), urlRequest, ServiceResponseResult.class, tokenAcces);
        logger.info("RESULT" + gson.toJson(response));
        return response;
    }

}
