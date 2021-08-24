package com.mx.totalplay.ffm.cloudweb.config.security;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.security.access.ConfigAttribute;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.FilterInvocation;
import org.springframework.util.AntPathMatcher;

import com.google.gson.Gson;
import com.mx.totalplay.ffm.cloudweb.plantainterna.controller.DespachoPIController;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.LoginResult;
import com.mx.totalplay.ffm.cloudweb.utilerias.utils.ConstSystem;
import com.mx.totalplay.ffm.cloudweb.utilerias.utils.SystemInfo;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.Permiso;
public class MyFilterInvocationSecurityMeatadataSource implements org.springframework.security.web.access.intercept.FilterInvocationSecurityMetadataSource {
	
	private final AntPathMatcher antPathMatcher = new AntPathMatcher();
	private  final Logger logger = LogManager.getLogger(DespachoPIController.class.getName());
	
	/*
	Map<String,String> urlRoleMap = new HashMap<String,String>(){{
        put("/homePage","ROLE_USER");

        put("/req/**","ROLE_USER");
        put("/enrutarUser","ROLE_USER");
        put("/","ROLE_ANONYMOUS");
    	put("/","ROLE_USER");
		put("/loginPage","ROLE_USER");
		put("/loginPage","ROLE_ANONYMOUS");
		put("/detailsHelp","ROLE_USER");
		
		
		
        put("/moduloDespacho","ROLE_USER");
        put("/moduloConsultaOt","ROLE_USER");       

        put("/moduloUsuarios","ROLE_USER");
        put("/moduloDisponibilidad","ROLE_USER");
        put("/reportesPI","ROLE_USER");
        put("/coordInst","ROLE_USER");
        put("/moduloSkills","ROLE_USER");
        put("/busqueda","ROLE_USER");
		put("/detailsHelp","ROLE_USER");
		put("/","ROLE_USER");
		put("/loginPage","ROLE_USER");
		put("/loginPage","ROLE_ANONYMOUS");
		put("/ordenesuniversales","ROLE_USER");
        put("/moduloVehiculos","ROLE_USER");
	
	}};
	*/
	private final Map<String,String> urlRoleMapRespaldo = new HashMap<String,String>(){{
        put("/","ROLE_ANONYMOUS");
		put("/loginPage","ROLE_ANONYMOUS");
		put("/**","ROLE_USER");
	}};
    
    
    
        
	@Override
	public Collection<ConfigAttribute> getAttributes(Object object) throws IllegalArgumentException {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		logger.info(new Gson().toJson(auth.getPrincipal()));
		logger.info("###########. counting");
		ConstSystem.sumar();
		SystemInfo.Info();
		Map<String,String> urlRoleMap = new HashMap<String, String>();
		if(!auth.getPrincipal().toString().equals("anonymousUser")) {
			LoginResult result = new Gson().fromJson(new Gson().toJson(auth.getPrincipal()).toString(), LoginResult.class);
			urlRoleMap = result.getPermiAccUs();
		} else {
			urlRoleMap = urlRoleMapRespaldo;
		}
		
				
		
		// TODO Auto-generated method stub
		FilterInvocation fi = (FilterInvocation) object;
		String url = fi.getRequestUrl();
		if(auth.getPrincipal().toString().equals("anonymousUser") && url.equals("/") ) {
			url = "homePage";
		}
		if(auth.getPrincipal().toString().equals("anonymousUser") && url.equals("/error")) {
			url = "/";
		}
		if(!auth.getPrincipal().toString().equals("anonymousUser") && url.equals("/loginPage")) {
			url = "/";
		}
		
		/**if(loginResult.getPermisos() !=null) {
			for (Permiso permiso:loginResult.getPermisos()) {
				urlRoleMap.put( permiso.getClave(),"ROLE_USER");
			}
		}
		**/
		for(Map.Entry<String,String> entry:urlRoleMap.entrySet()){
			
			boolean containsSigno=url.contains("?");
			
			if( containsSigno ) url=url.substring(0,url.indexOf("?"));
				
            if(antPathMatcher.match(entry.getKey(),url)  ){
                return org.springframework.security.access.SecurityConfig.createList(entry.getValue());
            }
        }
		return org.springframework.security.access.SecurityConfig.createList("ROLE_ANONYMOUS");
		//return null;
	}

	@Override
	public Collection<ConfigAttribute> getAllConfigAttributes() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public boolean supports(Class<?> clazz) {
		// TODO Auto-generated method stub
		return false;
	}

}
