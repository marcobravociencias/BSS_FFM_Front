package com.mx.totalplay.ffm.cloudweb.plantainterna.controller;

import com.google.gson.Gson;
import com.mx.totalplay.ffm.cloudweb.plantainterna.service.CambioStatusService;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.ServiceResponseResult;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/req")
public class CambioStatusController { 
    private final Logger logger = LogManager.getLogger(CambioStatusController.class.getName());
    private Gson gson = new Gson();
    private final CambioStatusService cambioStatusService;

    public CambioStatusController(CambioStatusService cambioStatusService) {
        this.cambioStatusService = cambioStatusService;
    }

    @PostMapping("/cambioStatusOts")
    public ResponseEntity<?> cambioStatusOts(@RequestBody String params){
        logger.info("#### CAMBIO DE ESTATUS ### \n" + params);
        ServiceResponseResult response = cambioStatusService.cambioStatusOts(params);
        if (response.getResult() instanceof Integer){
            return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
    }
    
    
    @PostMapping("/cambioStatusOtsGeneric")
    public ResponseEntity<?> cambioStatusOtsAlertasGeneric(@RequestBody String params){
        logger.info("#### CAMBIO DE ESTATUS ### \n" + params);
        ServiceResponseResult response = cambioStatusService.cambioStatusOtsAlertasGeneric(params);
        if (response.getResult() instanceof Integer){
            return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
    }
    
    
}
