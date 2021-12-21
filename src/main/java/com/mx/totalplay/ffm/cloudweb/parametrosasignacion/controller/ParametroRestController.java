package com.mx.totalplay.ffm.cloudweb.parametrosasignacion.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mx.totalplay.ffm.cloudweb.parametrosasignacion.component.Constantes;
import com.mx.totalplay.ffm.cloudweb.parametrosasignacion.model.Solicitud;
import com.mx.totalplay.ffm.cloudweb.parametrosasignacion.service.ConsumeServiciosBackend;
import com.mx.totalplay.ffm.cloudweb.parametrosasignacion.util.ConsoleMessage;
import com.mx.totalplay.ffm.cloudweb.parametrosasignacion.util.SolicitudObtenerDatos;

@RestController
@RequestMapping("/req/parametrosAsignacion")
public class ParametroRestController {
	private final String NOMBRE_METODO="com.totalplay.parametros.controller.ParametroRestController";
	
	@Autowired ConsoleMessage console;
	@Autowired ConsumeServiciosBackend servicios;
	
	@PostMapping("/consume")
	public String consume(@RequestBody String solicitud) {
//		console.messages_console(NOMBRE_METODO, "[INICIA]consume "+"Solicitud: "+solicitud,Constantes.TITULO);
		
		String json = servicios.consume(solicitud);
		
		return json;
	}
}
