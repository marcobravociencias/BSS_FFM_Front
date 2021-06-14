package com.totalplay.ffm.plantainterna.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CatalogoUsuarioPIVO {
	
	private String id;
	private String id_propietario;
	private String idpadre;
	private String descripcion;
	private String isActivo;
	private String nivel;
	private String img;
	private String precarga;
	
	
}
