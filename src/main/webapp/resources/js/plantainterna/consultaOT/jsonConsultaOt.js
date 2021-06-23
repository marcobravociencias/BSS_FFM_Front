let arrayDetalleOt = {
    data: {
        "respuesta": true,
        "result": {
            "result": "0",
            "resultDescription": "Operación Exitosa",
            "DatosGeneralesOT": {
                "OT": {
                    "Paquete_instalar": "SUPERINTERNET AVANZADO 100 V2",
                    "Id_ot": "1354",
                    "Status": "ASIGNADA",
                    "Num_cuenta": "0200118191",
                    "Nombre_cliente": "100 MBPS SIMETRICOS",
                    "Motivo": "ASIGNADO POR DESPACHO",
                    "Entre_calles": "NO ESPECIFICADO",
                    "Fecha_agenda": "24/05/2021",
                    "Estado": "PROGRAMADA PERO NO INICIADA",
                    "Referencias_urbanas": "NO ESPECIFICADO",
                    "Hora_agenda": "18:00",
                    "Folio_os": "OS-1897932",
                    "Nombre_contacto": "DAVID ZAVALETA JUAREZ",
                    "Tipo_instervencion": "INSTALACIÓN",
                    "Subtipo_intervencion": "INSTALACIONES NUEVAS",
                    "Direccion_instalacion": "ZAPOPAN, VALLE REAL,, GUADALAJARA, PASEO VALLE REAL, CP: 45019",
                    "Telefono_empresa": "5515339293 EXT : NA",
                    "Telefono_contacto": "3333333330"
                }
            }
        }
    }
}

let arrayEvidenciaOt = {
    data: {
        "respuesta": true,
        "result":
        {
            "result": "0",
            "resultDescription": "Operación Exitosa"
        }
    }
}

let arrayConsultaImagen = {
    data: {
        "respuesta": true,
        "result": {
            "resultDescription": "Operación exitosa.",
            "result": "0",
            "Imagen": [{
                "Id_imagen": "103",
                "Path_imagen": "",
                "Nombre_imagen": "LeftCorner2017_12_05_11_04_46.jpg",
                "Tipo_imagen": "6"
            }, {
                "Id_imagen": "104",
                "Path_imagen": "",
                "Nombre_imagen": "Outside2017_12_05_11_05_14.jpg",
                "Tipo_imagen": "6"
            }, {
                "Id_imagen": "105",
                "Path_imagen": "",
                "Nombre_imagen": "RightCorner2017_12_05_11_05_19.jpg",
                "Tipo_imagen": "6"
            }, {
                "Id_imagen": "519783",
                "Path_imagen": "",
                "Nombre_imagen": "LeftCorner2021_05_10.jpg",
                "Tipo_imagen": "6"
            }, {
                "Id_imagen": "519784",
                "Path_imagen": "",
                "Nombre_imagen": "Outside2021_05_10.jpg",
                "Tipo_imagen": "6"
            }, {
                "Id_imagen": "519785",
                "Path_imagen": "",
                "Nombre_imagen": "RightCorner2021_05_10.jpg",
                "Tipo_imagen": "6"
            }, {
                "Id_imagen": "519786",
                "Path_imagen": "",
                "Nombre_imagen": "Outside2021_05_10.jpg",
                "Tipo_imagen": "6"
            }],
            "Tipo": [{
                "ID_Tipo": "5",
                "Descripcion": "Splitter"
            }, {
                "ID_Tipo": "6",
                "Descripcion": "Registro Ubicacion"
            }, {
                "ID_Tipo": "7",
                "Descripcion": "Evidencias"
            }, {
                "ID_Tipo": "14",
                "Descripcion": "Busca Splitter"
            }, {
                "ID_Tipo": "15",
                "Descripcion": "Pago Transferencia"
            }, {
                "ID_Tipo": "16",
                "Descripcion": "Pago Cheque"
            }, {
                "ID_Tipo": "17",
                "Descripcion": "Firma"
            }, {
                "ID_Tipo": "19",
                "Descripcion": "Carta de aceptacion"
            }, {
                "ID_Tipo": "21",
                "Descripcion": "Detencion PI"
            }, {
                "ID_Tipo": "22",
                "Descripcion": "Speed test"
            }, {
                "ID_Tipo": "23",
                "Descripcion": "Cableado"
            }, {
                "ID_Tipo": "24",
                "Descripcion": "Evidencia de Soporte"
            }, {
                "ID_Tipo": "25",
                "Descripcion": "Evidencia de Corte Individual"
            }, {
                "ID_Tipo": "26",
                "Descripcion": "Evidencia OT universal"
            }, {
                "ID_Tipo": "27",
                "Descripcion": "Antes de reubicación"
            }, {
                "ID_Tipo": "28",
                "Descripcion": "Después de reubicación"
            }, {
                "ID_Tipo": "29",
                "Descripcion": "Evidencia adicional de reubicación"
            }, {
                "ID_Tipo": "30",
                "Descripcion": "Detencion Infraestructura"
            }, {
                "ID_Tipo": "31",
                "Descripcion": "Checklist"
            }]
        }
    }
}

let arrayHistorico = {
    data: {
        "success": true,
        "result": {
            "result": "0",
            "resultDescripcion": "Operaci&oacute;n Exitosa.",
            "Movimientos": {
                "Trackin": [{
                    "OT": "68113",
                    "Descripcion": "OT CREADA DESDE FFM WEB",
                    "Id_Estatus": "1",
                    "EstatusDescripcion": "PENDIENTE",
                    "Id_Estado": "6",
                    "EstadoDescripcion": "NO ASIGNADA",
                    "Id_Motivo": "25",
                    "MotivoDescripcion": "OT NUEVA",
                    "Latitud": "20.056304198965453",
                    "Longitud": "-98.76638169482422",
                    "Id_Origen": "2",
                    "OrigenDescripcion": "FFM WEB",
                    "Id_Operador": "6",
                    "Nombre_Operador": "RICARDO HERNANDEZ MARTINEZ",
                    "FechaModificacion": "31/05/2021",
                    "HoraModificacion": "22:29:03"
                }, {
                    "OT": "68113",
                    "Descripcion": "OT ASIGNADA DESDE FFM WEB",
                    "Id_Estatus": "2",
                    "EstatusDescripcion": "ASIGNADA",
                    "Id_Estado": "9",
                    "EstadoDescripcion": "PROGRAMADA PERO NO INICIADA",
                    "Id_Motivo": "23",
                    "MotivoDescripcion": "ASIGNADO POR DESPACHO",
                    "Latitud": "19.4326",
                    "Longitud": "-99.1332",
                    "Id_Origen": "2",
                    "OrigenDescripcion": "FFM WEB",
                    "Id_Operador": "6",
                    "Nombre_Operador": "RICARDO HERNANDEZ MARTINEZ",
                    "FechaModificacion": "31/05/2021",
                    "HoraModificacion": "22:30:56"
                }, {
                    "OT": "68113",
                    "Descripcion": "OT ASIGNADA DESDE FFM APP",
                    "Id_Estatus": "2",
                    "EstatusDescripcion": "ASIGNADA",
                    "Id_Estado": "10",
                    "EstadoDescripcion": "EN TRANSITO",
                    "MotivoDescripcion": "-",
                    "Latitud": "19.3339433",
                    "Longitud": "-99.1985546",
                    "Id_Origen": "1",
                    "OrigenDescripcion": "FFM APP",
                    "Id_Operador": "14888",
                    "Nombre_Operador": "TECNICO PRUEBAS 2",
                    "FechaModificacion": "01/06/2021",
                    "HoraModificacion": "11:30:51"
                }, {
                    "OT": "68113",
                    "Descripcion": "OT ASIGNADA DESDE FFM APP",
                    "Id_Estatus": "2",
                    "EstatusDescripcion": "ASIGNADA",
                    "Id_Estado": "10",
                    "EstadoDescripcion": "EN TRANSITO",
                    "MotivoDescripcion": "-",
                    "Latitud": "19.3339335",
                    "Longitud": "-99.1985665",
                    "Id_Origen": "1",
                    "OrigenDescripcion": "FFM APP",
                    "Id_Operador": "14888",
                    "Nombre_Operador": "TECNICO PRUEBAS 2",
                    "FechaModificacion": "01/06/2021",
                    "HoraModificacion": "11:30:53"
                }, {
                    "OT": "68113",
                    "Descripcion": "OT ASIGNADA DESDE FFM APP",
                    "Id_Estatus": "2",
                    "EstatusDescripcion": "ASIGNADA",
                    "Id_Estado": "107",
                    "EstadoDescripcion": "EN SITIO",
                    "MotivoDescripcion": "-",
                    "Latitud": "19.3339988",
                    "Longitud": "-99.1984965",
                    "Id_Origen": "1",
                    "OrigenDescripcion": "FFM APP",
                    "Id_Operador": "14888",
                    "Nombre_Operador": "TECNICO PRUEBAS 2",
                    "FechaModificacion": "01/06/2021",
                    "HoraModificacion": "11:31:05"
                }, {
                    "OT": "68113",
                    "Descripcion": "OT ASIGNADA DESDE FFM APP",
                    "Id_Estatus": "2",
                    "EstatusDescripcion": "ASIGNADA",
                    "Id_Estado": "11",
                    "EstadoDescripcion": "EN TRABAJO",
                    "MotivoDescripcion": "-",
                    "Latitud": "19.3339358",
                    "Longitud": "-99.1985689",
                    "Id_Origen": "1",
                    "OrigenDescripcion": "FFM APP",
                    "Id_Operador": "14888",
                    "Nombre_Operador": "TECNICO PRUEBAS 2",
                    "FechaModificacion": "01/06/2021",
                    "HoraModificacion": "11:31:41"
                }, {
                    "OT": "68113",
                    "Descripcion": "OT ASIGNADA DESDE FFM APP",
                    "Id_Estatus": "2",
                    "EstatusDescripcion": "ASIGNADA",
                    "Id_Estado": "113",
                    "EstadoDescripcion": "EN ESPERA",
                    "Id_Motivo": "431",
                    "MotivoDescripcion": "ROBO DE PUERTO",
                    "Latitud": "19.3339358",
                    "Longitud": "-99.1985689",
                    "Id_Origen": "1",
                    "OrigenDescripcion": "FFM APP",
                    "Id_Operador": "14888",
                    "Nombre_Operador": "TECNICO PRUEBAS 2",
                    "FechaModificacion": "01/06/2021",
                    "HoraModificacion": "11:34:17"
                }, {
                    "OT": "68113",
                    "Descripcion": "OT CREADA DESDE FFM WEB",
                    "Id_Estatus": "1",
                    "EstatusDescripcion": "PENDIENTE",
                    "Id_Estado": "7",
                    "EstadoDescripcion": "REAGENDADA",
                    "Id_Motivo": "30",
                    "MotivoDescripcion": "NO SE CONCLUYO LA INSTALACION",
                    "Latitud": "19.4326",
                    "Longitud": "-99.1332",
                    "Id_Origen": "2",
                    "OrigenDescripcion": "FFM WEB",
                    "Id_Operador": "6",
                    "Nombre_Operador": "RICARDO HERNANDEZ MARTINEZ",
                    "FechaModificacion": "01/06/2021",
                    "HoraModificacion": "13:55:36"
                }]
            }
        }
    }
}

let arrayChat = {
    data: {
        "success": true,
        "result": {
            "result": "0",
            "resultDescripcion": "Operaci&oacute;n Exitosa.",
            "Comentario": [{
                "FechaComentario": "26/02/2020",
                "Comentario": "Favor de atender.",
                "Id_Origen": "3",
                "Origen": "SALESFORCE",
                "Id_Operario": "4",
                "Num_Empleado": "AGENTE_SF",
                "Nombre": "FFM",
                "ApellidoPaterno": "SALESFORCE",
                "ApellidoMaterno": "WEB",
                "NombreCompleto": "FFM SALESFORCE WEB"
            }, {
                "FechaComentario": "08/04/2020",
                "Comentario": "FFM : ASIGNACION DE ORDENES : OK",
                "Id_Origen": "2",
                "Origen": "FFM WEB",
                "Id_Operario": "6",
                "Num_Empleado": "FFMENLACE",
                "Nombre": "RICARDO",
                "ApellidoPaterno": "HERNANDEZ",
                "ApellidoMaterno": "MARTINEZ",
                "NombreCompleto": "RICARDO HERNANDEZ MARTINEZ"
            }, {
                "FechaComentario": "08/04/2020",
                "Comentario": "FFM : OT EN TRANSITO : ",
                "Id_Origen": "1",
                "Origen": "FFM APP",
                "Id_Operario": "2661",
                "Num_Empleado": "TECNICOFFM",
                "Nombre": "TECNICO",
                "ApellidoPaterno": "FFM",
                "ApellidoMaterno": "FFM",
                "NombreCompleto": "TECNICO FFM FFM"
            }, {
                "FechaComentario": "30/03/2021",
                "Comentario": "REAGENDADA POR CALENDARIZACION VENCIDA",
                "Id_Origen": "5",
                "Origen": "MAS",
                "Id_Operario": "1",
                "Num_Empleado": "AGENTE_SOA",
                "Nombre": "FFM",
                "ApellidoPaterno": "MIDDLEWARE",
                "ApellidoMaterno": "SOA",
                "NombreCompleto": "FFM MIDDLEWARE SOA"
            }, {
                "FechaComentario": "04/06/2021",
                "Comentario": "FFM : ASIGNACION DE ORDENES : LK",
                "Id_Origen": "2",
                "Origen": "FFM WEB",
                "Id_Operario": "6",
                "Num_Empleado": "FFMENLACE",
                "Nombre": "RICARDO",
                "ApellidoPaterno": "HERNANDEZ",
                "ApellidoMaterno": "MARTINEZ",
                "NombreCompleto": "RICARDO HERNANDEZ MARTINEZ"
            }]
        }
	}
}