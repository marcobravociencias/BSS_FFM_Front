package com.mx.totalplay.ffm.cloudweb.plantainterna.controller;

import com.mx.totalplay.ffm.cloudweb.plantainterna.model.TestingModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.mx.totalplay.ffm.cloudweb.plantainterna.service.DespachoPIService;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.ServiceResponseResult;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.web.client.RestTemplate;
import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/req")
public class DespachoPIController {
    private static final Logger LOGGER = LogManager.getLogger(DespachoPIController.class);

	private DespachoPIService despachoService;
	/**
	@Autowired
	@Qualifier("clienteRestBalanced")
	RestTemplate restTemplate;
	 **/
	@Autowired
	public DespachoPIController(DespachoPIService despachoService) {
		this.despachoService=despachoService;
	}
	/**
	@PostMapping("/testingNameService")
	public ServiceResponseResult consultarTestingName(){
		LOGGER.info("############-----------consumiendo");
		List<TestingModel>listado= Arrays.asList( restTemplate.getForObject("http://servicio-usuarios/usuarios",TestingModel[].class));
		ServiceResponseResult response=ServiceResponseResult.builder().result(listado).build();
		
		return response;
	}**/


	@PostMapping("/consultarCatalogoDesphachoPI")
    public ResponseEntity<?> consultarCatalogoDesphachoPI(@RequestBody String params) {
		LOGGER.info("##### CONSULTANDO CATALGOS");
		ServiceResponseResult response = despachoService.consultarCatalogosPI(params);
		if (response.getResult() instanceof Integer){
			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
    }
	@PostMapping("consulCatalogoGeografiaGeneralDespacho")
	public ResponseEntity<?> consulCatalogoGeografiaGeneralDespacho() {
		LOGGER.info("##### CONSULTANDO CATALOGO GEOGRAFIA GENERAL DESPACHO PI");
		ServiceResponseResult response = despachoService.consultarCatalogoGeografiaGeneral(  );
		if (response.getResult() instanceof Integer){
			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
	}
	@PostMapping("consulCatalogoGeografiaUsuarioDespacho")
	public ResponseEntity<?> consulCatalogoGeografiaUsuarioDespacho() {
		LOGGER.info("##### CONSULTANDO CATALOGO GEOGRAFIA USUARIO DESPACHO PI");
		ServiceResponseResult response = despachoService.consultarCatalogoGeografiaUsuario(  );
		if (response.getResult() instanceof Integer){
			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
	}		
	@PostMapping("consultarCatalogoTipoOrdenGeneralDespacho")
	public ResponseEntity<?> consultarCatalogoTipoOrdenGeneralDespacho() {
		LOGGER.info("##### CONSULTANDO CATALOGO ESTATUS DESPACHO PI");
		ServiceResponseResult response = despachoService.consultarCatalogoTipoOrdenGeneralDespacho(  );
		if (response.getResult() instanceof Integer){
			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
	}		
	@PostMapping("consultarCatalogoTipoOrdenUsuarioDespacho")
	public ResponseEntity<?> consultarCatalogoTipoOrdenUsuarioDespacho() {
		LOGGER.info("##### CONSULTANDO CATALOGO ESTATUS DESPACHO PI");
		ServiceResponseResult response = despachoService.consultarCatalogoTipoOrdenUsuarioDespacho(  );
		if (response.getResult() instanceof Integer){
			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
	}			
	@PostMapping("consultarCatalogoEstatusDespachoPI")
	public ResponseEntity<?> consultarCatalogoEstatusOrdenDespacho() {
		LOGGER.info("##### CONSULTANDO CATALOGO ESTATUS DESPACHO PI");
		ServiceResponseResult response = despachoService.consultarCatalogoEstatusOrden(  );
		if (response.getResult() instanceof Integer){
			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
	}
	
	
	@PostMapping("consultarCatalogoTurnosDespachoPI")
	public ResponseEntity<?> consultarCatalogoTurnosPI() {
		LOGGER.info("##### CONSULTANDO CATALOGO TURNO DESPACHO PI");
		ServiceResponseResult response = despachoService.consultarCatalogoTurnosPI(  );
		if (response.getResult() instanceof Integer){
			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
	}
	
	
	@PostMapping("consultarHistoricoDespachoOT")
	public ResponseEntity<?> consultarHistoricoDespachoOTCon(@RequestBody String params) {
		LOGGER.info("##### CONSULTANDO HISTORICO DESPACHO OT");
		ServiceResponseResult response = despachoService.consultarHistoricoOTPI( params );
		if (response.getResult() instanceof Integer){
			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
	}
	
	@PostMapping("consultarDetalleDespachoOT")
	public ResponseEntity<?> consultarDetalleDespachoOTCon(@RequestBody String params) {
		LOGGER.info("##### CONSULTANDO DETALLE OT DESPACHO");
		ServiceResponseResult response = despachoService.consultarDetalleOTPI( params );
		if (response.getResult() instanceof Integer){
			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
	}
	
	@PostMapping("consultarComentariosDespachoOT")
	public ResponseEntity<?> consultarComentariosDespachoOTCon(@RequestBody String params) {
		LOGGER.info("##### CONSULTANDO COMENTARIOS ");
		ServiceResponseResult response = despachoService.consultarComentariosOTPI( params );
		if (response.getResult() instanceof Integer){
			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
	}
	
	
	@PostMapping("cambiarEstatusOrdenPI")
	public ResponseEntity<?> cambiarEstatusOrdenTrabajo(@RequestBody String params) {
		LOGGER.info("##### CAMBIANDO ESTATUS ORDEN TRABAJO---");
		ServiceResponseResult response = despachoService.cambiarEstatusOrdenTrabajo( params );
		if (response.getResult() instanceof Integer){
			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
	}
	
	@PostMapping("consultandoMaterialesPI")
	public ResponseEntity<?> consultarMaterialesDespachoOper(@RequestBody String params) {
		LOGGER.info("##### CONSULTANDO MATERIALES PI OPERARIO");
		ServiceResponseResult response = despachoService.consultarMaterialesOperarioPI( params );
		if (response.getResult() instanceof Integer){
			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
	}
	
	@PostMapping("consultarVehiculoOperarioPI")
	public ResponseEntity<?> consultarVehiculoOperarioPI(@RequestBody String params) {
		LOGGER.info("##### CONSULTANDO INFORMAICON VEHICULO");
		ServiceResponseResult response = despachoService.cambiarEstatusTecnicoDespachoPI( params );
		if (response.getResult() instanceof Integer){
			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
	}
	
	@PostMapping("consultarOtsTrabajadasDespacho")
	public ResponseEntity<?> consultarOtsTrabajadasDespacho(@RequestBody String params) {
		LOGGER.info("##### CONSULTANDO OTS TRABAJADAS");
		ServiceResponseResult response = despachoService.cambiarEstatusTecnicoDespachoPI( params );
		if (response.getResult() instanceof Integer){
			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
	}
	
	@PostMapping("cambiarEstatusOperarioPI")
	public ResponseEntity<?> cambiarEstatusOperarioPI(@RequestBody String params) {
		LOGGER.info("##### CAMBIANDO ESTATUS TECNICO PI");
		ServiceResponseResult response = despachoService.cambiarEstatusTecnicoDespachoPI( params );
		if (response.getResult() instanceof Integer){
			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
	}
	
	@PostMapping("/consultarCatalogoEstatusTecnico")
	public ResponseEntity<?> consultarCatalogoEstatusTecnico(@RequestBody String params) {
		LOGGER.info("##### CONSULTANDO CATALOGO ESTATUS TECNICO");
		ServiceResponseResult response = despachoService.consultarCatalogoEstatusTecnico( params );
		if (response.getResult() instanceof Integer){
			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
    }
	
	@PostMapping("/consultarConteoAlertasPI")
	public ResponseEntity<?> consultarConteoAlertasPI(@RequestBody String params) {
		LOGGER.info("##### CONSULTANDO CONTEO ALERTAS");
		ServiceResponseResult response = despachoService.consultarConteoAlertasPI( params );
		if (response.getResult() instanceof Integer){
			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
    }
		
	@PostMapping("/consultarOrdenesPendientes")
    public ResponseEntity<?> consultarOrdenesTrabajoPI(@RequestBody String params) {
		LOGGER.info("##### CONSULTANDO ORDENES PENDIENTES");
		ServiceResponseResult response = despachoService.obtenerOrdenesTrabajoPendientesDespacho( params );
		if (response.getResult() instanceof Integer){
			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
    }
	

	@PostMapping("/consultarOtsAsignadas")
	public ResponseEntity<?> consultarOrdenesAsignadas(@RequestBody String params) {
		LOGGER.info("##### CONSULTANDO CATALGOS");
		ServiceResponseResult response = despachoService.consultarOrdenesAsignadasOperario(params);
		if (response.getResult() instanceof Integer){
			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
	}
	@PostMapping("/consultarTecnicosDisponiblesDespachoPI")
	public ResponseEntity<?> consultarTecnicosDisponiblesDespachoPI() {
		LOGGER.info("##### CONSULTANDO OPERARIOS DISPONIBLES");
		ServiceResponseResult response = despachoService.consultarOperariosAsignadosDespacho();
		if (response.getResult() instanceof Integer){
			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
	}
	
	@PostMapping("/consultarPaletaColores")
	public ResponseEntity<?> consultarPaletaColoresController() {
		LOGGER.info("##### CONSULTANDO PALETA COLORES");
		ServiceResponseResult response = despachoService.consultarColoresIconografia();
		if (response.getResult() instanceof Integer){
			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
	}
	@PostMapping("/consultarCatalogoAccionesDespachoPI")
	public ResponseEntity<?> consultarCatalogoAcciones() {
		LOGGER.info("##### CONSULTANDO consultarCatalogoAcciones");
		ServiceResponseResult response = despachoService.consultarCatalogoAccionesOTPI();
		if (response.getResult() instanceof Integer){
			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
	}
	
	
	@PostMapping("/getDetalleAlertas")
	public ResponseEntity<?> getDetalleAlertas(@RequestBody String params) {
		LOGGER.info("##### CONSULTANDO getDetalleAlertas");
		ServiceResponseResult response = despachoService.getDetalleAlertas(params);
		if (response.getResult() instanceof Integer){
			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
	}
	
	@PostMapping("/consultaAccionesAlerta")
	public ResponseEntity<?> consultaAccionesAlerta(@RequestBody String params) {
		LOGGER.info("##### CONSULTANDO consultaAccionesAlerta");
		ServiceResponseResult response = despachoService.consultaAcciones(params);
		if (response.getResult() instanceof Integer){
			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
	}
	
	@PostMapping("/getCatalogoStatusEstadoMotivo")
	public ResponseEntity<?> getCatalogoStatusEstadoMotivo(@RequestBody String params) {
		LOGGER.info("##### CONSULTANDO getDetalleAlertas");
		ServiceResponseResult response = despachoService.getCatalogoStatusEstadoMotivo(params);
		if (response.getResult() instanceof Integer){
			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
	}
	
	@PostMapping("/consultarEvidenciaAlertaPI")
	public ResponseEntity<?> consultarEvidenciaAlertaPI(@RequestBody String params) {
		LOGGER.info("##### CONSULTANDO consultarEvidenciaAlertaPI");
		ServiceResponseResult response = despachoService.consultarEvidenciaAlertaPI(params);
		if (response.getResult() instanceof Integer){
			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
	}
	
	@PostMapping("/consultarHistoricoAlertaPI")
	public ResponseEntity<?> consultarHistoricoAlertaPI(@RequestBody String params) {
		LOGGER.info("##### CONSULTANDO consultarHistoricoAlertaPI");
		ServiceResponseResult response = despachoService.consultarHistoricoAlertaPI(params);
		if (response.getResult() instanceof Integer){
			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
	}
	
	@PostMapping("/consultarComentariosAlertaPI")
	public ResponseEntity<?> consultarComentariosAlertaPI(@RequestBody String params) {
		LOGGER.info("##### CONSULTANDO consultarComentariosAlertaPI");
		ServiceResponseResult response = despachoService.consultarComentariosAlertaPI(params);
		if (response.getResult() instanceof Integer){
			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
	}
	
	@PostMapping("/consultarlocalizacionOtPIDespacho")
	public ResponseEntity<?> consultarlocalizacionOtPIDespachoController(@RequestBody String params) {
		LOGGER.info("##### CONSULTANDO consultarlocalizacionOtPIDespachoController");
		ServiceResponseResult response = despachoService.consultarlocalizacionOtPIDespacho(params);
		if (response.getResult() instanceof Integer){
			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
	}
	
	@PostMapping("/cambiarEstatusIntegrador") 
	  public ResponseEntity<?> cambiarEstatusIntegrador(@RequestBody String params) {
	    LOGGER.info("##### CONSULTANDO cambiarEstatusIntegrador"); 
	    ServiceResponseResult response = despachoService.cambiarEstatusIntegrador(params);
		if (response.getResult() instanceof Integer){
			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
	  } 
	   
	  @PostMapping("/setComentariosIntegrador") 
	  public ResponseEntity<?> setComentariosIntegrador(@RequestBody String params) {
	    LOGGER.info("##### CONSULTANDO setComentariosIntegrador"); 
	    ServiceResponseResult response = despachoService.setComentariosIntegrador(params);
		  if (response.getResult() instanceof Integer){
			  return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
		  }
		  return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
	  } 
	
	

	
}
