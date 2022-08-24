package com.mx.totalplay.ffm.cloudweb.utilerias.service;

import java.io.ByteArrayInputStream;

import com.mx.totalplay.ffm.cloudweb.utilerias.model.ServiceResponseResult;

public interface GenericReporteSFExcelService {
    public ByteArrayInputStream generarExcelGenericRequest(String params);
    public ServiceResponseResult consultarInformacionExcelGenericPost(String params, String url, String method);
}
