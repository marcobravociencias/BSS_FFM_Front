package com.mx.totalplay.ffm.cloudweb.utilerias.model;


import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SubPermiso {
	private String descripcion;
	private String clave;
	private String icono;
	private String hexaColor;
	private String hexaHoverColor;
}
