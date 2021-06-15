package com.mx.totalplay.ffm.cloudweb.utilerias.utils;

import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import com.google.gson.Gson;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.LoginResult;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.ServiceResponseResult;

@Lazy
@Service
public class ConsumeRest {

	private final Logger logger = LogManager.getLogger(ConsumeRest.class.getName());
	Gson gson = new Gson();
	RestTemplate restTemplate = new RestTemplate();
	
	@Autowired
	private Environment env;
	
	@Autowired
	private ConstantesGeneric constantesGeneric;
	
	public ServiceResponseResult callPostParamString(String url, String params) {
		logger.info("URL--------" + url);
		ServiceResponseResult response = ServiceResponseResult.builder().isRespuesta(false)
				.resultDescripcion("Sin datos").result(null).build();

		ResponseEntity<String> responseEntity = null;
		try {
			HttpHeaders headers = new HttpHeaders();
			headers.set(HttpHeaders.ACCEPT, MediaType.APPLICATION_JSON_VALUE);
			headers.set(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE);

			HttpEntity<String> request = new HttpEntity<>(params, headers);
			responseEntity = restTemplate.postForEntity(url, request, String.class);
			Object result = gson.fromJson(responseEntity.getBody(), Object.class);

			response = ServiceResponseResult.builder().isRespuesta(true).resultDescripcion("Accion completada")
					.result(result).build();

		} catch (Exception e) {
			logger.error("ERROR GENERAL EN CONSUMO DE SERVICIO", e.getMessage());
			response.setResultDescripcion(e.getMessage());
		}
		return response;
	}
	
	public Object callPostReturnClassBasicAuthXwwwUrlFormed(String url, String us,String passCod, Class<?> classConversion) {
		logger.info("URL--------" + url);
		String response = "";
		
		ResponseEntity<String> responseEntity = null;
		try {
			String authStr = constantesGeneric.getAuthbasicUser().concat(":").concat(constantesGeneric.getAuthbasicCred());
		   
			String base64Creds = Base64.getEncoder().encodeToString(authStr.getBytes());
			

			
			HttpHeaders headers = new HttpHeaders();
			headers.set(HttpHeaders.ACCEPT, MediaType.APPLICATION_JSON_VALUE);
			headers.set(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE);	
			headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
			headers.set("Authorization", "Basic " + base64Creds);
			
			
			MultiValueMap<String, String> map = new LinkedMultiValueMap<>();
			map.add(env.getProperty("param.text.emanresu"), us);
			map.add(env.getProperty("param.textus.drowssap"), passCod);
			map.add(env.getProperty("param.header.grant_type"), env.getProperty("param.textus.grant_type"));
			
			HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(map, headers);
			
			responseEntity = restTemplate.postForEntity(url, request, String.class);
			
			response = responseEntity.getBody().toString();
			return gson.fromJson(response, classConversion);
		} catch (Exception e) {
			logger.error("ERROR GENERAL EN CONSUMO DE SERVICIO", e.getMessage());
				
			return gson.fromJson( gson.toJson(
					LoginResult.builder().
					mensaje("Ocurrio un error en la autenticacion")
					.description("Usuario o contrase�a incorrectos")
					.build()	
			), classConversion);
		}		
	}
	public Object callPostReturnClassBasicAuth(String url, String params, Class<?> classConversion) {
		logger.info("URL--------" + url);
		String response = "";
		
		ResponseEntity<String> responseEntity = null;
		try {
			String authStr = constantesGeneric.getAuthbasicUser().concat(":").concat(constantesGeneric.getAuthbasicCred());
		   
			String base64Creds = Base64.getEncoder().encodeToString(authStr.getBytes());
			
			HttpHeaders headers = new HttpHeaders();
			headers.set(HttpHeaders.ACCEPT, MediaType.APPLICATION_JSON_VALUE);
			headers.set(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE);		    
			headers.set("Authorization", "Basic " + base64Creds);

			HttpEntity<String> request = new HttpEntity<>(params, headers);
			responseEntity = restTemplate.postForEntity(url, request, String.class);
			
			response = responseEntity.getBody().toString();
			return gson.fromJson(response, classConversion);
		} catch (Exception e) {
			logger.error("ERROR GENERAL EN CONSUMO DE SERVICIO", e.getMessage());
				
			return gson.fromJson( gson.toJson(
					LoginResult.builder().
					mensaje("Ocurrio un error en la autenticacion")
					.description("Usuario o contrase�a incorrectos")
					.build()	
			), classConversion);
		}		
	}
	/**
	 * 
	 * @param url Contieene url con parametros ejemplo /despacho/{idDespachoParam}/fecha/{fechaParam}
	 * @param params Formato Mapa con los parametros de la url Ej {idDespachoParam}=1229
	 * @param classConversion Tipo de clase de conversion 
	 * @return ServiceResponseResult.class
	 */
	public ServiceResponseResult callGetBearerTokenRequest( Map<String, String> params,String urlRequest, Class<?> classConversion,String token) {

		ServiceResponseResult response = ServiceResponseResult.builder()
				.isRespuesta(false).resultDescripcion("Sin datos").build();
							 	 
		UriComponentsBuilder uriBuilder = UriComponentsBuilder.fromHttpUrl(urlRequest);	
		ResponseEntity<String> responseEntity = null;

		try {								
			HttpHeaders headers = new HttpHeaders();
			headers.set(HttpHeaders.ACCEPT, 		MediaType.APPLICATION_JSON_VALUE);
			headers.set(HttpHeaders.CONTENT_TYPE,	MediaType.APPLICATION_JSON_VALUE);		    
			headers.set(HttpHeaders.AUTHORIZATION ,"Bearer " + token);			
			HttpEntity<String> request = new HttpEntity<>(headers);					              
			responseEntity = restTemplate.exchange(
						uriBuilder.buildAndExpand(params).toUri(), 
				        HttpMethod.GET, 
				        request, 
				        String.class);
			String bodyResponse = responseEntity.getBody();
			logger.info("--- RESPONSE ---");
			logger.info(bodyResponse);
			Object result  =  gson.fromJson(bodyResponse, Object.class); 
			response = ServiceResponseResult.builder()
											.isRespuesta(true)
											.resultDescripcion("Accion completada")
											.result(result)
											.build();	
		} catch (Exception e) {
			logger.error("ERROR GENERAL EN CONSUMO DE SERVICIO"+ e.getMessage());	
			response.setResultDescripcion( e.getMessage() );
		}		
		return response;
	}
	
	/**
	 * 
	 * @param url 
	 * @param params 
	 * @param classConversion
	 * @return
	 */
	public ServiceResponseResult callPostBearerTokenRequest( String params,String urlRequest, Class<?> classConversion,String token) {

		ServiceResponseResult response = ServiceResponseResult.builder()
				.isRespuesta(false).resultDescripcion("Sin datos").build();

		ResponseEntity<String> responseEntity = null;

		try {								
			HttpHeaders headers = new HttpHeaders();
			headers.set(HttpHeaders.ACCEPT, 		MediaType.APPLICATION_JSON_VALUE);
			headers.set(HttpHeaders.CONTENT_TYPE,	MediaType.APPLICATION_JSON_VALUE);		    
			headers.set(HttpHeaders.AUTHORIZATION ,"Bearer " + token);		
			
			HttpEntity<String> request = new HttpEntity<>(params, headers);			
			responseEntity = restTemplate.postForEntity(urlRequest, request, String.class);			
			String bodyResponse = responseEntity.getBody();
			logger.info("--- RESPONSE ---");
			logger.info(bodyResponse);
			Object result  =  gson.fromJson(bodyResponse, Object.class); 
			response = ServiceResponseResult.builder()
											.isRespuesta(true)
											.resultDescripcion("Accion completada")
											.result(result)
											.build();	
		} catch (Exception e) {
			logger.error("ERROR GENERAL EN CONSUMO DE SERVICIO"+e.getMessage());	
			response.setResultDescripcion( e.getMessage() );
		}		
		return response;

	}

}
