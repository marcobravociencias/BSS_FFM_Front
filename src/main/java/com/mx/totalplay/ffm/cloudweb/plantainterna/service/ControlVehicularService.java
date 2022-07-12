package com.mx.totalplay.ffm.cloudweb.plantainterna.service;

import com.mx.totalplay.ffm.cloudweb.utilerias.model.ServiceResponseResult;

public interface ControlVehicularService {

    public ServiceResponseResult consultarMarcas();
    public ServiceResponseResult consultarColores();
    public ServiceResponseResult consultarSeguros();
    public ServiceResponseResult consultarEstatus();
    public ServiceResponseResult consultarOperaciones();
    public ServiceResponseResult consultarTipoCuadrilla();
    public ServiceResponseResult consultarEmpresas();
    public ServiceResponseResult consultarCentroCostos();
    public ServiceResponseResult consultarEncierros(String params);
    public ServiceResponseResult crearVehiculo(String params);
    public ServiceResponseResult consultarVehiculoPlaca(String params);
    public ServiceResponseResult consultarVehiculoUnico(String params);
    public ServiceResponseResult consultarVehiculos(String params);
    public ServiceResponseResult editarVehiculo(String params);
    public ServiceResponseResult consultarHistorialVehiculo(String params);
    public ServiceResponseResult eliminarVehiculo(String params);
    public ServiceResponseResult generarReporteControlVehicular(String params);
   
}
