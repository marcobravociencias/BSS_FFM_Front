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
@MapperScan(basePackages="com.totalplay.ffm.plantaexterna.repository",sqlSessionFactoryRef="sqslSessionFactoryPE")
public class MyBatisConfigPE {
	public final String MAPPER_LOCATIONS_PATHPE = "classpath*:com/totalplay/ffm/plantaexterna/mapper/*.xml"; 
	
	@Autowired
	@Qualifier("dataSourcePE")
	private DataSource dataSourcePE;
	
	@Bean("sqslSessionFactoryPE")
	public SqlSessionFactoryBean sqlSessionFactoryPE() throws Exception {
		SqlSessionFactoryBean sessionFactory = new SqlSessionFactoryBean();		
		PathMatchingResourcePatternResolver pathResolver = new PathMatchingResourcePatternResolver();
		sessionFactory.setDataSource(dataSourcePE);
		sessionFactory.setMapperLocations(pathResolver.getResources(MAPPER_LOCATIONS_PATHPE));
		return sessionFactory;
	}	
	
	@Bean
	public PlatformTransactionManager transactionManagerPE() {
		  DataSourceTransactionManager transactionManager = new DataSourceTransactionManager(dataSourcePE);
		  transactionManager.setGlobalRollbackOnParticipationFailure(false);
		  return transactionManager;
	}
}
