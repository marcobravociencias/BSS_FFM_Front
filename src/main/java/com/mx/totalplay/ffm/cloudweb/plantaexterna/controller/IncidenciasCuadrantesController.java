package com.mx.totalplay.ffm.cloudweb.plantaexterna.controller;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.mx.totalplay.ffm.cloudweb.plantaexterna.service.IncidenciasCuadrantesService;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.DataTableResponse;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.ServiceResponseResult;

@RestController
@RequestMapping("/req")
public class IncidenciasCuadrantesController {
	
	private final Logger logger = LogManager.getLogger(IncidenciasCuadrantesController.class.getName());
	private final IncidenciasCuadrantesService incidenciasCuadrantesService;
	private ServiceResponseResult result;
	private DataTableResponse dataTableResponse;
	private Gson gson = new Gson();
	
	@Autowired
	public IncidenciasCuadrantesController(IncidenciasCuadrantesService incidenciasCuadrantesService) {
		this.incidenciasCuadrantesService = incidenciasCuadrantesService;
	}

}
