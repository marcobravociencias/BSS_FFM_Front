package com.mx.totalplay.ffm.cloudweb.utilerias.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;

import com.mx.totalplay.ffm.cloudweb.utilerias.utils.ConstantesGeneric;
import org.springframework.web.bind.annotation.PathVariable;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Controller
public class GenericController {
	
	private  final Logger logger = LogManager.getLogger(GenericController.class.getName());
	
	@Autowired
	ConstantesGeneric genericVars;
	
	@GetMapping("/enrutarUser")
	public String despachoPlantaExterna() {	
		logger.info("ENTRA DECISION");
		return "plantainterna/despacho/despachopi";				
	}	
	
	 @ModelAttribute("googlkeyattrvar")
	 public Map<String,Object> agregarVariablesGeneric () {
		logger.info("agregando generic ------------------");
		Map<String,Object>mapaVars=new HashMap<>();
		mapaVars.put("gkeactok", genericVars.getGoogAccLLaevATok());
	  return mapaVars;
	}

	@GetMapping("/detailsHelp")
	public String redireccionLog(){
		logger.info("ENTRA DECISION");
		return "utilerias/help/details";
	}
	@GetMapping("req/descargaLogFile/{fileName:.+}")
	public void downloadLoggerFile(HttpServletRequest request, HttpServletResponse response,
								   @PathVariable("fileName")String fileName){
		Path pathFile= Paths.get("/u01/ffmcloudlog/",fileName);
		logger.info("descargandoFile....");
		if( Files.exists(pathFile)){
      		response.setContentType("application/octet-stream");
			response.addHeader("Content-Disposition", "attachment; filename="+fileName);
			try{
				Files.copy(pathFile,response.getOutputStream());
				response.getOutputStream().flush();
			}catch( IOException ex){
				ex.printStackTrace();
			}

		}
	}


}
