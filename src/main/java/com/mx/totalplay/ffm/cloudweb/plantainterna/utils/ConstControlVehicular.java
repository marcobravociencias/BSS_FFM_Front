package com.mx.totalplay.ffm.cloudweb.plantainterna.utils;

import java.io.Serializable;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import lombok.Data;

@Data
@Component
public class ConstControlVehicular implements Serializable{
	
	private static final long serialVersionUID = 1L; 

    @Value("${consultarMarcasControlVehicular}")
	private String consultarMarcasControlVehicular;

	@Value("${consultarColoresControlVehicular}")
	private String consultarColoresControlVehicular;

	@Value("${consultarSegurosControlVehicular}") 
	private String consultarSegurosControlVehicular;
	
}