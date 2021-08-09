package com.mx.totalplay.ffm.cloudweb.utilerias.service.impl;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.LoginResult;
import com.mx.totalplay.ffm.cloudweb.utilerias.service.AutentificacionService;
import com.mx.totalplay.ffm.cloudweb.utilerias.utils.ConstantesGeneric;
import com.mx.totalplay.ffm.cloudweb.utilerias.utils.ConsumeRest;


@Service
public class ImplAutentificacionService  implements AutentificacionService{
	
	private final Logger logger = LogManager.getLogger(ImplAutentificacionService.class.getName());
	private final Environment env;
	private final ConsumeRest restCaller;
	private Gson gson = new Gson();

	@Autowired
	public ImplAutentificacionService(Environment env, ConsumeRest restCaller) {
		this.env = env;
		this.restCaller = restCaller;
	}

	@Override
	public LoginResult getAutentificacion(String us, String crdospas) {
		
		logger.info("jgetAutentificacion## "+us+" -- "+crdospas);
					
		//String urlService = constantesGeneric.getDirIpInicioService() + constantesGeneric.getWsUrlValidausrffm();
		//String urlService="http://login/ffm/login/auth/";
		String urlService=env.getProperty("dep.envirom.web").concat(":8151/ffm/login/auth/");
		

		LoginResult responseLog = (LoginResult) restCaller.callPostReturnClassBasicAuthXwwwUrlFormed(
				urlService ,  us, crdospas, LoginResult.class
		);
								
		logger.info("jsonstring\n" +gson.toJson(  responseLog ));

//		JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
//		String paramacc=jsonObject.get("yekparam").getAsString();
		
		logger.info("RESULT" + gson.toJson(responseLog));
		return responseLog;
	}

}
