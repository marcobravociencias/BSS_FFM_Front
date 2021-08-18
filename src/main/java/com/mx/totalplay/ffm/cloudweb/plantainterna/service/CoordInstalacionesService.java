package com.mx.totalplay.ffm.cloudweb.plantainterna.service;

import com.mx.totalplay.ffm.cloudweb.plantainterna.model.consultaOTPI.ParamConsultaOTPI;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.DataTableResponse;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.ServiceResponseResult;

public interface CoordInstalacionesService {
	
	public ServiceResponseResult busquedaGral(String params);
	
	public DataTableResponse consultaPendientesAgenda(ParamConsultaOTPI paramsOT);
	
	public DataTableResponse consultaRescataventas(ParamConsultaOTPI paramsOT);
	
	public DataTableResponse consultaPendientesActivar(ParamConsultaOTPI paramsOT);
	
	public DataTableResponse consultaCandelarizado(ParamConsultaOTPI paramsOT);
	
	public DataTableResponse consultaPlazasComerciales(ParamConsultaOTPI paramsOT);
	
	public DataTableResponse consultaCanceladas(ParamConsultaOTPI paramsOT);
	
	public DataTableResponse consultaReagenda(ParamConsultaOTPI paramsOT);
	
	public DataTableResponse consultaCalendarizadoVencido(ParamConsultaOTPI paramsOT);
	
	public DataTableResponse consultaTerminada(ParamConsultaOTPI paramsOT);
	
	public DataTableResponse consultaDetenidas(ParamConsultaOTPI paramsOt);
	
	public ServiceResponseResult consultaDetalleOTBsqGeneral(String params);
	

}
