package com.mx.totalplay.ffm.cloudweb.plantainterna.service;

import com.mx.totalplay.ffm.cloudweb.plantainterna.model.consultaOTPI.ParamConsultaOTPI;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.DataTableResponse;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.ServiceResponseResult;

public interface TraspasoService {


	public DataTableResponse consultaTraspasosOt(ParamConsultaOTPI paramsOT);

    public ServiceResponseResult consultaEvidenciaTraspaso(String params);
    
	public ServiceResponseResult consultaInformacionDetalleTraspaso(String params);
	
	public DataTableResponse consultaTraspasos(ParamConsultaOTPI paramsOT);
				
	public ServiceResponseResult consultarFactibilidad(String params);
	
	public ServiceResponseResult agendarTraspasoOt(String params);
	
	public ServiceResponseResult consultarMotivos();
	
	public ServiceResponseResult consultarCrmDisponibilidad(String params);
	
	public DataTableResponse consultarHistorico(ParamConsultaOTPI paramsOT);
		
	public ServiceResponseResult consultarTransferidasOt(String params);
}
