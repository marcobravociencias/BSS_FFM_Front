package com.mx.totalplay.ffm.cloudweb.projectmanager.service;

import com.mx.totalplay.ffm.cloudweb.projectmanager.model.ParamFFMBandejasEimVO;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.DataTableResponse;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.ServiceResponseResult;

public interface BandejasEimPMService {

	public DataTableResponse consultarBandejaEim(ParamFFMBandejasEimVO params);

	public DataTableResponse consultarPendientesPorImplementar(ParamFFMBandejasEimVO params);

	public ServiceResponseResult consultarSinEim(String params);

	public ServiceResponseResult consultarListaEim();

    public ServiceResponseResult updateEim(String params);

    //solTorreLiderTec
    public ServiceResponseResult solTorreLiderTec(String params);

    public ServiceResponseResult bandejaPendientes(String params);

    public ServiceResponseResult bandejaDependencias(String params);

    public ServiceResponseResult bandejaImplementacion(String params);

    public ServiceResponseResult consultarValidacion(String params);

    public ServiceResponseResult localizaOrden(String params);

    public ServiceResponseResult otDia(String params);

    //bandejaSolicitudesRechazadas
    public ServiceResponseResult bandejaSolicitudesRechazadas(String params);
    //bandejaSolicitudesPendientes
    public ServiceResponseResult bandejaSolicitudesPendientes(String params);
	
	
}