package com.mx.totalplay.ffm.cloudweb.utilerias.controller;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mx.totalplay.ffm.cloudweb.utilerias.model.ServiceResponseResult;
import com.mx.totalplay.ffm.cloudweb.utilerias.service.GestionNoticiasService;

@RestController
@RequestMapping("/req")
public class GestionNoticiasController {
	
	private final Logger logger = LogManager.getLogger(GenericAccionesController.class.getName());
	private final GestionNoticiasService gestionNoticiasService;
	
	public GestionNoticiasController(GestionNoticiasService gestionNoticiasService) {
		this.gestionNoticiasService = gestionNoticiasService;
	}

	@PostMapping("/consultarNoticiasGeneric")
    public ResponseEntity<?> consultarNoticiasGeneric(){
		logger.info("#### MisProyectosController - consultarProyectosPMS ### \n");
		ServiceResponseResult response = gestionNoticiasService.consultarNoticia();
		if (response.getResult() instanceof Integer){
            return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
        }
		return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
	}
}
