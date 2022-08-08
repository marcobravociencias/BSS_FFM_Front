package com.mx.totalplay.ffm.cloudweb.plantainterna.service;

import com.mx.totalplay.ffm.cloudweb.utilerias.model.ServiceResponseResult;

public interface GestionPlanningService {

    ServiceResponseResult consultarPagosTecnico(String params);

    ServiceResponseResult liberarPagosTecnicos(String params);

    ServiceResponseResult restaurarContraseniaUsuario(String params);

    ServiceResponseResult gestionGeocercasPlanning(String params);
    
    ServiceResponseResult eliminarGeocercaPlanning(String params);
}
