package com.mx.totalplay.ffm.cloudweb.plantainterna.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.mx.totalplay.ffm.cloudweb.plantainterna.model.consultaOTPI.ParamConsultaOTPI;
import com.mx.totalplay.ffm.cloudweb.plantainterna.service.ConsultaOTService;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.DataTableResponse;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.ServiceResponseResult;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

@RestController
@RequestMapping("/req")
public class ConsultaOTController {

	
	private final Logger logger = LogManager.getLogger(ConsultaOTController.class.getName());

	@Autowired
	private ConsultaOTService consultaOTService;
	
	private ParamConsultaOTPI paramsOT;
	private ServiceResponseResult result;
	private DataTableResponse dataTableResponse;

	Gson gson = new Gson();

	@PostMapping("/consultaOT")
	public Object consultaOT(@ModelAttribute ParamConsultaOTPI params) {
		logger.info("*** Objeto: " + gson.toJson(params));
		//paramsOT = new Gson().fromJson(params, ParamConsultaOTPI.class);
		dataTableResponse = consultaOTService.consultaOT(params);
		return dataTableResponse;
	}
	
	@PostMapping("/consultaImagenesOt")
	public Object consultaImagenesOt(@RequestBody String params) {
		logger.info("*** Metodo consultaImagenesOt *** Objecto: " + params);
		result = consultaOTService.consultaImagenesOt(params);
		return result;
	}
	
	@PostMapping("/consultaInformacionDetalleOt")
	public Object consultaInformacionDetalleOt(@RequestBody String params) {
		logger.info("*** ConsultaOTController.class *** Metodo consultaInformacionDetalleOt *** Objecto: " + params);
		result = consultaOTService.consultaInformacionDetalleOt(params);
		return result;
	}
	
	@PostMapping("/consultaMaterialesOts")
	public Object consultaMaterialesOts(@RequestBody String params) {
		logger.info("*** ConsultaOTController.class *** Metodo consultaMaterialesOts *** Objecto: " + params);
		paramsOT = gson.fromJson(params, ParamConsultaOTPI.class);
		result = consultaOTService.consultaMaterialesOts(paramsOT);
		return result;
	}
	
	@PostMapping("/getComentariosIntegrador")
	public Object getComentariosIntegrador(@RequestBody String params) {
		logger.info("*** ConsultaOTController.class *** Metodo getComentariosIntegrador *** Objecto: " + params);
		result = consultaOTService.getComentariosIntegrador(params);
		return result;
	}
	
	@PostMapping("/historico")
	public Object historico(@RequestBody String params) {
		logger.info("*** ConsultaOTController.class *** Metodo historico *** Objecto: " + params);
		result = consultaOTService.historico(params);
		return result;
	}

	@PostMapping("/consultaActividadTecnico")
	public Object consultaActividadTecnico(@RequestBody String params) {
		logger.info("*** ConsultaOTController.class *** Metodo consultaActividadTecnico *** Objecto: " + params);
		result = consultaOTService.consultaActividadTecnico(params);
		return result;
	}
	
	@PostMapping("/consultaInfoTrayectoria")
	public Object consultaInfoTrayectoria(@RequestBody String params) {
		logger.info("*** ConsultaOTController.class *** Metodo consultaInfoTrayectoria *** Objecto: " + params);
		result = consultaOTService.consultaInfoTrayectoria(params);
		return result;
	}
	
	@PostMapping("/consultaInformacionRed")
	public Object consultaInformacionRed(@RequestBody String params) {
		logger.info("*** ConsultaOTController.class *** Metodo consultaInformacionRed *** Objecto: " + params);
		result = consultaOTService.consultaInformacionRed(params);
		return result;
	}
	
	@PostMapping("/consultaCambioEquipo")
	public Object consultaCambioEquipo(@RequestBody String params) {
		logger.info("*** ConsultaOTController.class *** Metodo consultaCambioEquipo *** Objecto: " + params);
		result = consultaOTService.consultaCambioEquipo(params);
		return result;
	}
}
