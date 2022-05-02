package com.mx.totalplay.ffm.cloudweb.plantainterna.utils;

import lombok.Data;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Data
@Component
public class ConstSoporteCentralizado {
    private static final long serialVersionUID = 1L;

    @Value("${consultaSeguimientoSoporte}")
    private String consultaSeguimientoSoporte;

    @Value("${consultaTicketSoporte}")
    private String consultaTicketSoporte;

    @Value("${consultaDetalleSoporte}")
    private String consultaDetalleSoporte;
    
    @Value("${consultaFallasTicketSoporte}")
    private String consultaFallasTicketSoporte;
    
    @Value("${consultaHistoricoTicketSoporte}")
    private String consultaHistoricoTicketSoporte;
    
    @Value("${consultaTicketsSoporte}")
    private String consultaTicketsSoporte;
    
    @Value("${creaTicketSoporte}")
    private String creaTicketSoporte;
    
    @Value("${consultaPropietariosTicketSoporte}")
    private String consultaPropietariosTicketSoporte;
    
    @Value("${consultaCuentaClienteTicketSoporte}")
    private String consultaCuentaClienteTicketSoporte;

    @Value("${asignarIngenieroTicket}")
    private String asignarIngenieroTicket;
    
    @Value("${reasignarIngenieroTicket}")
    private String reasignarIngenieroTicket;

    @Value("${consultarAccionesDinamicoDetalle}")
    private String consultarAccionesDinamicoDetalle;

    @Value("${guardarTicketDetalle}")
    private String guardarTicketDetalle;
    
    @Value("${consultarDetalleTicketGestion}")
    private String consultarDetalleTicketGestion;
    
    @Value("${consultarEstatusTicket}")
    private String consultarEstatusTicket;
}
