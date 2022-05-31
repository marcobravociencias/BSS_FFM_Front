package com.mx.totalplay.ffm.cloudweb.utilerias.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.apache.tomcat.util.net.openssl.ciphers.Authentication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.mx.totalplay.ffm.cloudweb.plantainterna.controller.DespachoPIController;
import com.mx.totalplay.ffm.cloudweb.plantainterna.service.DespachoPIService;
import com.mx.totalplay.ffm.cloudweb.plantainterna.service.DisponibilidadService;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.LoginResult;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.Permiso;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.ServiceResponseResult;
import com.mx.totalplay.ffm.cloudweb.utilerias.service.AutentificacionService;

@RestController
@RequestMapping("/widthoutSesion")
public class ConfirmacionController {
	
	private static final Logger LOGGER = LogManager.getLogger(DespachoPIController.class);

    private DespachoPIService despachoService;
    private DisponibilidadService disponibilidadService;
    private AutentificacionService autenticacionService;
    private Gson gson = new Gson();
    
    @Autowired
    Environment env;
    
    @Autowired
    public ConfirmacionController(AutentificacionService autenticacionService, DespachoPIService despachoService, DisponibilidadService disponibilidadService) {
    	this.autenticacionService = autenticacionService;
    	this.despachoService = despachoService;
        this.disponibilidadService = disponibilidadService;
    }
    
    @PostMapping("obtenerToken")
    public ResponseEntity<?> obtenerToken(HttpSession session) {
        LOGGER.info("##### CONSULTANDO DETALLE OT DESPACHO");
        LoginResult response = autenticacionService.getAutentificacion("PIRESIDENCIAL","12345");
        LOGGER.info(gson.toJson(response));
        if (response.getMensaje() == null ) {
        	if (response.getModulos().size() != 0) {
        		session.setAttribute("token", response.getAccess_token());
        		session.setAttribute("direccionAmbiente", env.getProperty("dep.envirom.web"));
        	} else {
        		throw new BadCredentialsException("2");
        	}
        } else {
            throw new BadCredentialsException("1");
        }
        
        return new ResponseEntity<>(true, HttpStatus.ACCEPTED);
    }
	
	@PostMapping("consultarDetalleDespachoOT")
    public ResponseEntity<?> consultarDetalleDespachoOT(@RequestBody String params, HttpSession session) {
        LOGGER.info("##### CONSULTANDO DETALLE OT DESPACHO TOKEN");
        ServiceResponseResult response = despachoService.consultarDetalleOTPIToken(params, session.getAttribute("token").toString(),
        		session.getAttribute("direccionAmbiente").toString());
        if (response.getResult() instanceof Integer) {
            return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
    }
	
	@PostMapping("consultarCatalogoEstatusDespachoPI")
    public ResponseEntity<?> consultarCatalogoEstatusOrdenDespacho(HttpSession session) {
        LOGGER.info("##### CONSULTANDO CATALOGO ESTATUS DESPACHO PI");
        ServiceResponseResult response = despachoService.consultarCatalogoEstatusOrdenToken(session.getAttribute("token").toString(),
        		session.getAttribute("direccionAmbiente").toString());
        if (response.getResult() instanceof Integer) {
            return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
    }
	
	@PostMapping("/consultarDisponibilidad")
    public ResponseEntity<?> consultarDisponibilidad(@RequestBody String params, HttpSession session) {
		LOGGER.info("#### CONSULTANDO DISPONIBILIDAD ***consultarDisponibilidad: " + params);
        ServiceResponseResult response = disponibilidadService.consultarDisponibilidadToken(params, session.getAttribute("token").toString(),
        		session.getAttribute("direccionAmbiente").toString());
        if (response.getResult() instanceof Integer){
            return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
    }
	
	@PostMapping("/confirmaDesconfirmaOtDespacho")
    public ResponseEntity<?> confirmaDesconfirmaOtDespacho(@RequestBody String params, HttpSession session) {
		ServiceResponseResult response = despachoService.confirmaDesconfirmaOtDespachoToken(params, session.getAttribute("token").toString(),
				session.getAttribute("direccionAmbiente").toString());
        if (response.getResult() instanceof Integer) {
            return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
    }

}
