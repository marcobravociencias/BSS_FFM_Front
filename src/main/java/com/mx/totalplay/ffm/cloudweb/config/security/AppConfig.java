package com.mx.totalplay.ffm.cloudweb.config.security;

//import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

@Configuration
public class AppConfig {

    @Bean("clienteRest")
    public RestTemplate registrarRestTemplate() {
        return new RestTemplate();
    }

    /**
    @LoadBalanced
    @Bean("clienteRestBalanced")
    public RestTemplate registrarRestTemplateLoad() {
        return new RestTemplate();
    }**/

}
