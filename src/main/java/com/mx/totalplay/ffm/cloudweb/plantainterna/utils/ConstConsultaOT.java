package com.mx.totalplay.ffm.cloudweb.plantainterna.utils;

import java.io.Serializable;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import lombok.Data;

@Data
@Component
public class ConstConsultaOT implements Serializable{

private static final long serialVersionUID = 1L;
	
	@Value("${urlconstconsultaot}")
	private String filtrosConsultaOT;
	
	@Value("${consultaImagenesOt}")
	private String consultaImagenesOt;
	
	@Value("${consultaOtInfoGeneral}")
	private String consultaOtInfoGeneral;
	
	@Value("${consultaComentariosOtOperario}")
	private String consultaComentariosOtOperario;
	
	@Value("${consultaHistoricoOtOperario}")
	private String consultaHistoricoOtOperario;
	
	@Value("${consultaActividad}")
	private String consultaActividad;
	
	@Value("${consultaInformacionRed}")
	private String consultaInformacionRed;
	
	@Value("${consultaCambioEquipo}")
	private String consultaCambioEquipo;
	
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
}
