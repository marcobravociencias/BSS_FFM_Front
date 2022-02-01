package com.mx.totalplay.ffm.cloudweb.plantainterna.service.impl;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

import com.google.gson.Gson;
import com.mx.totalplay.ffm.cloudweb.plantainterna.service.VistaAuditoriaService;
import com.mx.totalplay.ffm.cloudweb.plantainterna.utils.ConstVistaAuditoria;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.ServiceResponseResult;
import com.mx.totalplay.ffm.cloudweb.utilerias.utils.ConstantesGeneric;
import com.mx.totalplay.ffm.cloudweb.utilerias.utils.ConsumeRest;
import com.mx.totalplay.ffm.cloudweb.utilerias.utils.UtileriaGeneral;

@Service
public class ImplVistaAuditoriaService implements VistaAuditoriaService{
	
	private final Logger logger = LogManager.getLogger(ImplVistaAuditoriaService.class.getName());
	private final ConsumeRest restCaller;
    private ServiceResponseResult response;
    private final Environment environment;
    private final UtileriaGeneral utilerias;
    private Gson gson = new Gson();
    private final ConstantesGeneric constantesGeneric;
    private final ConstVistaAuditoria constVistaAuditoria;
    
    @Autowired
    public ImplVistaAuditoriaService(ConsumeRest restCaller, Environment environment, UtileriaGeneral utilerias, ConstantesGeneric constantesGeneric, ConstVistaAuditoria constVistaAuditoria) {
    	this.restCaller = restCaller;
        this.environment = environment;
        this.utilerias = utilerias;
        this.constantesGeneric = constantesGeneric;
        this.constVistaAuditoria = constVistaAuditoria;
    }

}
