package com.totalplay.ffm.plantainterna.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UsuarioPIVO {
	
	public String id;
	public String nombre;
	public String numero_empleado;
	public String ciudad;
	public String tipoOperario;
	public String unidadNegocio;
	public String usuarioFFM;
}
