package com.mx.totalplay.ffm.cloudweb.config.security;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import org.springframework.stereotype.Component;

import com.google.gson.Gson;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.LoginResult;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.Permiso;
import com.mx.totalplay.ffm.cloudweb.utilerias.service.AutentificacionService;
import com.mx.totalplay.ffm.cloudweb.utilerias.utils.ConstantesGeneric;

@Component
public class SecurityCustomAuthenticationProvider implements AuthenticationProvider {
	
	private  final Logger logger = LogManager.getLogger(SecurityCustomAuthenticationProvider.class.getName());
	Gson gson = new Gson();
	
	
	private final Map<String,String> urlRoleMap = new HashMap<String,String>(){{
		put("/req/**","ROLE_USER");
		put("/","ROLE_USER");
		put("/loginPage","ROLE_USER");
        put("/homePage","ROLE_USER");
        put("/enrutarUser","ROLE_USER");
        
        put("/moduloOrdenesUniversales","ROLE_USER");
    }};
    
    @Autowired
    Environment env;
    
    @Autowired 
    ConstantesGeneric constantesGeneric;
    
	@Autowired
	private AutentificacionService autentificacionService;

	 @Override
	    public Authentication authenticate(Authentication auth) 
	      throws AuthenticationException {
	        String username = auth.getName();
	        String password = auth.getCredentials().toString();
	        
	        LoginResult response = autentificacionService.getAutentificacion(username, password);
	        
	        if (response.getMensaje() == null ) {
	    		final List<GrantedAuthority> grantedAuths = new ArrayList<GrantedAuthority>();
	    		grantedAuths.add(new SimpleGrantedAuthority("ROLE_USER"));
	    		
	    		//SE AGREGAN LOS PERMISOS AL USUARIO
	    		
	    		for(Permiso permiso: response.getPermisos()) {
	    			urlRoleMap.put("/"+permiso.getClave(), "ROLE_USER");
	    		}
	    		response.setPermiAccUs(urlRoleMap);	    	
	    		
	    		logger.info("KEY GOOGLE $ "+constantesGeneric.getGoogAccLLaevATok());
	    		response.setGooglAcceLla(constantesGeneric.getGoogAccLLaevATok());
	    		response.setDireccionAmbiente( env.getProperty("dep.envirom.web")  );
	    		return new UsernamePasswordAuthenticationToken(response, password, grantedAuths);
	        	
	        } else {
	            throw new 
	              BadCredentialsException("External system authentication failed");
	        }
	    }

	@Override
	public boolean supports(Class<?> authentication) {
		return authentication.equals(UsernamePasswordAuthenticationToken.class);
	}
	
	
	
}
