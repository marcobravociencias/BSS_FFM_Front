package com.mx.totalplay.ffm.cloudweb.plantainterna.service;

import com.mx.totalplay.ffm.cloudweb.utilerias.model.ServiceResponseResult;

public interface BusquedaService {
    ServiceResponseResult busquedaGeneralSF(String params);

    ServiceResponseResult consultarDetalleObjectSF(String params);
}
