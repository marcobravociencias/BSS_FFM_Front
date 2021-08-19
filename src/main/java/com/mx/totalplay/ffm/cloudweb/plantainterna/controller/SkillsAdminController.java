package com.mx.totalplay.ffm.cloudweb.plantainterna.controller;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.mx.totalplay.ffm.cloudweb.plantainterna.service.DespachoPIService;
import com.mx.totalplay.ffm.cloudweb.plantainterna.service.SkillsAdminService;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.ServiceResponseResult;

@RestController
@RequestMapping("/req")
public class SkillsAdminController {
    private final Logger logger = LogManager.getLogger(SkillsAdminController.class.getName());
    private final SkillsAdminService skillsAdmin;
    private Gson gson = new Gson();

    @Autowired
    public SkillsAdminController(SkillsAdminService skillsAdmin) {
        this.skillsAdmin = skillsAdmin;
    }

    @PostMapping("/consultarBusquedaSkills")
    public ResponseEntity<?> consultarBusquedaSkills(@RequestBody String params) {
        logger.info("*** Objeto: " + params);
        ServiceResponseResult result = skillsAdmin.busqueda(params);
        if (result.getResult() instanceof Integer){
            return new ResponseEntity<>(result, HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(result, HttpStatus.ACCEPTED);
    }

    @PatchMapping("/guardarSkillsTecn")
    public ResponseEntity<?> guardarSkills(@RequestBody String params) {
        logger.info("######## GUARDAR SKILLS");
        ServiceResponseResult response = skillsAdmin.guardarSkills(params);
        if (response.getResult() instanceof Integer){
            return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
    }
    
    @PutMapping("/guardarSkillsMultipleTecnicos")
    public ResponseEntity<?> guardarSkillsMultipleTecnicos(@RequestBody String params) {
        logger.info("######## GUARDAR SKILLS MÚLTIPLES TÉCNICOS");
        ServiceResponseResult response = skillsAdmin.guardarSkillsMultiple(params);
        if (response.getResult() instanceof Integer){
            return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
    }

    @PostMapping("/consultarArbolesCiudadesS")
    public ResponseEntity<?> consultarArbolesCiudades() {
        logger.info("##### SkillsAdminController.class - method: consultarArbolesCiudades()");
        ServiceResponseResult response = skillsAdmin.consultarArbolesCiudades();
        if (response.getResult() instanceof Integer){
            return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
    }

    @PostMapping("/consultaCatalogoGeografiaGeneralDespacho")
    public ResponseEntity<?> consultarCatalogoSkills() {
        logger.info("##### CONSULTANDO CATALGOS");
        ServiceResponseResult response = skillsAdmin.consultarCatalogoGeografiaGeneral();
        if (response.getResult() instanceof Integer){
            return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
    }
}
