package com.mx.totalplay.ffm.cloudweb.plantainterna.controller;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mx.totalplay.ffm.cloudweb.plantainterna.service.DisponibilidadV2Service;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.ServiceResponseResult;

@RestController
@RequestMapping("/req")
public class DisponibilidadV2Controller {
	
	private final Logger logger = LogManager.getLogger(DisponibilidadV2Controller.class.getName());
	private final DisponibilidadV2Service disponibilidadV2Service;
	
	public DisponibilidadV2Controller(DisponibilidadV2Service disponibilidadV2Service) {
		this.disponibilidadV2Service = disponibilidadV2Service;
	}
	
	@PostMapping("/consultaDisponibilidadV2")
    public ResponseEntity<?> consultaDisponibilidadV2(@RequestBody String params) {
        logger.info("#### CONSULTANDO DISPONIBILIDADV2 ###");
        ServiceResponseResult response = disponibilidadV2Service.consultarDisponibilidadV2(params);
        if (response.getResult() instanceof Integer){
            return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
    }
	
	
	

}
