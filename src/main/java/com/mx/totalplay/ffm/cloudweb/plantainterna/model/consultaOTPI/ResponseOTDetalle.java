package com.mx.totalplay.ffm.cloudweb.plantainterna.model.consultaOTPI;

import lombok.Data;

@Data
public class ResponseOTDetalle {
	private String result;
	private String resultDescription;	
	private ObjectResDetalle DatosGeneralesOT;
}
