package com.mx.totalplay.ffm.cloudweb;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
//import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
//import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.annotation.PropertySources;

//@EnableDiscoveryClient
@SpringBootApplication(scanBasePackages = "com.mx.totalplay.ffm.cloudweb.*")
@PropertySources({
	    @PropertySource("classpath:plantaexterna.properties"),
        @PropertySource("classpath:plantainterna.properties"),
        @PropertySource("classpath:generic.properties"),
        @PropertySource("classpath:cambiostatus.properties"),
        @PropertySource("classpath:parametrosasignacion.properties"),
	    @PropertySource("classpath:projectmanager.properties")
})
public class FfmcloudwebApplication extends SpringBootServletInitializer {


    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application.sources(FfmcloudwebApplication.class);
    }

    public static void main(String[] args) {
        SpringApplication.run(FfmcloudwebApplication.class, args);
    }
}
