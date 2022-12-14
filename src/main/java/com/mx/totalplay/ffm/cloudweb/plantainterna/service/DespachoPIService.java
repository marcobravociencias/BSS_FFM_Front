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
	public ServiceResponseResult consultarCatalogoTipoOrdenUsuarioDespacho(String params);

	public ServiceResponseResult consultarCotizacionOTSe(String params);
	public ServiceResponseResult consultarCatalogoEstatusOrden(String params);
	public ServiceResponseResult consultarCatalogoEstatusOrdenToken(String token, String direccionAmbiente);
	public ServiceResponseResult consultarCatalogoGeografiaGeneral();
	public ServiceResponseResult consultarCatalogoGeografiaUsuario(String params);	
	public ServiceResponseResult consultarCatalogoTurnosPI(String params);
	public ServiceResponseResult consultarCatalogoAccionesOTPI();
	public ServiceResponseResult obtenerOrdenesTrabajoPendientesDespacho(String params);
	public ServiceResponseResult consultarOrdenesAsignadasOperario(String params);
	public ServiceResponseResult consultarOperariosAsignadosDespacho(String params);
	public ServiceResponseResult consultarlocalizacionOtPIDespacho(String params); 
	public ServiceResponseResult consultarDetalleOTPI(String params);
	public ServiceResponseResult consultarDetalleOTPIToken(String params, String token, String direccionAmbiente);
	public ServiceResponseResult consultarComentariosOTPI(String params);
	public ServiceResponseResult consultarHistoricoOTPI(String params);


	public ServiceResponseResult consultarConteoAlertasPI(String params);
	public ServiceResponseResult cambiarEstatusOrdenTrabajo(String params);
	
	public ServiceResponseResult getDetalleAlertas(String params);
	public ServiceResponseResult consultaAcciones(String params);
	public ServiceResponseResult getCatalogoStatusEstadoMotivo(String params);
	public ServiceResponseResult consultarEvidenciaAlertaPI(String params);
	public ServiceResponseResult cambiarEstatusTecnicoPI(String params);
	public ServiceResponseResult confirmaDesconfirmaOtDespacho(String params);
	public ServiceResponseResult confirmaDesconfirmaOtDespachoToken(String params, String token, String direccionAmbiente);
	
	public ServiceResponseResult consultaDetalleOtPe(String params);
	
	
    ServiceResponseResult consultarDetalleTecnicoOt(String params);

    ServiceResponseResult agregarComentariosOt(String params);

	public DataTableResponse consultarReporteDiario(ParamConsultaOTPI params);

    ServiceResponseResult obtenerResumenPaquete(String params);

	ServiceResponseResult consultaRepoDiarioEx(String params);

    ServiceResponseResult consultaInformacionVehiculoTecnico(String params);

    ServiceResponseResult consultarCentroAlmacenByNumeroEmpleado(String params);

	ServiceResponseResult consultaMaterialesTecnico(String params);
	
	ServiceResponseResult consultaPagosTecnico(String params);
	
	ServiceResponseResult actualizarDireccionOt(String params);
	
	ServiceResponseResult consultarJerarquiaOrganigrama(String params);
	
	ServiceResponseResult asignarTecnicoGeocerca(String params);
}
