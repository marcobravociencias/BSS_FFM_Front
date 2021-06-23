package com.mx.totalplay.ffm.cloudweb.plantainterna.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import com.mx.totalplay.ffm.cloudweb.plantainterna.service.DespachoPIService;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.ServiceResponseResult;

@RestController
@RequestMapping("/req")
public class DespachoPIController {
	private  final Logger logger = LogManager.getLogger(DespachoPIController.class.getName());

	private DespachoPIService despachoService;
	
	@Autowired
	public DespachoPIController(DespachoPIService despachoService) {
		this.despachoService=despachoService;
	}
	
	
	@PostMapping("consulCatalogoGeografiaGeneralDespacho")
	public ServiceResponseResult consulCatalogoGeografiaGeneralDespacho() {
		logger.info("##### CONSULTANDO CATALOGO GEOGRAFIA GENERAL DESPACHO PI");
		ServiceResponseResult response = despachoService.consultarCatalogoGeografiaGeneral(  );
        return response;
	}
	@PostMapping("consulCatalogoGeografiaUsuarioDespacho")
	public ServiceResponseResult consulCatalogoGeografiaUsuarioDespacho() {
		logger.info("##### CONSULTANDO CATALOGO GEOGRAFIA USUARIO DESPACHO PI");
		ServiceResponseResult response = despachoService.consultarCatalogoGeografiaUsuario(  );
        return response;
	}		
	@PostMapping("consultarCatalogoTipoOrdenConfigDespacho")
	public ServiceResponseResult consultarCatalogoTipoOrdenConfigDespacho() {
		logger.info("##### CONSULTANDO CATALOGO ESTATUS DESPACHO PI");
		ServiceResponseResult response = despachoService.consultarCatalogoTipoOrdenConfigDespacho(  );
        return response;
	}		
	@PostMapping("consultarCatalogoTipoOrdenUsuarioDespacho")
	public ServiceResponseResult consultarCatalogoTipoOrdenUsuarioDespacho() {
		logger.info("##### CONSULTANDO CATALOGO ESTATUS DESPACHO PI");
		ServiceResponseResult response = despachoService.consultarCatalogoTipoOrdenUsuarioDespacho(  );
        return response;
	}			
	@PostMapping("consultarCatalogoEstatusDespachoPI")
	public ServiceResponseResult consultarCatalogoEstatusOrdenDespacho() {
		logger.info("##### CONSULTANDO CATALOGO ESTATUS DESPACHO PI");
		ServiceResponseResult response = despachoService.consultarCatalogoEstatusOrden(  );
        return response;
	}
	
	
	@PostMapping("consultarCatalogoTurnosDespachoPI")
	public ServiceResponseResult consultarCatalogoTurnosPI() {
		logger.info("##### CONSULTANDO CATALOGO TURNO DESPACHO PI");
		ServiceResponseResult response = despachoService.consultarCatalogoTurnosPI(  );
        return response;
	}
	
	
	@PostMapping("consultarHistoricoDespachoOT")
	public ServiceResponseResult consultarHistoricoDespachoOTCon(@RequestBody String params) {
		logger.info("##### CONSULTANDO HISTORICO DESPACHO OT");
		ServiceResponseResult response = despachoService.consultarHistoricoOTPI( params );
        return response;
	}
	
	@PostMapping("consultarDetalleDespachoOT")
	public ServiceResponseResult consultarDetalleDespachoOTCon(@RequestBody String params) {
		logger.info("##### CONSULTANDO DETALLE OT DESPACHO");
		ServiceResponseResult response = despachoService.consultarDetalleOTPI( params );
        return response;
	}
	
	@PostMapping("consultarComentariosDespachoOT")
	public ServiceResponseResult consultarComentariosDespachoOTCon(@RequestBody String params) {
		logger.info("##### CONSULTANDO COMENTARIOS ");
		ServiceResponseResult response = despachoService.consultarComentariosOTPI( params );
        return response;
	}
	
	
	@PostMapping("cambiarEstatusOrdenPI")
	public ServiceResponseResult cambiarEstatusOrdenTrabajo(@RequestBody String params) {
		logger.info("##### CAMBIANDO ESTATUS ORDEN TRABAJO---");
		ServiceResponseResult response = despachoService.cambiarEstatusOrdenTrabajo( params );
        return response;
	}
	
	@PostMapping("consultandoMaterialesPI")
	public ServiceResponseResult consultarMaterialesDespachoOper(@RequestBody String params) {
		logger.info("##### CONSULTANDO MATERIALES PI OPERARIO");
		ServiceResponseResult response = despachoService.consultarMaterialesOperarioPI( params );
        return response;
	}
	
	@PostMapping("consultarVehiculoOperarioPI")
	public ServiceResponseResult consultarVehiculoOperarioPI(@RequestBody String params) {
		logger.info("##### CONSULTANDO INFORMAICON VEHICULO");
		ServiceResponseResult response = despachoService.cambiarEstatusTecnicoDespachoPI( params );
        return response;
	}
	
	@PostMapping("consultarOtsTrabajadasDespacho")
	public ServiceResponseResult consultarOtsTrabajadasDespacho(@RequestBody String params) {
		logger.info("##### CONSULTANDO OTS TRABAJADAS");

		ServiceResponseResult response = despachoService.cambiarEstatusTecnicoDespachoPI( params );
        return response;
	}
	
	@PostMapping("cambiarEstatusOperarioPI")
	public ServiceResponseResult cambiarEstatusOperarioPI(@RequestBody String params) {
		logger.info("##### CAMBIANDO ESTATUS TECNICO PI");
		ServiceResponseResult response = despachoService.cambiarEstatusTecnicoDespachoPI( params );
        return response;
	}
	
	@PostMapping("/consultarCatalogoEstatusTecnico")
	public ServiceResponseResult consultarCatalogoEstatusTecnico(@RequestBody String params) {
		logger.info("##### CONSULTANDO CATALOGO ESTATUS TECNICO");
		ServiceResponseResult response = despachoService.consultarCatalogoEstatusTecnico( params );
        return response;
    }
	
	@PostMapping("/consultarConteoAlertasPI")
	public ServiceResponseResult consultarConteoAlertasPI(@RequestBody String params) {
		logger.info("##### CONSULTANDO CONTEO ALERTAS");
		ServiceResponseResult response = despachoService.consultarConteoAlertasPI( params );
        return response;
    }
		
	@PostMapping("/consultarOrdenesPendientes")
    public ServiceResponseResult consultarOrdenesTrabajoPI(@RequestBody String params) {
		logger.info("##### CONSULTANDO ORDENES PENDIENTES");
		ServiceResponseResult response = despachoService.obtenerOrdenesTrabajoPendientesDespacho( params );
        return response;
    }
	

	@PostMapping("/consultarOtsAsignadas")
	public ServiceResponseResult consultarOrdenesAsignadas(@RequestBody String params) {				
		logger.info("##### CONSULTANDO CATALGOS");
		ServiceResponseResult response = despachoService.consultarOrdenesAsignadasOperario(params);
        return response;
	}
	@PostMapping("/consultarTecnicosDisponiblesDespachoPI")
	public ServiceResponseResult consultarTecnicosDisponiblesDespachoPI() {				
		logger.info("##### CONSULTANDO OPERARIOS DISPONIBLES");
		ServiceResponseResult response = despachoService.consultarOperariosAsignadosDespacho();
        return response;
	}
	
	@PostMapping("/consultarPaletaColores")
	public ServiceResponseResult consultarPaletaColoresController() {				
		logger.info("##### CONSULTANDO PALETA COLORES");
		ServiceResponseResult response = despachoService.consultarColoresIconografia();
        return response;
	}
	@PostMapping("/consultarCatalogoAccionesDespachoPI")
	public ServiceResponseResult consultarCatalogoAcciones() {				
		logger.info("##### CONSULTANDO consultarCatalogoAcciones");
		ServiceResponseResult response = despachoService.consultarCatalogoAccionesOTPI();
        return response;
	}
	
	
	@PostMapping("/getDetalleAlertas")
	public ServiceResponseResult getDetalleAlertas(@RequestBody String params) {
		logger.info("##### CONSULTANDO getDetalleAlertas");
		ServiceResponseResult response = despachoService.getDetalleAlertas(params);
		return response;
	}
	
	@PostMapping("/consultaAccionesAlerta")
	public ServiceResponseResult consultaAccionesAlerta(@RequestBody String params) {
		logger.info("##### CONSULTANDO consultaAccionesAlerta");
		ServiceResponseResult response = despachoService.consultaAcciones(params);
		return response;
	}
	
	@PostMapping("/getCatalogoStatusEstadoMotivo")
	public ServiceResponseResult getCatalogoStatusEstadoMotivo(@RequestBody String params) {
		logger.info("##### CONSULTANDO getDetalleAlertas");
		ServiceResponseResult response = despachoService.getCatalogoStatusEstadoMotivo(params);
		return response;
	}
	
	@PostMapping("/consultarEvidenciaAlertaPI")
	public ServiceResponseResult consultarEvidenciaAlertaPI(@RequestBody String params) {
		logger.info("##### CONSULTANDO consultarEvidenciaAlertaPI");
		ServiceResponseResult response = despachoService.consultarEvidenciaAlertaPI(params);
		return response;
	}
	
	@PostMapping("/consultarHistoricoAlertaPI")
	public ServiceResponseResult consultarHistoricoAlertaPI(@RequestBody String params) {
		logger.info("##### CONSULTANDO consultarHistoricoAlertaPI");
		ServiceResponseResult response = despachoService.consultarHistoricoAlertaPI(params);
		return response;
	}
	
	@PostMapping("/consultarComentariosAlertaPI")
	public ServiceResponseResult consultarComentariosAlertaPI(@RequestBody String params) {
		logger.info("##### CONSULTANDO consultarComentariosAlertaPI");
		ServiceResponseResult response = despachoService.consultarComentariosAlertaPI(params);
		return response;
	}
	
	@PostMapping("/consultarlocalizacionOtPIDespacho")
	public ServiceResponseResult consultarlocalizacionOtPIDespachoController(@RequestBody String params) {
		logger.info("##### CONSULTANDO consultarlocalizacionOtPIDespachoController");
		ServiceResponseResult response = despachoService.consultarlocalizacionOtPIDespacho(params);
		return response;
	}
	
	@PostMapping("/cambiarEstatusIntegrador") 
	  public ServiceResponseResult cambiarEstatusIntegrador(@RequestBody String params) { 
	    logger.info("##### CONSULTANDO cambiarEstatusIntegrador"); 
	    ServiceResponseResult response = despachoService.cambiarEstatusIntegrador(params); 
	    return response; 
	  } 
	   
	  @PostMapping("/setComentariosIntegrador") 
	  public ServiceResponseResult setComentariosIntegrador(@RequestBody String params) { 
	    logger.info("##### CONSULTANDO setComentariosIntegrador"); 
	    ServiceResponseResult response = despachoService.setComentariosIntegrador(params); 
	    return response; 
	  } 
	
	

	
}
