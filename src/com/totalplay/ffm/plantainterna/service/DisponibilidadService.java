package com.totalplay.ffm.plantainterna.service;

import com.totalplay.ffm.utilerias.model.ServiceResponseResult;

public interface DisponibilidadService {

	ServiceResponseResult insertarDisponibilidad(String params);

	ServiceResponseResult consultarDisponibilidad(String params);

	ServiceResponseResult actualizarDisponibilidad(String params);

	ServiceResponseResult consultarIntervenciones();

}
