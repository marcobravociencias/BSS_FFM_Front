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

    @Value("${consultarNoticias}")
    private String consultarNoticias;

    @Value("${diResuSaleForcesComentario}")
    private String diResuSaleForcesComentario;

    @Value("${crearNoticias}")
    private String crearNoticias;

    @Value("${consultarEquiposConfigurados}")
    private String consultarEquiposConfigurados;
    
    @Value("${consultarEquipos}")
    private String consultarEquipos;
    
    @Value("${consultarCotizacionesEquipo}")
    private String consultarCotizacionesEquipo;

    @Value("${consultaResumenFacturaSF}")
    private String consultaResumenFacturaSF;

    @Value("${consultarServiciosSF}")
    private String consultarServiciosSF;

    @Value("${consultarIpsSF}")
    private String consultarIpsSF;
    
    @Value("${configurarServicios}")
    private String configurarServicios;
    
    @Value("${configurarDns}")
    private String configurarDns;
    
    @Value("${activarServicios}")
    private String activarServicios;
    
    @Value("${consultarEstatusActivacion}")
    private String consultarEstatusActivacion;
}
