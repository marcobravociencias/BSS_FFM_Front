package com.totalplay.ffm.config.mybatis;


import javax.sql.DataSource;

import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;

import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.transaction.PlatformTransactionManager;

@Configuration
@MapperScan(basePackages="com.totalplay.ffm.plantainterna.repository",sqlSessionFactoryRef="sqslSessionFactoryPI")
public class MyBatisConfigPI {
	public final String MAPPER_LOCATIONS_PATHPI = "classpath*:com/totalplay/ffm/plantainterna/mapper/*.xml"; 

	@Autowired
	@Qualifier("dataSourcePI")
	private DataSource dataSourcePI;
	


	@Bean("sqslSessionFactoryPI")
	public SqlSessionFactoryBean sqlSessionFactory() throws Exception {
		SqlSessionFactoryBean sessionFactory = new SqlSessionFactoryBean();		
		PathMatchingResourcePatternResolver pathResolver = new PathMatchingResourcePatternResolver();
		sessionFactory.setDataSource(dataSourcePI);
		sessionFactory.setMapperLocations(pathResolver.getResources(MAPPER_LOCATIONS_PATHPI));
		return sessionFactory;
	}	
	@Bean
	public PlatformTransactionManager transactionManagerPI() {
		  DataSourceTransactionManager transactionManager = new DataSourceTransactionManager(dataSourcePI);
		  transactionManager.setGlobalRollbackOnParticipationFailure(false);
		  return transactionManager;
	}			
}
