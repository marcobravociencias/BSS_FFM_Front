let consultaComentariosData={
	"success": true,
	"mensaje": "Operación exitosa.",
	"result": [{
		"origen": "FFM WEB",
		"emisor": "GAMALIEL AGUILAR",
		"comentario": "FFM : OT CREADA POR INCIDENCIA :  PRUEBA GENERA ORDEN",
		"fecha": "19/11/2020"
	}, {
		"origen": "FFM WEB",
		"emisor": "GAMALIEL AGUILAR",
		"comentario": "FFM - ASIGNACION : OK",
		"fecha": "18/12/2020"
	}, {
		"origen": "FFM APP",
		"emisor": "INSTALADOR PRUEBA",
		"comentario": "FFM OT EN TRANSITO : ",
		"fecha": "18/12/2020"
	}, {
		"origen": "FFM APP",
		"emisor": "INSTALADOR PRUEBA",
		"comentario": "FFM OT EN SITIO : ",
		"fecha": "18/12/2020"
	}, {
		"origen": "FFM APP",
		"emisor": "INSTALADOR PRUEBA",
		"comentario": "FFM OT EN TRABAJO : ",
		"fecha": "18/12/2020"
	}, {
		"origen": "FFM APP",
		"emisor": "INSTALADOR PRUEBA",
		"comentario": "FFM : OT TERMINADA :  ",
		"fecha": "18/12/2020"
	}]
}

let consultaFalla={
	"success": true,
	"mensaje": "Operación exitosa.",
	"result": [{
		"falla": "CIERRE",
		"detalleFalla": "CIERRE 1N DANADO",
		"comentarios": "ok",
		"imagenes": [{
			"URL": "",
			"nombre": "EvidenciaSinReparar_2020_12_18_18_22.jpg",
			"evidencia": "ANTES"
		}, {
			"URL": "",
			"nombre": "EvidenciaReparacion_2020_12_18_18_22.jpg",
			"evidencia": "DESPUES"
		}]
	}, {
		"falla": "GASA - GSA",
		"detalleFalla": "GASA CAIDA",
		"comentarios": "ok",
		"imagenes": [{
			"URL": "",
			"nombre": "EvidenciaSinReparar_2020_12_18_18_24.jpg",
			"evidencia": "ANTES"
		}, {
			"URL": "",
			"nombre": "EvidenciaReparacion_2020_12_18_18_24.jpg",
			"evidencia": "DESPUES"
		}]
	}]
}

let materialesData={
	"success": true,
	"mensaje": "Operación Exitosa.",
	"result": [{
		"sku": "16048",
		"tipo": "CONSUMIBLE",
		"cantidad": "2",
		"unidadMedida": "PZA",
		"descripcion": "CINTA DE AISLAR NEGRA -PIEZA-"
	}, {
		"sku": "83658",
		"tipo": "CONSUMIBLE",
		"cantidad": "7",
		"unidadMedida": "PZA",
		"descripcion": "CINCHO PANDUIT 30 CM"
	}]
};
let generalesData=[{
	"nombre": "TECNICO PE APP",
	"intervencion": "PLANTA EXTERNA TX",
	"subintervencion": "SPLITTER ATENUADO",
	"estado": "FALLA REPARADA",
	"status": "ASIGNADA",
	"motivo": "NO APLICA",
	"id_ot": "80780",
	"fecha_agenda": "26/10/2020 16:59",
	"fecha_inicio": "24/06/2020 16:11",
	"fecha_fin": "24/06/2020 17:16"
}]
let historicoData={
	"success": true,
	"mensaje": "Operación exitosa.",
	"result": [{
		"idot": "80963",
		"descripcion": "OT CREADA DESDE FFM WEB",
		"idstatus": "1",
		"status": "PENDIENTE",
		"idestado": "6",
		"estado": "NO ASIGNADA",
		"idmotivo": "25",
		"motivo": "OT NUEVA",
		"latitud": "25.7821499",
		"longitud": "-100.2661803",
		"idorigen": "2",
		"origen": "FFM WEB",
		"idoperador": "1700",
		"Operador": "GAMALIEL AGUILAR CERON",
		"fecha": "17/11/2020",
		"hora": "10:46:01"
	}, {
		"idot": "80963",
		"descripcion": "OT ASIGNADA DESDE FFM WEB",
		"idstatus": "2",
		"status": "ASIGNADA",
		"idestado": "9",
		"estado": "PROGRAMADA PERO NO INICIADA",
		"idmotivo": "23",
		"motivo": "ASIGNADO POR DESPACHO",
		"latitud": "19.4326",
		"longitud": "-99.1332",
		"idorigen": "2",
		"origen": "FFM WEB",
		"idoperador": "3200",
		"Operador": "ANGEL DE JESUS GONZALES FLORES",
		"fecha": "04/12/2020",
		"hora": "13:50:32"
	}, {
		"idot": "80963",
		"descripcion": "OT ASIGNADA DESDE FFM WEB",
		"idstatus": "2",
		"status": "ASIGNADA",
		"idestado": "9",
		"estado": "PROGRAMADA PERO NO INICIADA",
		"idmotivo": "157",
		"motivo": "REASIGNACION DE OT",
		"latitud": "19.4326",
		"longitud": "-99.1332",
		"idorigen": "2",
		"origen": "FFM WEB",
		"idoperador": "1700",
		"Operador": "GAMALIEL AGUILAR CERON",
		"fecha": "08/12/2020",
		"hora": "13:06:01"
	}]
}
let resultOTDiarioData=[{
	"nombre": "TECNICO PE APP",
	"intervencion": "PLANTA EXTERNA TX",
	"subintervencion": "SPLITTER ATENUADO",
	"estado": "FALLA REPARADA",
	"status": "ASIGNADA",
	"motivo": "NO APLICA",
	"id_ot": "80780",
	"fecha_agenda": "26/10/2020 16:59",
	"fecha_inicio": "24/06/2020 16:11",
	"fecha_fin": "24/06/2020 17:16"
}, {
	"nombre": "ANGEL DE JESUS GONZALES FLORES",
	"intervencion": "PLANTA EXTERNA",
	"subintervencion": "SPLITTER ATENUADO",
	"estado": "COMPLETA",
	"status": "TERMINADA",
	"motivo": "COMPLETADA POR DESPACHO",
	"id_ot": "80734",
	"fecha_agenda": "01/12/2020 17:20",
	"fecha_inicio": "25/06/2020 09:49",
	"fecha_fin": "04/12/2020 12:54"
}, {
	"nombre": "ANGEL DE JESUS GONZALES FLORES",
	"intervencion": "PLANTA EXTERNA",
	"subintervencion": "SPLITTER ATENUADO",
	"estado": "COMPLETA",
	"status": "TERMINADA",
	"motivo": "COMPLETADA POR DESPACHO",
	"id_ot": "80804",
	"fecha_agenda": "08/12/2020 12:58",
	"fecha_inicio": "NO INICIADA",
	"fecha_fin": "08/12/2020 18:48"
}, {
	"nombre": "ANGEL DE JESUS GONZALES FLORES",
	"intervencion": "PLANTA EXTERNA",
	"subintervencion": "SPLITTER MAYOR A 300 METROS",
	"estado": "COMPLETA",
	"status": "TERMINADA",
	"motivo": "COMPLETADA POR DESPACHO",
	"id_ot": "80826",
	"fecha_agenda": "08/12/2020 13:02",
	"fecha_inicio": "NO INICIADA",
	"fecha_fin": "08/12/2020 13:03"
}, {
	"nombre": "ANGEL DE JESUS GONZALES FLORES",
	"intervencion": "PLANTA EXTERNA TX",
	"subintervencion": "SPLITTER ATENUADO",
	"estado": "COMPLETA",
	"status": "TERMINADA",
	"motivo": "COMPLETADA POR DESPACHO",
	"id_ot": "80903",
	"fecha_agenda": "08/12/2020 13:16",
	"fecha_inicio": "NO INICIADA",
	"fecha_fin": "08/12/2020 13:18"
}, {
	"nombre": "ANGEL DE JESUS GONZALES FLORES",
	"intervencion": "PLANTA EXTERNA TX",
	"subintervencion": "SPLITTER ATENUADO",
	"estado": "COMPLETA",
	"status": "TERMINADA",
	"motivo": "COMPLETADA POR DESPACHO",
	"id_ot": "80787",
	"fecha_agenda": "08/12/2020 13:29",
	"fecha_inicio": "NO INICIADA",
	"fecha_fin": "08/12/2020 13:33"
}, {
	"nombre": "ANGEL DE JESUS GONZALES FLORES",
	"intervencion": "PLANTA EXTERNA",
	"subintervencion": "SPLITTER ATENUADO",
	"estado": "COMPLETA",
	"status": "TERMINADA",
	"motivo": "COMPLETADA POR DESPACHO",
	"id_ot": "80805",
	"fecha_agenda": "08/12/2020 18:44",
	"fecha_inicio": "NO INICIADA",
	"fecha_fin": "08/12/2020 18:46"
}, {
	"nombre": "ANGEL DE JESUS GONZALES FLORES",
	"intervencion": "PLANTA EXTERNA TX",
	"subintervencion": "SPLITTER A MAS DE 300 METROS",
	"estado": "COMPLETA",
	"status": "TERMINADA",
	"motivo": "COMPLETADA POR DESPACHO",
	"id_ot": "80907",
	"fecha_agenda": "08/12/2020 18:49",
	"fecha_inicio": "NO INICIADA",
	"fecha_fin": "08/12/2020 18:49"
}, {
	"nombre": "ANGEL DE JESUS GONZALES FLORES",
	"intervencion": "PLANTA EXTERNA",
	"subintervencion": "ZONA SIN POSTERIA",
	"estado": "COMPLETA",
	"status": "TERMINADA",
	"motivo": "COMPLETADA POR DESPACHO",
	"id_ot": "80864",
	"fecha_agenda": "08/12/2020 23:01",
	"fecha_inicio": "NO INICIADA",
	"fecha_fin": "08/12/2020 23:01"
}, {
	"nombre": "INSTALADOR PRUEBA PLANTAEXTERNA",
	"intervencion": "PLANTA EXTERNA",
	"subintervencion": "SPLITTER SATURADO",
	"estado": "COMPLETA",
	"status": "TERMINADA",
	"motivo": "NO APLICA",
	"id_ot": "81063",
	"fecha_agenda": "18/12/2020 18:06",
	"fecha_inicio": "18/12/2020 11:12",
	"fecha_fin": "18/12/2020 18:12"
}];

let resultOtMasivoData=[{
	"estado": "NO ASIGNADA",
	"status": "PENDIENTE",
	"motivo": "OT NUEVA",
	"id_ot": "80266",
	"ticket_sf": "00119605",
	"ticket_sd": "84546",
	"tecnico": "PENDIENTE ASIGNAR OPERADOR",
	"fecha_asignacion": "16/06/20 05:25:50 PM",
	"fecha_termino": "NO CONCLUIDA"
}, {
	"estado": "NO ASIGNADA",
	"status": "PENDIENTE",
	"motivo": "OT NUEVA",
	"id_ot": "80336",
	"ticket_sf": "00011631",
	"ticket_sd": "84550",
	"tecnico": "PENDIENTE ASIGNAR OPERADOR",
	"fecha_asignacion": "16/06/20 05:25:50 PM",
	"fecha_termino": "NO CONCLUIDA"
}, {
	"estado": "NO ASIGNADA",
	"status": "PENDIENTE",
	"motivo": "OT NUEVA",
	"id_ot": "80318",
	"ticket_sf": "00001738",
	"ticket_sd": "9013",
	"tecnico": "PENDIENTE ASIGNAR OPERADOR",
	"fecha_asignacion": "16/06/20 05:25:50 PM",
	"fecha_termino": "NO CONCLUIDA"
}, {
	"estado": "NO ASIGNADA",
	"status": "PENDIENTE",
	"motivo": "OT NUEVA",
	"id_ot": "80317",
	"ticket_sf": "00011639",
	"ticket_sd": "84552",
	"tecnico": "PENDIENTE ASIGNAR OPERADOR",
	"fecha_asignacion": "16/06/20 05:25:50 PM",
	"fecha_termino": "NO CONCLUIDA"
}, {
	"estado": "NO ASIGNADA",
	"status": "PENDIENTE",
	"motivo": "OT NUEVA",
	"id_ot": "80335",
	"ticket_sf": "00011624",
	"ticket_sd": "84547",
	"tecnico": "PENDIENTE ASIGNAR OPERADOR",
	"fecha_asignacion": "16/06/20 05:25:50 PM",
	"fecha_termino": "NO CONCLUIDA"
}, {
	"estado": "NO ASIGNADA",
	"status": "PENDIENTE",
	"motivo": "OT NUEVA",
	"id_ot": "80334",
	"ticket_sf": "00011623",
	"ticket_sd": "84546",
	"tecnico": "PENDIENTE ASIGNAR OPERADOR",
	"fecha_asignacion": "16/06/20 05:25:50 PM",
	"fecha_termino": "NO CONCLUIDA"
}, {
	"estado": "CANCELADA",
	"status": "CANCELADA",
	"motivo": "NO HAY SISTEMA",
	"id_ot": "80267",
	"ticket_sf": "00119605",
	"ticket_sd": "84546",
	"tecnico": "PENDIENTE ASIGNAR OPERADOR",
	"fecha_asignacion": "16/06/20 05:25:50 PM",
	"fecha_termino": "23/04/20 05:49:21 PM"
}, {
	"estado": "CORTE MASIVO",
	"status": "FOLIO ASOCIADO",
	"motivo": "FOLIO EXISTENTE",
	"id_ot": "80268",
	"ticket_sf": "00119605",
	"ticket_sd": "84546",
	"tecnico": "PENDIENTE ASIGNAR OPERADOR",
	"fecha_asignacion": "16/06/20 05:25:50 PM",
	"fecha_termino": "NO CONCLUIDA"
}, {
	"estado": "NO ASIGNADA",
	"status": "PENDIENTE",
	"motivo": "OT NUEVA",
	"id_ot": "80269",
	"ticket_sf": "00119605",
	"ticket_sd": "84546",
	"tecnico": "PENDIENTE ASIGNAR OPERADOR",
	"fecha_asignacion": "16/06/20 05:25:50 PM",
	"fecha_termino": "NO CONCLUIDA"
}, {
	"estado": "NO ASIGNADA",
	"status": "PENDIENTE",
	"motivo": "OT NUEVA",
	"id_ot": "80270",
	"ticket_sf": "00119605",
	"ticket_sd": "84546",
	"tecnico": "PENDIENTE ASIGNAR OPERADOR",
	"fecha_asignacion": "16/06/20 05:25:50 PM",
	"fecha_termino": "NO CONCLUIDA"
}];

let resultInspectorData=[{
	"idot": "80963",
	"OtPadre": "ES OT PADRE",
	"nombre": "ANDRES ALMONAZI RUIZ",
	"intervencion": "INSPECTOR DE RED",
	"subintervencion": "ETIQUETADO",
	"estado": "PROGRAMADA PERO NO INICIADA",
	"status": "ASIGNADA",
	"motivo": "REASIGNACION DE OT",
	"fechaasignacion": "04/12/2020",
	"fechafin": "--/--/----"
}, {
	"idot": "80964",
	"OtPadre": "ES OT PADRE",
	"nombre": "ANGEL DE JESUS GONZALES FLORES",
	"intervencion": "INSPECTOR DE RED",
	"subintervencion": "ETIQUETADO",
	"estado": "COMPLETA",
	"status": "TERMINADA",
	"motivo": "COMPLETADA POR DESPACHO",
	"fechaasignacion": "04/12/2020",
	"fechafin": "13/04/2021"
}, {
	"idot": "80965",
	"OtPadre": "ES OT PADRE",
	"nombre": "SIN ASIGNAR",
	"intervencion": "INSPECTOR DE RED",
	"subintervencion": "GASA",
	"estado": "NO ASIGNADA",
	"status": "PENDIENTE",
	"motivo": "OT NUEVA",
	"fechaasignacion": "NO ASIGNADA",
	"fechafin": "--/--/----"
}, {
	"idot": "80966",
	"OtPadre": "ES OT PADRE",
	"nombre": "INSTALADOR PRUEBA PLANTAEXTERNA",
	"intervencion": "INSPECTOR DE RED",
	"subintervencion": "GASA",
	"estado": "COMPLETA",
	"status": "TERMINADA",
	"fechaasignacion": "18/12/2020",
	"fechafin": "18/12/2020"
}, {
	"idot": "80983",
	"OtPadre": "ES OT PADRE",
	"nombre": "INSTALADOR PRUEBA PLANTAEXTERNA",
	"intervencion": "INSPECTOR DE RED",
	"subintervencion": "POSTES",
	"estado": "COMPLETA",
	"status": "TERMINADA",
	"fechaasignacion": "18/12/2020",
	"fechafin": "18/12/2020"
}, {
	"idot": "81003",
	"OtPadre": "ES OT PADRE",
	"nombre": "SIN ASIGNAR",
	"intervencion": "INSPECTOR DE RED",
	"subintervencion": "GASA",
	"estado": "NO ASIGNADA",
	"status": "PENDIENTE",
	"motivo": "OT NUEVA",
	"fechaasignacion": "NO ASIGNADA",
	"fechafin": "--/--/----"
}, {
	"idot": "81544",
	"OtPadre": "ES OT PADRE",
	"nombre": "SIN ASIGNAR",
	"intervencion": "MANTENIMIENTO PREVENTIVO PI",
	"subintervencion": "MANTENIMIENTO MAYOR",
	"estado": "NO ASIGNADA",
	"status": "PENDIENTE",
	"motivo": "OT NUEVA",
	"fechaasignacion": "NO ASIGNADA",
	"fechafin": "--/--/----"
}, {
	"idot": "81545",
	"OtPadre": "ES OT PADRE",
	"nombre": "SIN ASIGNAR",
	"intervencion": "MANTENIMIENTO PREVENTIVO PI",
	"subintervencion": "MANTENIMIENTO MAYOR",
	"estado": "NO ASIGNADA",
	"status": "PENDIENTE",
	"motivo": "OT NUEVA",
	"fechaasignacion": "NO ASIGNADA",
	"fechafin": "--/--/----"
}, {
	"idot": "81549",
	"OtPadre": "ES OT PADRE",
	"nombre": "SIN ASIGNAR",
	"intervencion": "MANTENIMIENTO PREVENTIVO PI",
	"subintervencion": "MANTENIMIENTO MAYOR",
	"estado": "CANCELADA",
	"status": "CANCELADA",
	"motivo": "NO HAY SISTEMA",
	"fechaasignacion": "NO ASIGNADA",
	"fechafin": "20/08/2021"
}];
