package com.totalplay.ffm.utilerias.model;


import java.util.List;

import com.totalplay.ffm.plantainterna.model.consultaOTPI.ConsultaOTVO;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class DataTableResponse {
	private String draw;
    private String recordsTotal;
    private String recordsFiltered;
    private String [][]data;
    private boolean isRespuesta;
    private String resultDescripcion;
    private Object result;
    private String mensaje;
    private int paginaActual;
    private int registrosTotales;
    private List<ConsultaOTVO> ordenes; 
}
