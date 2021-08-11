package com.mx.totalplay.ffm.cloudweb.utilerias.service.impl;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;
import com.google.gson.Gson;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.LoginResult;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.Permiso;
import com.mx.totalplay.ffm.cloudweb.utilerias.service.AutentificacionService;
import com.mx.totalplay.ffm.cloudweb.utilerias.utils.ConsumeRest;


@Service
public class ImplAutentificacionService  implements AutentificacionService{
	
	private final Logger logger = LogManager.getLogger(ImplAutentificacionService.class.getName());
	private final Environment env;
	private final ConsumeRest restCaller;
	private final int VALOR_NAVBAR=5;
	private Gson gson = new Gson();

	@Autowired
	public ImplAutentificacionService(Environment env, ConsumeRest restCaller) {
		this.env = env;
		this.restCaller = restCaller;
	}
	
	@Override
	public LoginResult getAutentificacion(String us, String crdospas) {		
		logger.info("jgetAutentificacion## "+us+" -- "+crdospas);
		String urlService=env.getProperty("dep.envirom.web").concat(":8151/ffm/login/auth/");		
		LoginResult responseLog = (LoginResult) restCaller.callPostReturnClassBasicAuthXwwwUrlFormed(
				urlService ,  us, crdospas, LoginResult.class
		);
		Map<String, String> configuraciones = responseLog.getConfiguraciones();
		String ordenamiento=(String)configuraciones.get("NAVBAR_ORDER");		
		
		responseLog.setPermisos( retornarListOrdenamiento(responseLog.getPermisos(),ordenamiento));		
		
		Optional<Permiso> streamResult = responseLog.getPermisos()
				 .stream().filter(e-> !e.isDentroNavbar()).findAny();
		
		responseLog.setBanderaPintarOtros( streamResult.isPresent() );
				 		
		logger.info("RESULT" + gson.toJson(responseLog));
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
		
		int lastOrden=permisosFound.get( permisosFound.size()-1 ).getOrdenConfig();
		logger.info("##lastOrden "+lastOrden+"permisosFound.size()"+permisosFound.size());		
		
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
