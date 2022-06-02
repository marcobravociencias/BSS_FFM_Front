package com.mx.totalplay.ffm.cloudweb.utilerias.model;


import java.util.List;

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
    private String mensaje;
    private int paginaActual;
    private int registrosTotales;
    private Object result;
}
