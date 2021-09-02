package com.mx.totalplay.ffm.cloudweb.plantainterna.utils;

import lombok.Data;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Data
@Component
public class ConstBusqueda {
    private static final long serialVersionUID = 1L;

    @Value("${busquedaSaleForces}")
    private String busquedaSaleForces;

    @Value("${consultaDetalleObjetoSF}")
    private String consultaDetalleObjetoSF;
}
