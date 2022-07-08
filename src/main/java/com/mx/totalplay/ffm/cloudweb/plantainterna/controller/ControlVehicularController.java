package com.mx.totalplay.ffm.cloudweb.plantainterna.controller;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.mx.totalplay.ffm.cloudweb.plantainterna.service.ControlVehicularService;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.ServiceResponseResult;

@RestController
@RequestMapping("/req")
public class ControlVehicularController {
	private final Logger logger = LogManager.getLogger(ControlVehicularController.class.getName());
	private final ControlVehicularService controlVehicularService;

	@Autowired
	public ControlVehicularController(ControlVehicularService controlVehicularService) {
		this.controlVehicularService = controlVehicularService;
	}

	@GetMapping("/consultarMarcas")
	public ResponseEntity<?> consultarMarcas() {
		logger.info("##### CONSULTANDO consultarMarcas");
		ServiceResponseResult response = controlVehicularService.consultarMarcas();
		if (response.getResult() instanceof Integer){
			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
	}

	@GetMapping("/consultarColores")
	public ResponseEntity<?> consultarColores() {
		logger.info("##### CONSULTANDO consultarColores");
		ServiceResponseResult response = controlVehicularService.consultarColores();
		if (response.getResult() instanceof Integer){
			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
	}

	@GetMapping("/consultarSeguros")
	public ResponseEntity<?> consultarSeguros() {
		logger.info("##### CONSULTANDO consultarSeguros");
		ServiceResponseResult response = controlVehicularService.consultarSeguros();
		if (response.getResult() instanceof Integer){
			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
	}

	@GetMapping("/consultarEstatus")
	public ResponseEntity<?> consultarEstatus() {
		logger.info("##### CONSULTANDO consultarEstatus");
		ServiceResponseResult response = controlVehicularService.consultarEstatus();
		if (response.getResult() instanceof Integer){
			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
	}
	
	@GetMapping("/consultarOperaciones")
	public ResponseEntity<?> consultarOperaciones() {
		logger.info("##### CONSULTANDO consultarOperaciones");
		ServiceResponseResult response = controlVehicularService.consultarOperaciones();
		if (response.getResult() instanceof Integer){
			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
	}
	
	@GetMapping("/consultarTipoCuadrilla")
	public ResponseEntity<?> consultarTipoCuadrilla() {
		logger.info("##### CONSULTANDO consultarTipoCuadrilla");
		ServiceResponseResult response = controlVehicularService.consultarTipoCuadrilla();
		if (response.getResult() instanceof Integer){
			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
	}
	
	@GetMapping("/consultarEmpresas")
	public ResponseEntity<?> consultarEmpresas() {
		logger.info("##### CONSULTANDO consultarEmpresas");
		ServiceResponseResult response = controlVehicularService.consultarEmpresas();
		if (response.getResult() instanceof Integer){
			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
	}
	
	@GetMapping("/consultarCentroCostos")
	public ResponseEntity<?> consultarCentroCostos() {
		logger.info("##### CONSULTANDO consultarCentroCostos");
		ServiceResponseResult response = controlVehicularService.consultarCentroCostos();
		if (response.getResult() instanceof Integer){
			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
	}
	
	
	@PostMapping("/crearVehiculo")
    public ResponseEntity<?> crearVehiculo(@RequestBody String params){
        logger.info("#### CONSULTANDO crearVehiculo");
        ServiceResponseResult response = controlVehicularService.crearVehiculo(params);
        if (response.getResult() instanceof Integer) {
            return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
    }

	@PostMapping("/consultarVehiculoPlaca")
	public ResponseEntity<?> consultarVehiculoPlaca(@RequestBody String params) {
		logger.info("#### Metodo consultarVehiculoPlaca: " + params);
		ServiceResponseResult response = controlVehicularService.consultarVehiculoPlaca(params);
		if (response.getResult() instanceof Integer){
			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
	}

	@PostMapping("/consultarVehiculoUnico")
	public ResponseEntity<?> consultarVehiculoUnico(@RequestBody String params) {
		logger.info("#### Metodo consultarVehiculoUnico: " + params);
		ServiceResponseResult response = controlVehicularService.consultarVehiculoUnico(params);
		if (response.getResult() instanceof Integer){
			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
	}

	@PostMapping("/consultarVehiculos") 
	public ResponseEntity<?> consultarVehiculos(@RequestBody String params) {
		logger.info("##### CONSULTANDO consultarVehiculos:" + params);
		ServiceResponseResult response = controlVehicularService.consultarVehiculos(params);
		if (response.getResult() instanceof Integer){
			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
	}

	@PostMapping("/editarVehiculo")
	public ResponseEntity<?> editarVehiculo(@RequestBody String params) {
		logger.info("#### Metodo editarVehiculo: " + params);
		ServiceResponseResult response = controlVehicularService.editarVehiculo(params);
		if (response.getResult() instanceof Integer){
			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
	}
	
	@PostMapping("/consultarEncierros")
	public ResponseEntity<?> consultarEncierros(@RequestBody String params) {
		logger.info("#### Metodo consultarEncierros: " + params);
		ServiceResponseResult response = controlVehicularService.consultarEncierros(params);
		if (response.getResult() instanceof Integer){
			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
	}

	@PostMapping("/consultarHistorialVehiculo")
	public ResponseEntity<?> consultarHistorialVehiculo(@RequestBody String params) {
		logger.info("#### Metodo consultarHistorialVehiculo: " + params);
		ServiceResponseResult response = controlVehicularService.consultarHistorialVehiculo(params);
		if (response.getResult() instanceof Integer){
			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
	}

	@PostMapping("/eliminarVehiculo")
	public ResponseEntity<?> eliminarVehiculo(@RequestBody String params) {
		logger.info("#### Metodo eliminarVehiculo: " + params);
		ServiceResponseResult response = controlVehicularService.eliminarVehiculo(params);
		if (response.getResult() instanceof Integer){
			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
	}
}
