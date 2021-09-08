package com.mx.totalplay.ffm.cloudweb.plantaexterna.controller;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mx.totalplay.ffm.cloudweb.plantaexterna.service.ConsultaOTPEService;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.ServiceResponseResult;


@RestController
@RequestMapping("/req")
public class ConsultaOTPEController {
	private final Logger logger = LogManager.getLogger(ConsultaOTPEController.class.getName());
	private ConsultaOTPEService consultaOTPEService;
	
	@Autowired
	public ConsultaOTPEController(ConsultaOTPEService consultaOTPEService) {
		this.consultaOTPEService = consultaOTPEService;
	}
	@PostMapping("/consultarOTInspector")
	public ResponseEntity<?> consultarOTInspector(@RequestBody String params) {
		ServiceResponseResult response = consultaOTPEService.consultaOTInspector(params);
		if (response.getResult() instanceof Integer) {
            return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
		
	}
	@PostMapping("/consultarOTMasivo")
	public ResponseEntity<?> consultarOTMasivo(@RequestBody String params){
		ServiceResponseResult response=consultaOTPEService.consultaOTMasivo(params);
		if(response.getResult() instanceof Integer) {
			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
	}
	@PostMapping("/consultarOTDiario")
	public ResponseEntity<?> consultarOTDiario(@RequestBody String params){
		ServiceResponseResult response=consultaOTPEService.consultaOTDiario(params);
		if(response.getResult() instanceof Integer) {
			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<>(response,HttpStatus.ACCEPTED);
	}
	@PostMapping("/consultarHistorico")
	public ResponseEntity<?> consultarHist(@RequestBody String params){
		ServiceResponseResult response=consultaOTPEService.consultarHistorico(params);
		if(response.getResult() instanceof Integer) {
			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
	}
	@PostMapping("/consultarMateriales")
	public ResponseEntity<?> consultarMat(@RequestBody String params){
		ServiceResponseResult response=consultaOTPEService.consultarMateriales(params);
		if(response.getResult() instanceof Integer) {
			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
	}
	@PostMapping("/consultarFallas")
	public ResponseEntity<?> consultarFalla(@RequestBody String params){
		ServiceResponseResult response=consultaOTPEService.consultarFallas(params);
		if(response.getResult() instanceof Integer) {
			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
	}
	@PostMapping("/consultarComentarios")
	public ResponseEntity<?> consultarComentarios(@RequestBody String params){
		ServiceResponseResult response=consultaOTPEService.consultarComentarios(params);
		if(response.getResult() instanceof Integer) {
			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
	}
	
	@PostMapping("/consultarImagenes")
	public ResponseEntity<?> consultarImagenes(@RequestBody String params){
		ServiceResponseResult response=consultaOTPEService.consultarImagenes(params);
		if(response.getResult() instanceof Integer) {
			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
	}
}
