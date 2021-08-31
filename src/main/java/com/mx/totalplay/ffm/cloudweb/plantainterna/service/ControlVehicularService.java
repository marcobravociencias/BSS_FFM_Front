package com.mx.totalplay.ffm.cloudweb.plantainterna.service;

import com.mx.totalplay.ffm.cloudweb.utilerias.model.ServiceResponseResult;

public interface ControlVehicularService {

    public ServiceResponseResult consultarMarcas();
    public ServiceResponseResult consultarColores();
    public ServiceResponseResult consultarSeguros();
    public ServiceResponseResult consultarEstatus();
    public ServiceResponseResult crearVehiculo(String params);
    public ServiceResponseResult consultarVehiculoPlaca(String params);
   
}
