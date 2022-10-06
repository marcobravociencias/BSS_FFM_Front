package com.mx.totalplay.ffm.cloudweb.projectmanager.controller;

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
import com.mx.totalplay.ffm.cloudweb.plantainterna.controller.CoordInstalacionesController;
import com.mx.totalplay.ffm.cloudweb.plantainterna.model.CoordInstalacionesPI.ParamFFMCoordInstalacionesVO;
import com.mx.totalplay.ffm.cloudweb.projectmanager.model.ParamFFMBandejasEimVO;
import com.mx.totalplay.ffm.cloudweb.projectmanager.service.BandejasEimPMService;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.DataTableResponse;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.ServiceResponseResult;

@RestController
@RequestMapping("/req")
public class BandejasEimController {
	private final BandejasEimPMService	bandejasEimPmService;
	private final Logger logger = LogManager.getLogger(CoordInstalacionesController.class.getName());
	private Gson gson = new Gson();
	private DataTableResponse dataTableResponse;
	
	@Autowired
	public BandejasEimController(BandejasEimPMService	bandejasEimPmService) {
		this.bandejasEimPmService = bandejasEimPmService;
	}
	
	@PostMapping("consultarBandejaEim")
	public ResponseEntity<DataTableResponse> consultarBandejaEim(@ModelAttribute ParamFFMBandejasEimVO params) {
		logger.info("*** Objeto: " + gson.toJson(params));
		dataTableResponse = bandejasEimPmService.consultarBandejaEim(params);
		if (dataTableResponse.getResult() instanceof Integer){
			return new ResponseEntity<DataTableResponse>(dataTableResponse, HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<DataTableResponse>(dataTableResponse, HttpStatus.ACCEPTED);
	}
	
	@PostMapping("consultarPendientesPorImplementar")
	public ResponseEntity<DataTableResponse> consultarPendientesPorImplementar(@ModelAttribute ParamFFMBandejasEimVO params) {
		logger.info("*** Objeto: " + gson.toJson(params));
		dataTableResponse = bandejasEimPmService.consultarPendientesPorImplementar(params);
		if (dataTableResponse.getResult() instanceof Integer){
			return new ResponseEntity<DataTableResponse>(dataTableResponse, HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<DataTableResponse>(dataTableResponse, HttpStatus.ACCEPTED);
	}
	
	@PostMapping("/consultarSinEim")
	public ResponseEntity<?> consultarSinEim(@RequestBody String params) {
		logger.info("##### CONSULTANDO consultarSinEim" + params);
		ServiceResponseResult response = bandejasEimPmService.consultarSinEim(params);
		if (response.getResult() instanceof Integer){
			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
	}
	
	@GetMapping("/consultarListaEim")
	public ResponseEntity<?> consultarListaEim() {
		logger.info("##### CONSULTANDO consultarListaEim");
		ServiceResponseResult response = bandejasEimPmService.consultarListaEim();
		if (response.getResult() instanceof Integer){
			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
	}
	
	@PostMapping("/updateEim")
    public ResponseEntity<?> updateEim(@RequestBody String params){
        logger.info("#### CONSULTANDO updateEim");
        ServiceResponseResult response = bandejasEimPmService.updateEim(params);
        if (response.getResult() instanceof Integer) {
            return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
    }
	
	@PostMapping("/bandejaPendientes")
    public ResponseEntity<?> bandejaPendientes(@RequestBody String params){
        logger.info("#### CONSULTANDO bandejaPendientes");
        ServiceResponseResult response = bandejasEimPmService.bandejaPendientes(params);
        if (response.getResult() instanceof Integer) {
            return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
    }
	
	@PostMapping("/bandejaDependencias")
    public ResponseEntity<?> bandejaDependencias(@RequestBody String params){
        logger.info("#### CONSULTANDO bandejaDependencias");
        ServiceResponseResult response = bandejasEimPmService.bandejaDependencias(params);
        if (response.getResult() instanceof Integer) {
            return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
    }
	
	@PostMapping("/bandejaImplementacion")
    public ResponseEntity<?> bandejaImplementacion(@RequestBody String params){
        logger.info("#### CONSULTANDO bandejaImplementacion");
        ServiceResponseResult response = bandejasEimPmService.bandejaImplementacion(params);
        if (response.getResult() instanceof Integer) {
            return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
    }
}
