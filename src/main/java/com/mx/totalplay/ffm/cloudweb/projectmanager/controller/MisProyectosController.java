package com.mx.totalplay.ffm.cloudweb.projectmanager.controller;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mx.totalplay.ffm.cloudweb.plantainterna.controller.BusquedaController;
import com.mx.totalplay.ffm.cloudweb.projectmanager.service.MisProyectosService;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.ServiceResponseResult;

@RestController
@RequestMapping("/req")
public class MisProyectosController {
	private final Logger logger = LogManager.getLogger(BusquedaController.class.getName());
	private final MisProyectosService misProyectosService;
	
	public MisProyectosController(MisProyectosService misProyectosService) {
		this.misProyectosService = misProyectosService;
	}
	
	@PostMapping("/consultarProyectosPMS")
    public ResponseEntity<?> consultarProyectosPMS(@RequestBody String params){
		logger.info("#### MisProyectosController - consultarProyectosPMS ### \n" + params);
		ServiceResponseResult response = misProyectosService.consultarProyectos(params);
		if (response.getResult() instanceof Integer){
            return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
        }
		return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
	}
	
	@PostMapping("/consultarActividadesPMS")
    public ResponseEntity<?> consultarActividadesPMS(@RequestBody String params){
		logger.info("#### MisProyectosController - consultarActividadesPMS ### \n" + params);
		ServiceResponseResult response = misProyectosService.consultarActividadesPMS(params);
		if (response.getResult() instanceof Integer){
            return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
        }
		return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
	}
}
