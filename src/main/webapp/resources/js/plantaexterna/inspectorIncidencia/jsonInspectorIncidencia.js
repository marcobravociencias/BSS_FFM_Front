let arrayFallas = {
    data: {
        "success": true,
        "mensaje": "Catalogo fallas sin datos",
        "result": [{
            "id": "12",
            "descripcion": "GASA - GSA"
        }, {
            "id": "18",
            "descripcion": "POSTE - PST"
        }, {
            "id": "1",
            "descripcion": "CIERRE"
        }, {
            "id": "25",
            "descripcion": "RUTA - RTA"
        }, {
            "id": "43",
            "descripcion": "ETIQUETADO - ETQ"
        }, {
            "id": "98",
            "descripcion": "ANEXOS"
        }]
    }
}

let arrayStatusFallas = {
    data: {
        "success": true,
        "mensaje": "Catalogo status sin datos",
        "result": [{
            "id": "1",
            "descripcion": "NUEVA"
        }, {
            "id": "2",
            "descripcion": "DECLINADA"
        }, {
            "id": "3",
            "descripcion": "OT GENERADA"
        }, {
            "id": "4",
            "descripcion": "INCIDENCIA RECUPERADA"
        }, {
            "id": "5",
            "descripcion": "INCIDENCIA ATENDIDA"
        }]
    }
}

let arrayColoresStatus = {
    data: {
        "success": false,
        "mensaje": "Operación exitosa.",
        "result": [
            [{
                "id": "#7eacf4",
                "descripcion": "No iniciada"
            }, {
                "id": "#87e290",
                "descripcion": "En tránsito"
            }, {
                "id": "#53858f",
                "descripcion": "En trabajo"
            }, {
                "id": "#9e9d9c",
                "descripcion": "Terminada"
            }, {
                "id": "#da482d",
                "descripcion": "Cancelada"
            }, {
                "id": "#2FF3F9",
                "descripcion": "En validación"
            }, {
                "id": "#da482d",
                "descripcion": "Terminada-Cancelada"
            }, {
                "id": "#8998d6",
                "descripcion": "Busqueda de falla"
            }, {
                "id": "#009999",
                "descripcion": "En reparacion"
            }, {
                "id": "#b30059",
                "descripcion": "En Pausa"
            }, {
                "id": "#9e9d9c",
                "descripcion": "Terminada"
            }, {
                "id": "#da482d",
                "descripcion": "Cancelada"
            }, {
                "id": "#9900cc",
                "descripcion": "Asignada"
            }, {
                "id": "#339966",
                "descripcion": "Detenida"
            }, {
                "id": "#f26183",
                "descripcion": "En Sitio"
            }, {
                "id": "#035fff",
                "descripcion": "No asignada"
            }, {
                "id": "#f4c242",
                "descripcion": "Pendiente"
            }, {
                "id": "#5882FA",
                "descripcion": "Falla localizada"
            }, {
                "id": "#F7819F",
                "descripcion": "Falla reparada"
            }],
            [{
                "id": "#5cbc5c",
                "descripcion": "Disponible"
            }, {
                "id": "#f02d4f",
                "descripcion": "Ocupado"
            }, {
                "id": "#b8b5b6",
                "descripcion": "Día libre"
            }, {
                "id": "#ed7d00",
                "descripcion": "En Comida"
            }, {
                "id": "#0f87ff",
                "descripcion": "Vacaciones"
            }, {
                "id": "#9c24b4",
                "descripcion": "En almacén"
            }, {
                "id": "#242425",
                "descripcion": "Fuera de servicio"
            }, {
                "id": "#4f688a",
                "descripcion": "Apoyo técnico"
            }],
            [{
                "id": "#898686",
                "descripcion": "Sin mantenimiento"
            }, {
                "id": "#6EC7D6",
                "descripcion": "En ruta"
            }, {
                "id": "#7100E4",
                "descripcion": "En trabajo"
            }, {
                "id": "#12B80C",
                "descripcion": "Mantenimiento finalizado"
            }, {
                "id": "#EA7F27",
                "descripcion": "Hallazgo"
            }, {
                "id": "#EFE428",
                "descripcion": "Candidato a baja"
            }],
            [{
                "id": "#ec2c3c",
                "descripcion": "Nueva"
            }, {
                "id": "#4cb4f4",
                "descripcion": "Declinada"
            }, {
                "id": "#f79050",
                "descripcion": "OT Generada"
            }, {
                "id": "#66ca8e",
                "descripcion": "Incidencia Recuperada"
            }, {
                "id": "#7b8d8d",
                "descripcion": "Incidencia Atendida"
            }],
            [{
                "id": "#548c24",
                "descripcion": "Menos de 24 hrs"
            }, {
                "id": "#f4dc04",
                "descripcion": "Entre 24 y 48 hrs"
            }, {
                "id": "#dc1c1c",
                "descripcion": "Más de 48 hrs"
            }]
        ]
    }
}

let arrayFiltersPE = {
    data: {
        "success": true,
        "mensaje": "Operación exitosa.",
        "result": {
            "arbol": "[{\"id\":\"1\", \"parent\":\"#\", \"nivel\":\"0\", \"text\":\"TOTAL PLAY PLANTA EXTERNA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"189\", \"parent\":\"1\", \"nivel\":\"1\", \"text\":\"VERACRUZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"2\", \"parent\":\"1\", \"nivel\":\"1\", \"text\":\"BCN\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1038\", \"parent\":\"1\", \"nivel\":\"1\", \"text\":\"REGION 2 TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1039\", \"parent\":\"1\", \"nivel\":\"1\", \"text\":\"REGION 3 TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1040\", \"parent\":\"1\", \"nivel\":\"1\", \"text\":\"REGION 4 TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1041\", \"parent\":\"1\", \"nivel\":\"1\", \"text\":\"REGION 5 TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1042\", \"parent\":\"1\", \"nivel\":\"1\", \"text\":\"REGION 6 TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1043\", \"parent\":\"1\", \"nivel\":\"1\", \"text\":\"REGION 7 TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1044\", \"parent\":\"1\", \"nivel\":\"1\", \"text\":\"REGION 8 TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1045\", \"parent\":\"1\", \"nivel\":\"1\", \"text\":\"REGION 9 TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"968\", \"parent\":\"1\", \"nivel\":\"1\", \"text\":\"REGION TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"164\", \"parent\":\"1\", \"nivel\":\"1\", \"text\":\"SUR\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"207\", \"parent\":\"1\", \"nivel\":\"1\", \"text\":\"SURESTE\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"43\", \"parent\":\"1\", \"nivel\":\"1\", \"text\":\"NORESTE\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"124\", \"parent\":\"1\", \"nivel\":\"1\", \"text\":\"OCCIDENTE\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"591\", \"parent\":\"1\", \"nivel\":\"1\", \"text\":\"MEGACENTRO\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"17\", \"parent\":\"1\", \"nivel\":\"1\", \"text\":\"CHIHUAHUA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"73\", \"parent\":\"1\", \"nivel\":\"1\", \"text\":\"BAJIO\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1037\", \"parent\":\"1\", \"nivel\":\"1\", \"text\":\"REGION 1 TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1500\", \"parent\":\"1043\", \"nivel\":\"2\", \"text\":\"CRUCECITA TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1136\", \"parent\":\"1039\", \"nivel\":\"2\", \"text\":\"CUAHUTEMOC TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1501\", \"parent\":\"1043\", \"nivel\":\"2\", \"text\":\"CUAUTLA TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1352\", \"parent\":\"1042\", \"nivel\":\"2\", \"text\":\"ABASOLO TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1353\", \"parent\":\"1042\", \"nivel\":\"2\", \"text\":\"ACAMBARO TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1222\", \"parent\":\"1041\", \"nivel\":\"2\", \"text\":\"ACAPONETA TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1487\", \"parent\":\"1043\", \"nivel\":\"2\", \"text\":\"ACAPULCO TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1488\", \"parent\":\"1043\", \"nivel\":\"2\", \"text\":\"ACAYUCAN TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1489\", \"parent\":\"1043\", \"nivel\":\"2\", \"text\":\"ACTOPAN TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1171\", \"parent\":\"1040\", \"nivel\":\"2\", \"text\":\"ACUNA TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"74\", \"parent\":\"73\", \"nivel\":\"2\", \"text\":\"AGUASCALIENTES\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1354\", \"parent\":\"1042\", \"nivel\":\"2\", \"text\":\"AGUASCALIENTES TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1490\", \"parent\":\"1043\", \"nivel\":\"2\", \"text\":\"ALVARADO TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1771\", \"parent\":\"1045\", \"nivel\":\"2\", \"text\":\"APAN TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1355\", \"parent\":\"1042\", \"nivel\":\"2\", \"text\":\"APASEO EL ALTO TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1223\", \"parent\":\"1041\", \"nivel\":\"2\", \"text\":\"APATZINGAN TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1491\", \"parent\":\"1043\", \"nivel\":\"2\", \"text\":\"APIZACO TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1224\", \"parent\":\"1041\", \"nivel\":\"2\", \"text\":\"ARANDAS TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1772\", \"parent\":\"1045\", \"nivel\":\"2\", \"text\":\"ATLACOMULCO TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1492\", \"parent\":\"1043\", \"nivel\":\"2\", \"text\":\"ATLIXCO TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1225\", \"parent\":\"1041\", \"nivel\":\"2\", \"text\":\"AUTLAN DE NAVARRO TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1226\", \"parent\":\"1041\", \"nivel\":\"2\", \"text\":\"BAHIA DE BANDERAS TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1675\", \"parent\":\"1044\", \"nivel\":\"2\", \"text\":\"CALDERITAS TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1356\", \"parent\":\"1042\", \"nivel\":\"2\", \"text\":\"CALVILLO TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1133\", \"parent\":\"1039\", \"nivel\":\"2\", \"text\":\"CAMARGO TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1676\", \"parent\":\"1044\", \"nivel\":\"2\", \"text\":\"CAMPECHE TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"208\", \"parent\":\"207\", \"nivel\":\"2\", \"text\":\"CANCUN\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1677\", \"parent\":\"1044\", \"nivel\":\"2\", \"text\":\"CANCUN TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1493\", \"parent\":\"1043\", \"nivel\":\"2\", \"text\":\"CARDEL TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1678\", \"parent\":\"1044\", \"nivel\":\"2\", \"text\":\"CARDENAS-TABASCO TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"83\", \"parent\":\"73\", \"nivel\":\"2\", \"text\":\"CELAYA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1357\", \"parent\":\"1042\", \"nivel\":\"2\", \"text\":\"CELAYA TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1509\", \"parent\":\"1043\", \"nivel\":\"2\", \"text\":\"MINATITLAN TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1175\", \"parent\":\"1040\", \"nivel\":\"2\", \"text\":\"MONCLOVA TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1176\", \"parent\":\"1040\", \"nivel\":\"2\", \"text\":\"MONTEMORELOS TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"44\", \"parent\":\"43\", \"nivel\":\"2\", \"text\":\"MONTERREY\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1177\", \"parent\":\"1040\", \"nivel\":\"2\", \"text\":\"MONTERREY TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"156\", \"parent\":\"124\", \"nivel\":\"2\", \"text\":\"MORELIA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1241\", \"parent\":\"1041\", \"nivel\":\"2\", \"text\":\"MORELIA TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"165\", \"parent\":\"164\", \"nivel\":\"2\", \"text\":\"CUERNAVACA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1502\", \"parent\":\"1043\", \"nivel\":\"2\", \"text\":\"CUERNAVACA TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1137\", \"parent\":\"1039\", \"nivel\":\"2\", \"text\":\"DELICIAS TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1361\", \"parent\":\"1042\", \"nivel\":\"2\", \"text\":\"DOLORES HIDALGO TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1773\", \"parent\":\"1045\", \"nivel\":\"2\", \"text\":\"DONATO GUERRA TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1138\", \"parent\":\"1039\", \"nivel\":\"2\", \"text\":\"DURANGO TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1684\", \"parent\":\"1044\", \"nivel\":\"2\", \"text\":\"EL PARAISO-TABASCO TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1046\", \"parent\":\"1037\", \"nivel\":\"2\", \"text\":\"ENSENADA TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1685\", \"parent\":\"1044\", \"nivel\":\"2\", \"text\":\"ESCARCEGA TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1362\", \"parent\":\"1042\", \"nivel\":\"2\", \"text\":\"FRESNILLO TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1686\", \"parent\":\"1044\", \"nivel\":\"2\", \"text\":\"FRONTERA HIDALGO TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"125\", \"parent\":\"124\", \"nivel\":\"2\", \"text\":\"GUADALAJARA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1230\", \"parent\":\"1041\", \"nivel\":\"2\", \"text\":\"GUADALAJARA TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1363\", \"parent\":\"1042\", \"nivel\":\"2\", \"text\":\"GUANAJUATO TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1139\", \"parent\":\"1039\", \"nivel\":\"2\", \"text\":\"HIDALGO DEL PARRAL TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1503\", \"parent\":\"1043\", \"nivel\":\"2\", \"text\":\"HUACHINANGO TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1504\", \"parent\":\"1043\", \"nivel\":\"2\", \"text\":\"HUAJUAPAN DE LEON TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1505\", \"parent\":\"1043\", \"nivel\":\"2\", \"text\":\"HUATULCO TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1687\", \"parent\":\"1044\", \"nivel\":\"2\", \"text\":\"HUIXTLA TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1506\", \"parent\":\"1043\", \"nivel\":\"2\", \"text\":\"IGUALA TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"435\", \"parent\":\"73\", \"nivel\":\"2\", \"text\":\"IRAPUATO\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1364\", \"parent\":\"1042\", \"nivel\":\"2\", \"text\":\"IRAPUATO TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1688\", \"parent\":\"1044\", \"nivel\":\"2\", \"text\":\"ISLA MUJERES TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1365\", \"parent\":\"1042\", \"nivel\":\"2\", \"text\":\"IXMIQUILPAN TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1774\", \"parent\":\"1045\", \"nivel\":\"2\", \"text\":\"IXTAPAN DE LA SAL TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1775\", \"parent\":\"1045\", \"nivel\":\"2\", \"text\":\"IXTLAHUACA DE RAYON TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1231\", \"parent\":\"1041\", \"nivel\":\"2\", \"text\":\"IXTLAN DEL RIO TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1507\", \"parent\":\"1043\", \"nivel\":\"2\", \"text\":\"IZUCAR DE MATAMOROS TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1140\", \"parent\":\"1039\", \"nivel\":\"2\", \"text\":\"JIMENEZ TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1232\", \"parent\":\"1043\", \"nivel\":\"2\", \"text\":\"JUCHITAN TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1679\", \"parent\":\"1044\", \"nivel\":\"2\", \"text\":\"CHAMPOTON TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1227\", \"parent\":\"1041\", \"nivel\":\"2\", \"text\":\"CHAPALA TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1680\", \"parent\":\"1044\", \"nivel\":\"2\", \"text\":\"CHETUMAL TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"18\", \"parent\":\"17\", \"nivel\":\"2\", \"text\":\"CHIHUAHUA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1134\", \"parent\":\"1039\", \"nivel\":\"2\", \"text\":\"CHIHUAHUA TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1494\", \"parent\":\"1043\", \"nivel\":\"2\", \"text\":\"CHILAPA DE ALVAREZ TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1495\", \"parent\":\"1043\", \"nivel\":\"2\", \"text\":\"CHILPANCINGO TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"592\", \"parent\":\"591\", \"nivel\":\"2\", \"text\":\"CIUDAD DE MEXICO\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1776\", \"parent\":\"1045\", \"nivel\":\"2\", \"text\":\"CIUDAD DE MEXICO TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1681\", \"parent\":\"1044\", \"nivel\":\"2\", \"text\":\"CIUDAD DEL CARMEN TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1228\", \"parent\":\"1041\", \"nivel\":\"2\", \"text\":\"CIUDAD GUZMAN TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"28\", \"parent\":\"17\", \"nivel\":\"2\", \"text\":\"CIUDAD JUAREZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1135\", \"parent\":\"1039\", \"nivel\":\"2\", \"text\":\"CIUDAD JUAREZ TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1358\", \"parent\":\"1042\", \"nivel\":\"2\", \"text\":\"CIUDAD MANTE TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"969\", \"parent\":\"968\", \"nivel\":\"2\", \"text\":\"CIUDAD TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1359\", \"parent\":\"1042\", \"nivel\":\"2\", \"text\":\"CIUDAD VALLES TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1172\", \"parent\":\"1040\", \"nivel\":\"2\", \"text\":\"CIUDAD VICTORIA TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1496\", \"parent\":\"1043\", \"nivel\":\"2\", \"text\":\"COATEPEC TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1032\", \"parent\":\"189\", \"nivel\":\"2\", \"text\":\"COATZA/MINA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1497\", \"parent\":\"1043\", \"nivel\":\"2\", \"text\":\"COATZACOALCOS TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1229\", \"parent\":\"1041\", \"nivel\":\"2\", \"text\":\"COLIMA TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1682\", \"parent\":\"1044\", \"nivel\":\"2\", \"text\":\"COMALCALCO TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1360\", \"parent\":\"1042\", \"nivel\":\"2\", \"text\":\"COMONFORT TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1498\", \"parent\":\"1043\", \"nivel\":\"2\", \"text\":\"CORDOBA TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1027\", \"parent\":\"189\", \"nivel\":\"2\", \"text\":\"CORDOBA/ORIZABA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1499\", \"parent\":\"1043\", \"nivel\":\"2\", \"text\":\"COSAMALOAPAN TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1683\", \"parent\":\"1044\", \"nivel\":\"2\", \"text\":\"COZUMEL TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1182\", \"parent\":\"1040\", \"nivel\":\"2\", \"text\":\"SALTILLO TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1518\", \"parent\":\"1043\", \"nivel\":\"2\", \"text\":\"SAN ANDRES TUXTLA TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1692\", \"parent\":\"1044\", \"nivel\":\"2\", \"text\":\"SAN CRISTOBAL DE LAS CASAS TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1778\", \"parent\":\"1045\", \"nivel\":\"2\", \"text\":\"SAN JUAN DE TEOTIHUACAN TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1374\", \"parent\":\"1042\", \"nivel\":\"2\", \"text\":\"SAN JUAN DEL RIO TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1375\", \"parent\":\"1042\", \"nivel\":\"2\", \"text\":\"SAN LUIS DE LA PAZ TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"114\", \"parent\":\"73\", \"nivel\":\"2\", \"text\":\"SAN LUIS POTOSI\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1376\", \"parent\":\"1042\", \"nivel\":\"2\", \"text\":\"SAN LUIS POTOSI TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1377\", \"parent\":\"1042\", \"nivel\":\"2\", \"text\":\"SAN MIGUEL ALLENDE TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1519\", \"parent\":\"1043\", \"nivel\":\"2\", \"text\":\"SAN PEDRO POCHUTLA TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1386\", \"parent\":\"1040\", \"nivel\":\"2\", \"text\":\"SANTIAGO TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1378\", \"parent\":\"1042\", \"nivel\":\"2\", \"text\":\"SILAO TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1247\", \"parent\":\"1041\", \"nivel\":\"2\", \"text\":\"TALA TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1183\", \"parent\":\"1040\", \"nivel\":\"2\", \"text\":\"TAMPICO TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1693\", \"parent\":\"1044\", \"nivel\":\"2\", \"text\":\"TAPACHULA TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1520\", \"parent\":\"1043\", \"nivel\":\"2\", \"text\":\"TAXCO TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1694\", \"parent\":\"1044\", \"nivel\":\"2\", \"text\":\"TEAPA TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1521\", \"parent\":\"1043\", \"nivel\":\"2\", \"text\":\"TECAMACHALCO TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1242\", \"parent\":\"1041\", \"nivel\":\"2\", \"text\":\"MOROLEON TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1510\", \"parent\":\"1043\", \"nivel\":\"2\", \"text\":\"NAOLINCO TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1178\", \"parent\":\"1040\", \"nivel\":\"2\", \"text\":\"NUEVO LAREDO TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1511\", \"parent\":\"1043\", \"nivel\":\"2\", \"text\":\"OAXACA TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1243\", \"parent\":\"1041\", \"nivel\":\"2\", \"text\":\"OCOTLAN TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1512\", \"parent\":\"1043\", \"nivel\":\"2\", \"text\":\"ORIZABA TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"594\", \"parent\":\"591\", \"nivel\":\"2\", \"text\":\"PACHUCA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1777\", \"parent\":\"1045\", \"nivel\":\"2\", \"text\":\"PACHUCA TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1048\", \"parent\":\"1037\", \"nivel\":\"2\", \"text\":\"PALM VALLEY-TIJUANA TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1244\", \"parent\":\"1041\", \"nivel\":\"2\", \"text\":\"PAZCUARO TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1370\", \"parent\":\"1042\", \"nivel\":\"2\", \"text\":\"PEDRO ESCOBEDO TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1371\", \"parent\":\"1042\", \"nivel\":\"2\", \"text\":\"PENJAMO TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1513\", \"parent\":\"1043\", \"nivel\":\"2\", \"text\":\"PEROTE TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1179\", \"parent\":\"1040\", \"nivel\":\"2\", \"text\":\"PIEDRAS NEGRAS TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1514\", \"parent\":\"1043\", \"nivel\":\"2\", \"text\":\"PINOTEPA NACIONAL TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1691\", \"parent\":\"1044\", \"nivel\":\"2\", \"text\":\"PORT CHIAPAS-CHIAPAS TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1515\", \"parent\":\"1043\", \"nivel\":\"2\", \"text\":\"POZA RICA TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1245\", \"parent\":\"1044\", \"nivel\":\"2\", \"text\":\"PROGRESO TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"175\", \"parent\":\"164\", \"nivel\":\"2\", \"text\":\"PUEBLA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1516\", \"parent\":\"1043\", \"nivel\":\"2\", \"text\":\"PUEBLA TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1049\", \"parent\":\"1037\", \"nivel\":\"2\", \"text\":\"PUERTO PENASCO TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"459\", \"parent\":\"124\", \"nivel\":\"2\", \"text\":\"PUERTO VALLARTA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1246\", \"parent\":\"1041\", \"nivel\":\"2\", \"text\":\"PUERTO VALLARTA TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"104\", \"parent\":\"73\", \"nivel\":\"2\", \"text\":\"QUERETARO\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1366\", \"parent\":\"1042\", \"nivel\":\"2\", \"text\":\"JUVENTINO ROSAS TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1233\", \"parent\":\"1041\", \"nivel\":\"2\", \"text\":\"LA BARCA TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1022\", \"parent\":\"43\", \"nivel\":\"2\", \"text\":\"LA LAGUNA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1234\", \"parent\":\"1041\", \"nivel\":\"2\", \"text\":\"LA PIEDAD TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1235\", \"parent\":\"1041\", \"nivel\":\"2\", \"text\":\"LAGOS DE MORENO TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1236\", \"parent\":\"1041\", \"nivel\":\"2\", \"text\":\"LAGUNILLAS TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1367\", \"parent\":\"1042\", \"nivel\":\"2\", \"text\":\"LAS CHOAPAS-VERACRUZ TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1141\", \"parent\":\"1039\", \"nivel\":\"2\", \"text\":\"LAS CRUCES-CHIHUAHUA TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1237\", \"parent\":\"1041\", \"nivel\":\"2\", \"text\":\"LAZARO CARDENAS TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"92\", \"parent\":\"73\", \"nivel\":\"2\", \"text\":\"LEON\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1368\", \"parent\":\"1042\", \"nivel\":\"2\", \"text\":\"LEON TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1173\", \"parent\":\"1040\", \"nivel\":\"2\", \"text\":\"LINARES TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1238\", \"parent\":\"1043\", \"nivel\":\"2\", \"text\":\"LOMA BONITA TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1239\", \"parent\":\"1041\", \"nivel\":\"2\", \"text\":\"LOS REYES DE SALGADO TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1689\", \"parent\":\"1044\", \"nivel\":\"2\", \"text\":\"MACUSPANA TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1240\", \"parent\":\"1041\", \"nivel\":\"2\", \"text\":\"MANZANILLO TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1508\", \"parent\":\"1043\", \"nivel\":\"2\", \"text\":\"MARTINEZ DE LA TORRE TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1174\", \"parent\":\"1040\", \"nivel\":\"2\", \"text\":\"MATAMOROS TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1369\", \"parent\":\"1042\", \"nivel\":\"2\", \"text\":\"MATEHUALA TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"216\", \"parent\":\"207\", \"nivel\":\"2\", \"text\":\"MERIDA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1690\", \"parent\":\"1044\", \"nivel\":\"2\", \"text\":\"MERIDA TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1047\", \"parent\":\"1037\", \"nivel\":\"2\", \"text\":\"MEXICALI TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1077\", \"parent\":\"1038\", \"nivel\":\"2\", \"text\":\"TX GUASAVE\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1078\", \"parent\":\"1038\", \"nivel\":\"2\", \"text\":\"TX GUAYMAS\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1079\", \"parent\":\"1038\", \"nivel\":\"2\", \"text\":\"TX HERMOSILLO\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1080\", \"parent\":\"1038\", \"nivel\":\"2\", \"text\":\"TX LA PAZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1081\", \"parent\":\"1038\", \"nivel\":\"2\", \"text\":\"TX LOS MOCHIS\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1082\", \"parent\":\"1038\", \"nivel\":\"2\", \"text\":\"TX MAZATLAN\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1083\", \"parent\":\"1038\", \"nivel\":\"2\", \"text\":\"TX NAVOJOA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1084\", \"parent\":\"1038\", \"nivel\":\"2\", \"text\":\"TX NOGALES\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1085\", \"parent\":\"1038\", \"nivel\":\"2\", \"text\":\"TX PLAYA ENCANTO\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1086\", \"parent\":\"1038\", \"nivel\":\"2\", \"text\":\"TX SAN JOSE DEL CABO\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1087\", \"parent\":\"1038\", \"nivel\":\"2\", \"text\":\"TX SAN LUIS RIO COLORADO\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1253\", \"parent\":\"1041\", \"nivel\":\"2\", \"text\":\"URUAPAN TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1697\", \"parent\":\"1044\", \"nivel\":\"2\", \"text\":\"VALLADOLID TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"528\", \"parent\":\"591\", \"nivel\":\"2\", \"text\":\"VALLE DE BRAVO\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1781\", \"parent\":\"1045\", \"nivel\":\"2\", \"text\":\"VALLE DE BRAVO TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1383\", \"parent\":\"1042\", \"nivel\":\"2\", \"text\":\"VALLE DE SANTIAGO TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"190\", \"parent\":\"189\", \"nivel\":\"2\", \"text\":\"VERACRUZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1530\", \"parent\":\"1043\", \"nivel\":\"2\", \"text\":\"VERACRUZ TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1384\", \"parent\":\"1042\", \"nivel\":\"2\", \"text\":\"VICTOR ROSALES TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1698\", \"parent\":\"1044\", \"nivel\":\"2\", \"text\":\"VILLAHERMOSA TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"198\", \"parent\":\"189\", \"nivel\":\"2\", \"text\":\"XALAPA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1531\", \"parent\":\"1043\", \"nivel\":\"2\", \"text\":\"XALAPA TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1533\", \"parent\":\"1043\", \"nivel\":\"2\", \"text\":\"YAUTEPEC TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1385\", \"parent\":\"1042\", \"nivel\":\"2\", \"text\":\"ZACATECAS TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1534\", \"parent\":\"1043\", \"nivel\":\"2\", \"text\":\"ZACATEPEC DE HIDALGO TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1254\", \"parent\":\"1041\", \"nivel\":\"2\", \"text\":\"ZAMORA TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1532\", \"parent\":\"1043\", \"nivel\":\"2\", \"text\":\"ZIHUATANEJO TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1051\", \"parent\":\"1037\", \"nivel\":\"2\", \"text\":\"TECATE TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1248\", \"parent\":\"1041\", \"nivel\":\"2\", \"text\":\"TECOMAN TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1522\", \"parent\":\"1043\", \"nivel\":\"2\", \"text\":\"TEHUACAN TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1779\", \"parent\":\"1045\", \"nivel\":\"2\", \"text\":\"TENANCINGO DE DEGOLLADO TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1249\", \"parent\":\"1041\", \"nivel\":\"2\", \"text\":\"TEPATITLAN TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1379\", \"parent\":\"1042\", \"nivel\":\"2\", \"text\":\"TEPEJI DEL RIO TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1250\", \"parent\":\"1041\", \"nivel\":\"2\", \"text\":\"TEPIC TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1251\", \"parent\":\"1041\", \"nivel\":\"2\", \"text\":\"TEQUILA TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1380\", \"parent\":\"1042\", \"nivel\":\"2\", \"text\":\"TEQUISQUIAPAN TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1523\", \"parent\":\"1043\", \"nivel\":\"2\", \"text\":\"TEXMELUCAN TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1524\", \"parent\":\"1043\", \"nivel\":\"2\", \"text\":\"TEZIUTLAN TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1525\", \"parent\":\"1043\", \"nivel\":\"2\", \"text\":\"TIERRA BLANCA TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"3\", \"parent\":\"2\", \"nivel\":\"2\", \"text\":\"TIJUANA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1052\", \"parent\":\"1037\", \"nivel\":\"2\", \"text\":\"TIJUANA TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1526\", \"parent\":\"1043\", \"nivel\":\"2\", \"text\":\"TLAXCALA TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1381\", \"parent\":\"1042\", \"nivel\":\"2\", \"text\":\"TLAXCOAPAN TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"593\", \"parent\":\"591\", \"nivel\":\"2\", \"text\":\"TOLUCA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1780\", \"parent\":\"1045\", \"nivel\":\"2\", \"text\":\"TOLUCA TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1142\", \"parent\":\"1039\", \"nivel\":\"2\", \"text\":\"TORREON TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1527\", \"parent\":\"1043\", \"nivel\":\"2\", \"text\":\"TRES MARIAS TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1382\", \"parent\":\"1042\", \"nivel\":\"2\", \"text\":\"TULA DE ALLENDE TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1695\", \"parent\":\"1044\", \"nivel\":\"2\", \"text\":\"TULUM TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1252\", \"parent\":\"1041\", \"nivel\":\"2\", \"text\":\"TUXPAN (NAYARIT) TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1528\", \"parent\":\"1043\", \"nivel\":\"2\", \"text\":\"TUXPAN TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1529\", \"parent\":\"1043\", \"nivel\":\"2\", \"text\":\"TUXTEPEC TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1696\", \"parent\":\"1044\", \"nivel\":\"2\", \"text\":\"TUXTLA GUTIERREZ TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1073\", \"parent\":\"1038\", \"nivel\":\"2\", \"text\":\"TX CABO SAN LUCAS\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1074\", \"parent\":\"1038\", \"nivel\":\"2\", \"text\":\"TX CIUDAD OBREGON\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1075\", \"parent\":\"1038\", \"nivel\":\"2\", \"text\":\"TX CULIACAN\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1076\", \"parent\":\"1038\", \"nivel\":\"2\", \"text\":\"TX GUAMUCHIL\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1372\", \"parent\":\"1042\", \"nivel\":\"2\", \"text\":\"QUERETARO TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1180\", \"parent\":\"1040\", \"nivel\":\"2\", \"text\":\"REYNOSA TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1050\", \"parent\":\"1037\", \"nivel\":\"2\", \"text\":\"ROSARITO TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1181\", \"parent\":\"1040\", \"nivel\":\"2\", \"text\":\"SABINAS TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1373\", \"parent\":\"1042\", \"nivel\":\"2\", \"text\":\"SALAMANCA TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1517\", \"parent\":\"1043\", \"nivel\":\"2\", \"text\":\"SALINA CRUZ TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"429\", \"parent\":\"43\", \"nivel\":\"2\", \"text\":\"SALTILLO\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1091\", \"parent\":\"1076\", \"nivel\":\"3\", \"text\":\"TX GUAMUCHIL\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1092\", \"parent\":\"1077\", \"nivel\":\"3\", \"text\":\"TX GUASAVE\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1093\", \"parent\":\"1078\", \"nivel\":\"3\", \"text\":\"TX GUAYMAS\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1094\", \"parent\":\"1079\", \"nivel\":\"3\", \"text\":\"TX HERMOSILLO\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1095\", \"parent\":\"1080\", \"nivel\":\"3\", \"text\":\"TX LA PAZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1096\", \"parent\":\"1081\", \"nivel\":\"3\", \"text\":\"TX LOS MOCHIS\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1097\", \"parent\":\"1082\", \"nivel\":\"3\", \"text\":\"TX MAZATLAN\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1098\", \"parent\":\"1083\", \"nivel\":\"3\", \"text\":\"TX NAVOJOA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1099\", \"parent\":\"1084\", \"nivel\":\"3\", \"text\":\"TX NOGALES\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1100\", \"parent\":\"1085\", \"nivel\":\"3\", \"text\":\"TX PLAYA ENCANTO\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1101\", \"parent\":\"1086\", \"nivel\":\"3\", \"text\":\"TX SAN JOSE DEL CABO\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1102\", \"parent\":\"1087\", \"nivel\":\"3\", \"text\":\"TX SAN LUIS RIO COLORADO\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1286\", \"parent\":\"1253\", \"nivel\":\"3\", \"text\":\"URUAPAN TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1721\", \"parent\":\"1697\", \"nivel\":\"3\", \"text\":\"VALLADOLID TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"851\", \"parent\":\"528\", \"nivel\":\"3\", \"text\":\"VALLE DE BRAVO\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1792\", \"parent\":\"1781\", \"nivel\":\"3\", \"text\":\"VALLE DE BRAVO TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1418\", \"parent\":\"1383\", \"nivel\":\"3\", \"text\":\"VALLE DE SANTIAGO TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"191\", \"parent\":\"190\", \"nivel\":\"3\", \"text\":\"VERACRUZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1578\", \"parent\":\"1530\", \"nivel\":\"3\", \"text\":\"VERACRUZ TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1419\", \"parent\":\"1384\", \"nivel\":\"3\", \"text\":\"VICTOR ROSALES TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1722\", \"parent\":\"1698\", \"nivel\":\"3\", \"text\":\"VILLAHERMOSA TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"199\", \"parent\":\"198\", \"nivel\":\"3\", \"text\":\"XALAPA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1579\", \"parent\":\"1531\", \"nivel\":\"3\", \"text\":\"XALAPA TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"716\", \"parent\":\"592\", \"nivel\":\"3\", \"text\":\"XOCHIMILCO\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1581\", \"parent\":\"1533\", \"nivel\":\"3\", \"text\":\"YAUTEPEC TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1420\", \"parent\":\"1385\", \"nivel\":\"3\", \"text\":\"ZACATECAS TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1582\", \"parent\":\"1534\", \"nivel\":\"3\", \"text\":\"ZACATEPEC DE HIDALGO TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1287\", \"parent\":\"1254\", \"nivel\":\"3\", \"text\":\"ZAMORA TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1580\", \"parent\":\"1532\", \"nivel\":\"3\", \"text\":\"ZIHUATANEJO TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1058\", \"parent\":\"1051\", \"nivel\":\"3\", \"text\":\"TECATE TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1281\", \"parent\":\"1248\", \"nivel\":\"3\", \"text\":\"TECOMAN TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1570\", \"parent\":\"1522\", \"nivel\":\"3\", \"text\":\"TEHUACAN TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1790\", \"parent\":\"1779\", \"nivel\":\"3\", \"text\":\"TENANCINGO DE DEGOLLADO TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1282\", \"parent\":\"1249\", \"nivel\":\"3\", \"text\":\"TEPATITLAN TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1414\", \"parent\":\"1379\", \"nivel\":\"3\", \"text\":\"TEPEJI DEL RIO TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1283\", \"parent\":\"1250\", \"nivel\":\"3\", \"text\":\"TEPIC TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1284\", \"parent\":\"1251\", \"nivel\":\"3\", \"text\":\"TEQUILA TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1415\", \"parent\":\"1380\", \"nivel\":\"3\", \"text\":\"TEQUISQUIAPAN TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1571\", \"parent\":\"1523\", \"nivel\":\"3\", \"text\":\"TEXMELUCAN TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1572\", \"parent\":\"1524\", \"nivel\":\"3\", \"text\":\"TEZIUTLAN TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1573\", \"parent\":\"1525\", \"nivel\":\"3\", \"text\":\"TIERRA BLANCA TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"4\", \"parent\":\"3\", \"nivel\":\"3\", \"text\":\"TIJUANA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1947\", \"parent\":\"3\", \"nivel\":\"3\", \"text\":\"TIJUANA 2\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1059\", \"parent\":\"1052\", \"nivel\":\"3\", \"text\":\"TIJUANA TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"718\", \"parent\":\"592\", \"nivel\":\"3\", \"text\":\"TLALNEPANTLA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"715\", \"parent\":\"592\", \"nivel\":\"3\", \"text\":\"TLALPAN\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1574\", \"parent\":\"1526\", \"nivel\":\"3\", \"text\":\"TLAXCALA TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1416\", \"parent\":\"1381\", \"nivel\":\"3\", \"text\":\"TLAXCOAPAN TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"597\", \"parent\":\"593\", \"nivel\":\"3\", \"text\":\"TOLUCA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1791\", \"parent\":\"1780\", \"nivel\":\"3\", \"text\":\"TOLUCA TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1152\", \"parent\":\"1142\", \"nivel\":\"3\", \"text\":\"TORREON TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1575\", \"parent\":\"1527\", \"nivel\":\"3\", \"text\":\"TRES MARIAS TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1417\", \"parent\":\"1382\", \"nivel\":\"3\", \"text\":\"TULA DE ALLENDE TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"722\", \"parent\":\"592\", \"nivel\":\"3\", \"text\":\"TULTEPEC\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"721\", \"parent\":\"592\", \"nivel\":\"3\", \"text\":\"TULTITLAN\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1719\", \"parent\":\"1695\", \"nivel\":\"3\", \"text\":\"TULUM TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1285\", \"parent\":\"1252\", \"nivel\":\"3\", \"text\":\"TUXPAN (NAYARIT) TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1576\", \"parent\":\"1528\", \"nivel\":\"3\", \"text\":\"TUXPAN TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1577\", \"parent\":\"1529\", \"nivel\":\"3\", \"text\":\"TUXTEPEC TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1720\", \"parent\":\"1696\", \"nivel\":\"3\", \"text\":\"TUXTLA GUTIERREZ TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1088\", \"parent\":\"1073\", \"nivel\":\"3\", \"text\":\"TX CABO SAN LUCAS\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1089\", \"parent\":\"1074\", \"nivel\":\"3\", \"text\":\"TX CIUDAD OBREGON\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1090\", \"parent\":\"1075\", \"nivel\":\"3\", \"text\":\"TX CULIACAN\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1407\", \"parent\":\"1372\", \"nivel\":\"3\", \"text\":\"QUERETARO TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1193\", \"parent\":\"1180\", \"nivel\":\"3\", \"text\":\"REYNOSA TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1057\", \"parent\":\"1050\", \"nivel\":\"3\", \"text\":\"ROSARITO TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1194\", \"parent\":\"1181\", \"nivel\":\"3\", \"text\":\"SABINAS TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1408\", \"parent\":\"1373\", \"nivel\":\"3\", \"text\":\"SALAMANCA TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1565\", \"parent\":\"1517\", \"nivel\":\"3\", \"text\":\"SALINA CRUZ TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"568\", \"parent\":\"429\", \"nivel\":\"3\", \"text\":\"SALTILLO\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1195\", \"parent\":\"1182\", \"nivel\":\"3\", \"text\":\"SALTILLO TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1566\", \"parent\":\"1518\", \"nivel\":\"3\", \"text\":\"SAN ANDRES TUXTLA TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1716\", \"parent\":\"1692\", \"nivel\":\"3\", \"text\":\"SAN CRISTOBAL DE LAS CASAS TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1789\", \"parent\":\"1778\", \"nivel\":\"3\", \"text\":\"SAN JUAN DE TEOTIHUACAN TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1409\", \"parent\":\"1374\", \"nivel\":\"3\", \"text\":\"SAN JUAN DEL RIO TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1410\", \"parent\":\"1375\", \"nivel\":\"3\", \"text\":\"SAN LUIS DE LA PAZ TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"115\", \"parent\":\"114\", \"nivel\":\"3\", \"text\":\"SAN LUIS POTOSI\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1411\", \"parent\":\"1376\", \"nivel\":\"3\", \"text\":\"SAN LUIS POTOSI TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1412\", \"parent\":\"1377\", \"nivel\":\"3\", \"text\":\"SAN MIGUEL ALLENDE TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1567\", \"parent\":\"1519\", \"nivel\":\"3\", \"text\":\"SAN PEDRO POCHUTLA TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"709\", \"parent\":\"592\", \"nivel\":\"3\", \"text\":\"SANTA FE\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1421\", \"parent\":\"1386\", \"nivel\":\"3\", \"text\":\"SANTIAGO TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1413\", \"parent\":\"1378\", \"nivel\":\"3\", \"text\":\"SILAO TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1280\", \"parent\":\"1247\", \"nivel\":\"3\", \"text\":\"TALA TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1196\", \"parent\":\"1183\", \"nivel\":\"3\", \"text\":\"TAMPICO TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1717\", \"parent\":\"1693\", \"nivel\":\"3\", \"text\":\"TAPACHULA TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1568\", \"parent\":\"1520\", \"nivel\":\"3\", \"text\":\"TAXCO TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1718\", \"parent\":\"1694\", \"nivel\":\"3\", \"text\":\"TEAPA TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"703\", \"parent\":\"592\", \"nivel\":\"3\", \"text\":\"TECAMAC\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1569\", \"parent\":\"1521\", \"nivel\":\"3\", \"text\":\"TECAMACHALCO TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1275\", \"parent\":\"1242\", \"nivel\":\"3\", \"text\":\"MOROLEON TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"680\", \"parent\":\"44\", \"nivel\":\"3\", \"text\":\"MTY CERRO DE LA SILLA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"2119\", \"parent\":\"44\", \"nivel\":\"3\", \"text\":\"MTY GARCIA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"678\", \"parent\":\"44\", \"nivel\":\"3\", \"text\":\"MTY MITRAS\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"681\", \"parent\":\"44\", \"nivel\":\"3\", \"text\":\"MTY SANTA LUCIA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"682\", \"parent\":\"44\", \"nivel\":\"3\", \"text\":\"MTY SENDERO DIVISORIO\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"679\", \"parent\":\"44\", \"nivel\":\"3\", \"text\":\"MTY SIERRA MADRE\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1558\", \"parent\":\"1510\", \"nivel\":\"3\", \"text\":\"NAOLINCO TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"720\", \"parent\":\"592\", \"nivel\":\"3\", \"text\":\"NAUCALPAN\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"708\", \"parent\":\"592\", \"nivel\":\"3\", \"text\":\"NEZA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"898\", \"parent\":\"592\", \"nivel\":\"3\", \"text\":\"NEZA 2\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"723\", \"parent\":\"592\", \"nivel\":\"3\", \"text\":\"NICOLAS ROMERO\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1191\", \"parent\":\"1178\", \"nivel\":\"3\", \"text\":\"NUEVO LAREDO TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1559\", \"parent\":\"1511\", \"nivel\":\"3\", \"text\":\"OAXACA TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1276\", \"parent\":\"1243\", \"nivel\":\"3\", \"text\":\"OCOTLAN TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1560\", \"parent\":\"1512\", \"nivel\":\"3\", \"text\":\"ORIZABA TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"598\", \"parent\":\"594\", \"nivel\":\"3\", \"text\":\"PACHUCA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1788\", \"parent\":\"1777\", \"nivel\":\"3\", \"text\":\"PACHUCA TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1055\", \"parent\":\"1048\", \"nivel\":\"3\", \"text\":\"PALM VALLEY-TIJUANA TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1277\", \"parent\":\"1244\", \"nivel\":\"3\", \"text\":\"PAZCUARO TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"714\", \"parent\":\"592\", \"nivel\":\"3\", \"text\":\"PEDREGAL\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1405\", \"parent\":\"1370\", \"nivel\":\"3\", \"text\":\"PEDRO ESCOBEDO TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1406\", \"parent\":\"1371\", \"nivel\":\"3\", \"text\":\"PENJAMO TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1561\", \"parent\":\"1513\", \"nivel\":\"3\", \"text\":\"PEROTE TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1192\", \"parent\":\"1179\", \"nivel\":\"3\", \"text\":\"PIEDRAS NEGRAS TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1562\", \"parent\":\"1514\", \"nivel\":\"3\", \"text\":\"PINOTEPA NACIONAL TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1943\", \"parent\":\"592\", \"nivel\":\"3\", \"text\":\"POLANCO\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1715\", \"parent\":\"1691\", \"nivel\":\"3\", \"text\":\"PORT CHIAPAS-CHIAPAS TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"712\", \"parent\":\"592\", \"nivel\":\"3\", \"text\":\"PORTALES\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1563\", \"parent\":\"1515\", \"nivel\":\"3\", \"text\":\"POZA RICA TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1278\", \"parent\":\"1245\", \"nivel\":\"3\", \"text\":\"PROGRESO TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"176\", \"parent\":\"175\", \"nivel\":\"3\", \"text\":\"PUEBLA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1945\", \"parent\":\"175\", \"nivel\":\"3\", \"text\":\"PUEBLA 2\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1564\", \"parent\":\"1516\", \"nivel\":\"3\", \"text\":\"PUEBLA TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1056\", \"parent\":\"1049\", \"nivel\":\"3\", \"text\":\"PUERTO PENASCO TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"575\", \"parent\":\"459\", \"nivel\":\"3\", \"text\":\"PUERTO VALLARTA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1279\", \"parent\":\"1246\", \"nivel\":\"3\", \"text\":\"PUERTO VALLARTA TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"105\", \"parent\":\"104\", \"nivel\":\"3\", \"text\":\"QUERETARO\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1265\", \"parent\":\"1232\", \"nivel\":\"3\", \"text\":\"JUCHITAN TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1401\", \"parent\":\"1366\", \"nivel\":\"3\", \"text\":\"JUVENTINO ROSAS TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1266\", \"parent\":\"1233\", \"nivel\":\"3\", \"text\":\"LA BARCA TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1023\", \"parent\":\"1022\", \"nivel\":\"3\", \"text\":\"LA LAGUNA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1267\", \"parent\":\"1234\", \"nivel\":\"3\", \"text\":\"LA PIEDAD TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"694\", \"parent\":\"125\", \"nivel\":\"3\", \"text\":\"LA PRIMAVERA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1268\", \"parent\":\"1235\", \"nivel\":\"3\", \"text\":\"LAGOS DE MORENO TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1269\", \"parent\":\"1236\", \"nivel\":\"3\", \"text\":\"LAGUNILLAS TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"713\", \"parent\":\"592\", \"nivel\":\"3\", \"text\":\"LAS AGUILAS\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1402\", \"parent\":\"1367\", \"nivel\":\"3\", \"text\":\"LAS CHOAPAS-VERACRUZ TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1151\", \"parent\":\"1141\", \"nivel\":\"3\", \"text\":\"LAS CRUCES-CHIHUAHUA TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"691\", \"parent\":\"125\", \"nivel\":\"3\", \"text\":\"LAZARO CARDENAS\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1270\", \"parent\":\"1237\", \"nivel\":\"3\", \"text\":\"LAZARO CARDENAS TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"93\", \"parent\":\"92\", \"nivel\":\"3\", \"text\":\"LEON\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1403\", \"parent\":\"1368\", \"nivel\":\"3\", \"text\":\"LEON TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1186\", \"parent\":\"1173\", \"nivel\":\"3\", \"text\":\"LINARES TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1271\", \"parent\":\"1238\", \"nivel\":\"3\", \"text\":\"LOMA BONITA TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"693\", \"parent\":\"125\", \"nivel\":\"3\", \"text\":\"LOPEZ MATEOS\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"724\", \"parent\":\"592\", \"nivel\":\"3\", \"text\":\"LOS REYES\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1272\", \"parent\":\"1239\", \"nivel\":\"3\", \"text\":\"LOS REYES DE SALGADO TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1713\", \"parent\":\"1689\", \"nivel\":\"3\", \"text\":\"MACUSPANA TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1273\", \"parent\":\"1240\", \"nivel\":\"3\", \"text\":\"MANZANILLO TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1556\", \"parent\":\"1508\", \"nivel\":\"3\", \"text\":\"MARTINEZ DE LA TORRE TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1187\", \"parent\":\"1174\", \"nivel\":\"3\", \"text\":\"MATAMOROS TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1404\", \"parent\":\"1369\", \"nivel\":\"3\", \"text\":\"MATEHUALA TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"217\", \"parent\":\"216\", \"nivel\":\"3\", \"text\":\"MERIDA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1714\", \"parent\":\"1690\", \"nivel\":\"3\", \"text\":\"MERIDA TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1054\", \"parent\":\"1047\", \"nivel\":\"3\", \"text\":\"MEXICALI TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1557\", \"parent\":\"1509\", \"nivel\":\"3\", \"text\":\"MINATITLAN TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1188\", \"parent\":\"1175\", \"nivel\":\"3\", \"text\":\"MONCLOVA TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1189\", \"parent\":\"1176\", \"nivel\":\"3\", \"text\":\"MONTEMORELOS TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1190\", \"parent\":\"1177\", \"nivel\":\"3\", \"text\":\"MONTERREY TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"157\", \"parent\":\"156\", \"nivel\":\"3\", \"text\":\"MORELIA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1274\", \"parent\":\"1241\", \"nivel\":\"3\", \"text\":\"MORELIA TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1549\", \"parent\":\"1501\", \"nivel\":\"3\", \"text\":\"CUAUTLA TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"166\", \"parent\":\"165\", \"nivel\":\"3\", \"text\":\"CUERNAVACA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1550\", \"parent\":\"1502\", \"nivel\":\"3\", \"text\":\"CUERNAVACA TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1147\", \"parent\":\"1137\", \"nivel\":\"3\", \"text\":\"DELICIAS TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"970\", \"parent\":\"969\", \"nivel\":\"3\", \"text\":\"DISTRITO TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1396\", \"parent\":\"1361\", \"nivel\":\"3\", \"text\":\"DOLORES HIDALGO TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1784\", \"parent\":\"1773\", \"nivel\":\"3\", \"text\":\"DONATO GUERRA TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1148\", \"parent\":\"1138\", \"nivel\":\"3\", \"text\":\"DURANGO TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"704\", \"parent\":\"592\", \"nivel\":\"3\", \"text\":\"ECATEPEC\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1708\", \"parent\":\"1684\", \"nivel\":\"3\", \"text\":\"EL PARAISO-TABASCO TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1053\", \"parent\":\"1046\", \"nivel\":\"3\", \"text\":\"ENSENADA TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1709\", \"parent\":\"1685\", \"nivel\":\"3\", \"text\":\"ESCARCEGA TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"689\", \"parent\":\"125\", \"nivel\":\"3\", \"text\":\"ESTADIO\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1397\", \"parent\":\"1362\", \"nivel\":\"3\", \"text\":\"FRESNILLO TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1710\", \"parent\":\"1686\", \"nivel\":\"3\", \"text\":\"FRONTERA HIDALGO TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1263\", \"parent\":\"1230\", \"nivel\":\"3\", \"text\":\"GUADALAJARA TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"717\", \"parent\":\"592\", \"nivel\":\"3\", \"text\":\"GUADALUPE TEPEYAC\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1398\", \"parent\":\"1363\", \"nivel\":\"3\", \"text\":\"GUANAJUATO TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1149\", \"parent\":\"1139\", \"nivel\":\"3\", \"text\":\"HIDALGO DEL PARRAL TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1551\", \"parent\":\"1503\", \"nivel\":\"3\", \"text\":\"HUACHINANGO TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1552\", \"parent\":\"1504\", \"nivel\":\"3\", \"text\":\"HUAJUAPAN DE LEON TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1553\", \"parent\":\"1505\", \"nivel\":\"3\", \"text\":\"HUATULCO TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1711\", \"parent\":\"1687\", \"nivel\":\"3\", \"text\":\"HUIXTLA TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1554\", \"parent\":\"1506\", \"nivel\":\"3\", \"text\":\"IGUALA TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"570\", \"parent\":\"435\", \"nivel\":\"3\", \"text\":\"IRAPUATO\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1399\", \"parent\":\"1364\", \"nivel\":\"3\", \"text\":\"IRAPUATO TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1712\", \"parent\":\"1688\", \"nivel\":\"3\", \"text\":\"ISLA MUJERES TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1400\", \"parent\":\"1365\", \"nivel\":\"3\", \"text\":\"IXMIQUILPAN TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1785\", \"parent\":\"1774\", \"nivel\":\"3\", \"text\":\"IXTAPAN DE LA SAL TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1786\", \"parent\":\"1775\", \"nivel\":\"3\", \"text\":\"IXTLAHUACA DE RAYON TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1264\", \"parent\":\"1231\", \"nivel\":\"3\", \"text\":\"IXTLAN DEL RIO TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"707\", \"parent\":\"592\", \"nivel\":\"3\", \"text\":\"IZTAPALAPA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1555\", \"parent\":\"1507\", \"nivel\":\"3\", \"text\":\"IZUCAR DE MATAMOROS TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1150\", \"parent\":\"1140\", \"nivel\":\"3\", \"text\":\"JIMENEZ TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1703\", \"parent\":\"1679\", \"nivel\":\"3\", \"text\":\"CHAMPOTON TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1260\", \"parent\":\"1227\", \"nivel\":\"3\", \"text\":\"CHAPALA TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"692\", \"parent\":\"125\", \"nivel\":\"3\", \"text\":\"CHAPULTEPEC\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1704\", \"parent\":\"1680\", \"nivel\":\"3\", \"text\":\"CHETUMAL TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"19\", \"parent\":\"18\", \"nivel\":\"3\", \"text\":\"CHIHUAHUA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1144\", \"parent\":\"1134\", \"nivel\":\"3\", \"text\":\"CHIHUAHUA TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1542\", \"parent\":\"1494\", \"nivel\":\"3\", \"text\":\"CHILAPA DE ALVAREZ TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1543\", \"parent\":\"1495\", \"nivel\":\"3\", \"text\":\"CHILPANCINGO TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1787\", \"parent\":\"1776\", \"nivel\":\"3\", \"text\":\"CIUDAD DE MEXICO TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1705\", \"parent\":\"1681\", \"nivel\":\"3\", \"text\":\"CIUDAD DEL CARMEN TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1261\", \"parent\":\"1228\", \"nivel\":\"3\", \"text\":\"CIUDAD GUZMAN TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"29\", \"parent\":\"28\", \"nivel\":\"3\", \"text\":\"CIUDAD JUAREZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1145\", \"parent\":\"1135\", \"nivel\":\"3\", \"text\":\"CIUDAD JUAREZ TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1393\", \"parent\":\"1358\", \"nivel\":\"3\", \"text\":\"CIUDAD MANTE TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1394\", \"parent\":\"1359\", \"nivel\":\"3\", \"text\":\"CIUDAD VALLES TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1185\", \"parent\":\"1172\", \"nivel\":\"3\", \"text\":\"CIUDAD VICTORIA TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"702\", \"parent\":\"592\", \"nivel\":\"3\", \"text\":\"COACALCO\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1544\", \"parent\":\"1496\", \"nivel\":\"3\", \"text\":\"COATEPEC TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1033\", \"parent\":\"1032\", \"nivel\":\"3\", \"text\":\"COATZA/MINA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1545\", \"parent\":\"1497\", \"nivel\":\"3\", \"text\":\"COATZACOALCOS TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"775\", \"parent\":\"592\", \"nivel\":\"3\", \"text\":\"COBERTURA TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1262\", \"parent\":\"1229\", \"nivel\":\"3\", \"text\":\"COLIMA TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"688\", \"parent\":\"125\", \"nivel\":\"3\", \"text\":\"COLOMOS\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1706\", \"parent\":\"1682\", \"nivel\":\"3\", \"text\":\"COMALCALCO TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1395\", \"parent\":\"1360\", \"nivel\":\"3\", \"text\":\"COMONFORT TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"710\", \"parent\":\"592\", \"nivel\":\"3\", \"text\":\"CONDESA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"725\", \"parent\":\"592\", \"nivel\":\"3\", \"text\":\"CONSTITUCION\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1546\", \"parent\":\"1498\", \"nivel\":\"3\", \"text\":\"CORDOBA TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1028\", \"parent\":\"1027\", \"nivel\":\"3\", \"text\":\"CORDOBA/ORIZABA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1547\", \"parent\":\"1499\", \"nivel\":\"3\", \"text\":\"COSAMALOAPAN TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1707\", \"parent\":\"1683\", \"nivel\":\"3\", \"text\":\"COZUMEL TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1548\", \"parent\":\"1500\", \"nivel\":\"3\", \"text\":\"CRUCECITA TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1146\", \"parent\":\"1136\", \"nivel\":\"3\", \"text\":\"CUAHUTEMOC TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1387\", \"parent\":\"1352\", \"nivel\":\"3\", \"text\":\"ABASOLO TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1388\", \"parent\":\"1353\", \"nivel\":\"3\", \"text\":\"ACAMBARO TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1255\", \"parent\":\"1222\", \"nivel\":\"3\", \"text\":\"ACAPONETA TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1535\", \"parent\":\"1487\", \"nivel\":\"3\", \"text\":\"ACAPULCO TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1536\", \"parent\":\"1488\", \"nivel\":\"3\", \"text\":\"ACAYUCAN TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1537\", \"parent\":\"1489\", \"nivel\":\"3\", \"text\":\"ACTOPAN TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1184\", \"parent\":\"1171\", \"nivel\":\"3\", \"text\":\"ACUNA TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"706\", \"parent\":\"592\", \"nivel\":\"3\", \"text\":\"AEROPUERTO\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"75\", \"parent\":\"74\", \"nivel\":\"3\", \"text\":\"AGUASCALIENTES\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1389\", \"parent\":\"1354\", \"nivel\":\"3\", \"text\":\"AGUASCALIENTES TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1538\", \"parent\":\"1490\", \"nivel\":\"3\", \"text\":\"ALVARADO TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1782\", \"parent\":\"1771\", \"nivel\":\"3\", \"text\":\"APAN TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1390\", \"parent\":\"1355\", \"nivel\":\"3\", \"text\":\"APASEO EL ALTO TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1256\", \"parent\":\"1223\", \"nivel\":\"3\", \"text\":\"APATZINGAN TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1539\", \"parent\":\"1491\", \"nivel\":\"3\", \"text\":\"APIZACO TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"705\", \"parent\":\"592\", \"nivel\":\"3\", \"text\":\"ARAGON\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1257\", \"parent\":\"1224\", \"nivel\":\"3\", \"text\":\"ARANDAS TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1783\", \"parent\":\"1772\", \"nivel\":\"3\", \"text\":\"ATLACOMULCO TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1540\", \"parent\":\"1492\", \"nivel\":\"3\", \"text\":\"ATLIXCO TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1258\", \"parent\":\"1225\", \"nivel\":\"3\", \"text\":\"AUTLAN DE NAVARRO TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"719\", \"parent\":\"592\", \"nivel\":\"3\", \"text\":\"AZCAPOTZALCO\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1259\", \"parent\":\"1226\", \"nivel\":\"3\", \"text\":\"BAHIA DE BANDERAS TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"690\", \"parent\":\"125\", \"nivel\":\"3\", \"text\":\"BARRANCA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1699\", \"parent\":\"1675\", \"nivel\":\"3\", \"text\":\"CALDERITAS TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1391\", \"parent\":\"1356\", \"nivel\":\"3\", \"text\":\"CALVILLO TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1143\", \"parent\":\"1133\", \"nivel\":\"3\", \"text\":\"CAMARGO TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1700\", \"parent\":\"1676\", \"nivel\":\"3\", \"text\":\"CAMPECHE TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"209\", \"parent\":\"208\", \"nivel\":\"3\", \"text\":\"CANCUN\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1701\", \"parent\":\"1677\", \"nivel\":\"3\", \"text\":\"CANCUN TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1541\", \"parent\":\"1493\", \"nivel\":\"3\", \"text\":\"CARDEL TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1702\", \"parent\":\"1678\", \"nivel\":\"3\", \"text\":\"CARDENAS-TABASCO TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"84\", \"parent\":\"83\", \"nivel\":\"3\", \"text\":\"CELAYA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1392\", \"parent\":\"1357\", \"nivel\":\"3\", \"text\":\"CELAYA TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"910\", \"parent\":\"166\", \"nivel\":\"4\", \"text\":\"CENTRO\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"167\", \"parent\":\"166\", \"nivel\":\"4\", \"text\":\"NORTE\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"171\", \"parent\":\"166\", \"nivel\":\"4\", \"text\":\"SUR\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"5\", \"parent\":\"4\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"20\", \"parent\":\"19\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"30\", \"parent\":\"29\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"76\", \"parent\":\"75\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"85\", \"parent\":\"84\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"94\", \"parent\":\"93\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"106\", \"parent\":\"105\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"116\", \"parent\":\"115\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"158\", \"parent\":\"157\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"177\", \"parent\":\"176\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"192\", \"parent\":\"191\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"200\", \"parent\":\"199\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"210\", \"parent\":\"209\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"218\", \"parent\":\"217\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"288\", \"parent\":\"597\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"379\", \"parent\":\"598\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"683\", \"parent\":\"678\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"684\", \"parent\":\"679\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"685\", \"parent\":\"680\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"686\", \"parent\":\"681\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"687\", \"parent\":\"682\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"695\", \"parent\":\"688\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"696\", \"parent\":\"689\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"697\", \"parent\":\"690\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"698\", \"parent\":\"691\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"699\", \"parent\":\"692\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"700\", \"parent\":\"693\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"701\", \"parent\":\"694\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"726\", \"parent\":\"702\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"727\", \"parent\":\"703\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"728\", \"parent\":\"704\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"729\", \"parent\":\"705\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"730\", \"parent\":\"706\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"731\", \"parent\":\"707\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"732\", \"parent\":\"708\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"733\", \"parent\":\"709\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"734\", \"parent\":\"710\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"736\", \"parent\":\"712\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"737\", \"parent\":\"713\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"738\", \"parent\":\"714\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"739\", \"parent\":\"715\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"740\", \"parent\":\"716\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"741\", \"parent\":\"717\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"742\", \"parent\":\"718\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"743\", \"parent\":\"719\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"744\", \"parent\":\"720\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"745\", \"parent\":\"721\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"746\", \"parent\":\"722\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"747\", \"parent\":\"723\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"748\", \"parent\":\"724\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"749\", \"parent\":\"725\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"776\", \"parent\":\"775\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"899\", \"parent\":\"898\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"973\", \"parent\":\"568\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"978\", \"parent\":\"575\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"994\", \"parent\":\"570\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"999\", \"parent\":\"851\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1024\", \"parent\":\"1023\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1029\", \"parent\":\"1028\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1034\", \"parent\":\"1033\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1060\", \"parent\":\"1053\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1061\", \"parent\":\"1054\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1062\", \"parent\":\"1055\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1063\", \"parent\":\"1056\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1064\", \"parent\":\"1057\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1065\", \"parent\":\"1058\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1066\", \"parent\":\"1059\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1103\", \"parent\":\"1088\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1104\", \"parent\":\"1089\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1105\", \"parent\":\"1090\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1106\", \"parent\":\"1091\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1107\", \"parent\":\"1092\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1108\", \"parent\":\"1093\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1109\", \"parent\":\"1094\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1110\", \"parent\":\"1095\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1111\", \"parent\":\"1096\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1112\", \"parent\":\"1097\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1113\", \"parent\":\"1098\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1114\", \"parent\":\"1099\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1115\", \"parent\":\"1100\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1116\", \"parent\":\"1101\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1117\", \"parent\":\"1102\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1153\", \"parent\":\"1143\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1154\", \"parent\":\"1144\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1155\", \"parent\":\"1145\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1156\", \"parent\":\"1146\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1157\", \"parent\":\"1147\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1158\", \"parent\":\"1148\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1159\", \"parent\":\"1149\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1160\", \"parent\":\"1150\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1161\", \"parent\":\"1151\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1162\", \"parent\":\"1152\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1197\", \"parent\":\"1184\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1198\", \"parent\":\"1185\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1199\", \"parent\":\"1186\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1200\", \"parent\":\"1187\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1201\", \"parent\":\"1188\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1202\", \"parent\":\"1189\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1203\", \"parent\":\"1190\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1204\", \"parent\":\"1191\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1205\", \"parent\":\"1192\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1206\", \"parent\":\"1193\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1207\", \"parent\":\"1194\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1208\", \"parent\":\"1195\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1209\", \"parent\":\"1196\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1288\", \"parent\":\"1255\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1289\", \"parent\":\"1256\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1290\", \"parent\":\"1257\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1291\", \"parent\":\"1258\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1292\", \"parent\":\"1259\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1293\", \"parent\":\"1260\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1294\", \"parent\":\"1261\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1295\", \"parent\":\"1262\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1296\", \"parent\":\"1263\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1297\", \"parent\":\"1264\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1298\", \"parent\":\"1265\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1299\", \"parent\":\"1266\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1300\", \"parent\":\"1267\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1301\", \"parent\":\"1268\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1302\", \"parent\":\"1269\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1303\", \"parent\":\"1270\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1304\", \"parent\":\"1271\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1305\", \"parent\":\"1272\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1306\", \"parent\":\"1273\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1307\", \"parent\":\"1274\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1308\", \"parent\":\"1275\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1309\", \"parent\":\"1276\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1310\", \"parent\":\"1277\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1311\", \"parent\":\"1278\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1312\", \"parent\":\"1279\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1313\", \"parent\":\"1280\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1314\", \"parent\":\"1281\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1315\", \"parent\":\"1282\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1316\", \"parent\":\"1283\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1317\", \"parent\":\"1284\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1318\", \"parent\":\"1285\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1319\", \"parent\":\"1286\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1320\", \"parent\":\"1287\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1422\", \"parent\":\"1387\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1423\", \"parent\":\"1388\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1424\", \"parent\":\"1389\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1425\", \"parent\":\"1390\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1426\", \"parent\":\"1391\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1427\", \"parent\":\"1392\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1428\", \"parent\":\"1393\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1429\", \"parent\":\"1394\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1430\", \"parent\":\"1395\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1431\", \"parent\":\"1396\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1432\", \"parent\":\"1397\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1433\", \"parent\":\"1398\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1434\", \"parent\":\"1399\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1435\", \"parent\":\"1400\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1436\", \"parent\":\"1401\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1437\", \"parent\":\"1402\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1438\", \"parent\":\"1403\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1439\", \"parent\":\"1404\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1440\", \"parent\":\"1405\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1441\", \"parent\":\"1406\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1442\", \"parent\":\"1407\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1443\", \"parent\":\"1408\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1444\", \"parent\":\"1409\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1445\", \"parent\":\"1410\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1446\", \"parent\":\"1411\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1447\", \"parent\":\"1412\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1448\", \"parent\":\"1413\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1449\", \"parent\":\"1414\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1450\", \"parent\":\"1415\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1451\", \"parent\":\"1416\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1452\", \"parent\":\"1417\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1453\", \"parent\":\"1418\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1454\", \"parent\":\"1419\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1455\", \"parent\":\"1420\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1456\", \"parent\":\"1421\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1583\", \"parent\":\"1535\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1584\", \"parent\":\"1536\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1585\", \"parent\":\"1537\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1586\", \"parent\":\"1538\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1587\", \"parent\":\"1539\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1588\", \"parent\":\"1540\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1589\", \"parent\":\"1541\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1590\", \"parent\":\"1542\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1591\", \"parent\":\"1543\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1592\", \"parent\":\"1544\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1593\", \"parent\":\"1545\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1594\", \"parent\":\"1546\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1595\", \"parent\":\"1547\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1596\", \"parent\":\"1548\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1597\", \"parent\":\"1549\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1598\", \"parent\":\"1550\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1599\", \"parent\":\"1551\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1600\", \"parent\":\"1552\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1601\", \"parent\":\"1553\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1602\", \"parent\":\"1554\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1603\", \"parent\":\"1555\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1604\", \"parent\":\"1556\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1605\", \"parent\":\"1557\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1606\", \"parent\":\"1558\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1607\", \"parent\":\"1559\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1608\", \"parent\":\"1560\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1609\", \"parent\":\"1561\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1610\", \"parent\":\"1562\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1611\", \"parent\":\"1563\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1612\", \"parent\":\"1564\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1613\", \"parent\":\"1565\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1614\", \"parent\":\"1566\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1615\", \"parent\":\"1567\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1616\", \"parent\":\"1568\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1617\", \"parent\":\"1569\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1618\", \"parent\":\"1570\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1619\", \"parent\":\"1571\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1620\", \"parent\":\"1572\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1621\", \"parent\":\"1573\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1622\", \"parent\":\"1574\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1623\", \"parent\":\"1575\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1624\", \"parent\":\"1576\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1625\", \"parent\":\"1577\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1626\", \"parent\":\"1578\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1627\", \"parent\":\"1579\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1628\", \"parent\":\"1580\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1629\", \"parent\":\"1581\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1630\", \"parent\":\"1582\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1723\", \"parent\":\"1699\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1724\", \"parent\":\"1700\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1725\", \"parent\":\"1701\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1726\", \"parent\":\"1702\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1727\", \"parent\":\"1703\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1728\", \"parent\":\"1704\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1729\", \"parent\":\"1705\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1730\", \"parent\":\"1706\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1731\", \"parent\":\"1707\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1732\", \"parent\":\"1708\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1733\", \"parent\":\"1709\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1734\", \"parent\":\"1710\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1735\", \"parent\":\"1711\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1736\", \"parent\":\"1712\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1737\", \"parent\":\"1713\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1738\", \"parent\":\"1714\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1739\", \"parent\":\"1715\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1740\", \"parent\":\"1716\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1741\", \"parent\":\"1717\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1742\", \"parent\":\"1718\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1743\", \"parent\":\"1719\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1744\", \"parent\":\"1720\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1745\", \"parent\":\"1721\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1746\", \"parent\":\"1722\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1793\", \"parent\":\"1782\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1794\", \"parent\":\"1783\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1795\", \"parent\":\"1784\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1796\", \"parent\":\"1785\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1797\", \"parent\":\"1786\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1798\", \"parent\":\"1787\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1799\", \"parent\":\"1788\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1800\", \"parent\":\"1789\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1801\", \"parent\":\"1790\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1802\", \"parent\":\"1791\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1803\", \"parent\":\"1792\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1944\", \"parent\":\"1943\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1948\", \"parent\":\"1947\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"2120\", \"parent\":\"2119\", \"nivel\":\"4\", \"text\":\"SZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"971\", \"parent\":\"970\", \"nivel\":\"4\", \"text\":\"ZONA TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"671\", \"parent\":\"5\", \"nivel\":\"5\", \"text\":\"ZAPATA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"134\", \"parent\":\"695\", \"nivel\":\"5\", \"text\":\"ZAPOPAN\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"60\", \"parent\":\"685\", \"nivel\":\"5\", \"text\":\"ZERTUCHE\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"650\", \"parent\":\"288\", \"nivel\":\"5\", \"text\":\"ZINACANTEPEC\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"375\", \"parent\":\"744\", \"nivel\":\"5\", \"text\":\"ZOMEYUCAN\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1663\", \"parent\":\"1617\", \"nivel\":\"5\", \"text\":\"TX TECAMACHALCO\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1072\", \"parent\":\"1065\", \"nivel\":\"5\", \"text\":\"TX TECATE\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1345\", \"parent\":\"1314\", \"nivel\":\"5\", \"text\":\"TX TECOMAN\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1664\", \"parent\":\"1618\", \"nivel\":\"5\", \"text\":\"TX TEHUACAN\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1810\", \"parent\":\"1801\", \"nivel\":\"5\", \"text\":\"TX TENANCINGO DE DEGOLLADO\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1346\", \"parent\":\"1315\", \"nivel\":\"5\", \"text\":\"TX TEPATITLAN\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1479\", \"parent\":\"1449\", \"nivel\":\"5\", \"text\":\"TX TEPEJI DEL RIO\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1347\", \"parent\":\"1316\", \"nivel\":\"5\", \"text\":\"TX TEPIC\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1348\", \"parent\":\"1317\", \"nivel\":\"5\", \"text\":\"TX TEQUILA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1480\", \"parent\":\"1450\", \"nivel\":\"5\", \"text\":\"TX TEQUISQUIAPAN\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1665\", \"parent\":\"1619\", \"nivel\":\"5\", \"text\":\"TX TEXMELUCAN\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1666\", \"parent\":\"1620\", \"nivel\":\"5\", \"text\":\"TX TEZIUTLAN\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1667\", \"parent\":\"1621\", \"nivel\":\"5\", \"text\":\"TX TIERRA BLANCA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"922\", \"parent\":\"1066\", \"nivel\":\"5\", \"text\":\"TX TIJUANA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1668\", \"parent\":\"1622\", \"nivel\":\"5\", \"text\":\"TX TLAXCALA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1481\", \"parent\":\"1451\", \"nivel\":\"5\", \"text\":\"TX TLAXCOAPAN\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"964\", \"parent\":\"1802\", \"nivel\":\"5\", \"text\":\"TX TOLUCA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1170\", \"parent\":\"1162\", \"nivel\":\"5\", \"text\":\"TX TORREON\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1669\", \"parent\":\"1623\", \"nivel\":\"5\", \"text\":\"TX TRES MARIAS\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1482\", \"parent\":\"1452\", \"nivel\":\"5\", \"text\":\"TX TULA DE ALLENDE\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1765\", \"parent\":\"1743\", \"nivel\":\"5\", \"text\":\"TX TULUM\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1670\", \"parent\":\"1624\", \"nivel\":\"5\", \"text\":\"TX TUXPAN\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1349\", \"parent\":\"1318\", \"nivel\":\"5\", \"text\":\"TX TUXPAN (NAYARIT)\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1671\", \"parent\":\"1625\", \"nivel\":\"5\", \"text\":\"TX TUXTEPEC\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1766\", \"parent\":\"1744\", \"nivel\":\"5\", \"text\":\"TX TUXTLA GUTIERREZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1350\", \"parent\":\"1319\", \"nivel\":\"5\", \"text\":\"TX URUAPAN\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1767\", \"parent\":\"1745\", \"nivel\":\"5\", \"text\":\"TX VALLADOLID\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1811\", \"parent\":\"1803\", \"nivel\":\"5\", \"text\":\"TX VALLE DE BRAVO\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1483\", \"parent\":\"1453\", \"nivel\":\"5\", \"text\":\"TX VALLE DE SANTIAGO\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"952\", \"parent\":\"1626\", \"nivel\":\"5\", \"text\":\"TX VERACRUZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1484\", \"parent\":\"1454\", \"nivel\":\"5\", \"text\":\"TX VICTOR ROSALES\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1768\", \"parent\":\"1746\", \"nivel\":\"5\", \"text\":\"TX VILLAHERMOSA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"955\", \"parent\":\"1627\", \"nivel\":\"5\", \"text\":\"TX XALAPA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1673\", \"parent\":\"1629\", \"nivel\":\"5\", \"text\":\"TX YAUTEPEC\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1485\", \"parent\":\"1455\", \"nivel\":\"5\", \"text\":\"TX ZACATECAS\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1674\", \"parent\":\"1630\", \"nivel\":\"5\", \"text\":\"TX ZACATEPEC DE HIDALGO\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1351\", \"parent\":\"1320\", \"nivel\":\"5\", \"text\":\"TX ZAMORA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1672\", \"parent\":\"1628\", \"nivel\":\"5\", \"text\":\"TX ZIHUATANEJO\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"186\", \"parent\":\"177\", \"nivel\":\"5\", \"text\":\"UDLA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"647\", \"parent\":\"683\", \"nivel\":\"5\", \"text\":\"UNIVERSIDAD\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"154\", \"parent\":\"701\", \"nivel\":\"5\", \"text\":\"VALLARTA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1000\", \"parent\":\"999\", \"nivel\":\"5\", \"text\":\"VALLE DE BRAVO\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"71\", \"parent\":\"684\", \"nivel\":\"5\", \"text\":\"VALLE DE HUAJUCO\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"59\", \"parent\":\"686\", \"nivel\":\"5\", \"text\":\"VALLE DE HUINALA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"606\", \"parent\":\"695\", \"nivel\":\"5\", \"text\":\"VALLE DE LOS MOLINOS\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"348\", \"parent\":\"742\", \"nivel\":\"5\", \"text\":\"VALLE DORADO\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1018\", \"parent\":\"5\", \"nivel\":\"5\", \"text\":\"VALLE VERDE\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"367\", \"parent\":\"741\", \"nivel\":\"5\", \"text\":\"VALLEJO\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"187\", \"parent\":\"1945\", \"nivel\":\"5\", \"text\":\"VALSEQUILLO\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"975\", \"parent\":\"973\", \"nivel\":\"5\", \"text\":\"VENUSTIANO CARRANZA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"242\", \"parent\":\"736\", \"nivel\":\"5\", \"text\":\"VERTIZ NARVARTE\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"304\", \"parent\":\"726\", \"nivel\":\"5\", \"text\":\"VILLA DE LAS FLORES\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"759\", \"parent\":\"94\", \"nivel\":\"5\", \"text\":\"VILLA DEL CARMEN\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"27\", \"parent\":\"20\", \"nivel\":\"5\", \"text\":\"VILLA JUAREZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"72\", \"parent\":\"683\", \"nivel\":\"5\", \"text\":\"VILLA MITRAS\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"608\", \"parent\":\"695\", \"nivel\":\"5\", \"text\":\"VILLA VERONA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"668\", \"parent\":\"76\", \"nivel\":\"5\", \"text\":\"VILLAS\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"383\", \"parent\":\"379\", \"nivel\":\"5\", \"text\":\"VILLAS DEL ALAMO\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"253\", \"parent\":\"733\", \"nivel\":\"5\", \"text\":\"VISTA HERMOSA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"651\", \"parent\":\"748\", \"nivel\":\"5\", \"text\":\"XOCHIACA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"285\", \"parent\":\"740\", \"nivel\":\"5\", \"text\":\"XOCHIMILCO\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"760\", \"parent\":\"171\", \"nivel\":\"5\", \"text\":\"XOCHITEPEC\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"368\", \"parent\":\"741\", \"nivel\":\"5\", \"text\":\"ZACATENCO\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"610\", \"parent\":\"697\", \"nivel\":\"5\", \"text\":\"ZALATE II\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1338\", \"parent\":\"1306\", \"nivel\":\"5\", \"text\":\"TX MANZANILLO\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1651\", \"parent\":\"1604\", \"nivel\":\"5\", \"text\":\"TX MARTINEZ DE LA TORRE\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1213\", \"parent\":\"1200\", \"nivel\":\"5\", \"text\":\"TX MATAMOROS\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1471\", \"parent\":\"1439\", \"nivel\":\"5\", \"text\":\"TX MATEHUALA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1127\", \"parent\":\"1112\", \"nivel\":\"5\", \"text\":\"TX MAZATLAN\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"961\", \"parent\":\"1738\", \"nivel\":\"5\", \"text\":\"TX MERIDA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1068\", \"parent\":\"1061\", \"nivel\":\"5\", \"text\":\"TX MEXICALI\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1652\", \"parent\":\"1605\", \"nivel\":\"5\", \"text\":\"TX MINATITLAN\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1214\", \"parent\":\"1201\", \"nivel\":\"5\", \"text\":\"TX MONCLOVA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1215\", \"parent\":\"1202\", \"nivel\":\"5\", \"text\":\"TX MONTEMORELOS\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"916\", \"parent\":\"1203\", \"nivel\":\"5\", \"text\":\"TX MONTERREY\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"943\", \"parent\":\"1307\", \"nivel\":\"5\", \"text\":\"TX MORELIA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1339\", \"parent\":\"1308\", \"nivel\":\"5\", \"text\":\"TX MOROLEON\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1653\", \"parent\":\"1606\", \"nivel\":\"5\", \"text\":\"TX NAOLINCO\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1128\", \"parent\":\"1113\", \"nivel\":\"5\", \"text\":\"TX NAVOJOA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1129\", \"parent\":\"1114\", \"nivel\":\"5\", \"text\":\"TX NOGALES\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"778\", \"parent\":\"1787\", \"nivel\":\"5\", \"text\":\"TX NORTE\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"993\", \"parent\":\"1798\", \"nivel\":\"5\", \"text\":\"TX NORTE 2\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1216\", \"parent\":\"1204\", \"nivel\":\"5\", \"text\":\"TX NUEVO LAREDO\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1654\", \"parent\":\"1607\", \"nivel\":\"5\", \"text\":\"TX OAXACA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1340\", \"parent\":\"1309\", \"nivel\":\"5\", \"text\":\"TX OCOTLAN\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"779\", \"parent\":\"1787\", \"nivel\":\"5\", \"text\":\"TX ORIENTE\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1655\", \"parent\":\"1608\", \"nivel\":\"5\", \"text\":\"TX ORIZABA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"967\", \"parent\":\"1799\", \"nivel\":\"5\", \"text\":\"TX PACHUCA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1069\", \"parent\":\"1062\", \"nivel\":\"5\", \"text\":\"TX PALM VALLEY-TIJUANA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1341\", \"parent\":\"1310\", \"nivel\":\"5\", \"text\":\"TX PAZCUARO\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1472\", \"parent\":\"1440\", \"nivel\":\"5\", \"text\":\"TX PEDRO ESCOBEDO\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1473\", \"parent\":\"1441\", \"nivel\":\"5\", \"text\":\"TX PENJAMO\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1656\", \"parent\":\"1609\", \"nivel\":\"5\", \"text\":\"TX PEROTE\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1217\", \"parent\":\"1205\", \"nivel\":\"5\", \"text\":\"TX PIEDRAS NEGRAS\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1657\", \"parent\":\"1610\", \"nivel\":\"5\", \"text\":\"TX PINOTEPA NACIONAL\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1130\", \"parent\":\"1115\", \"nivel\":\"5\", \"text\":\"TX PLAYA ENCANTO\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1812\", \"parent\":\"1798\", \"nivel\":\"5\", \"text\":\"TX PONIENTE\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1761\", \"parent\":\"1739\", \"nivel\":\"5\", \"text\":\"TX PORT CHIAPAS-CHIAPAS\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1658\", \"parent\":\"1611\", \"nivel\":\"5\", \"text\":\"TX POZA RICA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1342\", \"parent\":\"1311\", \"nivel\":\"5\", \"text\":\"TX PROGRESO\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"949\", \"parent\":\"1612\", \"nivel\":\"5\", \"text\":\"TX PUEBLA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1070\", \"parent\":\"1063\", \"nivel\":\"5\", \"text\":\"TX PUERTO PENASCO\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1343\", \"parent\":\"1312\", \"nivel\":\"5\", \"text\":\"TX PUERTO VALLARTA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"940\", \"parent\":\"1442\", \"nivel\":\"5\", \"text\":\"TX QUERETARO\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1218\", \"parent\":\"1206\", \"nivel\":\"5\", \"text\":\"TX REYNOSA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1071\", \"parent\":\"1064\", \"nivel\":\"5\", \"text\":\"TX ROSARITO\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1219\", \"parent\":\"1207\", \"nivel\":\"5\", \"text\":\"TX SABINAS\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1474\", \"parent\":\"1443\", \"nivel\":\"5\", \"text\":\"TX SALAMANCA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1659\", \"parent\":\"1613\", \"nivel\":\"5\", \"text\":\"TX SALINA CRUZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1220\", \"parent\":\"1208\", \"nivel\":\"5\", \"text\":\"TX SALTILLO\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1660\", \"parent\":\"1614\", \"nivel\":\"5\", \"text\":\"TX SAN ANDRES TUXTLA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1762\", \"parent\":\"1740\", \"nivel\":\"5\", \"text\":\"TX SAN CRISTOBAL DE LAS CASAS\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1131\", \"parent\":\"1116\", \"nivel\":\"5\", \"text\":\"TX SAN JOSE DEL CABO\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1809\", \"parent\":\"1800\", \"nivel\":\"5\", \"text\":\"TX SAN JUAN DE TEOTIHUACAN\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1475\", \"parent\":\"1444\", \"nivel\":\"5\", \"text\":\"TX SAN JUAN DEL RIO\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1476\", \"parent\":\"1445\", \"nivel\":\"5\", \"text\":\"TX SAN LUIS DE LA PAZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"919\", \"parent\":\"1446\", \"nivel\":\"5\", \"text\":\"TX SAN LUIS POTOSI\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1132\", \"parent\":\"1117\", \"nivel\":\"5\", \"text\":\"TX SAN LUIS RIO COLORADO\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1477\", \"parent\":\"1447\", \"nivel\":\"5\", \"text\":\"TX SAN MIGUEL ALLENDE\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1661\", \"parent\":\"1615\", \"nivel\":\"5\", \"text\":\"TX SAN PEDRO POCHUTLA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1486\", \"parent\":\"1456\", \"nivel\":\"5\", \"text\":\"TX SANTIAGO\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1478\", \"parent\":\"1448\", \"nivel\":\"5\", \"text\":\"TX SILAO\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"780\", \"parent\":\"1787\", \"nivel\":\"5\", \"text\":\"TX SUR\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1344\", \"parent\":\"1313\", \"nivel\":\"5\", \"text\":\"TX TALA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1221\", \"parent\":\"1209\", \"nivel\":\"5\", \"text\":\"TX TAMPICO\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1763\", \"parent\":\"1741\", \"nivel\":\"5\", \"text\":\"TX TAPACHULA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1662\", \"parent\":\"1616\", \"nivel\":\"5\", \"text\":\"TX TAXCO\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1764\", \"parent\":\"1742\", \"nivel\":\"5\", \"text\":\"TX TEAPA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1327\", \"parent\":\"1294\", \"nivel\":\"5\", \"text\":\"TX CIUDAD GUZMAN\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"928\", \"parent\":\"1155\", \"nivel\":\"5\", \"text\":\"TX CIUDAD JUAREZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1461\", \"parent\":\"1428\", \"nivel\":\"5\", \"text\":\"TX CIUDAD MANTE\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1119\", \"parent\":\"1104\", \"nivel\":\"5\", \"text\":\"TX CIUDAD OBREGON\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1462\", \"parent\":\"1429\", \"nivel\":\"5\", \"text\":\"TX CIUDAD VALLES\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1211\", \"parent\":\"1198\", \"nivel\":\"5\", \"text\":\"TX CIUDAD VICTORIA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1640\", \"parent\":\"1592\", \"nivel\":\"5\", \"text\":\"TX COATEPEC\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1641\", \"parent\":\"1593\", \"nivel\":\"5\", \"text\":\"TX COATZACOALCOS\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1328\", \"parent\":\"1295\", \"nivel\":\"5\", \"text\":\"TX COLIMA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1753\", \"parent\":\"1730\", \"nivel\":\"5\", \"text\":\"TX COMALCALCO\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1463\", \"parent\":\"1430\", \"nivel\":\"5\", \"text\":\"TX COMONFORT\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1642\", \"parent\":\"1594\", \"nivel\":\"5\", \"text\":\"TX CORDOBA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1643\", \"parent\":\"1595\", \"nivel\":\"5\", \"text\":\"TX COSAMALOAPAN\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1754\", \"parent\":\"1731\", \"nivel\":\"5\", \"text\":\"TX COZUMEL\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1644\", \"parent\":\"1596\", \"nivel\":\"5\", \"text\":\"TX CRUCECITA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1164\", \"parent\":\"1156\", \"nivel\":\"5\", \"text\":\"TX CUAHUTEMOC\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1645\", \"parent\":\"1597\", \"nivel\":\"5\", \"text\":\"TX CUAUTLA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"946\", \"parent\":\"1598\", \"nivel\":\"5\", \"text\":\"TX CUERNAVACA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1120\", \"parent\":\"1105\", \"nivel\":\"5\", \"text\":\"TX CULIACAN\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1165\", \"parent\":\"1157\", \"nivel\":\"5\", \"text\":\"TX DELICIAS\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1464\", \"parent\":\"1431\", \"nivel\":\"5\", \"text\":\"TX DOLORES HIDALGO\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1806\", \"parent\":\"1795\", \"nivel\":\"5\", \"text\":\"TX DONATO GUERRA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1166\", \"parent\":\"1158\", \"nivel\":\"5\", \"text\":\"TX DURANGO\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1755\", \"parent\":\"1732\", \"nivel\":\"5\", \"text\":\"TX EL PARAISO-TABASCO\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1067\", \"parent\":\"1060\", \"nivel\":\"5\", \"text\":\"TX ENSENADA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1756\", \"parent\":\"1733\", \"nivel\":\"5\", \"text\":\"TX ESCARCEGA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1465\", \"parent\":\"1432\", \"nivel\":\"5\", \"text\":\"TX FRESNILLO\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1757\", \"parent\":\"1734\", \"nivel\":\"5\", \"text\":\"TX FRONTERA HIDALGO\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"913\", \"parent\":\"1296\", \"nivel\":\"5\", \"text\":\"TX GUADALAJARA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1121\", \"parent\":\"1106\", \"nivel\":\"5\", \"text\":\"TX GUAMUCHIL\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1466\", \"parent\":\"1433\", \"nivel\":\"5\", \"text\":\"TX GUANAJUATO\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1122\", \"parent\":\"1107\", \"nivel\":\"5\", \"text\":\"TX GUASAVE\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1123\", \"parent\":\"1108\", \"nivel\":\"5\", \"text\":\"TX GUAYMAS\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1124\", \"parent\":\"1109\", \"nivel\":\"5\", \"text\":\"TX HERMOSILLO\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1167\", \"parent\":\"1159\", \"nivel\":\"5\", \"text\":\"TX HIDALGO DEL PARRAL\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1646\", \"parent\":\"1599\", \"nivel\":\"5\", \"text\":\"TX HUACHINANGO\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1647\", \"parent\":\"1600\", \"nivel\":\"5\", \"text\":\"TX HUAJUAPAN DE LEON\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1648\", \"parent\":\"1601\", \"nivel\":\"5\", \"text\":\"TX HUATULCO\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1758\", \"parent\":\"1735\", \"nivel\":\"5\", \"text\":\"TX HUIXTLA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1649\", \"parent\":\"1602\", \"nivel\":\"5\", \"text\":\"TX IGUALA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1467\", \"parent\":\"1434\", \"nivel\":\"5\", \"text\":\"TX IRAPUATO\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1759\", \"parent\":\"1736\", \"nivel\":\"5\", \"text\":\"TX ISLA MUJERES\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1468\", \"parent\":\"1435\", \"nivel\":\"5\", \"text\":\"TX IXMIQUILPAN\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1807\", \"parent\":\"1796\", \"nivel\":\"5\", \"text\":\"TX IXTAPAN DE LA SAL\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1808\", \"parent\":\"1797\", \"nivel\":\"5\", \"text\":\"TX IXTLAHUACA DE RAYON\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1329\", \"parent\":\"1297\", \"nivel\":\"5\", \"text\":\"TX IXTLAN DEL RIO\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1650\", \"parent\":\"1603\", \"nivel\":\"5\", \"text\":\"TX IZUCAR DE MATAMOROS\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1168\", \"parent\":\"1160\", \"nivel\":\"5\", \"text\":\"TX JIMENEZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1330\", \"parent\":\"1298\", \"nivel\":\"5\", \"text\":\"TX JUCHITAN\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1469\", \"parent\":\"1436\", \"nivel\":\"5\", \"text\":\"TX JUVENTINO ROSAS\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1331\", \"parent\":\"1299\", \"nivel\":\"5\", \"text\":\"TX LA BARCA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1125\", \"parent\":\"1110\", \"nivel\":\"5\", \"text\":\"TX LA PAZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1332\", \"parent\":\"1300\", \"nivel\":\"5\", \"text\":\"TX LA PIEDAD\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1333\", \"parent\":\"1301\", \"nivel\":\"5\", \"text\":\"TX LAGOS DE MORENO\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1334\", \"parent\":\"1302\", \"nivel\":\"5\", \"text\":\"TX LAGUNILLAS\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1470\", \"parent\":\"1437\", \"nivel\":\"5\", \"text\":\"TX LAS CHOAPAS-VERACRUZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1169\", \"parent\":\"1161\", \"nivel\":\"5\", \"text\":\"TX LAS CRUCES-CHIHUAHUA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1335\", \"parent\":\"1303\", \"nivel\":\"5\", \"text\":\"TX LAZARO CARDENAS\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"937\", \"parent\":\"1438\", \"nivel\":\"5\", \"text\":\"TX LEON\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1212\", \"parent\":\"1199\", \"nivel\":\"5\", \"text\":\"TX LINARES\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1336\", \"parent\":\"1304\", \"nivel\":\"5\", \"text\":\"TX LOMA BONITA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1126\", \"parent\":\"1111\", \"nivel\":\"5\", \"text\":\"TX LOS MOCHIS\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1337\", \"parent\":\"1305\", \"nivel\":\"5\", \"text\":\"TX LOS REYES DE SALGADO\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1760\", \"parent\":\"1737\", \"nivel\":\"5\", \"text\":\"TX MACUSPANA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"339\", \"parent\":\"747\", \"nivel\":\"5\", \"text\":\"TEPALCAPA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"284\", \"parent\":\"740\", \"nivel\":\"5\", \"text\":\"TEPEPAN\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"340\", \"parent\":\"745\", \"nivel\":\"5\", \"text\":\"TEPETLIXPAN\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"123\", \"parent\":\"116\", \"nivel\":\"5\", \"text\":\"TEPEYAC\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"648\", \"parent\":\"747\", \"nivel\":\"5\", \"text\":\"TEPOJACO\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"113\", \"parent\":\"106\", \"nivel\":\"5\", \"text\":\"TERRANOVA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"133\", \"parent\":\"695\", \"nivel\":\"5\", \"text\":\"TESISTAN\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"42\", \"parent\":\"30\", \"nivel\":\"5\", \"text\":\"THOMPSON\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"366\", \"parent\":\"741\", \"nivel\":\"5\", \"text\":\"TICOMAN\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"81\", \"parent\":\"76\", \"nivel\":\"5\", \"text\":\"TIERRA BUENA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"631\", \"parent\":\"30\", \"nivel\":\"5\", \"text\":\"TIERRA NUEVA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"609\", \"parent\":\"700\", \"nivel\":\"5\", \"text\":\"TLAJOMULCO DE ZUNIGA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"347\", \"parent\":\"742\", \"nivel\":\"5\", \"text\":\"TLALNEPANTLA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"142\", \"parent\":\"698\", \"nivel\":\"5\", \"text\":\"TLAQUEPAQUE\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"624\", \"parent\":\"698\", \"nivel\":\"5\", \"text\":\"TLAQUEPAQUE II\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"374\", \"parent\":\"744\", \"nivel\":\"5\", \"text\":\"TLATILCO\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"314\", \"parent\":\"729\", \"nivel\":\"5\", \"text\":\"TOLOTZIN\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"292\", \"parent\":\"288\", \"nivel\":\"5\", \"text\":\"TOLUCA 1 CENTRO\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"293\", \"parent\":\"288\", \"nivel\":\"5\", \"text\":\"TOLUCA CU\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"294\", \"parent\":\"288\", \"nivel\":\"5\", \"text\":\"TOLUCA SAN CARLOS\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"264\", \"parent\":\"737\", \"nivel\":\"5\", \"text\":\"TOLUCA-LEONES\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"143\", \"parent\":\"698\", \"nivel\":\"5\", \"text\":\"TONALA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"672\", \"parent\":\"683\", \"nivel\":\"5\", \"text\":\"TOPOCHICO\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"214\", \"parent\":\"210\", \"nivel\":\"5\", \"text\":\"TORREMOLINOS\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"290\", \"parent\":\"288\", \"nivel\":\"5\", \"text\":\"TOTOLTEPEC\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"621\", \"parent\":\"728\", \"nivel\":\"5\", \"text\":\"TULPETLAC\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"353\", \"parent\":\"746\", \"nivel\":\"5\", \"text\":\"TULTEPEC\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"354\", \"parent\":\"746\", \"nivel\":\"5\", \"text\":\"TULTITLAN\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1457\", \"parent\":\"1422\", \"nivel\":\"5\", \"text\":\"TX ABASOLO\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1458\", \"parent\":\"1423\", \"nivel\":\"5\", \"text\":\"TX ACAMBARO\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1321\", \"parent\":\"1288\", \"nivel\":\"5\", \"text\":\"TX ACAPONETA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1631\", \"parent\":\"1583\", \"nivel\":\"5\", \"text\":\"TX ACAPULCO\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1632\", \"parent\":\"1584\", \"nivel\":\"5\", \"text\":\"TX ACAYUCAN\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1633\", \"parent\":\"1585\", \"nivel\":\"5\", \"text\":\"TX ACTOPAN\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1210\", \"parent\":\"1197\", \"nivel\":\"5\", \"text\":\"TX ACUNA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"931\", \"parent\":\"1424\", \"nivel\":\"5\", \"text\":\"TX AGUASCALIENTES\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1634\", \"parent\":\"1586\", \"nivel\":\"5\", \"text\":\"TX ALVARADO\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1804\", \"parent\":\"1793\", \"nivel\":\"5\", \"text\":\"TX APAN\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1459\", \"parent\":\"1425\", \"nivel\":\"5\", \"text\":\"TX APASEO EL ALTO\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1322\", \"parent\":\"1289\", \"nivel\":\"5\", \"text\":\"TX APATZINGAN\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1635\", \"parent\":\"1587\", \"nivel\":\"5\", \"text\":\"TX APIZACO\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1323\", \"parent\":\"1290\", \"nivel\":\"5\", \"text\":\"TX ARANDAS\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1805\", \"parent\":\"1794\", \"nivel\":\"5\", \"text\":\"TX ATLACOMULCO\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1636\", \"parent\":\"1588\", \"nivel\":\"5\", \"text\":\"TX ATLIXCO\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1324\", \"parent\":\"1291\", \"nivel\":\"5\", \"text\":\"TX AUTLAN DE NAVARRO\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1325\", \"parent\":\"1292\", \"nivel\":\"5\", \"text\":\"TX BAHIA DE BANDERAS\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1118\", \"parent\":\"1103\", \"nivel\":\"5\", \"text\":\"TX CABO SAN LUCAS\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1747\", \"parent\":\"1723\", \"nivel\":\"5\", \"text\":\"TX CALDERITAS\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1460\", \"parent\":\"1426\", \"nivel\":\"5\", \"text\":\"TX CALVILLO\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1163\", \"parent\":\"1153\", \"nivel\":\"5\", \"text\":\"TX CAMARGO\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1748\", \"parent\":\"1724\", \"nivel\":\"5\", \"text\":\"TX CAMPECHE\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"958\", \"parent\":\"1725\", \"nivel\":\"5\", \"text\":\"TX CANCUN\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1637\", \"parent\":\"1589\", \"nivel\":\"5\", \"text\":\"TX CARDEL\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1749\", \"parent\":\"1726\", \"nivel\":\"5\", \"text\":\"TX CARDENAS-TABASCO\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"934\", \"parent\":\"1427\", \"nivel\":\"5\", \"text\":\"TX CELAYA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"781\", \"parent\":\"776\", \"nivel\":\"5\", \"text\":\"TX CENTRO\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"777\", \"parent\":\"1787\", \"nivel\":\"5\", \"text\":\"TX CENTRO SUR\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1750\", \"parent\":\"1727\", \"nivel\":\"5\", \"text\":\"TX CHAMPOTON\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1326\", \"parent\":\"1293\", \"nivel\":\"5\", \"text\":\"TX CHAPALA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1751\", \"parent\":\"1728\", \"nivel\":\"5\", \"text\":\"TX CHETUMAL\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"925\", \"parent\":\"1154\", \"nivel\":\"5\", \"text\":\"TX CHIHUAHUA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1638\", \"parent\":\"1590\", \"nivel\":\"5\", \"text\":\"TX CHILAPA DE ALVAREZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1639\", \"parent\":\"1591\", \"nivel\":\"5\", \"text\":\"TX CHILPANCINGO\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1752\", \"parent\":\"1729\", \"nivel\":\"5\", \"text\":\"TX CIUDAD DEL CARMEN\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"976\", \"parent\":\"973\", \"nivel\":\"5\", \"text\":\"SALTILLO 2000\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"643\", \"parent\":\"5\", \"nivel\":\"5\", \"text\":\"SALVATIERRA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"272\", \"parent\":\"734\", \"nivel\":\"5\", \"text\":\"SAN ANGEL\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"774\", \"parent\":\"379\", \"nivel\":\"5\", \"text\":\"SAN ANTONIO\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"266\", \"parent\":\"737\", \"nivel\":\"5\", \"text\":\"SAN BARTOLO AMEYALCO\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"185\", \"parent\":\"177\", \"nivel\":\"5\", \"text\":\"SAN BERNABE\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1010\", \"parent\":\"106\", \"nivel\":\"5\", \"text\":\"SAN CAYETANO\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"306\", \"parent\":\"726\", \"nivel\":\"5\", \"text\":\"SAN CRISTOBAL\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"617\", \"parent\":\"288\", \"nivel\":\"5\", \"text\":\"SAN FELIPE\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"273\", \"parent\":\"739\", \"nivel\":\"5\", \"text\":\"SAN FERNANDO 1\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"274\", \"parent\":\"739\", \"nivel\":\"5\", \"text\":\"SAN FERNANDO 2\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"262\", \"parent\":\"739\", \"nivel\":\"5\", \"text\":\"SAN FERNANDO 3\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"263\", \"parent\":\"738\", \"nivel\":\"5\", \"text\":\"SAN JERONIMO\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"173\", \"parent\":\"910\", \"nivel\":\"5\", \"text\":\"SAN JOSE CUMBRES\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"338\", \"parent\":\"745\", \"nivel\":\"5\", \"text\":\"SAN JOSE DEL JARAL\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"275\", \"parent\":\"734\", \"nivel\":\"5\", \"text\":\"SAN JOSE INSURGENTES\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"639\", \"parent\":\"747\", \"nivel\":\"5\", \"text\":\"SAN JUAN TLIHUACA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"258\", \"parent\":\"733\", \"nivel\":\"5\", \"text\":\"SAN LORENZO\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"645\", \"parent\":\"731\", \"nivel\":\"5\", \"text\":\"SAN LORENZO TEZONCO\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"103\", \"parent\":\"94\", \"nivel\":\"5\", \"text\":\"SAN MARCOS\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"616\", \"parent\":\"288\", \"nivel\":\"5\", \"text\":\"SAN MATEO ATENCO\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"234\", \"parent\":\"734\", \"nivel\":\"5\", \"text\":\"SAN MIGUEL CHAPULTEPEC\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"623\", \"parent\":\"740\", \"nivel\":\"5\", \"text\":\"SAN MIGUEL XICALCO\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"267\", \"parent\":\"739\", \"nivel\":\"5\", \"text\":\"SAN NICOLAS\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"663\", \"parent\":\"726\", \"nivel\":\"5\", \"text\":\"SAN PABLO DE LAS SALINAS I\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"664\", \"parent\":\"726\", \"nivel\":\"5\", \"text\":\"SAN PABLO DE LAS SALINAS II\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1002\", \"parent\":\"20\", \"nivel\":\"5\", \"text\":\"SAN PEDRO\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"371\", \"parent\":\"743\", \"nivel\":\"5\", \"text\":\"SAN PEDRO XALPA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"58\", \"parent\":\"686\", \"nivel\":\"5\", \"text\":\"SAN RAFAEL\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"673\", \"parent\":\"685\", \"nivel\":\"5\", \"text\":\"SAN ROQUE\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"151\", \"parent\":\"701\", \"nivel\":\"5\", \"text\":\"SANTA ANA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"152\", \"parent\":\"701\", \"nivel\":\"5\", \"text\":\"SANTA ANA II\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"674\", \"parent\":\"700\", \"nivel\":\"5\", \"text\":\"SANTA ANITA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"69\", \"parent\":\"2120\", \"nivel\":\"5\", \"text\":\"SANTA CATARINA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"100\", \"parent\":\"94\", \"nivel\":\"5\", \"text\":\"SANTA CECILIA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"303\", \"parent\":\"728\", \"nivel\":\"5\", \"text\":\"SANTA CLARA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"644\", \"parent\":\"740\", \"nivel\":\"5\", \"text\":\"SANTA CRUZ ACALPIXCA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"251\", \"parent\":\"733\", \"nivel\":\"5\", \"text\":\"SANTA FE\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"153\", \"parent\":\"700\", \"nivel\":\"5\", \"text\":\"SANTA MARIA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"661\", \"parent\":\"749\", \"nivel\":\"5\", \"text\":\"SANTA MARIA ACATITLA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"346\", \"parent\":\"742\", \"nivel\":\"5\", \"text\":\"SANTA MONICA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1017\", \"parent\":\"727\", \"nivel\":\"5\", \"text\":\"SANTA ROSA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"281\", \"parent\":\"738\", \"nivel\":\"5\", \"text\":\"SANTA URSULA 1\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"282\", \"parent\":\"738\", \"nivel\":\"5\", \"text\":\"SANTA URSULA 2\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"41\", \"parent\":\"30\", \"nivel\":\"5\", \"text\":\"SANTO DOMINGO\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"91\", \"parent\":\"85\", \"nivel\":\"5\", \"text\":\"SANTOS DEGOLLADO\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"372\", \"parent\":\"744\", \"nivel\":\"5\", \"text\":\"SATELITE\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"373\", \"parent\":\"742\", \"nivel\":\"5\", \"text\":\"SATELITE 2 (ECHEGARAY)\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"628\", \"parent\":\"288\", \"nivel\":\"5\", \"text\":\"SAUCES\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"627\", \"parent\":\"116\", \"nivel\":\"5\", \"text\":\"SAUCITO\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"992\", \"parent\":\"94\", \"nivel\":\"5\", \"text\":\"SILAO\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"605\", \"parent\":\"696\", \"nivel\":\"5\", \"text\":\"SOLARES\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"637\", \"parent\":\"116\", \"nivel\":\"5\", \"text\":\"SOLEDAD\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"634\", \"parent\":\"116\", \"nivel\":\"5\", \"text\":\"SOLEDAD G\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"132\", \"parent\":\"696\", \"nivel\":\"5\", \"text\":\"TABACHINES\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"604\", \"parent\":\"696\", \"nivel\":\"5\", \"text\":\"TABACHINES II\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"70\", \"parent\":\"684\", \"nivel\":\"5\", \"text\":\"TAMPIQUITO\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"197\", \"parent\":\"192\", \"nivel\":\"5\", \"text\":\"TARIMOYA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"283\", \"parent\":\"736\", \"nivel\":\"5\", \"text\":\"TAXQUENA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"382\", \"parent\":\"379\", \"nivel\":\"5\", \"text\":\"TEC PACHUCA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"252\", \"parent\":\"1944\", \"nivel\":\"5\", \"text\":\"TECAMACHALCO\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"174\", \"parent\":\"910\", \"nivel\":\"5\", \"text\":\"TEJALPA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"757\", \"parent\":\"171\", \"nivel\":\"5\", \"text\":\"TEMIXCO\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"995\", \"parent\":\"994\", \"nivel\":\"5\", \"text\":\"TENERIAS\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1009\", \"parent\":\"978\", \"nivel\":\"5\", \"text\":\"NUEVO VALLARTA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"40\", \"parent\":\"30\", \"nivel\":\"5\", \"text\":\"OASIS\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"68\", \"parent\":\"684\", \"nivel\":\"5\", \"text\":\"OBISPADO\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"141\", \"parent\":\"696\", \"nivel\":\"5\", \"text\":\"OBLATOS\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"619\", \"parent\":\"733\", \"nivel\":\"5\", \"text\":\"OBSERVATORIO\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"313\", \"parent\":\"730\", \"nivel\":\"5\", \"text\":\"OCEANIA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"902\", \"parent\":\"167\", \"nivel\":\"5\", \"text\":\"OCOTEPEC\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"656\", \"parent\":\"727\", \"nivel\":\"5\", \"text\":\"OJO DE AGUA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"10\", \"parent\":\"1948\", \"nivel\":\"5\", \"text\":\"OTAY\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"660\", \"parent\":\"727\", \"nivel\":\"5\", \"text\":\"OZUMBILLA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"384\", \"parent\":\"379\", \"nivel\":\"5\", \"text\":\"PACHUCA CENTRO\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"874\", \"parent\":\"1948\", \"nivel\":\"5\", \"text\":\"PACIFICO\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"658\", \"parent\":\"749\", \"nivel\":\"5\", \"text\":\"PALMITAS\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"97\", \"parent\":\"94\", \"nivel\":\"5\", \"text\":\"PALOMARES\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"329\", \"parent\":\"899\", \"nivel\":\"5\", \"text\":\"PANTITLAN\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"111\", \"parent\":\"106\", \"nivel\":\"5\", \"text\":\"PARQUE DEL ALAMO\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"90\", \"parent\":\"85\", \"nivel\":\"5\", \"text\":\"PARQUE VERDE\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"289\", \"parent\":\"288\", \"nivel\":\"5\", \"text\":\"PARQUES NACIONALES\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"55\", \"parent\":\"686\", \"nivel\":\"5\", \"text\":\"PASEO DE LOS ANGELES\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"150\", \"parent\":\"701\", \"nivel\":\"5\", \"text\":\"PATRIA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"14\", \"parent\":\"1948\", \"nivel\":\"5\", \"text\":\"PATRIA NUEVA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"271\", \"parent\":\"738\", \"nivel\":\"5\", \"text\":\"PEDREGAL\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"364\", \"parent\":\"741\", \"nivel\":\"5\", \"text\":\"PELICANO 1\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"365\", \"parent\":\"741\", \"nivel\":\"5\", \"text\":\"PELICANO 2\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"98\", \"parent\":\"94\", \"nivel\":\"5\", \"text\":\"PENITAS\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"112\", \"parent\":\"106\", \"nivel\":\"5\", \"text\":\"PENUELAS\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1036\", \"parent\":\"1034\", \"nivel\":\"5\", \"text\":\"PETROLERA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"224\", \"parent\":\"218\", \"nivel\":\"5\", \"text\":\"PINO\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"766\", \"parent\":\"210\", \"nivel\":\"5\", \"text\":\"PLAYA CENTRO\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"196\", \"parent\":\"192\", \"nivel\":\"5\", \"text\":\"PLAYA LINDA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"11\", \"parent\":\"5\", \"nivel\":\"5\", \"text\":\"PLAYAS TIJUANA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"225\", \"parent\":\"218\", \"nivel\":\"5\", \"text\":\"PLAZA DORADA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"249\", \"parent\":\"1944\", \"nivel\":\"5\", \"text\":\"POLANCO 1\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"250\", \"parent\":\"743\", \"nivel\":\"5\", \"text\":\"POLANCO 2\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"241\", \"parent\":\"736\", \"nivel\":\"5\", \"text\":\"PORTALES\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"163\", \"parent\":\"158\", \"nivel\":\"5\", \"text\":\"PORTALES DE MORELIA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"280\", \"parent\":\"736\", \"nivel\":\"5\", \"text\":\"PRADO CHURUBUSCO\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"302\", \"parent\":\"728\", \"nivel\":\"5\", \"text\":\"PRADOS XALOSTOC\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"622\", \"parent\":\"747\", \"nivel\":\"5\", \"text\":\"PRESA DE GUADALUPE\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"629\", \"parent\":\"733\", \"nivel\":\"5\", \"text\":\"PRESIDENTES\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"56\", \"parent\":\"685\", \"nivel\":\"5\", \"text\":\"PROGRESO\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"603\", \"parent\":\"700\", \"nivel\":\"5\", \"text\":\"PROVENZA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"131\", \"parent\":\"695\", \"nivel\":\"5\", \"text\":\"PROVIDENCIA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"184\", \"parent\":\"177\", \"nivel\":\"5\", \"text\":\"PUEBLA CENTRO\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"633\", \"parent\":\"733\", \"nivel\":\"5\", \"text\":\"PUEBLO DE BOSQUE REAL\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"254\", \"parent\":\"733\", \"nivel\":\"5\", \"text\":\"PUEBLO SANTA FE 1\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"255\", \"parent\":\"737\", \"nivel\":\"5\", \"text\":\"PUEBLO SANTA FE 2\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"155\", \"parent\":\"695\", \"nivel\":\"5\", \"text\":\"PUERTA DE HIERRO\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"215\", \"parent\":\"210\", \"nivel\":\"5\", \"text\":\"PUERTO CANCUN\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"980\", \"parent\":\"978\", \"nivel\":\"5\", \"text\":\"PUNTA MITA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"632\", \"parent\":\"20\", \"nivel\":\"5\", \"text\":\"QUINTAS CAROLINA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"57\", \"parent\":\"687\", \"nivel\":\"5\", \"text\":\"QUINTO CENTENARIO\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1011\", \"parent\":\"973\", \"nivel\":\"5\", \"text\":\"RAMOS ARIZPE\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"122\", \"parent\":\"116\", \"nivel\":\"5\", \"text\":\"RANCHO BLANCO\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"99\", \"parent\":\"94\", \"nivel\":\"5\", \"text\":\"REAL DE JEREZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"607\", \"parent\":\"695\", \"nivel\":\"5\", \"text\":\"REAL DE TESISTAN\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"670\", \"parent\":\"5\", \"nivel\":\"5\", \"text\":\"REFUGIO\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"205\", \"parent\":\"200\", \"nivel\":\"5\", \"text\":\"REVOLUCION\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1030\", \"parent\":\"1029\", \"nivel\":\"5\", \"text\":\"RIO BLANCO\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"676\", \"parent\":\"20\", \"nivel\":\"5\", \"text\":\"ROBINSON\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"232\", \"parent\":\"734\", \"nivel\":\"5\", \"text\":\"ROMA 1\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"233\", \"parent\":\"736\", \"nivel\":\"5\", \"text\":\"ROMA 2\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"991\", \"parent\":\"5\", \"nivel\":\"5\", \"text\":\"ROSAMAR\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"12\", \"parent\":\"5\", \"nivel\":\"5\", \"text\":\"ROSAS MAGALLON\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"974\", \"parent\":\"973\", \"nivel\":\"5\", \"text\":\"LA NOGALERA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1025\", \"parent\":\"1024\", \"nivel\":\"5\", \"text\":\"LA ROSITA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"148\", \"parent\":\"700\", \"nivel\":\"5\", \"text\":\"LA TIJERA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"188\", \"parent\":\"177\", \"nivel\":\"5\", \"text\":\"LA VISTA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"53\", \"parent\":\"683\", \"nivel\":\"5\", \"text\":\"LAGRANGE\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1013\", \"parent\":\"973\", \"nivel\":\"5\", \"text\":\"LANDIN\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"261\", \"parent\":\"737\", \"nivel\":\"5\", \"text\":\"LAS AGUILAS/CENTENARIO\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"344\", \"parent\":\"744\", \"nivel\":\"5\", \"text\":\"LAS ALAMEDAS\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"161\", \"parent\":\"158\", \"nivel\":\"5\", \"text\":\"LAS AMERICAS\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"361\", \"parent\":\"742\", \"nivel\":\"5\", \"text\":\"LAS ARMAS\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"381\", \"parent\":\"379\", \"nivel\":\"5\", \"text\":\"LAS CRUCES\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"675\", \"parent\":\"698\", \"nivel\":\"5\", \"text\":\"LAS JUNTAS\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"120\", \"parent\":\"116\", \"nivel\":\"5\", \"text\":\"LAS MERCEDES\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"907\", \"parent\":\"698\", \"nivel\":\"5\", \"text\":\"LAS PINTAS\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"82\", \"parent\":\"76\", \"nivel\":\"5\", \"text\":\"LAZARO CARDENAS\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"642\", \"parent\":\"288\", \"nivel\":\"5\", \"text\":\"LERMA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"140\", \"parent\":\"697\", \"nivel\":\"5\", \"text\":\"LIBERTAD\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"363\", \"parent\":\"741\", \"nivel\":\"5\", \"text\":\"LINDAVISTA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"149\", \"parent\":\"700\", \"nivel\":\"5\", \"text\":\"LOMA BONITA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"256\", \"parent\":\"733\", \"nivel\":\"5\", \"text\":\"LOMAS COUNTRY CLUB\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"180\", \"parent\":\"177\", \"nivel\":\"5\", \"text\":\"LOMAS DE ANGELOPOLIS\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"248\", \"parent\":\"1944\", \"nivel\":\"5\", \"text\":\"LOMAS DE CHAPULTEPEC\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"36\", \"parent\":\"30\", \"nivel\":\"5\", \"text\":\"LOMAS DE MORELOS\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"611\", \"parent\":\"1948\", \"nivel\":\"5\", \"text\":\"LOMAS DE VIRREY\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"129\", \"parent\":\"695\", \"nivel\":\"5\", \"text\":\"LOMAS DE ZAPOPAN\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1019\", \"parent\":\"192\", \"nivel\":\"5\", \"text\":\"LOMAS DEL RIO\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"370\", \"parent\":\"744\", \"nivel\":\"5\", \"text\":\"LOMAS VERDES\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"37\", \"parent\":\"30\", \"nivel\":\"5\", \"text\":\"LOS CIPRESES\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"181\", \"parent\":\"1945\", \"nivel\":\"5\", \"text\":\"LOS FRAILES\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"102\", \"parent\":\"94\", \"nivel\":\"5\", \"text\":\"LOS FRESNOS\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"182\", \"parent\":\"1945\", \"nivel\":\"5\", \"text\":\"LOS FUERTES\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"96\", \"parent\":\"94\", \"nivel\":\"5\", \"text\":\"LOS NARANJOS\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"657\", \"parent\":\"732\", \"nivel\":\"5\", \"text\":\"LOS REYES ACAQUILPAN\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"646\", \"parent\":\"1948\", \"nivel\":\"5\", \"text\":\"MAGISTERIAL\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1008\", \"parent\":\"978\", \"nivel\":\"5\", \"text\":\"MALECON\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"162\", \"parent\":\"158\", \"nivel\":\"5\", \"text\":\"MANANTIALES\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"67\", \"parent\":\"2120\", \"nivel\":\"5\", \"text\":\"MANUEL CLOUTHIER\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"328\", \"parent\":\"899\", \"nivel\":\"5\", \"text\":\"MARAVILLAS\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"25\", \"parent\":\"20\", \"nivel\":\"5\", \"text\":\"MARMOL\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"9\", \"parent\":\"1948\", \"nivel\":\"5\", \"text\":\"MATAMOROS\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"222\", \"parent\":\"218\", \"nivel\":\"5\", \"text\":\"MAYAPAN\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"183\", \"parent\":\"177\", \"nivel\":\"5\", \"text\":\"MAYORAZGO\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"38\", \"parent\":\"30\", \"nivel\":\"5\", \"text\":\"MAYORCA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"652\", \"parent\":\"746\", \"nivel\":\"5\", \"text\":\"MELCHOR OCAMPO\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"291\", \"parent\":\"288\", \"nivel\":\"5\", \"text\":\"METEPEC\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"80\", \"parent\":\"76\", \"nivel\":\"5\", \"text\":\"MEXIQUITO\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"130\", \"parent\":\"699\", \"nivel\":\"5\", \"text\":\"MEZQUITAN\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"101\", \"parent\":\"94\", \"nivel\":\"5\", \"text\":\"MIGUEL HIDALGO\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"380\", \"parent\":\"379\", \"nivel\":\"5\", \"text\":\"MINERAL DE LA REFORMA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"26\", \"parent\":\"20\", \"nivel\":\"5\", \"text\":\"MIRADOR\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"54\", \"parent\":\"686\", \"nivel\":\"5\", \"text\":\"MIRAFLORES\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"279\", \"parent\":\"738\", \"nivel\":\"5\", \"text\":\"MIRAMONTES\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"977\", \"parent\":\"973\", \"nivel\":\"5\", \"text\":\"MIRASIERRA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"630\", \"parent\":\"698\", \"nivel\":\"5\", \"text\":\"MIRAVALLE\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"238\", \"parent\":\"734\", \"nivel\":\"5\", \"text\":\"MIXCOAC/PORTALES\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"223\", \"parent\":\"218\", \"nivel\":\"5\", \"text\":\"MONTEJO\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"121\", \"parent\":\"116\", \"nivel\":\"5\", \"text\":\"MORALES CAMPESTRE\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"345\", \"parent\":\"744\", \"nivel\":\"5\", \"text\":\"MUNDO E\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"239\", \"parent\":\"734\", \"nivel\":\"5\", \"text\":\"NAPOLES\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"240\", \"parent\":\"734\", \"nivel\":\"5\", \"text\":\"NARVARTE\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"640\", \"parent\":\"747\", \"nivel\":\"5\", \"text\":\"NICOLAS ROMERO\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"39\", \"parent\":\"30\", \"nivel\":\"5\", \"text\":\"NOGALES\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1012\", \"parent\":\"973\", \"nivel\":\"5\", \"text\":\"NUEVA AURORA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"213\", \"parent\":\"210\", \"nivel\":\"5\", \"text\":\"NUEVO CALAKMUL\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"750\", \"parent\":\"737\", \"nivel\":\"5\", \"text\":\"CUMBRES SANTA FE - GIRAULT\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"751\", \"parent\":\"737\", \"nivel\":\"5\", \"text\":\"CUMBRES SANTA FE - REFORMA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"237\", \"parent\":\"734\", \"nivel\":\"5\", \"text\":\"DEL VALLE\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"895\", \"parent\":\"684\", \"nivel\":\"5\", \"text\":\"DEL VALLE MTY\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"212\", \"parent\":\"210\", \"nivel\":\"5\", \"text\":\"DONCELES\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"626\", \"parent\":\"1948\", \"nivel\":\"5\", \"text\":\"DOS MIL\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"311\", \"parent\":\"730\", \"nivel\":\"5\", \"text\":\"EDUARDO MOLINA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"78\", \"parent\":\"76\", \"nivel\":\"5\", \"text\":\"EL COBANO\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1003\", \"parent\":\"910\", \"nivel\":\"5\", \"text\":\"EL MARQUES\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"137\", \"parent\":\"699\", \"nivel\":\"5\", \"text\":\"EL ROSARIO\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"655\", \"parent\":\"748\", \"nivel\":\"5\", \"text\":\"EL SALADO\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"203\", \"parent\":\"200\", \"nivel\":\"5\", \"text\":\"EL TREBOL\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"34\", \"parent\":\"30\", \"nivel\":\"5\", \"text\":\"EL VERGEL\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"138\", \"parent\":\"697\", \"nivel\":\"5\", \"text\":\"EL ZALATE\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"50\", \"parent\":\"687\", \"nivel\":\"5\", \"text\":\"ENRAMADA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"231\", \"parent\":\"734\", \"nivel\":\"5\", \"text\":\"ESCANDON\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"653\", \"parent\":\"748\", \"nivel\":\"5\", \"text\":\"ESPERANZA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"118\", \"parent\":\"116\", \"nivel\":\"5\", \"text\":\"FERROCARRILERA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"8\", \"parent\":\"1948\", \"nivel\":\"5\", \"text\":\"FONTANA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1031\", \"parent\":\"1029\", \"nivel\":\"5\", \"text\":\"FORTIN\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"204\", \"parent\":\"200\", \"nivel\":\"5\", \"text\":\"FRAMBOYANES\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"221\", \"parent\":\"218\", \"nivel\":\"5\", \"text\":\"FRANCISCO MONTEBELLO\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"352\", \"parent\":\"745\", \"nivel\":\"5\", \"text\":\"FUENTES DEL VALLE\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"13\", \"parent\":\"5\", \"nivel\":\"5\", \"text\":\"FUNDADORES\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"109\", \"parent\":\"106\", \"nivel\":\"5\", \"text\":\"GALINDAS\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"51\", \"parent\":\"687\", \"nivel\":\"5\", \"text\":\"GENERAL ESCOBEDO\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"35\", \"parent\":\"30\", \"nivel\":\"5\", \"text\":\"GOMEZ MORIN\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"321\", \"parent\":\"731\", \"nivel\":\"5\", \"text\":\"GRANJAS ESMERALDA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"312\", \"parent\":\"729\", \"nivel\":\"5\", \"text\":\"GRANJAS INDEPENDENCIA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"79\", \"parent\":\"76\", \"nivel\":\"5\", \"text\":\"GREMIAL\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"139\", \"parent\":\"699\", \"nivel\":\"5\", \"text\":\"GUADALAJARA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"625\", \"parent\":\"698\", \"nivel\":\"5\", \"text\":\"GUADALAJARA II\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"52\", \"parent\":\"685\", \"nivel\":\"5\", \"text\":\"GUADALUPE\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"666\", \"parent\":\"730\", \"nivel\":\"5\", \"text\":\"GUADALUPE DEL MORAL\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1005\", \"parent\":\"94\", \"nivel\":\"5\", \"text\":\"GUANAJUATO CAPITAL\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"667\", \"parent\":\"76\", \"nivel\":\"5\", \"text\":\"HACIENDA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"908\", \"parent\":\"700\", \"nivel\":\"5\", \"text\":\"HACIENDA SANTA FE\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"909\", \"parent\":\"700\", \"nivel\":\"5\", \"text\":\"HACIENDA SANTA FE\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"659\", \"parent\":\"727\", \"nivel\":\"5\", \"text\":\"HEROES TECAMAC I\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"665\", \"parent\":\"727\", \"nivel\":\"5\", \"text\":\"HEROES TECAMAC II\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"613\", \"parent\":\"1945\", \"nivel\":\"5\", \"text\":\"HISTORIADORES\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"119\", \"parent\":\"116\", \"nivel\":\"5\", \"text\":\"HUERTA REAL\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"322\", \"parent\":\"730\", \"nivel\":\"5\", \"text\":\"IGNACIO ZARAGOZA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"128\", \"parent\":\"696\", \"nivel\":\"5\", \"text\":\"INDEPENDENCIA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"278\", \"parent\":\"739\", \"nivel\":\"5\", \"text\":\"INSURGENTES CUICUILCO\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"360\", \"parent\":\"742\", \"nivel\":\"5\", \"text\":\"IXTACALA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"654\", \"parent\":\"749\", \"nivel\":\"5\", \"text\":\"IXTLAHUACA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"335\", \"parent\":\"745\", \"nivel\":\"5\", \"text\":\"IZCALLI 1\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"336\", \"parent\":\"746\", \"nivel\":\"5\", \"text\":\"IZCALLI 2\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"323\", \"parent\":\"736\", \"nivel\":\"5\", \"text\":\"IZTACALCO\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"89\", \"parent\":\"85\", \"nivel\":\"5\", \"text\":\"JACARANDAS\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"301\", \"parent\":\"727\", \"nivel\":\"5\", \"text\":\"JARDINES DE MORELOS\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"754\", \"parent\":\"94\", \"nivel\":\"5\", \"text\":\"JARDINES DE SAN FRANCISCO\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"179\", \"parent\":\"1945\", \"nivel\":\"5\", \"text\":\"JARDINES DE SANTIAGO\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"247\", \"parent\":\"733\", \"nivel\":\"5\", \"text\":\"JESUS DEL MONTE\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"901\", \"parent\":\"76\", \"nivel\":\"5\", \"text\":\"JESUS MARIA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"172\", \"parent\":\"910\", \"nivel\":\"5\", \"text\":\"JIUTEPEC\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"110\", \"parent\":\"106\", \"nivel\":\"5\", \"text\":\"JURICA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1001\", \"parent\":\"20\", \"nivel\":\"5\", \"text\":\"JUVENTUD\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"905\", \"parent\":\"210\", \"nivel\":\"5\", \"text\":\"KABAH\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"635\", \"parent\":\"687\", \"nivel\":\"5\", \"text\":\"KATAVIA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"906\", \"parent\":\"218\", \"nivel\":\"5\", \"text\":\"KUKULKAN\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"755\", \"parent\":\"379\", \"nivel\":\"5\", \"text\":\"LA FLORESTA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"337\", \"parent\":\"742\", \"nivel\":\"5\", \"text\":\"LA HACIENDA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"357\", \"parent\":\"743\", \"nivel\":\"5\", \"text\":\"AZCAPOTZALCO\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"343\", \"parent\":\"744\", \"nivel\":\"5\", \"text\":\"BELLAVISTA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"326\", \"parent\":\"732\", \"nivel\":\"5\", \"text\":\"BENITO JUAREZ 1\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"327\", \"parent\":\"732\", \"nivel\":\"5\", \"text\":\"BENITO JUAREZ 2\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"265\", \"parent\":\"739\", \"nivel\":\"5\", \"text\":\"BERNABE\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"193\", \"parent\":\"192\", \"nivel\":\"5\", \"text\":\"BOCA DEL RIO\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"159\", \"parent\":\"158\", \"nivel\":\"5\", \"text\":\"BOCANEGRA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"219\", \"parent\":\"218\", \"nivel\":\"5\", \"text\":\"BOJORQUEZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"117\", \"parent\":\"116\", \"nivel\":\"5\", \"text\":\"BOLIVAR\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"257\", \"parent\":\"733\", \"nivel\":\"5\", \"text\":\"BOSQUE REAL\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"77\", \"parent\":\"76\", \"nivel\":\"5\", \"text\":\"BOSQUES\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"612\", \"parent\":\"1945\", \"nivel\":\"5\", \"text\":\"BOSQUES AMALUCAN\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1035\", \"parent\":\"1034\", \"nivel\":\"5\", \"text\":\"BRISAS DEL GOLFO\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"979\", \"parent\":\"978\", \"nivel\":\"5\", \"text\":\"BUCERIAS\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"32\", \"parent\":\"30\", \"nivel\":\"5\", \"text\":\"BUENOS AIRES\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"147\", \"parent\":\"701\", \"nivel\":\"5\", \"text\":\"BUGAMBILIA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"614\", \"parent\":\"94\", \"nivel\":\"5\", \"text\":\"BUGANBILIAS_LEON\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"641\", \"parent\":\"899\", \"nivel\":\"5\", \"text\":\"CABEZA DE JUAREZ\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1020\", \"parent\":\"200\", \"nivel\":\"5\", \"text\":\"CAFETALES\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"904\", \"parent\":\"1945\", \"nivel\":\"5\", \"text\":\"CALERAS\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"21\", \"parent\":\"20\", \"nivel\":\"5\", \"text\":\"CAMPANARIO\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"107\", \"parent\":\"106\", \"nivel\":\"5\", \"text\":\"CAMPESTRE\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"22\", \"parent\":\"20\", \"nivel\":\"5\", \"text\":\"CAMPO BELLO\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"95\", \"parent\":\"94\", \"nivel\":\"5\", \"text\":\"CANADA DEL REFUGIO\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"65\", \"parent\":\"684\", \"nivel\":\"5\", \"text\":\"CANTERAS\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"33\", \"parent\":\"30\", \"nivel\":\"5\", \"text\":\"CARLOS AMAYA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"753\", \"parent\":\"192\", \"nivel\":\"5\", \"text\":\"CARRANZA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"350\", \"parent\":\"745\", \"nivel\":\"5\", \"text\":\"CARTAGENA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"220\", \"parent\":\"218\", \"nivel\":\"5\", \"text\":\"CAUCEL\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"86\", \"parent\":\"85\", \"nivel\":\"5\", \"text\":\"CELAYA 1\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"87\", \"parent\":\"85\", \"nivel\":\"5\", \"text\":\"CELAYA 2\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"88\", \"parent\":\"85\", \"nivel\":\"5\", \"text\":\"CELAYA 3\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"669\", \"parent\":\"1948\", \"nivel\":\"5\", \"text\":\"CERRO COLORADO\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"319\", \"parent\":\"731\", \"nivel\":\"5\", \"text\":\"CERRO DE LA ESTRELLA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"49\", \"parent\":\"685\", \"nivel\":\"5\", \"text\":\"CERRO DE LA SILLA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"358\", \"parent\":\"743\", \"nivel\":\"5\", \"text\":\"CEYLAN\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"310\", \"parent\":\"728\", \"nivel\":\"5\", \"text\":\"CHAMIZAL\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"211\", \"parent\":\"210\", \"nivel\":\"5\", \"text\":\"CHEMUYIL\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"23\", \"parent\":\"20\", \"nivel\":\"5\", \"text\":\"CHIHUAHUA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"638\", \"parent\":\"748\", \"nivel\":\"5\", \"text\":\"CHIMALHUACAN\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"299\", \"parent\":\"728\", \"nivel\":\"5\", \"text\":\"CIUDAD AZTECA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"359\", \"parent\":\"743\", \"nivel\":\"5\", \"text\":\"CLAVERIA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"972\", \"parent\":\"971\", \"nivel\":\"5\", \"text\":\"CLUSTER TX\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"300\", \"parent\":\"726\", \"nivel\":\"5\", \"text\":\"COACALCO\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"277\", \"parent\":\"740\", \"nivel\":\"5\", \"text\":\"COAPA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"108\", \"parent\":\"106\", \"nivel\":\"5\", \"text\":\"COLINAS DEL PARQUE\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"230\", \"parent\":\"734\", \"nivel\":\"5\", \"text\":\"CONDESA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"662\", \"parent\":\"749\", \"nivel\":\"5\", \"text\":\"CONSTITUCION DE 1917\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"24\", \"parent\":\"20\", \"nivel\":\"5\", \"text\":\"CONSTITUYENTES\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1004\", \"parent\":\"910\", \"nivel\":\"5\", \"text\":\"COSTA AZUL\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"194\", \"parent\":\"192\", \"nivel\":\"5\", \"text\":\"COSTA VERDE\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"269\", \"parent\":\"734\", \"nivel\":\"5\", \"text\":\"COYOACAN 1\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"270\", \"parent\":\"738\", \"nivel\":\"5\", \"text\":\"COYOACAN 2\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"195\", \"parent\":\"192\", \"nivel\":\"5\", \"text\":\"COYOL\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"246\", \"parent\":\"733\", \"nivel\":\"5\", \"text\":\"CUAJIMALPA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"351\", \"parent\":\"746\", \"nivel\":\"5\", \"text\":\"CUAUTITLAN\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"160\", \"parent\":\"158\", \"nivel\":\"5\", \"text\":\"CUAUTLA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1007\", \"parent\":\"177\", \"nivel\":\"5\", \"text\":\"CUAUTLANCINGO\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"168\", \"parent\":\"167\", \"nivel\":\"5\", \"text\":\"CUERNAVACA 1\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"169\", \"parent\":\"167\", \"nivel\":\"5\", \"text\":\"CUERNAVACA 2\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"170\", \"parent\":\"167\", \"nivel\":\"5\", \"text\":\"CUERNAVACA 3\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"320\", \"parent\":\"731\", \"nivel\":\"5\", \"text\":\"CULHUACAN\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"66\", \"parent\":\"683\", \"nivel\":\"5\", \"text\":\"CUMBRES\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"649\", \"parent\":\"737\", \"nivel\":\"5\", \"text\":\"CUMBRES SANTA FE - BASALTO\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"615\", \"parent\":\"288\", \"nivel\":\"5\", \"text\":\"1_LERMA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"317\", \"parent\":\"730\", \"nivel\":\"5\", \"text\":\"AGRICOLA ORIENTAL\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"325\", \"parent\":\"732\", \"nivel\":\"5\", \"text\":\"AGUA AZUL\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"6\", \"parent\":\"5\", \"nivel\":\"5\", \"text\":\"AGUA CALIENTE\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"201\", \"parent\":\"200\", \"nivel\":\"5\", \"text\":\"AGUA SANTA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"305\", \"parent\":\"727\", \"nivel\":\"5\", \"text\":\"ALCAHUACAN\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"31\", \"parent\":\"30\", \"nivel\":\"5\", \"text\":\"ALDAMA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"7\", \"parent\":\"5\", \"nivel\":\"5\", \"text\":\"ALTAMIRA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"897\", \"parent\":\"20\", \"nivel\":\"5\", \"text\":\"AMPLACION MARMOL\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"986\", \"parent\":\"200\", \"nivel\":\"5\", \"text\":\"AMPLIACION AGUA SANTA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"987\", \"parent\":\"200\", \"nivel\":\"5\", \"text\":\"AMPLIACION AGUA SANTA 2\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"879\", \"parent\":\"192\", \"nivel\":\"5\", \"text\":\"AMPLIACION COSTA VERDE\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"889\", \"parent\":\"167\", \"nivel\":\"5\", \"text\":\"AMPLIACION CUERNAVACA 2\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1006\", \"parent\":\"683\", \"nivel\":\"5\", \"text\":\"AMPLIACION CUMBRES\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"875\", \"parent\":\"200\", \"nivel\":\"5\", \"text\":\"AMPLIACION EL TREBOL\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1015\", \"parent\":\"116\", \"nivel\":\"5\", \"text\":\"AMPLIACION FERROCARRILERA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"877\", \"parent\":\"200\", \"nivel\":\"5\", \"text\":\"AMPLIACION FRAMBOYANES\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1021\", \"parent\":\"200\", \"nivel\":\"5\", \"text\":\"AMPLIACION FRAMBOYANES 2\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"982\", \"parent\":\"116\", \"nivel\":\"5\", \"text\":\"AMPLIACION HUERTA REAL\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"890\", \"parent\":\"696\", \"nivel\":\"5\", \"text\":\"AMPLIACION INDEPENDENCIA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"892\", \"parent\":\"698\", \"nivel\":\"5\", \"text\":\"AMPLIACION LAS JUNTAS\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"896\", \"parent\":\"2120\", \"nivel\":\"5\", \"text\":\"AMPLIACION MANUEL CLOUTHIER\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"900\", \"parent\":\"2120\", \"nivel\":\"5\", \"text\":\"AMPLIACION MANUEL CLOUTHIER\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"989\", \"parent\":\"76\", \"nivel\":\"5\", \"text\":\"AMPLIACION MEXIQUITO\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"988\", \"parent\":\"116\", \"nivel\":\"5\", \"text\":\"AMPLIACION MORALES CAMPESTRE\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1014\", \"parent\":\"116\", \"nivel\":\"5\", \"text\":\"AMPLIACION MORALES CAMPESTRE 2\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"893\", \"parent\":\"684\", \"nivel\":\"5\", \"text\":\"AMPLIACION OBISPADO\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"903\", \"parent\":\"167\", \"nivel\":\"5\", \"text\":\"AMPLIACION OCOTEPEC\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"618\", \"parent\":\"733\", \"nivel\":\"5\", \"text\":\"AMPLIACION PUEBLO SANTA FE 1\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"876\", \"parent\":\"200\", \"nivel\":\"5\", \"text\":\"AMPLIACION REVOLUCION\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"886\", \"parent\":\"910\", \"nivel\":\"5\", \"text\":\"AMPLIACION SAN JOSE CUMBRES\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"888\", \"parent\":\"910\", \"nivel\":\"5\", \"text\":\"AMPLIACION SAN JOSE CUMBRES 2\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"981\", \"parent\":\"116\", \"nivel\":\"5\", \"text\":\"AMPLIACION SOLEDAD\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"1016\", \"parent\":\"116\", \"nivel\":\"5\", \"text\":\"AMPLIACION SOLEDAD\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"878\", \"parent\":\"192\", \"nivel\":\"5\", \"text\":\"AMPLIACION TARIMOYA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"887\", \"parent\":\"910\", \"nivel\":\"5\", \"text\":\"AMPLIACION TEJALPA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"990\", \"parent\":\"76\", \"nivel\":\"5\", \"text\":\"AMPLIACION TIERRA NUEVA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"891\", \"parent\":\"698\", \"nivel\":\"5\", \"text\":\"AMPLIACION TONALA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"882\", \"parent\":\"379\", \"nivel\":\"5\", \"text\":\"AMPLIACION TULANCINGO 1\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"883\", \"parent\":\"379\", \"nivel\":\"5\", \"text\":\"AMPLIACION TULANCINGO 2\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"884\", \"parent\":\"379\", \"nivel\":\"5\", \"text\":\"AMPLIACION TULANCINGO 3\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"885\", \"parent\":\"379\", \"nivel\":\"5\", \"text\":\"AMPLIACION TULANCINGO 4\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"984\", \"parent\":\"177\", \"nivel\":\"5\", \"text\":\"AMPLIACION UDLA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"985\", \"parent\":\"177\", \"nivel\":\"5\", \"text\":\"AMPLIACION UDLA 2\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"894\", \"parent\":\"683\", \"nivel\":\"5\", \"text\":\"AMPLIACION VILLA MITRAS\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"880\", \"parent\":\"379\", \"nivel\":\"5\", \"text\":\"AMPLIACION VILLAS DEL ALAMO\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"881\", \"parent\":\"379\", \"nivel\":\"5\", \"text\":\"AMPLIACION VILLAS DEL ALAMO 2\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"983\", \"parent\":\"685\", \"nivel\":\"5\", \"text\":\"AMPLIACION ZERTUCHE\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"47\", \"parent\":\"686\", \"nivel\":\"5\", \"text\":\"ANAHUAC\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"244\", \"parent\":\"1944\", \"nivel\":\"5\", \"text\":\"ANZURES 1\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"245\", \"parent\":\"743\", \"nivel\":\"5\", \"text\":\"ANZURES 2\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"318\", \"parent\":\"736\", \"nivel\":\"5\", \"text\":\"APATLACO\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"48\", \"parent\":\"687\", \"nivel\":\"5\", \"text\":\"APODACA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"178\", \"parent\":\"177\", \"nivel\":\"5\", \"text\":\"AQUILES SERDAN\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"308\", \"parent\":\"729\", \"nivel\":\"5\", \"text\":\"ARAGON 1\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"309\", \"parent\":\"729\", \"nivel\":\"5\", \"text\":\"ARAGON 2\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"342\", \"parent\":\"742\", \"nivel\":\"5\", \"text\":\"ARBOLEDAS\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"146\", \"parent\":\"699\", \"nivel\":\"5\", \"text\":\"ARCOS DE VALLARTA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"63\", \"parent\":\"2120\", \"nivel\":\"5\", \"text\":\"ARCOS DEL SOL\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"752\", \"parent\":\"1945\", \"nivel\":\"5\", \"text\":\"ARCOS DEL SUR\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"64\", \"parent\":\"683\", \"nivel\":\"5\", \"text\":\"ARGENTINA\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"202\", \"parent\":\"200\", \"nivel\":\"5\", \"text\":\"ARROYO BLANCO\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"235\", \"parent\":\"736\", \"nivel\":\"5\", \"text\":\"ASTURIAS\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }},{\"id\":\"330\", \"parent\":\"899\", \"nivel\":\"5\", \"text\":\"ATLACOMULCO\", \"icon\": \"fa fa-globe\", \"state\" : {\"opened\" : false,\"selected\":true }}]",
            "intervencion": "\u003cnav\u003e\u003cul class\u003d\u0027justified\u0027\u003e\u003cli class\u003d\u0027dropdown\u0027 style\u003d\u0027width: 90%;\u0027\u003e\u003cbutton class\u003d\u0027btn dropdown-toggle btn-default menubtnInt\u0027 type\u003d\u0027button\u0027 data-toggle\u003d\u0027dropdownInt\u0027\u003e\u003csmall\u003eIntervenci\u0026oacute;n\u003c/small\u003e\u003c/button\u003e\u003cul class\u003d\u0027sub-menu initML\u0027 style\u003d\u0027display: none;\u0027\u003e\u003cli class\u003d\u0027dropdown-submenu\u0027\u003e\u003cbutton onclick\u003d\u0027chekendAllInt()\u0027 class\u003d\u0027btn btn-int\u0027 style\u003d\u0027width: 45%; margin-left:5%;\u0027\u003e\u003csmall\u003eTodo\u003c/small\u003e\u003c/button\u003e\u003cbutton onclick\u003d\u0027unchekendAllInt()\u0027 class\u003d\u0027btn btn-int\u0027 style\u003d\u0027width: 45%;\u0027\u003e\u003csmall\u003eNinguno\u003c/small\u003e\u003c/button\u003e\u003c/li\u003e\u003cli class\u003d\u0027dropdownInt fatherInt\u0027\u003e\u003ca href\u003d\u0027#\u0027 class\u003d\u0027dropdown-toggle intervencion-30\u0027 onclick\u003d\u0027checkfatherInt(30);\u0027\u003e\u003csmall class\u003d\u0027txtmenupin\u0027\u003ePLANTA EXTERNA\u003c/small\u003e\u003ci class\u003d\u0027fa fa-check-square-o checkbox-Int txtmenu\u0027 id\u003d\u0027iconcheckInt-30\u0027 style\u003d\u0027display:none;\u0027\u003e\u003c/i\u003e\u003cinput style\u003d\u0027display:none;\u0027 type\u003d\u0027checkbox\u0027 id\u003d\u0027intervencionInt-30\u0027  class\u003d\u0027intervencion\u0027 value\u003d \u002730\u0027\u003e\u003c/a\u003e\u003cul class\u003d\u0027sub-menu\u0027 id\u003d\u0027intervencionNL-30\u0027\u003e\u003cli class\u003d\u0027submenuInt\u0027\u003e\u003ca class\u003d\u0027test\u0027 href\u003d\u0027#\u0027 onclick\u003d\u0027checkChildrenInt(31);\u0027\u003e\u003csmall class\u003d\u0027txtmenu\u0027\u003eSPLITTER SATURADO\u003c/small\u003e\u003ci class\u003d\u0027fa fa-check-square-o checkbox-Int txtmenu\u0027 id\u003d\u0027iconchecksi-31\u0027 style\u003d\u0027display:none;\u0027\u003e\u003c/i\u003e\u003cinput style\u003d\u0027display:none;\u0027 type\u003d\u0027checkbox\u0027 id\u003d\u0027subintervencion-31\u0027 class\u003d\u0027subintervencion subintervencion-30\u0027  value\u003d \u002731\u0027\u003e\u003c/a\u003e\u003c/li\u003e\u003cli class\u003d\u0027submenuInt\u0027\u003e\u003ca class\u003d\u0027test\u0027 href\u003d\u0027#\u0027 onclick\u003d\u0027checkChildrenInt(32);\u0027\u003e\u003csmall class\u003d\u0027txtmenu\u0027\u003eSPLITTER ATENUADO\u003c/small\u003e\u003ci class\u003d\u0027fa fa-check-square-o checkbox-Int txtmenu\u0027 id\u003d\u0027iconchecksi-32\u0027 style\u003d\u0027display:none;\u0027\u003e\u003c/i\u003e\u003cinput style\u003d\u0027display:none;\u0027 type\u003d\u0027checkbox\u0027 id\u003d\u0027subintervencion-32\u0027 class\u003d\u0027subintervencion subintervencion-30\u0027  value\u003d \u002732\u0027\u003e\u003c/a\u003e\u003c/li\u003e\u003cli class\u003d\u0027submenuInt\u0027\u003e\u003ca class\u003d\u0027test\u0027 href\u003d\u0027#\u0027 onclick\u003d\u0027checkChildrenInt(33);\u0027\u003e\u003csmall class\u003d\u0027txtmenu\u0027\u003eSPLITTER BAJA POTENCIA\u003c/small\u003e\u003ci class\u003d\u0027fa fa-check-square-o checkbox-Int txtmenu\u0027 id\u003d\u0027iconchecksi-33\u0027 style\u003d\u0027display:none;\u0027\u003e\u003c/i\u003e\u003cinput style\u003d\u0027display:none;\u0027 type\u003d\u0027checkbox\u0027 id\u003d\u0027subintervencion-33\u0027 class\u003d\u0027subintervencion subintervencion-30\u0027  value\u003d \u002733\u0027\u003e\u003c/a\u003e\u003c/li\u003e\u003cli class\u003d\u0027submenuInt\u0027\u003e\u003ca class\u003d\u0027test\u0027 href\u003d\u0027#\u0027 onclick\u003d\u0027checkChildrenInt(34);\u0027\u003e\u003csmall class\u003d\u0027txtmenu\u0027\u003eSPLITTER PUERTOS DAÑADOS\u003c/small\u003e\u003ci class\u003d\u0027fa fa-check-square-o checkbox-Int txtmenu\u0027 id\u003d\u0027iconchecksi-34\u0027 style\u003d\u0027display:none;\u0027\u003e\u003c/i\u003e\u003cinput style\u003d\u0027display:none;\u0027 type\u003d\u0027checkbox\u0027 id\u003d\u0027subintervencion-34\u0027 class\u003d\u0027subintervencion subintervencion-30\u0027  value\u003d \u002734\u0027\u003e\u003c/a\u003e\u003c/li\u003e\u003cli class\u003d\u0027submenuInt\u0027\u003e\u003ca class\u003d\u0027test\u0027 href\u003d\u0027#\u0027 onclick\u003d\u0027checkChildrenInt(90);\u0027\u003e\u003csmall class\u003d\u0027txtmenu\u0027\u003eANCHO DE BANDA INSUFICIENTE\u003c/small\u003e\u003ci class\u003d\u0027fa fa-check-square-o checkbox-Int txtmenu\u0027 id\u003d\u0027iconchecksi-90\u0027 style\u003d\u0027display:none;\u0027\u003e\u003c/i\u003e\u003cinput style\u003d\u0027display:none;\u0027 type\u003d\u0027checkbox\u0027 id\u003d\u0027subintervencion-90\u0027 class\u003d\u0027subintervencion subintervencion-30\u0027  value\u003d \u002790\u0027\u003e\u003c/a\u003e\u003c/li\u003e\u003cli class\u003d\u0027submenuInt\u0027\u003e\u003ca class\u003d\u0027test\u0027 href\u003d\u0027#\u0027 onclick\u003d\u0027checkChildrenInt(91);\u0027\u003e\u003csmall class\u003d\u0027txtmenu\u0027\u003eSPLITTER NO ILUMINADO\u003c/small\u003e\u003ci class\u003d\u0027fa fa-check-square-o checkbox-Int txtmenu\u0027 id\u003d\u0027iconchecksi-91\u0027 style\u003d\u0027display:none;\u0027\u003e\u003c/i\u003e\u003cinput style\u003d\u0027display:none;\u0027 type\u003d\u0027checkbox\u0027 id\u003d\u0027subintervencion-91\u0027 class\u003d\u0027subintervencion subintervencion-30\u0027  value\u003d \u002791\u0027\u003e\u003c/a\u003e\u003c/li\u003e\u003cli class\u003d\u0027submenuInt\u0027\u003e\u003ca class\u003d\u0027test\u0027 href\u003d\u0027#\u0027 onclick\u003d\u0027checkChildrenInt(92);\u0027\u003e\u003csmall class\u003d\u0027txtmenu\u0027\u003eSPLITTER SIN POTENCIA\u003c/small\u003e\u003ci class\u003d\u0027fa fa-check-square-o checkbox-Int txtmenu\u0027 id\u003d\u0027iconchecksi-92\u0027 style\u003d\u0027display:none;\u0027\u003e\u003c/i\u003e\u003cinput style\u003d\u0027display:none;\u0027 type\u003d\u0027checkbox\u0027 id\u003d\u0027subintervencion-92\u0027 class\u003d\u0027subintervencion subintervencion-30\u0027  value\u003d \u002792\u0027\u003e\u003c/a\u003e\u003c/li\u003e\u003cli class\u003d\u0027submenuInt\u0027\u003e\u003ca class\u003d\u0027test\u0027 href\u003d\u0027#\u0027 onclick\u003d\u0027checkChildrenInt(187);\u0027\u003e\u003csmall class\u003d\u0027txtmenu\u0027\u003ePLANTA EXTERNA - COBERTURA TX\u003c/small\u003e\u003ci class\u003d\u0027fa fa-check-square-o checkbox-Int txtmenu\u0027 id\u003d\u0027iconchecksi-187\u0027 style\u003d\u0027display:none;\u0027\u003e\u003c/i\u003e\u003cinput style\u003d\u0027display:none;\u0027 type\u003d\u0027checkbox\u0027 id\u003d\u0027subintervencion-187\u0027 class\u003d\u0027subintervencion subintervencion-30\u0027  value\u003d \u0027187\u0027\u003e\u003c/a\u003e\u003c/li\u003e\u003cli class\u003d\u0027submenuInt\u0027\u003e\u003ca class\u003d\u0027test\u0027 href\u003d\u0027#\u0027 onclick\u003d\u0027checkChildrenInt(189);\u0027\u003e\u003csmall class\u003d\u0027txtmenu\u0027\u003eSPLITTER MAYOR A 300 METROS\u003c/small\u003e\u003ci class\u003d\u0027fa fa-check-square-o checkbox-Int txtmenu\u0027 id\u003d\u0027iconchecksi-189\u0027 style\u003d\u0027display:none;\u0027\u003e\u003c/i\u003e\u003cinput style\u003d\u0027display:none;\u0027 type\u003d\u0027checkbox\u0027 id\u003d\u0027subintervencion-189\u0027 class\u003d\u0027subintervencion subintervencion-30\u0027  value\u003d \u0027189\u0027\u003e\u003c/a\u003e\u003c/li\u003e\u003cli class\u003d\u0027submenuInt\u0027\u003e\u003ca class\u003d\u0027test\u0027 href\u003d\u0027#\u0027 onclick\u003d\u0027checkChildrenInt(190);\u0027\u003e\u003csmall class\u003d\u0027txtmenu\u0027\u003eZONA SIN POSTERIA\u003c/small\u003e\u003ci class\u003d\u0027fa fa-check-square-o checkbox-Int txtmenu\u0027 id\u003d\u0027iconchecksi-190\u0027 style\u003d\u0027display:none;\u0027\u003e\u003c/i\u003e\u003cinput style\u003d\u0027display:none;\u0027 type\u003d\u0027checkbox\u0027 id\u003d\u0027subintervencion-190\u0027 class\u003d\u0027subintervencion subintervencion-30\u0027  value\u003d \u0027190\u0027\u003e\u003c/a\u003e\u003c/li\u003e\u003cli class\u003d\u0027submenuInt\u0027\u003e\u003ca class\u003d\u0027test\u0027 href\u003d\u0027#\u0027 onclick\u003d\u0027checkChildrenInt(1806);\u0027\u003e\u003csmall class\u003d\u0027txtmenu\u0027\u003eROBO DE PUERTO\u003c/small\u003e\u003ci class\u003d\u0027fa fa-check-square-o checkbox-Int txtmenu\u0027 id\u003d\u0027iconchecksi-1806\u0027 style\u003d\u0027display:none;\u0027\u003e\u003c/i\u003e\u003cinput style\u003d\u0027display:none;\u0027 type\u003d\u0027checkbox\u0027 id\u003d\u0027subintervencion-1806\u0027 class\u003d\u0027subintervencion subintervencion-30\u0027  value\u003d \u00271806\u0027\u003e\u003c/a\u003e\u003c/li\u003e\u003c/ul\u003e\u003c/li\u003e\u003cli class\u003d\u0027dropdownInt fatherInt\u0027\u003e\u003ca href\u003d\u0027#\u0027 class\u003d\u0027dropdown-toggle intervencion-97\u0027 onclick\u003d\u0027checkfatherInt(97);\u0027\u003e\u003csmall class\u003d\u0027txtmenupin\u0027\u003eINSPECTOR DE RED\u003c/small\u003e\u003ci class\u003d\u0027fa fa-check-square-o checkbox-Int txtmenu\u0027 id\u003d\u0027iconcheckInt-97\u0027 style\u003d\u0027display:none;\u0027\u003e\u003c/i\u003e\u003cinput style\u003d\u0027display:none;\u0027 type\u003d\u0027checkbox\u0027 id\u003d\u0027intervencionInt-97\u0027  class\u003d\u0027intervencion\u0027 value\u003d \u002797\u0027\u003e\u003c/a\u003e\u003cul class\u003d\u0027sub-menu\u0027 id\u003d\u0027intervencionNL-97\u0027\u003e\u003cli class\u003d\u0027submenuInt\u0027\u003e\u003ca class\u003d\u0027test\u0027 href\u003d\u0027#\u0027 onclick\u003d\u0027checkChildrenInt(98);\u0027\u003e\u003csmall class\u003d\u0027txtmenu\u0027\u003ePOSTES\u003c/small\u003e\u003ci class\u003d\u0027fa fa-check-square-o checkbox-Int txtmenu\u0027 id\u003d\u0027iconchecksi-98\u0027 style\u003d\u0027display:none;\u0027\u003e\u003c/i\u003e\u003cinput style\u003d\u0027display:none;\u0027 type\u003d\u0027checkbox\u0027 id\u003d\u0027subintervencion-98\u0027 class\u003d\u0027subintervencion subintervencion-97\u0027  value\u003d \u002798\u0027\u003e\u003c/a\u003e\u003c/li\u003e\u003cli class\u003d\u0027submenuInt\u0027\u003e\u003ca class\u003d\u0027test\u0027 href\u003d\u0027#\u0027 onclick\u003d\u0027checkChildrenInt(99);\u0027\u003e\u003csmall class\u003d\u0027txtmenu\u0027\u003eACOMETIDAS\u003c/small\u003e\u003ci class\u003d\u0027fa fa-check-square-o checkbox-Int txtmenu\u0027 id\u003d\u0027iconchecksi-99\u0027 style\u003d\u0027display:none;\u0027\u003e\u003c/i\u003e\u003cinput style\u003d\u0027display:none;\u0027 type\u003d\u0027checkbox\u0027 id\u003d\u0027subintervencion-99\u0027 class\u003d\u0027subintervencion subintervencion-97\u0027  value\u003d \u002799\u0027\u003e\u003c/a\u003e\u003c/li\u003e\u003cli class\u003d\u0027submenuInt\u0027\u003e\u003ca class\u003d\u0027test\u0027 href\u003d\u0027#\u0027 onclick\u003d\u0027checkChildrenInt(100);\u0027\u003e\u003csmall class\u003d\u0027txtmenu\u0027\u003eETIQUETADO\u003c/small\u003e\u003ci class\u003d\u0027fa fa-check-square-o checkbox-Int txtmenu\u0027 id\u003d\u0027iconchecksi-100\u0027 style\u003d\u0027display:none;\u0027\u003e\u003c/i\u003e\u003cinput style\u003d\u0027display:none;\u0027 type\u003d\u0027checkbox\u0027 id\u003d\u0027subintervencion-100\u0027 class\u003d\u0027subintervencion subintervencion-97\u0027  value\u003d \u0027100\u0027\u003e\u003c/a\u003e\u003c/li\u003e\u003cli class\u003d\u0027submenuInt\u0027\u003e\u003ca class\u003d\u0027test\u0027 href\u003d\u0027#\u0027 onclick\u003d\u0027checkChildrenInt(101);\u0027\u003e\u003csmall class\u003d\u0027txtmenu\u0027\u003eRUTAS\u003c/small\u003e\u003ci class\u003d\u0027fa fa-check-square-o checkbox-Int txtmenu\u0027 id\u003d\u0027iconchecksi-101\u0027 style\u003d\u0027display:none;\u0027\u003e\u003c/i\u003e\u003cinput style\u003d\u0027display:none;\u0027 type\u003d\u0027checkbox\u0027 id\u003d\u0027subintervencion-101\u0027 class\u003d\u0027subintervencion subintervencion-97\u0027  value\u003d \u0027101\u0027\u003e\u003c/a\u003e\u003c/li\u003e\u003cli class\u003d\u0027submenuInt\u0027\u003e\u003ca class\u003d\u0027test\u0027 href\u003d\u0027#\u0027 onclick\u003d\u0027checkChildrenInt(102);\u0027\u003e\u003csmall class\u003d\u0027txtmenu\u0027\u003eGASA\u003c/small\u003e\u003ci class\u003d\u0027fa fa-check-square-o checkbox-Int txtmenu\u0027 id\u003d\u0027iconchecksi-102\u0027 style\u003d\u0027display:none;\u0027\u003e\u003c/i\u003e\u003cinput style\u003d\u0027display:none;\u0027 type\u003d\u0027checkbox\u0027 id\u003d\u0027subintervencion-102\u0027 class\u003d\u0027subintervencion subintervencion-97\u0027  value\u003d \u0027102\u0027\u003e\u003c/a\u003e\u003c/li\u003e\u003cli class\u003d\u0027submenuInt\u0027\u003e\u003ca class\u003d\u0027test\u0027 href\u003d\u0027#\u0027 onclick\u003d\u0027checkChildrenInt(103);\u0027\u003e\u003csmall class\u003d\u0027txtmenu\u0027\u003eCIERRE\u003c/small\u003e\u003ci class\u003d\u0027fa fa-check-square-o checkbox-Int txtmenu\u0027 id\u003d\u0027iconchecksi-103\u0027 style\u003d\u0027display:none;\u0027\u003e\u003c/i\u003e\u003cinput style\u003d\u0027display:none;\u0027 type\u003d\u0027checkbox\u0027 id\u003d\u0027subintervencion-103\u0027 class\u003d\u0027subintervencion subintervencion-97\u0027  value\u003d \u0027103\u0027\u003e\u003c/a\u003e\u003c/li\u003e\u003cli class\u003d\u0027submenuInt\u0027\u003e\u003ca class\u003d\u0027test\u0027 href\u003d\u0027#\u0027 onclick\u003d\u0027checkChildrenInt(130);\u0027\u003e\u003csmall class\u003d\u0027txtmenu\u0027\u003eANEXOS\u003c/small\u003e\u003ci class\u003d\u0027fa fa-check-square-o checkbox-Int txtmenu\u0027 id\u003d\u0027iconchecksi-130\u0027 style\u003d\u0027display:none;\u0027\u003e\u003c/i\u003e\u003cinput style\u003d\u0027display:none;\u0027 type\u003d\u0027checkbox\u0027 id\u003d\u0027subintervencion-130\u0027 class\u003d\u0027subintervencion subintervencion-97\u0027  value\u003d \u0027130\u0027\u003e\u003c/a\u003e\u003c/li\u003e\u003cli class\u003d\u0027submenuInt\u0027\u003e\u003ca class\u003d\u0027test\u0027 href\u003d\u0027#\u0027 onclick\u003d\u0027checkChildrenInt(137);\u0027\u003e\u003csmall class\u003d\u0027txtmenu\u0027\u003eRESERVA INS 1\u003c/small\u003e\u003ci class\u003d\u0027fa fa-check-square-o checkbox-Int txtmenu\u0027 id\u003d\u0027iconchecksi-137\u0027 style\u003d\u0027display:none;\u0027\u003e\u003c/i\u003e\u003cinput style\u003d\u0027display:none;\u0027 type\u003d\u0027checkbox\u0027 id\u003d\u0027subintervencion-137\u0027 class\u003d\u0027subintervencion subintervencion-97\u0027  value\u003d \u0027137\u0027\u003e\u003c/a\u003e\u003c/li\u003e\u003cli class\u003d\u0027submenuInt\u0027\u003e\u003ca class\u003d\u0027test\u0027 href\u003d\u0027#\u0027 onclick\u003d\u0027checkChildrenInt(138);\u0027\u003e\u003csmall class\u003d\u0027txtmenu\u0027\u003eRESERVA INS 2\u003c/small\u003e\u003ci class\u003d\u0027fa fa-check-square-o checkbox-Int txtmenu\u0027 id\u003d\u0027iconchecksi-138\u0027 style\u003d\u0027display:none;\u0027\u003e\u003c/i\u003e\u003cinput style\u003d\u0027display:none;\u0027 type\u003d\u0027checkbox\u0027 id\u003d\u0027subintervencion-138\u0027 class\u003d\u0027subintervencion subintervencion-97\u0027  value\u003d \u0027138\u0027\u003e\u003c/a\u003e\u003c/li\u003e\u003cli class\u003d\u0027submenuInt\u0027\u003e\u003ca class\u003d\u0027test\u0027 href\u003d\u0027#\u0027 onclick\u003d\u0027checkChildrenInt(139);\u0027\u003e\u003csmall class\u003d\u0027txtmenu\u0027\u003eRESERVA INS 3 \u003c/small\u003e\u003ci class\u003d\u0027fa fa-check-square-o checkbox-Int txtmenu\u0027 id\u003d\u0027iconchecksi-139\u0027 style\u003d\u0027display:none;\u0027\u003e\u003c/i\u003e\u003cinput style\u003d\u0027display:none;\u0027 type\u003d\u0027checkbox\u0027 id\u003d\u0027subintervencion-139\u0027 class\u003d\u0027subintervencion subintervencion-97\u0027  value\u003d \u0027139\u0027\u003e\u003c/a\u003e\u003c/li\u003e\u003cli class\u003d\u0027submenuInt\u0027\u003e\u003ca class\u003d\u0027test\u0027 href\u003d\u0027#\u0027 onclick\u003d\u0027checkChildrenInt(140);\u0027\u003e\u003csmall class\u003d\u0027txtmenu\u0027\u003eRESERVA INS 4\u003c/small\u003e\u003ci class\u003d\u0027fa fa-check-square-o checkbox-Int txtmenu\u0027 id\u003d\u0027iconchecksi-140\u0027 style\u003d\u0027display:none;\u0027\u003e\u003c/i\u003e\u003cinput style\u003d\u0027display:none;\u0027 type\u003d\u0027checkbox\u0027 id\u003d\u0027subintervencion-140\u0027 class\u003d\u0027subintervencion subintervencion-97\u0027  value\u003d \u0027140\u0027\u003e\u003c/a\u003e\u003c/li\u003e\u003c/ul\u003e\u003c/li\u003e\u003cli class\u003d\u0027dropdownInt fatherInt\u0027\u003e\u003ca href\u003d\u0027#\u0027 class\u003d\u0027dropdown-toggle intervencion-119\u0027 onclick\u003d\u0027checkfatherInt(119);\u0027\u003e\u003csmall class\u003d\u0027txtmenupin\u0027\u003eCORTE MASIVO\u003c/small\u003e\u003ci class\u003d\u0027fa fa-check-square-o checkbox-Int txtmenu\u0027 id\u003d\u0027iconcheckInt-119\u0027 style\u003d\u0027display:none;\u0027\u003e\u003c/i\u003e\u003cinput style\u003d\u0027display:none;\u0027 type\u003d\u0027checkbox\u0027 id\u003d\u0027intervencionInt-119\u0027  class\u003d\u0027intervencion\u0027 value\u003d \u0027119\u0027\u003e\u003c/a\u003e\u003cul class\u003d\u0027sub-menu\u0027 id\u003d\u0027intervencionNL-119\u0027\u003e\u003cli class\u003d\u0027submenuInt\u0027\u003e\u003ca class\u003d\u0027test\u0027 href\u003d\u0027#\u0027 onclick\u003d\u0027checkChildrenInt(118);\u0027\u003e\u003csmall class\u003d\u0027txtmenu\u0027\u003eCORTE MASIVO\u003c/small\u003e\u003ci class\u003d\u0027fa fa-check-square-o checkbox-Int txtmenu\u0027 id\u003d\u0027iconchecksi-118\u0027 style\u003d\u0027display:none;\u0027\u003e\u003c/i\u003e\u003cinput style\u003d\u0027display:none;\u0027 type\u003d\u0027checkbox\u0027 id\u003d\u0027subintervencion-118\u0027 class\u003d\u0027subintervencion subintervencion-119\u0027  value\u003d \u0027118\u0027\u003e\u003c/a\u003e\u003c/li\u003e\u003c/ul\u003e\u003c/li\u003e\u003cli class\u003d\u0027dropdownInt fatherInt\u0027\u003e\u003ca href\u003d\u0027#\u0027 class\u003d\u0027dropdown-toggle intervencion-127\u0027 onclick\u003d\u0027checkfatherInt(127);\u0027\u003e\u003csmall class\u003d\u0027txtmenupin\u0027\u003eMANTENIMIENTO PREVENTIVO PI\u003c/small\u003e\u003ci class\u003d\u0027fa fa-check-square-o checkbox-Int txtmenu\u0027 id\u003d\u0027iconcheckInt-127\u0027 style\u003d\u0027display:none;\u0027\u003e\u003c/i\u003e\u003cinput style\u003d\u0027display:none;\u0027 type\u003d\u0027checkbox\u0027 id\u003d\u0027intervencionInt-127\u0027  class\u003d\u0027intervencion\u0027 value\u003d \u0027127\u0027\u003e\u003c/a\u003e\u003cul class\u003d\u0027sub-menu\u0027 id\u003d\u0027intervencionNL-127\u0027\u003e\u003cli class\u003d\u0027submenuInt\u0027\u003e\u003ca class\u003d\u0027test\u0027 href\u003d\u0027#\u0027 onclick\u003d\u0027checkChildrenInt(128);\u0027\u003e\u003csmall class\u003d\u0027txtmenu\u0027\u003eDESVIACION\u003c/small\u003e\u003ci class\u003d\u0027fa fa-check-square-o checkbox-Int txtmenu\u0027 id\u003d\u0027iconchecksi-128\u0027 style\u003d\u0027display:none;\u0027\u003e\u003c/i\u003e\u003cinput style\u003d\u0027display:none;\u0027 type\u003d\u0027checkbox\u0027 id\u003d\u0027subintervencion-128\u0027 class\u003d\u0027subintervencion subintervencion-127\u0027  value\u003d \u0027128\u0027\u003e\u003c/a\u003e\u003c/li\u003e\u003cli class\u003d\u0027submenuInt\u0027\u003e\u003ca class\u003d\u0027test\u0027 href\u003d\u0027#\u0027 onclick\u003d\u0027checkChildrenInt(129);\u0027\u003e\u003csmall class\u003d\u0027txtmenu\u0027\u003eSPLITTER\u003c/small\u003e\u003ci class\u003d\u0027fa fa-check-square-o checkbox-Int txtmenu\u0027 id\u003d\u0027iconchecksi-129\u0027 style\u003d\u0027display:none;\u0027\u003e\u003c/i\u003e\u003cinput style\u003d\u0027display:none;\u0027 type\u003d\u0027checkbox\u0027 id\u003d\u0027subintervencion-129\u0027 class\u003d\u0027subintervencion subintervencion-127\u0027  value\u003d \u0027129\u0027\u003e\u003c/a\u003e\u003c/li\u003e\u003cli class\u003d\u0027submenuInt\u0027\u003e\u003ca class\u003d\u0027test\u0027 href\u003d\u0027#\u0027 onclick\u003d\u0027checkChildrenInt(131);\u0027\u003e\u003csmall class\u003d\u0027txtmenu\u0027\u003eMANTENIMIENTO MAYOR\u003c/small\u003e\u003ci class\u003d\u0027fa fa-check-square-o checkbox-Int txtmenu\u0027 id\u003d\u0027iconchecksi-131\u0027 style\u003d\u0027display:none;\u0027\u003e\u003c/i\u003e\u003cinput style\u003d\u0027display:none;\u0027 type\u003d\u0027checkbox\u0027 id\u003d\u0027subintervencion-131\u0027 class\u003d\u0027subintervencion subintervencion-127\u0027  value\u003d \u0027131\u0027\u003e\u003c/a\u003e\u003c/li\u003e\u003cli class\u003d\u0027submenuInt\u0027\u003e\u003ca class\u003d\u0027test\u0027 href\u003d\u0027#\u0027 onclick\u003d\u0027checkChildrenInt(132);\u0027\u003e\u003csmall class\u003d\u0027txtmenu\u0027\u003eMANTENIMIENTO MENOR\u003c/small\u003e\u003ci class\u003d\u0027fa fa-check-square-o checkbox-Int txtmenu\u0027 id\u003d\u0027iconchecksi-132\u0027 style\u003d\u0027display:none;\u0027\u003e\u003c/i\u003e\u003cinput style\u003d\u0027display:none;\u0027 type\u003d\u0027checkbox\u0027 id\u003d\u0027subintervencion-132\u0027 class\u003d\u0027subintervencion subintervencion-127\u0027  value\u003d \u0027132\u0027\u003e\u003c/a\u003e\u003c/li\u003e\u003cli class\u003d\u0027submenuInt\u0027\u003e\u003ca class\u003d\u0027test\u0027 href\u003d\u0027#\u0027 onclick\u003d\u0027checkChildrenInt(133);\u0027\u003e\u003csmall class\u003d\u0027txtmenu\u0027\u003eRESERVA PIPE 1\u003c/small\u003e\u003ci class\u003d\u0027fa fa-check-square-o checkbox-Int txtmenu\u0027 id\u003d\u0027iconchecksi-133\u0027 style\u003d\u0027display:none;\u0027\u003e\u003c/i\u003e\u003cinput style\u003d\u0027display:none;\u0027 type\u003d\u0027checkbox\u0027 id\u003d\u0027subintervencion-133\u0027 class\u003d\u0027subintervencion subintervencion-127\u0027  value\u003d \u0027133\u0027\u003e\u003c/a\u003e\u003c/li\u003e\u003cli class\u003d\u0027submenuInt\u0027\u003e\u003ca class\u003d\u0027test\u0027 href\u003d\u0027#\u0027 onclick\u003d\u0027checkChildrenInt(134);\u0027\u003e\u003csmall class\u003d\u0027txtmenu\u0027\u003eRESERVA PIPE 2\u003c/small\u003e\u003ci class\u003d\u0027fa fa-check-square-o checkbox-Int txtmenu\u0027 id\u003d\u0027iconchecksi-134\u0027 style\u003d\u0027display:none;\u0027\u003e\u003c/i\u003e\u003cinput style\u003d\u0027display:none;\u0027 type\u003d\u0027checkbox\u0027 id\u003d\u0027subintervencion-134\u0027 class\u003d\u0027subintervencion subintervencion-127\u0027  value\u003d \u0027134\u0027\u003e\u003c/a\u003e\u003c/li\u003e\u003cli class\u003d\u0027submenuInt\u0027\u003e\u003ca class\u003d\u0027test\u0027 href\u003d\u0027#\u0027 onclick\u003d\u0027checkChildrenInt(135);\u0027\u003e\u003csmall class\u003d\u0027txtmenu\u0027\u003eRESERVA PIPE 3\u003c/small\u003e\u003ci class\u003d\u0027fa fa-check-square-o checkbox-Int txtmenu\u0027 id\u003d\u0027iconchecksi-135\u0027 style\u003d\u0027display:none;\u0027\u003e\u003c/i\u003e\u003cinput style\u003d\u0027display:none;\u0027 type\u003d\u0027checkbox\u0027 id\u003d\u0027subintervencion-135\u0027 class\u003d\u0027subintervencion subintervencion-127\u0027  value\u003d \u0027135\u0027\u003e\u003c/a\u003e\u003c/li\u003e\u003cli class\u003d\u0027submenuInt\u0027\u003e\u003ca class\u003d\u0027test\u0027 href\u003d\u0027#\u0027 onclick\u003d\u0027checkChildrenInt(136);\u0027\u003e\u003csmall class\u003d\u0027txtmenu\u0027\u003eINSPECCION DE CALIDAD\u003c/small\u003e\u003ci class\u003d\u0027fa fa-check-square-o checkbox-Int txtmenu\u0027 id\u003d\u0027iconchecksi-136\u0027 style\u003d\u0027display:none;\u0027\u003e\u003c/i\u003e\u003cinput style\u003d\u0027display:none;\u0027 type\u003d\u0027checkbox\u0027 id\u003d\u0027subintervencion-136\u0027 class\u003d\u0027subintervencion subintervencion-127\u0027  value\u003d \u0027136\u0027\u003e\u003c/a\u003e\u003c/li\u003e\u003cli class\u003d\u0027submenuInt\u0027\u003e\u003ca class\u003d\u0027test\u0027 href\u003d\u0027#\u0027 onclick\u003d\u0027checkChildrenInt(246);\u0027\u003e\u003csmall class\u003d\u0027txtmenu\u0027\u003eHALLAZGO EMPRESARIAL\u003c/small\u003e\u003ci class\u003d\u0027fa fa-check-square-o checkbox-Int txtmenu\u0027 id\u003d\u0027iconchecksi-246\u0027 style\u003d\u0027display:none;\u0027\u003e\u003c/i\u003e\u003cinput style\u003d\u0027display:none;\u0027 type\u003d\u0027checkbox\u0027 id\u003d\u0027subintervencion-246\u0027 class\u003d\u0027subintervencion subintervencion-127\u0027  value\u003d \u0027246\u0027\u003e\u003c/a\u003e\u003c/li\u003e\u003c/ul\u003e\u003c/li\u003e\u003cli class\u003d\u0027dropdownInt fatherInt\u0027\u003e\u003ca href\u003d\u0027#\u0027 class\u003d\u0027dropdown-toggle intervencion-153\u0027 onclick\u003d\u0027checkfatherInt(153);\u0027\u003e\u003csmall class\u003d\u0027txtmenupin\u0027\u003ePLANTA EXTERNA TX\u003c/small\u003e\u003ci class\u003d\u0027fa fa-check-square-o checkbox-Int txtmenu\u0027 id\u003d\u0027iconcheckInt-153\u0027 style\u003d\u0027display:none;\u0027\u003e\u003c/i\u003e\u003cinput style\u003d\u0027display:none;\u0027 type\u003d\u0027checkbox\u0027 id\u003d\u0027intervencionInt-153\u0027  class\u003d\u0027intervencion\u0027 value\u003d \u0027153\u0027\u003e\u003c/a\u003e\u003cul class\u003d\u0027sub-menu\u0027 id\u003d\u0027intervencionNL-153\u0027\u003e\u003cli class\u003d\u0027submenuInt\u0027\u003e\u003ca class\u003d\u0027test\u0027 href\u003d\u0027#\u0027 onclick\u003d\u0027checkChildrenInt(229);\u0027\u003e\u003csmall class\u003d\u0027txtmenu\u0027\u003eSPLITTER SIN POTENCIA\u003c/small\u003e\u003ci class\u003d\u0027fa fa-check-square-o checkbox-Int txtmenu\u0027 id\u003d\u0027iconchecksi-229\u0027 style\u003d\u0027display:none;\u0027\u003e\u003c/i\u003e\u003cinput style\u003d\u0027display:none;\u0027 type\u003d\u0027checkbox\u0027 id\u003d\u0027subintervencion-229\u0027 class\u003d\u0027subintervencion subintervencion-153\u0027  value\u003d \u0027229\u0027\u003e\u003c/a\u003e\u003c/li\u003e\u003cli class\u003d\u0027submenuInt\u0027\u003e\u003ca class\u003d\u0027test\u0027 href\u003d\u0027#\u0027 onclick\u003d\u0027checkChildrenInt(230);\u0027\u003e\u003csmall class\u003d\u0027txtmenu\u0027\u003eANCHO DE BANDA INSUFICIENTE\u003c/small\u003e\u003ci class\u003d\u0027fa fa-check-square-o checkbox-Int txtmenu\u0027 id\u003d\u0027iconchecksi-230\u0027 style\u003d\u0027display:none;\u0027\u003e\u003c/i\u003e\u003cinput style\u003d\u0027display:none;\u0027 type\u003d\u0027checkbox\u0027 id\u003d\u0027subintervencion-230\u0027 class\u003d\u0027subintervencion subintervencion-153\u0027  value\u003d \u0027230\u0027\u003e\u003c/a\u003e\u003c/li\u003e\u003cli class\u003d\u0027submenuInt\u0027\u003e\u003ca class\u003d\u0027test\u0027 href\u003d\u0027#\u0027 onclick\u003d\u0027checkChildrenInt(231);\u0027\u003e\u003csmall class\u003d\u0027txtmenu\u0027\u003eZONA SIN POSTERIA\u003c/small\u003e\u003ci class\u003d\u0027fa fa-check-square-o checkbox-Int txtmenu\u0027 id\u003d\u0027iconchecksi-231\u0027 style\u003d\u0027display:none;\u0027\u003e\u003c/i\u003e\u003cinput style\u003d\u0027display:none;\u0027 type\u003d\u0027checkbox\u0027 id\u003d\u0027subintervencion-231\u0027 class\u003d\u0027subintervencion subintervencion-153\u0027  value\u003d \u0027231\u0027\u003e\u003c/a\u003e\u003c/li\u003e\u003cli class\u003d\u0027submenuInt\u0027\u003e\u003ca class\u003d\u0027test\u0027 href\u003d\u0027#\u0027 onclick\u003d\u0027checkChildrenInt(232);\u0027\u003e\u003csmall class\u003d\u0027txtmenu\u0027\u003eSPLITTER A MAS DE 300 METROS\u003c/small\u003e\u003ci class\u003d\u0027fa fa-check-square-o checkbox-Int txtmenu\u0027 id\u003d\u0027iconchecksi-232\u0027 style\u003d\u0027display:none;\u0027\u003e\u003c/i\u003e\u003cinput style\u003d\u0027display:none;\u0027 type\u003d\u0027checkbox\u0027 id\u003d\u0027subintervencion-232\u0027 class\u003d\u0027subintervencion subintervencion-153\u0027  value\u003d \u0027232\u0027\u003e\u003c/a\u003e\u003c/li\u003e\u003cli class\u003d\u0027submenuInt\u0027\u003e\u003ca class\u003d\u0027test\u0027 href\u003d\u0027#\u0027 onclick\u003d\u0027checkChildrenInt(233);\u0027\u003e\u003csmall class\u003d\u0027txtmenu\u0027\u003eSPLITTER ATENUADO\u003c/small\u003e\u003ci class\u003d\u0027fa fa-check-square-o checkbox-Int txtmenu\u0027 id\u003d\u0027iconchecksi-233\u0027 style\u003d\u0027display:none;\u0027\u003e\u003c/i\u003e\u003cinput style\u003d\u0027display:none;\u0027 type\u003d\u0027checkbox\u0027 id\u003d\u0027subintervencion-233\u0027 class\u003d\u0027subintervencion subintervencion-153\u0027  value\u003d \u0027233\u0027\u003e\u003c/a\u003e\u003c/li\u003e\u003cli class\u003d\u0027submenuInt\u0027\u003e\u003ca class\u003d\u0027test\u0027 href\u003d\u0027#\u0027 onclick\u003d\u0027checkChildrenInt(234);\u0027\u003e\u003csmall class\u003d\u0027txtmenu\u0027\u003eSPLITTER PUERTOS DAÑADOS\u003c/small\u003e\u003ci class\u003d\u0027fa fa-check-square-o checkbox-Int txtmenu\u0027 id\u003d\u0027iconchecksi-234\u0027 style\u003d\u0027display:none;\u0027\u003e\u003c/i\u003e\u003cinput style\u003d\u0027display:none;\u0027 type\u003d\u0027checkbox\u0027 id\u003d\u0027subintervencion-234\u0027 class\u003d\u0027subintervencion subintervencion-153\u0027  value\u003d \u0027234\u0027\u003e\u003c/a\u003e\u003c/li\u003e\u003cli class\u003d\u0027submenuInt\u0027\u003e\u003ca class\u003d\u0027test\u0027 href\u003d\u0027#\u0027 onclick\u003d\u0027checkChildrenInt(235);\u0027\u003e\u003csmall class\u003d\u0027txtmenu\u0027\u003eSPLITTER SATURADO\u003c/small\u003e\u003ci class\u003d\u0027fa fa-check-square-o checkbox-Int txtmenu\u0027 id\u003d\u0027iconchecksi-235\u0027 style\u003d\u0027display:none;\u0027\u003e\u003c/i\u003e\u003cinput style\u003d\u0027display:none;\u0027 type\u003d\u0027checkbox\u0027 id\u003d\u0027subintervencion-235\u0027 class\u003d\u0027subintervencion subintervencion-153\u0027  value\u003d \u0027235\u0027\u003e\u003c/a\u003e\u003c/li\u003e\u003cli class\u003d\u0027submenuInt\u0027\u003e\u003ca class\u003d\u0027test\u0027 href\u003d\u0027#\u0027 onclick\u003d\u0027checkChildrenInt(239);\u0027\u003e\u003csmall class\u003d\u0027txtmenu\u0027\u003eSPLITTER NO ILUMINADO\u003c/small\u003e\u003ci class\u003d\u0027fa fa-check-square-o checkbox-Int txtmenu\u0027 id\u003d\u0027iconchecksi-239\u0027 style\u003d\u0027display:none;\u0027\u003e\u003c/i\u003e\u003cinput style\u003d\u0027display:none;\u0027 type\u003d\u0027checkbox\u0027 id\u003d\u0027subintervencion-239\u0027 class\u003d\u0027subintervencion subintervencion-153\u0027  value\u003d \u0027239\u0027\u003e\u003c/a\u003e\u003c/li\u003e\u003cli class\u003d\u0027submenuInt\u0027\u003e\u003ca class\u003d\u0027test\u0027 href\u003d\u0027#\u0027 onclick\u003d\u0027checkChildrenInt(240);\u0027\u003e\u003csmall class\u003d\u0027txtmenu\u0027\u003eSPLITTER BAJA POTENCIA\u003c/small\u003e\u003ci class\u003d\u0027fa fa-check-square-o checkbox-Int txtmenu\u0027 id\u003d\u0027iconchecksi-240\u0027 style\u003d\u0027display:none;\u0027\u003e\u003c/i\u003e\u003cinput style\u003d\u0027display:none;\u0027 type\u003d\u0027checkbox\u0027 id\u003d\u0027subintervencion-240\u0027 class\u003d\u0027subintervencion subintervencion-153\u0027  value\u003d \u0027240\u0027\u003e\u003c/a\u003e\u003c/li\u003e\u003cli class\u003d\u0027submenuInt\u0027\u003e\u003ca class\u003d\u0027test\u0027 href\u003d\u0027#\u0027 onclick\u003d\u0027checkChildrenInt(241);\u0027\u003e\u003csmall class\u003d\u0027txtmenu\u0027\u003eSPLITTER SIN POTENCIA\u003c/small\u003e\u003ci class\u003d\u0027fa fa-check-square-o checkbox-Int txtmenu\u0027 id\u003d\u0027iconchecksi-241\u0027 style\u003d\u0027display:none;\u0027\u003e\u003c/i\u003e\u003cinput style\u003d\u0027display:none;\u0027 type\u003d\u0027checkbox\u0027 id\u003d\u0027subintervencion-241\u0027 class\u003d\u0027subintervencion subintervencion-153\u0027  value\u003d \u0027241\u0027\u003e\u003c/a\u003e\u003c/li\u003e\u003cli class\u003d\u0027submenuInt\u0027\u003e\u003ca class\u003d\u0027test\u0027 href\u003d\u0027#\u0027 onclick\u003d\u0027checkChildrenInt(242);\u0027\u003e\u003csmall class\u003d\u0027txtmenu\u0027\u003eBACKLOG TX\u003c/small\u003e\u003ci class\u003d\u0027fa fa-check-square-o checkbox-Int txtmenu\u0027 id\u003d\u0027iconchecksi-242\u0027 style\u003d\u0027display:none;\u0027\u003e\u003c/i\u003e\u003cinput style\u003d\u0027display:none;\u0027 type\u003d\u0027checkbox\u0027 id\u003d\u0027subintervencion-242\u0027 class\u003d\u0027subintervencion subintervencion-153\u0027  value\u003d \u0027242\u0027\u003e\u003c/a\u003e\u003c/li\u003e\u003c/ul\u003e\u003c/li\u003e",
            "cluster": "1,189,2,1038,1039,1040,1041,1042,1043,1044,1045,968,164,207,43,124,591,17,73,1037,1500,1136,1501,1352,1353,1222,1487,1488,1489,1171,74,1354,1490,1771,1355,1223,1491,1224,1772,1492,1225,1226,1675,1356,1133,1676,208,1677,1493,1678,83,1357,1509,1175,1176,44,1177,156,1241,165,1502,1137,1361,1773,1138,1684,1046,1685,1362,1686,125,1230,1363,1139,1503,1504,1505,1687,1506,435,1364,1688,1365,1774,1775,1231,1507,1140,1232,1679,1227,1680,18,1134,1494,1495,592,1776,1681,1228,28,1135,1358,969,1359,1172,1496,1032,1497,1229,1682,1360,1498,1027,1499,1683,1182,1518,1692,1778,1374,1375,114,1376,1377,1519,1386,1378,1247,1183,1693,1520,1694,1521,1242,1510,1178,1511,1243,1512,594,1777,1048,1244,1370,1371,1513,1179,1514,1691,1515,1245,175,1516,1049,459,1246,104,1366,1233,1022,1234,1235,1236,1367,1141,1237,92,1368,1173,1238,1239,1689,1240,1508,1174,1369,216,1690,1047,1077,1078,1079,1080,1081,1082,1083,1084,1085,1086,1087,1253,1697,528,1781,1383,190,1530,1384,1698,198,1531,1533,1385,1534,1254,1532,1051,1248,1522,1779,1249,1379,1250,1251,1380,1523,1524,1525,3,1052,1526,1381,593,1780,1142,1527,1382,1695,1252,1528,1529,1696,1073,1074,1075,1076,1372,1180,1050,1181,1373,1517,429,1091,1092,1093,1094,1095,1096,1097,1098,1099,1100,1101,1102,1286,1721,851,1792,1418,191,1578,1419,1722,199,1579,716,1581,1420,1582,1287,1580,1058,1281,1570,1790,1282,1414,1283,1284,1415,1571,1572,1573,4,1947,1059,718,715,1574,1416,597,1791,1152,1575,1417,722,721,1719,1285,1576,1577,1720,1088,1089,1090,1407,1193,1057,1194,1408,1565,568,1195,1566,1716,1789,1409,1410,115,1411,1412,1567,709,1421,1413,1280,1196,1717,1568,1718,703,1569,1275,680,2119,678,681,682,679,1558,720,708,898,723,1191,1559,1276,1560,598,1788,1055,1277,714,1405,1406,1561,1192,1562,1943,1715,712,1563,1278,176,1945,1564,1056,575,1279,105,1265,1401,1266,1023,1267,694,1268,1269,713,1402,1151,691,1270,93,1403,1186,1271,693,724,1272,1713,1273,1556,1187,1404,217,1714,1054,1557,1188,1189,1190,157,1274,1549,166,1550,1147,970,1396,1784,1148,704,1708,1053,1709,689,1397,1710,1263,717,1398,1149,1551,1552,1553,1711,1554,570,1399,1712,1400,1785,1786,1264,707,1555,1150,1703,1260,692,1704,19,1144,1542,1543,1787,1705,1261,29,1145,1393,1394,1185,702,1544,1033,1545,775,1262,688,1706,1395,710,725,1546,1028,1547,1707,1548,1146,1387,1388,1255,1535,1536,1537,1184,706,75,1389,1538,1782,1390,1256,1539,705,1257,1783,1540,1258,719,1259,690,1699,1391,1143,1700,209,1701,1541,1702,84,1392,910,167,171,5,20,30,76,85,94,106,116,158,177,192,200,210,218,288,379,683,684,685,686,687,695,696,697,698,699,700,701,726,727,728,729,730,731,732,733,734,736,737,738,739,740,741,742,743,744,745,746,747,748,749,776,899,973,978,994,999,1024,1029,1034,1060,1061,1062,1063,1064,1065,1066,1103,1104,1105,1106,1107,1108,1109,1110,1111,1112,1113,1114,1115,1116,1117,1153,1154,1155,1156,1157,1158,1159,1160,1161,1162,1197,1198,1199,1200,1201,1202,1203,1204,1205,1206,1207,1208,1209,1288,1289,1290,1291,1292,1293,1294,1295,1296,1297,1298,1299,1300,1301,1302,1303,1304,1305,1306,1307,1308,1309,1310,1311,1312,1313,1314,1315,1316,1317,1318,1319,1320,1422,1423,1424,1425,1426,1427,1428,1429,1430,1431,1432,1433,1434,1435,1436,1437,1438,1439,1440,1441,1442,1443,1444,1445,1446,1447,1448,1449,1450,1451,1452,1453,1454,1455,1456,1583,1584,1585,1586,1587,1588,1589,1590,1591,1592,1593,1594,1595,1596,1597,1598,1599,1600,1601,1602,1603,1604,1605,1606,1607,1608,1609,1610,1611,1612,1613,1614,1615,1616,1617,1618,1619,1620,1621,1622,1623,1624,1625,1626,1627,1628,1629,1630,1723,1724,1725,1726,1727,1728,1729,1730,1731,1732,1733,1734,1735,1736,1737,1738,1739,1740,1741,1742,1743,1744,1745,1746,1793,1794,1795,1796,1797,1798,1799,1800,1801,1802,1803,1944,1948,2120,971,671,134,60,650,375,1663,1072,1345,1664,1810,1346,1479,1347,1348,1480,1665,1666,1667,922,1668,1481,964,1170,1669,1482,1765,1670,1349,1671,1766,1350,1767,1811,1483,952,1484,1768,955,1673,1485,1674,1351,1672,186,647,154,1000,71,59,606,348,1018,367,187,975,242,304,759,27,72,608,668,383,253,651,285,760,368,610,1338,1651,1213,1471,1127,961,1068,1652,1214,1215,916,943,1339,1653,1128,1129,778,993,1216,1654,1340,779,1655,967,1069,1341,1472,1473,1656,1217,1657,1130,1812,1761,1658,1342,949,1070,1343,940,1218,1071,1219,1474,1659,1220,1660,1762,1131,1809,1475,1476,919,1132,1477,1661,1486,1478,780,1344,1221,1763,1662,1764,1327,928,1461,1119,1462,1211,1640,1641,1328,1753,1463,1642,1643,1754,1644,1164,1645,946,1120,1165,1464,1806,1166,1755,1067,1756,1465,1757,913,1121,1466,1122,1123,1124,1167,1646,1647,1648,1758,1649,1467,1759,1468,1807,1808,1329,1650,1168,1330,1469,1331,1125,1332,1333,1334,1470,1169,1335,937,1212,1336,1126,1337,1760,339,284,340,123,648,113,133,42,366,81,631,609,347,142,624,374,314,292,293,294,264,143,672,214,290,621,353,354,1457,1458,1321,1631,1632,1633,1210,931,1634,1804,1459,1322,1635,1323,1805,1636,1324,1325,1118,1747,1460,1163,1748,958,1637,1749,934,781,777,1750,1326,1751,925,1638,1639,1752,976,643,272,774,266,185,1010,306,617,273,274,262,263,173,338,275,639,258,645,103,616,234,623,267,663,664,1002,371,58,673,151,152,674,69,100,303,644,251,153,661,346,1017,281,282,41,91,372,373,628,627,992,605,637,634,132,604,70,197,283,382,252,174,757,995,1009,40,68,141,619,313,902,656,10,660,384,874,658,97,329,111,90,289,55,150,14,271,364,365,98,112,1036,224,766,196,11,225,249,250,241,163,280,302,622,629,56,603,131,184,633,254,255,155,215,980,632,57,1011,122,99,607,670,205,1030,676,232,233,991,12,974,1025,148,188,53,1013,261,344,161,361,381,675,120,907,82,642,140,363,149,256,180,248,36,611,129,1019,370,37,181,102,182,96,657,646,1008,162,67,328,25,9,222,183,38,652,291,80,130,101,380,26,54,279,977,630,238,223,121,345,239,240,640,39,1012,213,750,751,237,895,212,626,311,78,1003,137,655,203,34,138,50,231,653,118,8,1031,204,221,352,13,109,51,35,321,312,79,139,625,52,666,1005,667,908,909,659,665,613,119,322,128,278,360,654,335,336,323,89,301,754,179,247,901,172,110,1001,905,635,906,755,337,357,343,326,327,265,193,159,219,117,257,77,612,1035,979,32,147,614,641,1020,904,21,107,22,95,65,33,753,350,220,86,87,88,669,319,49,358,310,211,23,638,299,359,972,300,277,108,230,662,24,1004,194,269,270,195,246,351,160,1007,168,169,170,320,66,649,615,317,325,6,201,305,31,7,897,986,987,879,889,1006,875,1015,877,1021,982,890,892,896,900,989,988,1014,893,903,618,876,886,888,981,1016,878,887,990,891,882,883,884,885,984,985,894,880,881,983,47,244,245,318,48,178,308,309,342,146,63,752,64,202,235,330",
            "generic_ids_list": ["30", "30", "30", "30", "30", "30", "30", "30", "30", "30", "30", "30", "97", "97", "97", "97", "97", "97", "97", "97", "97", "97", "97", "97", "119", "119", "127", "127", "127", "127", "127", "127", "127", "127", "127", "127", "153", "153", "153", "153", "153", "153", "153", "153", "153", "153", "153", "153"],
            "listArbolFilter": [{
                "descripcion": "TOTALPLAY EMPRESARIAL",
                "nivel": "0",
                "id": "1",
                "idPadre": "nulo"
            }, {
                "descripcion": "VERACRUZ",
                "nivel": "1",
                "id": "189",
                "idPadre": "1"
            }, {
                "descripcion": "BCN",
                "nivel": "1",
                "id": "2",
                "idPadre": "1"
            }, {
                "descripcion": "REGION 2 TX",
                "nivel": "1",
                "id": "1038",
                "idPadre": "1"
            }, {
                "descripcion": "REGION 3 TX",
                "nivel": "1",
                "id": "1039",
                "idPadre": "1"
            }, {
                "descripcion": "REGION 4 TX",
                "nivel": "1",
                "id": "1040",
                "idPadre": "1"
            }, {
                "descripcion": "REGION 5 TX",
                "nivel": "1",
                "id": "1041",
                "idPadre": "1"
            }, {
                "descripcion": "REGION 6 TX",
                "nivel": "1",
                "id": "1042",
                "idPadre": "1"
            }, {
                "descripcion": "REGION 7 TX",
                "nivel": "1",
                "id": "1043",
                "idPadre": "1"
            }, {
                "descripcion": "REGION 8 TX",
                "nivel": "1",
                "id": "1044",
                "idPadre": "1"
            }, {
                "descripcion": "REGION 9 TX",
                "nivel": "1",
                "id": "1045",
                "idPadre": "1"
            }, {
                "descripcion": "REGION TX",
                "nivel": "1",
                "id": "968",
                "idPadre": "1"
            }, {
                "descripcion": "SUR",
                "nivel": "1",
                "id": "164",
                "idPadre": "1"
            }, {
                "descripcion": "SURESTE",
                "nivel": "1",
                "id": "207",
                "idPadre": "1"
            }, {
                "descripcion": "NORESTE",
                "nivel": "1",
                "id": "43",
                "idPadre": "1"
            }, {
                "descripcion": "OCCIDENTE",
                "nivel": "1",
                "id": "124",
                "idPadre": "1"
            }, {
                "descripcion": "MEGACENTRO",
                "nivel": "1",
                "id": "591",
                "idPadre": "1"
            }, {
                "descripcion": "CHIHUAHUA",
                "nivel": "1",
                "id": "17",
                "idPadre": "1"
            }, {
                "descripcion": "BAJIO",
                "nivel": "1",
                "id": "73",
                "idPadre": "1"
            }, {
                "descripcion": "REGION 1 TX",
                "nivel": "1",
                "id": "1037",
                "idPadre": "1"
            }, {
                "descripcion": "CRUCECITA TX",
                "nivel": "2",
                "id": "1500",
                "idPadre": "1043"
            }, {
                "descripcion": "CUAHUTEMOC TX",
                "nivel": "2",
                "id": "1136",
                "idPadre": "1039"
            }, {
                "descripcion": "CUAUTLA TX",
                "nivel": "2",
                "id": "1501",
                "idPadre": "1043"
            }, {
                "descripcion": "ABASOLO TX",
                "nivel": "2",
                "id": "1352",
                "idPadre": "1042"
            }, {
                "descripcion": "ACAMBARO TX",
                "nivel": "2",
                "id": "1353",
                "idPadre": "1042"
            }, {
                "descripcion": "ACAPONETA TX",
                "nivel": "2",
                "id": "1222",
                "idPadre": "1041"
            }, {
                "descripcion": "ACAPULCO TX",
                "nivel": "2",
                "id": "1487",
                "idPadre": "1043"
            }, {
                "descripcion": "ACAYUCAN TX",
                "nivel": "2",
                "id": "1488",
                "idPadre": "1043"
            }, {
                "descripcion": "ACTOPAN TX",
                "nivel": "2",
                "id": "1489",
                "idPadre": "1043"
            }, {
                "descripcion": "ACUNA TX",
                "nivel": "2",
                "id": "1171",
                "idPadre": "1040"
            }, {
                "descripcion": "AGUASCALIENTES",
                "nivel": "2",
                "id": "74",
                "idPadre": "73"
            }, {
                "descripcion": "AGUASCALIENTES TX",
                "nivel": "2",
                "id": "1354",
                "idPadre": "1042"
            }, {
                "descripcion": "ALVARADO TX",
                "nivel": "2",
                "id": "1490",
                "idPadre": "1043"
            }, {
                "descripcion": "APAN TX",
                "nivel": "2",
                "id": "1771",
                "idPadre": "1045"
            }, {
                "descripcion": "APASEO EL ALTO TX",
                "nivel": "2",
                "id": "1355",
                "idPadre": "1042"
            }, {
                "descripcion": "APATZINGAN TX",
                "nivel": "2",
                "id": "1223",
                "idPadre": "1041"
            }, {
                "descripcion": "APIZACO TX",
                "nivel": "2",
                "id": "1491",
                "idPadre": "1043"
            }, {
                "descripcion": "ARANDAS TX",
                "nivel": "2",
                "id": "1224",
                "idPadre": "1041"
            }, {
                "descripcion": "ATLACOMULCO TX",
                "nivel": "2",
                "id": "1772",
                "idPadre": "1045"
            }, {
                "descripcion": "ATLIXCO TX",
                "nivel": "2",
                "id": "1492",
                "idPadre": "1043"
            }, {
                "descripcion": "AUTLAN DE NAVARRO TX",
                "nivel": "2",
                "id": "1225",
                "idPadre": "1041"
            }, {
                "descripcion": "BAHIA DE BANDERAS TX",
                "nivel": "2",
                "id": "1226",
                "idPadre": "1041"
            }, {
                "descripcion": "CALDERITAS TX",
                "nivel": "2",
                "id": "1675",
                "idPadre": "1044"
            }, {
                "descripcion": "CALVILLO TX",
                "nivel": "2",
                "id": "1356",
                "idPadre": "1042"
            }, {
                "descripcion": "CAMARGO TX",
                "nivel": "2",
                "id": "1133",
                "idPadre": "1039"
            }, {
                "descripcion": "CAMPECHE TX",
                "nivel": "2",
                "id": "1676",
                "idPadre": "1044"
            }, {
                "descripcion": "CANCUN",
                "nivel": "2",
                "id": "208",
                "idPadre": "207"
            }, {
                "descripcion": "CANCUN TX",
                "nivel": "2",
                "id": "1677",
                "idPadre": "1044"
            }, {
                "descripcion": "CARDEL TX",
                "nivel": "2",
                "id": "1493",
                "idPadre": "1043"
            }, {
                "descripcion": "CARDENAS-TABASCO TX",
                "nivel": "2",
                "id": "1678",
                "idPadre": "1044"
            }, {
                "descripcion": "CELAYA",
                "nivel": "2",
                "id": "83",
                "idPadre": "73"
            }, {
                "descripcion": "CELAYA TX",
                "nivel": "2",
                "id": "1357",
                "idPadre": "1042"
            }, {
                "descripcion": "MINATITLAN TX",
                "nivel": "2",
                "id": "1509",
                "idPadre": "1043"
            }, {
                "descripcion": "MONCLOVA TX",
                "nivel": "2",
                "id": "1175",
                "idPadre": "1040"
            }, {
                "descripcion": "MONTEMORELOS TX",
                "nivel": "2",
                "id": "1176",
                "idPadre": "1040"
            }, {
                "descripcion": "MONTERREY",
                "nivel": "2",
                "id": "44",
                "idPadre": "43"
            }, {
                "descripcion": "MONTERREY TX",
                "nivel": "2",
                "id": "1177",
                "idPadre": "1040"
            }, {
                "descripcion": "MORELIA",
                "nivel": "2",
                "id": "156",
                "idPadre": "124"
            }, {
                "descripcion": "MORELIA TX",
                "nivel": "2",
                "id": "1241",
                "idPadre": "1041"
            }, {
                "descripcion": "CUERNAVACA",
                "nivel": "2",
                "id": "165",
                "idPadre": "164"
            }, {
                "descripcion": "CUERNAVACA TX",
                "nivel": "2",
                "id": "1502",
                "idPadre": "1043"
            }, {
                "descripcion": "DELICIAS TX",
                "nivel": "2",
                "id": "1137",
                "idPadre": "1039"
            }, {
                "descripcion": "DOLORES HIDALGO TX",
                "nivel": "2",
                "id": "1361",
                "idPadre": "1042"
            }, {
                "descripcion": "DONATO GUERRA TX",
                "nivel": "2",
                "id": "1773",
                "idPadre": "1045"
            }, {
                "descripcion": "DURANGO TX",
                "nivel": "2",
                "id": "1138",
                "idPadre": "1039"
            }, {
                "descripcion": "EL PARAISO-TABASCO TX",
                "nivel": "2",
                "id": "1684",
                "idPadre": "1044"
            }, {
                "descripcion": "ENSENADA TX",
                "nivel": "2",
                "id": "1046",
                "idPadre": "1037"
            }, {
                "descripcion": "ESCARCEGA TX",
                "nivel": "2",
                "id": "1685",
                "idPadre": "1044"
            }, {
                "descripcion": "FRESNILLO TX",
                "nivel": "2",
                "id": "1362",
                "idPadre": "1042"
            }, {
                "descripcion": "FRONTERA HIDALGO TX",
                "nivel": "2",
                "id": "1686",
                "idPadre": "1044"
            }, {
                "descripcion": "GUADALAJARA",
                "nivel": "2",
                "id": "125",
                "idPadre": "124"
            }, {
                "descripcion": "GUADALAJARA TX",
                "nivel": "2",
                "id": "1230",
                "idPadre": "1041"
            }, {
                "descripcion": "GUANAJUATO TX",
                "nivel": "2",
                "id": "1363",
                "idPadre": "1042"
            }, {
                "descripcion": "HIDALGO DEL PARRAL TX",
                "nivel": "2",
                "id": "1139",
                "idPadre": "1039"
            }, {
                "descripcion": "HUACHINANGO TX",
                "nivel": "2",
                "id": "1503",
                "idPadre": "1043"
            }, {
                "descripcion": "HUAJUAPAN DE LEON TX",
                "nivel": "2",
                "id": "1504",
                "idPadre": "1043"
            }, {
                "descripcion": "HUATULCO TX",
                "nivel": "2",
                "id": "1505",
                "idPadre": "1043"
            }, {
                "descripcion": "HUIXTLA TX",
                "nivel": "2",
                "id": "1687",
                "idPadre": "1044"
            }, {
                "descripcion": "IGUALA TX",
                "nivel": "2",
                "id": "1506",
                "idPadre": "1043"
            }, {
                "descripcion": "IRAPUATO",
                "nivel": "2",
                "id": "435",
                "idPadre": "73"
            }, {
                "descripcion": "IRAPUATO TX",
                "nivel": "2",
                "id": "1364",
                "idPadre": "1042"
            }, {
                "descripcion": "ISLA MUJERES TX",
                "nivel": "2",
                "id": "1688",
                "idPadre": "1044"
            }, {
                "descripcion": "IXMIQUILPAN TX",
                "nivel": "2",
                "id": "1365",
                "idPadre": "1042"
            }, {
                "descripcion": "IXTAPAN DE LA SAL TX",
                "nivel": "2",
                "id": "1774",
                "idPadre": "1045"
            }, {
                "descripcion": "IXTLAHUACA DE RAYON TX",
                "nivel": "2",
                "id": "1775",
                "idPadre": "1045"
            }, {
                "descripcion": "IXTLAN DEL RIO TX",
                "nivel": "2",
                "id": "1231",
                "idPadre": "1041"
            }, {
                "descripcion": "IZUCAR DE MATAMOROS TX",
                "nivel": "2",
                "id": "1507",
                "idPadre": "1043"
            }, {
                "descripcion": "JIMENEZ TX",
                "nivel": "2",
                "id": "1140",
                "idPadre": "1039"
            }, {
                "descripcion": "JUCHITAN TX",
                "nivel": "2",
                "id": "1232",
                "idPadre": "1043"
            }, {
                "descripcion": "CHAMPOTON TX",
                "nivel": "2",
                "id": "1679",
                "idPadre": "1044"
            }, {
                "descripcion": "CHAPALA TX",
                "nivel": "2",
                "id": "1227",
                "idPadre": "1041"
            }, {
                "descripcion": "CHETUMAL TX",
                "nivel": "2",
                "id": "1680",
                "idPadre": "1044"
            }, {
                "descripcion": "CHIHUAHUA",
                "nivel": "2",
                "id": "18",
                "idPadre": "17"
            }, {
                "descripcion": "CHIHUAHUA TX",
                "nivel": "2",
                "id": "1134",
                "idPadre": "1039"
            }, {
                "descripcion": "CHILAPA DE ALVAREZ TX",
                "nivel": "2",
                "id": "1494",
                "idPadre": "1043"
            }, {
                "descripcion": "CHILPANCINGO TX",
                "nivel": "2",
                "id": "1495",
                "idPadre": "1043"
            }, {
                "descripcion": "CIUDAD DE MEXICO",
                "nivel": "2",
                "id": "592",
                "idPadre": "591"
            }, {
                "descripcion": "CIUDAD DE MEXICO TX",
                "nivel": "2",
                "id": "1776",
                "idPadre": "1045"
            }, {
                "descripcion": "CIUDAD DEL CARMEN TX",
                "nivel": "2",
                "id": "1681",
                "idPadre": "1044"
            }, {
                "descripcion": "CIUDAD GUZMAN TX",
                "nivel": "2",
                "id": "1228",
                "idPadre": "1041"
            }, {
                "descripcion": "CIUDAD JUAREZ",
                "nivel": "2",
                "id": "28",
                "idPadre": "17"
            }, {
                "descripcion": "CIUDAD JUAREZ TX",
                "nivel": "2",
                "id": "1135",
                "idPadre": "1039"
            }, {
                "descripcion": "CIUDAD MANTE TX",
                "nivel": "2",
                "id": "1358",
                "idPadre": "1042"
            }, {
                "descripcion": "CIUDAD TX",
                "nivel": "2",
                "id": "969",
                "idPadre": "968"
            }, {
                "descripcion": "CIUDAD VALLES TX",
                "nivel": "2",
                "id": "1359",
                "idPadre": "1042"
            }, {
                "descripcion": "CIUDAD VICTORIA TX",
                "nivel": "2",
                "id": "1172",
                "idPadre": "1040"
            }, {
                "descripcion": "COATEPEC TX",
                "nivel": "2",
                "id": "1496",
                "idPadre": "1043"
            }, {
                "descripcion": "COATZA/MINA",
                "nivel": "2",
                "id": "1032",
                "idPadre": "189"
            }, {
                "descripcion": "COATZACOALCOS TX",
                "nivel": "2",
                "id": "1497",
                "idPadre": "1043"
            }, {
                "descripcion": "COLIMA TX",
                "nivel": "2",
                "id": "1229",
                "idPadre": "1041"
            }, {
                "descripcion": "COMALCALCO TX",
                "nivel": "2",
                "id": "1682",
                "idPadre": "1044"
            }, {
                "descripcion": "COMONFORT TX",
                "nivel": "2",
                "id": "1360",
                "idPadre": "1042"
            }, {
                "descripcion": "CORDOBA TX",
                "nivel": "2",
                "id": "1498",
                "idPadre": "1043"
            }, {
                "descripcion": "CORDOBA/ORIZABA",
                "nivel": "2",
                "id": "1027",
                "idPadre": "189"
            }, {
                "descripcion": "COSAMALOAPAN TX",
                "nivel": "2",
                "id": "1499",
                "idPadre": "1043"
            }, {
                "descripcion": "COZUMEL TX",
                "nivel": "2",
                "id": "1683",
                "idPadre": "1044"
            }, {
                "descripcion": "SALTILLO TX",
                "nivel": "2",
                "id": "1182",
                "idPadre": "1040"
            }, {
                "descripcion": "SAN ANDRES TUXTLA TX",
                "nivel": "2",
                "id": "1518",
                "idPadre": "1043"
            }, {
                "descripcion": "SAN CRISTOBAL DE LAS CASAS TX",
                "nivel": "2",
                "id": "1692",
                "idPadre": "1044"
            }, {
                "descripcion": "SAN JUAN DE TEOTIHUACAN TX",
                "nivel": "2",
                "id": "1778",
                "idPadre": "1045"
            }, {
                "descripcion": "SAN JUAN DEL RIO TX",
                "nivel": "2",
                "id": "1374",
                "idPadre": "1042"
            }, {
                "descripcion": "SAN LUIS DE LA PAZ TX",
                "nivel": "2",
                "id": "1375",
                "idPadre": "1042"
            }, {
                "descripcion": "SAN LUIS POTOSI",
                "nivel": "2",
                "id": "114",
                "idPadre": "73"
            }, {
                "descripcion": "SAN LUIS POTOSI TX",
                "nivel": "2",
                "id": "1376",
                "idPadre": "1042"
            }, {
                "descripcion": "SAN MIGUEL ALLENDE TX",
                "nivel": "2",
                "id": "1377",
                "idPadre": "1042"
            }, {
                "descripcion": "SAN PEDRO POCHUTLA TX",
                "nivel": "2",
                "id": "1519",
                "idPadre": "1043"
            }, {
                "descripcion": "SANTIAGO TX",
                "nivel": "2",
                "id": "1386",
                "idPadre": "1040"
            }, {
                "descripcion": "SILAO TX",
                "nivel": "2",
                "id": "1378",
                "idPadre": "1042"
            }, {
                "descripcion": "TALA TX",
                "nivel": "2",
                "id": "1247",
                "idPadre": "1041"
            }, {
                "descripcion": "TAMPICO TX",
                "nivel": "2",
                "id": "1183",
                "idPadre": "1040"
            }, {
                "descripcion": "TAPACHULA TX",
                "nivel": "2",
                "id": "1693",
                "idPadre": "1044"
            }, {
                "descripcion": "TAXCO TX",
                "nivel": "2",
                "id": "1520",
                "idPadre": "1043"
            }, {
                "descripcion": "TEAPA TX",
                "nivel": "2",
                "id": "1694",
                "idPadre": "1044"
            }, {
                "descripcion": "TECAMACHALCO TX",
                "nivel": "2",
                "id": "1521",
                "idPadre": "1043"
            }, {
                "descripcion": "MOROLEON TX",
                "nivel": "2",
                "id": "1242",
                "idPadre": "1041"
            }, {
                "descripcion": "NAOLINCO TX",
                "nivel": "2",
                "id": "1510",
                "idPadre": "1043"
            }, {
                "descripcion": "NUEVO LAREDO TX",
                "nivel": "2",
                "id": "1178",
                "idPadre": "1040"
            }, {
                "descripcion": "OAXACA TX",
                "nivel": "2",
                "id": "1511",
                "idPadre": "1043"
            }, {
                "descripcion": "OCOTLAN TX",
                "nivel": "2",
                "id": "1243",
                "idPadre": "1041"
            }, {
                "descripcion": "ORIZABA TX",
                "nivel": "2",
                "id": "1512",
                "idPadre": "1043"
            }, {
                "descripcion": "PACHUCA",
                "nivel": "2",
                "id": "594",
                "idPadre": "591"
            }, {
                "descripcion": "PACHUCA TX",
                "nivel": "2",
                "id": "1777",
                "idPadre": "1045"
            }, {
                "descripcion": "PALM VALLEY-TIJUANA TX",
                "nivel": "2",
                "id": "1048",
                "idPadre": "1037"
            }, {
                "descripcion": "PAZCUARO TX",
                "nivel": "2",
                "id": "1244",
                "idPadre": "1041"
            }, {
                "descripcion": "PEDRO ESCOBEDO TX",
                "nivel": "2",
                "id": "1370",
                "idPadre": "1042"
            }, {
                "descripcion": "PENJAMO TX",
                "nivel": "2",
                "id": "1371",
                "idPadre": "1042"
            }, {
                "descripcion": "PEROTE TX",
                "nivel": "2",
                "id": "1513",
                "idPadre": "1043"
            }, {
                "descripcion": "PIEDRAS NEGRAS TX",
                "nivel": "2",
                "id": "1179",
                "idPadre": "1040"
            }, {
                "descripcion": "PINOTEPA NACIONAL TX",
                "nivel": "2",
                "id": "1514",
                "idPadre": "1043"
            }, {
                "descripcion": "PORT CHIAPAS-CHIAPAS TX",
                "nivel": "2",
                "id": "1691",
                "idPadre": "1044"
            }, {
                "descripcion": "POZA RICA TX",
                "nivel": "2",
                "id": "1515",
                "idPadre": "1043"
            }, {
                "descripcion": "PROGRESO TX",
                "nivel": "2",
                "id": "1245",
                "idPadre": "1044"
            }, {
                "descripcion": "PUEBLA",
                "nivel": "2",
                "id": "175",
                "idPadre": "164"
            }, {
                "descripcion": "PUEBLA TX",
                "nivel": "2",
                "id": "1516",
                "idPadre": "1043"
            }, {
                "descripcion": "PUERTO PENASCO TX",
                "nivel": "2",
                "id": "1049",
                "idPadre": "1037"
            }, {
                "descripcion": "PUERTO VALLARTA",
                "nivel": "2",
                "id": "459",
                "idPadre": "124"
            }, {
                "descripcion": "PUERTO VALLARTA TX",
                "nivel": "2",
                "id": "1246",
                "idPadre": "1041"
            }, {
                "descripcion": "QUERETARO",
                "nivel": "2",
                "id": "104",
                "idPadre": "73"
            }, {
                "descripcion": "JUVENTINO ROSAS TX",
                "nivel": "2",
                "id": "1366",
                "idPadre": "1042"
            }, {
                "descripcion": "LA BARCA TX",
                "nivel": "2",
                "id": "1233",
                "idPadre": "1041"
            }, {
                "descripcion": "LA LAGUNA",
                "nivel": "2",
                "id": "1022",
                "idPadre": "43"
            }, {
                "descripcion": "LA PIEDAD TX",
                "nivel": "2",
                "id": "1234",
                "idPadre": "1041"
            }, {
                "descripcion": "LAGOS DE MORENO TX",
                "nivel": "2",
                "id": "1235",
                "idPadre": "1041"
            }, {
                "descripcion": "LAGUNILLAS TX",
                "nivel": "2",
                "id": "1236",
                "idPadre": "1041"
            }, {
                "descripcion": "LAS CHOAPAS-VERACRUZ TX",
                "nivel": "2",
                "id": "1367",
                "idPadre": "1042"
            }, {
                "descripcion": "LAS CRUCES-CHIHUAHUA TX",
                "nivel": "2",
                "id": "1141",
                "idPadre": "1039"
            }, {
                "descripcion": "LAZARO CARDENAS TX",
                "nivel": "2",
                "id": "1237",
                "idPadre": "1041"
            }, {
                "descripcion": "LEON",
                "nivel": "2",
                "id": "92",
                "idPadre": "73"
            }, {
                "descripcion": "LEON TX",
                "nivel": "2",
                "id": "1368",
                "idPadre": "1042"
            }, {
                "descripcion": "LINARES TX",
                "nivel": "2",
                "id": "1173",
                "idPadre": "1040"
            }, {
                "descripcion": "LOMA BONITA TX",
                "nivel": "2",
                "id": "1238",
                "idPadre": "1043"
            }, {
                "descripcion": "LOS REYES DE SALGADO TX",
                "nivel": "2",
                "id": "1239",
                "idPadre": "1041"
            }, {
                "descripcion": "MACUSPANA TX",
                "nivel": "2",
                "id": "1689",
                "idPadre": "1044"
            }, {
                "descripcion": "MANZANILLO TX",
                "nivel": "2",
                "id": "1240",
                "idPadre": "1041"
            }, {
                "descripcion": "MARTINEZ DE LA TORRE TX",
                "nivel": "2",
                "id": "1508",
                "idPadre": "1043"
            }, {
                "descripcion": "MATAMOROS TX",
                "nivel": "2",
                "id": "1174",
                "idPadre": "1040"
            }, {
                "descripcion": "MATEHUALA TX",
                "nivel": "2",
                "id": "1369",
                "idPadre": "1042"
            }, {
                "descripcion": "MERIDA",
                "nivel": "2",
                "id": "216",
                "idPadre": "207"
            }, {
                "descripcion": "MERIDA TX",
                "nivel": "2",
                "id": "1690",
                "idPadre": "1044"
            }, {
                "descripcion": "MEXICALI TX",
                "nivel": "2",
                "id": "1047",
                "idPadre": "1037"
            }, {
                "descripcion": "TX GUASAVE",
                "nivel": "2",
                "id": "1077",
                "idPadre": "1038"
            }, {
                "descripcion": "TX GUAYMAS",
                "nivel": "2",
                "id": "1078",
                "idPadre": "1038"
            }, {
                "descripcion": "TX HERMOSILLO",
                "nivel": "2",
                "id": "1079",
                "idPadre": "1038"
            }, {
                "descripcion": "TX LA PAZ",
                "nivel": "2",
                "id": "1080",
                "idPadre": "1038"
            }, {
                "descripcion": "TX LOS MOCHIS",
                "nivel": "2",
                "id": "1081",
                "idPadre": "1038"
            }, {
                "descripcion": "TX MAZATLAN",
                "nivel": "2",
                "id": "1082",
                "idPadre": "1038"
            }, {
                "descripcion": "TX NAVOJOA",
                "nivel": "2",
                "id": "1083",
                "idPadre": "1038"
            }, {
                "descripcion": "TX NOGALES",
                "nivel": "2",
                "id": "1084",
                "idPadre": "1038"
            }, {
                "descripcion": "TX PLAYA ENCANTO",
                "nivel": "2",
                "id": "1085",
                "idPadre": "1038"
            }, {
                "descripcion": "TX SAN JOSE DEL CABO",
                "nivel": "2",
                "id": "1086",
                "idPadre": "1038"
            }, {
                "descripcion": "TX SAN LUIS RIO COLORADO",
                "nivel": "2",
                "id": "1087",
                "idPadre": "1038"
            }, {
                "descripcion": "URUAPAN TX",
                "nivel": "2",
                "id": "1253",
                "idPadre": "1041"
            }, {
                "descripcion": "VALLADOLID TX",
                "nivel": "2",
                "id": "1697",
                "idPadre": "1044"
            }, {
                "descripcion": "VALLE DE BRAVO",
                "nivel": "2",
                "id": "528",
                "idPadre": "591"
            }, {
                "descripcion": "VALLE DE BRAVO TX",
                "nivel": "2",
                "id": "1781",
                "idPadre": "1045"
            }, {
                "descripcion": "VALLE DE SANTIAGO TX",
                "nivel": "2",
                "id": "1383",
                "idPadre": "1042"
            }, {
                "descripcion": "VERACRUZ",
                "nivel": "2",
                "id": "190",
                "idPadre": "189"
            }, {
                "descripcion": "VERACRUZ TX",
                "nivel": "2",
                "id": "1530",
                "idPadre": "1043"
            }, {
                "descripcion": "VICTOR ROSALES TX",
                "nivel": "2",
                "id": "1384",
                "idPadre": "1042"
            }, {
                "descripcion": "VILLAHERMOSA TX",
                "nivel": "2",
                "id": "1698",
                "idPadre": "1044"
            }, {
                "descripcion": "XALAPA",
                "nivel": "2",
                "id": "198",
                "idPadre": "189"
            }, {
                "descripcion": "XALAPA TX",
                "nivel": "2",
                "id": "1531",
                "idPadre": "1043"
            }, {
                "descripcion": "YAUTEPEC TX",
                "nivel": "2",
                "id": "1533",
                "idPadre": "1043"
            }, {
                "descripcion": "ZACATECAS TX",
                "nivel": "2",
                "id": "1385",
                "idPadre": "1042"
            }, {
                "descripcion": "ZACATEPEC DE HIDALGO TX",
                "nivel": "2",
                "id": "1534",
                "idPadre": "1043"
            }, {
                "descripcion": "ZAMORA TX",
                "nivel": "2",
                "id": "1254",
                "idPadre": "1041"
            }, {
                "descripcion": "ZIHUATANEJO TX",
                "nivel": "2",
                "id": "1532",
                "idPadre": "1043"
            }, {
                "descripcion": "TECATE TX",
                "nivel": "2",
                "id": "1051",
                "idPadre": "1037"
            }, {
                "descripcion": "TECOMAN TX",
                "nivel": "2",
                "id": "1248",
                "idPadre": "1041"
            }, {
                "descripcion": "TEHUACAN TX",
                "nivel": "2",
                "id": "1522",
                "idPadre": "1043"
            }, {
                "descripcion": "TENANCINGO DE DEGOLLADO TX",
                "nivel": "2",
                "id": "1779",
                "idPadre": "1045"
            }, {
                "descripcion": "TEPATITLAN TX",
                "nivel": "2",
                "id": "1249",
                "idPadre": "1041"
            }, {
                "descripcion": "TEPEJI DEL RIO TX",
                "nivel": "2",
                "id": "1379",
                "idPadre": "1042"
            }, {
                "descripcion": "TEPIC TX",
                "nivel": "2",
                "id": "1250",
                "idPadre": "1041"
            }, {
                "descripcion": "TEQUILA TX",
                "nivel": "2",
                "id": "1251",
                "idPadre": "1041"
            }, {
                "descripcion": "TEQUISQUIAPAN TX",
                "nivel": "2",
                "id": "1380",
                "idPadre": "1042"
            }, {
                "descripcion": "TEXMELUCAN TX",
                "nivel": "2",
                "id": "1523",
                "idPadre": "1043"
            }, {
                "descripcion": "TEZIUTLAN TX",
                "nivel": "2",
                "id": "1524",
                "idPadre": "1043"
            }, {
                "descripcion": "TIERRA BLANCA TX",
                "nivel": "2",
                "id": "1525",
                "idPadre": "1043"
            }, {
                "descripcion": "TIJUANA",
                "nivel": "2",
                "id": "3",
                "idPadre": "2"
            }, {
                "descripcion": "TIJUANA TX",
                "nivel": "2",
                "id": "1052",
                "idPadre": "1037"
            }, {
                "descripcion": "TLAXCALA TX",
                "nivel": "2",
                "id": "1526",
                "idPadre": "1043"
            }, {
                "descripcion": "TLAXCOAPAN TX",
                "nivel": "2",
                "id": "1381",
                "idPadre": "1042"
            }, {
                "descripcion": "TOLUCA",
                "nivel": "2",
                "id": "593",
                "idPadre": "591"
            }, {
                "descripcion": "TOLUCA TX",
                "nivel": "2",
                "id": "1780",
                "idPadre": "1045"
            }, {
                "descripcion": "TORREON TX",
                "nivel": "2",
                "id": "1142",
                "idPadre": "1039"
            }, {
                "descripcion": "TRES MARIAS TX",
                "nivel": "2",
                "id": "1527",
                "idPadre": "1043"
            }, {
                "descripcion": "TULA DE ALLENDE TX",
                "nivel": "2",
                "id": "1382",
                "idPadre": "1042"
            }, {
                "descripcion": "TULUM TX",
                "nivel": "2",
                "id": "1695",
                "idPadre": "1044"
            }, {
                "descripcion": "TUXPAN (NAYARIT) TX",
                "nivel": "2",
                "id": "1252",
                "idPadre": "1041"
            }, {
                "descripcion": "TUXPAN TX",
                "nivel": "2",
                "id": "1528",
                "idPadre": "1043"
            }, {
                "descripcion": "TUXTEPEC TX",
                "nivel": "2",
                "id": "1529",
                "idPadre": "1043"
            }, {
                "descripcion": "TUXTLA GUTIERREZ TX",
                "nivel": "2",
                "id": "1696",
                "idPadre": "1044"
            }, {
                "descripcion": "TX CABO SAN LUCAS",
                "nivel": "2",
                "id": "1073",
                "idPadre": "1038"
            }, {
                "descripcion": "TX CIUDAD OBREGON",
                "nivel": "2",
                "id": "1074",
                "idPadre": "1038"
            }, {
                "descripcion": "TX CULIACAN",
                "nivel": "2",
                "id": "1075",
                "idPadre": "1038"
            }, {
                "descripcion": "TX GUAMUCHIL",
                "nivel": "2",
                "id": "1076",
                "idPadre": "1038"
            }, {
                "descripcion": "QUERETARO TX",
                "nivel": "2",
                "id": "1372",
                "idPadre": "1042"
            }, {
                "descripcion": "REYNOSA TX",
                "nivel": "2",
                "id": "1180",
                "idPadre": "1040"
            }, {
                "descripcion": "ROSARITO TX",
                "nivel": "2",
                "id": "1050",
                "idPadre": "1037"
            }, {
                "descripcion": "SABINAS TX",
                "nivel": "2",
                "id": "1181",
                "idPadre": "1040"
            }, {
                "descripcion": "SALAMANCA TX",
                "nivel": "2",
                "id": "1373",
                "idPadre": "1042"
            }, {
                "descripcion": "SALINA CRUZ TX",
                "nivel": "2",
                "id": "1517",
                "idPadre": "1043"
            }, {
                "descripcion": "SALTILLO",
                "nivel": "2",
                "id": "429",
                "idPadre": "43"
            }, {
                "descripcion": "TX GUAMUCHIL",
                "nivel": "3",
                "id": "1091",
                "idPadre": "1076"
            }, {
                "descripcion": "TX GUASAVE",
                "nivel": "3",
                "id": "1092",
                "idPadre": "1077"
            }, {
                "descripcion": "TX GUAYMAS",
                "nivel": "3",
                "id": "1093",
                "idPadre": "1078"
            }, {
                "descripcion": "TX HERMOSILLO",
                "nivel": "3",
                "id": "1094",
                "idPadre": "1079"
            }, {
                "descripcion": "TX LA PAZ",
                "nivel": "3",
                "id": "1095",
                "idPadre": "1080"
            }, {
                "descripcion": "TX LOS MOCHIS",
                "nivel": "3",
                "id": "1096",
                "idPadre": "1081"
            }, {
                "descripcion": "TX MAZATLAN",
                "nivel": "3",
                "id": "1097",
                "idPadre": "1082"
            }, {
                "descripcion": "TX NAVOJOA",
                "nivel": "3",
                "id": "1098",
                "idPadre": "1083"
            }, {
                "descripcion": "TX NOGALES",
                "nivel": "3",
                "id": "1099",
                "idPadre": "1084"
            }, {
                "descripcion": "TX PLAYA ENCANTO",
                "nivel": "3",
                "id": "1100",
                "idPadre": "1085"
            }, {
                "descripcion": "TX SAN JOSE DEL CABO",
                "nivel": "3",
                "id": "1101",
                "idPadre": "1086"
            }, {
                "descripcion": "TX SAN LUIS RIO COLORADO",
                "nivel": "3",
                "id": "1102",
                "idPadre": "1087"
            }, {
                "descripcion": "URUAPAN TX",
                "nivel": "3",
                "id": "1286",
                "idPadre": "1253"
            }, {
                "descripcion": "VALLADOLID TX",
                "nivel": "3",
                "id": "1721",
                "idPadre": "1697"
            }, {
                "descripcion": "VALLE DE BRAVO",
                "nivel": "3",
                "id": "851",
                "idPadre": "528"
            }, {
                "descripcion": "VALLE DE BRAVO TX",
                "nivel": "3",
                "id": "1792",
                "idPadre": "1781"
            }, {
                "descripcion": "VALLE DE SANTIAGO TX",
                "nivel": "3",
                "id": "1418",
                "idPadre": "1383"
            }, {
                "descripcion": "VERACRUZ",
                "nivel": "3",
                "id": "191",
                "idPadre": "190"
            }, {
                "descripcion": "VERACRUZ TX",
                "nivel": "3",
                "id": "1578",
                "idPadre": "1530"
            }, {
                "descripcion": "VICTOR ROSALES TX",
                "nivel": "3",
                "id": "1419",
                "idPadre": "1384"
            }, {
                "descripcion": "VILLAHERMOSA TX",
                "nivel": "3",
                "id": "1722",
                "idPadre": "1698"
            }, {
                "descripcion": "XALAPA",
                "nivel": "3",
                "id": "199",
                "idPadre": "198"
            }, {
                "descripcion": "XALAPA TX",
                "nivel": "3",
                "id": "1579",
                "idPadre": "1531"
            }, {
                "descripcion": "XOCHIMILCO",
                "nivel": "3",
                "id": "716",
                "idPadre": "592"
            }, {
                "descripcion": "YAUTEPEC TX",
                "nivel": "3",
                "id": "1581",
                "idPadre": "1533"
            }, {
                "descripcion": "ZACATECAS TX",
                "nivel": "3",
                "id": "1420",
                "idPadre": "1385"
            }, {
                "descripcion": "ZACATEPEC DE HIDALGO TX",
                "nivel": "3",
                "id": "1582",
                "idPadre": "1534"
            }, {
                "descripcion": "ZAMORA TX",
                "nivel": "3",
                "id": "1287",
                "idPadre": "1254"
            }, {
                "descripcion": "ZIHUATANEJO TX",
                "nivel": "3",
                "id": "1580",
                "idPadre": "1532"
            }, {
                "descripcion": "TECATE TX",
                "nivel": "3",
                "id": "1058",
                "idPadre": "1051"
            }, {
                "descripcion": "TECOMAN TX",
                "nivel": "3",
                "id": "1281",
                "idPadre": "1248"
            }, {
                "descripcion": "TEHUACAN TX",
                "nivel": "3",
                "id": "1570",
                "idPadre": "1522"
            }, {
                "descripcion": "TENANCINGO DE DEGOLLADO TX",
                "nivel": "3",
                "id": "1790",
                "idPadre": "1779"
            }, {
                "descripcion": "TEPATITLAN TX",
                "nivel": "3",
                "id": "1282",
                "idPadre": "1249"
            }, {
                "descripcion": "TEPEJI DEL RIO TX",
                "nivel": "3",
                "id": "1414",
                "idPadre": "1379"
            }, {
                "descripcion": "TEPIC TX",
                "nivel": "3",
                "id": "1283",
                "idPadre": "1250"
            }, {
                "descripcion": "TEQUILA TX",
                "nivel": "3",
                "id": "1284",
                "idPadre": "1251"
            }, {
                "descripcion": "TEQUISQUIAPAN TX",
                "nivel": "3",
                "id": "1415",
                "idPadre": "1380"
            }, {
                "descripcion": "TEXMELUCAN TX",
                "nivel": "3",
                "id": "1571",
                "idPadre": "1523"
            }, {
                "descripcion": "TEZIUTLAN TX",
                "nivel": "3",
                "id": "1572",
                "idPadre": "1524"
            }, {
                "descripcion": "TIERRA BLANCA TX",
                "nivel": "3",
                "id": "1573",
                "idPadre": "1525"
            }, {
                "descripcion": "TIJUANA",
                "nivel": "3",
                "id": "4",
                "idPadre": "3"
            }, {
                "descripcion": "TIJUANA 2",
                "nivel": "3",
                "id": "1947",
                "idPadre": "3"
            }, {
                "descripcion": "TIJUANA TX",
                "nivel": "3",
                "id": "1059",
                "idPadre": "1052"
            }, {
                "descripcion": "TLALNEPANTLA",
                "nivel": "3",
                "id": "718",
                "idPadre": "592"
            }, {
                "descripcion": "TLALPAN",
                "nivel": "3",
                "id": "715",
                "idPadre": "592"
            }, {
                "descripcion": "TLAXCALA TX",
                "nivel": "3",
                "id": "1574",
                "idPadre": "1526"
            }, {
                "descripcion": "TLAXCOAPAN TX",
                "nivel": "3",
                "id": "1416",
                "idPadre": "1381"
            }, {
                "descripcion": "TOLUCA",
                "nivel": "3",
                "id": "597",
                "idPadre": "593"
            }, {
                "descripcion": "TOLUCA TX",
                "nivel": "3",
                "id": "1791",
                "idPadre": "1780"
            }, {
                "descripcion": "TORREON TX",
                "nivel": "3",
                "id": "1152",
                "idPadre": "1142"
            }, {
                "descripcion": "TRES MARIAS TX",
                "nivel": "3",
                "id": "1575",
                "idPadre": "1527"
            }, {
                "descripcion": "TULA DE ALLENDE TX",
                "nivel": "3",
                "id": "1417",
                "idPadre": "1382"
            }, {
                "descripcion": "TULTEPEC",
                "nivel": "3",
                "id": "722",
                "idPadre": "592"
            }, {
                "descripcion": "TULTITLAN",
                "nivel": "3",
                "id": "721",
                "idPadre": "592"
            }, {
                "descripcion": "TULUM TX",
                "nivel": "3",
                "id": "1719",
                "idPadre": "1695"
            }, {
                "descripcion": "TUXPAN (NAYARIT) TX",
                "nivel": "3",
                "id": "1285",
                "idPadre": "1252"
            }, {
                "descripcion": "TUXPAN TX",
                "nivel": "3",
                "id": "1576",
                "idPadre": "1528"
            }, {
                "descripcion": "TUXTEPEC TX",
                "nivel": "3",
                "id": "1577",
                "idPadre": "1529"
            }, {
                "descripcion": "TUXTLA GUTIERREZ TX",
                "nivel": "3",
                "id": "1720",
                "idPadre": "1696"
            }, {
                "descripcion": "TX CABO SAN LUCAS",
                "nivel": "3",
                "id": "1088",
                "idPadre": "1073"
            }, {
                "descripcion": "TX CIUDAD OBREGON",
                "nivel": "3",
                "id": "1089",
                "idPadre": "1074"
            }, {
                "descripcion": "TX CULIACAN",
                "nivel": "3",
                "id": "1090",
                "idPadre": "1075"
            }, {
                "descripcion": "QUERETARO TX",
                "nivel": "3",
                "id": "1407",
                "idPadre": "1372"
            }, {
                "descripcion": "REYNOSA TX",
                "nivel": "3",
                "id": "1193",
                "idPadre": "1180"
            }, {
                "descripcion": "ROSARITO TX",
                "nivel": "3",
                "id": "1057",
                "idPadre": "1050"
            }, {
                "descripcion": "SABINAS TX",
                "nivel": "3",
                "id": "1194",
                "idPadre": "1181"
            }, {
                "descripcion": "SALAMANCA TX",
                "nivel": "3",
                "id": "1408",
                "idPadre": "1373"
            }, {
                "descripcion": "SALINA CRUZ TX",
                "nivel": "3",
                "id": "1565",
                "idPadre": "1517"
            }, {
                "descripcion": "SALTILLO",
                "nivel": "3",
                "id": "568",
                "idPadre": "429"
            }, {
                "descripcion": "SALTILLO TX",
                "nivel": "3",
                "id": "1195",
                "idPadre": "1182"
            }, {
                "descripcion": "SAN ANDRES TUXTLA TX",
                "nivel": "3",
                "id": "1566",
                "idPadre": "1518"
            }, {
                "descripcion": "SAN CRISTOBAL DE LAS CASAS TX",
                "nivel": "3",
                "id": "1716",
                "idPadre": "1692"
            }, {
                "descripcion": "SAN JUAN DE TEOTIHUACAN TX",
                "nivel": "3",
                "id": "1789",
                "idPadre": "1778"
            }, {
                "descripcion": "SAN JUAN DEL RIO TX",
                "nivel": "3",
                "id": "1409",
                "idPadre": "1374"
            }, {
                "descripcion": "SAN LUIS DE LA PAZ TX",
                "nivel": "3",
                "id": "1410",
                "idPadre": "1375"
            }, {
                "descripcion": "SAN LUIS POTOSI",
                "nivel": "3",
                "id": "115",
                "idPadre": "114"
            }, {
                "descripcion": "SAN LUIS POTOSI TX",
                "nivel": "3",
                "id": "1411",
                "idPadre": "1376"
            }, {
                "descripcion": "SAN MIGUEL ALLENDE TX",
                "nivel": "3",
                "id": "1412",
                "idPadre": "1377"
            }, {
                "descripcion": "SAN PEDRO POCHUTLA TX",
                "nivel": "3",
                "id": "1567",
                "idPadre": "1519"
            }, {
                "descripcion": "SANTA FE",
                "nivel": "3",
                "id": "709",
                "idPadre": "592"
            }, {
                "descripcion": "SANTIAGO TX",
                "nivel": "3",
                "id": "1421",
                "idPadre": "1386"
            }, {
                "descripcion": "SILAO TX",
                "nivel": "3",
                "id": "1413",
                "idPadre": "1378"
            }, {
                "descripcion": "TALA TX",
                "nivel": "3",
                "id": "1280",
                "idPadre": "1247"
            }, {
                "descripcion": "TAMPICO TX",
                "nivel": "3",
                "id": "1196",
                "idPadre": "1183"
            }, {
                "descripcion": "TAPACHULA TX",
                "nivel": "3",
                "id": "1717",
                "idPadre": "1693"
            }, {
                "descripcion": "TAXCO TX",
                "nivel": "3",
                "id": "1568",
                "idPadre": "1520"
            }, {
                "descripcion": "TEAPA TX",
                "nivel": "3",
                "id": "1718",
                "idPadre": "1694"
            }, {
                "descripcion": "TECAMAC",
                "nivel": "3",
                "id": "703",
                "idPadre": "592"
            }, {
                "descripcion": "TECAMACHALCO TX",
                "nivel": "3",
                "id": "1569",
                "idPadre": "1521"
            }, {
                "descripcion": "MOROLEON TX",
                "nivel": "3",
                "id": "1275",
                "idPadre": "1242"
            }, {
                "descripcion": "MTY CERRO DE LA SILLA",
                "nivel": "3",
                "id": "680",
                "idPadre": "44"
            }, {
                "descripcion": "MTY GARCIA",
                "nivel": "3",
                "id": "2119",
                "idPadre": "44"
            }, {
                "descripcion": "MTY MITRAS",
                "nivel": "3",
                "id": "678",
                "idPadre": "44"
            }, {
                "descripcion": "MTY SANTA LUCIA",
                "nivel": "3",
                "id": "681",
                "idPadre": "44"
            }, {
                "descripcion": "MTY SENDERO DIVISORIO",
                "nivel": "3",
                "id": "682",
                "idPadre": "44"
            }, {
                "descripcion": "MTY SIERRA MADRE",
                "nivel": "3",
                "id": "679",
                "idPadre": "44"
            }, {
                "descripcion": "NAOLINCO TX",
                "nivel": "3",
                "id": "1558",
                "idPadre": "1510"
            }, {
                "descripcion": "NAUCALPAN",
                "nivel": "3",
                "id": "720",
                "idPadre": "592"
            }, {
                "descripcion": "NEZA",
                "nivel": "3",
                "id": "708",
                "idPadre": "592"
            }, {
                "descripcion": "NEZA 2",
                "nivel": "3",
                "id": "898",
                "idPadre": "592"
            }, {
                "descripcion": "NICOLAS ROMERO",
                "nivel": "3",
                "id": "723",
                "idPadre": "592"
            }, {
                "descripcion": "NUEVO LAREDO TX",
                "nivel": "3",
                "id": "1191",
                "idPadre": "1178"
            }, {
                "descripcion": "OAXACA TX",
                "nivel": "3",
                "id": "1559",
                "idPadre": "1511"
            }, {
                "descripcion": "OCOTLAN TX",
                "nivel": "3",
                "id": "1276",
                "idPadre": "1243"
            }, {
                "descripcion": "ORIZABA TX",
                "nivel": "3",
                "id": "1560",
                "idPadre": "1512"
            }, {
                "descripcion": "PACHUCA",
                "nivel": "3",
                "id": "598",
                "idPadre": "594"
            }, {
                "descripcion": "PACHUCA TX",
                "nivel": "3",
                "id": "1788",
                "idPadre": "1777"
            }, {
                "descripcion": "PALM VALLEY-TIJUANA TX",
                "nivel": "3",
                "id": "1055",
                "idPadre": "1048"
            }, {
                "descripcion": "PAZCUARO TX",
                "nivel": "3",
                "id": "1277",
                "idPadre": "1244"
            }, {
                "descripcion": "PEDREGAL",
                "nivel": "3",
                "id": "714",
                "idPadre": "592"
            }, {
                "descripcion": "PEDRO ESCOBEDO TX",
                "nivel": "3",
                "id": "1405",
                "idPadre": "1370"
            }, {
                "descripcion": "PENJAMO TX",
                "nivel": "3",
                "id": "1406",
                "idPadre": "1371"
            }, {
                "descripcion": "PEROTE TX",
                "nivel": "3",
                "id": "1561",
                "idPadre": "1513"
            }, {
                "descripcion": "PIEDRAS NEGRAS TX",
                "nivel": "3",
                "id": "1192",
                "idPadre": "1179"
            }, {
                "descripcion": "PINOTEPA NACIONAL TX",
                "nivel": "3",
                "id": "1562",
                "idPadre": "1514"
            }, {
                "descripcion": "POLANCO",
                "nivel": "3",
                "id": "1943",
                "idPadre": "592"
            }, {
                "descripcion": "PORT CHIAPAS-CHIAPAS TX",
                "nivel": "3",
                "id": "1715",
                "idPadre": "1691"
            }, {
                "descripcion": "PORTALES",
                "nivel": "3",
                "id": "712",
                "idPadre": "592"
            }, {
                "descripcion": "POZA RICA TX",
                "nivel": "3",
                "id": "1563",
                "idPadre": "1515"
            }, {
                "descripcion": "PROGRESO TX",
                "nivel": "3",
                "id": "1278",
                "idPadre": "1245"
            }, {
                "descripcion": "PUEBLA",
                "nivel": "3",
                "id": "176",
                "idPadre": "175"
            }, {
                "descripcion": "PUEBLA 2",
                "nivel": "3",
                "id": "1945",
                "idPadre": "175"
            }, {
                "descripcion": "PUEBLA TX",
                "nivel": "3",
                "id": "1564",
                "idPadre": "1516"
            }, {
                "descripcion": "PUERTO PENASCO TX",
                "nivel": "3",
                "id": "1056",
                "idPadre": "1049"
            }, {
                "descripcion": "PUERTO VALLARTA",
                "nivel": "3",
                "id": "575",
                "idPadre": "459"
            }, {
                "descripcion": "PUERTO VALLARTA TX",
                "nivel": "3",
                "id": "1279",
                "idPadre": "1246"
            }, {
                "descripcion": "QUERETARO",
                "nivel": "3",
                "id": "105",
                "idPadre": "104"
            }, {
                "descripcion": "JUCHITAN TX",
                "nivel": "3",
                "id": "1265",
                "idPadre": "1232"
            }, {
                "descripcion": "JUVENTINO ROSAS TX",
                "nivel": "3",
                "id": "1401",
                "idPadre": "1366"
            }, {
                "descripcion": "LA BARCA TX",
                "nivel": "3",
                "id": "1266",
                "idPadre": "1233"
            }, {
                "descripcion": "LA LAGUNA",
                "nivel": "3",
                "id": "1023",
                "idPadre": "1022"
            }, {
                "descripcion": "LA PIEDAD TX",
                "nivel": "3",
                "id": "1267",
                "idPadre": "1234"
            }, {
                "descripcion": "LA PRIMAVERA",
                "nivel": "3",
                "id": "694",
                "idPadre": "125"
            }, {
                "descripcion": "LAGOS DE MORENO TX",
                "nivel": "3",
                "id": "1268",
                "idPadre": "1235"
            }, {
                "descripcion": "LAGUNILLAS TX",
                "nivel": "3",
                "id": "1269",
                "idPadre": "1236"
            }, {
                "descripcion": "LAS AGUILAS",
                "nivel": "3",
                "id": "713",
                "idPadre": "592"
            }, {
                "descripcion": "LAS CHOAPAS-VERACRUZ TX",
                "nivel": "3",
                "id": "1402",
                "idPadre": "1367"
            }, {
                "descripcion": "LAS CRUCES-CHIHUAHUA TX",
                "nivel": "3",
                "id": "1151",
                "idPadre": "1141"
            }, {
                "descripcion": "LAZARO CARDENAS",
                "nivel": "3",
                "id": "691",
                "idPadre": "125"
            }, {
                "descripcion": "LAZARO CARDENAS TX",
                "nivel": "3",
                "id": "1270",
                "idPadre": "1237"
            }, {
                "descripcion": "LEON",
                "nivel": "3",
                "id": "93",
                "idPadre": "92"
            }, {
                "descripcion": "LEON TX",
                "nivel": "3",
                "id": "1403",
                "idPadre": "1368"
            }, {
                "descripcion": "LINARES TX",
                "nivel": "3",
                "id": "1186",
                "idPadre": "1173"
            }, {
                "descripcion": "LOMA BONITA TX",
                "nivel": "3",
                "id": "1271",
                "idPadre": "1238"
            }, {
                "descripcion": "LOPEZ MATEOS",
                "nivel": "3",
                "id": "693",
                "idPadre": "125"
            }, {
                "descripcion": "LOS REYES",
                "nivel": "3",
                "id": "724",
                "idPadre": "592"
            }, {
                "descripcion": "LOS REYES DE SALGADO TX",
                "nivel": "3",
                "id": "1272",
                "idPadre": "1239"
            }, {
                "descripcion": "MACUSPANA TX",
                "nivel": "3",
                "id": "1713",
                "idPadre": "1689"
            }, {
                "descripcion": "MANZANILLO TX",
                "nivel": "3",
                "id": "1273",
                "idPadre": "1240"
            }, {
                "descripcion": "MARTINEZ DE LA TORRE TX",
                "nivel": "3",
                "id": "1556",
                "idPadre": "1508"
            }, {
                "descripcion": "MATAMOROS TX",
                "nivel": "3",
                "id": "1187",
                "idPadre": "1174"
            }, {
                "descripcion": "MATEHUALA TX",
                "nivel": "3",
                "id": "1404",
                "idPadre": "1369"
            }, {
                "descripcion": "MERIDA",
                "nivel": "3",
                "id": "217",
                "idPadre": "216"
            }, {
                "descripcion": "MERIDA TX",
                "nivel": "3",
                "id": "1714",
                "idPadre": "1690"
            }, {
                "descripcion": "MEXICALI TX",
                "nivel": "3",
                "id": "1054",
                "idPadre": "1047"
            }, {
                "descripcion": "MINATITLAN TX",
                "nivel": "3",
                "id": "1557",
                "idPadre": "1509"
            }, {
                "descripcion": "MONCLOVA TX",
                "nivel": "3",
                "id": "1188",
                "idPadre": "1175"
            }, {
                "descripcion": "MONTEMORELOS TX",
                "nivel": "3",
                "id": "1189",
                "idPadre": "1176"
            }, {
                "descripcion": "MONTERREY TX",
                "nivel": "3",
                "id": "1190",
                "idPadre": "1177"
            }, {
                "descripcion": "MORELIA",
                "nivel": "3",
                "id": "157",
                "idPadre": "156"
            }, {
                "descripcion": "MORELIA TX",
                "nivel": "3",
                "id": "1274",
                "idPadre": "1241"
            }, {
                "descripcion": "CUAUTLA TX",
                "nivel": "3",
                "id": "1549",
                "idPadre": "1501"
            }, {
                "descripcion": "CUERNAVACA",
                "nivel": "3",
                "id": "166",
                "idPadre": "165"
            }, {
                "descripcion": "CUERNAVACA TX",
                "nivel": "3",
                "id": "1550",
                "idPadre": "1502"
            }, {
                "descripcion": "DELICIAS TX",
                "nivel": "3",
                "id": "1147",
                "idPadre": "1137"
            }, {
                "descripcion": "DISTRITO TX",
                "nivel": "3",
                "id": "970",
                "idPadre": "969"
            }, {
                "descripcion": "DOLORES HIDALGO TX",
                "nivel": "3",
                "id": "1396",
                "idPadre": "1361"
            }, {
                "descripcion": "DONATO GUERRA TX",
                "nivel": "3",
                "id": "1784",
                "idPadre": "1773"
            }, {
                "descripcion": "DURANGO TX",
                "nivel": "3",
                "id": "1148",
                "idPadre": "1138"
            }, {
                "descripcion": "ECATEPEC",
                "nivel": "3",
                "id": "704",
                "idPadre": "592"
            }, {
                "descripcion": "EL PARAISO-TABASCO TX",
                "nivel": "3",
                "id": "1708",
                "idPadre": "1684"
            }, {
                "descripcion": "ENSENADA TX",
                "nivel": "3",
                "id": "1053",
                "idPadre": "1046"
            }, {
                "descripcion": "ESCARCEGA TX",
                "nivel": "3",
                "id": "1709",
                "idPadre": "1685"
            }, {
                "descripcion": "ESTADIO",
                "nivel": "3",
                "id": "689",
                "idPadre": "125"
            }, {
                "descripcion": "FRESNILLO TX",
                "nivel": "3",
                "id": "1397",
                "idPadre": "1362"
            }, {
                "descripcion": "FRONTERA HIDALGO TX",
                "nivel": "3",
                "id": "1710",
                "idPadre": "1686"
            }, {
                "descripcion": "GUADALAJARA TX",
                "nivel": "3",
                "id": "1263",
                "idPadre": "1230"
            }, {
                "descripcion": "GUADALUPE TEPEYAC",
                "nivel": "3",
                "id": "717",
                "idPadre": "592"
            }, {
                "descripcion": "GUANAJUATO TX",
                "nivel": "3",
                "id": "1398",
                "idPadre": "1363"
            }, {
                "descripcion": "HIDALGO DEL PARRAL TX",
                "nivel": "3",
                "id": "1149",
                "idPadre": "1139"
            }, {
                "descripcion": "HUACHINANGO TX",
                "nivel": "3",
                "id": "1551",
                "idPadre": "1503"
            }, {
                "descripcion": "HUAJUAPAN DE LEON TX",
                "nivel": "3",
                "id": "1552",
                "idPadre": "1504"
            }, {
                "descripcion": "HUATULCO TX",
                "nivel": "3",
                "id": "1553",
                "idPadre": "1505"
            }, {
                "descripcion": "HUIXTLA TX",
                "nivel": "3",
                "id": "1711",
                "idPadre": "1687"
            }, {
                "descripcion": "IGUALA TX",
                "nivel": "3",
                "id": "1554",
                "idPadre": "1506"
            }, {
                "descripcion": "IRAPUATO",
                "nivel": "3",
                "id": "570",
                "idPadre": "435"
            }, {
                "descripcion": "IRAPUATO TX",
                "nivel": "3",
                "id": "1399",
                "idPadre": "1364"
            }, {
                "descripcion": "ISLA MUJERES TX",
                "nivel": "3",
                "id": "1712",
                "idPadre": "1688"
            }, {
                "descripcion": "IXMIQUILPAN TX",
                "nivel": "3",
                "id": "1400",
                "idPadre": "1365"
            }, {
                "descripcion": "IXTAPAN DE LA SAL TX",
                "nivel": "3",
                "id": "1785",
                "idPadre": "1774"
            }, {
                "descripcion": "IXTLAHUACA DE RAYON TX",
                "nivel": "3",
                "id": "1786",
                "idPadre": "1775"
            }, {
                "descripcion": "IXTLAN DEL RIO TX",
                "nivel": "3",
                "id": "1264",
                "idPadre": "1231"
            }, {
                "descripcion": "IZTAPALAPA",
                "nivel": "3",
                "id": "707",
                "idPadre": "592"
            }, {
                "descripcion": "IZUCAR DE MATAMOROS TX",
                "nivel": "3",
                "id": "1555",
                "idPadre": "1507"
            }, {
                "descripcion": "JIMENEZ TX",
                "nivel": "3",
                "id": "1150",
                "idPadre": "1140"
            }, {
                "descripcion": "CHAMPOTON TX",
                "nivel": "3",
                "id": "1703",
                "idPadre": "1679"
            }, {
                "descripcion": "CHAPALA TX",
                "nivel": "3",
                "id": "1260",
                "idPadre": "1227"
            }, {
                "descripcion": "CHAPULTEPEC",
                "nivel": "3",
                "id": "692",
                "idPadre": "125"
            }, {
                "descripcion": "CHETUMAL TX",
                "nivel": "3",
                "id": "1704",
                "idPadre": "1680"
            }, {
                "descripcion": "CHIHUAHUA",
                "nivel": "3",
                "id": "19",
                "idPadre": "18"
            }, {
                "descripcion": "CHIHUAHUA TX",
                "nivel": "3",
                "id": "1144",
                "idPadre": "1134"
            }, {
                "descripcion": "CHILAPA DE ALVAREZ TX",
                "nivel": "3",
                "id": "1542",
                "idPadre": "1494"
            }, {
                "descripcion": "CHILPANCINGO TX",
                "nivel": "3",
                "id": "1543",
                "idPadre": "1495"
            }, {
                "descripcion": "CIUDAD DE MEXICO TX",
                "nivel": "3",
                "id": "1787",
                "idPadre": "1776"
            }, {
                "descripcion": "CIUDAD DEL CARMEN TX",
                "nivel": "3",
                "id": "1705",
                "idPadre": "1681"
            }, {
                "descripcion": "CIUDAD GUZMAN TX",
                "nivel": "3",
                "id": "1261",
                "idPadre": "1228"
            }, {
                "descripcion": "CIUDAD JUAREZ",
                "nivel": "3",
                "id": "29",
                "idPadre": "28"
            }, {
                "descripcion": "CIUDAD JUAREZ TX",
                "nivel": "3",
                "id": "1145",
                "idPadre": "1135"
            }, {
                "descripcion": "CIUDAD MANTE TX",
                "nivel": "3",
                "id": "1393",
                "idPadre": "1358"
            }, {
                "descripcion": "CIUDAD VALLES TX",
                "nivel": "3",
                "id": "1394",
                "idPadre": "1359"
            }, {
                "descripcion": "CIUDAD VICTORIA TX",
                "nivel": "3",
                "id": "1185",
                "idPadre": "1172"
            }, {
                "descripcion": "COACALCO",
                "nivel": "3",
                "id": "702",
                "idPadre": "592"
            }, {
                "descripcion": "COATEPEC TX",
                "nivel": "3",
                "id": "1544",
                "idPadre": "1496"
            }, {
                "descripcion": "COATZA/MINA",
                "nivel": "3",
                "id": "1033",
                "idPadre": "1032"
            }, {
                "descripcion": "COATZACOALCOS TX",
                "nivel": "3",
                "id": "1545",
                "idPadre": "1497"
            }, {
                "descripcion": "COBERTURA TX",
                "nivel": "3",
                "id": "775",
                "idPadre": "592"
            }, {
                "descripcion": "COLIMA TX",
                "nivel": "3",
                "id": "1262",
                "idPadre": "1229"
            }, {
                "descripcion": "COLOMOS",
                "nivel": "3",
                "id": "688",
                "idPadre": "125"
            }, {
                "descripcion": "COMALCALCO TX",
                "nivel": "3",
                "id": "1706",
                "idPadre": "1682"
            }, {
                "descripcion": "COMONFORT TX",
                "nivel": "3",
                "id": "1395",
                "idPadre": "1360"
            }, {
                "descripcion": "CONDESA",
                "nivel": "3",
                "id": "710",
                "idPadre": "592"
            }, {
                "descripcion": "CONSTITUCION",
                "nivel": "3",
                "id": "725",
                "idPadre": "592"
            }, {
                "descripcion": "CORDOBA TX",
                "nivel": "3",
                "id": "1546",
                "idPadre": "1498"
            }, {
                "descripcion": "CORDOBA/ORIZABA",
                "nivel": "3",
                "id": "1028",
                "idPadre": "1027"
            }, {
                "descripcion": "COSAMALOAPAN TX",
                "nivel": "3",
                "id": "1547",
                "idPadre": "1499"
            }, {
                "descripcion": "COZUMEL TX",
                "nivel": "3",
                "id": "1707",
                "idPadre": "1683"
            }, {
                "descripcion": "CRUCECITA TX",
                "nivel": "3",
                "id": "1548",
                "idPadre": "1500"
            }, {
                "descripcion": "CUAHUTEMOC TX",
                "nivel": "3",
                "id": "1146",
                "idPadre": "1136"
            }, {
                "descripcion": "ABASOLO TX",
                "nivel": "3",
                "id": "1387",
                "idPadre": "1352"
            }, {
                "descripcion": "ACAMBARO TX",
                "nivel": "3",
                "id": "1388",
                "idPadre": "1353"
            }, {
                "descripcion": "ACAPONETA TX",
                "nivel": "3",
                "id": "1255",
                "idPadre": "1222"
            }, {
                "descripcion": "ACAPULCO TX",
                "nivel": "3",
                "id": "1535",
                "idPadre": "1487"
            }, {
                "descripcion": "ACAYUCAN TX",
                "nivel": "3",
                "id": "1536",
                "idPadre": "1488"
            }, {
                "descripcion": "ACTOPAN TX",
                "nivel": "3",
                "id": "1537",
                "idPadre": "1489"
            }, {
                "descripcion": "ACUNA TX",
                "nivel": "3",
                "id": "1184",
                "idPadre": "1171"
            }, {
                "descripcion": "AEROPUERTO",
                "nivel": "3",
                "id": "706",
                "idPadre": "592"
            }, {
                "descripcion": "AGUASCALIENTES",
                "nivel": "3",
                "id": "75",
                "idPadre": "74"
            }, {
                "descripcion": "AGUASCALIENTES TX",
                "nivel": "3",
                "id": "1389",
                "idPadre": "1354"
            }, {
                "descripcion": "ALVARADO TX",
                "nivel": "3",
                "id": "1538",
                "idPadre": "1490"
            }, {
                "descripcion": "APAN TX",
                "nivel": "3",
                "id": "1782",
                "idPadre": "1771"
            }, {
                "descripcion": "APASEO EL ALTO TX",
                "nivel": "3",
                "id": "1390",
                "idPadre": "1355"
            }, {
                "descripcion": "APATZINGAN TX",
                "nivel": "3",
                "id": "1256",
                "idPadre": "1223"
            }, {
                "descripcion": "APIZACO TX",
                "nivel": "3",
                "id": "1539",
                "idPadre": "1491"
            }, {
                "descripcion": "ARAGON",
                "nivel": "3",
                "id": "705",
                "idPadre": "592"
            }, {
                "descripcion": "ARANDAS TX",
                "nivel": "3",
                "id": "1257",
                "idPadre": "1224"
            }, {
                "descripcion": "ATLACOMULCO TX",
                "nivel": "3",
                "id": "1783",
                "idPadre": "1772"
            }, {
                "descripcion": "ATLIXCO TX",
                "nivel": "3",
                "id": "1540",
                "idPadre": "1492"
            }, {
                "descripcion": "AUTLAN DE NAVARRO TX",
                "nivel": "3",
                "id": "1258",
                "idPadre": "1225"
            }, {
                "descripcion": "AZCAPOTZALCO",
                "nivel": "3",
                "id": "719",
                "idPadre": "592"
            }, {
                "descripcion": "BAHIA DE BANDERAS TX",
                "nivel": "3",
                "id": "1259",
                "idPadre": "1226"
            }, {
                "descripcion": "BARRANCA",
                "nivel": "3",
                "id": "690",
                "idPadre": "125"
            }, {
                "descripcion": "CALDERITAS TX",
                "nivel": "3",
                "id": "1699",
                "idPadre": "1675"
            }, {
                "descripcion": "CALVILLO TX",
                "nivel": "3",
                "id": "1391",
                "idPadre": "1356"
            }, {
                "descripcion": "CAMARGO TX",
                "nivel": "3",
                "id": "1143",
                "idPadre": "1133"
            }, {
                "descripcion": "CAMPECHE TX",
                "nivel": "3",
                "id": "1700",
                "idPadre": "1676"
            }, {
                "descripcion": "CANCUN",
                "nivel": "3",
                "id": "209",
                "idPadre": "208"
            }, {
                "descripcion": "CANCUN TX",
                "nivel": "3",
                "id": "1701",
                "idPadre": "1677"
            }, {
                "descripcion": "CARDEL TX",
                "nivel": "3",
                "id": "1541",
                "idPadre": "1493"
            }, {
                "descripcion": "CARDENAS-TABASCO TX",
                "nivel": "3",
                "id": "1702",
                "idPadre": "1678"
            }, {
                "descripcion": "CELAYA",
                "nivel": "3",
                "id": "84",
                "idPadre": "83"
            }, {
                "descripcion": "CELAYA TX",
                "nivel": "3",
                "id": "1392",
                "idPadre": "1357"
            }, {
                "descripcion": "CENTRO",
                "nivel": "4",
                "id": "910",
                "idPadre": "166"
            }, {
                "descripcion": "NORTE",
                "nivel": "4",
                "id": "167",
                "idPadre": "166"
            }, {
                "descripcion": "SUR",
                "nivel": "4",
                "id": "171",
                "idPadre": "166"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "5",
                "idPadre": "4"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "20",
                "idPadre": "19"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "30",
                "idPadre": "29"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "76",
                "idPadre": "75"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "85",
                "idPadre": "84"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "94",
                "idPadre": "93"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "106",
                "idPadre": "105"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "116",
                "idPadre": "115"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "158",
                "idPadre": "157"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "177",
                "idPadre": "176"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "192",
                "idPadre": "191"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "200",
                "idPadre": "199"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "210",
                "idPadre": "209"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "218",
                "idPadre": "217"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "288",
                "idPadre": "597"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "379",
                "idPadre": "598"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "683",
                "idPadre": "678"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "684",
                "idPadre": "679"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "685",
                "idPadre": "680"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "686",
                "idPadre": "681"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "687",
                "idPadre": "682"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "695",
                "idPadre": "688"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "696",
                "idPadre": "689"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "697",
                "idPadre": "690"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "698",
                "idPadre": "691"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "699",
                "idPadre": "692"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "700",
                "idPadre": "693"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "701",
                "idPadre": "694"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "726",
                "idPadre": "702"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "727",
                "idPadre": "703"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "728",
                "idPadre": "704"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "729",
                "idPadre": "705"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "730",
                "idPadre": "706"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "731",
                "idPadre": "707"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "732",
                "idPadre": "708"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "733",
                "idPadre": "709"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "734",
                "idPadre": "710"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "736",
                "idPadre": "712"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "737",
                "idPadre": "713"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "738",
                "idPadre": "714"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "739",
                "idPadre": "715"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "740",
                "idPadre": "716"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "741",
                "idPadre": "717"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "742",
                "idPadre": "718"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "743",
                "idPadre": "719"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "744",
                "idPadre": "720"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "745",
                "idPadre": "721"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "746",
                "idPadre": "722"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "747",
                "idPadre": "723"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "748",
                "idPadre": "724"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "749",
                "idPadre": "725"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "776",
                "idPadre": "775"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "899",
                "idPadre": "898"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "973",
                "idPadre": "568"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "978",
                "idPadre": "575"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "994",
                "idPadre": "570"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "999",
                "idPadre": "851"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1024",
                "idPadre": "1023"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1029",
                "idPadre": "1028"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1034",
                "idPadre": "1033"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1060",
                "idPadre": "1053"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1061",
                "idPadre": "1054"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1062",
                "idPadre": "1055"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1063",
                "idPadre": "1056"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1064",
                "idPadre": "1057"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1065",
                "idPadre": "1058"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1066",
                "idPadre": "1059"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1103",
                "idPadre": "1088"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1104",
                "idPadre": "1089"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1105",
                "idPadre": "1090"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1106",
                "idPadre": "1091"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1107",
                "idPadre": "1092"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1108",
                "idPadre": "1093"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1109",
                "idPadre": "1094"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1110",
                "idPadre": "1095"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1111",
                "idPadre": "1096"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1112",
                "idPadre": "1097"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1113",
                "idPadre": "1098"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1114",
                "idPadre": "1099"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1115",
                "idPadre": "1100"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1116",
                "idPadre": "1101"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1117",
                "idPadre": "1102"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1153",
                "idPadre": "1143"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1154",
                "idPadre": "1144"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1155",
                "idPadre": "1145"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1156",
                "idPadre": "1146"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1157",
                "idPadre": "1147"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1158",
                "idPadre": "1148"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1159",
                "idPadre": "1149"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1160",
                "idPadre": "1150"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1161",
                "idPadre": "1151"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1162",
                "idPadre": "1152"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1197",
                "idPadre": "1184"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1198",
                "idPadre": "1185"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1199",
                "idPadre": "1186"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1200",
                "idPadre": "1187"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1201",
                "idPadre": "1188"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1202",
                "idPadre": "1189"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1203",
                "idPadre": "1190"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1204",
                "idPadre": "1191"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1205",
                "idPadre": "1192"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1206",
                "idPadre": "1193"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1207",
                "idPadre": "1194"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1208",
                "idPadre": "1195"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1209",
                "idPadre": "1196"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1288",
                "idPadre": "1255"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1289",
                "idPadre": "1256"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1290",
                "idPadre": "1257"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1291",
                "idPadre": "1258"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1292",
                "idPadre": "1259"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1293",
                "idPadre": "1260"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1294",
                "idPadre": "1261"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1295",
                "idPadre": "1262"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1296",
                "idPadre": "1263"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1297",
                "idPadre": "1264"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1298",
                "idPadre": "1265"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1299",
                "idPadre": "1266"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1300",
                "idPadre": "1267"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1301",
                "idPadre": "1268"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1302",
                "idPadre": "1269"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1303",
                "idPadre": "1270"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1304",
                "idPadre": "1271"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1305",
                "idPadre": "1272"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1306",
                "idPadre": "1273"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1307",
                "idPadre": "1274"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1308",
                "idPadre": "1275"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1309",
                "idPadre": "1276"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1310",
                "idPadre": "1277"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1311",
                "idPadre": "1278"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1312",
                "idPadre": "1279"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1313",
                "idPadre": "1280"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1314",
                "idPadre": "1281"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1315",
                "idPadre": "1282"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1316",
                "idPadre": "1283"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1317",
                "idPadre": "1284"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1318",
                "idPadre": "1285"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1319",
                "idPadre": "1286"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1320",
                "idPadre": "1287"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1422",
                "idPadre": "1387"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1423",
                "idPadre": "1388"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1424",
                "idPadre": "1389"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1425",
                "idPadre": "1390"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1426",
                "idPadre": "1391"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1427",
                "idPadre": "1392"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1428",
                "idPadre": "1393"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1429",
                "idPadre": "1394"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1430",
                "idPadre": "1395"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1431",
                "idPadre": "1396"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1432",
                "idPadre": "1397"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1433",
                "idPadre": "1398"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1434",
                "idPadre": "1399"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1435",
                "idPadre": "1400"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1436",
                "idPadre": "1401"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1437",
                "idPadre": "1402"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1438",
                "idPadre": "1403"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1439",
                "idPadre": "1404"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1440",
                "idPadre": "1405"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1441",
                "idPadre": "1406"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1442",
                "idPadre": "1407"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1443",
                "idPadre": "1408"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1444",
                "idPadre": "1409"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1445",
                "idPadre": "1410"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1446",
                "idPadre": "1411"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1447",
                "idPadre": "1412"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1448",
                "idPadre": "1413"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1449",
                "idPadre": "1414"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1450",
                "idPadre": "1415"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1451",
                "idPadre": "1416"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1452",
                "idPadre": "1417"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1453",
                "idPadre": "1418"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1454",
                "idPadre": "1419"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1455",
                "idPadre": "1420"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1456",
                "idPadre": "1421"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1583",
                "idPadre": "1535"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1584",
                "idPadre": "1536"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1585",
                "idPadre": "1537"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1586",
                "idPadre": "1538"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1587",
                "idPadre": "1539"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1588",
                "idPadre": "1540"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1589",
                "idPadre": "1541"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1590",
                "idPadre": "1542"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1591",
                "idPadre": "1543"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1592",
                "idPadre": "1544"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1593",
                "idPadre": "1545"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1594",
                "idPadre": "1546"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1595",
                "idPadre": "1547"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1596",
                "idPadre": "1548"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1597",
                "idPadre": "1549"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1598",
                "idPadre": "1550"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1599",
                "idPadre": "1551"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1600",
                "idPadre": "1552"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1601",
                "idPadre": "1553"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1602",
                "idPadre": "1554"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1603",
                "idPadre": "1555"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1604",
                "idPadre": "1556"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1605",
                "idPadre": "1557"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1606",
                "idPadre": "1558"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1607",
                "idPadre": "1559"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1608",
                "idPadre": "1560"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1609",
                "idPadre": "1561"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1610",
                "idPadre": "1562"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1611",
                "idPadre": "1563"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1612",
                "idPadre": "1564"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1613",
                "idPadre": "1565"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1614",
                "idPadre": "1566"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1615",
                "idPadre": "1567"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1616",
                "idPadre": "1568"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1617",
                "idPadre": "1569"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1618",
                "idPadre": "1570"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1619",
                "idPadre": "1571"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1620",
                "idPadre": "1572"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1621",
                "idPadre": "1573"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1622",
                "idPadre": "1574"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1623",
                "idPadre": "1575"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1624",
                "idPadre": "1576"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1625",
                "idPadre": "1577"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1626",
                "idPadre": "1578"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1627",
                "idPadre": "1579"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1628",
                "idPadre": "1580"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1629",
                "idPadre": "1581"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1630",
                "idPadre": "1582"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1723",
                "idPadre": "1699"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1724",
                "idPadre": "1700"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1725",
                "idPadre": "1701"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1726",
                "idPadre": "1702"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1727",
                "idPadre": "1703"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1728",
                "idPadre": "1704"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1729",
                "idPadre": "1705"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1730",
                "idPadre": "1706"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1731",
                "idPadre": "1707"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1732",
                "idPadre": "1708"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1733",
                "idPadre": "1709"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1734",
                "idPadre": "1710"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1735",
                "idPadre": "1711"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1736",
                "idPadre": "1712"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1737",
                "idPadre": "1713"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1738",
                "idPadre": "1714"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1739",
                "idPadre": "1715"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1740",
                "idPadre": "1716"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1741",
                "idPadre": "1717"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1742",
                "idPadre": "1718"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1743",
                "idPadre": "1719"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1744",
                "idPadre": "1720"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1745",
                "idPadre": "1721"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1746",
                "idPadre": "1722"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1793",
                "idPadre": "1782"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1794",
                "idPadre": "1783"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1795",
                "idPadre": "1784"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1796",
                "idPadre": "1785"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1797",
                "idPadre": "1786"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1798",
                "idPadre": "1787"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1799",
                "idPadre": "1788"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1800",
                "idPadre": "1789"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1801",
                "idPadre": "1790"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1802",
                "idPadre": "1791"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1803",
                "idPadre": "1792"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1944",
                "idPadre": "1943"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "1948",
                "idPadre": "1947"
            }, {
                "descripcion": "SZ",
                "nivel": "4",
                "id": "2120",
                "idPadre": "2119"
            }, {
                "descripcion": "ZONA TX",
                "nivel": "4",
                "id": "971",
                "idPadre": "970"
            }, {
                "descripcion": "ZAPATA",
                "nivel": "5",
                "id": "671",
                "idPadre": "5"
            }, {
                "descripcion": "ZAPOPAN",
                "nivel": "5",
                "id": "134",
                "idPadre": "695"
            }, {
                "descripcion": "ZERTUCHE",
                "nivel": "5",
                "id": "60",
                "idPadre": "685"
            }, {
                "descripcion": "ZINACANTEPEC",
                "nivel": "5",
                "id": "650",
                "idPadre": "288"
            }, {
                "descripcion": "ZOMEYUCAN",
                "nivel": "5",
                "id": "375",
                "idPadre": "744"
            }, {
                "descripcion": "TX TECAMACHALCO",
                "nivel": "5",
                "id": "1663",
                "idPadre": "1617"
            }, {
                "descripcion": "TX TECATE",
                "nivel": "5",
                "id": "1072",
                "idPadre": "1065"
            }, {
                "descripcion": "TX TECOMAN",
                "nivel": "5",
                "id": "1345",
                "idPadre": "1314"
            }, {
                "descripcion": "TX TEHUACAN",
                "nivel": "5",
                "id": "1664",
                "idPadre": "1618"
            }, {
                "descripcion": "TX TENANCINGO DE DEGOLLADO",
                "nivel": "5",
                "id": "1810",
                "idPadre": "1801"
            }, {
                "descripcion": "TX TEPATITLAN",
                "nivel": "5",
                "id": "1346",
                "idPadre": "1315"
            }, {
                "descripcion": "TX TEPEJI DEL RIO",
                "nivel": "5",
                "id": "1479",
                "idPadre": "1449"
            }, {
                "descripcion": "TX TEPIC",
                "nivel": "5",
                "id": "1347",
                "idPadre": "1316"
            }, {
                "descripcion": "TX TEQUILA",
                "nivel": "5",
                "id": "1348",
                "idPadre": "1317"
            }, {
                "descripcion": "TX TEQUISQUIAPAN",
                "nivel": "5",
                "id": "1480",
                "idPadre": "1450"
            }, {
                "descripcion": "TX TEXMELUCAN",
                "nivel": "5",
                "id": "1665",
                "idPadre": "1619"
            }, {
                "descripcion": "TX TEZIUTLAN",
                "nivel": "5",
                "id": "1666",
                "idPadre": "1620"
            }, {
                "descripcion": "TX TIERRA BLANCA",
                "nivel": "5",
                "id": "1667",
                "idPadre": "1621"
            }, {
                "descripcion": "TX TIJUANA",
                "nivel": "5",
                "id": "922",
                "idPadre": "1066"
            }, {
                "descripcion": "TX TLAXCALA",
                "nivel": "5",
                "id": "1668",
                "idPadre": "1622"
            }, {
                "descripcion": "TX TLAXCOAPAN",
                "nivel": "5",
                "id": "1481",
                "idPadre": "1451"
            }, {
                "descripcion": "TX TOLUCA",
                "nivel": "5",
                "id": "964",
                "idPadre": "1802"
            }, {
                "descripcion": "TX TORREON",
                "nivel": "5",
                "id": "1170",
                "idPadre": "1162"
            }, {
                "descripcion": "TX TRES MARIAS",
                "nivel": "5",
                "id": "1669",
                "idPadre": "1623"
            }, {
                "descripcion": "TX TULA DE ALLENDE",
                "nivel": "5",
                "id": "1482",
                "idPadre": "1452"
            }, {
                "descripcion": "TX TULUM",
                "nivel": "5",
                "id": "1765",
                "idPadre": "1743"
            }, {
                "descripcion": "TX TUXPAN",
                "nivel": "5",
                "id": "1670",
                "idPadre": "1624"
            }, {
                "descripcion": "TX TUXPAN (NAYARIT)",
                "nivel": "5",
                "id": "1349",
                "idPadre": "1318"
            }, {
                "descripcion": "TX TUXTEPEC",
                "nivel": "5",
                "id": "1671",
                "idPadre": "1625"
            }, {
                "descripcion": "TX TUXTLA GUTIERREZ",
                "nivel": "5",
                "id": "1766",
                "idPadre": "1744"
            }, {
                "descripcion": "TX URUAPAN",
                "nivel": "5",
                "id": "1350",
                "idPadre": "1319"
            }, {
                "descripcion": "TX VALLADOLID",
                "nivel": "5",
                "id": "1767",
                "idPadre": "1745"
            }, {
                "descripcion": "TX VALLE DE BRAVO",
                "nivel": "5",
                "id": "1811",
                "idPadre": "1803"
            }, {
                "descripcion": "TX VALLE DE SANTIAGO",
                "nivel": "5",
                "id": "1483",
                "idPadre": "1453"
            }, {
                "descripcion": "TX VERACRUZ",
                "nivel": "5",
                "id": "952",
                "idPadre": "1626"
            }, {
                "descripcion": "TX VICTOR ROSALES",
                "nivel": "5",
                "id": "1484",
                "idPadre": "1454"
            }, {
                "descripcion": "TX VILLAHERMOSA",
                "nivel": "5",
                "id": "1768",
                "idPadre": "1746"
            }, {
                "descripcion": "TX XALAPA",
                "nivel": "5",
                "id": "955",
                "idPadre": "1627"
            }, {
                "descripcion": "TX YAUTEPEC",
                "nivel": "5",
                "id": "1673",
                "idPadre": "1629"
            }, {
                "descripcion": "TX ZACATECAS",
                "nivel": "5",
                "id": "1485",
                "idPadre": "1455"
            }, {
                "descripcion": "TX ZACATEPEC DE HIDALGO",
                "nivel": "5",
                "id": "1674",
                "idPadre": "1630"
            }, {
                "descripcion": "TX ZAMORA",
                "nivel": "5",
                "id": "1351",
                "idPadre": "1320"
            }, {
                "descripcion": "TX ZIHUATANEJO",
                "nivel": "5",
                "id": "1672",
                "idPadre": "1628"
            }, {
                "descripcion": "UDLA",
                "nivel": "5",
                "id": "186",
                "idPadre": "177"
            }, {
                "descripcion": "UNIVERSIDAD",
                "nivel": "5",
                "id": "647",
                "idPadre": "683"
            }, {
                "descripcion": "VALLARTA",
                "nivel": "5",
                "id": "154",
                "idPadre": "701"
            }, {
                "descripcion": "VALLE DE BRAVO",
                "nivel": "5",
                "id": "1000",
                "idPadre": "999"
            }, {
                "descripcion": "VALLE DE HUAJUCO",
                "nivel": "5",
                "id": "71",
                "idPadre": "684"
            }, {
                "descripcion": "VALLE DE HUINALA",
                "nivel": "5",
                "id": "59",
                "idPadre": "686"
            }, {
                "descripcion": "VALLE DE LOS MOLINOS",
                "nivel": "5",
                "id": "606",
                "idPadre": "695"
            }, {
                "descripcion": "VALLE DORADO",
                "nivel": "5",
                "id": "348",
                "idPadre": "742"
            }, {
                "descripcion": "VALLE VERDE",
                "nivel": "5",
                "id": "1018",
                "idPadre": "5"
            }, {
                "descripcion": "VALLEJO",
                "nivel": "5",
                "id": "367",
                "idPadre": "741"
            }, {
                "descripcion": "VALSEQUILLO",
                "nivel": "5",
                "id": "187",
                "idPadre": "1945"
            }, {
                "descripcion": "VENUSTIANO CARRANZA",
                "nivel": "5",
                "id": "975",
                "idPadre": "973"
            }, {
                "descripcion": "VERTIZ NARVARTE",
                "nivel": "5",
                "id": "242",
                "idPadre": "736"
            }, {
                "descripcion": "VILLA DE LAS FLORES",
                "nivel": "5",
                "id": "304",
                "idPadre": "726"
            }, {
                "descripcion": "VILLA DEL CARMEN",
                "nivel": "5",
                "id": "759",
                "idPadre": "94"
            }, {
                "descripcion": "VILLA JUAREZ",
                "nivel": "5",
                "id": "27",
                "idPadre": "20"
            }, {
                "descripcion": "VILLA MITRAS",
                "nivel": "5",
                "id": "72",
                "idPadre": "683"
            }, {
                "descripcion": "VILLA VERONA",
                "nivel": "5",
                "id": "608",
                "idPadre": "695"
            }, {
                "descripcion": "VILLAS",
                "nivel": "5",
                "id": "668",
                "idPadre": "76"
            }, {
                "descripcion": "VILLAS DEL ALAMO",
                "nivel": "5",
                "id": "383",
                "idPadre": "379"
            }, {
                "descripcion": "VISTA HERMOSA",
                "nivel": "5",
                "id": "253",
                "idPadre": "733"
            }, {
                "descripcion": "XOCHIACA",
                "nivel": "5",
                "id": "651",
                "idPadre": "748"
            }, {
                "descripcion": "XOCHIMILCO",
                "nivel": "5",
                "id": "285",
                "idPadre": "740"
            }, {
                "descripcion": "XOCHITEPEC",
                "nivel": "5",
                "id": "760",
                "idPadre": "171"
            }, {
                "descripcion": "ZACATENCO",
                "nivel": "5",
                "id": "368",
                "idPadre": "741"
            }, {
                "descripcion": "ZALATE II",
                "nivel": "5",
                "id": "610",
                "idPadre": "697"
            }, {
                "descripcion": "TX MANZANILLO",
                "nivel": "5",
                "id": "1338",
                "idPadre": "1306"
            }, {
                "descripcion": "TX MARTINEZ DE LA TORRE",
                "nivel": "5",
                "id": "1651",
                "idPadre": "1604"
            }, {
                "descripcion": "TX MATAMOROS",
                "nivel": "5",
                "id": "1213",
                "idPadre": "1200"
            }, {
                "descripcion": "TX MATEHUALA",
                "nivel": "5",
                "id": "1471",
                "idPadre": "1439"
            }, {
                "descripcion": "TX MAZATLAN",
                "nivel": "5",
                "id": "1127",
                "idPadre": "1112"
            }, {
                "descripcion": "TX MERIDA",
                "nivel": "5",
                "id": "961",
                "idPadre": "1738"
            }, {
                "descripcion": "TX MEXICALI",
                "nivel": "5",
                "id": "1068",
                "idPadre": "1061"
            }, {
                "descripcion": "TX MINATITLAN",
                "nivel": "5",
                "id": "1652",
                "idPadre": "1605"
            }, {
                "descripcion": "TX MONCLOVA",
                "nivel": "5",
                "id": "1214",
                "idPadre": "1201"
            }, {
                "descripcion": "TX MONTEMORELOS",
                "nivel": "5",
                "id": "1215",
                "idPadre": "1202"
            }, {
                "descripcion": "TX MONTERREY",
                "nivel": "5",
                "id": "916",
                "idPadre": "1203"
            }, {
                "descripcion": "TX MORELIA",
                "nivel": "5",
                "id": "943",
                "idPadre": "1307"
            }, {
                "descripcion": "TX MOROLEON",
                "nivel": "5",
                "id": "1339",
                "idPadre": "1308"
            }, {
                "descripcion": "TX NAOLINCO",
                "nivel": "5",
                "id": "1653",
                "idPadre": "1606"
            }, {
                "descripcion": "TX NAVOJOA",
                "nivel": "5",
                "id": "1128",
                "idPadre": "1113"
            }, {
                "descripcion": "TX NOGALES",
                "nivel": "5",
                "id": "1129",
                "idPadre": "1114"
            }, {
                "descripcion": "TX NORTE",
                "nivel": "5",
                "id": "778",
                "idPadre": "1787"
            }, {
                "descripcion": "TX NORTE 2",
                "nivel": "5",
                "id": "993",
                "idPadre": "1798"
            }, {
                "descripcion": "TX NUEVO LAREDO",
                "nivel": "5",
                "id": "1216",
                "idPadre": "1204"
            }, {
                "descripcion": "TX OAXACA",
                "nivel": "5",
                "id": "1654",
                "idPadre": "1607"
            }, {
                "descripcion": "TX OCOTLAN",
                "nivel": "5",
                "id": "1340",
                "idPadre": "1309"
            }, {
                "descripcion": "TX ORIENTE",
                "nivel": "5",
                "id": "779",
                "idPadre": "1787"
            }, {
                "descripcion": "TX ORIZABA",
                "nivel": "5",
                "id": "1655",
                "idPadre": "1608"
            }, {
                "descripcion": "TX PACHUCA",
                "nivel": "5",
                "id": "967",
                "idPadre": "1799"
            }, {
                "descripcion": "TX PALM VALLEY-TIJUANA",
                "nivel": "5",
                "id": "1069",
                "idPadre": "1062"
            }, {
                "descripcion": "TX PAZCUARO",
                "nivel": "5",
                "id": "1341",
                "idPadre": "1310"
            }, {
                "descripcion": "TX PEDRO ESCOBEDO",
                "nivel": "5",
                "id": "1472",
                "idPadre": "1440"
            }, {
                "descripcion": "TX PENJAMO",
                "nivel": "5",
                "id": "1473",
                "idPadre": "1441"
            }, {
                "descripcion": "TX PEROTE",
                "nivel": "5",
                "id": "1656",
                "idPadre": "1609"
            }, {
                "descripcion": "TX PIEDRAS NEGRAS",
                "nivel": "5",
                "id": "1217",
                "idPadre": "1205"
            }, {
                "descripcion": "TX PINOTEPA NACIONAL",
                "nivel": "5",
                "id": "1657",
                "idPadre": "1610"
            }, {
                "descripcion": "TX PLAYA ENCANTO",
                "nivel": "5",
                "id": "1130",
                "idPadre": "1115"
            }, {
                "descripcion": "TX PONIENTE",
                "nivel": "5",
                "id": "1812",
                "idPadre": "1798"
            }, {
                "descripcion": "TX PORT CHIAPAS-CHIAPAS",
                "nivel": "5",
                "id": "1761",
                "idPadre": "1739"
            }, {
                "descripcion": "TX POZA RICA",
                "nivel": "5",
                "id": "1658",
                "idPadre": "1611"
            }, {
                "descripcion": "TX PROGRESO",
                "nivel": "5",
                "id": "1342",
                "idPadre": "1311"
            }, {
                "descripcion": "TX PUEBLA",
                "nivel": "5",
                "id": "949",
                "idPadre": "1612"
            }, {
                "descripcion": "TX PUERTO PENASCO",
                "nivel": "5",
                "id": "1070",
                "idPadre": "1063"
            }, {
                "descripcion": "TX PUERTO VALLARTA",
                "nivel": "5",
                "id": "1343",
                "idPadre": "1312"
            }, {
                "descripcion": "TX QUERETARO",
                "nivel": "5",
                "id": "940",
                "idPadre": "1442"
            }, {
                "descripcion": "TX REYNOSA",
                "nivel": "5",
                "id": "1218",
                "idPadre": "1206"
            }, {
                "descripcion": "TX ROSARITO",
                "nivel": "5",
                "id": "1071",
                "idPadre": "1064"
            }, {
                "descripcion": "TX SABINAS",
                "nivel": "5",
                "id": "1219",
                "idPadre": "1207"
            }, {
                "descripcion": "TX SALAMANCA",
                "nivel": "5",
                "id": "1474",
                "idPadre": "1443"
            }, {
                "descripcion": "TX SALINA CRUZ",
                "nivel": "5",
                "id": "1659",
                "idPadre": "1613"
            }, {
                "descripcion": "TX SALTILLO",
                "nivel": "5",
                "id": "1220",
                "idPadre": "1208"
            }, {
                "descripcion": "TX SAN ANDRES TUXTLA",
                "nivel": "5",
                "id": "1660",
                "idPadre": "1614"
            }, {
                "descripcion": "TX SAN CRISTOBAL DE LAS CASAS",
                "nivel": "5",
                "id": "1762",
                "idPadre": "1740"
            }, {
                "descripcion": "TX SAN JOSE DEL CABO",
                "nivel": "5",
                "id": "1131",
                "idPadre": "1116"
            }, {
                "descripcion": "TX SAN JUAN DE TEOTIHUACAN",
                "nivel": "5",
                "id": "1809",
                "idPadre": "1800"
            }, {
                "descripcion": "TX SAN JUAN DEL RIO",
                "nivel": "5",
                "id": "1475",
                "idPadre": "1444"
            }, {
                "descripcion": "TX SAN LUIS DE LA PAZ",
                "nivel": "5",
                "id": "1476",
                "idPadre": "1445"
            }, {
                "descripcion": "TX SAN LUIS POTOSI",
                "nivel": "5",
                "id": "919",
                "idPadre": "1446"
            }, {
                "descripcion": "TX SAN LUIS RIO COLORADO",
                "nivel": "5",
                "id": "1132",
                "idPadre": "1117"
            }, {
                "descripcion": "TX SAN MIGUEL ALLENDE",
                "nivel": "5",
                "id": "1477",
                "idPadre": "1447"
            }, {
                "descripcion": "TX SAN PEDRO POCHUTLA",
                "nivel": "5",
                "id": "1661",
                "idPadre": "1615"
            }, {
                "descripcion": "TX SANTIAGO",
                "nivel": "5",
                "id": "1486",
                "idPadre": "1456"
            }, {
                "descripcion": "TX SILAO",
                "nivel": "5",
                "id": "1478",
                "idPadre": "1448"
            }, {
                "descripcion": "TX SUR",
                "nivel": "5",
                "id": "780",
                "idPadre": "1787"
            }, {
                "descripcion": "TX TALA",
                "nivel": "5",
                "id": "1344",
                "idPadre": "1313"
            }, {
                "descripcion": "TX TAMPICO",
                "nivel": "5",
                "id": "1221",
                "idPadre": "1209"
            }, {
                "descripcion": "TX TAPACHULA",
                "nivel": "5",
                "id": "1763",
                "idPadre": "1741"
            }, {
                "descripcion": "TX TAXCO",
                "nivel": "5",
                "id": "1662",
                "idPadre": "1616"
            }, {
                "descripcion": "TX TEAPA",
                "nivel": "5",
                "id": "1764",
                "idPadre": "1742"
            }, {
                "descripcion": "TX CIUDAD GUZMAN",
                "nivel": "5",
                "id": "1327",
                "idPadre": "1294"
            }, {
                "descripcion": "TX CIUDAD JUAREZ",
                "nivel": "5",
                "id": "928",
                "idPadre": "1155"
            }, {
                "descripcion": "TX CIUDAD MANTE",
                "nivel": "5",
                "id": "1461",
                "idPadre": "1428"
            }, {
                "descripcion": "TX CIUDAD OBREGON",
                "nivel": "5",
                "id": "1119",
                "idPadre": "1104"
            }, {
                "descripcion": "TX CIUDAD VALLES",
                "nivel": "5",
                "id": "1462",
                "idPadre": "1429"
            }, {
                "descripcion": "TX CIUDAD VICTORIA",
                "nivel": "5",
                "id": "1211",
                "idPadre": "1198"
            }, {
                "descripcion": "TX COATEPEC",
                "nivel": "5",
                "id": "1640",
                "idPadre": "1592"
            }, {
                "descripcion": "TX COATZACOALCOS",
                "nivel": "5",
                "id": "1641",
                "idPadre": "1593"
            }, {
                "descripcion": "TX COLIMA",
                "nivel": "5",
                "id": "1328",
                "idPadre": "1295"
            }, {
                "descripcion": "TX COMALCALCO",
                "nivel": "5",
                "id": "1753",
                "idPadre": "1730"
            }, {
                "descripcion": "TX COMONFORT",
                "nivel": "5",
                "id": "1463",
                "idPadre": "1430"
            }, {
                "descripcion": "TX CORDOBA",
                "nivel": "5",
                "id": "1642",
                "idPadre": "1594"
            }, {
                "descripcion": "TX COSAMALOAPAN",
                "nivel": "5",
                "id": "1643",
                "idPadre": "1595"
            }, {
                "descripcion": "TX COZUMEL",
                "nivel": "5",
                "id": "1754",
                "idPadre": "1731"
            }, {
                "descripcion": "TX CRUCECITA",
                "nivel": "5",
                "id": "1644",
                "idPadre": "1596"
            }, {
                "descripcion": "TX CUAHUTEMOC",
                "nivel": "5",
                "id": "1164",
                "idPadre": "1156"
            }, {
                "descripcion": "TX CUAUTLA",
                "nivel": "5",
                "id": "1645",
                "idPadre": "1597"
            }, {
                "descripcion": "TX CUERNAVACA",
                "nivel": "5",
                "id": "946",
                "idPadre": "1598"
            }, {
                "descripcion": "TX CULIACAN",
                "nivel": "5",
                "id": "1120",
                "idPadre": "1105"
            }, {
                "descripcion": "TX DELICIAS",
                "nivel": "5",
                "id": "1165",
                "idPadre": "1157"
            }, {
                "descripcion": "TX DOLORES HIDALGO",
                "nivel": "5",
                "id": "1464",
                "idPadre": "1431"
            }, {
                "descripcion": "TX DONATO GUERRA",
                "nivel": "5",
                "id": "1806",
                "idPadre": "1795"
            }, {
                "descripcion": "TX DURANGO",
                "nivel": "5",
                "id": "1166",
                "idPadre": "1158"
            }, {
                "descripcion": "TX EL PARAISO-TABASCO",
                "nivel": "5",
                "id": "1755",
                "idPadre": "1732"
            }, {
                "descripcion": "TX ENSENADA",
                "nivel": "5",
                "id": "1067",
                "idPadre": "1060"
            }, {
                "descripcion": "TX ESCARCEGA",
                "nivel": "5",
                "id": "1756",
                "idPadre": "1733"
            }, {
                "descripcion": "TX FRESNILLO",
                "nivel": "5",
                "id": "1465",
                "idPadre": "1432"
            }, {
                "descripcion": "TX FRONTERA HIDALGO",
                "nivel": "5",
                "id": "1757",
                "idPadre": "1734"
            }, {
                "descripcion": "TX GUADALAJARA",
                "nivel": "5",
                "id": "913",
                "idPadre": "1296"
            }, {
                "descripcion": "TX GUAMUCHIL",
                "nivel": "5",
                "id": "1121",
                "idPadre": "1106"
            }, {
                "descripcion": "TX GUANAJUATO",
                "nivel": "5",
                "id": "1466",
                "idPadre": "1433"
            }, {
                "descripcion": "TX GUASAVE",
                "nivel": "5",
                "id": "1122",
                "idPadre": "1107"
            }, {
                "descripcion": "TX GUAYMAS",
                "nivel": "5",
                "id": "1123",
                "idPadre": "1108"
            }, {
                "descripcion": "TX HERMOSILLO",
                "nivel": "5",
                "id": "1124",
                "idPadre": "1109"
            }, {
                "descripcion": "TX HIDALGO DEL PARRAL",
                "nivel": "5",
                "id": "1167",
                "idPadre": "1159"
            }, {
                "descripcion": "TX HUACHINANGO",
                "nivel": "5",
                "id": "1646",
                "idPadre": "1599"
            }, {
                "descripcion": "TX HUAJUAPAN DE LEON",
                "nivel": "5",
                "id": "1647",
                "idPadre": "1600"
            }, {
                "descripcion": "TX HUATULCO",
                "nivel": "5",
                "id": "1648",
                "idPadre": "1601"
            }, {
                "descripcion": "TX HUIXTLA",
                "nivel": "5",
                "id": "1758",
                "idPadre": "1735"
            }, {
                "descripcion": "TX IGUALA",
                "nivel": "5",
                "id": "1649",
                "idPadre": "1602"
            }, {
                "descripcion": "TX IRAPUATO",
                "nivel": "5",
                "id": "1467",
                "idPadre": "1434"
            }, {
                "descripcion": "TX ISLA MUJERES",
                "nivel": "5",
                "id": "1759",
                "idPadre": "1736"
            }, {
                "descripcion": "TX IXMIQUILPAN",
                "nivel": "5",
                "id": "1468",
                "idPadre": "1435"
            }, {
                "descripcion": "TX IXTAPAN DE LA SAL",
                "nivel": "5",
                "id": "1807",
                "idPadre": "1796"
            }, {
                "descripcion": "TX IXTLAHUACA DE RAYON",
                "nivel": "5",
                "id": "1808",
                "idPadre": "1797"
            }, {
                "descripcion": "TX IXTLAN DEL RIO",
                "nivel": "5",
                "id": "1329",
                "idPadre": "1297"
            }, {
                "descripcion": "TX IZUCAR DE MATAMOROS",
                "nivel": "5",
                "id": "1650",
                "idPadre": "1603"
            }, {
                "descripcion": "TX JIMENEZ",
                "nivel": "5",
                "id": "1168",
                "idPadre": "1160"
            }, {
                "descripcion": "TX JUCHITAN",
                "nivel": "5",
                "id": "1330",
                "idPadre": "1298"
            }, {
                "descripcion": "TX JUVENTINO ROSAS",
                "nivel": "5",
                "id": "1469",
                "idPadre": "1436"
            }, {
                "descripcion": "TX LA BARCA",
                "nivel": "5",
                "id": "1331",
                "idPadre": "1299"
            }, {
                "descripcion": "TX LA PAZ",
                "nivel": "5",
                "id": "1125",
                "idPadre": "1110"
            }, {
                "descripcion": "TX LA PIEDAD",
                "nivel": "5",
                "id": "1332",
                "idPadre": "1300"
            }, {
                "descripcion": "TX LAGOS DE MORENO",
                "nivel": "5",
                "id": "1333",
                "idPadre": "1301"
            }, {
                "descripcion": "TX LAGUNILLAS",
                "nivel": "5",
                "id": "1334",
                "idPadre": "1302"
            }, {
                "descripcion": "TX LAS CHOAPAS-VERACRUZ",
                "nivel": "5",
                "id": "1470",
                "idPadre": "1437"
            }, {
                "descripcion": "TX LAS CRUCES-CHIHUAHUA",
                "nivel": "5",
                "id": "1169",
                "idPadre": "1161"
            }, {
                "descripcion": "TX LAZARO CARDENAS",
                "nivel": "5",
                "id": "1335",
                "idPadre": "1303"
            }, {
                "descripcion": "TX LEON",
                "nivel": "5",
                "id": "937",
                "idPadre": "1438"
            }, {
                "descripcion": "TX LINARES",
                "nivel": "5",
                "id": "1212",
                "idPadre": "1199"
            }, {
                "descripcion": "TX LOMA BONITA",
                "nivel": "5",
                "id": "1336",
                "idPadre": "1304"
            }, {
                "descripcion": "TX LOS MOCHIS",
                "nivel": "5",
                "id": "1126",
                "idPadre": "1111"
            }, {
                "descripcion": "TX LOS REYES DE SALGADO",
                "nivel": "5",
                "id": "1337",
                "idPadre": "1305"
            }, {
                "descripcion": "TX MACUSPANA",
                "nivel": "5",
                "id": "1760",
                "idPadre": "1737"
            }, {
                "descripcion": "TEPALCAPA",
                "nivel": "5",
                "id": "339",
                "idPadre": "747"
            }, {
                "descripcion": "TEPEPAN",
                "nivel": "5",
                "id": "284",
                "idPadre": "740"
            }, {
                "descripcion": "TEPETLIXPAN",
                "nivel": "5",
                "id": "340",
                "idPadre": "745"
            }, {
                "descripcion": "TEPEYAC",
                "nivel": "5",
                "id": "123",
                "idPadre": "116"
            }, {
                "descripcion": "TEPOJACO",
                "nivel": "5",
                "id": "648",
                "idPadre": "747"
            }, {
                "descripcion": "TERRANOVA",
                "nivel": "5",
                "id": "113",
                "idPadre": "106"
            }, {
                "descripcion": "TESISTAN",
                "nivel": "5",
                "id": "133",
                "idPadre": "695"
            }, {
                "descripcion": "THOMPSON",
                "nivel": "5",
                "id": "42",
                "idPadre": "30"
            }, {
                "descripcion": "TICOMAN",
                "nivel": "5",
                "id": "366",
                "idPadre": "741"
            }, {
                "descripcion": "TIERRA BUENA",
                "nivel": "5",
                "id": "81",
                "idPadre": "76"
            }, {
                "descripcion": "TIERRA NUEVA",
                "nivel": "5",
                "id": "631",
                "idPadre": "30"
            }, {
                "descripcion": "TLAJOMULCO DE ZUNIGA",
                "nivel": "5",
                "id": "609",
                "idPadre": "700"
            }, {
                "descripcion": "TLALNEPANTLA",
                "nivel": "5",
                "id": "347",
                "idPadre": "742"
            }, {
                "descripcion": "TLAQUEPAQUE",
                "nivel": "5",
                "id": "142",
                "idPadre": "698"
            }, {
                "descripcion": "TLAQUEPAQUE II",
                "nivel": "5",
                "id": "624",
                "idPadre": "698"
            }, {
                "descripcion": "TLATILCO",
                "nivel": "5",
                "id": "374",
                "idPadre": "744"
            }, {
                "descripcion": "TOLOTZIN",
                "nivel": "5",
                "id": "314",
                "idPadre": "729"
            }, {
                "descripcion": "TOLUCA 1 CENTRO",
                "nivel": "5",
                "id": "292",
                "idPadre": "288"
            }, {
                "descripcion": "TOLUCA CU",
                "nivel": "5",
                "id": "293",
                "idPadre": "288"
            }, {
                "descripcion": "TOLUCA SAN CARLOS",
                "nivel": "5",
                "id": "294",
                "idPadre": "288"
            }, {
                "descripcion": "TOLUCA-LEONES",
                "nivel": "5",
                "id": "264",
                "idPadre": "737"
            }, {
                "descripcion": "TONALA",
                "nivel": "5",
                "id": "143",
                "idPadre": "698"
            }, {
                "descripcion": "TOPOCHICO",
                "nivel": "5",
                "id": "672",
                "idPadre": "683"
            }, {
                "descripcion": "TORREMOLINOS",
                "nivel": "5",
                "id": "214",
                "idPadre": "210"
            }, {
                "descripcion": "TOTOLTEPEC",
                "nivel": "5",
                "id": "290",
                "idPadre": "288"
            }, {
                "descripcion": "TULPETLAC",
                "nivel": "5",
                "id": "621",
                "idPadre": "728"
            }, {
                "descripcion": "TULTEPEC",
                "nivel": "5",
                "id": "353",
                "idPadre": "746"
            }, {
                "descripcion": "TULTITLAN",
                "nivel": "5",
                "id": "354",
                "idPadre": "746"
            }, {
                "descripcion": "TX ABASOLO",
                "nivel": "5",
                "id": "1457",
                "idPadre": "1422"
            }, {
                "descripcion": "TX ACAMBARO",
                "nivel": "5",
                "id": "1458",
                "idPadre": "1423"
            }, {
                "descripcion": "TX ACAPONETA",
                "nivel": "5",
                "id": "1321",
                "idPadre": "1288"
            }, {
                "descripcion": "TX ACAPULCO",
                "nivel": "5",
                "id": "1631",
                "idPadre": "1583"
            }, {
                "descripcion": "TX ACAYUCAN",
                "nivel": "5",
                "id": "1632",
                "idPadre": "1584"
            }, {
                "descripcion": "TX ACTOPAN",
                "nivel": "5",
                "id": "1633",
                "idPadre": "1585"
            }, {
                "descripcion": "TX ACUNA",
                "nivel": "5",
                "id": "1210",
                "idPadre": "1197"
            }, {
                "descripcion": "TX AGUASCALIENTES",
                "nivel": "5",
                "id": "931",
                "idPadre": "1424"
            }, {
                "descripcion": "TX ALVARADO",
                "nivel": "5",
                "id": "1634",
                "idPadre": "1586"
            }, {
                "descripcion": "TX APAN",
                "nivel": "5",
                "id": "1804",
                "idPadre": "1793"
            }, {
                "descripcion": "TX APASEO EL ALTO",
                "nivel": "5",
                "id": "1459",
                "idPadre": "1425"
            }, {
                "descripcion": "TX APATZINGAN",
                "nivel": "5",
                "id": "1322",
                "idPadre": "1289"
            }, {
                "descripcion": "TX APIZACO",
                "nivel": "5",
                "id": "1635",
                "idPadre": "1587"
            }, {
                "descripcion": "TX ARANDAS",
                "nivel": "5",
                "id": "1323",
                "idPadre": "1290"
            }, {
                "descripcion": "TX ATLACOMULCO",
                "nivel": "5",
                "id": "1805",
                "idPadre": "1794"
            }, {
                "descripcion": "TX ATLIXCO",
                "nivel": "5",
                "id": "1636",
                "idPadre": "1588"
            }, {
                "descripcion": "TX AUTLAN DE NAVARRO",
                "nivel": "5",
                "id": "1324",
                "idPadre": "1291"
            }, {
                "descripcion": "TX BAHIA DE BANDERAS",
                "nivel": "5",
                "id": "1325",
                "idPadre": "1292"
            }, {
                "descripcion": "TX CABO SAN LUCAS",
                "nivel": "5",
                "id": "1118",
                "idPadre": "1103"
            }, {
                "descripcion": "TX CALDERITAS",
                "nivel": "5",
                "id": "1747",
                "idPadre": "1723"
            }, {
                "descripcion": "TX CALVILLO",
                "nivel": "5",
                "id": "1460",
                "idPadre": "1426"
            }, {
                "descripcion": "TX CAMARGO",
                "nivel": "5",
                "id": "1163",
                "idPadre": "1153"
            }, {
                "descripcion": "TX CAMPECHE",
                "nivel": "5",
                "id": "1748",
                "idPadre": "1724"
            }, {
                "descripcion": "TX CANCUN",
                "nivel": "5",
                "id": "958",
                "idPadre": "1725"
            }, {
                "descripcion": "TX CARDEL",
                "nivel": "5",
                "id": "1637",
                "idPadre": "1589"
            }, {
                "descripcion": "TX CARDENAS-TABASCO",
                "nivel": "5",
                "id": "1749",
                "idPadre": "1726"
            }, {
                "descripcion": "TX CELAYA",
                "nivel": "5",
                "id": "934",
                "idPadre": "1427"
            }, {
                "descripcion": "TX CENTRO",
                "nivel": "5",
                "id": "781",
                "idPadre": "776"
            }, {
                "descripcion": "TX CENTRO SUR",
                "nivel": "5",
                "id": "777",
                "idPadre": "1787"
            }, {
                "descripcion": "TX CHAMPOTON",
                "nivel": "5",
                "id": "1750",
                "idPadre": "1727"
            }, {
                "descripcion": "TX CHAPALA",
                "nivel": "5",
                "id": "1326",
                "idPadre": "1293"
            }, {
                "descripcion": "TX CHETUMAL",
                "nivel": "5",
                "id": "1751",
                "idPadre": "1728"
            }, {
                "descripcion": "TX CHIHUAHUA",
                "nivel": "5",
                "id": "925",
                "idPadre": "1154"
            }, {
                "descripcion": "TX CHILAPA DE ALVAREZ",
                "nivel": "5",
                "id": "1638",
                "idPadre": "1590"
            }, {
                "descripcion": "TX CHILPANCINGO",
                "nivel": "5",
                "id": "1639",
                "idPadre": "1591"
            }, {
                "descripcion": "TX CIUDAD DEL CARMEN",
                "nivel": "5",
                "id": "1752",
                "idPadre": "1729"
            }, {
                "descripcion": "SALTILLO 2000",
                "nivel": "5",
                "id": "976",
                "idPadre": "973"
            }, {
                "descripcion": "SALVATIERRA",
                "nivel": "5",
                "id": "643",
                "idPadre": "5"
            }, {
                "descripcion": "SAN ANGEL",
                "nivel": "5",
                "id": "272",
                "idPadre": "734"
            }, {
                "descripcion": "SAN ANTONIO",
                "nivel": "5",
                "id": "774",
                "idPadre": "379"
            }, {
                "descripcion": "SAN BARTOLO AMEYALCO",
                "nivel": "5",
                "id": "266",
                "idPadre": "737"
            }, {
                "descripcion": "SAN BERNABE",
                "nivel": "5",
                "id": "185",
                "idPadre": "177"
            }, {
                "descripcion": "SAN CAYETANO",
                "nivel": "5",
                "id": "1010",
                "idPadre": "106"
            }, {
                "descripcion": "SAN CRISTOBAL",
                "nivel": "5",
                "id": "306",
                "idPadre": "726"
            }, {
                "descripcion": "SAN FELIPE",
                "nivel": "5",
                "id": "617",
                "idPadre": "288"
            }, {
                "descripcion": "SAN FERNANDO 1",
                "nivel": "5",
                "id": "273",
                "idPadre": "739"
            }, {
                "descripcion": "SAN FERNANDO 2",
                "nivel": "5",
                "id": "274",
                "idPadre": "739"
            }, {
                "descripcion": "SAN FERNANDO 3",
                "nivel": "5",
                "id": "262",
                "idPadre": "739"
            }, {
                "descripcion": "SAN JERONIMO",
                "nivel": "5",
                "id": "263",
                "idPadre": "738"
            }, {
                "descripcion": "SAN JOSE CUMBRES",
                "nivel": "5",
                "id": "173",
                "idPadre": "910"
            }, {
                "descripcion": "SAN JOSE DEL JARAL",
                "nivel": "5",
                "id": "338",
                "idPadre": "745"
            }, {
                "descripcion": "SAN JOSE INSURGENTES",
                "nivel": "5",
                "id": "275",
                "idPadre": "734"
            }, {
                "descripcion": "SAN JUAN TLIHUACA",
                "nivel": "5",
                "id": "639",
                "idPadre": "747"
            }, {
                "descripcion": "SAN LORENZO",
                "nivel": "5",
                "id": "258",
                "idPadre": "733"
            }, {
                "descripcion": "SAN LORENZO TEZONCO",
                "nivel": "5",
                "id": "645",
                "idPadre": "731"
            }, {
                "descripcion": "SAN MARCOS",
                "nivel": "5",
                "id": "103",
                "idPadre": "94"
            }, {
                "descripcion": "SAN MATEO ATENCO",
                "nivel": "5",
                "id": "616",
                "idPadre": "288"
            }, {
                "descripcion": "SAN MIGUEL CHAPULTEPEC",
                "nivel": "5",
                "id": "234",
                "idPadre": "734"
            }, {
                "descripcion": "SAN MIGUEL XICALCO",
                "nivel": "5",
                "id": "623",
                "idPadre": "740"
            }, {
                "descripcion": "SAN NICOLAS",
                "nivel": "5",
                "id": "267",
                "idPadre": "739"
            }, {
                "descripcion": "SAN PABLO DE LAS SALINAS I",
                "nivel": "5",
                "id": "663",
                "idPadre": "726"
            }, {
                "descripcion": "SAN PABLO DE LAS SALINAS II",
                "nivel": "5",
                "id": "664",
                "idPadre": "726"
            }, {
                "descripcion": "SAN PEDRO",
                "nivel": "5",
                "id": "1002",
                "idPadre": "20"
            }, {
                "descripcion": "SAN PEDRO XALPA",
                "nivel": "5",
                "id": "371",
                "idPadre": "743"
            }, {
                "descripcion": "SAN RAFAEL",
                "nivel": "5",
                "id": "58",
                "idPadre": "686"
            }, {
                "descripcion": "SAN ROQUE",
                "nivel": "5",
                "id": "673",
                "idPadre": "685"
            }, {
                "descripcion": "SANTA ANA",
                "nivel": "5",
                "id": "151",
                "idPadre": "701"
            }, {
                "descripcion": "SANTA ANA II",
                "nivel": "5",
                "id": "152",
                "idPadre": "701"
            }, {
                "descripcion": "SANTA ANITA",
                "nivel": "5",
                "id": "674",
                "idPadre": "700"
            }, {
                "descripcion": "SANTA CATARINA",
                "nivel": "5",
                "id": "69",
                "idPadre": "2120"
            }, {
                "descripcion": "SANTA CECILIA",
                "nivel": "5",
                "id": "100",
                "idPadre": "94"
            }, {
                "descripcion": "SANTA CLARA",
                "nivel": "5",
                "id": "303",
                "idPadre": "728"
            }, {
                "descripcion": "SANTA CRUZ ACALPIXCA",
                "nivel": "5",
                "id": "644",
                "idPadre": "740"
            }, {
                "descripcion": "SANTA FE",
                "nivel": "5",
                "id": "251",
                "idPadre": "733"
            }, {
                "descripcion": "SANTA MARIA",
                "nivel": "5",
                "id": "153",
                "idPadre": "700"
            }, {
                "descripcion": "SANTA MARIA ACATITLA",
                "nivel": "5",
                "id": "661",
                "idPadre": "749"
            }, {
                "descripcion": "SANTA MONICA",
                "nivel": "5",
                "id": "346",
                "idPadre": "742"
            }, {
                "descripcion": "SANTA ROSA",
                "nivel": "5",
                "id": "1017",
                "idPadre": "727"
            }, {
                "descripcion": "SANTA URSULA 1",
                "nivel": "5",
                "id": "281",
                "idPadre": "738"
            }, {
                "descripcion": "SANTA URSULA 2",
                "nivel": "5",
                "id": "282",
                "idPadre": "738"
            }, {
                "descripcion": "SANTO DOMINGO",
                "nivel": "5",
                "id": "41",
                "idPadre": "30"
            }, {
                "descripcion": "SANTOS DEGOLLADO",
                "nivel": "5",
                "id": "91",
                "idPadre": "85"
            }, {
                "descripcion": "SATELITE",
                "nivel": "5",
                "id": "372",
                "idPadre": "744"
            }, {
                "descripcion": "SATELITE 2 (ECHEGARAY)",
                "nivel": "5",
                "id": "373",
                "idPadre": "742"
            }, {
                "descripcion": "SAUCES",
                "nivel": "5",
                "id": "628",
                "idPadre": "288"
            }, {
                "descripcion": "SAUCITO",
                "nivel": "5",
                "id": "627",
                "idPadre": "116"
            }, {
                "descripcion": "SILAO",
                "nivel": "5",
                "id": "992",
                "idPadre": "94"
            }, {
                "descripcion": "SOLARES",
                "nivel": "5",
                "id": "605",
                "idPadre": "696"
            }, {
                "descripcion": "SOLEDAD",
                "nivel": "5",
                "id": "637",
                "idPadre": "116"
            }, {
                "descripcion": "SOLEDAD G",
                "nivel": "5",
                "id": "634",
                "idPadre": "116"
            }, {
                "descripcion": "TABACHINES",
                "nivel": "5",
                "id": "132",
                "idPadre": "696"
            }, {
                "descripcion": "TABACHINES II",
                "nivel": "5",
                "id": "604",
                "idPadre": "696"
            }, {
                "descripcion": "TAMPIQUITO",
                "nivel": "5",
                "id": "70",
                "idPadre": "684"
            }, {
                "descripcion": "TARIMOYA",
                "nivel": "5",
                "id": "197",
                "idPadre": "192"
            }, {
                "descripcion": "TAXQUENA",
                "nivel": "5",
                "id": "283",
                "idPadre": "736"
            }, {
                "descripcion": "TEC PACHUCA",
                "nivel": "5",
                "id": "382",
                "idPadre": "379"
            }, {
                "descripcion": "TECAMACHALCO",
                "nivel": "5",
                "id": "252",
                "idPadre": "1944"
            }, {
                "descripcion": "TEJALPA",
                "nivel": "5",
                "id": "174",
                "idPadre": "910"
            }, {
                "descripcion": "TEMIXCO",
                "nivel": "5",
                "id": "757",
                "idPadre": "171"
            }, {
                "descripcion": "TENERIAS",
                "nivel": "5",
                "id": "995",
                "idPadre": "994"
            }, {
                "descripcion": "NUEVO VALLARTA",
                "nivel": "5",
                "id": "1009",
                "idPadre": "978"
            }, {
                "descripcion": "OASIS",
                "nivel": "5",
                "id": "40",
                "idPadre": "30"
            }, {
                "descripcion": "OBISPADO",
                "nivel": "5",
                "id": "68",
                "idPadre": "684"
            }, {
                "descripcion": "OBLATOS",
                "nivel": "5",
                "id": "141",
                "idPadre": "696"
            }, {
                "descripcion": "OBSERVATORIO",
                "nivel": "5",
                "id": "619",
                "idPadre": "733"
            }, {
                "descripcion": "OCEANIA",
                "nivel": "5",
                "id": "313",
                "idPadre": "730"
            }, {
                "descripcion": "OCOTEPEC",
                "nivel": "5",
                "id": "902",
                "idPadre": "167"
            }, {
                "descripcion": "OJO DE AGUA",
                "nivel": "5",
                "id": "656",
                "idPadre": "727"
            }, {
                "descripcion": "OTAY",
                "nivel": "5",
                "id": "10",
                "idPadre": "1948"
            }, {
                "descripcion": "OZUMBILLA",
                "nivel": "5",
                "id": "660",
                "idPadre": "727"
            }, {
                "descripcion": "PACHUCA CENTRO",
                "nivel": "5",
                "id": "384",
                "idPadre": "379"
            }, {
                "descripcion": "PACIFICO",
                "nivel": "5",
                "id": "874",
                "idPadre": "1948"
            }, {
                "descripcion": "PALMITAS",
                "nivel": "5",
                "id": "658",
                "idPadre": "749"
            }, {
                "descripcion": "PALOMARES",
                "nivel": "5",
                "id": "97",
                "idPadre": "94"
            }, {
                "descripcion": "PANTITLAN",
                "nivel": "5",
                "id": "329",
                "idPadre": "899"
            }, {
                "descripcion": "PARQUE DEL ALAMO",
                "nivel": "5",
                "id": "111",
                "idPadre": "106"
            }, {
                "descripcion": "PARQUE VERDE",
                "nivel": "5",
                "id": "90",
                "idPadre": "85"
            }, {
                "descripcion": "PARQUES NACIONALES",
                "nivel": "5",
                "id": "289",
                "idPadre": "288"
            }, {
                "descripcion": "PASEO DE LOS ANGELES",
                "nivel": "5",
                "id": "55",
                "idPadre": "686"
            }, {
                "descripcion": "PATRIA",
                "nivel": "5",
                "id": "150",
                "idPadre": "701"
            }, {
                "descripcion": "PATRIA NUEVA",
                "nivel": "5",
                "id": "14",
                "idPadre": "1948"
            }, {
                "descripcion": "PEDREGAL",
                "nivel": "5",
                "id": "271",
                "idPadre": "738"
            }, {
                "descripcion": "PELICANO 1",
                "nivel": "5",
                "id": "364",
                "idPadre": "741"
            }, {
                "descripcion": "PELICANO 2",
                "nivel": "5",
                "id": "365",
                "idPadre": "741"
            }, {
                "descripcion": "PENITAS",
                "nivel": "5",
                "id": "98",
                "idPadre": "94"
            }, {
                "descripcion": "PENUELAS",
                "nivel": "5",
                "id": "112",
                "idPadre": "106"
            }, {
                "descripcion": "PETROLERA",
                "nivel": "5",
                "id": "1036",
                "idPadre": "1034"
            }, {
                "descripcion": "PINO",
                "nivel": "5",
                "id": "224",
                "idPadre": "218"
            }, {
                "descripcion": "PLAYA CENTRO",
                "nivel": "5",
                "id": "766",
                "idPadre": "210"
            }, {
                "descripcion": "PLAYA LINDA",
                "nivel": "5",
                "id": "196",
                "idPadre": "192"
            }, {
                "descripcion": "PLAYAS TIJUANA",
                "nivel": "5",
                "id": "11",
                "idPadre": "5"
            }, {
                "descripcion": "PLAZA DORADA",
                "nivel": "5",
                "id": "225",
                "idPadre": "218"
            }, {
                "descripcion": "POLANCO 1",
                "nivel": "5",
                "id": "249",
                "idPadre": "1944"
            }, {
                "descripcion": "POLANCO 2",
                "nivel": "5",
                "id": "250",
                "idPadre": "743"
            }, {
                "descripcion": "PORTALES",
                "nivel": "5",
                "id": "241",
                "idPadre": "736"
            }, {
                "descripcion": "PORTALES DE MORELIA",
                "nivel": "5",
                "id": "163",
                "idPadre": "158"
            }, {
                "descripcion": "PRADO CHURUBUSCO",
                "nivel": "5",
                "id": "280",
                "idPadre": "736"
            }, {
                "descripcion": "PRADOS XALOSTOC",
                "nivel": "5",
                "id": "302",
                "idPadre": "728"
            }, {
                "descripcion": "PRESA DE GUADALUPE",
                "nivel": "5",
                "id": "622",
                "idPadre": "747"
            }, {
                "descripcion": "PRESIDENTES",
                "nivel": "5",
                "id": "629",
                "idPadre": "733"
            }, {
                "descripcion": "PROGRESO",
                "nivel": "5",
                "id": "56",
                "idPadre": "685"
            }, {
                "descripcion": "PROVENZA",
                "nivel": "5",
                "id": "603",
                "idPadre": "700"
            }, {
                "descripcion": "PROVIDENCIA",
                "nivel": "5",
                "id": "131",
                "idPadre": "695"
            }, {
                "descripcion": "PUEBLA CENTRO",
                "nivel": "5",
                "id": "184",
                "idPadre": "177"
            }, {
                "descripcion": "PUEBLO DE BOSQUE REAL",
                "nivel": "5",
                "id": "633",
                "idPadre": "733"
            }, {
                "descripcion": "PUEBLO SANTA FE 1",
                "nivel": "5",
                "id": "254",
                "idPadre": "733"
            }, {
                "descripcion": "PUEBLO SANTA FE 2",
                "nivel": "5",
                "id": "255",
                "idPadre": "737"
            }, {
                "descripcion": "PUERTA DE HIERRO",
                "nivel": "5",
                "id": "155",
                "idPadre": "695"
            }, {
                "descripcion": "PUERTO CANCUN",
                "nivel": "5",
                "id": "215",
                "idPadre": "210"
            }, {
                "descripcion": "PUNTA MITA",
                "nivel": "5",
                "id": "980",
                "idPadre": "978"
            }, {
                "descripcion": "QUINTAS CAROLINA",
                "nivel": "5",
                "id": "632",
                "idPadre": "20"
            }, {
                "descripcion": "QUINTO CENTENARIO",
                "nivel": "5",
                "id": "57",
                "idPadre": "687"
            }, {
                "descripcion": "RAMOS ARIZPE",
                "nivel": "5",
                "id": "1011",
                "idPadre": "973"
            }, {
                "descripcion": "RANCHO BLANCO",
                "nivel": "5",
                "id": "122",
                "idPadre": "116"
            }, {
                "descripcion": "REAL DE JEREZ",
                "nivel": "5",
                "id": "99",
                "idPadre": "94"
            }, {
                "descripcion": "REAL DE TESISTAN",
                "nivel": "5",
                "id": "607",
                "idPadre": "695"
            }, {
                "descripcion": "REFUGIO",
                "nivel": "5",
                "id": "670",
                "idPadre": "5"
            }, {
                "descripcion": "REVOLUCION",
                "nivel": "5",
                "id": "205",
                "idPadre": "200"
            }, {
                "descripcion": "RIO BLANCO",
                "nivel": "5",
                "id": "1030",
                "idPadre": "1029"
            }, {
                "descripcion": "ROBINSON",
                "nivel": "5",
                "id": "676",
                "idPadre": "20"
            }, {
                "descripcion": "ROMA 1",
                "nivel": "5",
                "id": "232",
                "idPadre": "734"
            }, {
                "descripcion": "ROMA 2",
                "nivel": "5",
                "id": "233",
                "idPadre": "736"
            }, {
                "descripcion": "ROSAMAR",
                "nivel": "5",
                "id": "991",
                "idPadre": "5"
            }, {
                "descripcion": "ROSAS MAGALLON",
                "nivel": "5",
                "id": "12",
                "idPadre": "5"
            }, {
                "descripcion": "LA NOGALERA",
                "nivel": "5",
                "id": "974",
                "idPadre": "973"
            }, {
                "descripcion": "LA ROSITA",
                "nivel": "5",
                "id": "1025",
                "idPadre": "1024"
            }, {
                "descripcion": "LA TIJERA",
                "nivel": "5",
                "id": "148",
                "idPadre": "700"
            }, {
                "descripcion": "LA VISTA",
                "nivel": "5",
                "id": "188",
                "idPadre": "177"
            }, {
                "descripcion": "LAGRANGE",
                "nivel": "5",
                "id": "53",
                "idPadre": "683"
            }, {
                "descripcion": "LANDIN",
                "nivel": "5",
                "id": "1013",
                "idPadre": "973"
            }, {
                "descripcion": "LAS AGUILAS/CENTENARIO",
                "nivel": "5",
                "id": "261",
                "idPadre": "737"
            }, {
                "descripcion": "LAS ALAMEDAS",
                "nivel": "5",
                "id": "344",
                "idPadre": "744"
            }, {
                "descripcion": "LAS AMERICAS",
                "nivel": "5",
                "id": "161",
                "idPadre": "158"
            }, {
                "descripcion": "LAS ARMAS",
                "nivel": "5",
                "id": "361",
                "idPadre": "742"
            }, {
                "descripcion": "LAS CRUCES",
                "nivel": "5",
                "id": "381",
                "idPadre": "379"
            }, {
                "descripcion": "LAS JUNTAS",
                "nivel": "5",
                "id": "675",
                "idPadre": "698"
            }, {
                "descripcion": "LAS MERCEDES",
                "nivel": "5",
                "id": "120",
                "idPadre": "116"
            }, {
                "descripcion": "LAS PINTAS",
                "nivel": "5",
                "id": "907",
                "idPadre": "698"
            }, {
                "descripcion": "LAZARO CARDENAS",
                "nivel": "5",
                "id": "82",
                "idPadre": "76"
            }, {
                "descripcion": "LERMA",
                "nivel": "5",
                "id": "642",
                "idPadre": "288"
            }, {
                "descripcion": "LIBERTAD",
                "nivel": "5",
                "id": "140",
                "idPadre": "697"
            }, {
                "descripcion": "LINDAVISTA",
                "nivel": "5",
                "id": "363",
                "idPadre": "741"
            }, {
                "descripcion": "LOMA BONITA",
                "nivel": "5",
                "id": "149",
                "idPadre": "700"
            }, {
                "descripcion": "LOMAS COUNTRY CLUB",
                "nivel": "5",
                "id": "256",
                "idPadre": "733"
            }, {
                "descripcion": "LOMAS DE ANGELOPOLIS",
                "nivel": "5",
                "id": "180",
                "idPadre": "177"
            }, {
                "descripcion": "LOMAS DE CHAPULTEPEC",
                "nivel": "5",
                "id": "248",
                "idPadre": "1944"
            }, {
                "descripcion": "LOMAS DE MORELOS",
                "nivel": "5",
                "id": "36",
                "idPadre": "30"
            }, {
                "descripcion": "LOMAS DE VIRREY",
                "nivel": "5",
                "id": "611",
                "idPadre": "1948"
            }, {
                "descripcion": "LOMAS DE ZAPOPAN",
                "nivel": "5",
                "id": "129",
                "idPadre": "695"
            }, {
                "descripcion": "LOMAS DEL RIO",
                "nivel": "5",
                "id": "1019",
                "idPadre": "192"
            }, {
                "descripcion": "LOMAS VERDES",
                "nivel": "5",
                "id": "370",
                "idPadre": "744"
            }, {
                "descripcion": "LOS CIPRESES",
                "nivel": "5",
                "id": "37",
                "idPadre": "30"
            }, {
                "descripcion": "LOS FRAILES",
                "nivel": "5",
                "id": "181",
                "idPadre": "1945"
            }, {
                "descripcion": "LOS FRESNOS",
                "nivel": "5",
                "id": "102",
                "idPadre": "94"
            }, {
                "descripcion": "LOS FUERTES",
                "nivel": "5",
                "id": "182",
                "idPadre": "1945"
            }, {
                "descripcion": "LOS NARANJOS",
                "nivel": "5",
                "id": "96",
                "idPadre": "94"
            }, {
                "descripcion": "LOS REYES ACAQUILPAN",
                "nivel": "5",
                "id": "657",
                "idPadre": "732"
            }, {
                "descripcion": "MAGISTERIAL",
                "nivel": "5",
                "id": "646",
                "idPadre": "1948"
            }, {
                "descripcion": "MALECON",
                "nivel": "5",
                "id": "1008",
                "idPadre": "978"
            }, {
                "descripcion": "MANANTIALES",
                "nivel": "5",
                "id": "162",
                "idPadre": "158"
            }, {
                "descripcion": "MANUEL CLOUTHIER",
                "nivel": "5",
                "id": "67",
                "idPadre": "2120"
            }, {
                "descripcion": "MARAVILLAS",
                "nivel": "5",
                "id": "328",
                "idPadre": "899"
            }, {
                "descripcion": "MARMOL",
                "nivel": "5",
                "id": "25",
                "idPadre": "20"
            }, {
                "descripcion": "MATAMOROS",
                "nivel": "5",
                "id": "9",
                "idPadre": "1948"
            }, {
                "descripcion": "MAYAPAN",
                "nivel": "5",
                "id": "222",
                "idPadre": "218"
            }, {
                "descripcion": "MAYORAZGO",
                "nivel": "5",
                "id": "183",
                "idPadre": "177"
            }, {
                "descripcion": "MAYORCA",
                "nivel": "5",
                "id": "38",
                "idPadre": "30"
            }, {
                "descripcion": "MELCHOR OCAMPO",
                "nivel": "5",
                "id": "652",
                "idPadre": "746"
            }, {
                "descripcion": "METEPEC",
                "nivel": "5",
                "id": "291",
                "idPadre": "288"
            }, {
                "descripcion": "MEXIQUITO",
                "nivel": "5",
                "id": "80",
                "idPadre": "76"
            }, {
                "descripcion": "MEZQUITAN",
                "nivel": "5",
                "id": "130",
                "idPadre": "699"
            }, {
                "descripcion": "MIGUEL HIDALGO",
                "nivel": "5",
                "id": "101",
                "idPadre": "94"
            }, {
                "descripcion": "MINERAL DE LA REFORMA",
                "nivel": "5",
                "id": "380",
                "idPadre": "379"
            }, {
                "descripcion": "MIRADOR",
                "nivel": "5",
                "id": "26",
                "idPadre": "20"
            }, {
                "descripcion": "MIRAFLORES",
                "nivel": "5",
                "id": "54",
                "idPadre": "686"
            }, {
                "descripcion": "MIRAMONTES",
                "nivel": "5",
                "id": "279",
                "idPadre": "738"
            }, {
                "descripcion": "MIRASIERRA",
                "nivel": "5",
                "id": "977",
                "idPadre": "973"
            }, {
                "descripcion": "MIRAVALLE",
                "nivel": "5",
                "id": "630",
                "idPadre": "698"
            }, {
                "descripcion": "MIXCOAC/PORTALES",
                "nivel": "5",
                "id": "238",
                "idPadre": "734"
            }, {
                "descripcion": "MONTEJO",
                "nivel": "5",
                "id": "223",
                "idPadre": "218"
            }, {
                "descripcion": "MORALES CAMPESTRE",
                "nivel": "5",
                "id": "121",
                "idPadre": "116"
            }, {
                "descripcion": "MUNDO E",
                "nivel": "5",
                "id": "345",
                "idPadre": "744"
            }, {
                "descripcion": "NAPOLES",
                "nivel": "5",
                "id": "239",
                "idPadre": "734"
            }, {
                "descripcion": "NARVARTE",
                "nivel": "5",
                "id": "240",
                "idPadre": "734"
            }, {
                "descripcion": "NICOLAS ROMERO",
                "nivel": "5",
                "id": "640",
                "idPadre": "747"
            }, {
                "descripcion": "NOGALES",
                "nivel": "5",
                "id": "39",
                "idPadre": "30"
            }, {
                "descripcion": "NUEVA AURORA",
                "nivel": "5",
                "id": "1012",
                "idPadre": "973"
            }, {
                "descripcion": "NUEVO CALAKMUL",
                "nivel": "5",
                "id": "213",
                "idPadre": "210"
            }, {
                "descripcion": "CUMBRES SANTA FE - GIRAULT",
                "nivel": "5",
                "id": "750",
                "idPadre": "737"
            }, {
                "descripcion": "CUMBRES SANTA FE - REFORMA",
                "nivel": "5",
                "id": "751",
                "idPadre": "737"
            }, {
                "descripcion": "DEL VALLE",
                "nivel": "5",
                "id": "237",
                "idPadre": "734"
            }, {
                "descripcion": "DEL VALLE MTY",
                "nivel": "5",
                "id": "895",
                "idPadre": "684"
            }, {
                "descripcion": "DONCELES",
                "nivel": "5",
                "id": "212",
                "idPadre": "210"
            }, {
                "descripcion": "DOS MIL",
                "nivel": "5",
                "id": "626",
                "idPadre": "1948"
            }, {
                "descripcion": "EDUARDO MOLINA",
                "nivel": "5",
                "id": "311",
                "idPadre": "730"
            }, {
                "descripcion": "EL COBANO",
                "nivel": "5",
                "id": "78",
                "idPadre": "76"
            }, {
                "descripcion": "EL MARQUES",
                "nivel": "5",
                "id": "1003",
                "idPadre": "910"
            }, {
                "descripcion": "EL ROSARIO",
                "nivel": "5",
                "id": "137",
                "idPadre": "699"
            }, {
                "descripcion": "EL SALADO",
                "nivel": "5",
                "id": "655",
                "idPadre": "748"
            }, {
                "descripcion": "EL TREBOL",
                "nivel": "5",
                "id": "203",
                "idPadre": "200"
            }, {
                "descripcion": "EL VERGEL",
                "nivel": "5",
                "id": "34",
                "idPadre": "30"
            }, {
                "descripcion": "EL ZALATE",
                "nivel": "5",
                "id": "138",
                "idPadre": "697"
            }, {
                "descripcion": "ENRAMADA",
                "nivel": "5",
                "id": "50",
                "idPadre": "687"
            }, {
                "descripcion": "ESCANDON",
                "nivel": "5",
                "id": "231",
                "idPadre": "734"
            }, {
                "descripcion": "ESPERANZA",
                "nivel": "5",
                "id": "653",
                "idPadre": "748"
            }, {
                "descripcion": "FERROCARRILERA",
                "nivel": "5",
                "id": "118",
                "idPadre": "116"
            }, {
                "descripcion": "FONTANA",
                "nivel": "5",
                "id": "8",
                "idPadre": "1948"
            }, {
                "descripcion": "FORTIN",
                "nivel": "5",
                "id": "1031",
                "idPadre": "1029"
            }, {
                "descripcion": "FRAMBOYANES",
                "nivel": "5",
                "id": "204",
                "idPadre": "200"
            }, {
                "descripcion": "FRANCISCO MONTEBELLO",
                "nivel": "5",
                "id": "221",
                "idPadre": "218"
            }, {
                "descripcion": "FUENTES DEL VALLE",
                "nivel": "5",
                "id": "352",
                "idPadre": "745"
            }, {
                "descripcion": "FUNDADORES",
                "nivel": "5",
                "id": "13",
                "idPadre": "5"
            }, {
                "descripcion": "GALINDAS",
                "nivel": "5",
                "id": "109",
                "idPadre": "106"
            }, {
                "descripcion": "GENERAL ESCOBEDO",
                "nivel": "5",
                "id": "51",
                "idPadre": "687"
            }, {
                "descripcion": "GOMEZ MORIN",
                "nivel": "5",
                "id": "35",
                "idPadre": "30"
            }, {
                "descripcion": "GRANJAS ESMERALDA",
                "nivel": "5",
                "id": "321",
                "idPadre": "731"
            }, {
                "descripcion": "GRANJAS INDEPENDENCIA",
                "nivel": "5",
                "id": "312",
                "idPadre": "729"
            }, {
                "descripcion": "GREMIAL",
                "nivel": "5",
                "id": "79",
                "idPadre": "76"
            }, {
                "descripcion": "GUADALAJARA",
                "nivel": "5",
                "id": "139",
                "idPadre": "699"
            }, {
                "descripcion": "GUADALAJARA II",
                "nivel": "5",
                "id": "625",
                "idPadre": "698"
            }, {
                "descripcion": "GUADALUPE",
                "nivel": "5",
                "id": "52",
                "idPadre": "685"
            }, {
                "descripcion": "GUADALUPE DEL MORAL",
                "nivel": "5",
                "id": "666",
                "idPadre": "730"
            }, {
                "descripcion": "GUANAJUATO CAPITAL",
                "nivel": "5",
                "id": "1005",
                "idPadre": "94"
            }, {
                "descripcion": "HACIENDA",
                "nivel": "5",
                "id": "667",
                "idPadre": "76"
            }, {
                "descripcion": "HACIENDA SANTA FE",
                "nivel": "5",
                "id": "908",
                "idPadre": "700"
            }, {
                "descripcion": "HACIENDA SANTA FE",
                "nivel": "5",
                "id": "909",
                "idPadre": "700"
            }, {
                "descripcion": "HEROES TECAMAC I",
                "nivel": "5",
                "id": "659",
                "idPadre": "727"
            }, {
                "descripcion": "HEROES TECAMAC II",
                "nivel": "5",
                "id": "665",
                "idPadre": "727"
            }, {
                "descripcion": "HISTORIADORES",
                "nivel": "5",
                "id": "613",
                "idPadre": "1945"
            }, {
                "descripcion": "HUERTA REAL",
                "nivel": "5",
                "id": "119",
                "idPadre": "116"
            }, {
                "descripcion": "IGNACIO ZARAGOZA",
                "nivel": "5",
                "id": "322",
                "idPadre": "730"
            }, {
                "descripcion": "INDEPENDENCIA",
                "nivel": "5",
                "id": "128",
                "idPadre": "696"
            }, {
                "descripcion": "INSURGENTES CUICUILCO",
                "nivel": "5",
                "id": "278",
                "idPadre": "739"
            }, {
                "descripcion": "IXTACALA",
                "nivel": "5",
                "id": "360",
                "idPadre": "742"
            }, {
                "descripcion": "IXTLAHUACA",
                "nivel": "5",
                "id": "654",
                "idPadre": "749"
            }, {
                "descripcion": "IZCALLI 1",
                "nivel": "5",
                "id": "335",
                "idPadre": "745"
            }, {
                "descripcion": "IZCALLI 2",
                "nivel": "5",
                "id": "336",
                "idPadre": "746"
            }, {
                "descripcion": "IZTACALCO",
                "nivel": "5",
                "id": "323",
                "idPadre": "736"
            }, {
                "descripcion": "JACARANDAS",
                "nivel": "5",
                "id": "89",
                "idPadre": "85"
            }, {
                "descripcion": "JARDINES DE MORELOS",
                "nivel": "5",
                "id": "301",
                "idPadre": "727"
            }, {
                "descripcion": "JARDINES DE SAN FRANCISCO",
                "nivel": "5",
                "id": "754",
                "idPadre": "94"
            }, {
                "descripcion": "JARDINES DE SANTIAGO",
                "nivel": "5",
                "id": "179",
                "idPadre": "1945"
            }, {
                "descripcion": "JESUS DEL MONTE",
                "nivel": "5",
                "id": "247",
                "idPadre": "733"
            }, {
                "descripcion": "JESUS MARIA",
                "nivel": "5",
                "id": "901",
                "idPadre": "76"
            }, {
                "descripcion": "JIUTEPEC",
                "nivel": "5",
                "id": "172",
                "idPadre": "910"
            }, {
                "descripcion": "JURICA",
                "nivel": "5",
                "id": "110",
                "idPadre": "106"
            }, {
                "descripcion": "JUVENTUD",
                "nivel": "5",
                "id": "1001",
                "idPadre": "20"
            }, {
                "descripcion": "KABAH",
                "nivel": "5",
                "id": "905",
                "idPadre": "210"
            }, {
                "descripcion": "KATAVIA",
                "nivel": "5",
                "id": "635",
                "idPadre": "687"
            }, {
                "descripcion": "KUKULKAN",
                "nivel": "5",
                "id": "906",
                "idPadre": "218"
            }, {
                "descripcion": "LA FLORESTA",
                "nivel": "5",
                "id": "755",
                "idPadre": "379"
            }, {
                "descripcion": "LA HACIENDA",
                "nivel": "5",
                "id": "337",
                "idPadre": "742"
            }, {
                "descripcion": "AZCAPOTZALCO",
                "nivel": "5",
                "id": "357",
                "idPadre": "743"
            }, {
                "descripcion": "BELLAVISTA",
                "nivel": "5",
                "id": "343",
                "idPadre": "744"
            }, {
                "descripcion": "BENITO JUAREZ 1",
                "nivel": "5",
                "id": "326",
                "idPadre": "732"
            }, {
                "descripcion": "BENITO JUAREZ 2",
                "nivel": "5",
                "id": "327",
                "idPadre": "732"
            }, {
                "descripcion": "BERNABE",
                "nivel": "5",
                "id": "265",
                "idPadre": "739"
            }, {
                "descripcion": "BOCA DEL RIO",
                "nivel": "5",
                "id": "193",
                "idPadre": "192"
            }, {
                "descripcion": "BOCANEGRA",
                "nivel": "5",
                "id": "159",
                "idPadre": "158"
            }, {
                "descripcion": "BOJORQUEZ",
                "nivel": "5",
                "id": "219",
                "idPadre": "218"
            }, {
                "descripcion": "BOLIVAR",
                "nivel": "5",
                "id": "117",
                "idPadre": "116"
            }, {
                "descripcion": "BOSQUE REAL",
                "nivel": "5",
                "id": "257",
                "idPadre": "733"
            }, {
                "descripcion": "BOSQUES",
                "nivel": "5",
                "id": "77",
                "idPadre": "76"
            }, {
                "descripcion": "BOSQUES AMALUCAN",
                "nivel": "5",
                "id": "612",
                "idPadre": "1945"
            }, {
                "descripcion": "BRISAS DEL GOLFO",
                "nivel": "5",
                "id": "1035",
                "idPadre": "1034"
            }, {
                "descripcion": "BUCERIAS",
                "nivel": "5",
                "id": "979",
                "idPadre": "978"
            }, {
                "descripcion": "BUENOS AIRES",
                "nivel": "5",
                "id": "32",
                "idPadre": "30"
            }, {
                "descripcion": "BUGAMBILIA",
                "nivel": "5",
                "id": "147",
                "idPadre": "701"
            }, {
                "descripcion": "BUGANBILIAS_LEON",
                "nivel": "5",
                "id": "614",
                "idPadre": "94"
            }, {
                "descripcion": "CABEZA DE JUAREZ",
                "nivel": "5",
                "id": "641",
                "idPadre": "899"
            }, {
                "descripcion": "CAFETALES",
                "nivel": "5",
                "id": "1020",
                "idPadre": "200"
            }, {
                "descripcion": "CALERAS",
                "nivel": "5",
                "id": "904",
                "idPadre": "1945"
            }, {
                "descripcion": "CAMPANARIO",
                "nivel": "5",
                "id": "21",
                "idPadre": "20"
            }, {
                "descripcion": "CAMPESTRE",
                "nivel": "5",
                "id": "107",
                "idPadre": "106"
            }, {
                "descripcion": "CAMPO BELLO",
                "nivel": "5",
                "id": "22",
                "idPadre": "20"
            }, {
                "descripcion": "CANADA DEL REFUGIO",
                "nivel": "5",
                "id": "95",
                "idPadre": "94"
            }, {
                "descripcion": "CANTERAS",
                "nivel": "5",
                "id": "65",
                "idPadre": "684"
            }, {
                "descripcion": "CARLOS AMAYA",
                "nivel": "5",
                "id": "33",
                "idPadre": "30"
            }, {
                "descripcion": "CARRANZA",
                "nivel": "5",
                "id": "753",
                "idPadre": "192"
            }, {
                "descripcion": "CARTAGENA",
                "nivel": "5",
                "id": "350",
                "idPadre": "745"
            }, {
                "descripcion": "CAUCEL",
                "nivel": "5",
                "id": "220",
                "idPadre": "218"
            }, {
                "descripcion": "CELAYA 1",
                "nivel": "5",
                "id": "86",
                "idPadre": "85"
            }, {
                "descripcion": "CELAYA 2",
                "nivel": "5",
                "id": "87",
                "idPadre": "85"
            }, {
                "descripcion": "CELAYA 3",
                "nivel": "5",
                "id": "88",
                "idPadre": "85"
            }, {
                "descripcion": "CERRO COLORADO",
                "nivel": "5",
                "id": "669",
                "idPadre": "1948"
            }, {
                "descripcion": "CERRO DE LA ESTRELLA",
                "nivel": "5",
                "id": "319",
                "idPadre": "731"
            }, {
                "descripcion": "CERRO DE LA SILLA",
                "nivel": "5",
                "id": "49",
                "idPadre": "685"
            }, {
                "descripcion": "CEYLAN",
                "nivel": "5",
                "id": "358",
                "idPadre": "743"
            }, {
                "descripcion": "CHAMIZAL",
                "nivel": "5",
                "id": "310",
                "idPadre": "728"
            }, {
                "descripcion": "CHEMUYIL",
                "nivel": "5",
                "id": "211",
                "idPadre": "210"
            }, {
                "descripcion": "CHIHUAHUA",
                "nivel": "5",
                "id": "23",
                "idPadre": "20"
            }, {
                "descripcion": "CHIMALHUACAN",
                "nivel": "5",
                "id": "638",
                "idPadre": "748"
            }, {
                "descripcion": "CIUDAD AZTECA",
                "nivel": "5",
                "id": "299",
                "idPadre": "728"
            }, {
                "descripcion": "CLAVERIA",
                "nivel": "5",
                "id": "359",
                "idPadre": "743"
            }, {
                "descripcion": "CLUSTER TX",
                "nivel": "5",
                "id": "972",
                "idPadre": "971"
            }, {
                "descripcion": "COACALCO",
                "nivel": "5",
                "id": "300",
                "idPadre": "726"
            }, {
                "descripcion": "COAPA",
                "nivel": "5",
                "id": "277",
                "idPadre": "740"
            }, {
                "descripcion": "COLINAS DEL PARQUE",
                "nivel": "5",
                "id": "108",
                "idPadre": "106"
            }, {
                "descripcion": "CONDESA",
                "nivel": "5",
                "id": "230",
                "idPadre": "734"
            }, {
                "descripcion": "CONSTITUCION DE 1917",
                "nivel": "5",
                "id": "662",
                "idPadre": "749"
            }, {
                "descripcion": "CONSTITUYENTES",
                "nivel": "5",
                "id": "24",
                "idPadre": "20"
            }, {
                "descripcion": "COSTA AZUL",
                "nivel": "5",
                "id": "1004",
                "idPadre": "910"
            }, {
                "descripcion": "COSTA VERDE",
                "nivel": "5",
                "id": "194",
                "idPadre": "192"
            }, {
                "descripcion": "COYOACAN 1",
                "nivel": "5",
                "id": "269",
                "idPadre": "734"
            }, {
                "descripcion": "COYOACAN 2",
                "nivel": "5",
                "id": "270",
                "idPadre": "738"
            }, {
                "descripcion": "COYOL",
                "nivel": "5",
                "id": "195",
                "idPadre": "192"
            }, {
                "descripcion": "CUAJIMALPA",
                "nivel": "5",
                "id": "246",
                "idPadre": "733"
            }, {
                "descripcion": "CUAUTITLAN",
                "nivel": "5",
                "id": "351",
                "idPadre": "746"
            }, {
                "descripcion": "CUAUTLA",
                "nivel": "5",
                "id": "160",
                "idPadre": "158"
            }, {
                "descripcion": "CUAUTLANCINGO",
                "nivel": "5",
                "id": "1007",
                "idPadre": "177"
            }, {
                "descripcion": "CUERNAVACA 1",
                "nivel": "5",
                "id": "168",
                "idPadre": "167"
            }, {
                "descripcion": "CUERNAVACA 2",
                "nivel": "5",
                "id": "169",
                "idPadre": "167"
            }, {
                "descripcion": "CUERNAVACA 3",
                "nivel": "5",
                "id": "170",
                "idPadre": "167"
            }, {
                "descripcion": "CULHUACAN",
                "nivel": "5",
                "id": "320",
                "idPadre": "731"
            }, {
                "descripcion": "CUMBRES",
                "nivel": "5",
                "id": "66",
                "idPadre": "683"
            }, {
                "descripcion": "CUMBRES SANTA FE - BASALTO",
                "nivel": "5",
                "id": "649",
                "idPadre": "737"
            }, {
                "descripcion": "1_LERMA",
                "nivel": "5",
                "id": "615",
                "idPadre": "288"
            }, {
                "descripcion": "AGRICOLA ORIENTAL",
                "nivel": "5",
                "id": "317",
                "idPadre": "730"
            }, {
                "descripcion": "AGUA AZUL",
                "nivel": "5",
                "id": "325",
                "idPadre": "732"
            }, {
                "descripcion": "AGUA CALIENTE",
                "nivel": "5",
                "id": "6",
                "idPadre": "5"
            }, {
                "descripcion": "AGUA SANTA",
                "nivel": "5",
                "id": "201",
                "idPadre": "200"
            }, {
                "descripcion": "ALCAHUACAN",
                "nivel": "5",
                "id": "305",
                "idPadre": "727"
            }, {
                "descripcion": "ALDAMA",
                "nivel": "5",
                "id": "31",
                "idPadre": "30"
            }, {
                "descripcion": "ALTAMIRA",
                "nivel": "5",
                "id": "7",
                "idPadre": "5"
            }, {
                "descripcion": "AMPLACION MARMOL",
                "nivel": "5",
                "id": "897",
                "idPadre": "20"
            }, {
                "descripcion": "AMPLIACION AGUA SANTA",
                "nivel": "5",
                "id": "986",
                "idPadre": "200"
            }, {
                "descripcion": "AMPLIACION AGUA SANTA 2",
                "nivel": "5",
                "id": "987",
                "idPadre": "200"
            }, {
                "descripcion": "AMPLIACION COSTA VERDE",
                "nivel": "5",
                "id": "879",
                "idPadre": "192"
            }, {
                "descripcion": "AMPLIACION CUERNAVACA 2",
                "nivel": "5",
                "id": "889",
                "idPadre": "167"
            }, {
                "descripcion": "AMPLIACION CUMBRES",
                "nivel": "5",
                "id": "1006",
                "idPadre": "683"
            }, {
                "descripcion": "AMPLIACION EL TREBOL",
                "nivel": "5",
                "id": "875",
                "idPadre": "200"
            }, {
                "descripcion": "AMPLIACION FERROCARRILERA",
                "nivel": "5",
                "id": "1015",
                "idPadre": "116"
            }, {
                "descripcion": "AMPLIACION FRAMBOYANES",
                "nivel": "5",
                "id": "877",
                "idPadre": "200"
            }, {
                "descripcion": "AMPLIACION FRAMBOYANES 2",
                "nivel": "5",
                "id": "1021",
                "idPadre": "200"
            }, {
                "descripcion": "AMPLIACION HUERTA REAL",
                "nivel": "5",
                "id": "982",
                "idPadre": "116"
            }, {
                "descripcion": "AMPLIACION INDEPENDENCIA",
                "nivel": "5",
                "id": "890",
                "idPadre": "696"
            }, {
                "descripcion": "AMPLIACION LAS JUNTAS",
                "nivel": "5",
                "id": "892",
                "idPadre": "698"
            }, {
                "descripcion": "AMPLIACION MANUEL CLOUTHIER",
                "nivel": "5",
                "id": "896",
                "idPadre": "2120"
            }, {
                "descripcion": "AMPLIACION MANUEL CLOUTHIER",
                "nivel": "5",
                "id": "900",
                "idPadre": "2120"
            }, {
                "descripcion": "AMPLIACION MEXIQUITO",
                "nivel": "5",
                "id": "989",
                "idPadre": "76"
            }, {
                "descripcion": "AMPLIACION MORALES CAMPESTRE",
                "nivel": "5",
                "id": "988",
                "idPadre": "116"
            }, {
                "descripcion": "AMPLIACION MORALES CAMPESTRE 2",
                "nivel": "5",
                "id": "1014",
                "idPadre": "116"
            }, {
                "descripcion": "AMPLIACION OBISPADO",
                "nivel": "5",
                "id": "893",
                "idPadre": "684"
            }, {
                "descripcion": "AMPLIACION OCOTEPEC",
                "nivel": "5",
                "id": "903",
                "idPadre": "167"
            }, {
                "descripcion": "AMPLIACION PUEBLO SANTA FE 1",
                "nivel": "5",
                "id": "618",
                "idPadre": "733"
            }, {
                "descripcion": "AMPLIACION REVOLUCION",
                "nivel": "5",
                "id": "876",
                "idPadre": "200"
            }, {
                "descripcion": "AMPLIACION SAN JOSE CUMBRES",
                "nivel": "5",
                "id": "886",
                "idPadre": "910"
            }, {
                "descripcion": "AMPLIACION SAN JOSE CUMBRES 2",
                "nivel": "5",
                "id": "888",
                "idPadre": "910"
            }, {
                "descripcion": "AMPLIACION SOLEDAD",
                "nivel": "5",
                "id": "981",
                "idPadre": "116"
            }, {
                "descripcion": "AMPLIACION SOLEDAD",
                "nivel": "5",
                "id": "1016",
                "idPadre": "116"
            }, {
                "descripcion": "AMPLIACION TARIMOYA",
                "nivel": "5",
                "id": "878",
                "idPadre": "192"
            }, {
                "descripcion": "AMPLIACION TEJALPA",
                "nivel": "5",
                "id": "887",
                "idPadre": "910"
            }, {
                "descripcion": "AMPLIACION TIERRA NUEVA",
                "nivel": "5",
                "id": "990",
                "idPadre": "76"
            }, {
                "descripcion": "AMPLIACION TONALA",
                "nivel": "5",
                "id": "891",
                "idPadre": "698"
            }, {
                "descripcion": "AMPLIACION TULANCINGO 1",
                "nivel": "5",
                "id": "882",
                "idPadre": "379"
            }, {
                "descripcion": "AMPLIACION TULANCINGO 2",
                "nivel": "5",
                "id": "883",
                "idPadre": "379"
            }, {
                "descripcion": "AMPLIACION TULANCINGO 3",
                "nivel": "5",
                "id": "884",
                "idPadre": "379"
            }, {
                "descripcion": "AMPLIACION TULANCINGO 4",
                "nivel": "5",
                "id": "885",
                "idPadre": "379"
            }, {
                "descripcion": "AMPLIACION UDLA",
                "nivel": "5",
                "id": "984",
                "idPadre": "177"
            }, {
                "descripcion": "AMPLIACION UDLA 2",
                "nivel": "5",
                "id": "985",
                "idPadre": "177"
            }, {
                "descripcion": "AMPLIACION VILLA MITRAS",
                "nivel": "5",
                "id": "894",
                "idPadre": "683"
            }, {
                "descripcion": "AMPLIACION VILLAS DEL ALAMO",
                "nivel": "5",
                "id": "880",
                "idPadre": "379"
            }, {
                "descripcion": "AMPLIACION VILLAS DEL ALAMO 2",
                "nivel": "5",
                "id": "881",
                "idPadre": "379"
            }, {
                "descripcion": "AMPLIACION ZERTUCHE",
                "nivel": "5",
                "id": "983",
                "idPadre": "685"
            }, {
                "descripcion": "ANAHUAC",
                "nivel": "5",
                "id": "47",
                "idPadre": "686"
            }, {
                "descripcion": "ANZURES 1",
                "nivel": "5",
                "id": "244",
                "idPadre": "1944"
            }, {
                "descripcion": "ANZURES 2",
                "nivel": "5",
                "id": "245",
                "idPadre": "743"
            }, {
                "descripcion": "APATLACO",
                "nivel": "5",
                "id": "318",
                "idPadre": "736"
            }, {
                "descripcion": "APODACA",
                "nivel": "5",
                "id": "48",
                "idPadre": "687"
            }, {
                "descripcion": "AQUILES SERDAN",
                "nivel": "5",
                "id": "178",
                "idPadre": "177"
            }, {
                "descripcion": "ARAGON 1",
                "nivel": "5",
                "id": "308",
                "idPadre": "729"
            }, {
                "descripcion": "ARAGON 2",
                "nivel": "5",
                "id": "309",
                "idPadre": "729"
            }, {
                "descripcion": "ARBOLEDAS",
                "nivel": "5",
                "id": "342",
                "idPadre": "742"
            }, {
                "descripcion": "ARCOS DE VALLARTA",
                "nivel": "5",
                "id": "146",
                "idPadre": "699"
            }, {
                "descripcion": "ARCOS DEL SOL",
                "nivel": "5",
                "id": "63",
                "idPadre": "2120"
            }, {
                "descripcion": "ARCOS DEL SUR",
                "nivel": "5",
                "id": "752",
                "idPadre": "1945"
            }, {
                "descripcion": "ARGENTINA",
                "nivel": "5",
                "id": "64",
                "idPadre": "683"
            }, {
                "descripcion": "ARROYO BLANCO",
                "nivel": "5",
                "id": "202",
                "idPadre": "200"
            }, {
                "descripcion": "ASTURIAS",
                "nivel": "5",
                "id": "235",
                "idPadre": "736"
            }, {
                "descripcion": "ATLACOMULCO",
                "nivel": "5",
                "id": "330",
                "idPadre": "899"
            }],
            "listFilterIntervencion": [{
                "descripcion": "PLANTA EXTERNA",
                "id": "30",
                "listadoSubInter": [{
                    "descripcion": "SPLITTER SATURADO",
                    "id": "31"
                }, {
                    "descripcion": "SPLITTER ATENUADO",
                    "id": "32"
                }, {
                    "descripcion": "SPLITTER BAJA POTENCIA",
                    "id": "33"
                }, {
                    "descripcion": "SPLITTER PUERTOS DAÑADOS",
                    "id": "34"
                }, {
                    "descripcion": "ANCHO DE BANDA INSUFICIENTE",
                    "id": "90"
                }, {
                    "descripcion": "SPLITTER NO ILUMINADO",
                    "id": "91"
                }, {
                    "descripcion": "SPLITTER SIN POTENCIA",
                    "id": "92"
                }, {
                    "descripcion": "PLANTA EXTERNA - COBERTURA TX",
                    "id": "187"
                }, {
                    "descripcion": "SPLITTER MAYOR A 300 METROS",
                    "id": "189"
                }, {
                    "descripcion": "ZONA SIN POSTERIA",
                    "id": "190"
                }, {
                    "descripcion": "ROBO DE PUERTO",
                    "id": "1806"
                }]
            }, {
                "descripcion": "INSPECTOR DE RED",
                "id": "97",
                "listadoSubInter": [{
                    "descripcion": "POSTES",
                    "id": "98"
                }, {
                    "descripcion": "ACOMETIDAS",
                    "id": "99"
                }, {
                    "descripcion": "ETIQUETADO",
                    "id": "100"
                }, {
                    "descripcion": "RUTAS",
                    "id": "101"
                }, {
                    "descripcion": "GASA",
                    "id": "102"
                }, {
                    "descripcion": "CIERRE",
                    "id": "103"
                }, {
                    "descripcion": "ANEXOS",
                    "id": "130"
                }, {
                    "descripcion": "RESERVA INS 1",
                    "id": "137"
                }, {
                    "descripcion": "RESERVA INS 2",
                    "id": "138"
                }, {
                    "descripcion": "RESERVA INS 3 ",
                    "id": "139"
                }, {
                    "descripcion": "RESERVA INS 4",
                    "id": "140"
                }]
            }, {
                "descripcion": "CORTE MASIVO",
                "id": "119",
                "listadoSubInter": [{
                    "descripcion": "CORTE MASIVO",
                    "id": "118"
                }]
            }, {
                "descripcion": "MANTENIMIENTO PREVENTIVO PI",
                "id": "127",
                "listadoSubInter": [{
                    "descripcion": "DESVIACION",
                    "id": "128"
                }, {
                    "descripcion": "SPLITTER",
                    "id": "129"
                }, {
                    "descripcion": "MANTENIMIENTO MAYOR",
                    "id": "131"
                }, {
                    "descripcion": "MANTENIMIENTO MENOR",
                    "id": "132"
                }, {
                    "descripcion": "RESERVA PIPE 1",
                    "id": "133"
                }, {
                    "descripcion": "RESERVA PIPE 2",
                    "id": "134"
                }, {
                    "descripcion": "RESERVA PIPE 3",
                    "id": "135"
                }, {
                    "descripcion": "INSPECCION DE CALIDAD",
                    "id": "136"
                }, {
                    "descripcion": "HALLAZGO EMPRESARIAL",
                    "id": "246"
                }]
            }, {
                "descripcion": "PLANTA EXTERNA TX",
                "id": "153",
                "listadoSubInter": [{
                    "descripcion": "SPLITTER SIN POTENCIA",
                    "id": "229"
                }, {
                    "descripcion": "ANCHO DE BANDA INSUFICIENTE",
                    "id": "230"
                }, {
                    "descripcion": "ZONA SIN POSTERIA",
                    "id": "231"
                }, {
                    "descripcion": "SPLITTER A MAS DE 300 METROS",
                    "id": "232"
                }, {
                    "descripcion": "SPLITTER ATENUADO",
                    "id": "233"
                }, {
                    "descripcion": "SPLITTER PUERTOS DAÑADOS",
                    "id": "234"
                }, {
                    "descripcion": "SPLITTER SATURADO",
                    "id": "235"
                }, {
                    "descripcion": "SPLITTER NO ILUMINADO",
                    "id": "239"
                }, {
                    "descripcion": "SPLITTER BAJA POTENCIA",
                    "id": "240"
                }, {
                    "descripcion": "SPLITTER SIN POTENCIA",
                    "id": "241"
                }, {
                    "descripcion": "BACKLOG TX",
                    "id": "242"
                }]
            }]
        }
    }
}