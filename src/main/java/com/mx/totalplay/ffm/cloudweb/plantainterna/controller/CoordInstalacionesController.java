package com.mx.totalplay.ffm.cloudweb.plantainterna.controller;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.mx.totalplay.ffm.cloudweb.plantainterna.service.CoordInstalacionesService;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.ServiceResponseResult;

@RestController
@RequestMapping("/req")
public class CoordInstalacionesController {
	private final CoordInstalacionesService coordInstalacionesService;
	private final Logger logger = LogManager.getLogger(CoordInstalacionesController.class.getName());
	private ServiceResponseResult result;
	private Gson gson = new Gson();
	
	
	@Autowired
	  public CoordInstalacionesController(CoordInstalacionesService coordInstalacionesService) {
	    this.coordInstalacionesService = coordInstalacionesService;
	  }
	
	@PostMapping("consultaBusquedaGeneral")
	public ResponseEntity<?> consultaBusquedaGeneral(@RequestBody String params){
		logger.info("###### CoordInstalacionesController: consultaBusquedaGeneral");
		ServiceResponseResult response=coordInstalacionesService.busquedaGral(params);
		if (response.getResult() instanceof Integer) {
            return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
        }
		return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
	}
}
