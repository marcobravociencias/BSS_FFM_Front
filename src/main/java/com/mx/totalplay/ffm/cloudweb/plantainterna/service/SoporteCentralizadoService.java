package com.mx.totalplay.ffm.cloudweb.plantainterna.service;

import com.mx.totalplay.ffm.cloudweb.plantainterna.model.consultaOTPI.ParamConsultaOTPI;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.DataTableResponse;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.ServiceResponseResult;

public interface SoporteCentralizadoService {

    ServiceResponseResult consultaSeguimientoSoporte(String params);

    ServiceResponseResult consultaTicketSoporteSeguimiento(String params);
    
    public ServiceResponseResult consultaFallasTicketSoporte();
    
    public ServiceResponseResult consultaHistoricoTicketSoporte(String params);
    
    public DataTableResponse consultaTicketsSoporte(ParamConsultaOTPI params);
    
    public ServiceResponseResult creaTicketSoporte(String params);
    
    public ServiceResponseResult consultaPropietariosTicketSoporte();
    
    public ServiceResponseResult consultaCuentaClienteTicketSoporte(String params);

    ServiceResponseResult asignarIngenieroTicket(String params);

    ServiceResponseResult consultarAccionesDinamicaDetalle();

    ServiceResponseResult guardarTicketDetalle(String params);
    
    public ServiceResponseResult consultarDetalleTicketGestion(String params) ;
    
    public ServiceResponseResult consultarEstatusTicket();
    
    public ServiceResponseResult consultarTecnologiaSoporte();
    
    public ServiceResponseResult consultarEquiposTicketSoporte();
    
    public ServiceResponseResult reasignarIngenieroTicket(String params);
    
    public ServiceResponseResult consultarIngenierosSoporte(String params);
    
    public ServiceResponseResult consultarModelosTicketSoporte();
}
