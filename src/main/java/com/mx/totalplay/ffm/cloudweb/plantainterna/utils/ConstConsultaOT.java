package com.mx.totalplay.ffm.cloudweb.plantainterna.utils;

import java.io.Serializable;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import lombok.Data;

@Data
@Component
public class ConstConsultaOT implements Serializable{

private static final long serialVersionUID = 1L;
	
	@Value("${consultaOtInfoGeneral}")
	private String consultaOtInfoGeneral;
	
	@Value("${consultaGeneralOt}")
	private String consultaGeneralOt;

	@Value("${consultaPosventaDetalleSoporte}")
	private String consultaPosventaDetalleSoporte;

	@Value("${consultaPagos}")
	private String consultaPagos;

	@Value("${consultaEvidencia}")
	private String consultaEvidencia;

	@Value("${consultaDispositivos}")
	private String consultaDispositivos;

	@Value("${consultaMaterialesOt}")
	private String consultaMaterialesOt;
	
	@Value("${consultaRecoleccionOt}")
	private String consultaRecoleccionOt;
	
	@Value("${consultaOrdenesPlantaExternaOt}")
	private String consultaOrdenesPlantaExternaOt;
}
