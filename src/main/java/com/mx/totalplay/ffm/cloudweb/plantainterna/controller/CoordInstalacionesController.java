package com.mx.totalplay.ffm.cloudweb.plantainterna.controller;

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

import com.google.gson.Gson;
import com.mx.totalplay.ffm.cloudweb.plantainterna.model.CoordInstalacionesPI.ParamFFMCoordInstalacionesVO;
import com.mx.totalplay.ffm.cloudweb.plantainterna.model.consultaOTPI.ParamConsultaOTPI;
import com.mx.totalplay.ffm.cloudweb.plantainterna.service.CoordInstalacionesService;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.DataTableResponse;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.ServiceResponseResult;

@RestController
@RequestMapping("/req")
public class CoordInstalacionesController {
	private final CoordInstalacionesService coordInstalacionesService;
	private final Logger logger = LogManager.getLogger(CoordInstalacionesController.class.getName());
	private ServiceResponseResult result;
	private Gson gson = new Gson();
	private ParamConsultaOTPI paramsOT;
	private DataTableResponse dataTableResponse;
	
	@Autowired
	  public CoordInstalacionesController(CoordInstalacionesService coordInstalacionesService) {
	    this.coordInstalacionesService = coordInstalacionesService;
	  }
	
	@PostMapping("/consultarBandejaFFM")
	public ResponseEntity<DataTableResponse> consultarBandejaFFM(@ModelAttribute ParamFFMCoordInstalacionesVO params) {
		logger.info("*** Objeto: " + gson.toJson(params));
		dataTableResponse = coordInstalacionesService.consultarBandejaFFM(params);
		if (dataTableResponse.getResult() instanceof Integer){
			return new ResponseEntity<DataTableResponse>(dataTableResponse, HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<DataTableResponse>(dataTableResponse, HttpStatus.ACCEPTED);
	}
	
	@PostMapping("consultaBusquedaGeneral")
	public ResponseEntity<?> consultaBusquedaGeneral(@RequestBody String params){
		logger.info("###### CoordInstalacionesController: consultaBusquedaGeneral");
		ServiceResponseResult response=coordInstalacionesService.busquedaGral(params);
		if (response.getResult() instanceof Integer) {
            return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
        }
		return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
	}
	
	@PostMapping("consultaPendienteAgenda")
	public ResponseEntity<DataTableResponse> consultaPendienteAgenda(@ModelAttribute ParamConsultaOTPI params){
		logger.info("###### CoordInstalacionesController: consultaPendienteAgenda");
		dataTableResponse=coordInstalacionesService.consultaPendientesAgenda(params);
		if (dataTableResponse.getResult() instanceof Integer) {
            return new ResponseEntity<>(dataTableResponse, HttpStatus.FORBIDDEN);
        }
		return new ResponseEntity<>(dataTableResponse, HttpStatus.ACCEPTED);
	}
	@PostMapping("consultaRescataventas")
	public ResponseEntity<DataTableResponse> consultarRescataVentas(@ModelAttribute ParamConsultaOTPI params){
		logger.info("###### CoordInstalacionesController: consultarRescataVentas");
		dataTableResponse=coordInstalacionesService.consultaRescataventas(params);
		if (dataTableResponse.getResult() instanceof Integer) {
            return new ResponseEntity<>(dataTableResponse, HttpStatus.FORBIDDEN);
        }
		return new ResponseEntity<>(dataTableResponse, HttpStatus.ACCEPTED);
	}
	@PostMapping("consultaPendientesActivar")
	public ResponseEntity<DataTableResponse> consultarPendientesActivar(@ModelAttribute ParamConsultaOTPI params){
		logger.info("###### CoordInstalacionesController: consultarRescataVentas");
		dataTableResponse=coordInstalacionesService.consultaPendientesActivar(params);
		if (dataTableResponse.getResult() instanceof Integer) {
            return new ResponseEntity<>(dataTableResponse, HttpStatus.FORBIDDEN);
        }
		return new ResponseEntity<>(dataTableResponse, HttpStatus.ACCEPTED);
	}
	@PostMapping("consultaCalendarizado")
	public ResponseEntity<DataTableResponse> consultarCalendarizado(@ModelAttribute ParamConsultaOTPI params){
		logger.info("###### CoordInstalacionesController: consultaCalendarizado");
		dataTableResponse=coordInstalacionesService.consultaCandelarizado(params);
		if (dataTableResponse.getResult() instanceof Integer) {
            return new ResponseEntity<>(dataTableResponse, HttpStatus.FORBIDDEN);
        }
		return new ResponseEntity<>(dataTableResponse, HttpStatus.ACCEPTED);
	}
	@PostMapping("consultaPlazasComerciales")
	public ResponseEntity<DataTableResponse> consultaPlazasComerciales(@ModelAttribute ParamConsultaOTPI params){
		logger.info("###### CoordInstalacionesController: consultaPlazasComerciales");
		dataTableResponse=coordInstalacionesService.consultaPlazasComerciales(params);
		if (dataTableResponse.getResult() instanceof Integer) {
            return new ResponseEntity<>(dataTableResponse, HttpStatus.FORBIDDEN);
        }
		return new ResponseEntity<>(dataTableResponse, HttpStatus.ACCEPTED);
	}
	@PostMapping("consultaCanceladas")
	public ResponseEntity<DataTableResponse> consultaCanceladas(@ModelAttribute ParamConsultaOTPI params){
		logger.info("###### CoordInstalacionesController: consultaCanceladas");
		dataTableResponse=coordInstalacionesService.consultaCanceladas(params);
		if (dataTableResponse.getResult() instanceof Integer) {
            return new ResponseEntity<>(dataTableResponse, HttpStatus.FORBIDDEN);
        }
		return new ResponseEntity<>(dataTableResponse, HttpStatus.ACCEPTED);
	}
	@PostMapping("consultaReagendadas")
	public ResponseEntity<DataTableResponse> consultaReagendadas(@ModelAttribute ParamConsultaOTPI params){
		logger.info("###### CoordInstalacionesController: consultaReagendadas");
		dataTableResponse=coordInstalacionesService.consultaReagenda(params);
		if (dataTableResponse.getResult() instanceof Integer) {
            return new ResponseEntity<>(dataTableResponse, HttpStatus.FORBIDDEN);
        }
		return new ResponseEntity<>(dataTableResponse, HttpStatus.ACCEPTED);
	}
	@PostMapping("consultaCalendarizadoVencido")
	public ResponseEntity<DataTableResponse> consultaCalendarizadoVencido(@ModelAttribute ParamConsultaOTPI params){
		logger.info("###### CoordInstalacionesController: consultaReagendadas");
		dataTableResponse=coordInstalacionesService.consultaCalendarizadoVencido(params);
		if (dataTableResponse.getResult() instanceof Integer) {
            return new ResponseEntity<>(dataTableResponse, HttpStatus.FORBIDDEN);
        }
		return new ResponseEntity<>(dataTableResponse, HttpStatus.ACCEPTED);
	}
	
	@PostMapping("consultaTerminadas")
	public ResponseEntity<DataTableResponse> consultaTerminadas(@ModelAttribute ParamConsultaOTPI params){
		logger.info("###### CoordInstalacionesController: consultaTerminadas");
		dataTableResponse=coordInstalacionesService.consultaTerminada(params);
		if (dataTableResponse.getResult() instanceof Integer) {
            return new ResponseEntity<>(dataTableResponse, HttpStatus.FORBIDDEN);
        }
		return new ResponseEntity<>(dataTableResponse, HttpStatus.ACCEPTED);
	}
	@PostMapping("consultaDetenidas")
	public ResponseEntity<DataTableResponse> consultaDetenidas(@ModelAttribute ParamConsultaOTPI params){
		logger.info("###### CoordInstalacionesController: consultaDetenidas");
		dataTableResponse=coordInstalacionesService.consultaDetenidas(params);
		if (dataTableResponse.getResult() instanceof Integer) {
            return new ResponseEntity<>(dataTableResponse, HttpStatus.FORBIDDEN);
        }
		return new ResponseEntity<>(dataTableResponse, HttpStatus.ACCEPTED);
	}
	
	@PostMapping("consultaDetalleOTBsqGeneral")
	public ResponseEntity<?> consultaDetalleOTBsqGeneral(@RequestBody String params){
		logger.info("##### CoordInstalacionesController: consultaDetalleOTBsqGeneral");
		ServiceResponseResult response=coordInstalacionesService.consultaDetalleOTBsqGeneral(params);
		if (response.getResult() instanceof Integer) {
            return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
		
	}
}

