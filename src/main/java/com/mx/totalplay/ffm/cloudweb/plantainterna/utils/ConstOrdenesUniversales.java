package com.mx.totalplay.ffm.cloudweb.plantainterna.utils;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import lombok.Data;

@Data
@Component
public class ConstOrdenesUniversales {
	
	 @Value("${consultarCatalogoOrdenesUniversales}")
	 private String consultarCatalogoOrdenesUniversales;

}
