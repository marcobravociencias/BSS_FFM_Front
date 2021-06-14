package com.totalplay.ffm.plantainterna.utils;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import lombok.Data;

@Data
@Component
public class ConstDisponbilidadPI {
	

	@Value("${restagregadisponibilidad}")
	private String restagregadisponibilidad;
	
	@Value("${restconsultadisponibilidad}")
	private String restconsultadisponibilidad;
	
	@Value("${restactualizadisponibilidad}")
	private String restactualizadisponibilidad;
	
	@Value("${restconsultaintervencidisponibilidad}")
	private String restconsultaintervencidisponibilidad;
	
	
}
