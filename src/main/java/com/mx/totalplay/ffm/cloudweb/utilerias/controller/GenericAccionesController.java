package com.mx.totalplay.ffm.cloudweb.utilerias.controller;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mx.totalplay.ffm.cloudweb.utilerias.model.ServiceResponseResult;
import com.mx.totalplay.ffm.cloudweb.utilerias.service.GenericAccionesService;

@RestController
@RequestMapping("/req")
public class GenericAccionesController {
	
	private final Logger logger = LogManager.getLogger(GenericAccionesController.class.getName());
	
	@Autowired
    private GenericAccionesService genericAccionesService;
	 /**
    @Autowired
   public GenericAccionesController(GenericAccionesService genericAccionesService) {
        this.genericAccionesService = genericAccionesService;
    }**/
	
	@PostMapping("/creacionOrdenTrabajoGeneric")
	public ResponseEntity<?> creacionOrdenTrabajoGeneric(@RequestBody String params) {
		logger.info("##### CONSULTANDO creacionOrdenTrabajoGeneric");
		
		ServiceResponseResult response = genericAccionesService.creacionOrdenTrabajoGeneric(params);
		if (response.getResult() instanceof Integer){
			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
	}
}