package com.mx.totalplay.ffm.cloudweb.plantainterna.service;

import com.mx.totalplay.ffm.cloudweb.utilerias.model.ServiceResponseResult;

public interface CambioStatusService {
    ServiceResponseResult cambioStatusOts(String params);
    ServiceResponseResult cambioStatusOtsAlertasGeneric(String params);
}
