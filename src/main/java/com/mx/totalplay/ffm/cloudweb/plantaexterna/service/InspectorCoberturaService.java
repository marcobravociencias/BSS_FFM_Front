package com.mx.totalplay.ffm.cloudweb.plantaexterna.service;

import com.mx.totalplay.ffm.cloudweb.utilerias.model.DataTableResponse;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.ServiceResponseResult;

public interface InspectorCoberturaService {

    public ServiceResponseResult consultarFallasCoberturaPE(String params);
    public ServiceResponseResult consultarFiltrosCoberturaPE(String params);
    public ServiceResponseResult consultarIncidenciasCoberturaPE(String params);
    public ServiceResponseResult ligarIncidencia(String params);

}
