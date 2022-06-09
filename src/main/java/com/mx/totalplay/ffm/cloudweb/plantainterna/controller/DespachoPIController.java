package com.mx.totalplay.ffm.cloudweb.plantainterna.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.mx.totalplay.ffm.cloudweb.plantainterna.service.DespachoPIService;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.ServiceResponseResult;
import com.mx.totalplay.ffm.cloudweb.plantainterna.model.consultaOTPI.ParamConsultaOTPI;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.DataTableResponse;

import java.util.List;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import com.google.gson.Gson;


@RestController
@RequestMapping("/req")
public class DespachoPIController {
    private static final Logger LOGGER = LogManager.getLogger(DespachoPIController.class);

    private DespachoPIService despachoService;
    private DataTableResponse dataTableResponse;
    private Gson gson = new Gson();


    /**
     * @Autowired
     * @Qualifier("clienteRestBalanced") RestTemplate restTemplate;
     **/
    @Autowired
    public DespachoPIController(DespachoPIService despachoService) {
        this.despachoService = despachoService;
    }

    /**
     * @PostMapping("/testingNameService") public ServiceResponseResult consultarTestingName(){
     * LOGGER.info("############-----------consumiendo");
     * List<TestingModel>listado= Arrays.asList( restTemplate.getForObject("http://servicio-usuarios/usuarios",TestingModel[].class));
     * ServiceResponseResult response=ServiceResponseResult.builder().result(listado).build();
     * <p>
     * return response;
     * }
     **/
    
    
    
    
    
    @PostMapping("/confirmaDesconfirmaOtDespacho")
    public ResponseEntity<?> confirmaDesconfirmaOtDespacho(@RequestBody String params) {
        ServiceResponseResult response = despachoService.confirmaDesconfirmaOtDespacho(params);
        if (response.getResult() instanceof Integer) {
            return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(response, HttpStatus.ACCEPTED);

    }
    @PostMapping("/consultarComplementosDespacho")
    public ResponseEntity<?> consultarComplementosDespacho() {
        List<ServiceResponseResult> response = despachoService.consultarComplementosDespacho();
        if (response.get(0).getResult() instanceof Integer) {
            return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(response, HttpStatus.ACCEPTED);

    }

    @PostMapping("/consultarComplementosDespachoIdentificador")
    public ResponseEntity<?> consultarComplementosDespachoIdentificador(@RequestBody String params) {
        ServiceResponseResult response = despachoService.consultarComplementosDespachoIdentificador(params);
        if (response.getResult() instanceof Integer) {
            return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(response, HttpStatus.ACCEPTED);

    }
    
    @PostMapping("/consultarConfiguracionDespachoDespacho")
    public ResponseEntity<?> consultarIconosDisponibles(@RequestBody  (required=false) String params) {
        ServiceResponseResult response = despachoService.consultarConfiguracionDespachoDespachoServ(params);
        if (response.getResult() instanceof Integer) {
            return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(response, HttpStatus.ACCEPTED);

    }

    @PostMapping("/consultarCotizacionDespacho")
    public ResponseEntity<?> consultarCotizacionDespachoContr(@RequestBody String params) {
        ServiceResponseResult response = despachoService.consultarCotizacionOTSe(params);
        if (response.getResult() instanceof Integer) {
            return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(response, HttpStatus.ACCEPTED);

    }

    @PostMapping("/consultarCatalogoDesphachoPI")
    public ResponseEntity<?> consultarCatalogoDesphachoPI(@RequestBody String params) {
        LOGGER.info("##### CONSULTANDO CATALGOS");
        ServiceResponseResult response = despachoService.consultarCatalogosPI(params);
        if (response.getResult() instanceof Integer) {
            return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
    }

    @PostMapping("consulCatalogoGeografiaGeneralDespacho")
    public ResponseEntity<?> consulCatalogoGeografiaGeneralDespacho() {
        LOGGER.info("##### CONSULTANDO CATALOGO GEOGRAFIA GENERAL DESPACHO PI");
        ServiceResponseResult response = despachoService.consultarCatalogoGeografiaGeneral();
        if (response.getResult() instanceof Integer) {
            return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
    }

    @PostMapping("consulCatalogoGeografiaUsuarioDespacho")
    public ResponseEntity<?> consulCatalogoGeografiaUsuarioDespacho() {
        LOGGER.info("##### CONSULTANDO CATALOGO GEOGRAFIA USUARIO DESPACHO PI");
        ServiceResponseResult response = despachoService.consultarCatalogoGeografiaUsuario();
        if (response.getResult() instanceof Integer) {
            return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
    }

    @PostMapping("consultarCatalogoTipoOrdenGeneralDespacho")
    public ResponseEntity<?> consultarCatalogoTipoOrdenGeneralDespacho() {
        LOGGER.info("##### CONSULTANDO CATALOGO ESTATUS DESPACHO PI");
        ServiceResponseResult response = despachoService.consultarCatalogoTipoOrdenGeneralDespacho();
        if (response.getResult() instanceof Integer) {
            return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
    }

    @PostMapping("consultarCatalogoTipoOrdenUsuarioDespacho")
    public ResponseEntity<?> consultarCatalogoTipoOrdenUsuarioDespacho() {
        LOGGER.info("##### CONSULTANDO CATALOGO ESTATUS DESPACHO PI");
        ServiceResponseResult response = despachoService.consultarCatalogoTipoOrdenUsuarioDespacho();
        if (response.getResult() instanceof Integer) {
            return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
    }

    @PostMapping("consultarCatalogoEstatusDespachoPI")
    public ResponseEntity<?> consultarCatalogoEstatusOrdenDespacho() {
        LOGGER.info("##### CONSULTANDO CATALOGO ESTATUS DESPACHO PI");
        ServiceResponseResult response = despachoService.consultarCatalogoEstatusOrden();
        if (response.getResult() instanceof Integer) {
            return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
    }


    @PostMapping("consultarCatalogoTurnosDespachoPI")
    public ResponseEntity<?> consultarCatalogoTurnosPI() {
        LOGGER.info("##### CONSULTANDO CATALOGO TURNO DESPACHO PI");
        ServiceResponseResult response = despachoService.consultarCatalogoTurnosPI();
        if (response.getResult() instanceof Integer) {
            return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
    }


    @PostMapping("consultarHistoricoDespachoOT")
    public ResponseEntity<?> consultarHistoricoDespachoOTCon(@RequestBody String params) {
        LOGGER.info("##### CONSULTANDO HISTORICO DESPACHO OT");
        ServiceResponseResult response = despachoService.consultarHistoricoOTPI(params);
        if (response.getResult() instanceof Integer) {
            return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
    }

    @PostMapping("consultarDetalleDespachoOT")
    public ResponseEntity<?> consultarDetalleDespachoOTCon(@RequestBody String params) {
        LOGGER.info("##### CONSULTANDO DETALLE OT DESPACHO");
        ServiceResponseResult response = despachoService.consultarDetalleOTPI(params);
        if (response.getResult() instanceof Integer) {
            return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
    }

    @PostMapping("consultarComentariosDespachoOT")
    public ResponseEntity<?> consultarComentariosDespachoOTCon(@RequestBody String params) {
        LOGGER.info("##### CONSULTANDO COMENTARIOS ");
        ServiceResponseResult response = despachoService.consultarComentariosOTPI(params);
        if (response.getResult() instanceof Integer) {
            return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
    }


    @PostMapping("cambiarEstatusOrdenPI")
    public ResponseEntity<?> cambiarEstatusOrdenTrabajo(@RequestBody String params) {
        LOGGER.info("##### CAMBIANDO ESTATUS ORDEN TRABAJO---");
        ServiceResponseResult response = despachoService.cambiarEstatusOrdenTrabajo(params);
        if (response.getResult() instanceof Integer) {
            return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
    }

    @PostMapping("consultandoMaterialesPI")
    public ResponseEntity<?> consultarMaterialesDespachoOper(@RequestBody String params) {
        LOGGER.info("##### CONSULTANDO MATERIALES PI OPERARIO");
        ServiceResponseResult response = despachoService.consultarMaterialesOperarioPI(params);
        if (response.getResult() instanceof Integer) {
            return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
    }

    @PostMapping("consultarVehiculoOperarioPI")
    public ResponseEntity<?> consultarVehiculoOperarioPI(@RequestBody String params) {
        LOGGER.info("##### CONSULTANDO INFORMAICON VEHICULO");
        ServiceResponseResult response = despachoService.cambiarEstatusTecnicoDespachoPI(params);
        if (response.getResult() instanceof Integer) {
            return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
    }

    @PostMapping("consultarOtsTrabajadasDespacho")
    public ResponseEntity<?> consultarOtsTrabajadasDespacho(@RequestBody String params) {
        LOGGER.info("##### CONSULTANDO OTS TRABAJADAS");
        ServiceResponseResult response = despachoService.cambiarEstatusTecnicoDespachoPI(params);
        if (response.getResult() instanceof Integer) {
            return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
    }

    @PostMapping("cambiarEstatusOperarioPI")
    public ResponseEntity<?> cambiarEstatusOperarioPI(@RequestBody String params) {
        LOGGER.info("##### CAMBIANDO ESTATUS TECNICO PI");
        ServiceResponseResult response = despachoService.cambiarEstatusTecnicoDespachoPI(params);
        if (response.getResult() instanceof Integer) {
            return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
    }
    
    @PostMapping("cambiarEstatusTecnicoPI")
    public ResponseEntity<?> cambiarEstatusTecnicoPI(@RequestBody String params){
    	LOGGER.info("#### Cambiando estatus de tecnico PI 21072021");
    	ServiceResponseResult response=despachoService.cambiarEstatusTecnicoPI(params);
    	if(response.getResult() instanceof Integer) {
    		return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
    	}
    	return new ResponseEntity<>(response,HttpStatus.ACCEPTED);
    }
    
 

    @PostMapping("/consultarConteoAlertasPI")
    public ResponseEntity<?> consultarConteoAlertasPI(@RequestBody String params) {
        LOGGER.info("##### CONSULTANDO CONTEO ALERTAS");
        ServiceResponseResult response = despachoService.consultarConteoAlertasPI(params);
        if (response.getResult() instanceof Integer) {
            return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
    }

    @PostMapping("/consultarOrdenesPendientes")
    public ResponseEntity<?> consultarOrdenesTrabajoPI(@RequestBody String params) {
        LOGGER.info("##### CONSULTANDO ORDENES PENDIENTES");
        ServiceResponseResult response = despachoService.obtenerOrdenesTrabajoPendientesDespacho(params);
        if (response.getResult() instanceof Integer) {
            return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
    }


    @PostMapping("/consultarOtsAsignadas")
    public ResponseEntity<?> consultarOrdenesAsignadas(@RequestBody String params) {
        LOGGER.info("##### CONSULTANDO CATALGOS");
        ServiceResponseResult response = despachoService.consultarOrdenesAsignadasOperario(params);
        if (response.getResult() instanceof Integer) {
            return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
    }

    @PostMapping("/consultarTecnicosDisponiblesDespachoPI")
    public ResponseEntity<?> consultarTecnicosDisponiblesDespachoPI() {
        LOGGER.info("##### CONSULTANDO OPERARIOS DISPONIBLES");
        ServiceResponseResult response = despachoService.consultarOperariosAsignadosDespacho();
        if (response.getResult() instanceof Integer) {
            return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
    }



    @PostMapping("/consultarCatalogoAccionesDespachoPI")
    public ResponseEntity<?> consultarCatalogoAcciones() {
        LOGGER.info("##### CONSULTANDO consultarCatalogoAcciones");
        ServiceResponseResult response = despachoService.consultarCatalogoAccionesOTPI();
        if (response.getResult() instanceof Integer) {
            return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
    }


    @PostMapping("/getDetalleAlertas")
    public ResponseEntity<?> getDetalleAlertas(@RequestBody String params) {
        LOGGER.info("##### CONSULTANDO getDetalleAlertas");
        ServiceResponseResult response = despachoService.getDetalleAlertas(params);
        if (response.getResult() instanceof Integer) {
            return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
    }

    @PostMapping("/consultaAccionesAlerta")
    public ResponseEntity<?> consultaAccionesAlerta(@RequestBody String params) {
        LOGGER.info("##### CONSULTANDO consultaAccionesAlerta");
        ServiceResponseResult response = despachoService.consultaAcciones(params);
        if (response.getResult() instanceof Integer) {
            return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
    }

    @PostMapping("/getCatalogoStatusEstadoMotivo")
    public ResponseEntity<?> getCatalogoStatusEstadoMotivo(@RequestBody String params) {
        LOGGER.info("##### CONSULTANDO getDetalleAlertas");
        //ServiceResponseResult response = despachoService.getCatalogoStatusEstadoMotivo(params);
        ServiceResponseResult response = null;
		
		/*
		if (response.getResult() instanceof Integer){
			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
		}
		*/
        return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
    }

    @PostMapping("/consultarEvidenciaAlertaPI")
    public ResponseEntity<?> consultarEvidenciaAlertaPI(@RequestBody String params) {
        LOGGER.info("##### CONSULTANDO consultarEvidenciaAlertaPI");
        ServiceResponseResult response = despachoService.consultarEvidenciaAlertaPI(params);
        if (response.getResult() instanceof Integer) {
            return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
    }

    @PostMapping("/consultarComentariosAlertaPI")
    public ResponseEntity<?> consultarComentariosAlertaPI(@RequestBody String params) {
        LOGGER.info("##### CONSULTANDO consultarComentariosAlertaPI");
        ServiceResponseResult response = despachoService.consultarComentariosAlertaPI(params);
        if (response.getResult() instanceof Integer) {
            return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
    }

    @PostMapping("/consultarlocalizacionOtPIDespacho")
    public ResponseEntity<?> consultarlocalizacionOtPIDespachoController(@RequestBody String params) {
        LOGGER.info("##### CONSULTANDO consultarlocalizacionOtPIDespachoController");
        ServiceResponseResult response = despachoService.consultarlocalizacionOtPIDespacho(params);
        if (response.getResult() instanceof Integer) {
            return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
    }

    @PostMapping("/cambiarEstatusIntegrador")
    public ResponseEntity<?> cambiarEstatusIntegrador(@RequestBody String params) {
        LOGGER.info("##### CONSULTANDO cambiarEstatusIntegrador");
        ServiceResponseResult response = despachoService.cambiarEstatusIntegrador(params);
        if (response.getResult() instanceof Integer) {
            return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
    }

    @PostMapping("/setComentariosIntegrador")
    public ResponseEntity<?> setComentariosIntegrador(@RequestBody String params) {
        LOGGER.info("##### CONSULTANDO setComentariosIntegrador");
        ServiceResponseResult response = despachoService.setComentariosIntegrador(params);
        if (response.getResult() instanceof Integer) {
            return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
    }

	@PostMapping("/consultarDetalleTecnicoOt")
	public ResponseEntity<?> consultarDetalleTecnicoOt(@RequestBody String params){
    	LOGGER.info("#### CONSULTANDO consultarDetalleTecnicoOt");
		ServiceResponseResult response = despachoService.consultarDetalleTecnicoOt(params);
		if (response.getResult() instanceof Integer) {
			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
	}

	@PostMapping("/agregarComentariosOt")
    public ResponseEntity<?> agregarComentariosOt(@RequestBody String params){
        LOGGER.info("#### CONSULTANDO agregarComentariosOt");
        ServiceResponseResult response = despachoService.agregarComentariosOt(params);
        if (response.getResult() instanceof Integer) {
            return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
    }

    @PostMapping("/consultarReporteDiario")
    public ResponseEntity<DataTableResponse> consultarReporteDiario(@ModelAttribute ParamConsultaOTPI params) {
    	LOGGER.info("*** Objeto: " + gson.toJson(params));
		dataTableResponse = despachoService.consultarReporteDiario(params);
		if (dataTableResponse.getResult() instanceof Integer){
			return new ResponseEntity<DataTableResponse>(dataTableResponse, HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<DataTableResponse>(dataTableResponse, HttpStatus.ACCEPTED);
	}

    @PostMapping("/obtenerResumenPaquete")
    public ResponseEntity<?> obtenerResumenPaquete(@RequestBody String params){
        LOGGER.info("#### CONSULTANDO obtenerResumenPaquete: " + params);
        ServiceResponseResult response = despachoService.obtenerResumenPaquete(params);
        if (response.getResult() instanceof Integer) {
            return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
    }

    @PostMapping("/consultaRepoDiarioEx")
    public ResponseEntity<?> consultaRepoDiarioEx(@RequestBody String params){
        LOGGER.info("#### CONSULTANDO consultaRepoDiarioEx: " + params);
        ServiceResponseResult response = despachoService.consultaRepoDiarioEx(params);
        if (response.getResult() instanceof Integer) {
            return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
    }

    @PostMapping("/consultaInformacionVehiculoTecnico")
    public ResponseEntity<?> consultaInformacionVehiculoTecnico(@RequestBody String params){
        LOGGER.info("#### CONSULTANDO consultaInformacionVehiculoTecnico: " + params);
        ServiceResponseResult response = despachoService.consultaInformacionVehiculoTecnico(params);
        if (response.getResult() instanceof Integer) {
            return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
    }

    @PostMapping("/consultarCentroAlmacenByNumeroEmpleado")
    public ResponseEntity<?> consultarCentroAlmacenByNumeroEmpleado(@RequestBody String params){
        LOGGER.info("#### CONSULTANDO consultarCentroAlmacenByNumeroEmpleado: " + params);
        ServiceResponseResult response = despachoService.consultarCentroAlmacenByNumeroEmpleado(params);
        if (response.getResult() instanceof Integer) {
            return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
    }

    @PostMapping("/consultaMaterialesTecnico")
    public ResponseEntity<?> consultaMaterialesTecnico(@RequestBody String params){
        LOGGER.info("#### CONSULTANDO consultaMaterialesTecnico: " + params);
        ServiceResponseResult response = despachoService.consultaMaterialesTecnico(params);
        if (response.getResult() instanceof Integer) {
            return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
    }
    
    @PostMapping("/consultaPagosTecnico")
    public ResponseEntity<?> consultaPagosTecnico(@RequestBody String params){
        LOGGER.info("#### CONSULTANDO consultaPagosTecnico: " + params);
        ServiceResponseResult response = despachoService.consultaPagosTecnico(params);
        if (response.getResult() instanceof Integer) {
            return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
    }
    
    @PostMapping("/consultaDetalleOtPe")
    public ResponseEntity<?> consultaDetalleOtPe(@RequestBody String params) {
        LOGGER.info("##### CONSULTANDO DETALLE OT PLANTA EXTERNA");
        ServiceResponseResult response = despachoService.consultaDetalleOtPe(params);
        if (response.getResult() instanceof Integer) {
            return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
    }
    
    @PostMapping("/actualizaDireccionOt")
    public ResponseEntity<?> actualizaDireccionOt(@RequestBody String params) {
        LOGGER.info("##### ACTUALIZA DIRECCION OT");
        ServiceResponseResult response = despachoService.actualizarDireccionOt(params);
        if (response.getResult() instanceof Integer) {
            return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
    }
    
    @PostMapping("/consultarJerarquiaOrganigrama")
    public ResponseEntity<?> consultarJerarquiaOrganigrama(@RequestBody String params) {
        LOGGER.info("##### consultarJerarquiaOrganigrama");
        ServiceResponseResult response = despachoService.consultarJerarquiaOrganigrama(params);
        if (response.getResult() instanceof Integer) {
            return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
    }
}


