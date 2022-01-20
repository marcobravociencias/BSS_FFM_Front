package com.mx.totalplay.ffm.cloudweb.plantainterna.service.impl;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

import com.google.gson.Gson;
import com.mx.totalplay.ffm.cloudweb.plantainterna.service.GestionTecnicosService;
import com.mx.totalplay.ffm.cloudweb.plantainterna.utils.ConstGestionTecnicos;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.ServiceResponseResult;
import com.mx.totalplay.ffm.cloudweb.utilerias.utils.ConstantesGeneric;
import com.mx.totalplay.ffm.cloudweb.utilerias.utils.ConsumeRest;
import com.mx.totalplay.ffm.cloudweb.utilerias.utils.UtileriaGeneral;

@Service
public class ImplGestionTecnicosService implements GestionTecnicosService {
	
	private final Logger logger = LogManager.getLogger(ImplGestionTecnicosService.class.getName());
	private final ConsumeRest restCaller;
    private ServiceResponseResult response;
    private final Environment environment;
    private final UtileriaGeneral utilerias;
    private Gson gson = new Gson();
    private final ConstantesGeneric constantesGeneric;
    private final ConstGestionTecnicos constGestionTecnicos;
    
    @Autowired
    public ImplGestionTecnicosService(ConsumeRest restCaller, Environment environment, UtileriaGeneral utilerias, ConstantesGeneric constantesGeneric, ConstGestionTecnicos constGestionTecnicos) {
    	this.restCaller = restCaller;
        this.environment = environment;
        this.utilerias = utilerias;
        this.constantesGeneric = constantesGeneric;
        this.constGestionTecnicos = constGestionTecnicos;
    }

}
