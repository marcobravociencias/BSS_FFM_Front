package com.totalplay.ffm.plantainterna.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder 
@NoArgsConstructor
@AllArgsConstructor
public class ParamsReporteOTPI {
	private String id_ot;
	private String cuenta;
	private String os;
	private String intervencion;
	private String canal_venta;
	private String fecha_inicio;
	private String fecha_fin;
	private String distrito;
	private String start;
	private String end;
}
