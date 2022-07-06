package com.mx.totalplay.ffm.cloudweb.plantainterna.utils;

import java.io.Serializable;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import lombok.Data;

@Data
@Component
public class ConstBandejasSalesforce implements Serializable {
	
	private static final long serialVersionUID = 1L;
	
	@Value("${consultaPendientesAgendarBandejasSF}")
	private String consultaPendientesAgendarBandejasSF;
	
	@Value("${consultaPendientesActivarBandejasSF}")
	private String consultaPendientesActivarBandejasSF;
	
	@Value("${consultaRescataventasBandejasSF}")
	private String consultaRescataventasBandejasSF;
	
	@Value("${consultaFactibilidadEmpresarialBandejasSF}")
	private String consultaFactibilidadEmpresarialBandejasSF;
	
	@Value("${consultaFactibilidadResidencialBandejasSF}")
	private String consultaFactibilidadResidencialBandejasSF;
	
	@Value("${consultarDetalleSitioAgendamiento}")
	private String consultaDetalleSitioAgendamiento;
	
	@Value("${actualizarFactibilidadSitio}")
	private String actualizaFactibilidadSitio;
	
	@Value("${agregarContactoNuevoAgendamiento}")
	private String agregaContactoAgenda;

	@Value("${consultaDetalleEquiposBandejasSF}")
	private String consultaDetalleEquiposBandejasSF;
	
	@Value("${consultaValidacionCSPBandejasSF}")
	private String consultaValidacionCSPBandejasSF;
	
	@Value("${agendarPendienteBandejaSF}")
	private String agendarPendienteBandejaSF;
}
