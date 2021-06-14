package com.totalplay.ffm.plantainterna.service;

import com.totalplay.ffm.plantainterna.model.ParamsReporteCoorPi;
import com.totalplay.ffm.plantainterna.model.ParamsReporteOTPI;
import com.totalplay.ffm.plantainterna.model.ParamsReporteOrdenesPI;
import com.totalplay.ffm.plantainterna.model.ParamsReportesPI;
import com.totalplay.ffm.utilerias.model.ServiceResponseResult;

public interface ReportesPIService {

	public ServiceResponseResult consultarReporteTecnico(ParamsReportesPI paramsRep);
	public ServiceResponseResult consultarCatalogosPI(String params);
	public ServiceResponseResult consultarReporteOTSPT(ParamsReporteOTPI paramsRep);
	public ServiceResponseResult consultarReporteCoordinador(ParamsReporteCoorPi paramsRep);
	public ServiceResponseResult consultarReporteTecnicoAux(ParamsReportesPI paramsRep);
	public ServiceResponseResult consultarReporteOrdenesTerminadas(ParamsReporteOrdenesPI paramsRep);
	public ServiceResponseResult consultarReporteOrdenesIntegrador(ParamsReporteOrdenesPI paramsRep);
}
