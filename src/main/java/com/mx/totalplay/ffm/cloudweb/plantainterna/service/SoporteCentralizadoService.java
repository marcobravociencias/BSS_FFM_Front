package com.mx.totalplay.ffm.cloudweb.plantainterna.service;

import com.mx.totalplay.ffm.cloudweb.plantainterna.model.consultaOTPI.ParamConsultaOTPI;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.DataTableResponse;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.ServiceResponseResult;

public interface SoporteCentralizadoService {

    ServiceResponseResult consultaSeguimientoSoporte(String params);

    ServiceResponseResult consultaTicketSoporte(String params);

    ServiceResponseResult consultaDetalleSoporte(String params);
    
    public ServiceResponseResult consultaFallasTicketSoporte();
    
    public ServiceResponseResult consultaHistoricoTicketSoporte(String params);
    
    public DataTableResponse consultaTicketsSoporte(ParamConsultaOTPI paramTicketSoporte);
    
    public ServiceResponseResult creaTicketSoporte(String params);
    
    public ServiceResponseResult consultaPropietariosTicketSoporte();

}
