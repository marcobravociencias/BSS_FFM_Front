package com.totalplay.ffm.utilerias.service.impl;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.totalplay.ffm.utilerias.model.LoginResult;
import com.totalplay.ffm.utilerias.service.AutentificacionService;
import com.totalplay.ffm.utilerias.utils.ConstantesGeneric;
import com.totalplay.ffm.utilerias.utils.ConsumeRest;

@Service
public class ImplAutentificacionService  implements AutentificacionService{
	
	private  final Logger logger = LogManager.getLogger(ImplAutentificacionService.class.getName());
	
	@Autowired
	private ConstantesGeneric constantesGeneric;
	
	@Autowired
	private Environment env;
	
	@Autowired
	private ConsumeRest restCaller;
	
	Gson gson = new Gson();
	

	@Override
	public LoginResult getAutentificacion(String us, String crdospas) {
		
		logger.info("jgetAutentificacion## "+us+" -- "+crdospas);
					
		//String urlService = constantesGeneric.getDirIpInicioService() + constantesGeneric.getWsUrlValidausrffm();
		String urlService="http://94.74.70.52:8141/ffm/login/auth";
		LoginResult response = (LoginResult) restCaller.callPostReturnClassBasicAuthXwwwUrlFormed(urlService ,  us, crdospas, LoginResult.class );
		logger.info("RESULT" + gson.toJson(response));

		return response;
	}

}
