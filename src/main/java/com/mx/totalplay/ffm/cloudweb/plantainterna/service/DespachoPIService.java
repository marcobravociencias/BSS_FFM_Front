package com.mx.totalplay.ffm.cloudweb.plantainterna.service;

import java.util.List;

import com.mx.totalplay.ffm.cloudweb.utilerias.model.ServiceResponseResult;
import com.mx.totalplay.ffm.cloudweb.plantainterna.model.consultaOTPI.ParamConsultaOTPI;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.DataTableResponse;

public interface DespachoPIService {
	public List<ServiceResponseResult> consultarComplementosDespacho();
	public ServiceResponseResult consultarComplementosDespachoIdentificador(String paramsTipo);
	
	public ServiceResponseResult consultarConfiguracionDespachoDespachoServ(String params);

	public ServiceResponseResult consultarCatalogoTipoOrdenGeneralDespacho();
	public ServiceResponseResult consultarCatalogoTipoOrdenUsuarioDespacho();
	public ServiceResponseResult consultarCatalogosPI(String params);

	public ServiceResponseResult consultarCotizacionOTSe(String params);
	public ServiceResponseResult consultarCatalogoEstatusOrden();
	public ServiceResponseResult consultarCatalogoGeografiaGeneral();
	public ServiceResponseResult consultarCatalogoGeografiaUsuario();	
	public ServiceResponseResult consultarCatalogoTurnosPI();
	public ServiceResponseResult consultarCatalogoAccionesOTPI();
	public ServiceResponseResult obtenerOrdenesTrabajoPendientesDespacho(String params);
	public ServiceResponseResult consultarOrdenesAsignadasOperario(String params);
	public ServiceResponseResult consultarOperariosAsignadosDespacho();
	public ServiceResponseResult consultarlocalizacionOtPIDespacho(String params); 
	public ServiceResponseResult consultarDetalleOTPI(String params);
	public ServiceResponseResult consultarComentariosOTPI(String params);
	public ServiceResponseResult consultarHistoricoOTPI(String params);


	public ServiceResponseResult consultarConteoAlertasPI(String params);
	public ServiceResponseResult cambiarEstatusTecnicoDespachoPI(String params);
	public ServiceResponseResult consultarOtsTrabajadasDespachoPI(String params);
	public ServiceResponseResult consultarInformacionVehiculoOperario(String params);
	public ServiceResponseResult consultarMaterialesOperarioPI(String params);
	public ServiceResponseResult cambiarEstatusOrdenTrabajo(String params);
	
	public ServiceResponseResult getDetalleAlertas(String params);
	public ServiceResponseResult consultaAcciones(String params);
	public ServiceResponseResult getCatalogoStatusEstadoMotivo(String params);
	public ServiceResponseResult consultarEvidenciaAlertaPI(String params);
	public ServiceResponseResult consultarComentariosAlertaPI(String params);
	public ServiceResponseResult cambiarEstatusIntegrador(String params);
	public ServiceResponseResult setComentariosIntegrador(String params);
	public ServiceResponseResult cambiarEstatusTecnicoPI(String params);

    ServiceResponseResult consultarDetalleTecnicoOt(String params);

    ServiceResponseResult agregarComentariosOt(String params);

	public DataTableResponse consultarReporteDiario(ParamConsultaOTPI params);

    ServiceResponseResult obtenerResumenPaquete(String params);

	ServiceResponseResult consultaRepoDiarioEx(String params);

    ServiceResponseResult consultaInformacionVehiculoTecnico(String params);
}
