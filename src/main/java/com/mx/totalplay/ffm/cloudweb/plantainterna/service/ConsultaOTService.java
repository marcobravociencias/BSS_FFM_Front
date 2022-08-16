package com.mx.totalplay.ffm.cloudweb.plantainterna.service;

import java.io.ByteArrayInputStream;

import com.mx.totalplay.ffm.cloudweb.plantainterna.model.consultaOTPI.ParamConsultaOTPI;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.DataTableResponse;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.ServiceResponseResult;

public interface ConsultaOTService {

	public DataTableResponse consultaOT(ParamConsultaOTPI paramsOT);

	public ServiceResponseResult consultaInformacionDetalleOt(String params);

	public ServiceResponseResult consultaMaterialesOts(String params);

	public ServiceResponseResult consultaInfoTrayectoria(String params);

    ServiceResponseResult consultaReporteConsultaOt(String params);

    ServiceResponseResult consultaDetallePostVenta(String params);

	ServiceResponseResult consultaPagos(String params);

    ServiceResponseResult consultaEvidencia(String params);

	ServiceResponseResult consultaDispositivos(String params);

    ServiceResponseResult consultaRecoleccionConsultaOt(String params);
    
    public ServiceResponseResult consultaOrdenesPlantaExternaOt(String params);
    
    public ByteArrayInputStream exportarExcelConsultaOT(String params);
}
