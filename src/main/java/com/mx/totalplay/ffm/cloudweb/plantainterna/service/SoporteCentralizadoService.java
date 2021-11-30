package com.mx.totalplay.ffm.cloudweb.plantainterna.service;

import com.mx.totalplay.ffm.cloudweb.utilerias.model.ServiceResponseResult;

public interface SoporteCentralizadoService {

    ServiceResponseResult consultaSeguimientoSoporte(String params);

    ServiceResponseResult consultaTicketSoporte(String params);

    ServiceResponseResult consultaDetalleSoporte(String params);



}
