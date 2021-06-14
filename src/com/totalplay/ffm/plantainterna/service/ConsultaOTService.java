package com.totalplay.ffm.plantainterna.service;

import com.totalplay.ffm.plantainterna.model.consultaOTPI.ParamConsultaOTPI;
import com.totalplay.ffm.utilerias.model.DataTableResponse;
import com.totalplay.ffm.utilerias.model.ServiceResponseResult;

public interface ConsultaOTService {
	public ServiceResponseResult consultaFiltros(String params);

	public DataTableResponse consultaOT(ParamConsultaOTPI paramsOT);

	public ServiceResponseResult consultaImagenesOt(String params);

	public ServiceResponseResult consultaInformacionDetalleOt(String params);

	public ServiceResponseResult consultaMaterialesOts(ParamConsultaOTPI paramsOT);

	public ServiceResponseResult getComentariosIntegrador(String params);

	public ServiceResponseResult historico(String params);

	public ServiceResponseResult consultaActividadTecnico(String params);

	public ServiceResponseResult consultaInfoTrayectoria(String params);

	public ServiceResponseResult consultaInformacionRed(String params);

	public ServiceResponseResult consultaCambioEquipo(String params);

}
