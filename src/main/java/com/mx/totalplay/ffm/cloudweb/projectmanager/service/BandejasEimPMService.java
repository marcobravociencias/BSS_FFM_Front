package com.mx.totalplay.ffm.cloudweb.projectmanager.service;

import com.mx.totalplay.ffm.cloudweb.projectmanager.model.ParamFFMBandejasEimVO;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.DataTableResponse;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.ServiceResponseResult;

public interface BandejasEimPMService {

	public DataTableResponse consultarBandejaEim(ParamFFMBandejasEimVO params);

	public DataTableResponse consultarPendientesPorImplementar(ParamFFMBandejasEimVO params);

	public ServiceResponseResult consultarSinEim();

	public ServiceResponseResult consultarListaEim();
	
	
}