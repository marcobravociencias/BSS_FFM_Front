package com.mx.totalplay.ffm.cloudweb.utilerias.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;

import com.mx.totalplay.ffm.cloudweb.utilerias.model.LoginResult;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.Permiso;
import com.mx.totalplay.ffm.cloudweb.utilerias.utils.ConstantesGeneric;
import com.mx.totalplay.ffm.cloudweb.utilerias.utils.UtileriaGeneral;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Controller
public class GenericController {
	
	private  final Logger logger = LogManager.getLogger(GenericController.class.getName());
	
	
	private final ConstantesGeneric genericVars;   
	private final UtileriaGeneral utileriaGeneral;

    @Autowired
    public GenericController(UtileriaGeneral utileriaGeneral,ConstantesGeneric genericVars) {
        this.utileriaGeneral = utileriaGeneral;
        this.genericVars = genericVars;
    }
	
	@GetMapping("/enrutarUser")
	public String enrutamientoUser(ModelMap model) {	
		logger.info("Enrutando ... " );
        LoginResult principalDetail = utileriaGeneral.obtenerObjetoPrincipal();
        List<Permiso> permisos = principalDetail.getPermisos();
        String redirectEnrutamiento="redirect:"+permisos.get(0).getClave();
		logger.info("Enrutando ... "+redirectEnrutamiento );
		
		return redirectEnrutamiento;				
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
	
	@GetMapping("/parametrosAsignacion")
	public String parametrosAsignacion(){
		logger.info("ENTRA DECISION");
		return "utilerias/parametrosasignacion/asignacionAutomatica";
	}
	
	@GetMapping("/noticiasAppFFM")
	public String noticiasAppFFM(){
		logger.info("ENTRA DECISION");
		return "generic/gestionNoticias/mainGestionNoticias";
	}
	
	@GetMapping("/descargaLogFile/{fileName:.+}")
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
	
	@GetMapping("/moduloVistaConfirmacion")
	public String vistaConfirmacion(@RequestParam Integer otconfirma) {		
		logger.info("ENTRA DECISION");
		return "generic/vistaConfirmacion/mainVistaConfirmacion";
	}


}
