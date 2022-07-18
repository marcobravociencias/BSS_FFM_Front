package com.mx.totalplay.ffm.cloudweb.utilerias.controller;


import javax.servlet.http.HttpServletRequest;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mx.totalplay.ffm.cloudweb.plantainterna.model.consultaOTPI.ParamConsultaOTPI;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.DataTableResponse;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.ServiceResponseResult;
import com.mx.totalplay.ffm.cloudweb.utilerias.service.GenericAccionesService;

@RestController
@RequestMapping("/req")
public class GenericAccionesController {
	
	private final Logger logger = LogManager.getLogger(GenericAccionesController.class.getName());
	private DataTableResponse dataTableResponse;

	@Autowired
    private GenericAccionesService genericAccionesService;
	 /**
    @Autowired
   public GenericAccionesController(GenericAccionesService genericAccionesService) {
        this.genericAccionesService = genericAccionesService;
    }**/
	
	@PostMapping("/creacionOrdenTrabajoGeneric")
	public ResponseEntity<?> creacionOrdenTrabajoGeneric(@RequestBody String params) {
		logger.info("##### CONSULTANDO creacionOrdenTrabajoGeneric");
		
		ServiceResponseResult response = genericAccionesService.creacionOrdenTrabajoGeneric(params);
		if (response.getResult() instanceof Integer){
			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
	}

	@PostMapping("/agregarMensajeAccionSession")
	public ResponseEntity<?> agregarMensajeAccionSession(@RequestBody String params){
		logger.info("##### CONSULTANDO agregarMensajeAccionSession");

		ServiceResponseResult response = genericAccionesService.agregarMensajeAccionSession(params);
		if (response.getResult() instanceof Integer){
			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
	}

	@PostMapping("/consultarAccionesRecientesSession")
	public ResponseEntity<?> consultarAccionesRecientesSession(@RequestBody String params){
		logger.info("##### CONSULTANDO consultarAccionesRecientesSession");

		ServiceResponseResult response = genericAccionesService.consultarAccionesRecientesSession(params);
		if (response.getResult() instanceof Integer){
			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
	}
	
	@PostMapping("/generarSesionJerarquia")
	public ResponseEntity<?> generarSesionJerarquia(@RequestBody String params){
		logger.info("##### CONSULTANDO generarSesionJerarquia");

		ServiceResponseResult response = genericAccionesService.getAutentificacionJerarquia(params);
		if (response.getResult() instanceof Integer){
			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
	}
	
	@PostMapping("/consultarAccionesRealizadasService")
	public ResponseEntity<?> consultarAccionesRealizadasService(@RequestBody String params){
		logger.info("##### CONSULTANDO consultarAccionesRealizadasService " + params);
		ServiceResponseResult response = genericAccionesService.consultarAccionesRecientesService(params);
		if (response.getResult() instanceof Integer){
			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
	}
	
	@PostMapping("/registrarAccionesRealizadasService")
	public ResponseEntity<?> registrarAccionesRealizadasService(@RequestBody String params,  HttpServletRequest request){
		logger.info("##### CONSULTANDO registrarAccionesRealizadasService");
		ServiceResponseResult response = genericAccionesService.agregarMensajeAccionService(params, request);
		if (response.getResult() instanceof Integer){
			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
	}
	
	@PostMapping("/consultarReporteLogGeneral")
	public ResponseEntity<?> consultarReporteLogGeneral(@RequestBody String params){
		logger.info("##### CONSULTANDO consultarReporteLogGeneral");
		ServiceResponseResult response = genericAccionesService.consultarReporteLogGeneral(params);
		if (response.getResult() instanceof Integer){
			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
	}
	
	@PostMapping("/consultarLogGeneral")
	public ResponseEntity<DataTableResponse> consultarLogGeneral(@ModelAttribute ParamConsultaOTPI params) {
		logger.info("##### CONSULTANDO consultarLogGeneral");
		dataTableResponse = genericAccionesService.consultarLogGeneral(params);
		if (dataTableResponse.getResult() instanceof Integer){
			return new ResponseEntity<DataTableResponse>(dataTableResponse, HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<DataTableResponse>(dataTableResponse, HttpStatus.ACCEPTED);
	}
}
