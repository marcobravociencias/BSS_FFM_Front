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
	public ResponseEntity<?> consultaTecnicosPorDespacho(@RequestBody String params) {
		logger.info("##### CONSULTANDO TECNICOS POR DESPACHO GT");
		ServiceResponseResult result = gestionTecnicosService.consultaTecnicosPorDespacho(params);
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

//	@GetMapping("/consultaMotivosGestionTecnicos")
//	public ResponseEntity<?> consultaMotivosGestionTecnicos() {
//		logger.info("###### GestionTecnicosController - consultaMotivosGestionTecnicos");
//		ServiceResponseResult response = gestionTecnicosService.consultaMotivosGestionTecnicos();
//		if (response.getResult() instanceof Integer) {
//			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
//		}
//		return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
//	}
//
//	@PostMapping("/consultaTecnicosGestionTecnicos")
//	public ResponseEntity<?> consultaTecnicosGestionTecnicos(@RequestBody String params) {
//		logger.info("###### GestionTecnicosController - consultaTecnicosGestionTecnicos");
//		ServiceResponseResult response = gestionTecnicosService.consultaTecnicosGestionTecnicos(params);
//		if (response.getResult() instanceof Integer) {
//			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
//		}
//		return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
//	}
//
//	@PostMapping("/consultaDisponibilidadTecGestionTecnicos")
//	public ResponseEntity<?> consultaDisponibilidadTecGestionTecnicos(@RequestBody String params) {
//		logger.info("###### GestionTecnicosController - consultarDisponibilidadTecGestionTecnicos");
//		ServiceResponseResult response = gestionTecnicosService.consultaDisponibilidadTecGestionTecnicos(params);
//		if (response.getResult() instanceof Integer) {
//			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
//		}
//		return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
//	}
//
//	@PostMapping("/consultaDisponibilidadAuxGestionTecnicos")
//	public ResponseEntity<?> consultaDisponibilidadAuxGestionTecnicos(@RequestBody String params) {
//		logger.info("###### GestionTecnicosController - consultarDisponibilidadAuxGestionTecnicos");
//		ServiceResponseResult response = gestionTecnicosService.consultaDisponibilidadAuxGestionTecnicos(params);
//		if (response.getResult() instanceof Integer) {
//			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
//		}
//		return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
//	}
//
//	@PostMapping("/consultaDetalleJustificacionGestionTec")
//	public ResponseEntity<?> consultaDetalleJustificacionGestionTec(@RequestBody String params) {
//		logger.info("###### GestionTecnicosController - consultaDetalleJustificacionGestionTec");
//		ServiceResponseResult response = gestionTecnicosService.consultaDetalleJustificacionGestionTec(params);
//		if (response.getResult() instanceof Integer) {
//			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
//		}
//		return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
//	}
//
//	@PostMapping("/consultaDetalleMesGestionTec")
//	public ResponseEntity<?> consultaDetalleMesGestionTec(@RequestBody String params) {
//		logger.info("###### GestionTecnicosController - consultaDetalleMesGestionTec");
//		ServiceResponseResult response = gestionTecnicosService.consultaDetalleMesGestionTec(params);
//		if (response.getResult() instanceof Integer) {
//			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
//		}
//		return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
//	}
//
//	@PostMapping("/consultaComentariosJustificacionGestionTec")
//	public ResponseEntity<?> consultaComentariosJustificacionGestionTec(@RequestBody String params) {
//		logger.info("###### GestionTecnicosController - consultaComentariosJustificacionGestionTec");
//		ServiceResponseResult response = gestionTecnicosService.consultaComentariosJustificacionGestionTec(params);
//		if (response.getResult() instanceof Integer) {
//			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
//		}
//		return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
//	}
//
//	@PostMapping("/consultaArchivosJustificacionGestionTec")
//	public ResponseEntity<?> consultaArchivosJustificacionGestionTec(@RequestBody String params) {
//		logger.info("###### GestionTecnicosController - consultaArchivosJustificacionGestionTec");
//		ServiceResponseResult response = gestionTecnicosService.consultaArchivosJustificacionGestionTec(params);
//		if (response.getResult() instanceof Integer) {
//			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
//		}
//		return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
//	}
//
//	@PostMapping("/agregarJustificacionGestionTec")
//	public ResponseEntity<?> agregarJustificacionGestionTec(@RequestBody String params) {
//		logger.info("###### GestionTecnicosController - agregarJustificacionGestionTec");
//		ServiceResponseResult response = gestionTecnicosService.agregarJustificacionGestionTec(params);
//		if (response.getResult() instanceof Integer) {
//			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
//		}
//		return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
//	}
//
//	@PostMapping("/editarJustificacionGestionTec")
//	public ResponseEntity<?> editarJustificacionGestionTec(@RequestBody String params) {
//		logger.info("###### GestionTecnicosController - editarJustificacionGestionTec");
//		ServiceResponseResult response = gestionTecnicosService.editarJustificacionGestionTec(params);
//		if (response.getResult() instanceof Integer) {
//			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
//		}
//		return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
//	}
//
//	@PostMapping("/eliminarJustificacionGestionTec")
//	public ResponseEntity<?> eliminarJustificacionGestionTec(@RequestBody String params) {
//		logger.info("###### GestionTecnicosController - eliminarJustificacionGestionTec");
//		ServiceResponseResult response = gestionTecnicosService.eliminarJustificacionGestionTec(params);
//		if (response.getResult() instanceof Integer) {
//			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
//		}
//		return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
//	}
//
//	@PostMapping("/agregarArchivoJustificacionGestionTec")
//	public ResponseEntity<?> agregarArchivoJustificacionGestionTec(@RequestBody String params) {
//		logger.info("###### GestionTecnicosController - agregarArchivoJustificacionGestionTec");
//		ServiceResponseResult response = gestionTecnicosService.agregarArchivoJustificacionGestionTec(params);
//		if (response.getResult() instanceof Integer) {
//			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
//		}
//		return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
//	}
//	
//	@PostMapping("/eliminarArchivoJustificacionGestionTec")
//	public ResponseEntity<?> eliminarArchivoJustificacionGestionTec(@RequestBody String params) {
//		logger.info("###### GestionTecnicosController - eliminarArchivoJustificacionGestionTec");
//		ServiceResponseResult response = gestionTecnicosService.eliminarArchivoJustificacionGestionTec(params);
//		if (response.getResult() instanceof Integer) {
//			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
//		}
//		return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
//	}

}
