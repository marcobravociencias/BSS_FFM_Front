package com.mx.totalplay.ffm.cloudweb.parametrosasignacion.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.mx.totalplay.ffm.cloudweb.parametrosasignacion.component.Constantes;
import com.mx.totalplay.ffm.cloudweb.parametrosasignacion.util.ConsoleMessage;

@Controller
@RequestMapping("parametrosAsignacion")
public class ParametrosViewController {
private final String NOMBRE_METODO="com.totalplay.parametros.controller.FrontRestController";
	
	@Autowired ConsoleMessage console;
	
	@ExceptionHandler
	@GetMapping("/")
	public ModelAndView parametros (){
		console.messages_console(NOMBRE_METODO, Constantes.BARRA);
		console.messages_console(NOMBRE_METODO, "[INICIA]Parametros",Constantes.TITULO);
		console.messages_console(NOMBRE_METODO, "[INFO]Servicio para desplegar una vista que muestra todos los parametros");
		
		ModelAndView vista = new ModelAndView();
		vista.setViewName("utilerias/parametrosasignacion/asignacionAutomatica.jsp");
		
		return vista;
	}
}
