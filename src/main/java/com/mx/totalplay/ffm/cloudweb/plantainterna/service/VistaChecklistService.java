package com.mx.totalplay.ffm.cloudweb.plantainterna.service;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.ServiceResponseResult;

public interface VistaChecklistService {
    public ServiceResponseResult consultaEvidenciasChecklist(String params);
    public ServiceResponseResult consultaDetalleEvidenciaChecklist(String params);
    public ServiceResponseResult guardarEvidenciaChecklist(String params);

}
