package com.mx.totalplay.ffm.cloudweb.plantainterna.utils;

import java.io.Serializable;

import org.springframework.stereotype.Component;
import org.springframework.beans.factory.annotation.Value;
import lombok.Data;

@Data
@Component
public class ConstCoordInst implements Serializable{
	private static final long serialVersionUID = 1L;
	
	@Value("{busquedaGralConstante}")
	private String busquedaGralConstante;
}
