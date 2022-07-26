package com.mx.totalplay.ffm.cloudweb.utilerias.service.impl;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Base64;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.LoginResult;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.Permiso;
import com.mx.totalplay.ffm.cloudweb.utilerias.service.AutentificacionService;
import com.mx.totalplay.ffm.cloudweb.utilerias.service.GenericAccionesService;
import com.mx.totalplay.ffm.cloudweb.utilerias.utils.ConsumeRest;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.ConfiguracionesGenerales;

@Service
public class ImplAutentificacionService  implements AutentificacionService{
	
	private final Logger logger = LogManager.getLogger(ImplAutentificacionService.class.getName());
	private final Environment env;
	private final ConsumeRest restCaller;
	private final int VALOR_NAVBAR=5;
	private Gson gson = new Gson();
    private final GenericAccionesService genericAccionesService;


	@Autowired
	public ImplAutentificacionService(Environment env, ConsumeRest restCaller, GenericAccionesService genericAccionesService) {
		this.env = env;
		this.restCaller = restCaller;
		this.genericAccionesService = genericAccionesService;
	}
	
	@Override
	public LoginResult getAutentificacion(String us, String crdospas) {		
		logger.info("jgetAutentificacion## "+us+" -- "+crdospas);
		String urlService="http://34.94.124.52/dsfc/login/auth/";	
	    //String urlService=env.getProperty("dep.envirom.web").concat(":8151").concat(env.getProperty("ws.url.validausrffm"));     

		LoginResult responseLog = (LoginResult) restCaller.callPostReturnClassBasicAuthXwwwUrlFormed(
				urlService ,  us, crdospas, LoginResult.class
		);
		
		 JsonObject dataLog = new JsonObject();
	     dataLog.addProperty("idModulo", 32);
	     dataLog.addProperty("comentarios", "test");
	     dataLog.addProperty("descripcionEstatusHttp", "error");
	     dataLog.addProperty("descripcionAccion", "Inicio de sesión");
	     dataLog.addProperty("descripcionMensajeHttp", "Ha ocurrido un error al iniciar sesión con el usuario " + us);
	     dataLog.addProperty("idOrigen", 1);
		
		String urlPermisos=env.getProperty("dep.envirom.web").concat(":8133").concat(env.getProperty("ws.url.validausrffmpermisos"));
		Map<String, String> paramsGet = new HashMap<String, String>();
		paramsGet.put("idUsuario", ""+responseLog.getIdUsuario());
		paramsGet.put("idOrigen", "1");

		LoginResult permisosModulos = (LoginResult) restCaller.callGetBearerTokenRequestReturnClass(paramsGet, urlPermisos, LoginResult.class, responseLog.getAccess_token());
		
		logger.info(gson.toJson(permisosModulos));
				
		
		responseLog.setModulos(permisosModulos.getModulos());
		responseLog.setConfiguraciones(permisosModulos.getConfiguracionesGenerales());
		logger.info(gson.toJson(responseLog));
		if (responseLog.getIdUsuario() != 0) {
			
		    dataLog.addProperty("descripcionEstatusHttp", "success");
			dataLog.addProperty("descripcionMensajeHttp", "El usuario " + us + " ha iniciado sesión");
			
			String base64Creds = Base64.getEncoder().encodeToString(crdospas.getBytes());
			responseLog.setCreedResult(base64Creds);
			Map<String, Object> configuraciones = responseLog.getConfiguraciones();
			String ordenamiento=(String)configuraciones.get("NAVBAR_ORDER");//"moduloBandejasSalesforce,moduloUsuarios";
			if (responseLog.getModulos().size() != 0) {
				
				if (ordenamiento != null) {
					 	
					//ordenamiento=ordenamiento.replaceAll("moduloDespacho", "moduloDespachoPE");

					responseLog.setModulos( retornarListOrdenamiento(responseLog.getModulos(),ordenamiento));		
					
					Optional<Permiso> streamResult = responseLog.getModulos()
							 .stream().filter(e-> !e.isDentroNavbar()).findAny();
					
					responseLog.setBanderaPintarOtros( streamResult.isPresent() );
				} else {
					ordenamiento=String.join(",", responseLog.getModulos().stream().map(e-> {return e.getClave();}).collect(Collectors.toList()));
				}
			}
		}
		logger.info("RESULT" + gson.toJson(responseLog));

		genericAccionesService.agregarMensajeAccionServiceLogin(dataLog.toString(),responseLog.getAccess_token());
		return responseLog;
	}
	
	//Metodo para ordenar los tabs y saber si van a ir dentro del nav o fuera de
	public List<Permiso> retornarListOrdenamiento(List<Permiso> permisos,String ordenamiento) {
		logger.info("retornarListOrdenamiento permisos" + gson.toJson(permisos));
		logger.info("retornarListOrdenamiento ordenamiento" + gson.toJson(ordenamiento));

		List<String>listadoOrdenamiento=Arrays.asList(
				Optional.of(ordenamiento).isPresent() ? ordenamiento.split(",") : new String[0]
		); 
		logger.info("retornarListOrdenamiento listadoOrdenamiento" + gson.toJson(listadoOrdenamiento));

		permisos=permisos.stream().map(e->{ e.setOrdenConfig(-1); return e ;}) .collect(Collectors.toList());	
		int index=0;
		for(Permiso e:permisos) {
			/*if(e.getClave()!= null && e.getClave().trim().equals("moduloDespacho")) 
				e.setClave("moduloDespachoPE");*/
			
				
			e.setOrdenConfig(-1);
			for(String orden:listadoOrdenamiento) {
				if(e.getClave().trim().equals(orden))
					e.setOrdenConfig(index);
					
				index++;
			}
			index=0;
		}
		List<Permiso> permisoNotfound=permisos.stream().filter(e-> e.getOrdenConfig() == -1).collect(Collectors.toList());

		List<Permiso> permisosFound=permisos.stream()			
				.sorted(Comparator.comparing(Permiso::getOrdenConfig))
				.filter(e-> e.getOrdenConfig() != -1)			
				.collect(Collectors.toList());
		
		int lastOrden=permisosFound.size() >0  ? permisosFound.get( permisosFound.size()-1 ).getOrdenConfig() : 0;
			
		
		for(Permiso permis:permisoNotfound) {
			permis.setOrdenConfig(++lastOrden);			
		}
		logger.info("##found "+gson.toJson(permisosFound));		
		logger.info("## not found"+gson.toJson(permisoNotfound));
		
		List<Permiso>nuevoOrdenamiento=new ArrayList<Permiso>();
		nuevoOrdenamiento.addAll(permisosFound);
		nuevoOrdenamiento.addAll(permisoNotfound);
		logger.info("## not nuevoOrdenamiento"+gson.toJson(nuevoOrdenamiento));
		
		if(nuevoOrdenamiento.size() > VALOR_NAVBAR ) {
			int indexOrder=0;
			for(Permiso p:nuevoOrdenamiento) {
				p.setDentroNavbar(indexOrder >= VALOR_NAVBAR ? false : true );
				indexOrder++;
			}
		}else {
			for(Permiso p:nuevoOrdenamiento) {
				p.setDentroNavbar(true);
			}
		}
		return nuevoOrdenamiento;
	}

}
