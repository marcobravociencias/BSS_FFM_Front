package com.mx.totalplay.ffm.cloudweb.plantainterna.controller;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.mx.totalplay.ffm.cloudweb.plantainterna.model.usuario.ObjConsultaUsuario;
import com.mx.totalplay.ffm.cloudweb.plantainterna.service.SkillsAdminService;
import com.mx.totalplay.ffm.cloudweb.plantainterna.service.UsuariosPIService;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.DataTableResponse;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.ServiceResponseResult;

@RestController
@RequestMapping("/req")
public class UsuariosPIController {
	private  final Logger logger = LogManager.getLogger(UsuariosPIController.class.getName());
	private final UsuariosPIService usuarioService;
	
	@Autowired
    public UsuariosPIController(UsuariosPIService usuarioService) {
        this.usuarioService = usuarioService;
    }
	
	@GetMapping("/consultaCompanias")
	public ResponseEntity<?> consultaCompanias() {
		logger.info("##### CONSULTANDO COMPANIAS");
        ServiceResponseResult result = usuarioService.consultaCompanias();
        if (result.getResult() instanceof Integer){
            return new ResponseEntity<>(result, HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(result, HttpStatus.ACCEPTED);
	}
	
	@GetMapping("/consultaPuestos")
	public ResponseEntity<?> consultaPuestos() {
		logger.info("##### CONSULTANDO PUESTOS");
		ServiceResponseResult result = usuarioService.consultaPuestos();
        if (result.getResult() instanceof Integer){
            return new ResponseEntity<>(result, HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(result, HttpStatus.ACCEPTED);		
	}
	
	@GetMapping("/consultaPermisos")
	public ResponseEntity<?> consultaPermisos() {
		logger.info("##### CONSULTANDO PERMISOS");
		ServiceResponseResult result = usuarioService.consultaPermisos();
        if (result.getResult() instanceof Integer){
            return new ResponseEntity<>(result, HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(result, HttpStatus.ACCEPTED);
	}
	
	@PostMapping("/consultaUsuarioPorId")
	public ResponseEntity<?> consultaUsuarioPorId(@RequestBody String params) {
		logger.info("##### CONSULTANDO USUARIO POR ID");
		ServiceResponseResult result = usuarioService.consultaUsuarioPorId(params);
        if (result.getResult() instanceof Integer){
            return new ResponseEntity<>(result, HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(result, HttpStatus.ACCEPTED);
	}
	
	@PostMapping("/consultaUsuariosPorGeoCompPuestos")
	public ResponseEntity<DataTableResponse> consultaUsuariosPorGeoCompPuestos(@ModelAttribute ObjConsultaUsuario params) {
		logger.info("##### CONSULTANDO USUARIOS POR GEOGRAFÍA - COMPANIAS - PUESTOS");
		Gson gson = new Gson();
		logger.info("*** Objeto: " + gson.toJson(params));
		DataTableResponse dataTableResponse = usuarioService.consultaUsuariosPorGeoCompPuestos(params);
		if (dataTableResponse.getResult() instanceof Integer){
			return new ResponseEntity<DataTableResponse>(dataTableResponse, HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<DataTableResponse>(dataTableResponse, HttpStatus.ACCEPTED);
	}
	
	@PostMapping("/consultaGeografias")
    public ResponseEntity<?> consultaGeografias() {
		logger.info("##### CONSULTANDO GEOGRAFÍAS");
        ServiceResponseResult response = usuarioService.consultaGeografias();
        if (response.getResult() instanceof Integer){
            return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
    }
	
	@PostMapping("/consultarRegionesEstructura")
	public ResponseEntity<?> consultarRegionesEstructura() {
		logger.info("##### CONSULTANDO consultarRegionesEstructura  ");
		//ServiceResponseResult response = ordenesUniversalesService.consultarCatalogoOrdenesUniversales(params);
		ServiceResponseResult response = null;
		
		/*
		if (response.getResult() instanceof Integer){
			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
		}
		*/
		return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
	}
	
	@PostMapping("/consultarCiudadesEstructura")
	public ResponseEntity<?> consultarCiudadesEstructura() {
		logger.info("##### CONSULTANDO consultarCiudadesEstructura  ");
		//ServiceResponseResult response = ordenesUniversalesService.consultarCatalogoOrdenesUniversales(params);
		ServiceResponseResult response = null;
		
		/*
		if (response.getResult() instanceof Integer){
			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
		}
		*/
		return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
	}
	
	@PostMapping("/consultarArbolesCiudades")
	public ResponseEntity<?> consultarArbolesCiudades() {
		logger.info("##### CONSULTANDO consultarArbolesCiudades  ");
		//ServiceResponseResult response = ordenesUniversalesService.consultarCatalogoOrdenesUniversales(params);
		ServiceResponseResult response = null;
		
		/*
		if (response.getResult() instanceof Integer){
			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
		}
		*/
		return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
	}
	
	@PostMapping("/consultarClasificacionUsuario")
	public ResponseEntity<?> consultarClasificacionUsuario() {
		logger.info("##### CONSULTANDO consultarClasificacionUsuario  ");
		//ServiceResponseResult response = ordenesUniversalesService.consultarCatalogoOrdenesUniversales(params);
		ServiceResponseResult response = null;
		
		/*
		if (response.getResult() instanceof Integer){
			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
		}
		*/
		return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
	}
	
	@PostMapping("/consultarOperariosPorCiudad")
	public ResponseEntity<?> consultarOperariosPorCiudad() {
		logger.info("##### CONSULTANDO consultarOperariosPorCiudad  ");
		//ServiceResponseResult response = ordenesUniversalesService.consultarCatalogoOrdenesUniversales(params);
		ServiceResponseResult response = null;
		
		/*
		if (response.getResult() instanceof Integer){
			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
		}
		*/
		return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
	}
	
	@PostMapping("/consultarIntervencionesPorPropietarios")
	public ResponseEntity<?> consultarIntervencionesPorPropietarios() {
		logger.info("##### CONSULTANDO consultarIntervencionesPorPropietarios  ");
		//ServiceResponseResult response = ordenesUniversalesService.consultarCatalogoOrdenesUniversales(params);
		ServiceResponseResult response = null;
		
		/*
		if (response.getResult() instanceof Integer){
			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
		}
		*/
		return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
	}
	
	@PostMapping("/consultarUsuarios")
	public ResponseEntity<?> consultarUsuarios() {
		logger.info("##### CONSULTANDO consultarUsuarios  ");
		//ServiceResponseResult response = ordenesUniversalesService.consultarCatalogoOrdenesUniversales(params);
		ServiceResponseResult response = null;
		
		/*
		if (response.getResult() instanceof Integer){
			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
		}
		*/
		return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
	}
	
}
