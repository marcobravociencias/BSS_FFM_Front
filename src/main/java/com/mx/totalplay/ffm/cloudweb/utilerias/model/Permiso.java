package com.mx.totalplay.ffm.cloudweb.utilerias.model;

import java.util.List;
import java.util.Map;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class Permiso {
	private String descripcion; 
	private String clave; 
	private String icono; 
	private String hexaColor; 
	private String hexaHoverColor; 
	private List<SubPermiso>permisos;
	private int ordenConfig;
	private boolean dentroNavbar;
	
	private int id;
	private int nivel;
	private int idPadre;
	private Map<String ,Object> llaves;
}
