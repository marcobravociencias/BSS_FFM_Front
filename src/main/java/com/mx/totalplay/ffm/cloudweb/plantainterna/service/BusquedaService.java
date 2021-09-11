package com.mx.totalplay.ffm.cloudweb.plantainterna.service;

import com.mx.totalplay.ffm.cloudweb.utilerias.model.ServiceResponseResult;

public interface BusquedaService {
    ServiceResponseResult busquedaGeneralSF(String params);

    ServiceResponseResult consultarDetalleObjectSF(String params);

    ServiceResponseResult consultarNoticias(String params);

    ServiceResponseResult crearNoticia(String params);

    ServiceResponseResult consultarEquiposConfigurados(String params);

    ServiceResponseResult consultarResumenFactura(String params);

    ServiceResponseResult consultarServicios(String params);

    ServiceResponseResult consultarIps(String params);
}
