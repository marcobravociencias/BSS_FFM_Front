package com.totalplay.ffm.plantainterna.controller;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.totalplay.ffm.plantainterna.service.UsuariosPIService;
import com.totalplay.ffm.utilerias.model.LoginResult;
import com.totalplay.ffm.utilerias.model.ServiceResponseResult;


@RestController
@RequestMapping("/req")
public class UsuariosPIController {
	private  final Logger logger = LogManager.getLogger(DespachoPIController.class.getName());
	
	@Autowired
	UsuariosPIService usuarioService;
	
	//@Autowired
	//private UserSession usuario;
	
	@PostMapping("/consultarCompanias")
	public ServiceResponseResult consultarCompanias(@AuthenticationPrincipal LoginResult user) {
		logger.info("##### UsuariosPIController.class - method: consultarCompanias()");
		logger.info(new Gson().toJson(user));
		//usuario.setUsuario("Antonio");
		ServiceResponseResult response = usuarioService.consultarCompanias();
		return response;
	}
	
	@PostMapping("/consultarPuestos")
	public ServiceResponseResult consultarPuestos() {
		logger.info("##### UsuariosPIController.class - method: consultarPuestos()");
		ServiceResponseResult response = usuarioService.consultarPuestos();
		return response;
	}
	
	@PostMapping("/consultarRegionesEstructura")
	public ServiceResponseResult consultarRegionesEstructura() {
		logger.info("##### UsuariosPIController.class - method: consultarRegionesEstructura()");
		ServiceResponseResult response = usuarioService.consultarRegionesEstructura();
		return response;
	}

	@PostMapping("/consultarClasificacionUsuario")
	public ServiceResponseResult consultarClasificacionUsuario() {
		logger.info("##### UsuariosPIController.class - method: consultarClasificacionUsuario()");
		ServiceResponseResult response = usuarioService.consultarClasificacionUsuario();
		return response;
	}
	
	@PostMapping("/consultarIntervencionesPorPropietarios")
	public ServiceResponseResult consultarIntervencionesPorPropietarios(@RequestBody String params) {
		logger.info("##### UsuariosPIController.class - method: consultarIntervencionesPorPropietarios()");
		ServiceResponseResult response = usuarioService.consultarIntervencionesPorPropietarios(params);
		return response;
	}
	
	@PostMapping("/consultarArbolesCiudades")
	public ServiceResponseResult consultarArbolesCiudades() {
		logger.info("##### UsuariosPIController.class - method: consultarArbolesCiudades()");
		ServiceResponseResult response = usuarioService.consultarArbolesCiudades();
		return response;
	}
	
	@PostMapping("/consultarOperariosPorCiudad")
	public ServiceResponseResult consultarOperariosPorCiudad(@RequestBody String params) {
		logger.info("##### UsuariosPIController.class - method: consultarOperariosPorCiudad()");
		ServiceResponseResult response = usuarioService.consultarOperariosPorCiudad(params);
		return response;
	}
	
	@PostMapping("/consultarCiudadesEstructura")
	public ServiceResponseResult consultarCiudadesEstructura(@RequestBody String params) {
		logger.info("##### UsuariosPIController.class - method: consultarCiudadesEstructura() " + params);
		ServiceResponseResult response = usuarioService.consultarCiudadesEstructura(params);
		return response;
	}
	
	@PostMapping("/consultarUsuarios")
	public ServiceResponseResult consultarUsuarios(@RequestBody String params) {
		logger.info("##### UsuariosPIController.class - method: consultarUsuarios() " + params);
		//logger.info(new Gson().toJson(usuario));
		ServiceResponseResult response = usuarioService.consultarUsuarios(params);
		return response;
	}
	
	 @PostMapping("/consultarPrivilegios")
	 public ServiceResponseResult consultarPrivilegios(@RequestBody String params) {
		 logger.info("##### UsuariosPIController.class - method: consultarPrivilegios() " + params);
			ServiceResponseResult response = usuarioService.consultarPrivilegios(params);
		 return response;
	 }
	

}
