package com.totalplay.ffm.plantainterna.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder 
@NoArgsConstructor
@AllArgsConstructor
public class ParamsReporteOrdenesPI {
public String id_ot;
	
	public String cuenta;
	public String os;
	public String intervencion;
	public String canal_venta;
	public String fecha_inicio;
	public String fecha_fin;
	public String distrito;
	public String ot;
	public String ticket;
	public String ciudad;
	public String creacion;
	public String agenda;
	public String tipo;
	public String operario;
	public String turno;
	public String despacho_nombre;
	public String estado;
	public String status;
	public String start;
	public String end;
	public String id_propietario;
	public String time_line_id;
	public String fecha_agendamiento;
	public String fecha_termino;
	public String no_empleado;
	
	public String numero_empleado;
	public String empresa;
	public String jefe_inmediato;
	public String id_status;
	public String fecha_agenda_pi;
	public String id_tipo;
	public String id_subtipo;
	public String equipo;
	public String intervenciones;
	public String usuario_crea;
	public String descripcion; 
	public String sku; 
	public String cantidad; 
	public String lote; 
	public String sap; 
	public String unidad_medida; 
	private String propietario;
	private String empleado;
	private String id_tecnico;
	private String id_despacho;
	private String mes;
	private String year;
}
