package com.mx.totalplay.ffm.cloudweb.plantainterna.controller;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.mx.totalplay.ffm.cloudweb.plantainterna.service.GestionTecnicosService;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.ServiceResponseResult;

@RestController
@RequestMapping("/req")
public class GestionTecnicosController {

	private final Logger logger = LogManager.getLogger(GestionTecnicosController.class.getName());
	private Gson gson = new Gson();
	private final GestionTecnicosService gestionTecnicosService;

	public GestionTecnicosController(GestionTecnicosService gestionTecnicosService) {
		this.gestionTecnicosService = gestionTecnicosService;
	}
	
	@PostMapping("/consultaTecnicosGestionTecnicos")
	public ResponseEntity<?> consultaTecnicosGestionTecnicos(@RequestBody String params) {
		logger.info("##### CONSULTANDO TECNICOS GT");
		ServiceResponseResult result = gestionTecnicosService.consultaTecnicosGestionTecnicos(params);
        if (result.getResult() instanceof Integer){
            return new ResponseEntity<>(result, HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(result, HttpStatus.ACCEPTED);
	}
	
	@PostMapping("/consultaAuxiliaresGestionTecnicos")
	public ResponseEntity<?> consultaAuxiliaresGestionTecnicos(@RequestBody String params) {
		logger.info("##### CONSULTANDO AUXILIARES GT");
		ServiceResponseResult result = gestionTecnicosService.consultaAuxiliaresGestionTecnicos(params);
        if (result.getResult() instanceof Integer){
            return new ResponseEntity<>(result, HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(result, HttpStatus.ACCEPTED);
	}
	
	@PostMapping("/consultaTecnicosPorDespacho")
	public ResponseEntity<?> consultaTecnicosPorDespacho() {
		logger.info("##### CONSULTANDO TECNICOS POR DESPACHO GT");
		ServiceResponseResult result = gestionTecnicosService.consultaTecnicosPorDespacho();
        if (result.getResult() instanceof Integer){
            return new ResponseEntity<>(result, HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(result, HttpStatus.ACCEPTED);
	}
	
	@PostMapping("/consultaOrdenesTecnicoPorFecha")
	public ResponseEntity<?> consultaOrdenesTecnicoPorFecha(@RequestBody String params) {
		logger.info("##### CONSULTANDO ORDENES DE TECNICOS POR FECHA GT");
		ServiceResponseResult result = gestionTecnicosService.consultaOrdenesTecnicoPorFecha(params);
        if (result.getResult() instanceof Integer){
            return new ResponseEntity<>(result, HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(result, HttpStatus.ACCEPTED);
	}
	
	@PostMapping("/consultaOrdenesAuxiliarPorFecha")
	public ResponseEntity<?> consultaOrdenesAuxiliarPorFecha(@RequestBody String params) {
		logger.info("##### CONSULTANDO ORDENES DE AUXILIARES POR FECHA GT");
		ServiceResponseResult result = gestionTecnicosService.consultaOrdenesAuxiliarPorFecha(params);
        if (result.getResult() instanceof Integer){
            return new ResponseEntity<>(result, HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(result, HttpStatus.ACCEPTED);
	}
	
	@PostMapping("/consultaDisponibilidadTecnico")
	public ResponseEntity<?> consultaDisponibilidadTecnico(@RequestBody String params) {
		logger.info("##### CONSULTANDO DISPONIBILIDAD TECNICO GT");
		ServiceResponseResult result = gestionTecnicosService.consultaDisponibilidadTecnico(params);
        if (result.getResult() instanceof Integer){
            return new ResponseEntity<>(result, HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(result, HttpStatus.ACCEPTED);
	}
	
	@PostMapping("/consultaDiasTrabajadosTecnicoPorFecha")
	public ResponseEntity<?> consultaDiasTrabajadosTecnicoPorFecha(@RequestBody String params) {
		logger.info("##### CONSULTANDO DIAS TRABAJADOS TECNICO POR FECHA GT");
		ServiceResponseResult result = gestionTecnicosService.consultaDiasTrabajadosTecnicoPorFecha(params);
        if (result.getResult() instanceof Integer){
            return new ResponseEntity<>(result, HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(result, HttpStatus.ACCEPTED);
	}
	
	@PostMapping("/consultaDiasTrabajadosAuxiliarPorFecha")
	public ResponseEntity<?> consultaDiasTrabajadosAuxiliarPorFecha(@RequestBody String params) {
		logger.info("##### CONSULTANDO DIAS TRABAJADOS AUXILIAR POR FECHA GT");
		ServiceResponseResult result = gestionTecnicosService.consultaDiasTrabajadosAuxiliarPorFecha(params);
        if (result.getResult() instanceof Integer){
            return new ResponseEntity<>(result, HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(result, HttpStatus.ACCEPTED);
	}
	
	@PostMapping("/consultaJustificacionesTecnico")
	public ResponseEntity<?> consultaJustificacionesTecnico(@RequestBody String params) {
		logger.info("##### CONSULTANDO JUSTIFICACIONES TECNICO GT");
		ServiceResponseResult result = gestionTecnicosService.consultaJustificacionesTecnico(params);
        if (result.getResult() instanceof Integer){
            return new ResponseEntity<>(result, HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(result, HttpStatus.ACCEPTED);
	}
	
	@PostMapping("/consultaMotivosJustificaciones")
	public ResponseEntity<?> consultaMotivosJustificaciones() {
		logger.info("##### CONSULTANDO MOTIVOS DE JUSTIFICACIONES GT");
		ServiceResponseResult result = gestionTecnicosService.consultaMotivosJustificaciones();
        if (result.getResult() instanceof Integer){
            return new ResponseEntity<>(result, HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(result, HttpStatus.ACCEPTED);
	}
	
	@PostMapping("/guardarJustificacionTecnico")
	public ResponseEntity<?> guardarJustificacionTecnico(@RequestBody String params) {
		logger.info("##### GUARDANDO JUSTIFICACION TECNICO GT");
		ServiceResponseResult result = gestionTecnicosService.guardarJustificacionTecnico(params);
        if (result.getResult() instanceof Integer){
            return new ResponseEntity<>(result, HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(result, HttpStatus.ACCEPTED);
	}
	
	@PostMapping("/eliminarJustificacionTecnico")
	public ResponseEntity<?> eliminarJustificacionTecnico(@RequestBody String params) {
		logger.info("##### ELIMINAR JUSTIFICACION TECNICO GT");
		ServiceResponseResult result = gestionTecnicosService.eliminarJustificacionTecnico(params);
        if (result.getResult() instanceof Integer){
            return new ResponseEntity<>(result, HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(result, HttpStatus.ACCEPTED);
	}
	
	@PostMapping("/modificarJustificacionTecnico")
	public ResponseEntity<?> modificarJustificacionTecnico(@RequestBody String params) {
		logger.info("##### MODIFICANDO JUSTIFICACION TECNICO GT");
		ServiceResponseResult result = gestionTecnicosService.modificarJustificacionTecnico(params);
        if (result.getResult() instanceof Integer){
            return new ResponseEntity<>(result, HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(result, HttpStatus.ACCEPTED);
	}
	
	@PostMapping("/consultarComentariosJustificacion")
	public ResponseEntity<?> consultarComentariosJustificacion(@RequestBody String params) {
		logger.info("##### CONSULTANDO COMENTARIOS DE JUSTIFICACION GT");
		ServiceResponseResult result = gestionTecnicosService.consultarComentariosJustificacion(params);
        if (result.getResult() instanceof Integer){
            return new ResponseEntity<>(result, HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(result, HttpStatus.ACCEPTED);
	}
	
	@PostMapping("/agregarComentarioJustificacion")
	public ResponseEntity<?> agregarComentarioJustificacion(@RequestBody String params) {
		logger.info("##### GUARDANDO COMENTARIO DE JUSTIFICACION GT");
		ServiceResponseResult result = gestionTecnicosService.agregarComentarioJustificacion(params);
        if (result.getResult() instanceof Integer){
            return new ResponseEntity<>(result, HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(result, HttpStatus.ACCEPTED);
	}

}
