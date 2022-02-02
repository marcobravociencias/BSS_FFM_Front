package com.mx.totalplay.ffm.cloudweb.plantainterna.controller;

import com.mx.totalplay.ffm.cloudweb.plantainterna.service.VistaChecklistService;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.ServiceResponseResult;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/req")
public class VistaChecklistController {

    private final Logger logger = LogManager.getLogger(GestionPlanningController.class.getName());
    private final VistaChecklistService vistaChecklistService;

    @Autowired
    public VistaChecklistController( VistaChecklistService vistaChecklistService) {
        this.vistaChecklistService = vistaChecklistService;
    }

    @PostMapping("/consultarEvidencias")
    public ResponseEntity<?> consultarEvidencias(@RequestBody String params) {
        logger.info("#### CONSULTANDO EVIDENCIAS ***consultarEvidencias: " + params);
        ServiceResponseResult response = vistaChecklistService.consultaEvidenciasChecklist(params);
        if (response.getResult() instanceof Integer){
            return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
    }

    @PostMapping("/consultarDetalleEvidencia")
    public ResponseEntity<?> consultarDetalleEvidencia(@RequestBody String params) {
        logger.info("####CONSULTANDO DETALLE EVIDENCIA ***consultarDetalleEvidencia: " + params);
        ServiceResponseResult response = vistaChecklistService.consultaDetalleEvidenciaChecklist(params);
        if (response.getResult() instanceof Integer){
            return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
    }

    @PostMapping("/guardarEvidencia")
    public ResponseEntity<?> guardarEvidencia(@RequestBody String params) {
        logger.info("####CONSULTANDO DETALLE EVIDENCIA ***guardarEvidencia: " + params);
        ServiceResponseResult response = vistaChecklistService.guardarEvidenciaChecklist(params);
        if (response.getResult() instanceof Integer){
            return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
    }

}
