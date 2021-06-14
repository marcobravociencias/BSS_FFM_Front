package com.totalplay.ffm.config.spring;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;

import org.springframework.context.annotation.Bean;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.support.AnnotationConfigWebApplicationContext;
import org.springframework.web.servlet.support.AbstractAnnotationConfigDispatcherServletInitializer; 


//“SpringMVCWebAppInitializer” class is used to initialize “DispatcherServlet” without web.xml file in a Annotation based configuration.
public class SpringMVCInitializer  extends AbstractAnnotationConfigDispatcherServletInitializer { 
	   @Override
	    protected Class<?>[] getRootConfigClasses()  { 
	        return null; 
	    } 
	  
	    @Override
	    protected Class<?>[] getServletConfigClasses()  { 
	        return new Class[] { SpringMVCConfig.class }; 
	    } 
	  
	    @Override
	    protected String[] getServletMappings() { 
	        return new String[] { "/" }; 
	    } 
	   
	    @Override
	    protected WebApplicationContext createRootApplicationContext() {
	        AnnotationConfigWebApplicationContext rootContext = new AnnotationConfigWebApplicationContext();rootContext.register(SpringMVCConfig.class);
	        return rootContext;
	    }
	    /****/
	    
	    @Bean
	    public RestTemplate rest() {
	    	return new RestTemplate();
	    }
	     
}
