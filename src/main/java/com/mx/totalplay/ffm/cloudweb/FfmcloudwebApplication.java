package com.mx.totalplay.ffm.cloudweb;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.annotation.PropertySources;

@SpringBootApplication(scanBasePackages = "com.mx.totalplay.ffm.cloudweb.*")
@PropertySources({
	@PropertySource("classpath:plantainterna.properties"),
	@PropertySource("classpath:generic.properties")
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
