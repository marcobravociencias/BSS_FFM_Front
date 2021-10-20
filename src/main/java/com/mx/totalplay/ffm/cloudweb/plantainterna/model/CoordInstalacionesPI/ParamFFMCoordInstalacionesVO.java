package com.mx.totalplay.ffm.cloudweb.plantainterna.model.CoordInstalacionesPI;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder 
@NoArgsConstructor
@AllArgsConstructor
public class ParamFFMCoordInstalacionesVO {
	
	private String idOrdenTrabajo;
	private String idClaveCliente;
	private String folioSistema;
	private List<Integer> idEstatus;
	private List<Integer> idEstados;
	private List<Integer> idGeografias;
	private String start;
	private String end;
	private String fechaInicio;
	private String fechaFin;
	private Integer elementosPorPagina;
	private Integer pagina;
	private int draw;
	private String fechaSeleccionada;

}
