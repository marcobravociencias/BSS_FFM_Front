package com.mx.totalplay.ffm.cloudweb.plantainterna.service;

import com.mx.totalplay.ffm.cloudweb.plantainterna.model.consultaOTPI.ParamConsultaOTPI;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.DataTableResponse;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.ServiceResponseResult;

public interface ConsultaOTService {

	public ServiceResponseResult consultaFiltros(String params);

	public DataTableResponse consultaOT(ParamConsultaOTPI paramsOT);

	public ServiceResponseResult consultaImagenesOt(String params);

	public ServiceResponseResult consultaInformacionDetalleOt(String params);

	public ServiceResponseResult consultaMaterialesOts(String params);

	public ServiceResponseResult consultaActividadTecnico(String params);

	public ServiceResponseResult consultaInfoTrayectoria(String params);

	public ServiceResponseResult consultaInformacionRed(String params);

	public ServiceResponseResult consultaCambioEquipo(String params);

    ServiceResponseResult consultaReporteConsultaOt(String params);

    ServiceResponseResult consultaDetallePostVenta(String params);

	ServiceResponseResult consultaPagos(String params);

    ServiceResponseResult consultaEvidencia(String params);

	ServiceResponseResult consultaDispositivos(String params);

    ServiceResponseResult consultaRecoleccionConsultaOt(String params);
    
    public ServiceResponseResult consultaOrdenesPlantaExternaOt(String params);
}
