package com.mx.totalplay.ffm.cloudweb.plantainterna.service.impl;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.mx.totalplay.ffm.cloudweb.plantainterna.service.BusquedaService;
import com.mx.totalplay.ffm.cloudweb.plantainterna.utils.ConstBusqueda;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.ServiceResponseResult;
import com.mx.totalplay.ffm.cloudweb.utilerias.utils.ConstantesGeneric;
import com.mx.totalplay.ffm.cloudweb.utilerias.utils.ConsumeRest;
import com.mx.totalplay.ffm.cloudweb.utilerias.utils.UtileriaGeneral;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

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

        JsonObject login = new JsonObject();
        login.addProperty(environment.getProperty("param.textus.PI"), constantesGeneric.getTextIpUsuario());
        login.addProperty(environment.getProperty("param.textus.drowssaP"), constantesGeneric.getTextCredPad());
        login.addProperty(environment.getProperty("param.textus.resU"), constantesGeneric.getTextCredUs());

        jsonObject.add("Loguin", login);
        logger.info("### json object params ## \n" + jsonObject.toString());
        response = restCaller.callPostParamString(constBusqueda.getBusquedaSaleForces(), jsonObject.toString());
        logger.info("### RESULT BUSQUEDA: \n" + gson.toJson(response));

        return response;
    }

    @Override
    public ServiceResponseResult consultarDetalleObjectSF(String params) {
        JsonObject jsonObject = gson.fromJson(params, JsonObject.class);

        JsonObject login = new JsonObject();
        login.addProperty(environment.getProperty("param.textus.PI"), constantesGeneric.getTextIpUsuario());
        login.addProperty(environment.getProperty("param.textus.drowssaP"), constantesGeneric.getTextCredPad());
        login.addProperty(environment.getProperty("param.textus.resU"), constantesGeneric.getTextCredUs());

        jsonObject.add("Loguin", login);
        logger.info("### json object params ## \n" + jsonObject.toString());
        response = restCaller.callPostParamString(constBusqueda.getConsultaDetalleObjetoSF(), jsonObject.toString());
        logger.info("### RESULT BUSQUEDA: \n" + gson.toJson(response));
        return response;
    }
}
