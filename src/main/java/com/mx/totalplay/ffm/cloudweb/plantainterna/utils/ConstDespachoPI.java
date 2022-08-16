package com.mx.totalplay.ffm.cloudweb.plantainterna.utils;

import java.io.Serializable;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import lombok.Data;

@Data
@Component
public class ConstDespachoPI implements Serializable{
	
	private static final long serialVersionUID = 1L;

	
	@Value("${confirmardesconfirmarotdespacho}")
	private String confirmarDesconfirmarOtDespacho;
	
	
	@Value("${consultarComplementosDespacho}")
	private String consultarComplementosDespacho;
	
	@Value("${consultarcotizaciondespacho}")
	private String consultarCotizacionDespacho;
	
	@Value("${consultarcatalogoTipoOrdenesConfig}")
	private String consultaCatalogoTipoOrdenConfigDespacho;
	
	@Value("${consultarcatalogoTipoOrdenesPorUsuario}")
	private String consultaCatalogoTipoOrdenUsuarioDespacho;
	
	@Value("${consultarcatalogoEstatusOrden}")
	private String consultaCatalogoEstatusOrdenDespacho;
	
	@Value("${consultarcatalogogeografiageneral}")
	private String consultarCatalogoGeografiaGeneralPI;
	
	@Value("${consultarcatalogogeografiausuario}")
	private String consultarCatalogoGeografiaUsuarioPI;
	
	@Value("${consultarcatalogoturnospi}")
	private String consultarCatalogoTurnosPi;	
	
	@Value("${consultaoperariosasignadosdespacho}")
	private String consultarOperariosAsignadosDespachoPI;
	
	@Value("${consultaordenespendientesdespacho}")
	private String ordenesPendientesDespachoP;
	
	@Value("${consultaordenesasignadasoperario}")
	private String consultaOrdenesAsignadasOperarioPI;
	
	@Value("${consultarhistoricoordenpi}")
	private String consultaHistoricoOrdenPI;

	@Value("${consultarcomentariosordenpi}")
	private String consultaComentariosOrdenPI;
	
	@Value("${consultardetalleordenpi}")
	private String consultaDetalleOrdenPI;
	
	@Value("${consultarconteoalertaspi}")
	private String conteoAlertasDespachoPI;
	
	@Value("${cambiarestatusordentrabajopi}")
	private String cambiarEstatusOrdenTrabajoPI;
	

	@Value("${consultarcatalogoaccionesotpi}")
	private String consultaCatalogoAccionesOtPi;
	
	@Value("${encontrarlocalizacionot}")
	private String consultaLocalizacionOT;
	
	// ---------------
	
	@Value("${consultardetallealerta}")
	private String consultarDetalleAlerta;
	
	@Value("${consultaraccionesalerta}")
	private String consultarAccionesAlerta;
	
	@Value("${consultardetalleordenpi}")
	private String consultaDetalleOt;

	@Value("${consultarDetalleTecnicoOt}")
	private String consultarDetalleTecnicoOt;
	
	@Value("${cambiarEstatusTecPi}")
	private String cambiarEstatusTecPi;

	@Value("${agregarComentariosOt}")
	private String agregarComentariosOt;

	@Value("${consultarReporteDiario}")
	private String consultarReporteDiario;

	@Value("${resumenPaquete}")
	private String resumenPaquete;

	@Value("${consultaInformacionVehiculoTecnico}")
	private String consultaInformacionVehiculoTecnico;

	@Value("${consultaCentroAlmacen}")
	private String consultaCentroAlmacen;

	@Value("${consultaMateriales}")
	private String consultaMateriales;
	
	@Value("${consultaInformacionPagosTecnico}")
	private String consultaInformacionPagosTecnico;
	
	@Value("${consultaDetalleOtPe}")
	private String consultaDetalleOtPe;
	
	@Value("${actualizarDireccionOt}")
	private String actualizarDireccionOt;
	
	@Value("${consultarJerarquiaOrganigrama}")
	private String consultarJerarquiaOrganigrama;
	
	@Value("${asignarTecnicoGeocerca}")
	private String asignarTecnicoGeocerca;
}

