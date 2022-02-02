package com.mx.totalplay.ffm.cloudweb.plantainterna.controller;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.mx.totalplay.ffm.cloudweb.plantainterna.service.GestionTecnicosService;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.ServiceResponseResult;

@RestController
@RequestMapping("/req")
public class GestionTecnicosController {
	
	 private final Logger logger = LogManager.getLogger(GestionTecnicosController.class.getName());
	 private Gson gson = new Gson();
	 private final GestionTecnicosService gestionTecnicosService;
	 
	 public GestionTecnicosController (GestionTecnicosService gestionTecnicosService) {
		 this.gestionTecnicosService = gestionTecnicosService;
	 }
	 
	 @GetMapping("/consultaMotivosGestionTecnicos")
	 public ResponseEntity<?> consultaMotivosGestionTecnicos(){
		 logger.info("###### GestionTecnicosController - consultaMotivosGestionTecnicos");
		 ServiceResponseResult response = gestionTecnicosService.consultaMotivosGestionTecnicos();
		 if (response.getResult() instanceof Integer){
	            return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
	        }
	        return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
	 }
	 
	 @GetMapping("/consultaTecnicosGestionTecnicos")
	 public ResponseEntity<?> consultaTecnicosGestionTecnicos(@RequestBody String params){
		 logger.info("###### GestionTecnicosController - consultaTecnicosGestionTecnicos");
		 ServiceResponseResult response = gestionTecnicosService.consultaTecnicosGestionTecnicos(params);
		 if (response.getResult() instanceof Integer){
	            return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
	        }
	        return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
	 }
	 
	 @GetMapping("/consultaDisponibilidadTecGestionTecnicos")
	 public ResponseEntity<?> consultaDisponibilidadTecGestionTecnicos(@RequestBody String params){
		 logger.info("###### GestionTecnicosController - consultarDisponibilidadTecGestionTecnicos");
		 ServiceResponseResult response = gestionTecnicosService.consultaDisponibilidadTecGestionTecnicos(params);
		 if (response.getResult() instanceof Integer){
	            return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
	        }
	        return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
	 }
	 
	 @GetMapping("/consultaDisponibilidadAuxGestionTecnicos")
	 public ResponseEntity<?> consultaDisponibilidadAuxGestionTecnicos(@RequestBody String params){
		 logger.info("###### GestionTecnicosController - consultarDisponibilidadAuxGestionTecnicos");
		 ServiceResponseResult response = gestionTecnicosService.consultaDisponibilidadAuxGestionTecnicos(params);
		 if (response.getResult() instanceof Integer){
	            return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
	        }
	        return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
	 }

}
