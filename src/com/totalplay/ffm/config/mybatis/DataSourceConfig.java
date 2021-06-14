package com.totalplay.ffm.config.mybatis;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

import javax.naming.NamingException;
import javax.sql.DataSource;
import org.springframework.jndi.JndiObjectFactoryBean;

@Configuration
public class DataSourceConfig {
	
	@Bean(name ="dataSourcePI")
	@Primary
	public DataSource dataSourceJNDIPI() throws IllegalArgumentException, NamingException {
	    JndiObjectFactoryBean bean = new JndiObjectFactoryBean();
	    bean.setJndiName("jdbc/FFMTPE");
	    bean.setProxyInterface(DataSource.class);
	    bean.setLookupOnStartup(false);
	    bean.afterPropertiesSet();
	    return (DataSource)bean.getObject();
	}		
	
	
	@Bean(name ="dataSourcePE")
	public DataSource dataSourceJNDIPE() throws IllegalArgumentException, NamingException {
	    JndiObjectFactoryBean bean = new JndiObjectFactoryBean();
	    bean.setJndiName("jdbc/FFMPE");
	    bean.setProxyInterface(DataSource.class);
	    bean.setLookupOnStartup(false);
	    bean.afterPropertiesSet();
	    return (DataSource)bean.getObject();
	}	
}
