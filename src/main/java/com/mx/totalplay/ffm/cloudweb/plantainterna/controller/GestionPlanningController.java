package com.mx.totalplay.ffm.cloudweb.plantainterna.controller;

import com.mx.totalplay.ffm.cloudweb.plantainterna.service.GestionPlanningService;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.ServiceResponseResult;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/req")
public class GestionPlanningController {

    private final Logger logger = LogManager.getLogger(GestionPlanningController.class.getName());
    private final GestionPlanningService gestionPlanningService;

    @Autowired
    public GestionPlanningController(GestionPlanningService gestionPlanningService) {
        this.gestionPlanningService = gestionPlanningService;
    }

    @PostMapping("/consultarPagosTecnico")
    public ResponseEntity<?> consultarPagosTecnico(@RequestBody String params) {
        logger.info("#### CONSULTANDO PAGOS TECNICO ***consultarPagosTecnico: " + params);
        ServiceResponseResult response = gestionPlanningService.consultarPagosTecnico(params);
        if (response.getResult() instanceof Integer){
            return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
    }

    @PostMapping("/liberarPagos")
    public ResponseEntity<?> liberarPagosTecnico(@RequestBody String params) {
        logger.info("####LIBERAR PAGOS TECNICO ***liberarPagosTecnico: " + params);
        ServiceResponseResult response = gestionPlanningService.liberarPagosTecnicos(params);
        if (response.getResult() instanceof Integer){
            return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
    }

    @PostMapping("/restaurarContrasena")
    public ResponseEntity<?> restaurarContraseniaUsuario(@RequestBody String params) {
        logger.info("####RESTAURAR CONTRASENIA USUARIOS ***restaurarContraseniaUsuario: " + params);
        ServiceResponseResult response = gestionPlanningService.restaurarContraseniaUsuario(params);
        if (response.getResult() instanceof Integer){
            return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
    }


    @PostMapping("/gestionGeocercas")
    public ResponseEntity<?> gestionGeocercasPlanning(@RequestBody String params) {
        logger.info("####GESTION GEOCERCAS ***gestionGeocercasPlanning: " + params);
        ServiceResponseResult response = gestionPlanningService.gestionGeocercasPlanning(params);
        if (response.getResult() instanceof Integer){
            return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
    }
    
    @PostMapping("/eliminarGeocerca")
    public ResponseEntity<?> eliminarGeocercaPlanning(@RequestBody String params) {
        logger.info("####GESTION GEOCERCAS ***eliminarGeocercaPlanning: " + params);
        ServiceResponseResult response = gestionPlanningService.eliminarGeocercaPlanning(params);
        if (response.getResult() instanceof Integer){
            return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
    }



}
