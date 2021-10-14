package com.mx.totalplay.ffm.cloudweb.plantaexterna.service.impl;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

import com.google.gson.Gson;
import com.mx.totalplay.ffm.cloudweb.plantaexterna.service.IncidenciasCuadrantesService;
import com.mx.totalplay.ffm.cloudweb.plantaexterna.utils.ConstIncidenciasCuadrantes;
import com.mx.totalplay.ffm.cloudweb.utilerias.utils.ConstantesGeneric;
import com.mx.totalplay.ffm.cloudweb.utilerias.utils.ConsumeRest;
import com.mx.totalplay.ffm.cloudweb.utilerias.utils.UtileriaGeneral;

@Service
public class ImplIncidenciasCuadrantesService implements IncidenciasCuadrantesService{
	
	private final Logger logger = LogManager.getLogger(ImplIncidenciasCuadrantesService.class.getName());
	private final ConsumeRest restCaller;
    private final ConstantesGeneric constantesGeneric;
    private final Environment env;
    private final ConstIncidenciasCuadrantes constIncidenciasCuadrantes;
    private final UtileriaGeneral utilerias;
    Gson gson = new Gson();
    
    @Autowired
    public ImplIncidenciasCuadrantesService(ConsumeRest restCaller, ConstantesGeneric constantesGeneric,  Environment env, ConstIncidenciasCuadrantes constIncidenciasCuadrantes, UtileriaGeneral utilerias) {
    	this.restCaller = restCaller;
    	this.constantesGeneric = constantesGeneric;
    	this.env = env;
    	this.constIncidenciasCuadrantes = constIncidenciasCuadrantes;
    	this.utilerias = utilerias;
    }

}
