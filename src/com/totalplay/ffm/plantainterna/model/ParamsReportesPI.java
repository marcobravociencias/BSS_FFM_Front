package com.totalplay.ffm.plantainterna.model;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder 
@NoArgsConstructor
@AllArgsConstructor
public class ParamsReportesPI {
	private String os;
	private String intervencion;
	private String fecha_inicio;
	private String fecha_fin;
	private String distrito;
	private String ot;
	private String operario;
	private String start;
	private String end;
	private String numero_empleado;
	private String empresa;
	private String jefe_inmediato;
	private String nivel;
	private String id_ot;
	private String no_empleado;
	private String fecha_agendamiento;
	private String fecha_termino;
	private String status;
	

}
