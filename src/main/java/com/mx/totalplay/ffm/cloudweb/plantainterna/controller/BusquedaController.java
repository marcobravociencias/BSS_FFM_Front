package com.mx.totalplay.ffm.cloudweb.plantainterna.controller;

import com.mx.totalplay.ffm.cloudweb.plantainterna.service.BusquedaService;
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
public class BusquedaController {
    private final Logger logger = LogManager.getLogger(BusquedaController.class.getName());
    private final BusquedaService busquedaService;

    public BusquedaController(BusquedaService busquedaService) {
        this.busquedaService = busquedaService;
    }

    @PostMapping("/busquedaGeneralSF")
    public ResponseEntity<?> busquedaGeneralSF(@RequestBody String params){
        logger.info("#### BUSQUEDA GENERAL SALEFORCES ### \n" + params);
        ServiceResponseResult response = busquedaService.busquedaGeneralSF(params);
        if (response.getResult() instanceof Integer){
            return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
    }

    @PostMapping("/consultarDetalleObjectSF")
    public ResponseEntity<?> consultarDetalleObjectSF(@RequestBody String params){
        logger.info("#### CONSULTA DETALLE OBJETO SF ### \n" + params);
        ServiceResponseResult response = busquedaService.consultarDetalleObjectSF(params);
        if (response.getResult() instanceof Integer){
            return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
    }
}
