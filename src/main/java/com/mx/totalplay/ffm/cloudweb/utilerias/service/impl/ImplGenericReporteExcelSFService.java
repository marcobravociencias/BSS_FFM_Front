package com.mx.totalplay.ffm.cloudweb.utilerias.service.impl;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.streaming.SXSSFSheet;
import org.apache.poi.xssf.streaming.SXSSFWorkbook;
import org.codehaus.jackson.JsonFactory;
import org.codehaus.jackson.JsonParser;
import org.codehaus.jackson.JsonToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

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
import com.mx.totalplay.ffm.cloudweb.utilerias.service.GenericReporteSFExcelService;
import com.mx.totalplay.ffm.cloudweb.utilerias.utils.ConstantesGeneric;
import com.mx.totalplay.ffm.cloudweb.utilerias.utils.ConsumeRest;
import com.mx.totalplay.ffm.cloudweb.utilerias.utils.UtileriaGeneral;


import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.LoginResult;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.codehaus.jackson.JsonFactory;
import org.codehaus.jackson.JsonParser;
import org.codehaus.jackson.JsonToken;
import org.json.JSONObject;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.util.CellReference;
import org.apache.poi.xssf.streaming.SXSSFSheet;
import org.apache.poi.xssf.streaming.SXSSFWorkbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

@Service
public class ImplGenericReporteExcelSFService implements GenericReporteSFExcelService{
	
	
    private  final Logger logger = LogManager.getLogger(ImplGenericReporteExcelSFService.class.getName());

    
    private Gson gson = new Gson();
    private final ConsumeRest restCaller;
    private final UtileriaGeneral utilerias;
    private final ConstConsultaOT constConsultaOT;
    private final ConstReportePI constReportePI;
    private final ConstControlVehicular constControlVehicular;
    private final ConstTraspaso constTraspaso;
	private final ConstantesGeneric constantesAmbiente;
	private final ConstReporteSF constReportesSF;
	
    
    @Autowired
	public ImplGenericReporteExcelSFService(ConsumeRest restCaller, UtileriaGeneral utilerias, ConstConsultaOT constConsultaOT,
    		ConstReportePI constReportePI, ConstControlVehicular constControlVehicular, ConstTraspaso constTraspaso, ConstantesGeneric constantesAmbiente,
    		ConstReporteSF constReportesSF) {
    	
		this.restCaller = restCaller;
        this.utilerias = utilerias;
        this.constConsultaOT = constConsultaOT;
        this.constReportePI = constReportePI;
        this.constControlVehicular = constControlVehicular;
        this.constTraspaso = constTraspaso;
        this.constantesAmbiente = constantesAmbiente;
        this.constReportesSF = constReportesSF;
    }


	@Override
	public ByteArrayInputStream generarExcelGenericRequest(String params) {
		JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
		String tipoExcel = jsonObject.get("tipoExcel").getAsString();
		
		String method="";	
		JsonElement jsonMetodo = jsonObject.get("metodoConsumo");
		logger.info("JSON METODO EXCEL "+jsonMetodo );
		if(jsonMetodo!=null)
			method=jsonMetodo.getAsString();
		else
			method="POST";
			
		/**
		case "reportepi-tecnicostiposordenes-pi":
			return generarExcelGenericRequest(params, "");
		case "reportelog-consultarlog-pi":
			return generarExcelGenericRequest(params, "GET");
		case "vehiculos-consultarvehiculos-pi":
		return generarExcelGenericRequest(params, "GET");
		**/
		
		logger.info("ImplGenericService.class [metodo = exporteExcelGenericRequest() ] ");
		boolean isRetornarBanderaBytes=false;
		byte[] bytesJSONArchivo=null;

		ServiceResponseResult response = null;
		JsonArray array = null;
				
		switch (tipoExcel) {
			case "consultaot-consultarordenes-pi":
				response = consultarInformacionExcelGenericPost(params, constConsultaOT.getConsultaGeneralOt(), method);
				if (response.getResult() == null || response.getResult() instanceof Integer) {
				} else {
					JsonObject jsonObjectResponse = gson.fromJson(gson.toJson(response.getResult()), JsonObject.class);
		            array = jsonObjectResponse.getAsJsonArray("ordenes");
				}
				break;
			case "reportepi-seguimientodiario-pi":
				response = consultarInformacionExcelGenericPost(params, constReportePI.getConsultarReporteDiario(), method);
				if (response.getResult() == null || response.getResult() instanceof Integer) {
				} else {
					JsonObject jsonObjectResponse = gson.fromJson(gson.toJson(response.getResult()), JsonObject.class);
		            array = jsonObjectResponse.getAsJsonArray("ordenes");
				}
				break;
			case "reportepi-cierrediario-pi":
				response = consultarInformacionExcelGenericPost(params, constReportePI.getConsultarCierreDiario(), method);
				if (response.getResult() == null || response.getResult() instanceof Integer) {
				} else {
					JsonObject jsonObjectResponse = gson.fromJson(gson.toJson(response.getResult()), JsonObject.class);
		            array = jsonObjectResponse.getAsJsonArray("ordenes");
				}
				break;
			case "reportepi-asignadascompensacion-pi":
				response = consultarInformacionExcelGenericPost(params, constReportePI.getConsultarAsignadasCompensacion(), method);
				if (response.getResult() == null || response.getResult() instanceof Integer) {
				} else {
					JsonObject jsonObjectResponse = gson.fromJson(gson.toJson(response.getResult()), JsonObject.class);
					array = jsonObjectResponse.getAsJsonArray("ordenes");
				}
				break;
			case "reportepi-tecnicostiposordenes-pi":
				JsonObject jsonObjectTecnicos = gson.fromJson(params, JsonObject.class);
				JsonArray tecnicosArray = jsonObjectTecnicos.getAsJsonArray("listTecnicos");
		        JsonArray tecnicosReporte = new JsonArray();
		        JsonObject tecnicosR = new JsonObject();
		        if (tecnicosArray.size() > 0) {
		        	for (int i = 0; i < tecnicosArray.size(); i++) {
		        		JsonObject object = (JsonObject) tecnicosArray.get(i);
		        		JsonObject jsonObjTecnico = gson.fromJson(tecnicosArray.get(i), JsonObject.class);
		                JsonArray objListaSkills = jsonObjTecnico.getAsJsonArray("listaSkills");
		                JsonObject result = new JsonObject();
		                result.add("Cuadrilla", object.get("nombretecnico"));
		                result.addProperty("Usuario FFM", object.get("usuario") != null && object.get("usuario").getAsString() != "" ? object.get("usuario").getAsString() : "");
		                for (int s = 0; s < objListaSkills.size(); s++) {
		                	JsonObject objectSkill = (JsonObject) objListaSkills.get(s);
		                    result.addProperty(objectSkill.get("descripcion").getAsString(), objectSkill.get("isRegistrada") != null && objectSkill.get("isRegistrada").getAsString() != "" && objectSkill.get("isRegistrada").getAsString().equals("true") ? "✓" : "-");
		                }
		                tecnicosReporte.add(result);
		        	}
		        	tecnicosR.add("tecnicos", tecnicosReporte);
					array = tecnicosR.getAsJsonArray("tecnicos");
		        } 
				break;
			case "vehiculos-consultarvehiculos-pi":
				response = consultarInformacionExcelGenericPost(params, constControlVehicular.getReporteControlVehicular(), method);
				if (response.getResult() == null || response.getResult() instanceof Integer) {
				} else {
					JsonObject jsonObjectResponse = gson.fromJson(gson.toJson(response.getResult()), JsonObject.class);
		            array = jsonObjectResponse.getAsJsonArray("vehiculos");
				}
				break;
			case "traspasos-consultarots-pi":
				response = consultarInformacionExcelGenericPost(params, constTraspaso.getConsultaGeneralTraspasosOt(), method);
				if (response.getResult() == null || response.getResult() instanceof Integer) {
				} else {
					JsonObject jsonObjectResponse = gson.fromJson(gson.toJson(response.getResult()), JsonObject.class);
		            array = jsonObjectResponse.getAsJsonArray("ordenes");
				}
				break;
			case "traspasos-consultartraspasos-pi":
				response = consultarInformacionExcelGenericPost(params, constTraspaso.getConsultaGeneralTraspasos(), method);
				if (response.getResult() == null || response.getResult() instanceof Integer) {
				} else {
					JsonObject jsonObjectResponse = gson.fromJson(gson.toJson(response.getResult()), JsonObject.class);
		            array = jsonObjectResponse.getAsJsonArray("ordenes");
				}
				break;
			case "traspasos-consultarhistorico-pi":
				response = consultarInformacionExcelGenericPost(params, constTraspaso.getConsultaGeneralHistorico(), method);
				if (response.getResult() == null || response.getResult() instanceof Integer) {
				} else {
					JsonObject jsonObjectResponse = gson.fromJson(gson.toJson(response.getResult()), JsonObject.class);
		            array = jsonObjectResponse.getAsJsonArray("ordenes");
				}
				break;
			case "reportelog-consultarlog-pi":
				response = consultarInformacionExcelGenericPost(params, constantesAmbiente.getConsultarAccionesRealizadas(), method);
				if (response.getResult() == null || response.getResult() instanceof Integer) {
				} else {
					JsonObject jsonObjectResponse = gson.fromJson(gson.toJson(response.getResult()), JsonObject.class);
					JsonArray modulosArray = jsonObjectResponse.getAsJsonArray("modulos");
					JsonArray modulosReporte = new JsonArray();
					if (modulosArray.size() > 0) {
						for (int i = 0; i < modulosArray.size(); i++) {
							JsonObject object = (JsonObject) modulosArray.get(i);
	
							if (object.get("descripcionEstatusHttp") != null) {
								
								switch (object.get("descripcionEstatusHttp").getAsString()) {
								case "success":
									object.addProperty("descripcionEstatusHttp", "Éxito");
									break;
	
								case "error":
									object.addProperty("descripcionEstatusHttp", "Error");
									break;
	
								case "warning":
									object.addProperty("descripcionEstatusHttp", "Advertencia");
									break;
	
								case "info":
									object.addProperty("descripcionEstatusHttp", "Informativo");
									break;
	
								default:
									break;
								}
							}
							modulosReporte.add(object);

						}
					}
		            array = modulosReporte;
		            
				}
				break;
			case "reportelog-consultarloggeneral-pi":
				response = consultarInformacionExcelGenericPost(params, constantesAmbiente.getConsultarReporteLogGeneral(), method);
				if (response.getResult() == null || response.getResult() instanceof Integer) {
				} else {
					JsonObject jsonObjectResponse = gson.fromJson(gson.toJson(response.getResult()), JsonObject.class);
					JsonArray modulosArray = jsonObjectResponse.getAsJsonArray("modulos");
					JsonArray modulosReporte = new JsonArray();
					if (modulosArray.size() > 0) {
						for (int i = 0; i < modulosArray.size(); i++) {
							JsonObject object = (JsonObject) modulosArray.get(i);
	
							if (object.get("descripcionEstatusHttp") != null) {
								
								switch (object.get("descripcionEstatusHttp").getAsString()) {
								case "success":
									object.addProperty("descripcionEstatusHttp", "Éxito");
									break;
	
								case "error":
									object.addProperty("descripcionEstatusHttp", "Error");
									break;
	
								case "warning":
									object.addProperty("descripcionEstatusHttp", "Advertencia");
									break;
	
								case "info":
									object.addProperty("descripcionEstatusHttp", "Informativo");
									break;
	
								default:
									break;
								}
							}
							modulosReporte.add(object);

						}
					}
		            array = modulosReporte;
		            
				}
				break;
			case "despachopi-seguimientodiario-pi":
				response = consultarInformacionExcelGenericPost(params, constReportePI.getConsultarReporteDiario(), method);
				if (response.getResult() == null || response.getResult() instanceof Integer) {
				} else {
					JsonObject jsonObjectResponse = gson.fromJson(gson.toJson(response.getResult()), JsonObject.class);
		            array = jsonObjectResponse.getAsJsonArray("ordenes");
				}
				break;
			case "reportesf-backloginstalaciones-pi"://Imprimir
				response = consultarInformacionExcelGenericPost(params, constReportesSF.getConsultaReporteBacklog(), method);
				if (response.getResult() == null || response.getResult() instanceof Integer) {
				} else {
					JsonObject jsonObjectResponse = gson.fromJson(gson.toJson(response.getResult()), JsonObject.class);
					JsonArray dataArray = jsonObjectResponse.getAsJsonArray("data");
					JsonArray dataReporte = new JsonArray();
					if (dataArray.size() > 0) {
						for (int i = 0; i < dataArray.size(); i++) {
							JsonObject object = (JsonObject) dataArray.get(i);
							
							try {
								if (object.get("confirmada") != null && object.get("confirmada").getAsBoolean()) {
									object.addProperty("confirmada", "Si");
								}else {
									object.addProperty("confirmada", "No");
								}
							}catch(Exception e) {
								object.addProperty("confirmada", "No");
							}
							dataReporte.add(object);

						}
					}
		            array = dataReporte;
				}
				break;
			case "reportesf-backlog-pi":
				response = consultarInformacionExcelGenericPost(params, constReportesSF.getConsultaReporteBacklog(), method);
				if (response.getResult() == null || response.getResult() instanceof Integer) {
				} else {
					JsonObject jsonObjectResponse = gson.fromJson(gson.toJson(response.getResult()), JsonObject.class);
					JsonArray dataArray = jsonObjectResponse.getAsJsonArray("data");
					JsonArray dataReporte = new JsonArray();
					if (dataArray.size() > 0) {
						for (int i = 0; i < dataArray.size(); i++) {
							JsonObject object = (JsonObject) dataArray.get(i);
							
							try {
								if (object.get("repetido") != null && object.get("repetido").getAsBoolean()) {
									object.addProperty("repetido", "Si");
								}else {
									object.addProperty("repetido", "No");
								}
							}catch(Exception e) {
								object.addProperty("repetido", "No");
							}
					
							
							try {
								if (object.get("confirmada") != null && object.get("confirmada").getAsBoolean()) {
									object.addProperty("confirmada", "Si");
								}else {
									object.addProperty("confirmada", "No");
								}
							}catch(Exception e) {
								object.addProperty("confirmada", "No");
							}
						
							dataReporte.add(object);

						}
					}
		            array = dataReporte;
				}
				break;
	
			case "reportesf-ingresoresidencial-pi":
				response = consultarInformacionExcelGenericPost(params, constReportesSF.getConsultaReporteIngresoResidencial(), method);
				if (response.getResult() == null || response.getResult() instanceof Integer) {
				} else {
					JsonObject jsonObjectResponse = gson.fromJson(gson.toJson(response.getResult()), JsonObject.class);
		            array = jsonObjectResponse.getAsJsonArray("data");
				}
				break;
			case "reportesf-ingresoempresarial-pi":
				response = consultarInformacionExcelGenericPost(params, constReportesSF.getConsultaReporteIngresoEmpresarial(), method);
				if (response.getResult() == null || response.getResult() instanceof Integer) {
				} else {
					JsonObject jsonObjectResponse = gson.fromJson(gson.toJson(response.getResult()), JsonObject.class);
		            array = jsonObjectResponse.getAsJsonArray("data");
				}
				break;
			case "reportesf-ingresoempresarialsa-pi":
				response = consultarInformacionExcelGenericPost(params, constReportesSF.getConsultaReporteIngresoEmpresarialSinAgenda(), method);
				if (response.getResult() == null || response.getResult() instanceof Integer) {
				} else {
					JsonObject jsonObjectResponse = gson.fromJson(gson.toJson(response.getResult()), JsonObject.class);
		            array = jsonObjectResponse.getAsJsonArray("data");
				}
				break;
			case "reportesf-completadosoportes-pi":
				response = consultarInformacionExcelGenericPost(params, constReportesSF.getConsultaReporteCompletosSoporte(), method);
				if (response.getResult() == null || response.getResult() instanceof Integer) {
				} else {
					JsonObject jsonObjectResponse = gson.fromJson(gson.toJson(response.getResult()), JsonObject.class);
					JsonArray dataArray = jsonObjectResponse.getAsJsonArray("data");
					JsonArray dataReporte = new JsonArray();
					if (dataArray.size() > 0) {
						for (int i = 0; i < dataArray.size(); i++) {
							JsonObject object = (JsonObject) dataArray.get(i);
							try {
								if (object.get("repetido") !=null &&  Boolean.parseBoolean( object.get("repetido").getAsString()  ) ){
									object.addProperty("repetido", "Si");
								}else {
									object.addProperty("repetido", "No");
								}
							}catch(Exception e) {
								object.addProperty("repetido", "No");
							}
							try {							
								if (object.get("repetido60") !=null &&  Boolean.parseBoolean( object.get("repetido60").getAsString()  ) ){
									object.addProperty("repetido60", "Si");
								}else {
									object.addProperty("repetido60", "No");
								}
							}catch(Exception e) {
								object.addProperty("repetido60", "No");
							}			
							dataReporte.add(object);

						}
					}
		            array = dataReporte;
				}
				break;
			case "reportesf-completadoresidencial-pi":
				response = consultarInformacionExcelGenericPost(params, constReportesSF.getConsultaReporteCompletosResidencial(), method);
				if (response.getResult() == null || response.getResult() instanceof Integer) {
				} else {
					JsonObject jsonObjectResponse = gson.fromJson(gson.toJson(response.getResult()), JsonObject.class);
					JsonArray dataArray = jsonObjectResponse.getAsJsonArray("data");
					JsonArray dataReporte = new JsonArray();
					if (dataArray.size() > 0) {
						for (int i = 0; i < dataArray.size(); i++) {
							JsonObject object = (JsonObject) dataArray.get(i);
							try {
								if (object.get("ventaExpress") !=null && object.get("ventaExpress").getAsBoolean()) {
									object.addProperty("ventaExpress", "Si");
								}else {
									object.addProperty("ventaExpress", "No");
								}
							}catch(Exception e) {
								object.addProperty("ventaExpress", "No");
							}	
							dataReporte.add(object);

						}
					}
		            array = dataReporte;
				}
				break;
				
			case "reportesf-completadoempresarial-pi":
				response = consultarInformacionExcelGenericPost(params, constReportesSF.getConsultaReporteCompletosEmpresarial(), method);
				if (response.getResult() == null || response.getResult() instanceof Integer) {
				} else {
					JsonObject jsonObjectResponse = gson.fromJson(gson.toJson(response.getResult()), JsonObject.class);
		            array = jsonObjectResponse.getAsJsonArray("data");
				}
				break;
			case "reportesf-ingresosoportes-pi":
				logger.info("----------- reportesf-ingresosoportes-pi");
				
				isRetornarBanderaBytes=true;
				bytesJSONArchivo=consultarInformacionBytesArrayGeneric(params, constReportesSF.getConsultaReporteIngresoSoporteExporte(), method );
				logger.info("exporte excel desde aqui completadoempresarial");
			/**	response = consultarInformacionExcelGenericPost(params, constReportesSF.getConsultaReporteIngresoSoporte(), method);
				if (response.getResult() == null || response.getResult() instanceof Integer) {
				} else {
					JsonObject jsonObjectResponse = gson.fromJson(gson.toJson(response.getResult()), JsonObject.class);
					JsonArray dataArray = jsonObjectResponse.getAsJsonArray("data");
					JsonArray dataReporte = new JsonArray();
					if (dataArray.size() > 0) {
						for (int i = 0; i < dataArray.size(); i++) {
							JsonObject object = (JsonObject) dataArray.get(i);
							if (object.get("repetido").getAsBoolean()) {
								object.addProperty("repetido", "Si");
							}else {
								object.addProperty("repetido", "No");
							}
							if (object.get("repetido60").getAsBoolean()) {
								object.addProperty("repetido60", "Si");
							}else {
								object.addProperty("repetido60", "No");
							}
							if (object.get("tsCancelado").getAsBoolean()) {
								object.addProperty("tsCancelado", "Si");
							}else {
								object.addProperty("tsCancelado", "No");
							}
							dataReporte.add(object);

						}
					}
		            array = dataReporte;
				}*/
				break;
			case "reportesf-sitiosfibrados-pi":
				response = consultarInformacionExcelGenericPost(params, constReportesSF.getExportaReporteSitiosFibrados(), method);
				if (response.getResult() == null || response.getResult() instanceof Integer) {
				} else {
					JsonObject jsonObjectResponse = gson.fromJson(gson.toJson(response.getResult()), JsonObject.class);
		            array = jsonObjectResponse.getAsJsonArray("resultado");
				}
				break;
			case "reportesf-redessociales-pi":
				response = consultarInformacionExcelGenericPost(params, constReportesSF.getExportaReporteRedesSociales(), method);
				if (response.getResult() == null || response.getResult() instanceof Integer) {
				} else {
					JsonObject jsonObjectResponse = gson.fromJson(gson.toJson(response.getResult()), JsonObject.class);
					JsonArray dataArray = jsonObjectResponse.getAsJsonArray("resultado");
					JsonArray dataReporte = new JsonArray();
					if (dataArray.size() > 0) {
						for (int i = 0; i < dataArray.size(); i++) {
							JsonObject object = (JsonObject) dataArray.get(i);
							try {
								if (object.get("creaOs") !=null &&  Boolean.parseBoolean( object.get("creaOs").getAsString()  )) {
									object.addProperty("creaOs", "Si");
								}else {
									object.addProperty("creaOs", "No");
								}
							}catch(Exception e) {
								object.addProperty("creaOs", "No");
							}	
							dataReporte.add(object);

						}
					}
		            array = dataReporte;
				}
				break;
			case "reportesf-generados-pi":
				response = consultarInformacionExcelGenericPost(params, constReportesSF.getExportaReporteGenerados(), method);
				if (response.getResult() == null || response.getResult() instanceof Integer) {
				} else {
					JsonObject jsonObjectResponse = gson.fromJson(gson.toJson(response.getResult()), JsonObject.class);
					JsonArray dataArray = jsonObjectResponse.getAsJsonArray("resultado");
					JsonArray dataReporte = new JsonArray();
					if (dataArray.size() > 0) {
						for (int i = 0; i < dataArray.size(); i++) {
							JsonObject object = (JsonObject) dataArray.get(i);
							try {
								if (object.get("repetido") !=null &&  Boolean.parseBoolean( object.get("repetido").getAsString()  )) {
									object.addProperty("repetido", "Si");
								}else {
									object.addProperty("repetido", "No");
								}
							}catch(Exception e) {
								object.addProperty("repetido", "No");
							}	
							dataReporte.add(object);

						}
					}
		            array = dataReporte;
				}
				break;
			case "reportesf-planningagenda-pi":
				response = consultarInformacionExcelGenericPost(params, constReportesSF.getExportaReportePlanningAgenda(), method);
				if (response.getResult() == null || response.getResult() instanceof Integer) {
				} else {
					JsonObject jsonObjectResponse = gson.fromJson(gson.toJson(response.getResult()), JsonObject.class);
		            array = jsonObjectResponse.getAsJsonArray("resultado");
				}
				break;
			case "reportesf-planningaddon-pi":
				response = consultarInformacionExcelGenericPost(params, constReportesSF.getExportaReportePlanningAddon(), method);
				if (response.getResult() == null || response.getResult() instanceof Integer) {
				} else {
					JsonObject jsonObjectResponse = gson.fromJson(gson.toJson(response.getResult()), JsonObject.class);
		            array = jsonObjectResponse.getAsJsonArray("resultado");
				}
				break;
			case "reportesf-compleproact-pi":
				response = consultarInformacionExcelGenericPost(params, constReportesSF.getExportaReporteCompletosProactivos(), method);
				if (response.getResult() == null || response.getResult() instanceof Integer) {
				} else {
					JsonObject jsonObjectResponse = gson.fromJson(gson.toJson(response.getResult()), JsonObject.class);
		            array = jsonObjectResponse.getAsJsonArray("resultado");
				}
				break;
			case "reportesf-complecambdomic-pi":
				response = consultarInformacionExcelGenericPost(params, constReportesSF.getExportaReporteCompletosCambioDomicilio(), method);
				if (response.getResult() == null || response.getResult() instanceof Integer) {
				} else {
					JsonObject jsonObjectResponse = gson.fromJson(gson.toJson(response.getResult()), JsonObject.class);
					JsonArray dataArray = jsonObjectResponse.getAsJsonArray("resultado");
					JsonArray dataReporte = new JsonArray();
					if (dataArray.size() > 0) {
						for (int i = 0; i < dataArray.size(); i++) {
							JsonObject object = (JsonObject) dataArray.get(i);
							try {
								if (object.get("repetido60") !=null &&  Boolean.parseBoolean( object.get("repetido60").getAsString()  )) {
									object.addProperty("repetido60", "Si");
								}else { 
									object.addProperty("repetido60", "No");
								}
							}catch(Exception e) {
								object.addProperty("repetido60", "No");
							}	
							dataReporte.add(object);

						}
					}
		            array = dataReporte;
				}
				break;
			case "reportesf-complesoportempr-pi":
				response = consultarInformacionExcelGenericPost(params, constReportesSF.getExportaReporteCompletosSoporteEmpresarial(), method);
				if (response.getResult() == null || response.getResult() instanceof Integer) {
				} else {
					JsonObject jsonObjectResponse = gson.fromJson(gson.toJson(response.getResult()), JsonObject.class);
					JsonArray dataArray = jsonObjectResponse.getAsJsonArray("resultado");
					JsonArray dataReporte = new JsonArray();
					if (dataArray.size() > 0) {
						for (int i = 0; i < dataArray.size(); i++) {
							JsonObject object = (JsonObject) dataArray.get(i);
							try {
								if (object.get("repetido60") !=null &&  Boolean.parseBoolean( object.get("repetido60").getAsString()  )) {
									object.addProperty("repetido60", "Si");
								}else {
									object.addProperty("repetido60", "No");
								}
							}catch(Exception e) {
								object.addProperty("repetido60", "No");
							}	
							dataReporte.add(object);

						}
					}
		            array = dataReporte;
				}
				break;
			case "reportesf-backlogproact-pi":
				response = consultarInformacionExcelGenericPost(params, constReportesSF.getExportaReporteBacklogProactivos(), method);
				if (response.getResult() == null || response.getResult() instanceof Integer) {
				} else {
					JsonObject jsonObjectResponse = gson.fromJson(gson.toJson(response.getResult()), JsonObject.class);
					JsonArray dataArray = jsonObjectResponse.getAsJsonArray("resultado");
					JsonArray dataReporte = new JsonArray();
					if (dataArray.size() > 0) {
						for (int i = 0; i < dataArray.size(); i++) {
							JsonObject object = (JsonObject) dataArray.get(i);
							try {
								if (object.get("repetido") !=null &&  Boolean.parseBoolean( object.get("repetido").getAsString()  ) ){
									object.addProperty("repetido", "Si");
								}else {
									object.addProperty("repetido", "No");
								}
							}catch(Exception e) {
								object.addProperty("repetido", "No");
							}
								
							dataReporte.add(object);
						}
					}
		            array = dataReporte;
				}
				break;
			case "reportesf-ingresoproact-pi":
				response = consultarInformacionExcelGenericPost(params, constReportesSF.getExportaReporteIngresoProactivo(), method);
				if (response.getResult() == null || response.getResult() instanceof Integer) {
				} else {
					JsonObject jsonObjectResponse = gson.fromJson(gson.toJson(response.getResult()), JsonObject.class);
					JsonArray dataArray = jsonObjectResponse.getAsJsonArray("resultado");
					JsonArray dataReporte = new JsonArray();
					if (dataArray.size() > 0) {
						for (int i = 0; i < dataArray.size(); i++) {
							JsonObject object = (JsonObject) dataArray.get(i);
							if (object.get("repetido").getAsBoolean()) {
								object.addProperty("repetido", "Si");
							}else {
								object.addProperty("repetido", "No");
							}
							dataReporte.add(object);

						}
					}
		            array = dataReporte;
				}
				break;
			case "reportesf-factibilcerrados-pi":
				response = consultarInformacionExcelGenericPost(params, constReportesSF.getExportaReporteFactibilidadCerrados(), method);
				if (response.getResult() == null || response.getResult() instanceof Integer) {
				} else {
					JsonObject jsonObjectResponse = gson.fromJson(gson.toJson(response.getResult()), JsonObject.class);
		            array = jsonObjectResponse.getAsJsonArray("resultado");
				}
				break;
			case "reportesf-factibilcancelados-pi":
				response = consultarInformacionExcelGenericPost(params, constReportesSF.getExportaReporteFactibilidadCancelados(), method);
				if (response.getResult() == null || response.getResult() instanceof Integer) {
				} else {
					JsonObject jsonObjectResponse = gson.fromJson(gson.toJson(response.getResult()), JsonObject.class);
		            array = jsonObjectResponse.getAsJsonArray("resultado");
				}
				break;
			case "reportesf-planningnuevosaddon-pi":
				response = consultarInformacionExcelGenericPost(params, constReportesSF.getExportaReportePlanningNuevosAddon(), method);
				if (response.getResult() == null || response.getResult() instanceof Integer) {
				} else {
					JsonObject jsonObjectResponse = gson.fromJson(gson.toJson(response.getResult()), JsonObject.class);
					JsonArray dataArray = jsonObjectResponse.getAsJsonArray("resultado");
					JsonArray dataReporte = new JsonArray();
					if (dataArray.size() > 0) {
						for (int i = 0; i < dataArray.size(); i++) {
							JsonObject object = (JsonObject) dataArray.get(i);
							if (object.get("repetido").getAsBoolean()) {
								object.addProperty("repetido", "Si");
							}else {
								object.addProperty("repetido", "No");
							}
							dataReporte.add(object);

						}
					}
		            array = dataReporte;
				}
				break;
			case "reportesf-planningcompleord-pi":
				response = consultarInformacionExcelGenericPost(params, constReportesSF.getExportaReportePlanningCompletadosOrdenes(), method);
				if (response.getResult() == null || response.getResult() instanceof Integer) {
				} else {
					JsonObject jsonObjectResponse = gson.fromJson(gson.toJson(response.getResult()), JsonObject.class);
		            array = jsonObjectResponse.getAsJsonArray("resultado");
				}
				break;
			case "reportesf-planningcompaddon-pi":
				response = consultarInformacionExcelGenericPost(params, constReportesSF.getExportaReportePlanningCompletadosAddon(), method);
				if (response.getResult() == null || response.getResult() instanceof Integer) {
				} else {
					JsonObject jsonObjectResponse = gson.fromJson(gson.toJson(response.getResult()), JsonObject.class);
		            array = jsonObjectResponse.getAsJsonArray("resultado");
				}
				break;
			case "reportesf-ventasinstalacion-pi":
				response = consultarInformacionExcelGenericPost(params, constReportesSF.getExportaReporteVentasInstalacion(), method);
				if (response.getResult() == null || response.getResult() instanceof Integer) {
				} else {
					JsonObject jsonObjectResponse = gson.fromJson(gson.toJson(response.getResult()), JsonObject.class);
		            array = jsonObjectResponse.getAsJsonArray("resultado");
				}
				break;
			case "reportesf-recolecgenerados-pi":
				response = consultarInformacionExcelGenericPost(params, constReportesSF.getExportaReporteRecoleccionGeneradas(), method);
				if (response.getResult() == null || response.getResult() instanceof Integer) {
				} else {
					JsonObject jsonObjectResponse = gson.fromJson(gson.toJson(response.getResult()), JsonObject.class);
					JsonArray dataArray = jsonObjectResponse.getAsJsonArray("resultado");
					JsonArray dataReporte = new JsonArray();
					if (dataArray.size() > 0) {
						for (int i = 0; i < dataArray.size(); i++) {
							JsonObject object = (JsonObject) dataArray.get(i);
							if (object.get("repetido").getAsBoolean()) {
								object.addProperty("repetido", "Si");
							}else {
								object.addProperty("repetido", "No");
							}
							dataReporte.add(object);

						}
					}
		            array = dataReporte;
				}
				break;
			case "reportesf-recolecagendadas-pi":
				response = consultarInformacionExcelGenericPost(params, constReportesSF.getExportaReporteRecoleccionAgendadas(), method);
				if (response.getResult() == null || response.getResult() instanceof Integer) {
				} else {
					JsonObject jsonObjectResponse = gson.fromJson(gson.toJson(response.getResult()), JsonObject.class);
					JsonArray dataArray = jsonObjectResponse.getAsJsonArray("resultado");
					JsonArray dataReporte = new JsonArray();
					if (dataArray.size() > 0) {
						for (int i = 0; i < dataArray.size(); i++) {
							JsonObject object = (JsonObject) dataArray.get(i);
							if (object.get("repetido").getAsBoolean()) {
								object.addProperty("repetido", "Si");
							}else {
								object.addProperty("repetido", "No");
							}
							dataReporte.add(object);

						}
					}
		            array = dataReporte;
				}
				break;
			case "reportesf-recoleccerrados-pi":
				response = consultarInformacionExcelGenericPost(params, constReportesSF.getExportaReporteRecoleccionCerradas(), method);
				if (response.getResult() == null || response.getResult() instanceof Integer) {
				} else {
					JsonObject jsonObjectResponse = gson.fromJson(gson.toJson(response.getResult()), JsonObject.class);
		            array = jsonObjectResponse.getAsJsonArray("resultado");
				}
				break;
			case "reportesf-backlogfactib-pi":
				response = consultarInformacionExcelGenericPost(params, constReportesSF.getExportaReporteBackLogFactibilidades(), method);
				if (response.getResult() == null || response.getResult() instanceof Integer) {
				} else {
					JsonObject jsonObjectResponse = gson.fromJson(gson.toJson(response.getResult()), JsonObject.class);
					JsonArray dataArray = jsonObjectResponse.getAsJsonArray("resultado");
					JsonArray dataReporte = new JsonArray();
					if (dataArray.size() > 0) {
						for (int i = 0; i < dataArray.size(); i++) {
							JsonObject object = (JsonObject) dataArray.get(i);
							if (object.get("repetido").getAsBoolean()) {
								object.addProperty("repetido", "Si");
							}else {
								object.addProperty("repetido", "No");
							}
							dataReporte.add(object);

						}
					}
		            array = dataReporte;
				}
				break;
			case "reportesf-backlogvolun-pi":
				response = consultarInformacionExcelGenericPost(params, constReportesSF.getExportaReporteBackLogVoluntarias(), method);
				if (response.getResult() == null || response.getResult() instanceof Integer) {
				} else {
					JsonObject jsonObjectResponse = gson.fromJson(gson.toJson(response.getResult()), JsonObject.class);
					JsonArray dataArray = jsonObjectResponse.getAsJsonArray("resultado");
					JsonArray dataReporte = new JsonArray();
					if (dataArray.size() > 0) {
						for (int i = 0; i < dataArray.size(); i++) {
							JsonObject object = (JsonObject) dataArray.get(i);
							if (object.get("repetido").getAsBoolean()) {
								object.addProperty("repetido", "Si");
							}else {
								object.addProperty("repetido", "No");
							}
							dataReporte.add(object);

						}
					}
		            array = dataReporte;
				}
				break;
			case "reportesf-ventasprinc-pi":
				response = consultarInformacionExcelGenericPost(params, constReportesSF.getExportaReporteVentas(), method);
				if (response.getResult() == null || response.getResult() instanceof Integer) {
				} else {
					JsonObject jsonObjectResponse = gson.fromJson(gson.toJson(response.getResult()), JsonObject.class);
		            array = jsonObjectResponse.getAsJsonArray("resultado");
				}
				break;
			case "reporte-disponibilidadv2-pi":
				JsonObject jsonObjectDisponibilidad = gson.fromJson(params, JsonObject.class);
		        array = jsonObjectDisponibilidad.getAsJsonArray("listDisponibilidad");;
				break;
	
		}
		if(isRetornarBanderaBytes) {
			return construirFileExcelGeneric( jsonObject,bytesJSONArchivo);
		}
		
		return retornarByteArrayOutPutStreamGeneric( array, jsonObject);
		
	}

	
	
	/**
	 * Metodo para consultar reportes con respuesta de un archivo ZIP en bytes 
	 * Posterior regresa el arreglo de bytes del json del zip
	 * @param params
	 * @param url
	 * @param method
	 * @return
	 */
	public byte[] consultarInformacionBytesArrayGeneric(String params, String url, String method) {
		logger.info("ImplGenericService.class [metodo = consultarInformacionBytesArrayGeneric() ] \n" + gson.toJson(params) + "\n" + url);
		LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
		String tokenAcces = principalDetail.getAccess_token();
		logger.info("consultarInformacionExcelGenericPost ##+" + tokenAcces);
		ServiceResponseResult response = null;
		String urlRequest = principalDetail.getDireccionAmbiente().concat(url);
		response = restCaller.callPostBytesFileBearerTokenRequest(params, urlRequest, ServiceResponseResult.class, tokenAcces);		
		byte[] arrayResult=null;	
		logger.info("Bytes del JSON Excel asignacion ");
		if(response.isRespuesta() && response.getCodigoEstatusService() == 200 
				&&  response.getBytesFile() !=null ) {
			logger.info("Bytes del JSON Excel no vacio");
			
			//Extrae el JSON del archivo ZIP
			arrayResult=convertirArchivoZipToBytes ( response.getBytesFile() );			
		}		
		return arrayResult;
	}
	
	

	public ByteArrayInputStream retornarByteArrayOutPutStreamGeneric(
			JsonArray array ,JsonObject jsonObject
			) {
	
		List<String> headersList = null;
		List<String> valoresList = null;
		
		JsonArray headersArray = (JsonArray) jsonObject.get("headers");
		headersList = new ArrayList<String>();
        for (int m = 0; m < headersArray.size(); m++) {
        	JsonElement hd = headersArray.get(m);
        	headersList.add(hd.getAsString());
        }
        
        JsonArray valoresArray = (JsonArray) jsonObject.get("valores");
		valoresList = new ArrayList<String>();
        for (int m = 0; m < valoresArray.size(); m++) {
        	JsonElement val = valoresArray.get(m);
        	valoresList.add(val.getAsString());
        }
		
		SXSSFWorkbook book = new SXSSFWorkbook();
		SXSSFSheet sheet = null;
		sheet = book.createSheet(jsonObject.get("sheet").getAsString());
		
//		CREA FILA
		Row row;
//		CREA CELDA
		Cell cell = null;
		int rowsCantidad = 0;
		row = sheet.createRow(++rowsCantidad);
		row.setHeightInPoints((2 * sheet.getDefaultRowHeightInPoints()));
		int aux = 0;
		for (String header : headersList) {
			cell = row.createCell(++aux);
			cell.setCellValue(header);
			sheet.setColumnWidth(aux, 20 * 256);
		}		
		aux = 0;
		if (array != null && array.size() > 0) {
			for (int i = 0; i < array.size(); i++) {
				JsonObject object = (JsonObject) array.get(i);
				row = sheet.createRow(++rowsCantidad);
				row.setHeightInPoints((1 * sheet.getDefaultRowHeightInPoints()));
				
				for(String valor: valoresList) {
					cell = row.createCell(++aux);
					cell.setCellValue((object.get(valor) != null && object.get(valor).getAsString().trim() != "") ? object.get(valor).getAsString().trim() : "Sin dato");
				}				
				aux = 0;
			}
		}else {
			return null;
		}	
		
		
		try {
			ByteArrayOutputStream fileToDownload = new ByteArrayOutputStream();
			book.write(fileToDownload);
			return new ByteArrayInputStream(fileToDownload.toByteArray());
		} catch (IOException e) {
			logger.error(" convertirArchivoZipToBytes IOException ");
			logger.error(" convertirArchivoZipToBytes IOException ",e);
			return null;
		} catch (Exception e) {
			logger.error(" convertirArchivoZipToBytes error ");
			logger.error(" convertirArchivoZipToBytes error ",e);
			return null;
		}
	}

	/**
	 * Arma el excel desde el archivo del JSON
	 * @param jsonObject
	 * @param arrayBytesJSON
	 * @return
	 */
	public ByteArrayInputStream construirFileExcelGeneric(JsonObject jsonObject,byte[] arrayBytesJSON) {				
		ByteArrayInputStream byteArrayInputStream=null;
		
		List<String> headersList = null;
		List<String> valoresList = null;
		
		JsonArray headersArray = (JsonArray) jsonObject.get("headers");
		headersList = new ArrayList<String>();
        for (int m = 0; m < headersArray.size(); m++) {
        	JsonElement hd = headersArray.get(m);
        	headersList.add(hd.getAsString());
        }
        
        JsonArray valoresArray = (JsonArray) jsonObject.get("valores");
		valoresList = new ArrayList<String>();
        for (int m = 0; m < valoresArray.size(); m++) {
        	JsonElement val = valoresArray.get(m);
        	valoresList.add(val.getAsString());
        }
		List<String> headers = headersList;
		List<String> valores = valoresList;
		
		

		SXSSFWorkbook book = new SXSSFWorkbook();
		SXSSFSheet sheet = null;
		sheet = book.createSheet(jsonObject.get("sheet").getAsString());
		
		Row row;
		Cell cell = null;
		int rowsCantidad = 0;
		row = sheet.createRow(++rowsCantidad);
		row.setHeightInPoints((2 * sheet.getDefaultRowHeightInPoints()));
		int aux = 0;
		
		//Arma la parte de los header 
		for (String header : headers) {
			cell = row.createCell(++aux);
			cell.setCellValue(header);
			sheet.setColumnWidth(aux, 20 * 256);
		}
		//Arma un mapa con las llaves del JSON
	    Map<String, String >mapValuesJson=new HashMap<String,String>();		
	    for(String keyJsonElement:valores) {
	    	mapValuesJson.put(keyJsonElement,"");
	    }
	    
		aux = 0;
		if ( arrayBytesJSON !=null )   {					
			//File jsonFile = new File("C:\\ab.json");
	        JsonFactory jsonfactory = new JsonFactory(); //init factory
			logger.info("INIT LOGICA EXCEL --- "+UtileriaGeneral.getCurrentTimeUsingCalendar());
	        try {
	            int numberOfRecords = 0;
	            //Convierte el array de bytes (JSON) en un objeto JS
	            JsonParser jsonParser = jsonfactory.createJsonParser( arrayBytesJSON ); //create JSON parser
	            //JsonParser jsonParser = jsonfactory.createJsonParser( jsonFile ); //create JSON parser
	            JsonToken jsonToken = jsonParser.nextToken();
				logger.info("antes de recorrer archivo --- "+UtileriaGeneral.getCurrentTimeUsingCalendar());
			   	//row = sheet.createRow(++rowsCantidad);
				//row.setHeightInPoints((1 * sheet.getDefaultRowHeightInPoints()));
	            while (jsonToken!= JsonToken.END_ARRAY){ //Iterate all elements of array
	                String fieldname = jsonParser.getCurrentName(); //get current name of token
	               
	                //Busca en el mapa cada llave del JSON
	                if(mapValuesJson.containsKey(fieldname)) {
	                    jsonToken = jsonParser.nextToken();	                    
	                    mapValuesJson.put(fieldname, jsonParser.getText());	   	  
	                    
	                    //Este bloque se descomenta si el JSON estuviera en el orden del oxxo
	                    //cell = row.createCell(++aux);
	            		//cell.setCellValue(jsonParser.getText());
	                }             	                	                
	                if(jsonToken==JsonToken.END_OBJECT){
	                    //do some processing, Indexing, saving in DB etc..
	                    numberOfRecords++;
	                	row = sheet.createRow(++rowsCantidad);
	    				row.setHeightInPoints((1 * sheet.getDefaultRowHeightInPoints()));
	    				//
	            		for(String valor: valores) {
	    					cell = row.createCell(++aux);
	    					cell.setCellValue(mapValuesJson.get(valor));
	    					mapValuesJson.put(valor, "");
	    				}
	    				aux = 0;
	                }
	                jsonToken = jsonParser.nextToken();
	            }
				logger.info("TIEMPO TOTAL DE LOGICA --- "+UtileriaGeneral.getCurrentTimeUsingCalendar());
				logger.info("REGISTRO ENCONTRADOS EN EXCEL : -- "+numberOfRecords);
				
				ByteArrayOutputStream fileToDownload = new ByteArrayOutputStream();
				book.write(fileToDownload);
				byteArrayInputStream= new ByteArrayInputStream(fileToDownload.toByteArray());
        	
			} catch (IOException e) {
				byteArrayInputStream=null;
				logger.error(" convertirArchivoZipToBytes IOException ");
				logger.error(" convertirArchivoZipToBytes IOException ",e);
			} catch (Exception e) {
				byteArrayInputStream=null;
				logger.error(" convertirArchivoZipToBytes error ");
				logger.error(" convertirArchivoZipToBytes error ",e);
			}
		}
        return byteArrayInputStream;                 
	}


	
	@Override
	public ServiceResponseResult consultarInformacionExcelGenericPost(String params, String url, String method) {
		logger.info("ImplGenericService.class [metodo = consultarInformacionExcelGenericPost() ] \n" + gson.toJson(params) + "\n" + url);
		LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
		String tokenAcces = principalDetail.getAccess_token();
		logger.info("");
		logger.info("consultarInformacionExcelGenericPost ##+" + tokenAcces);
		ServiceResponseResult response = null;
		String urlRequest = principalDetail.getDireccionAmbiente().concat(url);
		logger.info("METHOD --- "+method+" URL ## " + urlRequest);
		if (method.equals("POST")) {
			response = restCaller.callPostBearerTokenRequest(params, urlRequest, ServiceResponseResult.class, tokenAcces);
		} else {
			JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
			List<String> headerJson = new ArrayList<String>(jsonObject.keySet());

			Map<String, String> paramsRequestGet = new HashMap<String, String>();
			for (String hdr : headerJson) {
				if(!hdr.equals("headers") && !hdr.equals("valores")) {
					paramsRequestGet.put(hdr.toString(), jsonObject.get(hdr).getAsString());
				}
			}
			response = restCaller.callGetBearerTokenRequest(paramsRequestGet, urlRequest, ServiceResponseResult.class,
					tokenAcces);
		}
		logger.info("### --- RESULLTADO DE JSON EXCEL ");
		logger.info( gson.toJson(response) );
		return response;
	}
	
	
	
	/**
	 * Metodo que extrae archivo json de un archivo ZIP y convierte ese archivo JSON a bytes
	 * 
	 * @param  bytesArchivoZip  bytes del archivo .zip
	 * @return bytesArchivoJson del archivo .json
	 */
	public byte[] convertirArchivoZipToBytes( byte[]   bytesArchivoZip) {
		byte[] bytesArchivoJson=null;
				
		ZipInputStream zipStream = new ZipInputStream(new ByteArrayInputStream( bytesArchivoZip ) );
		ZipEntry entry = null;
		try {
			while ((entry = zipStream.getNextEntry()) != null) {

				String entryName = entry.getName();
		        logger.info("nombre del zip "+entryName);
		        //Byte ouput para extraer el arraeglo de bytes del json
		        ByteArrayOutputStream  out = new ByteArrayOutputStream ();
	
		        byte[] byteBuff = new byte[4096];
		        int bytesRead = 0;
		        while ((bytesRead = zipStream.read(byteBuff)) != -1){
		        	out.write(byteBuff, 0, bytesRead);
		        }
	   
		        //asigna los bytes del json ala variable
		        bytesArchivoJson = out.toByteArray();
		        out.close();
		        zipStream.closeEntry();		       	               
		        break;             
			}
			zipStream.close(); 
		} catch (IOException e) {
			bytesArchivoJson=null;
			logger.error(" convertirArchivoZipToBytes IOException ");
			logger.error(" convertirArchivoZipToBytes IOException ",e);
		} catch (Exception e) {
			bytesArchivoJson=null;
			logger.error(" convertirArchivoZipToBytes error ");
			logger.error(" convertirArchivoZipToBytes error ",e);
		}
		return bytesArchivoJson;
	}
}
