package com.mx.totalplay.ffm.cloudweb.plantainterna.utils;

import java.io.Serializable;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import lombok.Data;

@Data
@Component
public class ConstGestionTecnicos implements Serializable{
	private static final long serialVersionUID = 1L;

	@Value("${consultaTecnicosGestionTecnicos}")
	private String consultaTecnicosGestionTecnicos;
	
	@Value("${consultaAuxiliaresGestionTecnicos}")
	private String consultaAuxiliaresGestionTecnicos;
	
	@Value("${consultaTecnicosPorDespacho}")
	private String consultaTecnicosPorDespacho;
	
	@Value("${consultaOrdenesTecnicoPorFecha}")
	private String consultaOrdenesTecnicoPorFecha;
	
	@Value("${consultaOrdenesAuxiliarPorFecha}")
	private String consultaOrdenesAuxiliarPorFecha;
	
	@Value("${consultaDisponibilidadTecnico}")
	private String consultaDisponibilidadTecnico;
	
	@Value("${consultaDiasTrabajadosTecnicoPorFecha}")
	private String consultaDiasTrabajadosTecnicoPorFecha;
	
	@Value("${consultaDiasTrabajadosAuxiliarPorFecha}")
	private String consultaDiasTrabajadosAuxiliarPorFecha;
	
	@Value("${consultaJustificacionesTecnico}")
	private String consultaJustificacionesTecnico;
	
	@Value("${consultaMotivosJustificaciones}")
	private String consultaMotivosJustificaciones;
	
}
