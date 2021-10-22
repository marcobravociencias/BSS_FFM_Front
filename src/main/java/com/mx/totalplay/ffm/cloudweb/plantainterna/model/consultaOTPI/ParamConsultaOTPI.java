package com.mx.totalplay.ffm.cloudweb.plantainterna.model.consultaOTPI;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder 
@NoArgsConstructor
@AllArgsConstructor
public class ParamConsultaOTPI {
	private String length;
	private String ot;
	private String idCuenta;
	private String folio;
	private String os;
	private String cuenta;
	private String fecha_inicio;
	private String fecha_fin;
	private String intervencion;
	private String distrito;
	private String start;
	private String end;
	private String Id_ot;
	private String Id_tipo_img;
	private String Propietario;
	private String fechaSeleccionada;
	private String Id_OT;
	private String id_propietario;
	private int draw;
	private String idOrden;
	private String folioSistema;
	private String claveCliente;
	private List<Integer> idSubTipoOrdenes;
	private List<Integer> idEstatus;
	private List<Integer> idClusters;
	private List<Integer> tipoIntervencion;
	private List<Integer> estatusOt;
	private String fechaInicio;
	private String fechaFin;
	private String fechaPrimeraAgenda;
	private String fechaCreacion;
	private String fechaConfirmacion;
	private String fechaAgenda;
	private String fechaInicioOrden;
	private String fechaFinOrden;
	private int elementosPorPagina;
	private int pagina;
	private int totalRegistros;
}
