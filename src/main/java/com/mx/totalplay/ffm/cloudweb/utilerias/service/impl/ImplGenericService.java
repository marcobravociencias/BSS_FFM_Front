package com.mx.totalplay.ffm.cloudweb.utilerias.service.impl;


import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.mx.totalplay.ffm.cloudweb.plantainterna.service.ConsultaOTService;
import com.mx.totalplay.ffm.cloudweb.plantainterna.utils.ConstConsultaOT;
import com.mx.totalplay.ffm.cloudweb.plantainterna.utils.ConstControlVehicular;
import com.mx.totalplay.ffm.cloudweb.plantainterna.utils.ConstReportePI;
import com.mx.totalplay.ffm.cloudweb.plantainterna.utils.ConstReporteSF;
import com.mx.totalplay.ffm.cloudweb.plantainterna.utils.ConstTraspaso;
import com.mx.totalplay.ffm.cloudweb.utilerias.daos.GenericDao;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.LoginResult;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.ServiceResponseResult;
import com.mx.totalplay.ffm.cloudweb.utilerias.service.GenericService;
import com.mx.totalplay.ffm.cloudweb.utilerias.utils.ConstantesGeneric;
import com.mx.totalplay.ffm.cloudweb.utilerias.utils.ConsumeRest;
import com.mx.totalplay.ffm.cloudweb.utilerias.utils.UtileriaGeneral;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;


import org.codehaus.jackson.JsonFactory;
import org.codehaus.jackson.JsonParser;
import org.codehaus.jackson.JsonToken;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;


import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.util.CellReference;
import org.apache.poi.xssf.streaming.SXSSFSheet;
import org.apache.poi.xssf.streaming.SXSSFWorkbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

@Service
public class ImplGenericService  implements GenericService {
    private  final Logger logger = LogManager.getLogger(ImplGenericService.class.getName());
    private Gson gson = new Gson();
    private final GenericDao genericDao;
    private final Environment environment;


    @Autowired
    public ImplGenericService( GenericDao genericDao, Environment environment) {
        this.genericDao = genericDao;
        this.environment = environment;

    }

    @Override
    public ServiceResponseResult getNombresTablas() {
        ServiceResponseResult response = genericDao.getNombresTablas();
        return response;
    }

    @Override
    public ServiceResponseResult consultaQuery(String params) {
        ServiceResponseResult result = ServiceResponseResult.builder().build();
        JsonObject object = gson.fromJson(params, JsonObject.class);
        if (object.get("query").getAsString().toUpperCase().indexOf(environment.getProperty("param.select_query")) == 0)
            result = genericDao.consultarQuery(object.get("query").getAsString().toUpperCase());
        else if (object.get("query").getAsString().toUpperCase().indexOf(environment.getProperty("param.insert_query")) == 0 || object.get("query").getAsString().toUpperCase().indexOf(environment.getProperty("param.update_query")) == 0)
            result = genericDao.insetUpdateQuery(object.get("query").getAsString().toUpperCase());
        else
            result = ServiceResponseResult.builder()
                    .isRespuesta(false)
                    .resultDescripcion("No es una sentencia SQL.")
                    .build();

        return result;
    }
	
}
