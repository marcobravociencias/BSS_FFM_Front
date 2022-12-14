package com.mx.totalplay.ffm.cloudweb.projectmanager.utils;

import java.io.Serializable;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import lombok.Data;

@Data
@Component
public class ConstBandejasEim implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@Value("${consultaBandejaSinEimApi}")
    private String consultaBandejaSinEimApi;
	
	@Value("${consultaListaEim}")
	private String consultaListaEim;
	
	@Value("${updateEim}")
	private String updateEim;

	//solTorreLiderTec
	@Value("${solTorreLiderTec}")
	private String solTorreLiderTec;
	
	@Value("${bandejaPendientes}")
    private String bandejaPendientes;
	
	@Value("${bandejaDependencias}")
    private String bandejaDependencias;
	
	@Value("${bandejaImplementacion}")
    private String bandejaImplementacion;
	
	@Value("${consultarValidacion}")
    private String consultarValidacion;

	@Value("${bandejaSolicitudesRechazadas}")
	private String bandejaSolicitudesRechazadas;

	@Value("${bandejaSolicitudesPendientes}")
	private String bandejaSolicitudesPendientes;
	
	@Value("${localizaOrden}")
    private String localizaOrden;
	
	@Value("${otDia}")
    private String otDia;
}
