package com.mx.totalplay.ffm.cloudweb.plantainterna.service;

import com.mx.totalplay.ffm.cloudweb.utilerias.model.ServiceResponseResult;

public interface DisponibilidadService {
    ServiceResponseResult insertarDisponibilidad(String params);

    ServiceResponseResult consultarDisponibilidad(String params);

    ServiceResponseResult actualizarDisponibilidad(String params);
}
