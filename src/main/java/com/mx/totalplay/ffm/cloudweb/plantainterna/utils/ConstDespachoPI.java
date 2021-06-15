package com.mx.totalplay.ffm.cloudweb.plantainterna.utils;

import java.io.Serializable;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import lombok.Data;

@Data
@Component
public class ConstDespachoPI implements Serializable{
	
	private static final long serialVersionUID = 1L;
	
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
			
	@Value("${urlfiltrosdespacho}")
	private String filtrosDespachoPI;
	
	@Value("${consultarconteoalertaspi}")
	private String conteoAlertasDespachoPI;
	
	@Value("${consultarcatalogoestatustecnicopi}")
	private String catalogoEstatusTecnicoPI;
	
	@Value("${cambiarestatusoperariopi}")
	private String cambiarEstatusOperarioPI;
	
	@Value("${consultarotstrabajadaspi}")
	private String consultaOtsTrabajadasDespachoPI;
	
	@Value("${consultarinformacionvehiculooper}")
	private String consultaInformacionVehiculoOper;
	
	@Value("${consultarmaterialesoperariopi}")
	private String consultaInformacionMaterialesOperario;
	
	@Value("${cambiarestatusordentrabajopi}")
	private String cambiarEstatusOrdenTrabajoPI;
	
	@Value("${consultarpaletacoloresdespachopi}")
	private String consultaPaletaColoresDespachoPI;
	
	@Value("${consultarcatalogoaccionesotpi}")
	private String consultaCatalogoAccionesOtPi;
	
	@Value("${encontrarlocalizacionot}")
	private String consultaLocalizacionOT;
	
	// ---------------
	
	@Value("${consultardetallealerta}")
	private String consultarDetalleAlerta;
	
	@Value("${consultaraccionesalerta}")
	private String consultarAccionesAlerta;
	
	@Value("${consultarcatalogoalerta}")
	private String consultarCatalogoAlerta;
	
	@Value("${canalizarAlerta}")
	private String canalizarAlerta;
	
	@Value("${consultarevidenciaalerta}")
	private String consultarEvidenciaAlerta;
	
	@Value("${consultarhistoricoalerta}")
	private String consultarHistoricoAlerta;
	
	@Value("${consultarcomentariosalerta}")
	private String consultarComentariosAlerta;
	
	@Value("${agregarcomentariosalerta}")
	private String agregarComentarioAlerta;
	
	@Value("${consultardetalleordenpi}")
	private String consultaDetalleOt;
}

