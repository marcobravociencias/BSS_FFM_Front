package com.mx.totalplay.ffm.cloudweb.plantainterna.service;
import com.mx.totalplay.ffm.cloudweb.plantainterna.model.consultaOTPI.ParamConsultaOTPI;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.DataTableResponse;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.ServiceResponseResult;

public interface VistaChecklistService {
    public DataTableResponse consultaEvidenciasChecklist(ParamConsultaOTPI paramsOT);
    public ServiceResponseResult consultaDetalleEvidenciaChecklist(String params);
    public ServiceResponseResult guardarEvidenciaChecklist(String params);

}
