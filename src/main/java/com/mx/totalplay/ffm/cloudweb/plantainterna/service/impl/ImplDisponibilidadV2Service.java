package com.mx.totalplay.ffm.cloudweb.plantainterna.service.impl;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.mx.totalplay.ffm.cloudweb.plantainterna.service.DisponibilidadV2Service;
import com.mx.totalplay.ffm.cloudweb.plantainterna.utils.ConstDisponibilidadV2;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.LoginResult;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.ServiceResponseResult;
import com.mx.totalplay.ffm.cloudweb.utilerias.utils.ConsumeRest;
import com.mx.totalplay.ffm.cloudweb.utilerias.utils.UtileriaGeneral;

@Service
public class ImplDisponibilidadV2Service implements DisponibilidadV2Service {
	
	private final Logger logger = LogManager.getLogger(ImplDisponibilidadV2Service.class.getName());
	
	private final ConsumeRest consumeRest;
	private final ConstDisponibilidadV2 constDisponibilidadV2;
	private final UtileriaGeneral utileriaGeneral;
	private Gson gson = new Gson();
	
	

	public ImplDisponibilidadV2Service(ConsumeRest consumeRest, ConstDisponibilidadV2 constDisponibilidadV2, UtileriaGeneral utileriaGeneral) {
		this.consumeRest = consumeRest;
		this.constDisponibilidadV2 = constDisponibilidadV2;
		this.utileriaGeneral = utileriaGeneral;
	}


}
