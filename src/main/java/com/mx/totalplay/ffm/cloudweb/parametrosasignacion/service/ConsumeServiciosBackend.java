package com.mx.totalplay.ffm.cloudweb.parametrosasignacion.service;

import org.apache.tomcat.util.bcel.classfile.Constant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.mx.totalplay.ffm.cloudweb.parametrosasignacion.component.Constantes;
import com.mx.totalplay.ffm.cloudweb.parametrosasignacion.model.ParametroVO;
import com.mx.totalplay.ffm.cloudweb.parametrosasignacion.model.Solicitud;
import com.mx.totalplay.ffm.cloudweb.parametrosasignacion.util.ConsoleMessage;
import com.mx.totalplay.ffm.cloudweb.parametrosasignacion.util.SolicitudObtenerDatos;

@Service
public class ConsumeServiciosBackend {
	public final String NOMBRE_METODO = "com.mx.totalplay.ffm.cloudweb.parametrosasignacion.service.ConsumeServiciosBackend";
	
	@Autowired ConsoleMessage console;
	@Autowired SolicitudObtenerDatos solicitudObtenerDatos;
	
	
	public String consume ( String solicitud ) {
		Solicitud solicitudRequest = solicitudObtenerDatos.obtenerDatos(solicitud);
		solicitud = solicitud.replaceAll("'", "\"");
		String json = "{}";
		
		console.messages_console(NOMBRE_METODO, solicitudRequest.getKey());
		console.messages_console(NOMBRE_METODO, solicitudRequest.getUrl());
		console.messages_console(NOMBRE_METODO, solicitudRequest.getMethod());
		console.messages_console(NOMBRE_METODO, solicitudRequest.getToken());
		
		ResponseEntity<String> response = null;
		console.messages_console(NOMBRE_METODO, "[URL]"+solicitudRequest.getUrl().replace("null", ""),Constantes.TITULO);
    	console.messages_console(NOMBRE_METODO, "[URL]"+solicitudRequest.getMethod(),Constantes.TITULO);
    	console.messages_console(NOMBRE_METODO, "[GET]"+solicitudRequest.getDatosGET(),Constantes.TITULO);
    	
		try {
			response = new RestTemplate().exchange(solicitudRequest.getUrl().replace("null", ""), 
	    			seleccionaHttpMethod(solicitudRequest.getMethod()), creaRequest(solicitudRequest), String.class);
		} catch (Exception e) {
			console.messages_console(NOMBRE_METODO, "[error]Al consumir servicio: "+e.getMessage(),Constantes.ERROR);
			return json;
		}
		
		try {
			json = response.getBody();
			console.messages_console(NOMBRE_METODO, "[RESPONSE]"+json,Constantes.TITULO);
		} catch (Exception e) {
			console.messages_console(NOMBRE_METODO, "[error]Al obtener response body"+e.getMessage(),Constantes.ERROR);
		}
		
		return json;
	}
	
	public HttpHeaders creaHeaders (Solicitud solicitudRequest) {
		HttpHeaders headers = new HttpHeaders();
		headers.set(HttpHeaders.ACCEPT, MediaType.APPLICATION_JSON_VALUE);
		headers.set(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE);
		headers.set(HttpHeaders.AUTHORIZATION, "Bearer " + solicitudRequest.getToken());
		
		return headers;
	}
	
	public HttpEntity<?> creaRequest (Solicitud solicitudRequest) {
		String data = obtenerPostData(solicitudRequest).replaceAll("FAPA", "fapa");
		data = data.replaceAll("FCEM", "fcem");
		data = data.replaceAll("FCUN", "fcun");
		
		HttpHeaders headers = creaHeaders(solicitudRequest);
		HttpEntity<?> request = new HttpEntity<Object>(data,headers);
		
		if ( request.getBody() == null ) {
			return request;
		}
		
		console.messages_console(NOMBRE_METODO, "[REQUEST]"+request.getBody().toString(),Constantes.TITULO);
		
		return request;
	}
	
	public String obtenerPostData (Solicitud solicitudRequest) {
		String data = "{}";
		if ( solicitudRequest.getDatosPost() != null  ) {
			ParametroVO aa = solicitudRequest.getDatosPost();
			
			GsonBuilder builder = new GsonBuilder();
			Gson gson = builder.create();
			data = gson.toJson(aa);
		}
		
		return data;
	}
	
	private HttpMethod seleccionaHttpMethod ( String method ) {
		switch (method.toUpperCase()) {
		case "GET":
			return HttpMethod.GET;

		case "POST":
			return HttpMethod.POST;
			
		case "PATCH":
			return HttpMethod.PATCH;
			
		case "DELETE":
			return HttpMethod.DELETE;
		default:
			return null;
		}
	}
}
