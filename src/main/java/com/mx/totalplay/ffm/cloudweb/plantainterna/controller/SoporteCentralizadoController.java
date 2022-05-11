package com.mx.totalplay.ffm.cloudweb.plantainterna.controller;

import com.google.gson.Gson;
import com.mx.totalplay.ffm.cloudweb.plantainterna.model.consultaOTPI.ParamConsultaOTPI;
import com.mx.totalplay.ffm.cloudweb.plantainterna.service.SoporteCentralizadoService;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.DataTableResponse;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.ServiceResponseResult;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/req")
public class SoporteCentralizadoController {
    private final Logger logger = LogManager.getLogger(SoporteCentralizadoController.class.getName());
    private final SoporteCentralizadoService soporteCentralizadoService;
    private DataTableResponse dataTableResponse;
	private Gson gson = new Gson();

    public SoporteCentralizadoController(SoporteCentralizadoService soporteCentralizadoService) {
        this.soporteCentralizadoService = soporteCentralizadoService;
    }

    @PostMapping("/consultaSeguimientoSoporte")
    public ResponseEntity<?> consultaSeguimientoSoporte(@RequestBody String params){
        logger.info("#### SEGUIMIENTO SOPORTE consultaSeguimientoSoporte ### \n" + params);
        ServiceResponseResult response = soporteCentralizadoService.consultaSeguimientoSoporte(params);
        if (response.getResult() instanceof Integer){
            return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
    }

//    @PostMapping("/consultaTicketSoporte")
//    public ResponseEntity<?> consultaTicketSoporte(@RequestBody String params){
//        logger.info("#### SEGUIMIENTO SOPORTE consultaTicketSoporte ### \n" + params);
//        ServiceResponseResult response = soporteCentralizadoService.consultaTicketSoporte(params);
//        if (response.getResult() instanceof Integer){
//            return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
//        }
//        return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
//    }
	
	@PostMapping("/consultarDetalleTicketGestion")
	public ResponseEntity<?> connsultarDetalleTicketGestion(@RequestBody String params ) {
		logger.info("###### GestionTecnicosController - connsultarDetalleTicketGestion");
		ServiceResponseResult response = soporteCentralizadoService.consultarDetalleTicketGestion(params);
		if (response.getResult() instanceof Integer) {
			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
	}
    @PostMapping("/consultaDetalleSoporte")
    public ResponseEntity<?> consultaDetalleSoporte(@RequestBody String params){
        logger.info("#### SEGUIMIENTO SOPORTE consultaDetalleSoporte ### \n" + params);
        ServiceResponseResult response = soporteCentralizadoService.consultaDetalleSoporte(params);
        if (response.getResult() instanceof Integer){
            return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
    }
    
    @GetMapping("/consultaFallasTicketSoporte")
	public ResponseEntity<?> consultaFallasTicketSoporte(){
		logger.info("###### SoporteCentralizadoController - consultarFallasTicketSoporte");
		ServiceResponseResult response = soporteCentralizadoService.consultaFallasTicketSoporte();
		if(response.getResult() instanceof Integer) {
			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
	}
    
    @PostMapping("/consultaTicketsSoporte")
	public ResponseEntity<?> consultaTicketsSoporte(@ModelAttribute ParamConsultaOTPI params) {
		logger.info("#### consultaTicketsSoporte ### \n" + params);
        
        dataTableResponse = soporteCentralizadoService.consultaTicketsSoporte(params);
		if (dataTableResponse.getResult() instanceof Integer){
			return new ResponseEntity<DataTableResponse>(dataTableResponse, HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<DataTableResponse>(dataTableResponse, HttpStatus.ACCEPTED);
	}
    
    @PostMapping("/creaTicketSoporte")
	public ResponseEntity<?> creaTicketSoporte(@RequestBody String params) {
		logger.info("#### creaTicketSoporte ### \n" + params);
        ServiceResponseResult response = soporteCentralizadoService.creaTicketSoporte(params);
        if (response.getResult() instanceof Integer){
            return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
	}
    
    @PostMapping("/consultaCuentaClienteTicketSoporte")
    public ResponseEntity<?> consultaCuentaClienteTicketSoporte(@RequestBody String params){
    	logger.info("#### consultaCuentaClienteTicketSoporte ### \n" + params);
        ServiceResponseResult response = soporteCentralizadoService.consultaCuentaClienteTicketSoporte(params);
        if (response.getResult() instanceof Integer){
            return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
    }

    //Cambios Jose
    @PostMapping("/asignarIngenieroTicket")
    public  ResponseEntity<?> asignarIngenieroTicket(@RequestBody String params){
        logger.info("#### asignarIngenieroTicket ### \n" + params);
        ServiceResponseResult response = soporteCentralizadoService.asignarIngenieroTicket(params);
        if (response.getResult() instanceof Integer){
            return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
    }

    @PostMapping("/consultarAccionesDinamicaDetalle")
    public ResponseEntity<?> consultarAccionesDinamicaDetalle(){
        logger.info("#### consultarAccionesDinamicaDetalle() ###");
        ServiceResponseResult response = soporteCentralizadoService.consultarAccionesDinamicaDetalle();
        if (response.getResult() instanceof Integer){
            return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
    }

    @PostMapping("/consultaPropietariosTicketSoporte")
    public ResponseEntity<?> consultaPropietariosTicketSoporte(){
        logger.info("#### consultaPropietariosTicketSoporte() ###");
        ServiceResponseResult response = soporteCentralizadoService.consultaPropietariosTicketSoporte();
        if (response.getResult() instanceof Integer){
            return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
    }

    @PostMapping("/guardarTicketDetalle")
    public ResponseEntity<?> guardarTicketDetalle(@RequestBody String params){
        logger.info("#### guardarTicketDetalle() ### \n" + params);
        ServiceResponseResult response = soporteCentralizadoService.guardarTicketDetalle(params);
        if (response.getResult() instanceof Integer){
            return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
    }
    //fin cambios jose
    
    @GetMapping("/consultaEstatusTicketSoporte")
	public ResponseEntity<?> consultarEstatusTicketSoporte(){
		logger.info("###### SoporteCentralizadoController - consultaEstatusTicketSoporte");
		ServiceResponseResult response = soporteCentralizadoService.consultarEstatusTicket();
		if(response.getResult() instanceof Integer) {
			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
	}
    
    @GetMapping("/consultaTecnologiaTicketSoporte")
	public ResponseEntity<?> consultaTecnologiaTicketSoporte(){
		logger.info("###### SoporteCentralizadoController - consultaTecnologiaTicketSoporte");
		ServiceResponseResult response = soporteCentralizadoService.consultarTecnologiaSoporte();
		if(response.getResult() instanceof Integer) {
			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
	}
    
    
    @GetMapping("/consultaEquiposSoporte")
  	public ResponseEntity<?> consultarEquiposSoporte(){
  		logger.info("###### SoporteCentralizadoController - consultarEquiposSoporte");
  		ServiceResponseResult response = soporteCentralizadoService.consultarEquiposTicketSoporte();
  		if(response.getResult() instanceof Integer) {
  			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
  		}
  		return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
  	}
    
    @PostMapping("/reasignarIngenieroTicket")
    public  ResponseEntity<?> reasignarIngenieroTicket(@RequestBody String params){
        logger.info("#### reasignarIngenieroTicket ### \n" + params);
        ServiceResponseResult response = soporteCentralizadoService.reasignarIngenieroTicket(params);
        if (response.getResult() instanceof Integer){
            return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
    }
}
