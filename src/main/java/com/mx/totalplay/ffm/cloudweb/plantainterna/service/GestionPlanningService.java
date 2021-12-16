package com.mx.totalplay.ffm.cloudweb.plantainterna.service;

import com.mx.totalplay.ffm.cloudweb.utilerias.model.ServiceResponseResult;

public interface GestionPlanningService {

    ServiceResponseResult consultarPagosTecnico(String params);
    
    ServiceResponseResult liberarPagosTecnicos(String params);
}
