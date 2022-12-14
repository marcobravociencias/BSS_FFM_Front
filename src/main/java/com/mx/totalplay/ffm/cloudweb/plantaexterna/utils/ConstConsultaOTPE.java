package com.mx.totalplay.ffm.cloudweb.plantaexterna.utils;

import java.io.Serializable;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.mx.totalplay.ffm.cloudweb.plantainterna.utils.ConstDespachoPI;

import lombok.Data;

@Data
@Component
public class ConstConsultaOTPE implements Serializable{
	private static final long serialVersionUID = 1L;
	
	@Value("${consultaOTTipoOrdenesPorUsuario}")
	private String consultaOTTipoOrdenesPorUsuario;

}
