package com.mx.totalplay.ffm.cloudweb.utilerias.service.impl;


import com.google.gson.Gson;
import com.google.gson.JsonArray;
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
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFFont;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.BorderStyle;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.FillPatternType;
import org.apache.poi.ss.usermodel.HorizontalAlignment;
import org.apache.poi.ss.usermodel.IndexedColors;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

@Service
public class ImplGenericService  implements GenericService {
    private  final Logger logger = LogManager.getLogger(ImplGenericService.class.getName());
    private Gson gson = new Gson();
    private final ConsumeRest restCaller;
    private final GenericDao genericDao;
    private final Environment environment;
    private final UtileriaGeneral utilerias;
    private final ConstConsultaOT constConsultaOT;
    private final ConstReportePI constReportePI;
    private final ConstControlVehicular constControlVehicular;
    private final ConstTraspaso constTraspaso;
	private final ConstantesGeneric constantesAmbiente;
	private final ConstReporteSF constReportesSF;
    
    @Autowired
    private ConsultaOTService consultaOTService;

    @Autowired
    public ImplGenericService(ConsumeRest restCaller, GenericDao genericDao, Environment environment, UtileriaGeneral utilerias, ConstConsultaOT constConsultaOT,
    		ConstReportePI constReportePI, ConstControlVehicular constControlVehicular, ConstTraspaso constTraspaso, ConstantesGeneric constantesAmbiente,
    		ConstReporteSF constReportesSF) {
    	this.restCaller = restCaller;
        this.genericDao = genericDao;
        this.environment = environment;
        this.utilerias = utilerias;
        this.constConsultaOT = constConsultaOT;
        this.constReportePI = constReportePI;
        this.constControlVehicular = constControlVehicular;
        this.constTraspaso = constTraspaso;
        this.constantesAmbiente = constantesAmbiente;
        this.constReportesSF = constReportesSF;
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
    
	@Override
	public ByteArrayInputStream exporteExcelGenericRequest(String params) {
		logger.info("ImplGenericService.class [metodo = exporteExcelGenericRequest() ] \n" + gson.toJson(params));
		JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
		String tipoExcel = jsonObject.get("tipoExcel").getAsString();
		
		switch (tipoExcel) {
			case "consultaot-consultarordenes-pi":
				return generarExcelGenericRequest(params, "POST");
			case "reportepi-seguimientodiario-pi":
				return generarExcelGenericRequest(params, "POST");
			case "reportepi-cierrediario-pi":
				return generarExcelGenericRequest(params, "POST");
			case "reportepi-asignadascompensacion-pi":
				return generarExcelGenericRequest(params, "POST");
			case "reportepi-tecnicostiposordenes-pi":
				return generarExcelGenericRequest(params, "");
			case "vehiculos-consultarvehiculos-pi":
				return generarExcelGenericRequest(params, "GET");
			case "traspasos-consultarots-pi":
				return generarExcelGenericRequest(params, "POST");
			case "traspasos-consultartraspasos-pi":
				return generarExcelGenericRequest(params, "POST");
			case "reportelog-consultarlog-pi":
				return generarExcelGenericRequest(params, "GET");
			case "reportelog-consultarloggeneral-pi":
				return generarExcelGenericRequest(params, "POST");
			case "despachopi-seguimientodiario-pi":
				return generarExcelGenericRequest(params, "POST");
			case "reportesf-backloginstalaciones-pi":
				return generarExcelGenericRequest(params, "POST");
			case "reportesf-backlog-pi":
				return generarExcelGenericRequest(params, "POST");
			default:
				return null;
		}
	}

	@Override
	public ByteArrayInputStream generarExcelGenericRequest(String params, String method) {
		logger.info("ImplGenericService.class [metodo = generarExcelGenericRequest() ] \n" + gson.toJson(params));
		JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
		String tipoExcel = jsonObject.get("tipoExcel").getAsString();
		
		HSSFWorkbook book = new HSSFWorkbook();
		HSSFSheet sheet = null;
		
		ServiceResponseResult response = null;
		JsonArray array = null;
		String[] headers = {};
		String[] valores = {};
		
		switch (tipoExcel) {
			case "consultaot-consultarordenes-pi":
				sheet = book.createSheet("Reporte Consulta OT");
				headers = new String[] { "OT", "OS", "CLIENTE", "CUENTA", "CIUDAD", "FECHA AGENDA", "TIPO", "SUBTIPO",
						"ESTATUS", "ESTADO", "MOTIVO" };
				valores = new String[] { "idOrden", "folioSistema", "nombreCliente", "claveCliente", "cluster", "fechaAgenda", "descTipo", "descSubTipo",
						"descripcionEstatus", "descripcionEstado", "descripcionMotivo"};
				response = consultarInformacionExcelGenericPost(params, constConsultaOT.getConsultaGeneralOt(), method);
				if (response.getResult() == null || response.getResult() instanceof Integer) {
				} else {
					JsonObject jsonObjectResponse = gson.fromJson(gson.toJson(response.getResult()), JsonObject.class);
		            array = jsonObjectResponse.getAsJsonArray("ordenes");
				}
				break;
			case "reportepi-seguimientodiario-pi":
				sheet = book.createSheet("Reporte Seguimiento Diario");
	            headers = new String[] { "OT", "OS", "CUENTA", "TIPO", "SUBTIPO", "ESTATUS", "ESTADO", "MOTIVO",
						"CIUDAD", "GEOGRAFIA", "#EMPLEADO", "#USUARIO", "TECNICO", "FECHA AGENDADA", "FECHA FIN" };
				valores = new String[] { "ot", "os", "cuenta", "tipo", "subTipo", "estatusOrden", "estadoOrden", "motivoOrden",
						"ciudad", "geo1", "numEmpleadoDespacho", "numEmpleadoTecnico", "nombreTecnico", "fechaUltimaAgenda", "fechaFin"};
				response = consultarInformacionExcelGenericPost(params, constReportePI.getConsultarReporteDiario(), method);
				if (response.getResult() == null || response.getResult() instanceof Integer) {
				} else {
					JsonObject jsonObjectResponse = gson.fromJson(gson.toJson(response.getResult()), JsonObject.class);
		            array = jsonObjectResponse.getAsJsonArray("ordenes");
				}
				break;
			case "reportepi-cierrediario-pi":
				sheet = book.createSheet("Reporte Cierre Diario");
				headers = new String[] { "OT", "OS", "CUENTA", "TIPO", "SUBTIPO", "ESTATUS", "ESTADO", "MOTIVO",
						"CIUDAD", "GEOGRAFIA", "#EMPLEADO", "#USUARIO", "TECNICO", "FECHA CREACION", "FECHA INICIO", "FECHA AGENDADA", "FECHA FIN" };
				valores = new String[] { "ot", "os", "cuenta", "intervencion", "subIntervencion", "estatus", "estado", "causa",
						"ciudad", "geo1", "numEmpleadoInstalador", "usrInstalador", "instalador", "fechaCreacion", "fechaInicio", "fechaAgendamiento", "fechaCierre"};
				response = consultarInformacionExcelGenericPost(params, constReportePI.getConsultarCierreDiario(), method);
				if (response.getResult() == null || response.getResult() instanceof Integer) {
				} else {
					JsonObject jsonObjectResponse = gson.fromJson(gson.toJson(response.getResult()), JsonObject.class);
		            array = jsonObjectResponse.getAsJsonArray("ordenes");
				}
				break;
			case "reportepi-asignadascompensacion-pi":
				sheet = book.createSheet("Reporte Asignadas Compensacion");
				headers = new String[] { "OT", "OS", "CUENTA", "TIPO", "SUBTIPO", "PROVEEDOR", "GEOGRAFIA","GEOGRAFIA 2","DESPACHO", "#EMPLEADO",
						"#USUARIO", "INSTALADOR", "FECHA CREACION", "FECHA AGENDA", "FECHA FIN"};
				valores = new String[] { "ot", "os", "cuenta", "intervencion", "subIntervencion", "proveedor", "geo1", "geo2",
						"nombreDespacho", "numEmpleadoInstalador", "usrInstalador", "instalador", "fechaCreacion", "fechaAgendamiento", "fechaCierre"};
				response = consultarInformacionExcelGenericPost(params, constReportePI.getConsultarAsignadasCompensacion(), method);
				if (response.getResult() == null || response.getResult() instanceof Integer) {
				} else {
					JsonObject jsonObjectResponse = gson.fromJson(gson.toJson(response.getResult()), JsonObject.class);
					array = jsonObjectResponse.getAsJsonArray("ordenes");
				}
				break;
			case "reportepi-tecnicostiposordenes-pi":
				sheet = book.createSheet("Reporte Skills Instaladores");
				JsonObject jsonObjectTecnicos = gson.fromJson(params, JsonObject.class);
				JsonArray skillsArray = jsonObjectTecnicos.getAsJsonArray("listSkills");
				List<String> skillsList = new ArrayList<String>();
				skillsList.add("Cuadrilla");
				skillsList.add("Usuario FFM");
		        for (int m = 0; m < skillsArray.size(); m++) {
		        	JsonObject skill = (JsonObject) skillsArray.get(m);
		        	skillsList.add(skill.get("descripcion").getAsString());
		        }
				headers = skillsList.toArray(new String[skillsList.size()]);
				valores = skillsList.toArray(new String[skillsList.size()]);
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
				sheet = book.createSheet("Reporte vehiculos");
				headers = new String[] { "#EMPLEADO", "NOMBRE", "PLACA", "TIPO", "MARCA", "TARJETA CIRCULACION", "EXPEDIENTE","TIPO CUADRILLA","EMPRESA", "COSTO",
						"UBICACION", "DISTRITO", "ESTATUS", "MOTIVO", "FECHA", "COMENTARIO"};
				valores = new String[] { "numeroEmpleado", "nombreCompleto", "placa", "tipoVehiculo", "marca", "tarjetaCirculacion", "expediente", "tipoCuadrilla",
						"empresa", "costo", "ubicacion", "distrito", "estatus", "motivo", "fecha", "comentario"};
				response = consultarInformacionExcelGenericPost(params, constControlVehicular.getReporteControlVehicular(), method);
				if (response.getResult() == null || response.getResult() instanceof Integer) {
				} else {
					JsonObject jsonObjectResponse = gson.fromJson(gson.toJson(response.getResult()), JsonObject.class);
		            array = jsonObjectResponse.getAsJsonArray("vehiculos");
				}
				break;
			case "traspasos-consultarots-pi":
				sheet = book.createSheet("Reporte Consulta OT");
				headers = new String[] { "OT", "CLIENTE", "CUENTA", "CIUDAD", "FECHA AGENDA", "TIPO", "SUBTIPO",
						"ESTATUS", "ESTADO", "MOTIVO" };
				valores = new String[] { "idOrden", "nombreCliente", "claveCliente", "ciudad", "fechaAgenda", "descTipo", "descSubTipo",
						"descripcionEstatus", "descripcionEstado", "descripcionMotivo"};
				response = consultarInformacionExcelGenericPost(params, constTraspaso.getConsultaGeneralTraspasosOt(), method);
				if (response.getResult() == null || response.getResult() instanceof Integer) {
				} else {
					JsonObject jsonObjectResponse = gson.fromJson(gson.toJson(response.getResult()), JsonObject.class);
		            array = jsonObjectResponse.getAsJsonArray("ordenes");
				}
				break;
			case "traspasos-consultartraspasos-pi":
				sheet = book.createSheet("Reporte Traspasos OT");
				headers = new String[] { "OT", "CLIENTE", "CUENTA", "CIUDAD", "FECHA AGENDA", "TIPO", "SUBTIPO",
						"MOTIVO", "MOTIVO TRANSFERENCIA", "ESTATUS", "ESTADO" };
				valores = new String[] { "idOrden", "nombreCliente", "claveCliente", "ciudad", "fechaAgenda", "descTipo", "descSubTipo",
						"descripcionMotivo", "motivoTransferencia", "descripcionEstatus", "descripcionEstado"};
				response = consultarInformacionExcelGenericPost(params, constTraspaso.getConsultaGeneralTraspasos(), method);
				if (response.getResult() == null || response.getResult() instanceof Integer) {
				} else {
					JsonObject jsonObjectResponse = gson.fromJson(gson.toJson(response.getResult()), JsonObject.class);
		            array = jsonObjectResponse.getAsJsonArray("ordenes");
				}
				break;
			case "reportelog-consultarlog-pi":
				sheet = book.createSheet("Reporte Log");
				headers = new String[] { "MODULO", "ACCION", "ESTATUS", "MENSAJE", "COMENTARIOS", "FECHA REGISTRO", "NOMBRE",
						"#EMPLEADO", "USUARIO", "IP" };
				valores = new String[] { "descripcionModulo", "descripcionAccion", "descripcionEstatusHttp", "descripcionMensajeHttp", "comentarios", "fechaRegistro", "nombreUsuario",
						"numEmpleado", "usuarioFFM", "ip"};
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
				sheet = book.createSheet("Reporte Log");
				headers = new String[] { "MODULO", "ACCION", "ESTATUS", "MENSAJE", "COMENTARIOS", "FECHA REGISTRO", "NOMBRE",
						"#EMPLEADO", "USUARIO", "IP" };
				valores = new String[] { "descripcionModulo", "descripcionAccion", "descripcionEstatusHttp", "descripcionMensajeHttp", "comentarios", "fechaRegistro", "nombreUsuario",
						"numEmpleado", "usuarioFFM", "ip"};
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
				sheet = book.createSheet("Reporte Seguimiento Diario");
				headers = new String[] { "OT", "OS", "CUENTA", "TIPO", "SUBTIPO", "ESTATUS", "ESTADO", "MOTIVO", "CIUDAD", "GEOGRAFIA", 
						"#EMPLEADO", "#USUARIO", "TECNICO", "FECHA AGENDA", "FECHA FIN" };
				valores = new String[] { "ot", "os", "cuenta", "tipo", "subTipo", "estatusOrden", "estadoOrden", "motivoOrden",
						"ciudad", "geo1", "numEmpleadoDespacho", "numEmpleadoTecnico", "nombreTecnico", "fechaUltimaAgenda", "fechaFin"};
				response = consultarInformacionExcelGenericPost(params, constReportePI.getConsultarReporteDiario(), method);
				if (response.getResult() == null || response.getResult() instanceof Integer) {
				} else {
					JsonObject jsonObjectResponse = gson.fromJson(gson.toJson(response.getResult()), JsonObject.class);
		            array = jsonObjectResponse.getAsJsonArray("ordenes");
				}
				break;
			case "reportesf-backloginstalaciones-pi":
				sheet = book.createSheet("Reporte instalaciones");
				headers = new String[] { "OT", "OS", "CUENTA", "ESTATUS", "FAMILIA", "CONFIRMADA", "TURNO",
						"PLAZA SITIO", "OPERACION", "CLUSTER", "DELEGACION", "DISTRITO", "FECHA CREACION", "FECHA AGENDA", "FECHA MODIFICACION",
						"CANAL VENTA", "COMPANIA", "TIPO ORDEN", "SUBTIPO"};
				valores = new String[] { "idOt", "ordenServicio", "numeroCuenta", "estatusOs", "nombreFamilia", "confirmada", "turno",
						"plazaSitio", "plazaOperacion", "clusterComercial", "delegacionMunicipio", "distritoSitio", "fechaCreacion",
						"fechaAgendada", "fechaModificacion", "canalVenta", "compania", "tipoOrden", "subTipoOrden"};
				response = consultarInformacionExcelGenericPost(params, constReportesSF.getConsultaReporteBacklog(), method);
				if (response.getResult() == null || response.getResult() instanceof Integer) {
				} else {
					JsonObject jsonObjectResponse = gson.fromJson(gson.toJson(response.getResult()), JsonObject.class);
		            array = jsonObjectResponse.getAsJsonArray("data");
				}
				break;
			case "reportesf-backlog-pi":
				JsonObject jsonReport= gson.fromJson(params, JsonObject.class);
				sheet = book.createSheet("Reporte " + jsonReport.get("nombre").getAsString());
				headers = new String[] { "OT", "OS", "CUENTA", "TICKET", "REGION INSTALACION", "PLAZA", "ZONA",
						"CLUSTER INSTALACION", "COLONIA", "PLAZA SITIO", "DISTRITO SITIO", "PRIMER FECHA AGENDAMIENTO", "FECHA AGENDAMIENTO", "TURNO",
						"FECHA ACTIVACION", "ESTATUS", "ESTADO", "FECHA APERTURA", "PROPIETARIO", "GRUPO", "NIVEL1", "NIVEL2", "NIVEL3", "REPETIDO",
						"TIPO ORDEN", "SUBTIPO", "NUEVO SEGMENTO"};
				valores = new String[] { "idOt", "ordenServicio", "numeroCuenta", "ticket", "regionInstalacion", "plaza", "zona",
						"clusterInstalacion", "colonia", "plazaSitio", "distritoSitio", "distritoSitio", "fechaApertura",
						"primerFechaAgendamiento", "fechaAgendamiento", "turno", "fechaActivacion", "estatus", "estado",
						"propietario", "grupoCodificador","nivel1","nivel2", "nivel3", "repetido", "tipoOrden", "subTipo", "nuevoSegmento"};
				response = consultarInformacionExcelGenericPost(params, constReportesSF.getConsultaReporteBacklog(), method);
				if (response.getResult() == null || response.getResult() instanceof Integer) {
				} else {
					JsonObject jsonObjectResponse = gson.fromJson(gson.toJson(response.getResult()), JsonObject.class);
		            array = jsonObjectResponse.getAsJsonArray("data");
				}
				break;
		}

//		CREA LA HOJA
		HSSFFont thFontTitle = (HSSFFont) book.createFont();
		thFontTitle.setFontName(HSSFFont.FONT_ARIAL);
		thFontTitle.setFontHeightInPoints((short) 8);
		thFontTitle.setBold(true);
		thFontTitle.setColor(IndexedColors.WHITE.getIndex());

//		FORMATO DEL TITULO DE LAS COLUMNAS
		CellStyle thStyleTitle = book.createCellStyle();
		thStyleTitle.setWrapText(true);
		thStyleTitle.setFont(thFontTitle);
		thStyleTitle.setBorderBottom(BorderStyle.MEDIUM);
		thStyleTitle.setBottomBorderColor((short) 8);
		thStyleTitle.setBorderTop(BorderStyle.MEDIUM);
		thStyleTitle.setTopBorderColor((short) 8);
		thStyleTitle.setWrapText(true);
		thStyleTitle.setAlignment(HorizontalAlignment.CENTER);
		thStyleTitle.setFillForegroundColor(IndexedColors.ROYAL_BLUE.getIndex());
		thStyleTitle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
//		CREA FILA
		HSSFRow row;
//		CREA CELDA
		HSSFCell cell = null;
		int rowsCantidad = 0;
		row = sheet.createRow(++rowsCantidad);
		row.setHeightInPoints((2 * sheet.getDefaultRowHeightInPoints()));
		int aux = 0;
		
		for (String header : headers) {
			cell = row.createCell(++aux);
			cell.setCellValue(header);
			cell.setCellStyle(thStyleTitle);
			sheet.setColumnWidth(aux, 20 * 256);
		}

		aux = 0;
		HSSFFont thFontContent = (HSSFFont) book.createFont();
		thFontContent.setFontName(HSSFFont.FONT_ARIAL);
		thFontContent.setFontHeightInPoints((short) 8);
		thFontContent.setBold(false);

//		FORMATO DE LAS CELDAS DE CONTENIDO
		HSSFCellStyle thStyleContent = book.createCellStyle();
		thStyleContent.setWrapText(true);
		thStyleContent.setFont(thFontContent);
		thStyleContent.setAlignment(HorizontalAlignment.CENTER);

		if (array.size() > 0) {
			for (int i = 0; i < array.size(); i++) {
				JsonObject object = (JsonObject) array.get(i);
				row = sheet.createRow(++rowsCantidad);
				row.setHeightInPoints((1 * sheet.getDefaultRowHeightInPoints()));
				for(String valor: valores) {
					cell = row.createCell(++aux);
					cell.setCellValue((object.get(valor) != null && object.get(valor).getAsString().trim() != "") ? object.get(valor).getAsString().trim() : "Sin dato");
					cell.setCellStyle(thStyleContent);
				}
				aux = 0;
			}
		}
		
		try {
			ByteArrayOutputStream fileToDownload = new ByteArrayOutputStream();
			book.write(fileToDownload);
			return new ByteArrayInputStream(fileToDownload.toByteArray());
		} catch (IOException e) {
			logger.error(" Error ");
			return null;
		}
	}

	@Override
	public ServiceResponseResult consultarInformacionExcelGenericPost(String params, String url, String method) {
		logger.info("ImplGenericService.class [metodo = consultarInformacionExcelGenericPost() ] \n" + gson.toJson(params) + "\n" + url);
		LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
		String tokenAcces = principalDetail.getAccess_token();
		logger.info("consultarInformacionExcelGenericPost ##+" + tokenAcces);
		ServiceResponseResult response = null;
		String urlRequest = principalDetail.getDireccionAmbiente().concat(url);
		logger.info("URL ##+" + urlRequest);
		if (method == "POST") {
			response = restCaller.callPostBearerTokenRequest(params, urlRequest, ServiceResponseResult.class, tokenAcces);
		} else {
			JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
			List<String> headerJson = new ArrayList<String>(jsonObject.keySet());

			Map<String, String> paramsRequestGet = new HashMap<String, String>();
			for (String hdr : headerJson) {
				paramsRequestGet.put(hdr.toString(), jsonObject.get(hdr).getAsString());
			}
			response = restCaller.callGetBearerTokenRequest(paramsRequestGet, urlRequest, ServiceResponseResult.class,
					tokenAcces);
		}

		logger.info("RESULT/n" + gson.toJson(response));
		return response;
	}
}
