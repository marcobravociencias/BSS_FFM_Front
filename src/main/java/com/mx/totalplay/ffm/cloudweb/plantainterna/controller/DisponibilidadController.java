package com.mx.totalplay.ffm.cloudweb.plantainterna.controller;

import com.mx.totalplay.ffm.cloudweb.plantainterna.service.DisponibilidadService;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.ServiceResponseResult;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/req")
public class DisponibilidadController {

    private final Logger logger = LogManager.getLogger(DisponibilidadController.class.getName());
    private final DisponibilidadService disponibilidadService;

    @Autowired
    public DisponibilidadController(DisponibilidadService disponibilidadService) {
        this.disponibilidadService = disponibilidadService;
    }

    @PostMapping("/insertarDisponibilidad")
    public ResponseEntity<?> insertarDisponibilidad(@RequestBody String params) {
        logger.info("#### AGREGANDO DISPONIBILIDAD ###");
        ServiceResponseResult response = disponibilidadService.insertarDisponibilidad(params);
        if (response.getResult() instanceof Integer){
            return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
    }

    @PostMapping("/consultarDisponibilidad")
    public ResponseEntity<?> consultarDisponibilidad(@RequestBody String params) {
        logger.info("#### CONSULTANDO DISPONIBILIDAD ***consultarDisponibilidad: " + params);
        ServiceResponseResult response = disponibilidadService.consultarDisponibilidad(params);
        if (response.getResult() instanceof Integer){
            return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
    }

    @PostMapping("/actualizarDisponibilidad")
    public ResponseEntity<?> actualizarDisponibilidad(@RequestBody String params) {
        logger.info("#### ACTUALIZANDO DISPONIBILIDAD ###");
        ServiceResponseResult response = disponibilidadService.actualizarDisponibilidad(params);
        if (response.getResult() instanceof Integer){
            return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
    }
}
