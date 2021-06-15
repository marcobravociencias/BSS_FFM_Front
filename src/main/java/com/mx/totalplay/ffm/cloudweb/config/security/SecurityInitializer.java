package com.mx.totalplay.ffm.cloudweb.config.security;

import org.springframework.security.web.context.*;

/**Clase que inicializa spring configuration servlet
	The MessageSecurityWebApplicationInitializer will automatically register the springSecurityFilterChain 
	Filter for every URL in your application. 
	
	If Filters are added within other WebApplicationInitializer instances we can use @Order to control the ordering of the Filter instances.
**/
public class SecurityInitializer extends AbstractSecurityWebApplicationInitializer {
}