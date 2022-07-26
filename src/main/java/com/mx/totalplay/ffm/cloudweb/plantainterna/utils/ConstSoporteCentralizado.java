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

    @Value("${consultaTicketSeguimiento}")
    private String consultaTicketSeguimiento;

    @Value("${consultaDetalleSoporte}")
    private String consultaDetalleSoporte;
    
    @Value("${consultaEstatusSoporte}")
    private String consultaEstatusSoporte;
    
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

    
    @Value("${consultarDetalleTicketGestion}")
    private String consultarDetalleTicketGestion;
    
    @Value("${consultarEstatusTicket}")
    private String consultarEstatusTicket;
    
    @Value("${consultarTecnologiaSoporte}")
    private String consultarTecnologiaSoporte;
    
    @Value("${consultaEquiposTicketSoporte}")
    private String consultaEquiposTicketSoporte;
    
    @Value("${guardarDetalleTicketSoporte}")
    private String guardarDetalleTicketSoporte;
    
    @Value("${consultarIngenierosSoporte}")
    private String consultarIngenierosSoporte;
    
    @Value("${consultaModelosTicketSoporte}")
    private String consultaModelosTicketSoporte;
}
