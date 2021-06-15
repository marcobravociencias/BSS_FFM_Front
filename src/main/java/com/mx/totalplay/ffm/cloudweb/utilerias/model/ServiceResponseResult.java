package com.mx.totalplay.ffm.cloudweb.utilerias.model;

import java.io.Serializable;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Builder
public class ServiceResponseResult implements Serializable{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	@Getter @Setter
	private boolean isRespuesta;
	private Object result;
	private String resultDescripcion;
	private String mensajeException;
	
		
}
