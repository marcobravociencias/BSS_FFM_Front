package com.mx.totalplay.ffm.cloudweb.plantainterna.utils;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import lombok.Data;

@Data
@Component
public class ConstVistaAuditoria {

	private static final long serialVersionUID = 1L;
	
	@Value("${consultaFallasTicketSoporte}")
	private String consultaAuditoriasVistaAuditoria;

}
