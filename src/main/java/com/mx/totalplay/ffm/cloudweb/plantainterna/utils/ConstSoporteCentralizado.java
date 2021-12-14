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

}