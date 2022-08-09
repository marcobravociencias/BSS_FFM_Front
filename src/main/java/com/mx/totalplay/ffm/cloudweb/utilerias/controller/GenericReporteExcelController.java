package com.mx.totalplay.ffm.cloudweb.utilerias.controller;

import java.io.ByteArrayInputStream;
import java.io.IOException;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.apache.poi.util.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.ServiceResponseResult;
import com.mx.totalplay.ffm.cloudweb.utilerias.service.GenericService;

@RestController
@RequestMapping("/req")
public class GenericReporteExcelController {
	private final Logger logger = LogManager.getLogger(GenericReporteExcelController.class.getName());
	private final GenericService genericService;

	@Autowired
	public GenericReporteExcelController(GenericService genericService) {
		this.genericService = genericService;
	}

	@PostMapping("/enviarParamsReporte")
	public ResponseEntity<?> enviarParamsReporte(@RequestBody String params, HttpSession session) {
		logger.info("obtenerParamsReporte.class [metodo = obtenerParamsReporte() ] \n" + new Gson().toJson(params));
		if(session.getAttribute("paramsReporteExcel") != null) {
			session.removeAttribute("paramsReporteExcel");
		}
		session.setAttribute("paramsReporteExcel", params);
		ServiceResponseResult result = ServiceResponseResult.builder().build();
		result = ServiceResponseResult.builder().isRespuesta(true).build();
		return new ResponseEntity<>(result, HttpStatus.ACCEPTED);
	}

	@GetMapping("/exporteExcelGenericRequest/{nombreArchivo:.+}")
	public void exporteExcelGenericRequest(HttpServletResponse response,
			@PathVariable("nombreArchivo") String nombreArchivo, HttpSession session) throws IOException {
		String params = session.getAttribute("paramsReporteExcel").toString();
		response.setContentType("application/octet-stream");
		response.setHeader("Content-Disposition", "attachment; filename=" + nombreArchivo);
		ByteArrayInputStream stream = genericService.exporteExcelGenericRequest(params);
		IOUtils.copy(stream, response.getOutputStream());
		response.getOutputStream().flush();

		if (params != null) {
			session.removeAttribute("paramsReporteExcel");
		}
	}
}
