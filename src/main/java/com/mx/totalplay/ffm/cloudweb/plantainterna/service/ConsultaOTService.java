package com.mx.totalplay.ffm.cloudweb.plantainterna.service;

import com.mx.totalplay.ffm.cloudweb.plantainterna.model.consultaOTPI.ParamConsultaOTPI;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.DataTableResponse;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.ServiceResponseResult;

public interface ConsultaOTService {

	public ServiceResponseResult consultaFiltros(String params);

	public DataTableResponse consultaOT(ParamConsultaOTPI paramsOT);
	//public DataTableResponse consultaOT(String paramsOT);

	public ServiceResponseResult consultaImagenesOt(String params);

	public ServiceResponseResult consultaInformacionDetalleOt(String params);

	public ServiceResponseResult consultaMaterialesOts(ParamConsultaOTPI paramsOT);
	//public ServiceResponseResult consultaMaterialesOts(String paramsOT);

	public ServiceResponseResult getComentariosIntegrador(String params);

	public ServiceResponseResult historico(String params);

	public ServiceResponseResult consultaActividadTecnico(String params);

	public ServiceResponseResult consultaInfoTrayectoria(String params);

	public ServiceResponseResult consultaInformacionRed(String params);

	public ServiceResponseResult consultaCambioEquipo(String params);
}
