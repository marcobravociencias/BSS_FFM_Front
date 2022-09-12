package com.mx.totalplay.ffm.cloudweb.generic.controller;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mx.totalplay.ffm.cloudweb.generic.service.GestionModulosService;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.ServiceResponseResult;

@RestController
@RequestMapping("/req")
public class GestionModulosController {
	private  final Logger logger = LogManager.getLogger(GestionModulosController.class.getName());
	private final GestionModulosService gestionModulosService;
	
	@Autowired
    public GestionModulosController(GestionModulosService gestionModulosService) {
        this.gestionModulosService = gestionModulosService;
    }
	
	@PostMapping("/consultarPropietarios")
	public ResponseEntity<?> consultarPropietarios() {
		logger.info("##### CONSULTANDO PROPIETARIOS");
        ServiceResponseResult result = gestionModulosService.consultarPropietarios();
        if (result.getResult() instanceof Integer){
            return new ResponseEntity<>(result, HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(result, HttpStatus.ACCEPTED);
	}
	
	@PostMapping("/consultarUnidadesNegocio")
	public ResponseEntity<?> consultarUnidadesNegocio() {
		logger.info("##### CONSULTANDO UNIDADES DE NEGOCIO");
        ServiceResponseResult result = gestionModulosService.consultarUnidadesNegocio();
        if (result.getResult() instanceof Integer){
            return new ResponseEntity<>(result, HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(result, HttpStatus.ACCEPTED);
	}
	
	@PostMapping("/consultarModulosPermisos")
	public ResponseEntity<?> consultarUnidadesNegocio(@RequestBody String params) {
		logger.info("##### CONSULTANDO MODULOS Y PERMISOS");
        ServiceResponseResult result = gestionModulosService.consultarModulosPermisos(params);
        if (result.getResult() instanceof Integer){
            return new ResponseEntity<>(result, HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(result, HttpStatus.ACCEPTED);
	}
	
	@PostMapping("/guardarModuloPermiso")
	public ResponseEntity<?> guardarModuloPermiso(@RequestBody String params) {
		logger.info("##### REGISTRANDO NUEVO MODULO");
        ServiceResponseResult result = gestionModulosService.guardarModuloPermiso(params);
        if (result.getResult() instanceof Integer){
            return new ResponseEntity<>(result, HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(result, HttpStatus.ACCEPTED);
	}
	
	@PostMapping("/modificarModuloPermiso")
	public ResponseEntity<?> modificarModuloPermiso(@RequestBody String params) {
		logger.info("##### MODIFICANDO MODULO O PERMISO");
        ServiceResponseResult result = gestionModulosService.modificarModuloPermiso(params);
        if (result.getResult() instanceof Integer){
            return new ResponseEntity<>(result, HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(result, HttpStatus.ACCEPTED);
	}
	
	@PostMapping("/eliminarModuloPermiso")
	public ResponseEntity<?> eliminarModuloPermiso(@RequestBody String params) {
		logger.info("##### ELIMINANDO MODULO O PERMISO");
        ServiceResponseResult result = gestionModulosService.eliminarModuloPermiso(params);
        if (result.getResult() instanceof Integer){
            return new ResponseEntity<>(result, HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(result, HttpStatus.ACCEPTED);
	}
}
