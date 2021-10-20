package com.mx.totalplay.ffm.cloudweb.plantainterna.model.usuario;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder 
@NoArgsConstructor
@AllArgsConstructor
public class ObjConsultaUsuario {
	private double idOperario;
	private String numeroEmpleado;
	private String usuarioFfm;
	private String nombre;
	private String ciudad;
	private String compania;
	private String propietario;
	private String tipoOperario;
	private String unidadNegocio;
	
	private List<Integer> geografias;
	private List<Integer> companias;
	private List<Integer> puestos;
//	private int elementosPorPagina;
//	private int pagina;
	private int draw;
	private String start;
}
