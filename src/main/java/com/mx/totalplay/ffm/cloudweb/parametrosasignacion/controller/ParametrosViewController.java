package com.mx.totalplay.ffm.cloudweb.parametrosasignacion.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.mx.totalplay.ffm.cloudweb.parametrosasignacion.component.Constantes;
import com.mx.totalplay.ffm.cloudweb.parametrosasignacion.util.ConsoleMessage;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.LoginResult;
import com.mx.totalplay.ffm.cloudweb.utilerias.utils.ConstantesGeneric;
import com.mx.totalplay.ffm.cloudweb.utilerias.utils.UtileriaGeneral;

@Controller
@RequestMapping("parametrosAsignacion")
public class ParametrosViewController {
private final String NOMBRE_METODO="com.totalplay.parametros.controller.FrontRestController";
	
	@Autowired ConsoleMessage console;
	
	private final ConstantesGeneric constantesAmbiente;
	private final UtileriaGeneral utilerias;
	private final Environment env;
	
	@Autowired
	public ParametrosViewController(ConstantesGeneric constantesAmbiente, UtileriaGeneral utilerias, Environment env) {
		this.constantesAmbiente = constantesAmbiente;
		this.utilerias = utilerias;
		this.env = env;
	}
	
	@ExceptionHandler
	@GetMapping("/")
	public ModelAndView parametros (){
		console.messages_console(NOMBRE_METODO, Constantes.BARRA);
		console.messages_console(NOMBRE_METODO, "[INICIA]Parametros",Constantes.TITULO);
		console.messages_console(NOMBRE_METODO, "[INFO]Servicio para desplegar una vista que muestra todos los parametros");
		
		LoginResult principalDetail=utilerias.obtenerObjetoPrincipal();
		int puesto = principalDetail.getIdPuesto();
		
		console.messages_console(NOMBRE_METODO, "ID Puesto: "+puesto);
		
		ModelAndView vista = new ModelAndView();
		
		if ( puesto == 19 ) {
			vista.setViewName("utilerias/parametrosasignacion/asignacionAutomatica.jsp");
		}
		
		return vista;
	}
}
