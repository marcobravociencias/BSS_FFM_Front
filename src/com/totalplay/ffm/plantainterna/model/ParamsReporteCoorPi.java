package com.totalplay.ffm.plantainterna.model;


import java.util.List;



import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder 
@NoArgsConstructor
@AllArgsConstructor
public class ParamsReporteCoorPi {
	public String nivel;
	public String distrito;
	public String intervencion;
	public String despacho_nombre;
	public String numero_empleado;
	public String operario;
	public String ot;
	public String os;
	public String fecha_inicio;
	public String fecha_fin;
	public String start;
	public String end;
	private List<CoordinadorReporteVO>listado_info_coordinador;
	public Integer total_results;
}
