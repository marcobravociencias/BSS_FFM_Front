package com.mx.totalplay.ffm.cloudweb.plantainterna.controller;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.mx.totalplay.ffm.cloudweb.plantainterna.service.GestionTecnicosService;

@RestController
@RequestMapping("/req")
public class GestionTecnicosController {
	
	 private final Logger logger = LogManager.getLogger(GestionTecnicosController.class.getName());
	 private Gson gson = new Gson();
	 private final GestionTecnicosService gestionTecnicosService;
	 
	 public GestionTecnicosController (GestionTecnicosService gestionTecnicosService) {
		 this.gestionTecnicosService = gestionTecnicosService;
	 }

}
