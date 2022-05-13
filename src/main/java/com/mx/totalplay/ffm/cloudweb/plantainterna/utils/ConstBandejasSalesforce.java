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
	
}