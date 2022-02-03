package com.mx.totalplay.ffm.cloudweb.plantainterna.controller;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.mx.totalplay.ffm.cloudweb.plantainterna.service.VistaAuditoriaService;

@RestController
@RequestMapping("/req")
public class VistaAuditoriaController {
	
	 private final Logger logger = LogManager.getLogger(VistaAuditoriaController.class.getName());
	 private final VistaAuditoriaService vistaAuditoriaService;
	 private Gson gson = new Gson();
	 
	 public VistaAuditoriaController(VistaAuditoriaService vistaAuditoriaService) {
		 this.vistaAuditoriaService = vistaAuditoriaService;
	 }

}