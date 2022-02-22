package com.mx.totalplay.ffm.cloudweb.utilerias.utils;

import java.util.Base64;
import java.util.Map;
import org.apache.http.client.HttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Lazy;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.HttpClientErrorException;
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

    /**
    @Autowired
    @Qualifier("clienteRestBalanced")
    RestTemplate restTemplateReferencia;**/

    @Autowired
    @Qualifier("clienteRest")
    RestTemplate restTemplate;

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
       
            int valueEstatusCode=responseEntity.getStatusCode() == null  ? -1 : responseEntity.getStatusCode().value() ;
            logger.info("--- RESPONSE ESTATUS ---"+valueEstatusCode);
            
            response = ServiceResponseResult.builder()
            		.isRespuesta(true)
            		.resultDescripcion("Accion completada")
            		.codigoEstatusService(valueEstatusCode)
                    .result(result).build();

        } catch (Exception e) {
            logger.error("ERROR GENERAL EN CONSUMO DE SERVICIO", e.getMessage());
            response.setResultDescripcion(e.getMessage());
        }
        return response;
    }

    public Object callPostReturnClassBasicAuthXwwwUrlFormed(String url, String us, String passCod, Class<?> classConversion) {
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

            return gson.fromJson(gson.toJson(
                    LoginResult.builder().
                            mensaje("Ocurrio un error en la autenticacion")
                            .description("Usuario o contrase�a incorrectos")
                            .build()
            ), classConversion);
        }
    }
/**
    public Object callPostReturnClassBasicAuthXwwwUrlFormedRefencia(String url, String us, String passCod, Class<?> classConversion) {
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

            responseEntity = restTemplateReferencia.postForEntity(url, request, String.class);




            response = responseEntity.getBody().toString();
            return gson.fromJson(response, classConversion);
        } catch (Exception e) {
            e.printStackTrace();
            logger.error("ERROR GENERAL EN CONSUMO DE SERVICIO", e.getMessage());

            return gson.fromJson(gson.toJson(
                    LoginResult.builder().
                            mensaje("Ocurrio un error en la autenticacion")
                            .description("Usuario o contrase�a incorrectos")
                            .build()
            ), classConversion);
        }
    }
**/

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

            return gson.fromJson(gson.toJson(
                    LoginResult.builder().
                            mensaje("Ocurrio un error en la autenticacion")
                            .description("Usuario o contrase�a incorrectos")
                            .build()
            ), classConversion);
        }
    }

    /**
     * @param urlRequest
     * @param params
     * @param classConversion
     * @return
     */
    public ServiceResponseResult callPatchBearerTokenRequest(String params, String urlRequest, Class<?> classConversion, String token) {
        ServiceResponseResult response = ServiceResponseResult.builder().isRespuesta(false).resultDescripcion("Sin datos").build();
        ResponseEntity<String> responseEntity = null;
        HttpClient client = HttpClients.createDefault();
        HttpComponentsClientHttpRequestFactory httpRequestFactory = new HttpComponentsClientHttpRequestFactory(client);
        httpRequestFactory.setConnectTimeout(6000);
        httpRequestFactory.setReadTimeout(6000);

        restTemplate.setRequestFactory(httpRequestFactory);
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.set(HttpHeaders.ACCEPT, MediaType.APPLICATION_JSON_VALUE);
            headers.set(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE);
            headers.set(HttpHeaders.AUTHORIZATION, "Bearer " + token);
            HttpEntity<String> request = new HttpEntity<>(params, headers);
            logger.info("Ingresa a funcion patch: "+request);
            responseEntity = restTemplate.exchange(urlRequest, 
            		HttpMethod.PATCH, 
            		request, 
            		String.class);
            logger.info("Sale de funcion patch");
            String bodyResponse = responseEntity.getBody();
            logger.info("--- RESPONSE ---");
            logger.info(bodyResponse);
            Object result = gson.fromJson(bodyResponse, Object.class);
            int valueEstatusCode=responseEntity.getStatusCode() == null  ? -1 : responseEntity.getStatusCode().value() ;
            logger.info("--- RESPONSE ESTATUS ---"+valueEstatusCode);
            response = ServiceResponseResult.builder()
                    .isRespuesta(true)
                    .resultDescripcion("Accion completada")
                    .result(result)
                    .codigoEstatusService(valueEstatusCode)
                    .build();
        }catch (HttpClientErrorException httpErrorException){
            switch (httpErrorException.getRawStatusCode()){
                case 403:
                    logger.error("ERROR GENERAL EN CONSUMO DE SERVICIO" + httpErrorException.getMessage());
                    response = ServiceResponseResult.builder()
                            .result(httpErrorException.getRawStatusCode())
                            .resultDescripcion(httpErrorException.getMessage()).build();
                    break;
                default:
                    response = ServiceResponseResult.builder()
                            .resultDescripcion(httpErrorException.getMessage()).build();
                    break;
            }
        } catch (Exception e) {
            logger.error("ERROR GENERAL EN CONSUMO DE SERVICIO" + e.getMessage());
            response.setResultDescripcion(e.getMessage());

        }
        return response;

    }
    
    /**
     * @param urlRequest             Contieene url con parametros ejemplo /despacho/{idDespachoParam}/fecha/{fechaParam}
     * @param params          Formato Mapa con los parametros de la url Ej {idDespachoParam}=1229
     * @param classConversion Tipo de clase de conversion
     * @return ServiceResponseResult.class
     */
    public ServiceResponseResult callPostBearerTokenRequestURL(Map<String, String> params, String urlRequest, Class<?> classConversion, String token) {

        ServiceResponseResult response = ServiceResponseResult.builder()
                .isRespuesta(false).resultDescripcion("Sin datos").build();

        UriComponentsBuilder uriBuilder = UriComponentsBuilder.fromHttpUrl(urlRequest);
        ResponseEntity<String> responseEntity = null;

        try {
            HttpHeaders headers = new HttpHeaders();
            headers.set(HttpHeaders.ACCEPT, MediaType.APPLICATION_JSON_VALUE);
            headers.set(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE);
            headers.set(HttpHeaders.AUTHORIZATION, "Bearer " + token);
            HttpEntity<String> request = new HttpEntity<>(headers);
            responseEntity = restTemplate.exchange(
                    uriBuilder.buildAndExpand(params).toUri(),
                    HttpMethod.POST,
                    request,
                    String.class);
            String bodyResponse = responseEntity.getBody();
            logger.info("--- RESPONSE ---***");
            logger.info(bodyResponse);
            Object result = gson.fromJson(bodyResponse, Object.class);
            int valueEstatusCode=responseEntity.getStatusCode() == null  ? -1 : responseEntity.getStatusCode().value() ;
            logger.info("--- RESPONSE ESTATUS ---"+valueEstatusCode);
            response = ServiceResponseResult.builder()
                    .isRespuesta(true)
                    .resultDescripcion("Accion completada")
                    .result(result)
                    .codigoEstatusService(valueEstatusCode)
                    .build();
        }catch (HttpClientErrorException httpErrorException){
            switch (httpErrorException.getRawStatusCode()){
                case 403:
                    logger.error("ERROR GENERAL EN CONSUMO DE SERVICIO" + httpErrorException.getMessage());
                    response = ServiceResponseResult.builder()
                            .result(httpErrorException.getRawStatusCode())
                            .resultDescripcion(httpErrorException.getMessage()).build();
                    break;
                default:
                    response = ServiceResponseResult.builder()
                            .resultDescripcion(httpErrorException.getMessage()).build();
                    break;
            }
        } catch (Exception e) {
            logger.error("ERROR GENERAL EN CONSUMO DE SERVICIO" + e.getMessage());
            response.setResultDescripcion(e.getMessage());
        }
        return response;
    }

    /**
     * @param urlRequest             Contieene url con parametros ejemplo /despacho/{idDespachoParam}/fecha/{fechaParam}
     * @param params          Formato Mapa con los parametros de la url Ej {idDespachoParam}=1229
     * @param classConversion Tipo de clase de conversion
     * @return ServiceResponseResult.class
     */
    public ServiceResponseResult callGetBearerTokenRequest(Map<String, String> params, String urlRequest, Class<?> classConversion, String token) {

        ServiceResponseResult response = ServiceResponseResult.builder()
                .isRespuesta(false).resultDescripcion("Sin datos").build();

        UriComponentsBuilder uriBuilder = UriComponentsBuilder.fromHttpUrl(urlRequest);
        ResponseEntity<String> responseEntity = null;

        try {
            HttpHeaders headers = new HttpHeaders();
            headers.set(HttpHeaders.ACCEPT, MediaType.APPLICATION_JSON_VALUE);
            headers.set(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE);
            headers.set(HttpHeaders.AUTHORIZATION, "Bearer " + token);
            HttpEntity<String> request = new HttpEntity<>(headers);
            responseEntity = restTemplate.exchange(
                    uriBuilder.buildAndExpand(params).toUri(),
                    HttpMethod.GET,
                    request,
                    String.class);
            String bodyResponse = responseEntity.getBody();
            logger.info("--- RESPONSE ---");
            logger.info(bodyResponse);
            Object result = gson.fromJson(bodyResponse, Object.class);
            int valueEstatusCode=responseEntity.getStatusCode() == null  ? -1 : responseEntity.getStatusCode().value() ;
            logger.info("--- RESPONSE ESTATUS ---"+valueEstatusCode);
     
            response = ServiceResponseResult.builder()
                    .isRespuesta(true)
                    .resultDescripcion("Accion completada")
                    .result(result)
                    .codigoEstatusService(valueEstatusCode)
                    .build();
        }catch (HttpClientErrorException httpErrorException){
            switch (httpErrorException.getRawStatusCode()){
                case 403:
                    logger.error("ERROR GENERAL EN CONSUMO DE SERVICIO" + httpErrorException.getMessage());
                    response = ServiceResponseResult.builder()
                            .result(httpErrorException.getRawStatusCode())
                            .resultDescripcion(httpErrorException.getMessage()).build();
                    break;
                default:
                    response = ServiceResponseResult.builder()
                            .resultDescripcion(httpErrorException.getMessage()).build();
                    break;
            }
        } catch (Exception e) {
            logger.error("ERROR GENERAL EN CONSUMO DE SERVICIO" + e.getMessage());
            response.setResultDescripcion(e.getMessage());
        }
        return response;
    }

    /**
     * @param urlRequest
     * @param params
     * @param classConversion
     * @return
     */
    public ServiceResponseResult callPostBearerTokenRequest(String params, String urlRequest, Class<?> classConversion, String token) {

        ServiceResponseResult response = ServiceResponseResult.builder()
                .isRespuesta(false).resultDescripcion("Sin datos").build();

        ResponseEntity<String> responseEntity = null;

        try {
            HttpHeaders headers = new HttpHeaders();
            headers.set(HttpHeaders.ACCEPT, MediaType.APPLICATION_JSON_VALUE);
            headers.set(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE);
            headers.set(HttpHeaders.AUTHORIZATION, "Bearer " + token);

            HttpEntity<String> request = new HttpEntity<>(params, headers);
            responseEntity = restTemplate.postForEntity(urlRequest, request, String.class);
            String bodyResponse = responseEntity.getBody();
            logger.info("--- RESPONSE ---");
            logger.info(bodyResponse);
            Object result = gson.fromJson(bodyResponse, Object.class);
            
            int valueEstatusCode=responseEntity.getStatusCode() == null  ? -1 : responseEntity.getStatusCode().value() ;
            logger.info("--- RESPONSE ESTATUS ---"+valueEstatusCode);
            response = ServiceResponseResult.builder()
                    .isRespuesta(true)
                    .resultDescripcion("Accion completada")
                    .result(result)
                    .codigoEstatusService(valueEstatusCode)
                    .build();
                                    
        } catch (HttpClientErrorException httpErrorException){
            switch (httpErrorException.getRawStatusCode()){
                case 403:
                    logger.error("ERROR GENERAL EN CONSUMO DE SERVICIO" + httpErrorException.getMessage());
                    response = ServiceResponseResult.builder()
                                                    .result(httpErrorException.getRawStatusCode())
                                                    .resultDescripcion(httpErrorException.getMessage()).build();
                    break;
                default:
                    response = ServiceResponseResult.builder()
                                                    .resultDescripcion(httpErrorException.getMessage()).build();
                    break;
            }
        } catch (Exception e) {
            logger.error("ERROR GENERAL EN CONSUMO DE SERVICIO" + e.getMessage());
            response.setResultDescripcion(e.getMessage());
        }
        return response;

    }

    public ServiceResponseResult callPutBearerTokenRequest(String params, String urlRequest, Class<?> classConversion, String token) {

        ServiceResponseResult response = ServiceResponseResult.builder()
                .isRespuesta(false).resultDescripcion("Sin datos").build();

        ResponseEntity<String> responseEntity = null;

        try {
            HttpHeaders headers = new HttpHeaders();
            headers.set(HttpHeaders.ACCEPT, MediaType.APPLICATION_JSON_VALUE);
            headers.set(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE);
            headers.set(HttpHeaders.AUTHORIZATION, "Bearer " + token);

            HttpEntity<String> request = new HttpEntity<>(params, headers);
            responseEntity = restTemplate.exchange(
                    urlRequest,
                    HttpMethod.PUT,
                    request,
                    String.class);
            String bodyResponse = responseEntity.getBody();
            logger.info("--- RESPONSE ---");
            logger.info(bodyResponse);
            Object result = gson.fromJson(bodyResponse, Object.class);
            int valueEstatusCode=responseEntity.getStatusCode() == null  ? -1 : responseEntity.getStatusCode().value() ;
            logger.info("--- RESPONSE ESTATUS ---"+valueEstatusCode);
            response = ServiceResponseResult.builder()
                    .isRespuesta(true)
                    .resultDescripcion("Accion completada")
                    .result(result)
                    .codigoEstatusService(valueEstatusCode)
                    .build();
            
        }catch (HttpClientErrorException httpErrorException){
            switch (httpErrorException.getRawStatusCode()){
                case 403:
                    logger.error("ERROR GENERAL EN CONSUMO DE SERVICIO" + httpErrorException.getMessage());
                    response = ServiceResponseResult.builder()
                            .result(httpErrorException.getRawStatusCode())
                            .resultDescripcion(httpErrorException.getMessage()).build();
                    break;
                default:
                    response = ServiceResponseResult.builder()
                            .resultDescripcion(httpErrorException.getMessage()).build();
                    break;
            }
        } catch (Exception e) {
            logger.error("ERROR GENERAL EN CONSUMO DE SERVICIO" + e.getMessage());
            response.setResultDescripcion(e.getMessage());
        }
        return response;

    }

    public ServiceResponseResult callPatchBearerTokenRequestURL(Map<String, String> paramUri, String paramsObject, String urlRequest, Class<ServiceResponseResult> serviceResponseResultClass, String token) {
        ServiceResponseResult response = ServiceResponseResult.builder().isRespuesta(false).resultDescripcion("Sin datos").build();
        ResponseEntity<String> responseEntity = null;

        UriComponentsBuilder uriBuilder = UriComponentsBuilder.fromHttpUrl(urlRequest);
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.set(HttpHeaders.ACCEPT, MediaType.APPLICATION_JSON_VALUE);
            headers.set(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE);
            headers.set(HttpHeaders.AUTHORIZATION, "Bearer " + token);
            HttpEntity<String> request = new HttpEntity<>(paramsObject, headers);
            HttpComponentsClientHttpRequestFactory requestFactory = new HttpComponentsClientHttpRequestFactory();
            restTemplate.setRequestFactory(requestFactory);

            responseEntity = restTemplate.exchange(
                    uriBuilder.buildAndExpand(paramUri).toUri(),
                    HttpMethod.PATCH,
                    request,
                    String.class);
            
            logger.info("Sale de funcion patch");
            String bodyResponse = responseEntity.getBody();
            logger.info("--- RESPONSE ---");
            logger.info(bodyResponse);
            Object result = gson.fromJson(bodyResponse, Object.class);
            
            int valueEstatusCode=responseEntity.getStatusCode() == null  ? -1 : responseEntity.getStatusCode().value() ;
            logger.info("--- RESPONSE ESTATUS ---"+valueEstatusCode);

            response = ServiceResponseResult.builder()
                    .isRespuesta(true)
                    .resultDescripcion("Accion completada")
                    .result(result)
                    .codigoEstatusService(valueEstatusCode)
                    .build();
        }catch (HttpClientErrorException httpErrorException){
            switch (httpErrorException.getRawStatusCode()){
                case 403:
                    logger.error("ERROR GENERAL EN CONSUMO DE SERVICIO" + httpErrorException.getMessage());
                    response = ServiceResponseResult.builder()
                            .result(httpErrorException.getRawStatusCode())
                            .resultDescripcion(httpErrorException.getMessage()).build();
                    break;
                default:
                    response = ServiceResponseResult.builder()
                            .resultDescripcion(httpErrorException.getMessage()).build();
                    break;
            }
        } catch (Exception e) {
            logger.error("ERROR GENERAL EN CONSUMO DE SERVICIO" + e.getMessage());
            response.setResultDescripcion(e.getMessage());

        }
        return response;
    }

    public ServiceResponseResult callPostBearerTokenRequestURL2(Map<String, String> paramUri, String paramsObject, String urlRequest, Class<ServiceResponseResult> serviceResponseResultClass, String token) {
        ServiceResponseResult response = ServiceResponseResult.builder()
                .isRespuesta(false).resultDescripcion("Sin datos").build();

        UriComponentsBuilder uriBuilder = UriComponentsBuilder.fromHttpUrl(urlRequest);
        ResponseEntity<String> responseEntity = null;

        try {
            HttpHeaders headers = new HttpHeaders();
            headers.set(HttpHeaders.ACCEPT, MediaType.APPLICATION_JSON_VALUE);
            headers.set(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE);
            headers.set(HttpHeaders.AUTHORIZATION, "Bearer " + token);
            HttpEntity<String> request = new HttpEntity<>(paramsObject,headers);
            responseEntity = restTemplate.exchange(
                    uriBuilder.buildAndExpand(paramUri).toUri(),
                    HttpMethod.POST,
                    request,
                    String.class);
            String bodyResponse = responseEntity.getBody();
            logger.info("--- RESPONSE ---***");
            logger.info(bodyResponse);
            Object result = gson.fromJson(bodyResponse, Object.class);
            
            int valueEstatusCode=responseEntity.getStatusCode() == null  ? -1 : responseEntity.getStatusCode().value() ;
            logger.info("--- RESPONSE ESTATUS ---"+valueEstatusCode);
            response = ServiceResponseResult.builder()
                    .isRespuesta(true)
                    .resultDescripcion("Accion completada")
                    .result(result)
                    .codigoEstatusService(valueEstatusCode)
                    .build();
                                    
        }catch (HttpClientErrorException httpErrorException){
            switch (httpErrorException.getRawStatusCode()){
                case 403:
                    logger.error("ERROR GENERAL EN CONSUMO DE SERVICIO" + httpErrorException.getMessage());
                    response = ServiceResponseResult.builder()
                            .result(httpErrorException.getRawStatusCode())
                            .resultDescripcion(httpErrorException.getMessage()).build();
                    break;
                case 500:
                    logger.error("ERROR GENERAL EN CONSUMO DE SERVICIO" + httpErrorException.getMessage());
                    response = ServiceResponseResult.builder()
                            .result(httpErrorException.getRawStatusCode())
                            .resultDescripcion(httpErrorException.getMessage()).build();
                    break;
                default:
                    response = ServiceResponseResult.builder()
                            .resultDescripcion(httpErrorException.getMessage()).build();
                    break;
            }
        } catch (Exception e) {
        	
            logger.error("ERROR GENERAL EN CONSUMO DE SERVICIO" + e.getMessage());
            response.setResultDescripcion(e.getMessage());
            response.setMensajeException(e.getMessage());

        }
        return response;
    }
    
    /**
     * @param urlRequest             Contieene url con parametros ejemplo /despacho/{idDespachoParam}/fecha/{fechaParam}
     * @param params          Formato Mapa con los parametros de la url Ej {idDespachoParam}=1229
     * @param classConversion Tipo de clase de conversion
     * @return ServiceResponseResult.class
     */
    public ServiceResponseResult callDeleteBearerTokenRequest(Map<String, String> params, String urlRequest, Class<?> classConversion, String token) {

        ServiceResponseResult response = ServiceResponseResult.builder()
                .isRespuesta(false).resultDescripcion("Sin datos").build();

        UriComponentsBuilder uriBuilder = UriComponentsBuilder.fromHttpUrl(urlRequest);
        ResponseEntity<String> responseEntity = null;

        try {
            HttpHeaders headers = new HttpHeaders();
            headers.set(HttpHeaders.ACCEPT, MediaType.APPLICATION_JSON_VALUE);
            headers.set(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE);
            headers.set(HttpHeaders.AUTHORIZATION, "Bearer " + token);
            
            HttpEntity<String> request = new HttpEntity<>(headers);
            responseEntity = restTemplate.exchange(
                    uriBuilder.buildAndExpand(params).toUri(),
                    HttpMethod.DELETE,
                    request,
                    String.class);
            String bodyResponse = responseEntity.getBody();
            logger.info("--- RESPONSE ---");
            logger.info(bodyResponse);
            Object result = gson.fromJson(bodyResponse, Object.class);
            
            
            int valueEstatusCode=responseEntity.getStatusCode() == null  ? -1 : responseEntity.getStatusCode().value() ;
            logger.info("--- RESPONSE ESTATUS ---"+valueEstatusCode);

            response = ServiceResponseResult.builder()
                    .isRespuesta(true)
                    .resultDescripcion("Accion completada")
                    .result(result)
                    .codigoEstatusService(valueEstatusCode)
                    .build();
        }catch (HttpClientErrorException httpErrorException){
            switch (httpErrorException.getRawStatusCode()){
                case 403:
                    logger.error("ERROR GENERAL EN CONSUMO DE SERVICIO" + httpErrorException.getMessage());
                    response = ServiceResponseResult.builder()
                            .result(httpErrorException.getRawStatusCode())
                            .resultDescripcion(httpErrorException.getMessage()).build();
                    break;
                default: 
                    response = ServiceResponseResult.builder()
                            .resultDescripcion(httpErrorException.getMessage()).build();
                    break;
            }
        } catch (Exception e) {
            logger.error("ERROR GENERAL EN CONSUMO DE SERVICIO" + e.getMessage());
            response.setResultDescripcion(e.getMessage());
        }
        return response;
    }
    
    /**
     * @param urlRequest             Contieene url con parametros ejemplo /despacho/{idDespachoParam}/fecha/{fechaParam}
     * @param params          Formato Mapa con los parametros de la url Ej {idDespachoParam}=1229
     * @param classConversion Tipo de clase de conversion
     * @return ServiceResponseResult.class
     */
    public Object callGetBearerTokenRequestReturnClass(Map<String, String> params, String urlRequest, Class<?> classConversion, String token) {
        String response = "";
        UriComponentsBuilder uriBuilder = UriComponentsBuilder.fromHttpUrl(urlRequest);
        ResponseEntity<String> responseEntity = null;

        try {
            HttpHeaders headers = new HttpHeaders();
            headers.set(HttpHeaders.ACCEPT, MediaType.APPLICATION_JSON_VALUE);
            headers.set(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE);
            headers.set(HttpHeaders.AUTHORIZATION, "Bearer " + token);
            HttpEntity<String> request = new HttpEntity<>(headers);
            responseEntity = restTemplate.exchange(
                    uriBuilder.buildAndExpand(params).toUri(),
                    HttpMethod.GET,
                    request,
                    String.class);
            response = responseEntity.getBody();
            
        }catch (HttpClientErrorException e){
        	logger.error("ERROR GENERAL EN CONSUMO DE SERVICIO", e.getMessage());

            return gson.fromJson(gson.toJson(
                    LoginResult.builder().
                            mensaje("Ocurrio un error en la autenticacion")
                            .description("Usuario o contrasena incorrectos")
                            .build()
            ), classConversion);
        }
        return gson.fromJson(response, classConversion);
    }
}