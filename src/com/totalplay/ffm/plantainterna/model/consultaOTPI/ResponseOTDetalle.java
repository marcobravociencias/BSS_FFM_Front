package com.totalplay.ffm.plantainterna.model.consultaOTPI;

import lombok.Data;

@Data
public class ResponseOTDetalle {
	private String result;
	private String resultDescription;	
	private ObjectResDetalle DatosGeneralesOT;
}
