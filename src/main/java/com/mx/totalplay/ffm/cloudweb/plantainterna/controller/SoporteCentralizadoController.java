package com.mx.totalplay.ffm.cloudweb.plantainterna.controller;

import com.mx.totalplay.ffm.cloudweb.plantainterna.service.SoporteCentralizadoService;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.ServiceResponseResult;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/req")
public class SoporteCentralizadoController {
    private final Logger logger = LogManager.getLogger(SoporteCentralizadoController.class.getName());
    private final SoporteCentralizadoService soporteCentralizadoService;

    public SoporteCentralizadoController(SoporteCentralizadoService soporteCentralizadoService) {
        this.soporteCentralizadoService = soporteCentralizadoService;
    }

    @PostMapping("/consultaSeguimientoSoporte")
    public ResponseEntity<?> consultaSeguimientoSoporte(@RequestBody String params){
        logger.info("#### SEGUIMIENTO SOPORTE consultaSeguimientoSoporte ### \n" + params);
        ServiceResponseResult response = soporteCentralizadoService.consultaSeguimientoSoporte(params);
        if (response.getResult() instanceof Integer){
            return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
    }

    @PostMapping("/consultaTicketSoporte")
    public ResponseEntity<?> consultaTicketSoporte(@RequestBody String params){
        logger.info("#### SEGUIMIENTO SOPORTE consultaTicketSoporte ### \n" + params);
        ServiceResponseResult response = soporteCentralizadoService.consultaTicketSoporte(params);
        if (response.getResult() instanceof Integer){
            return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
    }

    @PostMapping("/consultaDetalleSoporte")
    public ResponseEntity<?> consultaDetalleSoporte(@RequestBody String params){
        logger.info("#### SEGUIMIENTO SOPORTE consultaDetalleSoporte ### \n" + params);
        ServiceResponseResult response = soporteCentralizadoService.consultaDetalleSoporte(params);
        if (response.getResult() instanceof Integer){
            return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
    }

}
