var JSONArraysMateriales={
    'arrayMateriales':[{
        descripcion:'Descripcion ',
        lote:'Lote ',
        cantidad:'20',
        precio:'201',
        unidad:'20',
        familia:'Familia',
        manejo:'Manejo'
    },{
        descripcion:'Descripcion ',
        lote:'Lote ',
        cantidad:'20',
        precio:'201',
        unidad:'20',
        familia:'Familia',
        manejo:'Manejo'
    },{
        descripcion:'Descripcion ',
        lote:'Lote ',
        cantidad:'20',
        precio:'201',
        unidad:'20',
        familia:'Familia',
        manejo:'Manejo'
    }],
    'arrayTraspasos':[
        {
            id:'1',
            cantidad:'10',
            idTraspaso:'1111',
            serie:'000990121221kl'
        },
        {
            id:'2',
            cantidad:'11',
            idTraspaso:'3333',
            serie:'0009901212ZZZZZ'
        },
        {
            id:'3',
            cantidad:'25',
            idTraspaso:'2222',
            serie:'PPPP00099012'
        }]
}
var JSONVehiculoOperario={
	"Vehicle": {
		"Id_vehicle": "541",
		"Id_tipo": "2",
		"Desc_tipo": "AUTOMOVIL/CAMIONETA",
		"Id_marca": "3",
		"Desc_marca": "CHEVROLET",
		"Modelo": "2016",
		"Placa": "NW79819",
		"Num_serie": "93CCL8004GB120696",
		"Tipo_combustible": "GASOLINA",
		"Hexa_engomado": "#00AEFF",
		"Holograma": "00",
		"Url_vehicle": "",
		"Url_placa": "",
		"Fecha_registro": "10/01/2019",
		"Nombre_usuarioreg": "ANTONIO ZURIZHADAY GONZ\u0026AACUTE;LEZ LOPEZ",
		"Num_empleadoReg": "65037020"
	}

}
var JSONOtsTrabajadas= [{
    "Id_ot": "366816",
    "Num_cuenta": "0290002456",
    "Folio_os": "OS-6945752",
    "Desc_intervencion": "INSTALACIÓN",
    "Desc_status": "ASIGNADA",
    "Desc_estado": "PROGRAMADA PERO NO INICIADA",
    "Desc_motivo": "ASIGNADO POR DESPACHO",
    "Paquete": "INTERNET SIMÉTRICO EMPRESARIAL 20/20 MB CON RESPALDO 4G",
    "Fecha_agenda": "24/05/2021 16:30",
    "Fecha_termino": "24/05/2021 16:30"
},{
    "Id_ot": "366817",
    "Num_cuenta": "0290002456",
    "Folio_os": "OS-6945752",
    "Desc_intervencion": "INSTALACIÓN",
    "Desc_status": "ASIGNADA",
    "Desc_estado": "PROGRAMADA PERO NO INICIADA",
    "Desc_motivo": "ASIGNADO POR DESPACHO",
    "Paquete": "INTERNET SIMÉTRICO EMPRESARIAL 20/20 MB CON RESPALDO 4G",
    "Fecha_agenda": "24/05/2021 16:30",
    "Fecha_termino": "24/05/2021 16:30"
},{
    "Id_ot": "366818",
    "Num_cuenta": "0290002456",
    "Folio_os": "OS-6945752",
    "Desc_intervencion": "INSTALACIÓN",
    "Desc_status": "ASIGNADA",
    "Desc_estado": "PROGRAMADA PERO NO INICIADA",
    "Desc_motivo": "ASIGNADO POR DESPACHO",
    "Paquete": "INTERNET SIMÉTRICO EMPRESARIAL 20/20 MB CON RESPALDO 4G",
    "Fecha_agenda": "24/05/2021 16:30",
    "Fecha_termino": "24/05/2021 16:30"
}]

var JSONEstatusTecnico=[
    {descripcion:'Diponible', idEstatus:1},
    {descripcion:'Ocupado', idEstatus:2},
    {descripcion:'Dia Libre', idEstatus:3},
    {descripcion:'En comida', idEstatus:4},
    {descripcion:'Vacaciones', idEstatus:5},
    {descripcion:'En almacen', idEstatus:6},
    {descripcion:'Fuera de servicio', idEstatus:7},
    {descripcion:'Apoyo tecnico', idEstatus:8},
    {descripcion:'Incapacidad', idEstatus:9},]

var tecnicosAsignacion=[
    {
        "nombre": " JORGE IRVING ARREOLA MEJIA",
        "id": "11618",
        "tecnico": "TTPCJOP137",
        "status": "1",
        "latitud": "19.3339284",
        "longitud": "-99.1985351",
        "telefono": "6562176452",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "AARON MARTIN PEREZ PEREZ",
        "id": "7260",
        "tecnico": "65038389",
        "status": "1",
        "latitud": "19.3850285",
        "longitud": "-99.1923596",
        "telefono": "5939142003",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "AARÓN ELIUD RUIZ IBARRA",
        "id": "14582",
        "tecnico": "65023023",
        "status": "1",
        "latitud": "1",
        "longitud": "1",
        "telefono": "6441503270",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "ABRAHAM BOVER FLORES",
        "id": "11839",
        "tecnico": "TTPPUOP157",
        "status": "1",
        "latitud": "1",
        "longitud": "1",
        "telefono": "2211204053",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "ABRAHAM CUITLAHUAC SERRANO MEJIA",
        "id": "11920",
        "tecnico": "TTPTLOP103",
        "status": "1",
        "latitud": "1",
        "longitud": "1",
        "telefono": "7223466755",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "ABRAHAM SILVA TOVAR",
        "id": "18403",
        "tecnico": "FIQUE00086",
        "status": "1",
        "latitud": "1",
        "longitud": "1",
        "telefono": "4613006347",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "ADAN BA&NTILDE;UELOS PERALES",
        "id": "12600",
        "tecnico": "65210084",
        "status": "1",
        "latitud": "1",
        "longitud": "1",
        "telefono": "8114802792",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "ADAN DE JESUS PEÑA VALDES",
        "id": "28189",
        "tecnico": "65050922",
        "status": "1",
        "latitud": "1",
        "longitud": "1",
        "telefono": "2294356500",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "ADMINISTRADOR QA APP",
        "id": "15103",
        "tecnico": "ADMIN_APP",
        "status": "1",
        "latitud": "1",
        "longitud": "1",
        "telefono": "5555555555",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "ADONIRAN CAMPOS MENDOZA",
        "id": "11890",
        "tecnico": "TTPTLOP158",
        "status": "1",
        "latitud": "1",
        "longitud": "1",
        "telefono": "7227075881",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "ADRIAN ANTONIO ALCANTAR VILLA",
        "id": "1198",
        "tecnico": "65950952",
        "status": "1",
        "latitud": "19.3340043",
        "longitud": "-99.1985715",
        "telefono": "3318021660",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "ADRIAN ARTURO SANTIAGO SALGADO",
        "id": "9280",
        "tecnico": "65009244",
        "status": "1",
        "latitud": "1",
        "longitud": "1",
        "telefono": "9515918350",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "ADRIAN MARCELO CAMACHO MANRIQUE",
        "id": "22920",
        "tecnico": "965701562",
        "status": "1",
        "latitud": "1",
        "longitud": "1",
        "telefono": "6644759957",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "ADRIAN VARGAS ISLAS",
        "id": "18131",
        "tecnico": "65023000",
        "status": "1",
        "latitud": "1",
        "longitud": "1",
        "telefono": "5566794647",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "AGUSTIN EMMANUEL LOPEZ MELCHOR",
        "id": "24400",
        "tecnico": "DIIQU00001",
        "status": "1",
        "latitud": "1",
        "longitud": "1",
        "telefono": "87571524",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "AGUSTIN GERARDO GONZALEZ GARCIA",
        "id": "24330",
        "tecnico": "TDNQU00007",
        "status": "7",
        "latitud": "1",
        "longitud": "1",
        "telefono": "5549944970",
        "numots": "0",
        "color": "#242425",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "AGUSTIN UREÑA HUIZAR",
        "id": "1240",
        "tecnico": "65951063",
        "status": "1",
        "latitud": "19.3045862",
        "longitud": "-99.2033043",
        "telefono": "3319906612",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "AGUSTIN URIBE URIBE",
        "id": "36442",
        "tecnico": "65050616",
        "status": "1",
        "latitud": "1",
        "longitud": "1",
        "telefono": "6691417740",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "ALAIN RENE GARCIA LOZANO",
        "id": "11818",
        "tecnico": "TTPMTOP175",
        "status": "1",
        "latitud": "1",
        "longitud": "1",
        "telefono": "8112880335",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "ALAN EDUARDO RIOS COLDIVAR",
        "id": "8080",
        "tecnico": "65034142",
        "status": "1",
        "latitud": "1",
        "longitud": "1",
        "telefono": "3316691940",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "ALAN ENRIQUE RUBIO GALINDO",
        "id": "11527",
        "tecnico": "TTPTJOP114",
        "status": "1",
        "latitud": "1",
        "longitud": "1",
        "telefono": "6642682389",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "ALAN PEDRAZA SIN INFORMACION",
        "id": "15092",
        "tecnico": "150077180",
        "status": "1",
        "latitud": "1",
        "longitud": "1",
        "telefono": "5555555555",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "ALBERTO BARTOLO BENITO",
        "id": "7774",
        "tecnico": "65027515",
        "status": "1",
        "latitud": "1",
        "longitud": "1",
        "telefono": "5555555555",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "ALBERTO DIAZ SANCHEZ",
        "id": "22901",
        "tecnico": "965711817",
        "status": "1",
        "latitud": "1",
        "longitud": "1",
        "telefono": "7773632933",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "ALBERTO JUAREZ PEREZ",
        "id": "8200",
        "tecnico": "TECNICO01",
        "status": "7",
        "latitud": "19.3338906",
        "longitud": "-99.1985708",
        "telefono": "5555555555",
        "numots": "0",
        "color": "#242425",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "ALBERTO LOPEZ PAIS",
        "id": "23021",
        "tecnico": "965400377",
        "status": "1",
        "latitud": "1",
        "longitud": "1",
        "telefono": "2222156076",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "ALBERTO MACIAS CRUZ",
        "id": "14361",
        "tecnico": "65011241",
        "status": "1",
        "latitud": "1",
        "longitud": "1",
        "telefono": "3121689399",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "ALBINO GOMEZ CALIXTO",
        "id": "6123",
        "tecnico": "65041114",
        "status": "1",
        "latitud": "19.3340142",
        "longitud": "-99.1985056",
        "telefono": "55555555",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "ALDO ADRIAN GOMEZ ESCOBAR",
        "id": "1060",
        "tecnico": "65950876",
        "status": "1",
        "latitud": "19.673027\t",
        "longitud": "-99.1821145",
        "telefono": "5518030809",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "ALDO VEGA CONTRERAS",
        "id": "34563",
        "tecnico": "65051531",
        "status": "1",
        "latitud": "1",
        "longitud": "1",
        "telefono": "2299335050",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "ALEJANDRO ABDIEL ANDRADE MANRIQUEZ",
        "id": "1147",
        "tecnico": "65014284",
        "status": "1",
        "latitud": "19.333949",
        "longitud": "-99.1985917",
        "telefono": "4771980228",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "ALEJANDRO ALBERTO LUGO AGUILAR",
        "id": "10641",
        "tecnico": "65033600",
        "status": "1",
        "latitud": "19.288899",
        "longitud": "-99.0362359",
        "telefono": "5510532749",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "ALEJANDRO ALBERTO VELASCO LUCAS",
        "id": "15606",
        "tecnico": "65045499",
        "status": "1",
        "latitud": "1",
        "longitud": "1",
        "telefono": "3316913723",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "ALEJANDRO BALDERAS ZUNIGA",
        "id": "2803",
        "tecnico": "65033334",
        "status": "1",
        "latitud": "19.4551383",
        "longitud": "-99.2216589",
        "telefono": "5540241366",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "ALEJANDRO BASURTO DESANTIAGO",
        "id": "24369",
        "tecnico": "RCEQU00001",
        "status": "1",
        "latitud": "1",
        "longitud": "1",
        "telefono": "5587886842",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "ALEJANDRO CERVANTES RODRIGUEZ",
        "id": "10601",
        "tecnico": "0065710188",
        "status": "1",
        "latitud": "20.127032",
        "longitud": "-98.807987",
        "telefono": "7717477237",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "ALEJANDRO CHAVEZ VILLANUEVA",
        "id": "11809",
        "tecnico": "TTPLEOP128",
        "status": "1",
        "latitud": "1",
        "longitud": "1",
        "telefono": "4775696903",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "ALEJANDRO CIAU CHAN",
        "id": "1121",
        "tecnico": "65953104",
        "status": "1",
        "latitud": "19.3045639",
        "longitud": "-99.203306",
        "telefono": "0000000000",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "ALEJANDRO ENRIQUE GALICIA SANCHEZ",
        "id": "29182",
        "tecnico": "MDRMO00001",
        "status": "1",
        "latitud": "1",
        "longitud": "1",
        "telefono": "8116523839",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "ALEJANDRO FERNANDO BERNAL ROMERO",
        "id": "8926",
        "tecnico": "TTPGDOP191",
        "status": "1",
        "latitud": "1",
        "longitud": "1",
        "telefono": "5.555555555E9",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "ALEJANDRO FIERRO FIERRO GOMEZ",
        "id": "11619",
        "tecnico": "TTPCJOP14",
        "status": "1",
        "latitud": "1",
        "longitud": "1",
        "telefono": "6562161697",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "ALEJANDRO FLORES CABALLERO",
        "id": "30979",
        "tecnico": "LCCGU00010",
        "status": "1",
        "latitud": "1",
        "longitud": "1",
        "telefono": "33348874",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "ALEJANDRO GARRIDO MAYA",
        "id": "12140",
        "tecnico": "65034483",
        "status": "7",
        "latitud": "19.3339791",
        "longitud": "-99.1985733",
        "telefono": "6562174432",
        "numots": "0",
        "color": "#242425",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "ALEJANDRO GUADALUPE LOPEZ VELARDE",
        "id": "1202",
        "tecnico": "65024021",
        "status": "1",
        "latitud": "19.3045679",
        "longitud": "-99.2033072",
        "telefono": "8111544909",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "ALEJANDRO ISRAEL MACIAS  ESPINOZA",
        "id": "11798",
        "tecnico": "TTPGDOP166",
        "status": "1",
        "latitud": "1",
        "longitud": "1",
        "telefono": "3323382516",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "ALEJANDRO MARTINEZ COCA",
        "id": "25143",
        "tecnico": "MRCQU00004",
        "status": "1",
        "latitud": "1",
        "longitud": "1",
        "telefono": "5553573607",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "ALEJANDRO MARTINEZ PALACIOS",
        "id": "10661",
        "tecnico": "65025113",
        "status": "1",
        "latitud": "19.292700",
        "longitud": "-99.1814009",
        "telefono": "5580964402",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "ALEJANDRO POSADA GUADARRAMA",
        "id": "2800",
        "tecnico": "65032309",
        "status": "1",
        "latitud": "19.3717363",
        "longitud": "-99.0037813",
        "telefono": "5530846641",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "ALEJANDRO ROLDAN LOPEZ",
        "id": "25660",
        "tecnico": "CAQUE00001",
        "status": "1",
        "latitud": "1",
        "longitud": "1",
        "telefono": "2223437911",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "ALEJANDRO ROSALES VAZQUEZ",
        "id": "1362",
        "tecnico": "65716382",
        "status": "1",
        "latitud": "1",
        "longitud": "1",
        "telefono": "72222791",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "ALEJANDRO RUIZ NAVARRO",
        "id": "10642",
        "tecnico": "65715227",
        "status": "1",
        "latitud": "19.623948",
        "longitud": "-99.1050845",
        "telefono": "5510515699",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "ALEJANDRO VILLASEÑOR DE LA VEGA",
        "id": "23025",
        "tecnico": "965710329",
        "status": "1",
        "latitud": "1",
        "longitud": "1",
        "telefono": "4775789513",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "ALEXANDER DEL CARMEN LIMON JIMENEZ",
        "id": "11622",
        "tecnico": "TTPCAOP115",
        "status": "1",
        "latitud": "1",
        "longitud": "1",
        "telefono": "9981514996",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "ALEXIS ARMANDO RUIZ RODRIGUEZ",
        "id": "6500",
        "tecnico": "65040543",
        "status": "1",
        "latitud": "19.3339327",
        "longitud": "-99.1985415",
        "telefono": "8123322493",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "ALEXIS BLANCO CASTRO",
        "id": "15461",
        "tecnico": "65038886",
        "status": "1",
        "latitud": "1",
        "longitud": "1",
        "telefono": "6121976747",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "ALEXIS EDUARDO MENDOZA RODRIGUEZ",
        "id": "36461",
        "tecnico": "65050710",
        "status": "1",
        "latitud": "1",
        "longitud": "1",
        "telefono": "6871426508",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "ALEXYS URIEL VERA LÓPEZ",
        "id": "16002",
        "tecnico": "INCCD00019",
        "status": "1",
        "latitud": "1",
        "longitud": "1",
        "telefono": "5530115610",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "ALFREDO CARREON CUELLAR",
        "id": "1078",
        "tecnico": "65490130",
        "status": "1",
        "latitud": "19.4322124",
        "longitud": "-99.0902994",
        "telefono": "5530441101",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "ALFREDO COLIO CRUZ",
        "id": "11768",
        "tecnico": "TTPPUOP119",
        "status": "1",
        "latitud": "1",
        "longitud": "1",
        "telefono": "2227894800",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "ALFREDO EVANGELISTA MORALES",
        "id": "1129",
        "tecnico": "65951691",
        "status": "1",
        "latitud": "19.3045787",
        "longitud": "-99.2032839",
        "telefono": "6564369844",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "ALFREDO GARCIA ALANIS",
        "id": "24336",
        "tecnico": "MRCQU00001",
        "status": "1",
        "latitud": "1",
        "longitud": "1",
        "telefono": "5553573607",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "ALFREDO JAVIER ARROYO GARCIA",
        "id": "24331",
        "tecnico": "TDNQU00009",
        "status": "1",
        "latitud": "1",
        "longitud": "1",
        "telefono": "5532012846",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "ALFREDO VARELA IZQUIERDO",
        "id": "11837",
        "tecnico": "TTPPUOP145",
        "status": "1",
        "latitud": "1",
        "longitud": "1",
        "telefono": "5585306118",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "ALFREDO VILLALOBOS URIETA",
        "id": "25768",
        "tecnico": "65047296",
        "status": "1",
        "latitud": "19.3341956",
        "longitud": "-99.1986532",
        "telefono": "99829103",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "ALMA ANGELICA ESCOBAR SIN INFORMACION",
        "id": "15093",
        "tecnico": "150062780",
        "status": "1",
        "latitud": "1",
        "longitud": "1",
        "telefono": "5555555555",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "ALMA ROSA ALARCON SERNA",
        "id": "22808",
        "tecnico": "MEMON00017",
        "status": "1",
        "latitud": "1",
        "longitud": "1",
        "telefono": "868184326",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "ALVARO DANIEL DURAN MACEDO",
        "id": "1023",
        "tecnico": "65950873",
        "status": "1",
        "latitud": "19.5167722",
        "longitud": "-99.1465298",
        "telefono": "5518035387",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "ALVARO ROSALES CASAS",
        "id": "7786",
        "tecnico": "65036297",
        "status": "1",
        "latitud": "1",
        "longitud": "1",
        "telefono": "5555555555",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "AMADO GARCIA VAZQUEZ",
        "id": "32681",
        "tecnico": "65051969",
        "status": "1",
        "latitud": "1",
        "longitud": "1",
        "telefono": "9931060720",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "ANAHÍ MÉNDEZ IBARRA",
        "id": "34541",
        "tecnico": "65051482",
        "status": "7",
        "latitud": "1",
        "longitud": "1",
        "telefono": "9988743574",
        "numots": "0",
        "color": "#242425",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "ANDRES GARC&IACUTE;A HERNANDEZ",
        "id": "1166",
        "tecnico": "65716779",
        "status": "1",
        "latitud": "20.1272164",
        "longitud": "-98.8077144",
        "telefono": "7715687606",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "ANDRES HERRERA ROQUE",
        "id": "24365",
        "tecnico": "BRANQ00006",
        "status": "1",
        "latitud": "1",
        "longitud": "1",
        "telefono": "5536384737",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "ANDRES ISRAEL RANGEL MONJARAZ",
        "id": "11794",
        "tecnico": "ENPGDOP121",
        "status": "1",
        "latitud": "1",
        "longitud": "1",
        "telefono": "3318031593",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "ANDRES ISRAEL RANGEL MONJARAZ",
        "id": "8856",
        "tecnico": "TTPGDOP121",
        "status": "2",
        "latitud": "1",
        "longitud": "1",
        "telefono": "5.555555555E9",
        "numots": "0",
        "color": "#f02d4f",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "ANDRES LOPEZ RUIZ",
        "id": "5921",
        "tecnico": "65005219",
        "status": "1",
        "latitud": "1",
        "longitud": "1",
        "telefono": "6671802496",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "ANGEL ALBERTO CONTRERAS DIAZ",
        "id": "1880",
        "tecnico": "65014551",
        "status": "1",
        "latitud": "1",
        "longitud": "1",
        "telefono": "5555555555",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "ANGEL HAIR ARROYO COSS",
        "id": "16826",
        "tecnico": "INCCD00024",
        "status": "1",
        "latitud": "1",
        "longitud": "1",
        "telefono": "5584569971",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "ANGEL IVAN RODRIGUEZ DOMINGUEZ",
        "id": "22460",
        "tecnico": "65047334",
        "status": "1",
        "latitud": "1",
        "longitud": "1",
        "telefono": "8671283301",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "ANGEL JAVIER VALDIVIA LEZAMA",
        "id": "11779",
        "tecnico": "ENPXAOP100",
        "status": "1",
        "latitud": "1",
        "longitud": "1",
        "telefono": "2282397173",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "ANGEL JAVIER VALDIVIA LEZAMA",
        "id": "8945",
        "tecnico": "TTPXAOP100",
        "status": "1",
        "latitud": "1",
        "longitud": "1",
        "telefono": "5.555555555E9",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "ANGEL MAYORGA MARQUEZ",
        "id": "1351",
        "tecnico": "65951714",
        "status": "1",
        "latitud": "1",
        "longitud": "1",
        "telefono": "4445854826",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "ANGEL MIRANDA FERRUSCA",
        "id": "11871",
        "tecnico": "TTPTLOP153",
        "status": "1",
        "latitud": "1",
        "longitud": "1",
        "telefono": "7225854237",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "ANGEL MONTES HERNANDEZ",
        "id": "8621",
        "tecnico": "65004269",
        "status": "1",
        "latitud": "1",
        "longitud": "1",
        "telefono": "4422022382",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "ANGEL PASTOR COGCO SILVA",
        "id": "10126",
        "tecnico": "65045822",
        "status": "1",
        "latitud": "19.3340196",
        "longitud": "-99.198537",
        "telefono": "9993622215",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "ANGELO JONATHAN CRUZ CRUZ",
        "id": "10965",
        "tecnico": "65716488",
        "status": "1",
        "latitud": "1",
        "longitud": "1",
        "telefono": "7773304830",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "ANIBAL DE JESUS MARTINEZ GARCIA",
        "id": "11778",
        "tecnico": "ENPXAOP101",
        "status": "1",
        "latitud": "1",
        "longitud": "1",
        "telefono": "2288263708",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "ANIBAL DEL ANGEL MARTINEZ GARCIA",
        "id": "8974",
        "tecnico": "TTPXAOP101",
        "status": "1",
        "latitud": "1",
        "longitud": "1",
        "telefono": "5.555555555E9",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "ANTONIO ESCOBAR SÁNCHEZ",
        "id": "29681",
        "tecnico": "65048130",
        "status": "1",
        "latitud": "1",
        "longitud": "1",
        "telefono": "7531253228",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "ANTONIO MATA RUIZ",
        "id": "25783",
        "tecnico": "65049665",
        "status": "1",
        "latitud": "1",
        "longitud": "1",
        "telefono": "98432273",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "ANTONIO VILLA CUEVAS",
        "id": "29682",
        "tecnico": "65049687",
        "status": "1",
        "latitud": "1",
        "longitud": "1",
        "telefono": "7531549984",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "ANTONIO ZURIZHADAY GONZ&AACUTE;LEZ LOPEZ",
        "id": "4360",
        "tecnico": "65037020",
        "status": "1",
        "latitud": "1",
        "longitud": "1",
        "telefono": "8124057444",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "APOLINAR ZAVALETA FUENTES",
        "id": "11203",
        "tecnico": "650015110",
        "status": "1",
        "latitud": "1",
        "longitud": "1",
        "telefono": "2288592758",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "ARIET FEDERICO HERNANDEZ RAMIREZ",
        "id": "11331",
        "tecnico": "65046672",
        "status": "1",
        "latitud": "1",
        "longitud": "1",
        "telefono": "4441209942",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "ARMANDO ANGUIANO ROSALES",
        "id": "2",
        "tecnico": "AGENTE_WEB",
        "status": "2",
        "latitud": "1",
        "longitud": "1",
        "telefono": "7785693254",
        "numots": "0",
        "color": "#f02d4f",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "ARMANDO GONZALEZ LOPEZ",
        "id": "8968",
        "tecnico": "TTPTJOP148",
        "status": "1",
        "latitud": "1",
        "longitud": "1",
        "telefono": "5.555555555E9",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "ARMANDO GONZALEZ NORIEGA",
        "id": "22146",
        "tecnico": "CONNU00003",
        "status": "1",
        "latitud": "1",
        "longitud": "1",
        "telefono": "8183738376",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "ARMANDO VIDALES CARRILLO",
        "id": "11803",
        "tecnico": "TTPGDOP179",
        "status": "1",
        "latitud": "1",
        "longitud": "1",
        "telefono": "3314248244",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "ARNOL DE JESUS ARROYO CAHUICH",
        "id": "13193",
        "tecnico": "65025237",
        "status": "1",
        "latitud": "1",
        "longitud": "1",
        "telefono": "9811375651",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "ARNOLDO HUMBERTO LOPEZ CASTRO",
        "id": "10381",
        "tecnico": "65012029",
        "status": "1",
        "latitud": "1",
        "longitud": "1",
        "telefono": "6142955731",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "ARNOLDO RAMIREZ MONTAÑEZ",
        "id": "16461",
        "tecnico": "65024862",
        "status": "1",
        "latitud": "1",
        "longitud": "1",
        "telefono": "8125164182",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "ARTEMIO HERNANDEZ HERNANDEZ",
        "id": "1881",
        "tecnico": "65027844",
        "status": "1",
        "latitud": "1",
        "longitud": "1",
        "telefono": "5555555555",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "ARTEMIO HERNANDEZ MARTINEZ",
        "id": "16462",
        "tecnico": "65490126",
        "status": "1",
        "latitud": "1",
        "longitud": "1",
        "telefono": "8115117264",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "ARTURO EDUARDO REYES MARQUEZ",
        "id": "11795",
        "tecnico": "ENPGDOP124",
        "status": "1",
        "latitud": "1",
        "longitud": "1",
        "telefono": "3324927499",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "ARTURO EDUARDO REYES MARQUEZ",
        "id": "8857",
        "tecnico": "TTPGDOP124",
        "status": "1",
        "latitud": "1",
        "longitud": "1",
        "telefono": "5.555555555E9",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "ARTURO MACIAS HURTADO",
        "id": "2620",
        "tecnico": "65027837",
        "status": "1",
        "latitud": "1",
        "longitud": "1",
        "telefono": "4772354435",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "ARTURO MILLAN MOCADA",
        "id": "9426",
        "tecnico": "65031454",
        "status": "1",
        "latitud": "1",
        "longitud": "1",
        "telefono": "7222279100",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "ARTURO NAVARRO LIUGO",
        "id": "11626",
        "tecnico": "TTPCJOP118",
        "status": "1",
        "latitud": "1",
        "longitud": "1",
        "telefono": "6565938253",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "ARTURO RAMON VILCHIS GONZALEZ",
        "id": "11868",
        "tecnico": "TTPTLOP162",
        "status": "1",
        "latitud": "1",
        "longitud": "1",
        "telefono": "7222018914",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "ATANACIO GONZALEZ URIBE",
        "id": "20722",
        "tecnico": "65048321",
        "status": "1",
        "latitud": "1",
        "longitud": "1",
        "telefono": "8125603877",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "AZAEL PE&NTILDE;A CARDENAS",
        "id": "3142",
        "tecnico": "65032450",
        "status": "1",
        "latitud": "19.6243038",
        "longitud": "-99.0763238",
        "telefono": "53538419",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "BARTOLO RETANA NAVARRETE",
        "id": "37800",
        "tecnico": "65051535",
        "status": "1",
        "latitud": "1",
        "longitud": "1",
        "telefono": "6567567694",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "BASILO EDISON AMPUDIA",
        "id": "1116",
        "tecnico": "65950935",
        "status": "1",
        "latitud": "1",
        "longitud": "1",
        "telefono": "96128333",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "BENEDICTO MANZANILLA CUTZ",
        "id": "8702",
        "tecnico": "TTPCAOP106",
        "status": "1",
        "latitud": "1",
        "longitud": "1",
        "telefono": "9983662683",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "BENITO EDUARDO TRUJILLO VEGA",
        "id": "22806",
        "tecnico": "MEMON00015",
        "status": "1",
        "latitud": "1",
        "longitud": "1",
        "telefono": "86818432",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "BENJAMIN DOMINGUEZ GUERRERO",
        "id": "11143",
        "tecnico": "65026792",
        "status": "1",
        "latitud": "1",
        "longitud": "1",
        "telefono": "9982919544",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "BENJAMIN MARTIN DEL CAMPO RUELAS",
        "id": "1582",
        "tecnico": "TTPAGOP119",
        "status": "7",
        "latitud": "19.3045706",
        "longitud": "-99.203339",
        "telefono": "4493843333",
        "numots": "0",
        "color": "#242425",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "BERNABÉ ACEVES HERNÁNDEZ",
        "id": "25602",
        "tecnico": "PNSQU00002",
        "status": "1",
        "latitud": "1",
        "longitud": "1",
        "telefono": "5215571",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "BERNARDO BALLESTEROS COLON",
        "id": "1172",
        "tecnico": "65005334",
        "status": "1",
        "latitud": "1",
        "longitud": "1",
        "telefono": "22278907",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "BILLI CASTELAN LOPEZ",
        "id": "11523",
        "tecnico": "TTPTJOP117",
        "status": "1",
        "latitud": "1",
        "longitud": "1",
        "telefono": "6631203925",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "BOLIVAR LUNA MONTES",
        "id": "11761",
        "tecnico": "TTPGDOP192",
        "status": "1",
        "latitud": "1",
        "longitud": "1",
        "telefono": "3318030487",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "BRANDON EMANUEL MORAN CORDERO",
        "id": "24346",
        "tecnico": "MEMON00019",
        "status": "1",
        "latitud": "1",
        "longitud": "1",
        "telefono": "8125816233",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "BRANDON XAVIER ALATORRE NU&NTILDE;EZ",
        "id": "1501",
        "tecnico": "65024684",
        "status": "1",
        "latitud": "19.3339813",
        "longitud": "-99.1985717",
        "telefono": "5555555555",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "BRAYAN ANTONIO FERNANDEZ GOMEZ",
        "id": "1327",
        "tecnico": "65025079",
        "status": "7",
        "latitud": "1",
        "longitud": "1",
        "telefono": "5555555555",
        "numots": "0",
        "color": "#242425",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "BRIAN ALEXIS SANTOS COY GOMEZ",
        "id": "26903",
        "tecnico": "65050567",
        "status": "1",
        "latitud": "1",
        "longitud": "1",
        "telefono": "3222442330",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "CARLO ALESSANDRO CALANCHE REYES",
        "id": "11875",
        "tecnico": "TTPTLOP139",
        "status": "1",
        "latitud": "1",
        "longitud": "1",
        "telefono": "7222015545",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "CARLO DELFINO NUÑEZ CORNELIO",
        "id": "8627",
        "tecnico": "EXQUE00043",
        "status": "1",
        "latitud": "1",
        "longitud": "1",
        "telefono": "93210051",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "CARLOS ABRAHAM GALVAN MORALES",
        "id": "34561",
        "tecnico": "65051005",
        "status": "1",
        "latitud": "1",
        "longitud": "1",
        "telefono": "7773048606",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "CARLOS ALBERO MORALES PEREZ",
        "id": "19784",
        "tecnico": "065015728",
        "status": "1",
        "latitud": "1",
        "longitud": "1",
        "telefono": "9931680560",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "CARLOS ALBERTO FLORES MUÑIZ",
        "id": "22173",
        "tecnico": "LCCGU00008",
        "status": "7",
        "latitud": "1",
        "longitud": "1",
        "telefono": "3320113015",
        "numots": "0",
        "color": "#242425",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "CARLOS ALBERTO LOPEZ VARGAS",
        "id": "28321",
        "tecnico": "65050136",
        "status": "1",
        "latitud": "1",
        "longitud": "1",
        "telefono": "6673907126",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "CARLOS ALBERTO RIVERA RODRIGUEZ",
        "id": "1066",
        "tecnico": "65015667",
        "status": "1",
        "latitud": "19.4568884",
        "longitud": "-99.0617451",
        "telefono": "5510536413",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "CARLOS ALEJANDRO MUÑOZ SANDOVAL",
        "id": "36221",
        "tecnico": "65052380",
        "status": "1",
        "latitud": "1",
        "longitud": "1",
        "telefono": "8712236285",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "CARLOS ALEJANDRO REYES MATA",
        "id": "16040",
        "tecnico": "65020679",
        "status": "1",
        "latitud": "1",
        "longitud": "1",
        "telefono": "5510499238",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "CARLOS ALFREDO ESPINO PAREDES",
        "id": "30561",
        "tecnico": "65050157",
        "status": "1",
        "latitud": "1",
        "longitud": "1",
        "telefono": "6673238236",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "CARLOS BACHO RAMIREZ",
        "id": "6980",
        "tecnico": "65028680",
        "status": "1",
        "latitud": "1",
        "longitud": "1",
        "telefono": "9982919156",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "CARLOS CRUZ HERNANDEZ",
        "id": "30963",
        "tecnico": "INCTI00041",
        "status": "1",
        "latitud": "1",
        "longitud": "1",
        "telefono": "6648706833",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "CARLOS DAVID SANDOVAL CANO",
        "id": "10551",
        "tecnico": "65714783",
        "status": "1",
        "latitud": "1",
        "longitud": "1",
        "telefono": "7227093558",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "CARLOS EDUARDO ARAGON MUÑOZ",
        "id": "36441",
        "tecnico": "65051003",
        "status": "1",
        "latitud": "1",
        "longitud": "1",
        "telefono": "6681343175",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "CARLOS EDUARDO GANZO PECH",
        "id": "11604",
        "tecnico": "TTPCAOP107",
        "status": "1",
        "latitud": "1",
        "longitud": "1",
        "telefono": "9982603625",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "CARLOS EDUARDO MARENTEZ HERNANDEZ",
        "id": "29001",
        "tecnico": "65051107",
        "status": "1",
        "latitud": "1",
        "longitud": "1",
        "telefono": "871176156",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "CARLOS EMANUEL RAMIREZ MARTINEZ",
        "id": "11145",
        "tecnico": "65025437",
        "status": "1",
        "latitud": "1",
        "longitud": "1",
        "telefono": "5530407869",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "CARLOS ERNESTO QUIROZ SANCHEZ",
        "id": "15462",
        "tecnico": "65023310",
        "status": "1",
        "latitud": "1",
        "longitud": "1",
        "telefono": "6692501806",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "CARLOS FERNANDO RAMIREZ FLORES",
        "id": "7784",
        "tecnico": "65040198",
        "status": "1",
        "latitud": "1",
        "longitud": "1",
        "telefono": "5555555555",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "CARLOS GREGORIO GARCIA GONZALEZ",
        "id": "1195",
        "tecnico": "65716729",
        "status": "1",
        "latitud": "1",
        "longitud": "1",
        "telefono": "3318014405",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "CARLOS IRVING PONTAZA CHAVEZ",
        "id": "1271",
        "tecnico": "65001094",
        "status": "1",
        "latitud": "1",
        "longitud": "1",
        "telefono": "5555555555",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "CARLOS IVAN HERNANDEZ LIONA",
        "id": "9118",
        "tecnico": "TTPTJOP105",
        "status": "1",
        "latitud": "1",
        "longitud": "1",
        "telefono": "6646795554",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "CARLOS IVAN LOPEZ OROZCO",
        "id": "8918",
        "tecnico": "TTPGDOP119",
        "status": "1",
        "latitud": "1",
        "longitud": "1",
        "telefono": "5.555555555E9",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "CARLOS JAHIR RAMIREZ ZUÑIGA",
        "id": "22149",
        "tecnico": "CONNU00006",
        "status": "1",
        "latitud": "1",
        "longitud": "1",
        "telefono": "8183738376",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "CARLOS MANUEL SOSA SANCHEZ",
        "id": "8920",
        "tecnico": "TTPGDOP185",
        "status": "1",
        "latitud": "1",
        "longitud": "1",
        "telefono": "5.555555555E9",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "CARLOS NEFTALI RIVERA CASTILLO",
        "id": "7745",
        "tecnico": "TTPMTOP174",
        "status": "1",
        "latitud": "1",
        "longitud": "1",
        "telefono": "8125164200",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "CARLOS PALACIOS MENDEZ",
        "id": "11767",
        "tecnico": "TTPPUOP101",
        "status": "1",
        "latitud": "1",
        "longitud": "1",
        "telefono": "2227948249",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "CARLOS PORTILLO CONTRERAS",
        "id": "11524",
        "tecnico": "TTPGDOP118",
        "status": "1",
        "latitud": "1",
        "longitud": "1",
        "telefono": "6642682386",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "CARLOS RAFAEL ANDRADE DE LA PEÑA",
        "id": "8963",
        "tecnico": "TTPPMOP400",
        "status": "1",
        "latitud": "1",
        "longitud": "1",
        "telefono": "5.555555555E9",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "CARLOS REYNOSO RAMOS",
        "id": "8946",
        "tecnico": "TTPGDOP162",
        "status": "1",
        "latitud": "1",
        "longitud": "1",
        "telefono": "3310986138",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "CARLOS RUIZ TORRES",
        "id": "31120",
        "tecnico": "MEGUA00035",
        "status": "3",
        "latitud": "1",
        "longitud": "1",
        "telefono": "3312726403",
        "numots": "0",
        "color": "#b8b5b6",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "CARLOS SANDOVAL BECERRA",
        "id": "17520",
        "tecnico": "ISCDM00003",
        "status": "7",
        "latitud": "1",
        "longitud": "1",
        "telefono": "5517499303",
        "numots": "0",
        "color": "#242425",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "CARLOS SANTIAGO KEB BALAM",
        "id": "10109",
        "tecnico": "65045821",
        "status": "1",
        "latitud": "1",
        "longitud": "1",
        "telefono": "9992691217",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "CARLOS SANTIAGO KEB BALAM",
        "id": "11184",
        "tecnico": "065045821",
        "status": "1",
        "latitud": "1",
        "longitud": "1",
        "telefono": "9992691217",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "CARLOS TERESO CEPEDA CARDONA",
        "id": "22148",
        "tecnico": "CONNU00005",
        "status": "1",
        "latitud": "1",
        "longitud": "1",
        "telefono": "8183738376",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "CARLOS ULISES SERVIN VALENCIA",
        "id": "30971",
        "tecnico": "BAGDQ00004",
        "status": "1",
        "latitud": "1",
        "longitud": "1",
        "telefono": "4611590276",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "CARLOS ZEPEDA AVILA",
        "id": "10587",
        "tecnico": "65023949",
        "status": "1",
        "latitud": "1",
        "longitud": "1",
        "telefono": "2293252238",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "CESAR ABRAHAM LUNA MARES",
        "id": "1243",
        "tecnico": "065013999",
        "status": "1",
        "latitud": "1",
        "longitud": "1",
        "telefono": "6567419798",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "CESAR DANIEL PACHECO ROMERO",
        "id": "30562",
        "tecnico": "65050158",
        "status": "1",
        "latitud": "1",
        "longitud": "1",
        "telefono": "6674873334",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "CESAR GALINDO VALDEZ",
        "id": "8921",
        "tecnico": "TTPGDOP171",
        "status": "1",
        "latitud": "1",
        "longitud": "1",
        "telefono": "5.555555555E9",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "CESAR GONZALEZ GARCIA",
        "id": "11893",
        "tecnico": "TTPTLOP141",
        "status": "7",
        "latitud": "1",
        "longitud": "1",
        "telefono": "7229133752",
        "numots": "0",
        "color": "#242425",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "CESAR IVAN MONTAÑO SALCEDO",
        "id": "27503",
        "tecnico": "MEMON00030",
        "status": "1",
        "latitud": "1",
        "longitud": "1",
        "telefono": "8122612513",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "CESAR LUNA MORALES",
        "id": "14662",
        "tecnico": "65716320",
        "status": "1",
        "latitud": "1",
        "longitud": "1",
        "telefono": "7441313479",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "CESAR MANUEL CASTELLANOS TENORIO",
        "id": "4564",
        "tecnico": "65034979",
        "status": "1",
        "latitud": "1",
        "longitud": "1",
        "telefono": "2293670348",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "CESAR MICHEL AZAMAR RUELAS",
        "id": "1222",
        "tecnico": "65020769",
        "status": "7",
        "latitud": "1",
        "longitud": "1",
        "telefono": "3323607261",
        "numots": "0",
        "color": "#242425",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "CESAR OCTAVIO LOPEZ LOPEZ",
        "id": "11836",
        "tecnico": "TTPPUOP117",
        "status": "1",
        "latitud": "1",
        "longitud": "1",
        "telefono": "2229135267",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "CESAR PEREZ RIOS",
        "id": "22821",
        "tecnico": "MEMON00009",
        "status": "1",
        "latitud": "1",
        "longitud": "1",
        "telefono": "1559104020",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "CHRISTIAN ANUAR AMADOR VARGAS",
        "id": "32220",
        "tecnico": "MEGUA00038",
        "status": "7",
        "latitud": "1",
        "longitud": "1",
        "telefono": "3324258297",
        "numots": "0",
        "color": "#242425",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "CHRISTIAN DIDIER BARRIGA DIAZ",
        "id": "3160",
        "tecnico": "65032531",
        "status": "1",
        "latitud": "19.3339327",
        "longitud": "-99.1984991",
        "telefono": "5584082359",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "CHRISTIAN ENRIQUE HERNÁNDEZ MORALES",
        "id": "32541",
        "tecnico": "965015679",
        "status": "7",
        "latitud": "1",
        "longitud": "1",
        "telefono": "5567095041",
        "numots": "0",
        "color": "#242425",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "CHRISTIAN FERNANDO  TORRES CRUZ",
        "id": "11801",
        "tecnico": "TTPGDOP177",
        "status": "1",
        "latitud": "1",
        "longitud": "1",
        "telefono": "3318031564",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "CHRISTIAN ISAIAS BERNAL PIÑA",
        "id": "28281",
        "tecnico": "TORMO00010",
        "status": "1",
        "latitud": "1",
        "longitud": "1",
        "telefono": "8115183222",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "CHRISTOPHER RAUL GARZA CONTRERAS",
        "id": "16444",
        "tecnico": "65045597",
        "status": "1",
        "latitud": "1",
        "longitud": "1",
        "telefono": "8117852243",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "CONCEPCION LOPEZ CABALLERO",
        "id": "1115",
        "tecnico": "65713509",
        "status": "1",
        "latitud": "1",
        "longitud": "1",
        "telefono": "96128333",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "CORTE INDIVIDUAL TECNICO",
        "id": "14681",
        "tecnico": "INSTACI",
        "status": "1",
        "latitud": "19.3339693",
        "longitud": "-99.1985462",
        "telefono": "5555555555",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    },
    {
        "nombre": "CRISTIAN IVAN MONTAÑEZ MALACARA",
        "id": "26321",
        "tecnico": "65050549",
        "status": "1",
        "latitud": "1",
        "longitud": "1",
        "telefono": "8443525723",
        "numots": "0",
        "color": "#5cbc5c",
        "urlimg": "./resources/img/plantainterna/despacho/tecnico.png",
        "centro": "SIN INFO",
        "almacen": "SIN INFO"
    }
]

var otspendientes=[
    {
        "Id_ot": "64922",
        "Id_os": "OS-22445",
        "Cliente": "TESTQAA  ANGIE ASIGAUTO2 12062019-",
        "Numero_cuenta": "0210007815",
        "Paquete_instalar": "INTERNET 20/20",
        "Ticket_sf": "NA",
        "Num_tickets": "0",
        "Cita": "30/03/2021",
        "Numero_empresa": "5555454565",
        "Numero_contacto": "5523498707",
        "Ciudad": "CIUDAD DE MEXICO",
        "Municipio": "EMILIANO ZAPATA",
        "Colonia": "EMILIANO ZAPATA",
        "Cp": "56550",
        "Direcccion_completa": "CIUDAD DE MEXICO, EMILIANO ZAPATA, EMILIANO ZAPATA, SUR, CP:56550",
        "Dias_retrazo": "#f50400",
        "Confirmada": "0",
        "Id_intervencion": "48",
        "Id_tipo_ot": "1",
        "Letra_intervencion": "I",
        "Turno": "VESPERTINO",
        "Id_os_sf": "a0iQ000000BqW69IAF",
        "Color": "#C1CF00",
        "intervencion": "INSTALACIÓN"
    },
    {
        "Id_ot": "65241",
        "Id_os": "OS-24786",
        "Cliente": "MINISO S.A. DE C.V.-",
        "Numero_cuenta": "0210008367",
        "Paquete_instalar": "INTERNET 10 E1",
        "Ticket_sf": "NA",
        "Num_tickets": "0",
        "Cita": "30/03/2021",
        "Numero_empresa": "5557788988",
        "Numero_contacto": "1234567898",
        "Ciudad": "CIUDAD DE MEXICO",
        "Municipio": "CIUDAD DE MÉXICO",
        "Colonia": "INSURGENTES CUICUILCO",
        "Cp": "04530",
        "Direcccion_completa": "CIUDAD DE MEXICO, CIUDAD DE MÉXICO, INSURGENTES CUICUILCO, SUR, CP:04530",
        "Dias_retrazo": "#f50400",
        "Confirmada": "0",
        "Id_intervencion": "48",
        "Id_tipo_ot": "1",
        "Letra_intervencion": "I",
        "Turno": "VESPERTINO",
        "Id_os_sf": "a0iQ000000BqZBNIA3",
        "Color": "#C1CF00",
        "intervencion": "INSTALACIÓN"
    },
    {
        "Id_ot": "65889",
        "Id_os": "OS-25755",
        "Cliente": "BANAMEX",
        "Numero_cuenta": "0210009819",
        "Paquete_instalar": "INTERNET SIMETRICO 50 MBPS MICROONDAS PMP.",
        "Ticket_sf": "NA",
        "Num_tickets": "0",
        "Cita": "30/03/2021",
        "Numero_empresa": "7878878787",
        "Numero_contacto": "7987887787",
        "Ciudad": "CIUDAD DE MEXICO",
        "Municipio": "MÉXICO D.F.",
        "Colonia": "COL DEL VALLE CENTRO",
        "Cp": "3100",
        "Direcccion_completa": "CIUDAD DE MEXICO, MÉXICO D.F., COL DEL VALLE CENTRO, SUR, CP:3100",
        "Dias_retrazo": "#f50400",
        "Confirmada": "1",
        "Id_intervencion": "48",
        "Id_tipo_ot": "1",
        "Letra_intervencion": "I",
        "Turno": "MATUTINO",
        "Id_os_sf": "a0iQ000000Blg7QIAR",
        "Color": "#C1CF00",
        "intervencion": "INSTALACIÓN"
    },
    {
        "Id_ot": "65180",
        "Id_os": "OS-24730",
        "Cliente": "PASTES TEJEDA",
        "Numero_cuenta": "0210008840",
        "Paquete_instalar": "PLAN EMPRESA 50 MBPS",
        "Ticket_sf": "NA",
        "Num_tickets": "0",
        "Cita": "30/03/2021",
        "Numero_empresa": "5544112244",
        "Numero_contacto": "5557788988",
        "Ciudad": "PACHUCA",
        "Municipio": "PACHUCA DE SOTO",
        "Colonia": "CENTRO",
        "Cp": "42020",
        "Direcccion_completa": "PACHUCA, PACHUCA DE SOTO, CENTRO, PACHUCA, CP:42020",
        "Dias_retrazo": "#f50400",
        "Confirmada": "0",
        "Id_intervencion": "48",
        "Id_tipo_ot": "1",
        "Letra_intervencion": "I",
        "Turno": "VESPERTINO",
        "Id_os_sf": "a0iQ000000BqYpbIAF",
        "Color": "#C1CF00",
        "intervencion": "INSTALACIÓN"
    },
    {
        "Id_ot": "65249",
        "Id_os": "OS-24798",
        "Cliente": "PRUEBAS BANDEJAS INFRAESTRUCTURA-",
        "Numero_cuenta": "0210008882",
        "Paquete_instalar": "INTERNET SIMETRICO 10 MBPS MICROONDAS PMP.",
        "Ticket_sf": "NA",
        "Num_tickets": "0",
        "Cita": "30/03/2021",
        "Numero_empresa": "5545655655",
        "Numero_contacto": "8822449944",
        "Ciudad": "CIUDAD DE MEXICO",
        "Municipio": "CIUDAD DE MÉXICO",
        "Colonia": "JARDINES EN LA MONTAÑA",
        "Cp": "14210",
        "Direcccion_completa": "CIUDAD DE MEXICO, CIUDAD DE MÉXICO, JARDINES EN LA MONTAÑA, SUR, CP:14210",
        "Dias_retrazo": "#f50400",
        "Confirmada": "0",
        "Id_intervencion": "48",
        "Id_tipo_ot": "1",
        "Letra_intervencion": "I",
        "Turno": "MATUTINO",
        "Id_os_sf": "a0iQ000000BqZdFIAV",
        "Color": "#C1CF00",
        "intervencion": "INSTALACIÓN"
    },
    {
        "Id_ot": "65251",
        "Id_os": "OS-24800",
        "Cliente": "PRUEBAS BANDEJAS INFRAESTRUCTURA-",
        "Numero_cuenta": "0210008888",
        "Paquete_instalar": "INTERNET 10 E1",
        "Ticket_sf": "NA",
        "Num_tickets": "0",
        "Cita": "30/03/2021",
        "Numero_empresa": "5545655655",
        "Numero_contacto": "8822449944",
        "Ciudad": "CIUDAD DE MEXICO",
        "Municipio": "CIUDAD DE MÉXICO",
        "Colonia": "HÉROES DE PADIERNA",
        "Cp": "10700",
        "Direcccion_completa": "CIUDAD DE MEXICO, CIUDAD DE MÉXICO, HÉROES DE PADIERNA, SUR, CP:10700",
        "Dias_retrazo": "#f50400",
        "Confirmada": "0",
        "Id_intervencion": "48",
        "Id_tipo_ot": "1",
        "Letra_intervencion": "I",
        "Turno": "VESPERTINO",
        "Id_os_sf": "a0iQ000000BqZdPIAV",
        "Color": "#C1CF00",
        "intervencion": "INSTALACIÓN"
    },
    {
        "Id_ot": "65842",
        "Id_os": "OS-25682",
        "Cliente": "TESTQAA  JAVIER CUENTASEMPRESARIALESENRESIDENCIALUNO 12062019-",
        "Numero_cuenta": "0210010331",
        "Paquete_instalar": "MICRO 40.",
        "Ticket_sf": "NA",
        "Num_tickets": "0",
        "Cita": "30/03/2021",
        "Numero_empresa": "5555454565",
        "Numero_contacto": "5531215656",
        "Ciudad": "CIUDAD DE MEXICO",
        "Municipio": "CIUDAD DE MÉXICO",
        "Colonia": "LORETO Y CAMPAMENTO",
        "Cp": "04510",
        "Direcccion_completa": "CIUDAD DE MEXICO, CIUDAD DE MÉXICO, LORETO Y CAMPAMENTO, SUR, CP:04510",
        "Dias_retrazo": "#f50400",
        "Confirmada": "0",
        "Id_intervencion": "48",
        "Id_tipo_ot": "1",
        "Letra_intervencion": "I",
        "Turno": "VESPERTINO",
        "Id_os_sf": "a0iQ000000Br306IAB",
        "Color": "#C1CF00",
        "intervencion": "INSTALACIÓN"
    },
    {
        "Id_ot": "65843",
        "Id_os": "OS-25683",
        "Cliente": "TESTQAA  JAVIER CUENTASEMPRESARIALESENRESIDENCIAL 12062019-",
        "Numero_cuenta": "0210010333",
        "Paquete_instalar": "MICRO 20.",
        "Ticket_sf": "NA",
        "Num_tickets": "0",
        "Cita": "30/03/2021",
        "Numero_empresa": "5555454565",
        "Numero_contacto": "6744546878",
        "Ciudad": "CIUDAD DE MEXICO",
        "Municipio": "CIUDAD DE MÉXICO",
        "Colonia": "LORETO Y CAMPAMENTO",
        "Cp": "04510",
        "Direcccion_completa": "CIUDAD DE MEXICO, CIUDAD DE MÉXICO, LORETO Y CAMPAMENTO, SUR, CP:04510",
        "Dias_retrazo": "#f50400",
        "Confirmada": "0",
        "Id_intervencion": "48",
        "Id_tipo_ot": "1",
        "Letra_intervencion": "I",
        "Turno": "VESPERTINO",
        "Id_os_sf": "a0iQ000000Br30BIAR",
        "Color": "#C1CF00",
        "intervencion": "INSTALACIÓN"
    },
    {
        "Id_ot": "65177",
        "Id_os": "OS-24727",
        "Cliente": "TESTQAA  AT APROVISIONAMIENTOUNIVERSAL21 12062019-",
        "Numero_cuenta": "0210008791",
        "Paquete_instalar": "INTERNET DEDICADO EMPRESARIAL 50 MB.",
        "Ticket_sf": "NA",
        "Num_tickets": "0",
        "Cita": "30/03/2021",
        "Numero_empresa": "5555454565",
        "Numero_contacto": "5544564564",
        "Ciudad": "CIUDAD DE MEXICO",
        "Municipio": "CIUDAD DE MÉXICO",
        "Colonia": "LA OTRA BANDA",
        "Cp": "04510",
        "Direcccion_completa": "CIUDAD DE MEXICO, CIUDAD DE MÉXICO, LA OTRA BANDA, SUR, CP:04510",
        "Dias_retrazo": "#f50400",
        "Confirmada": "0",
        "Id_intervencion": "48",
        "Id_tipo_ot": "1",
        "Letra_intervencion": "I",
        "Turno": "VESPERTINO",
        "Id_os_sf": "a0iQ000000BqYoxIAF",
        "Color": "#C1CF00",
        "intervencion": "INSTALACIÓN"
    },
    {
        "Id_ot": "65229",
        "Id_os": "OS-24766",
        "Cliente": "MINISO S.A. DE C.V.-",
        "Numero_cuenta": "0210008419",
        "Paquete_instalar": "INTERNET DEDICADO 10 MBPS MICROONDAS PMP.",
        "Ticket_sf": "NA",
        "Num_tickets": "0",
        "Cita": "30/03/2021",
        "Numero_empresa": "5557788988",
        "Numero_contacto": "1234567898",
        "Ciudad": "CIUDAD DE MEXICO",
        "Municipio": "CIUDAD DE MÉXICO",
        "Colonia": "AJUSCO",
        "Cp": "04300",
        "Direcccion_completa": "CIUDAD DE MEXICO, CIUDAD DE MÉXICO, AJUSCO, SUR, CP:04300",
        "Dias_retrazo": "#f50400",
        "Confirmada": "0",
        "Id_intervencion": "48",
        "Id_tipo_ot": "1",
        "Letra_intervencion": "I",
        "Turno": "MATUTINO",
        "Id_os_sf": "a0iQ000000BqZ3nIAF",
        "Color": "#C1CF00",
        "intervencion": "INSTALACIÓN"
    },
    {
        "Id_ot": "65230",
        "Id_os": "OS-24767",
        "Cliente": "MINISO S.A. DE C.V.-",
        "Numero_cuenta": "0210008420",
        "Paquete_instalar": "INTERNET SIMETRICO 10 MBPS MICROONDAS PMP.",
        "Ticket_sf": "NA",
        "Num_tickets": "0",
        "Cita": "30/03/2021",
        "Numero_empresa": "5557788988",
        "Numero_contacto": "1234567898",
        "Ciudad": "CIUDAD DE MEXICO",
        "Municipio": "CIUDAD DE MÉXICO",
        "Colonia": "AJUSCO",
        "Cp": "04300",
        "Direcccion_completa": "CIUDAD DE MEXICO, CIUDAD DE MÉXICO, AJUSCO, SUR, CP:04300",
        "Dias_retrazo": "#f50400",
        "Confirmada": "0",
        "Id_intervencion": "48",
        "Id_tipo_ot": "1",
        "Letra_intervencion": "I",
        "Turno": "MATUTINO",
        "Id_os_sf": "a0iQ000000BqZ3sIAF",
        "Color": "#C1CF00",
        "intervencion": "INSTALACIÓN"
    },
    {
        "Id_ot": "65847",
        "Id_os": "OS-25688",
        "Cliente": "TESTQAA  JAVIER CUENTASEMPRESARIALESENRESIDENCIALCINCO 12062019-",
        "Numero_cuenta": "0210010339",
        "Paquete_instalar": "EMPRENDEDOR.",
        "Ticket_sf": "NA",
        "Num_tickets": "0",
        "Cita": "30/03/2021",
        "Numero_empresa": "5555454565",
        "Numero_contacto": "5456112332",
        "Ciudad": "CIUDAD DE MEXICO",
        "Municipio": "CIUDAD DE MÉXICO",
        "Colonia": "LORETO Y CAMPAMENTO",
        "Cp": "04510",
        "Direcccion_completa": "CIUDAD DE MEXICO, CIUDAD DE MÉXICO, LORETO Y CAMPAMENTO, SUR, CP:04510",
        "Dias_retrazo": "#f50400",
        "Confirmada": "0",
        "Id_intervencion": "48",
        "Id_tipo_ot": "1",
        "Letra_intervencion": "I",
        "Turno": "VESPERTINO",
        "Id_os_sf": "a0iQ000000Br36lIAB",
        "Color": "#C1CF00",
        "intervencion": "INSTALACIÓN"
    },
    {
        "Id_ot": "66165",
        "Id_os": "OS-26451",
        "Cliente": "TESTQA ANGIE AR 13012020",
        "Numero_cuenta": "0210010049",
        "Paquete_instalar": "RED IP 4 MBPS MICROONDAS PMP.",
        "Ticket_sf": "NA",
        "Num_tickets": "0",
        "Cita": "30/03/2021",
        "Numero_empresa": "5544564564",
        "Numero_contacto": "5598765432",
        "Ciudad": "CIUDAD DE MEXICO",
        "Municipio": "CIUDAD DE MÉXICO",
        "Colonia": "LA OTRA BANDA",
        "Cp": "01090",
        "Direcccion_completa": "CIUDAD DE MEXICO, CIUDAD DE MÉXICO, LA OTRA BANDA, SUR, CP:01090",
        "Dias_retrazo": "#f50400",
        "Confirmada": "0",
        "Id_intervencion": "48",
        "Id_tipo_ot": "1",
        "Letra_intervencion": "I",
        "Turno": "MATUTINO",
        "Id_os_sf": "a0iQ000000BlihlIAB",
        "Color": "#C1CF00",
        "intervencion": "INSTALACIÓN"
    },
    {
        "Id_ot": "66138",
        "Id_os": "OS-26393",
        "Cliente": "TESTQA JOSS LAN2CLOUD AUTOMATIZACIÓN PRUEBA44 07042020-",
        "Numero_cuenta": "0210011322",
        "Paquete_instalar": "INTERNET DEDICADO EMPRESARIAL 100 MB.",
        "Ticket_sf": "NA",
        "Num_tickets": "0",
        "Cita": "30/03/2021",
        "Numero_empresa": "5598756780",
        "Numero_contacto": "5598756780",
        "Ciudad": "CIUDAD DE MEXICO",
        "Municipio": "CIUDAD DE MÉXICO",
        "Colonia": "CUAUHTÉMOC",
        "Cp": "06500",
        "Direcccion_completa": "CIUDAD DE MEXICO, CIUDAD DE MÉXICO, CUAUHTÉMOC, SUR, CP:06500",
        "Dias_retrazo": "#f50400",
        "Confirmada": "0",
        "Id_intervencion": "48",
        "Id_tipo_ot": "1",
        "Letra_intervencion": "I",
        "Turno": "VESPERTINO",
        "Id_os_sf": "a0iQ000000Br786IAB",
        "Color": "#C1CF00",
        "intervencion": "INSTALACIÓN"
    },
    {
        "Id_ot": "66166",
        "Id_os": "OS-26452",
        "Cliente": "ACTIVACION UNIVERSAL",
        "Numero_cuenta": "0210010073",
        "Paquete_instalar": "INTERNET DEDICADO 20_MBPS.",
        "Ticket_sf": "NA",
        "Num_tickets": "0",
        "Cita": "30/03/2021",
        "Numero_empresa": "0987654321",
        "Numero_contacto": "1234567890",
        "Ciudad": "CIUDAD DE MEXICO",
        "Municipio": "CIUDAD DE MÉXICO",
        "Colonia": "JARDINES DEL PEDREGAL",
        "Cp": "01900",
        "Direcccion_completa": "CIUDAD DE MEXICO, CIUDAD DE MÉXICO, JARDINES DEL PEDREGAL, SUR, CP:01900",
        "Dias_retrazo": "#f50400",
        "Confirmada": "0",
        "Id_intervencion": "48",
        "Id_tipo_ot": "1",
        "Letra_intervencion": "I",
        "Turno": "VESPERTINO",
        "Id_os_sf": "a0iQ000000BlihqIAB",
        "Color": "#C1CF00",
        "intervencion": "INSTALACIÓN"
    },
    {
        "Id_ot": "66276",
        "Id_os": "OS-26746",
        "Cliente": "TESTQAA",
        "Numero_cuenta": "0210011709",
        "Paquete_instalar": "INTERNET 3 E",
        "Ticket_sf": "00145306",
        "Num_tickets": "1",
        "Cita": "30/03/2021",
        "Numero_empresa": "5589453164",
        "Numero_contacto": "5523377698",
        "Ciudad": "CIUDAD DE MEXICO",
        "Municipio": "MEXICO D.F.",
        "Colonia": "LORETO Y CAMPAMENTO",
        "Cp": "04510",
        "Direcccion_completa": "CIUDAD DE MEXICO, MEXICO D.F., LORETO Y CAMPAMENTO, SUR, CP:04510",
        "Dias_retrazo": "#f50400",
        "Confirmada": "0",
        "Id_intervencion": "55",
        "Id_tipo_ot": "1",
        "Letra_intervencion": "S",
        "Turno": "MATUTINO",
        "Id_os_sf": "a0iQ000000Bv1tkIAB",
        "Color": "#EA4C31",
        "intervencion": "SOPORTE"
    },
    {
        "Id_ot": "65228",
        "Id_os": "OS-24765",
        "Cliente": "MINISO S.A. DE C.V.-",
        "Numero_cuenta": "0210008293",
        "Paquete_instalar": "INTERNET DEDICADO 10 MBPS MICROONDAS PMP.",
        "Ticket_sf": "NA",
        "Num_tickets": "0",
        "Cita": "30/03/2021",
        "Numero_empresa": "5557788988",
        "Numero_contacto": "1234567898",
        "Ciudad": "CIUDAD DE MEXICO",
        "Municipio": "CIUDAD DE MÉXICO",
        "Colonia": "GRANJAS PALO ALTO",
        "Cp": "05110",
        "Direcccion_completa": "CIUDAD DE MEXICO, CIUDAD DE MÉXICO, GRANJAS PALO ALTO, SUR, CP:05110",
        "Dias_retrazo": "#f50400",
        "Confirmada": "0",
        "Id_intervencion": "48",
        "Id_tipo_ot": "1",
        "Letra_intervencion": "I",
        "Turno": "VESPERTINO",
        "Id_os_sf": "a0iQ000000BqYz2IAF",
        "Color": "#C1CF00",
        "intervencion": "INSTALACIÓN"
    },
    {
        "Id_ot": "65261",
        "Id_os": "OS-24812",
        "Cliente": "MINISO S.A. DE C.V.-",
        "Numero_cuenta": "0210008296",
        "Paquete_instalar": "RED IP 2 MBPS MICROONDAS PMP.",
        "Ticket_sf": "NA",
        "Num_tickets": "0",
        "Cita": "30/03/2021",
        "Numero_empresa": "5557788988",
        "Numero_contacto": "1234567898",
        "Ciudad": "CIUDAD DE MEXICO",
        "Municipio": "CIUDAD DE MÉXICO",
        "Colonia": "GRANJAS PALO ALTO",
        "Cp": "05110",
        "Direcccion_completa": "CIUDAD DE MEXICO, CIUDAD DE MÉXICO, GRANJAS PALO ALTO, SUR, CP:05110",
        "Dias_retrazo": "#f50400",
        "Confirmada": "0",
        "Id_intervencion": "48",
        "Id_tipo_ot": "1",
        "Letra_intervencion": "I",
        "Turno": "VESPERTINO",
        "Id_os_sf": "a0iQ000000BqZf6IAF",
        "Color": "#C1CF00",
        "intervencion": "INSTALACIÓN"
    },
    {
        "Id_ot": "65282",
        "Id_os": "OS-24842",
        "Cliente": "TESTQAA  AT APROVUNIVERSALPOSTVENTA5 12062019-",
        "Numero_cuenta": "0210008976",
        "Paquete_instalar": "INTERNET SIMÉTRICO EMPRESARIAL 100/100.",
        "Ticket_sf": "NA",
        "Num_tickets": "0",
        "Cita": "30/03/2021",
        "Numero_empresa": "5555454565",
        "Numero_contacto": "4325346346",
        "Ciudad": "CIUDAD DE MEXICO",
        "Municipio": "CIUDAD DE MÉXICO",
        "Colonia": "JARDINES DEL PEDREGAL",
        "Cp": "01900",
        "Direcccion_completa": "CIUDAD DE MEXICO, CIUDAD DE MÉXICO, JARDINES DEL PEDREGAL, SUR, CP:01900",
        "Dias_retrazo": "#f50400",
        "Confirmada": "0",
        "Id_intervencion": "48",
        "Id_tipo_ot": "1",
        "Letra_intervencion": "I",
        "Turno": "VESPERTINO",
        "Id_os_sf": "a0iQ000000BqZwlIAF",
        "Color": "#C1CF00",
        "intervencion": "INSTALACIÓN"
    },
    {
        "Id_ot": "65284",
        "Id_os": "OS-24844",
        "Cliente": "TESTQAA  AT APROVUNIVERSALPOSTVENTA5 12062019-",
        "Numero_cuenta": "0210008978",
        "Paquete_instalar": "INTERNET SIMÉTRICO EMPRESARIAL 200/200.",
        "Ticket_sf": "NA",
        "Num_tickets": "0",
        "Cita": "30/03/2021",
        "Numero_empresa": "5555454565",
        "Numero_contacto": "4325346346",
        "Ciudad": "CIUDAD DE MEXICO",
        "Municipio": "CIUDAD DE MÉXICO",
        "Colonia": "JARDINES DEL PEDREGAL",
        "Cp": "01900",
        "Direcccion_completa": "CIUDAD DE MEXICO, CIUDAD DE MÉXICO, JARDINES DEL PEDREGAL, SUR, CP:01900",
        "Dias_retrazo": "#f50400",
        "Confirmada": "0",
        "Id_intervencion": "48",
        "Id_tipo_ot": "1",
        "Letra_intervencion": "I",
        "Turno": "VESPERTINO",
        "Id_os_sf": "a0iQ000000BqZwvIAF",
        "Color": "#C1CF00",
        "intervencion": "INSTALACIÓN"
    },
    {
        "Id_ot": "65285",
        "Id_os": "OS-24845",
        "Cliente": "TESTQAA  AT APROVUNIVERSALPOSTVENTA5 12062019-",
        "Numero_cuenta": "0210008979",
        "Paquete_instalar": "INTERNET SIMÉTRICO EMPRESARIAL 300/300.",
        "Ticket_sf": "NA",
        "Num_tickets": "0",
        "Cita": "30/03/2021",
        "Numero_empresa": "5555454565",
        "Numero_contacto": "4325346346",
        "Ciudad": "CIUDAD DE MEXICO",
        "Municipio": "CIUDAD DE MÉXICO",
        "Colonia": "JARDINES DEL PEDREGAL",
        "Cp": "01900",
        "Direcccion_completa": "CIUDAD DE MEXICO, CIUDAD DE MÉXICO, JARDINES DEL PEDREGAL, SUR, CP:01900",
        "Dias_retrazo": "#f50400",
        "Confirmada": "0",
        "Id_intervencion": "48",
        "Id_tipo_ot": "1",
        "Letra_intervencion": "I",
        "Turno": "VESPERTINO",
        "Id_os_sf": "a0iQ000000BqZx0IAF",
        "Color": "#C1CF00",
        "intervencion": "INSTALACIÓN"
    },
    {
        "Id_ot": "65288",
        "Id_os": "OS-24848",
        "Cliente": "TESTQAA  AT APROVUNIVERSALPOSTVENTA6 12062019-",
        "Numero_cuenta": "0210008982",
        "Paquete_instalar": "INTERNET DEDICADO 20_MBPS.",
        "Ticket_sf": "NA",
        "Num_tickets": "0",
        "Cita": "30/03/2021",
        "Numero_empresa": "5555454565",
        "Numero_contacto": "1324523463",
        "Ciudad": "CIUDAD DE MEXICO",
        "Municipio": "CIUDAD DE MÉXICO",
        "Colonia": "JARDINES DEL PEDREGAL",
        "Cp": "01900",
        "Direcccion_completa": "CIUDAD DE MEXICO, CIUDAD DE MÉXICO, JARDINES DEL PEDREGAL, SUR, CP:01900",
        "Dias_retrazo": "#f50400",
        "Confirmada": "0",
        "Id_intervencion": "48",
        "Id_tipo_ot": "1",
        "Letra_intervencion": "I",
        "Turno": "VESPERTINO",
        "Id_os_sf": "a0iQ000000BqZxFIAV",
        "Color": "#C1CF00",
        "intervencion": "INSTALACIÓN"
    },
    {
        "Id_ot": "65846",
        "Id_os": "OS-25687",
        "Cliente": "GUARADA OPPORTUNITY",
        "Numero_cuenta": "0210010354",
        "Paquete_instalar": "INTERNET DEDICADO 20 MBPS MICROONDAS PMP.",
        "Ticket_sf": "NA",
        "Num_tickets": "0",
        "Cita": "30/03/2021",
        "Numero_empresa": "5520202010",
        "Numero_contacto": "5556456456",
        "Ciudad": "CIUDAD DE MEXICO",
        "Municipio": "CIUDAD DE MÉXICO",
        "Colonia": "CENTRO",
        "Cp": "06000",
        "Direcccion_completa": "CIUDAD DE MEXICO, CIUDAD DE MÉXICO, CENTRO, SUR, CP:06000",
        "Dias_retrazo": "#f50400",
        "Confirmada": "1",
        "Id_intervencion": "48",
        "Id_tipo_ot": "1",
        "Letra_intervencion": "I",
        "Turno": "VESPERTINO",
        "Id_os_sf": "a0iQ000000Br34rIAB",
        "Color": "#C1CF00",
        "intervencion": "INSTALACIÓN"
    },
    {
        "Id_ot": "65272",
        "Id_os": "OS-24826",
        "Cliente": "TESTQAA  AT APROVUNIVERSALPOSTVENTA1 12062019-",
        "Numero_cuenta": "0210008931",
        "Paquete_instalar": "INTERNET SIMÉTRICO EMPRESARIAL 20/20.",
        "Ticket_sf": "NA",
        "Num_tickets": "0",
        "Cita": "30/03/2021",
        "Numero_empresa": "5555454565",
        "Numero_contacto": "5568656186",
        "Ciudad": "CIUDAD DE MEXICO",
        "Municipio": "CIUDAD DE MÉXICO",
        "Colonia": "JARDINES DEL PEDREGAL",
        "Cp": "01900",
        "Direcccion_completa": "CIUDAD DE MEXICO, CIUDAD DE MÉXICO, JARDINES DEL PEDREGAL, SUR, CP:01900",
        "Dias_retrazo": "#f50400",
        "Confirmada": "0",
        "Id_intervencion": "48",
        "Id_tipo_ot": "1",
        "Letra_intervencion": "I",
        "Turno": "MATUTINO",
        "Id_os_sf": "a0iQ000000BqZr7IAF",
        "Color": "#C1CF00",
        "intervencion": "INSTALACIÓN"
    },
    {
        "Id_ot": "66130",
        "Id_os": "OS-26325",
        "Cliente": "TESTQAA MGUERRERO DESCUENTO MATERIALES 2 230420-",
        "Numero_cuenta": "0210011299",
        "Paquete_instalar": "INTERNET 3 E",
        "Ticket_sf": "NA",
        "Num_tickets": "0",
        "Cita": "30/03/2021",
        "Numero_empresa": "5589453164",
        "Numero_contacto": "5556456456",
        "Ciudad": "CIUDAD DE MEXICO",
        "Municipio": "MÉXICO D.F.",
        "Colonia": "LORETO Y CAMPAMENTO",
        "Cp": "04510",
        "Direcccion_completa": "CIUDAD DE MEXICO, MÉXICO D.F., LORETO Y CAMPAMENTO, SUR, CP:04510",
        "Dias_retrazo": "#f50400",
        "Confirmada": "0",
        "Id_intervencion": "48",
        "Id_tipo_ot": "1",
        "Letra_intervencion": "I",
        "Turno": "VESPERTINO",
        "Id_os_sf": "a0iQ000000Br6Q9IAJ",
        "Color": "#C1CF00",
        "intervencion": "INSTALACIÓN"
    },
    {
        "Id_ot": "64970",
        "Id_os": "OS-24149",
        "Cliente": "TESTQAA  ANGIE CLUSTERPLAZADIFERENTE 12062019-",
        "Numero_cuenta": "0210008028",
        "Paquete_instalar": "PLAN EMPRESA 50 MBPS PREMIUM",
        "Ticket_sf": "NA",
        "Num_tickets": "0",
        "Cita": "30/03/2021",
        "Numero_empresa": "5555454565",
        "Numero_contacto": "5567899008",
        "Ciudad": "CIUDAD DE MEXICO",
        "Municipio": "CIUDAD DE MÉXICO",
        "Colonia": "JARDINES DEL PEDREGAL",
        "Cp": "01900",
        "Direcccion_completa": "CIUDAD DE MEXICO, CIUDAD DE MÉXICO, JARDINES DEL PEDREGAL, SUR, CP:01900",
        "Dias_retrazo": "#f50400",
        "Confirmada": "0",
        "Id_intervencion": "48",
        "Id_tipo_ot": "1",
        "Letra_intervencion": "I",
        "Turno": "VESPERTINO",
        "Id_os_sf": "a0iQ000000BqXOZIA3",
        "Color": "#C1CF00",
        "intervencion": "INSTALACIÓN"
    },
    {
        "Id_ot": "65167",
        "Id_os": "OS-24712",
        "Cliente": "TESTQAA  AT APROVISIONAMIENTOUNIVERSAL18 12062019-",
        "Numero_cuenta": "0210008709",
        "Paquete_instalar": "INTERNET DEDICADO EMPRESARIAL 50 MB.",
        "Ticket_sf": "NA",
        "Num_tickets": "0",
        "Cita": "30/03/2021",
        "Numero_empresa": "5555454565",
        "Numero_contacto": "5557654325",
        "Ciudad": "CIUDAD DE MEXICO",
        "Municipio": "CIUDAD DE MÉXICO",
        "Colonia": "JARDINES DEL PEDREGAL",
        "Cp": "01900",
        "Direcccion_completa": "CIUDAD DE MEXICO, CIUDAD DE MÉXICO, JARDINES DEL PEDREGAL, SUR, CP:01900",
        "Dias_retrazo": "#f50400",
        "Confirmada": "0",
        "Id_intervencion": "48",
        "Id_tipo_ot": "1",
        "Letra_intervencion": "I",
        "Turno": "MATUTINO",
        "Id_os_sf": "a0iQ000000BqYkgIAF",
        "Color": "#C1CF00",
        "intervencion": "INSTALACIÓN"
    },
    {
        "Id_ot": "65207",
        "Id_os": "OS-24740",
        "Cliente": "MINISO S.A. DE C.V.-",
        "Numero_cuenta": "0210008297",
        "Paquete_instalar": "RED IP 2 MBPS MICROONDAS PMP.",
        "Ticket_sf": "NA",
        "Num_tickets": "0",
        "Cita": "30/03/2021",
        "Numero_empresa": "5557788988",
        "Numero_contacto": "1234567898",
        "Ciudad": "CIUDAD DE MEXICO",
        "Municipio": "CIUDAD DE MÉXICO",
        "Colonia": "GRANJAS PALO ALTO",
        "Cp": "05110",
        "Direcccion_completa": "CIUDAD DE MEXICO, CIUDAD DE MÉXICO, GRANJAS PALO ALTO, SUR, CP:05110",
        "Dias_retrazo": "#f50400",
        "Confirmada": "0",
        "Id_intervencion": "48",
        "Id_tipo_ot": "1",
        "Letra_intervencion": "I",
        "Turno": "MATUTINO",
        "Id_os_sf": "a0iQ000000BqYuMIAV",
        "Color": "#C1CF00",
        "intervencion": "INSTALACIÓN"
    },
    {
        "Id_ot": "65217",
        "Id_os": "OS-24753",
        "Cliente": "TESTQA APROVICIONAMIENTO 18102019-",
        "Numero_cuenta": "0210008508",
        "Paquete_instalar": "SDN LAN TO LAN 10 MBPS.",
        "Ticket_sf": "NA",
        "Num_tickets": "0",
        "Cita": "30/03/2021",
        "Numero_empresa": "5598765432",
        "Numero_contacto": "5544564564",
        "Ciudad": "CIUDAD DE MEXICO",
        "Municipio": "CIUDAD DE MÉXICO",
        "Colonia": "LA OTRA BANDA",
        "Cp": "04510",
        "Direcccion_completa": "CIUDAD DE MEXICO, CIUDAD DE MÉXICO, LA OTRA BANDA, SUR, CP:04510",
        "Dias_retrazo": "#f50400",
        "Confirmada": "1",
        "Id_intervencion": "48",
        "Id_tipo_ot": "1",
        "Letra_intervencion": "I",
        "Turno": "MATUTINO",
        "Id_os_sf": "a0iQ000000BqYvoIAF",
        "Color": "#C1CF00",
        "intervencion": "INSTALACIÓN"
    },
    {
        "Id_ot": "65218",
        "Id_os": "OS-24754",
        "Cliente": "TESTQA APROVICIONAMIENTO 18102019-",
        "Numero_cuenta": "0210008510",
        "Paquete_instalar": "SDN RED IP 10 MBPS.",
        "Ticket_sf": "NA",
        "Num_tickets": "0",
        "Cita": "30/03/2021",
        "Numero_empresa": "5598765432",
        "Numero_contacto": "5544564564",
        "Ciudad": "CIUDAD DE MEXICO",
        "Municipio": "CIUDAD DE MÉXICO",
        "Colonia": "LA OTRA BANDA",
        "Cp": "04510",
        "Direcccion_completa": "CIUDAD DE MEXICO, CIUDAD DE MÉXICO, LA OTRA BANDA, SUR, CP:04510",
        "Dias_retrazo": "#f50400",
        "Confirmada": "1",
        "Id_intervencion": "48",
        "Id_tipo_ot": "1",
        "Letra_intervencion": "I",
        "Turno": "MATUTINO",
        "Id_os_sf": "a0iQ000000BqYvtIAF",
        "Color": "#C1CF00",
        "intervencion": "INSTALACIÓN"
    },
    {
        "Id_ot": "65219",
        "Id_os": "OS-24755",
        "Cliente": "TESTQA APROVICIONAMIENTO 18102019-",
        "Numero_cuenta": "0210008511",
        "Paquete_instalar": "INTERNET 200 CON VOZ SIP 6 TRONCALES Y CONMUTADOR (A)",
        "Ticket_sf": "NA",
        "Num_tickets": "0",
        "Cita": "30/03/2021",
        "Numero_empresa": "5598765432",
        "Numero_contacto": "5544564564",
        "Ciudad": "CIUDAD DE MEXICO",
        "Municipio": "CIUDAD DE MÉXICO",
        "Colonia": "LA OTRA BANDA",
        "Cp": "04510",
        "Direcccion_completa": "CIUDAD DE MEXICO, CIUDAD DE MÉXICO, LA OTRA BANDA, SUR, CP:04510",
        "Dias_retrazo": "#f50400",
        "Confirmada": "1",
        "Id_intervencion": "48",
        "Id_tipo_ot": "1",
        "Letra_intervencion": "I",
        "Turno": "MATUTINO",
        "Id_os_sf": "a0iQ000000BqYvyIAF",
        "Color": "#C1CF00",
        "intervencion": "INSTALACIÓN"
    },
    {
        "Id_ot": "65224",
        "Id_os": "OS-24759",
        "Cliente": "MINISO S.A. DE C.V.-",
        "Numero_cuenta": "0210008447",
        "Paquete_instalar": "PLAN EMPRESA 50 MBPS",
        "Ticket_sf": "NA",
        "Num_tickets": "0",
        "Cita": "30/03/2021",
        "Numero_empresa": "5557788988",
        "Numero_contacto": "1234567898",
        "Ciudad": "CIUDAD DE MEXICO",
        "Municipio": "CIUDAD DE MÉXICO",
        "Colonia": "SAN ÁNGEL",
        "Cp": "01000",
        "Direcccion_completa": "CIUDAD DE MEXICO, CIUDAD DE MÉXICO, SAN ÁNGEL, SUR, CP:01000",
        "Dias_retrazo": "#f50400",
        "Confirmada": "0",
        "Id_intervencion": "48",
        "Id_tipo_ot": "1",
        "Letra_intervencion": "I",
        "Turno": "VESPERTINO",
        "Id_os_sf": "a0iQ000000BqYwSIAV",
        "Color": "#C1CF00",
        "intervencion": "INSTALACIÓN"
    },
    {
        "Id_ot": "65392",
        "Id_os": "OS-24956",
        "Cliente": "PRUEBAS BANDEJAS INFRAESTRUCTURA-",
        "Numero_cuenta": "0210008917",
        "Paquete_instalar": "INTERNET SIMETRICO 10 MBPS MICROONDAS PMP.",
        "Ticket_sf": "NA",
        "Num_tickets": "0",
        "Cita": "30/03/2021",
        "Numero_empresa": "5545655655",
        "Numero_contacto": "8822449944",
        "Ciudad": "CIUDAD DE MEXICO",
        "Municipio": "CIUDAD DE MÉXICO",
        "Colonia": "SAN JERÓNIMO LÍDICE",
        "Cp": "10200",
        "Direcccion_completa": "CIUDAD DE MEXICO, CIUDAD DE MÉXICO, SAN JERÓNIMO LÍDICE, SUR, CP:10200",
        "Dias_retrazo": "#f50400",
        "Confirmada": "0",
        "Id_intervencion": "48",
        "Id_tipo_ot": "1",
        "Letra_intervencion": "I",
        "Turno": "VESPERTINO",
        "Id_os_sf": "a0iQ000000BqaaqIAB",
        "Color": "#C1CF00",
        "intervencion": "INSTALACIÓN"
    },
    {
        "Id_ot": "65750",
        "Id_os": "OS-25572",
        "Cliente": "METRO CDMX-L7",
        "Numero_cuenta": "0210009470",
        "Paquete_instalar": "INTERNET 20/20",
        "Ticket_sf": "NA",
        "Num_tickets": "0",
        "Cita": "30/03/2021",
        "Numero_empresa": "5557788988",
        "Numero_contacto": "5557788988",
        "Ciudad": "CIUDAD DE MEXICO",
        "Municipio": "CIUDAD DE MÉXICO",
        "Colonia": "BOSQUE DE CHAPULTEPEC I SECCIÓN",
        "Cp": "11100",
        "Direcccion_completa": "CIUDAD DE MEXICO, CIUDAD DE MÉXICO, BOSQUE DE CHAPULTEPEC I SECCIÓN, SUR, CP:11100",
        "Dias_retrazo": "#f50400",
        "Confirmada": "0",
        "Id_intervencion": "48",
        "Id_tipo_ot": "1",
        "Letra_intervencion": "I",
        "Turno": "VESPERTINO",
        "Id_os_sf": "a0iQ000000Br0GTIAZ",
        "Color": "#C1CF00",
        "intervencion": "INSTALACIÓN"
    },
    {
        "Id_ot": "65708",
        "Id_os": "OS-25484",
        "Cliente": "MARCO L I-",
        "Numero_cuenta": "0210010142",
        "Paquete_instalar": "INTERNET 30/30 E2",
        "Ticket_sf": "NA",
        "Num_tickets": "0",
        "Cita": "30/03/2021",
        "Numero_empresa": "5569688423",
        "Numero_contacto": "5569688423",
        "Ciudad": "CIUDAD DE MEXICO",
        "Municipio": "CIUDAD DE MÉXICO",
        "Colonia": "LA OTRA BANDA",
        "Cp": "04510",
        "Direcccion_completa": "CIUDAD DE MEXICO, CIUDAD DE MÉXICO, LA OTRA BANDA, SUR, CP:04510",
        "Dias_retrazo": "#f50400",
        "Confirmada": "0",
        "Id_intervencion": "48",
        "Id_tipo_ot": "1",
        "Letra_intervencion": "I",
        "Turno": "MATUTINO",
        "Id_os_sf": "a0iQ000000BuwSTIAZ",
        "Color": "#C1CF00",
        "intervencion": "INSTALACIÓN"
    },
    {
        "Id_ot": "65727",
        "Id_os": "OS-25521",
        "Cliente": "NUEVAS BANDEJAS ENERO-",
        "Numero_cuenta": "0210009957",
        "Paquete_instalar": "INTERNET DEDICADO 10 MBPS MICROONDAS PMP.",
        "Ticket_sf": "NA",
        "Num_tickets": "0",
        "Cita": "30/03/2021",
        "Numero_empresa": "5545655655",
        "Numero_contacto": "5557788988",
        "Ciudad": "CIUDAD DE MEXICO",
        "Municipio": "CIUDAD DE MÉXICO",
        "Colonia": "SACRAMENTO",
        "Cp": "01420",
        "Direcccion_completa": "CIUDAD DE MEXICO, CIUDAD DE MÉXICO, SACRAMENTO, SUR, CP:01420",
        "Dias_retrazo": "#f50400",
        "Confirmada": "0",
        "Id_intervencion": "48",
        "Id_tipo_ot": "1",
        "Letra_intervencion": "I",
        "Turno": "MATUTINO",
        "Id_os_sf": "a0iQ000000BqzsWIAR",
        "Color": "#C1CF00",
        "intervencion": "INSTALACIÓN"
    },
    {
        "Id_ot": "65245",
        "Id_os": "OS-24790",
        "Cliente": "MINISO S.A. DE C.V.-",
        "Numero_cuenta": "0210008379",
        "Paquete_instalar": "LAN TO LAN 10 MBPS MICROONDAS PMP.",
        "Ticket_sf": "NA",
        "Num_tickets": "0",
        "Cita": "30/03/2021",
        "Numero_empresa": "5557788988",
        "Numero_contacto": "1234567898",
        "Ciudad": "CIUDAD DE MEXICO",
        "Municipio": "CIUDAD DE MÉXICO",
        "Colonia": "INSURGENTES CUICUILCO",
        "Cp": "04530",
        "Direcccion_completa": "CIUDAD DE MEXICO, CIUDAD DE MÉXICO, INSURGENTES CUICUILCO, SUR, CP:04530",
        "Dias_retrazo": "#f50400",
        "Confirmada": "0",
        "Id_intervencion": "48",
        "Id_tipo_ot": "1",
        "Letra_intervencion": "I",
        "Turno": "VESPERTINO",
        "Id_os_sf": "a0iQ000000BqZBAIA3",
        "Color": "#C1CF00",
        "intervencion": "INSTALACIÓN"
    },
    {
        "Id_ot": "65254",
        "Id_os": "OS-24803",
        "Cliente": "PRUEBAS BANDEJAS INFRAESTRUCTURA-",
        "Numero_cuenta": "0210008897",
        "Paquete_instalar": "LAN TO LAN 50 MBPS MICROONDAS PTP V2.",
        "Ticket_sf": "NA",
        "Num_tickets": "0",
        "Cita": "30/03/2021",
        "Numero_empresa": "5545655655",
        "Numero_contacto": "8822449944",
        "Ciudad": "CIUDAD DE MEXICO",
        "Municipio": "CIUDAD DE MÉXICO",
        "Colonia": "HÉROES DE PADIERNA",
        "Cp": "10700",
        "Direcccion_completa": "CIUDAD DE MEXICO, CIUDAD DE MÉXICO, HÉROES DE PADIERNA, SUR, CP:10700",
        "Dias_retrazo": "#f50400",
        "Confirmada": "0",
        "Id_intervencion": "48",
        "Id_tipo_ot": "1",
        "Letra_intervencion": "I",
        "Turno": "VESPERTINO",
        "Id_os_sf": "a0iQ000000BqZdeIAF",
        "Color": "#C1CF00",
        "intervencion": "INSTALACIÓN"
    },
    {
        "Id_ot": "65851",
        "Id_os": "OS-25692",
        "Cliente": "TESTQAA  ALAN TIPIFICACIONOTS 12062019-",
        "Numero_cuenta": "0210010369",
        "Paquete_instalar": "INTERNET 50 D",
        "Ticket_sf": "NA",
        "Num_tickets": "0",
        "Cita": "30/03/2021",
        "Numero_empresa": "5555454565",
        "Numero_contacto": "5523121321",
        "Ciudad": "CIUDAD DE MEXICO",
        "Municipio": "CIUDAD DE MÉXICO",
        "Colonia": "LORETO Y CAMPAMENTO",
        "Cp": "04510",
        "Direcccion_completa": "CIUDAD DE MEXICO, CIUDAD DE MÉXICO, LORETO Y CAMPAMENTO, SUR, CP:04510",
        "Dias_retrazo": "#f50400",
        "Confirmada": "0",
        "Id_intervencion": "48",
        "Id_tipo_ot": "1",
        "Letra_intervencion": "I",
        "Turno": "VESPERTINO",
        "Id_os_sf": "a0iQ000000Br37AIAR",
        "Color": "#C1CF00",
        "intervencion": "INSTALACIÓN"
    },
    {
        "Id_ot": "65840",
        "Id_os": "OS-25675",
        "Cliente": "PRUEBAS DETENCIONES FEBRERO-",
        "Numero_cuenta": "0210010227",
        "Paquete_instalar": "PLAN EMPRESA 50/50 MBPS TE.",
        "Ticket_sf": "NA",
        "Num_tickets": "0",
        "Cita": "30/03/2021",
        "Numero_empresa": "5545655655",
        "Numero_contacto": "1234567898",
        "Ciudad": "CIUDAD DE MEXICO",
        "Municipio": "CIUDAD DE MÉXICO",
        "Colonia": "LORETO Y CAMPAMENTO",
        "Cp": "01090",
        "Direcccion_completa": "CIUDAD DE MEXICO, CIUDAD DE MÉXICO, LORETO Y CAMPAMENTO, SUR, CP:01090",
        "Dias_retrazo": "#f50400",
        "Confirmada": "0",
        "Id_intervencion": "48",
        "Id_tipo_ot": "1",
        "Letra_intervencion": "I",
        "Turno": "VESPERTINO",
        "Id_os_sf": "a0iQ000000Br2zNIAR",
        "Color": "#C1CF00",
        "intervencion": "INSTALACIÓN"
    },
    {
        "Id_ot": "64905",
        "Id_os": "OS-22424",
        "Cliente": "TESTQAA  JOSSAUTO AUTOMATIZANDO 12062019-",
        "Numero_cuenta": "0210007722",
        "Paquete_instalar": "INTERNET 3 E",
        "Ticket_sf": "NA",
        "Num_tickets": "0",
        "Cita": "30/03/2021",
        "Numero_empresa": "5555454565",
        "Numero_contacto": "5555555598",
        "Ciudad": "CIUDAD DE MEXICO",
        "Municipio": "CIUDAD DE MÉXICO",
        "Colonia": "JARDINES DEL PEDREGAL",
        "Cp": "01900",
        "Direcccion_completa": "CIUDAD DE MEXICO, CIUDAD DE MÉXICO, JARDINES DEL PEDREGAL, SUR, CP:01900",
        "Dias_retrazo": "#f50400",
        "Confirmada": "0",
        "Id_intervencion": "48",
        "Id_tipo_ot": "1",
        "Letra_intervencion": "I",
        "Turno": "VESPERTINO",
        "Id_os_sf": "a0iQ000000BqVxqIAF",
        "Color": "#C1CF00",
        "intervencion": "INSTALACIÓN"
    },
    {
        "Id_ot": "65387",
        "Id_os": "OS-24951",
        "Cliente": "PRUEBAS BANDEJAS INFRAESTRUCTURA-",
        "Numero_cuenta": "0210008918",
        "Paquete_instalar": "INTERNET SIMETRICO 10 MBPS MICROONDAS PMP.",
        "Ticket_sf": "NA",
        "Num_tickets": "0",
        "Cita": "30/03/2021",
        "Numero_empresa": "5545655655",
        "Numero_contacto": "8822449944",
        "Ciudad": "CIUDAD DE MEXICO",
        "Municipio": "CIUDAD DE MÉXICO",
        "Colonia": "SAN JERÓNIMO LÍDICE",
        "Cp": "10200",
        "Direcccion_completa": "CIUDAD DE MEXICO, CIUDAD DE MÉXICO, SAN JERÓNIMO LÍDICE, SUR, CP:10200",
        "Dias_retrazo": "#f50400",
        "Confirmada": "0",
        "Id_intervencion": "48",
        "Id_tipo_ot": "1",
        "Letra_intervencion": "I",
        "Turno": "VESPERTINO",
        "Id_os_sf": "a0iQ000000BqaZJIAZ",
        "Color": "#C1CF00",
        "intervencion": "INSTALACIÓN"
    },
    {
        "Id_ot": "65787",
        "Id_os": "OS-25585",
        "Cliente": "METRO CDMX-L7",
        "Numero_cuenta": "0210009483",
        "Paquete_instalar": "INTERNET DEDICADO 50 MBPS MICROONDAS PTP V2.",
        "Ticket_sf": "NA",
        "Num_tickets": "0",
        "Cita": "30/03/2021",
        "Numero_empresa": "5557788988",
        "Numero_contacto": "5557788988",
        "Ciudad": "CIUDAD DE MEXICO",
        "Municipio": "CIUDAD DE MÉXICO",
        "Colonia": "BOSQUE DE CHAPULTEPEC I SECCIÓN",
        "Cp": "11100",
        "Direcccion_completa": "CIUDAD DE MEXICO, CIUDAD DE MÉXICO, BOSQUE DE CHAPULTEPEC I SECCIÓN, SUR, CP:11100",
        "Dias_retrazo": "#f50400",
        "Confirmada": "0",
        "Id_intervencion": "48",
        "Id_tipo_ot": "1",
        "Letra_intervencion": "I",
        "Turno": "VESPERTINO",
        "Id_os_sf": "a0iQ000000Br1KjIAJ",
        "Color": "#C1CF00",
        "intervencion": "INSTALACIÓN"
    },
    {
        "Id_ot": "64988",
        "Id_os": "OS-24187",
        "Cliente": "NULL",
        "Numero_cuenta": "0210007477",
        "Paquete_instalar": "SOPORTE EN SITIO",
        "Ticket_sf": "NA",
        "Num_tickets": "0",
        "Cita": "30/03/2021",
        "Numero_empresa": "5566778822",
        "Numero_contacto": "8822449944",
        "Ciudad": "CIUDAD DE MEXICO",
        "Municipio": "CIUDAD DE MÉXICO",
        "Colonia": "LORETO Y CAMPAMENTO",
        "Cp": "01090",
        "Direcccion_completa": "CIUDAD DE MEXICO, CIUDAD DE MÉXICO, LORETO Y CAMPAMENTO, SUR, CP:01090",
        "Dias_retrazo": "#f50400",
        "Confirmada": "0",
        "Id_intervencion": "112",
        "Id_tipo_ot": "1",
        "Letra_intervencion": "S",
        "Turno": "MATUTINO",
        "Id_os_sf": "a0iQ000000BqXWYIA3",
        "Color": "#c88624",
        "intervencion": "SOPORTE DE MANTENIMIENTO"
    },
    {
        "Id_ot": "65314",
        "Id_os": "OS-24886",
        "Cliente": "TESTQAA  AT ALTAIPFIJA2 12062019-",
        "Numero_cuenta": "0210009023",
        "Paquete_instalar": "SDN RED IP 20 MBPS.",
        "Ticket_sf": "NA",
        "Num_tickets": "0",
        "Cita": "30/03/2021",
        "Numero_empresa": "5555454565",
        "Numero_contacto": "8765434567",
        "Ciudad": "CIUDAD DE MEXICO",
        "Municipio": "CIUDAD DE MÉXICO",
        "Colonia": "JARDINES DEL PEDREGAL",
        "Cp": "01900",
        "Direcccion_completa": "CIUDAD DE MEXICO, CIUDAD DE MÉXICO, JARDINES DEL PEDREGAL, SUR, CP:01900",
        "Dias_retrazo": "#f50400",
        "Confirmada": "0",
        "Id_intervencion": "48",
        "Id_tipo_ot": "1",
        "Letra_intervencion": "I",
        "Turno": "VESPERTINO",
        "Id_os_sf": "a0iQ000000Bqa5OIAR",
        "Color": "#C1CF00",
        "intervencion": "INSTALACIÓN"
    },
    {
        "Id_ot": "65395",
        "Id_os": "OS-24959",
        "Cliente": "PRUEBAS BANDEJAS INFRAESTRUCTURA-",
        "Numero_cuenta": "0210008920",
        "Paquete_instalar": "PLAN EMPRESA 50 MBPS",
        "Ticket_sf": "NA",
        "Num_tickets": "0",
        "Cita": "30/03/2021",
        "Numero_empresa": "5545655655",
        "Numero_contacto": "8822449944",
        "Ciudad": "CIUDAD DE MEXICO",
        "Municipio": "CIUDAD DE MÉXICO",
        "Colonia": "SAN JERÓNIMO LÍDICE",
        "Cp": "10200",
        "Direcccion_completa": "CIUDAD DE MEXICO, CIUDAD DE MÉXICO, SAN JERÓNIMO LÍDICE, SUR, CP:10200",
        "Dias_retrazo": "#f50400",
        "Confirmada": "0",
        "Id_intervencion": "48",
        "Id_tipo_ot": "1",
        "Letra_intervencion": "I",
        "Turno": "VESPERTINO",
        "Id_os_sf": "a0iQ000000Bqab5IAB",
        "Color": "#C1CF00",
        "intervencion": "INSTALACIÓN"
    },
    {
        "Id_ot": "65880",
        "Id_os": "OS-25737",
        "Cliente": "AQUAMATIC LAVANDERIA",
        "Numero_cuenta": "0210005494",
        "Paquete_instalar": "INTERNET 200 D",
        "Ticket_sf": "NA",
        "Num_tickets": "0",
        "Cita": "30/03/2021",
        "Numero_empresa": "5588774455",
        "Numero_contacto": "5544778855",
        "Ciudad": "CIUDAD DE MEXICO",
        "Municipio": "TLALPAN",
        "Colonia": "FUENTES DEL PEDREGAL",
        "Cp": "14140",
        "Direcccion_completa": "CIUDAD DE MEXICO, TLALPAN, FUENTES DEL PEDREGAL, SUR, CP:14140",
        "Dias_retrazo": "#f50400",
        "Confirmada": "0",
        "Id_intervencion": "48",
        "Id_tipo_ot": "1",
        "Letra_intervencion": "I",
        "Turno": "MATUTINO",
        "Id_os_sf": "a0iQ000000BlfwtIAB",
        "Color": "#C1CF00",
        "intervencion": "INSTALACIÓN"
    },
    {
        "Id_ot": "65812",
        "Id_os": "OS-25610",
        "Cliente": "PRUEBAS DETENCIONES FEBRERO-",
        "Numero_cuenta": "0210010229",
        "Paquete_instalar": "INTERNET 20/20",
        "Ticket_sf": "NA",
        "Num_tickets": "0",
        "Cita": "30/03/2021",
        "Numero_empresa": "5545655655",
        "Numero_contacto": "1234567898",
        "Ciudad": "CIUDAD DE MEXICO",
        "Municipio": "CIUDAD DE MÉXICO",
        "Colonia": "LORETO Y CAMPAMENTO",
        "Cp": "01090",
        "Direcccion_completa": "CIUDAD DE MEXICO, CIUDAD DE MÉXICO, LORETO Y CAMPAMENTO, SUR, CP:01090",
        "Dias_retrazo": "#f50400",
        "Confirmada": "0",
        "Id_intervencion": "48",
        "Id_tipo_ot": "1",
        "Letra_intervencion": "I",
        "Turno": "VESPERTINO",
        "Id_os_sf": "a0iQ000000Br21cIAB",
        "Color": "#C1CF00",
        "intervencion": "INSTALACIÓN"
    },
    {
        "Id_ot": "64953",
        "Id_os": "OS-23737",
        "Cliente": "TESTQA ANGIE VALIDACIÓN  20092019-",
        "Numero_cuenta": "0210007985",
        "Paquete_instalar": "MICRO 40.",
        "Ticket_sf": "NA",
        "Num_tickets": "0",
        "Cita": "30/03/2021",
        "Numero_empresa": "5555564564",
        "Numero_contacto": "5555564563",
        "Ciudad": "CIUDAD DE MEXICO",
        "Municipio": "EMILIANO ZAPATA",
        "Colonia": "EMILIANO ZAPATA",
        "Cp": "56550",
        "Direcccion_completa": "CIUDAD DE MEXICO, EMILIANO ZAPATA, EMILIANO ZAPATA, SUR, CP:56550",
        "Dias_retrazo": "#f50400",
        "Confirmada": "1",
        "Id_intervencion": "48",
        "Id_tipo_ot": "1",
        "Letra_intervencion": "I",
        "Turno": "VESPERTINO",
        "Id_os_sf": "a0iQ000000BqX1uIAF",
        "Color": "#C1CF00",
        "intervencion": "INSTALACIÓN"
    },
    {
        "Id_ot": "65233",
        "Id_os": "OS-24772",
        "Cliente": "FFM FLUJOS",
        "Numero_cuenta": "0210008862",
        "Paquete_instalar": "INTERNET DEDICADO EMPRESARIAL 50 MB.",
        "Ticket_sf": "NA",
        "Num_tickets": "0",
        "Cita": "30/03/2021",
        "Numero_empresa": "5555555559",
        "Numero_contacto": "5555656532",
        "Ciudad": "CIUDAD DE MEXICO",
        "Municipio": "CIUDAD DE MÉXICO",
        "Colonia": "LORETO Y CAMPAMENTO",
        "Cp": "01090",
        "Direcccion_completa": "CIUDAD DE MEXICO, CIUDAD DE MÉXICO, LORETO Y CAMPAMENTO, SUR, CP:01090",
        "Dias_retrazo": "#f50400",
        "Confirmada": "0",
        "Id_intervencion": "48",
        "Id_tipo_ot": "1",
        "Letra_intervencion": "I",
        "Turno": "MATUTINO",
        "Id_os_sf": "a0iQ000000BqZ50IAF",
        "Color": "#C1CF00",
        "intervencion": "INSTALACIÓN"
    },
    {
        "Id_ot": "66347",
        "Id_os": "OS-26854",
        "Cliente": "TESTER JUAN CARLOS QA PRUEBA  11/06/2020-",
        "Numero_cuenta": "0210012582",
        "Paquete_instalar": "INTERNET DEDICADO 10_MBPS.",
        "Ticket_sf": "NA",
        "Num_tickets": "0",
        "Cita": "30/03/2021",
        "Numero_empresa": "5582165897",
        "Numero_contacto": "5582196581",
        "Ciudad": "CIUDAD DE MEXICO",
        "Municipio": "IXTAPALUCA",
        "Colonia": "VALLE VERDE",
        "Cp": "56563",
        "Direcccion_completa": "CIUDAD DE MEXICO, IXTAPALUCA, VALLE VERDE, SUR, CP:56563",
        "Dias_retrazo": "#f50400",
        "Confirmada": "0",
        "Id_intervencion": "48",
        "Id_tipo_ot": "1",
        "Letra_intervencion": "I",
        "Turno": "VESPERTINO",
        "Id_os_sf": "a0iQ000000Bv3JAIAZ",
        "Color": "#C1CF00",
        "intervencion": "INSTALACIÓN"
    },
    {
        "Id_ot": "65328",
        "Id_os": "OS-24782",
        "Cliente": "PRUEBA ATA S WIFI",
        "Numero_cuenta": "0110009236",
        "Paquete_instalar": "MICRO 40 DOBLE PLAY V4",
        "Ticket_sf": "NA",
        "Num_tickets": "0",
        "Cita": "30/03/2021",
        "Numero_empresa": "5566223311",
        "Numero_contacto": "5564738322",
        "Ciudad": "CIUDAD DE MEXICO",
        "Municipio": "TLALPAN",
        "Colonia": "FUENTES DEL PEDREGAL",
        "Cp": "14141",
        "Direcccion_completa": "CIUDAD DE MEXICO, TLALPAN, FUENTES DEL PEDREGAL, SUR, CP:14141",
        "Dias_retrazo": "#f50400",
        "Confirmada": "0",
        "Id_intervencion": "163",
        "Id_tipo_ot": "1",
        "Letra_intervencion": "I",
        "Turno": "VESPERTINO",
        "Id_os_sf": "a0iQ000000BqZAyIAN",
        "Color": "#404AF4",
        "intervencion": "IMPLEMENTACION"
    },
    {
        "Id_ot": "64920",
        "Id_os": "OS-22444",
        "Cliente": "TESTQAA  ANGIE ASIGAUTO2 12062019-",
        "Numero_cuenta": "0210007813",
        "Paquete_instalar": "INTERNET 200 CON VOZ SIP 4 TRONCALES Y CONMUTADOR (T).",
        "Ticket_sf": "NA",
        "Num_tickets": "0",
        "Cita": "30/03/2021",
        "Numero_empresa": "5555454565",
        "Numero_contacto": "5523498707",
        "Ciudad": "CIUDAD DE MEXICO",
        "Municipio": "EMILIANO ZAPATA",
        "Colonia": "EMILIANO ZAPATA",
        "Cp": "56550",
        "Direcccion_completa": "CIUDAD DE MEXICO, EMILIANO ZAPATA, EMILIANO ZAPATA, SUR, CP:56550",
        "Dias_retrazo": "#f50400",
        "Confirmada": "0",
        "Id_intervencion": "48",
        "Id_tipo_ot": "1",
        "Letra_intervencion": "I",
        "Turno": "VESPERTINO",
        "Id_os_sf": "a0iQ000000BqW64IAF",
        "Color": "#C1CF00",
        "intervencion": "INSTALACIÓN"
    },
    {
        "Id_ot": "65312",
        "Id_os": "OS-24884",
        "Cliente": "TESTQAA  AT ALTAIPFIJA2 12062019-",
        "Numero_cuenta": "0210009021",
        "Paquete_instalar": "SDN RED IP 8 MBPS.",
        "Ticket_sf": "NA",
        "Num_tickets": "0",
        "Cita": "30/03/2021",
        "Numero_empresa": "5555454565",
        "Numero_contacto": "8765434567",
        "Ciudad": "CIUDAD DE MEXICO",
        "Municipio": "CIUDAD DE MÉXICO",
        "Colonia": "JARDINES DEL PEDREGAL",
        "Cp": "01900",
        "Direcccion_completa": "CIUDAD DE MEXICO, CIUDAD DE MÉXICO, JARDINES DEL PEDREGAL, SUR, CP:01900",
        "Dias_retrazo": "#f50400",
        "Confirmada": "0",
        "Id_intervencion": "48",
        "Id_tipo_ot": "1",
        "Letra_intervencion": "I",
        "Turno": "VESPERTINO",
        "Id_os_sf": "a0iQ000000Bqa5EIAR",
        "Color": "#C1CF00",
        "intervencion": "INSTALACIÓN"
    },
    {
        "Id_ot": "65313",
        "Id_os": "OS-24885",
        "Cliente": "TESTQAA  AT ALTAIPFIJA2 12062019-",
        "Numero_cuenta": "0210009022",
        "Paquete_instalar": "SDN RED IP 10 MBPS.",
        "Ticket_sf": "NA",
        "Num_tickets": "0",
        "Cita": "30/03/2021",
        "Numero_empresa": "5555454565",
        "Numero_contacto": "8765434567",
        "Ciudad": "CIUDAD DE MEXICO",
        "Municipio": "CIUDAD DE MÉXICO",
        "Colonia": "JARDINES DEL PEDREGAL",
        "Cp": "01900",
        "Direcccion_completa": "CIUDAD DE MEXICO, CIUDAD DE MÉXICO, JARDINES DEL PEDREGAL, SUR, CP:01900",
        "Dias_retrazo": "#f50400",
        "Confirmada": "0",
        "Id_intervencion": "48",
        "Id_tipo_ot": "1",
        "Letra_intervencion": "I",
        "Turno": "VESPERTINO",
        "Id_os_sf": "a0iQ000000Bqa5JIAR",
        "Color": "#C1CF00",
        "intervencion": "INSTALACIÓN"
    },
    {
        "Id_ot": "65844",
        "Id_os": "OS-25684",
        "Cliente": "GUARADA OPPORTUNITY",
        "Numero_cuenta": "0210010343",
        "Paquete_instalar": "INTERNET DEDICADO 20 MBPS MICROONDAS PMP.",
        "Ticket_sf": "NA",
        "Num_tickets": "0",
        "Cita": "30/03/2021",
        "Numero_empresa": "5520202010",
        "Numero_contacto": "5556456456",
        "Ciudad": "CIUDAD DE MÉXICO",
        "Municipio": "CIUDAD DE MÉXICO",
        "Colonia": "CENTRO",
        "Cp": "06000",
        "Direcccion_completa": "CIUDAD DE MÉXICO, CIUDAD DE MÉXICO, CENTRO, SUR, CP:06000",
        "Dias_retrazo": "#f50400",
        "Confirmada": "0",
        "Id_intervencion": "48",
        "Id_tipo_ot": "1",
        "Letra_intervencion": "I",
        "Turno": "VESPERTINO",
        "Id_os_sf": "a0iQ000000Br30GIAR",
        "Color": "#C1CF00",
        "intervencion": "INSTALACIÓN"
    },
    {
        "Id_ot": "64893",
        "Id_os": "OS-19710",
        "Cliente": "TESTQAA  ANGY ASIGNACION 12062019-OP",
        "Numero_cuenta": "0210007575",
        "Paquete_instalar": "INTERNET 3 E",
        "Ticket_sf": "NA",
        "Num_tickets": "0",
        "Cita": "30/03/2021",
        "Numero_empresa": "5555454565",
        "Numero_contacto": "5555545545",
        "Ciudad": "CIUDAD DE MEXICO",
        "Municipio": "CIUDAD DE MÉXICO",
        "Colonia": "LORETO Y CAMPAMENTO",
        "Cp": "04510",
        "Direcccion_completa": "CIUDAD DE MEXICO, CIUDAD DE MÉXICO, LORETO Y CAMPAMENTO, SUR, CP:04510",
        "Dias_retrazo": "#f50400",
        "Confirmada": "0",
        "Id_intervencion": "48",
        "Id_tipo_ot": "1",
        "Letra_intervencion": "I",
        "Turno": "VESPERTINO",
        "Id_os_sf": "a0iQ000000BqUd1IAF",
        "Color": "#C1CF00",
        "intervencion": "INSTALACIÓN"
    },
    {
        "Id_ot": "64895",
        "Id_os": "OS-19712",
        "Cliente": "TESTQAA  ANGY ASIGNACION 12062019-OP",
        "Numero_cuenta": "0210007577",
        "Paquete_instalar": "INTERNET 3 E",
        "Ticket_sf": "NA",
        "Num_tickets": "0",
        "Cita": "30/03/2021",
        "Numero_empresa": "5555454565",
        "Numero_contacto": "5555545545",
        "Ciudad": "CIUDAD DE MEXICO",
        "Municipio": "CIUDAD DE MÉXICO",
        "Colonia": "LORETO Y CAMPAMENTO",
        "Cp": "04510",
        "Direcccion_completa": "CIUDAD DE MEXICO, CIUDAD DE MÉXICO, LORETO Y CAMPAMENTO, SUR, CP:04510",
        "Dias_retrazo": "#f50400",
        "Confirmada": "0",
        "Id_intervencion": "48",
        "Id_tipo_ot": "1",
        "Letra_intervencion": "I",
        "Turno": "VESPERTINO",
        "Id_os_sf": "a0iQ000000BqUdBIAV",
        "Color": "#C1CF00",
        "intervencion": "INSTALACIÓN"
    },
    {
        "Id_ot": "65342",
        "Id_os": "OS-24926",
        "Cliente": "TEST PARA IP FIJA",
        "Numero_cuenta": "0210009151",
        "Paquete_instalar": "INTERNET DEDICADO 10_MBPS.",
        "Ticket_sf": "NA",
        "Num_tickets": "0",
        "Cita": "30/03/2021",
        "Numero_empresa": "5555555559",
        "Numero_contacto": "5555656532",
        "Ciudad": "CIUDAD DE MEXICO",
        "Municipio": "CIUDAD DE MÉXICO",
        "Colonia": "LA OTRA BANDA",
        "Cp": "04510",
        "Direcccion_completa": "CIUDAD DE MEXICO, CIUDAD DE MÉXICO, LA OTRA BANDA, SUR, CP:04510",
        "Dias_retrazo": "#f50400",
        "Confirmada": "0",
        "Id_intervencion": "48",
        "Id_tipo_ot": "1",
        "Letra_intervencion": "I",
        "Turno": "MATUTINO",
        "Id_os_sf": "a0iQ000000BqaJpIAJ",
        "Color": "#C1CF00",
        "intervencion": "INSTALACIÓN"
    },
    {
        "Id_ot": "66143",
        "Id_os": "OS-26401",
        "Cliente": "TACOS",
        "Numero_cuenta": "0210011340",
        "Paquete_instalar": "INTERNET DEDICADO EMPRESARIAL 150 MB.",
        "Ticket_sf": "00144387",
        "Num_tickets": "1",
        "Cita": "30/03/2021",
        "Numero_empresa": "5598756780",
        "Numero_contacto": "5598756780",
        "Ciudad": "CIUDAD DE MEXICO",
        "Municipio": "IXTAPALUCA",
        "Colonia": "VALLE VERDE",
        "Cp": "56563",
        "Direcccion_completa": "CIUDAD DE MEXICO, IXTAPALUCA, VALLE VERDE, SUR, CP:56563",
        "Dias_retrazo": "#f50400",
        "Confirmada": "0",
        "Id_intervencion": "55",
        "Id_tipo_ot": "1",
        "Letra_intervencion": "S",
        "Turno": "MATUTINO",
        "Id_os_sf": "a0iQ000000Br7RfIAJ",
        "Color": "#EA4C31",
        "intervencion": "SOPORTE"
    },
    {
        "Id_ot": "66329",
        "Id_os": "OS-26830",
        "Cliente": "ATA EN 3P01-",
        "Numero_cuenta": "0210012567",
        "Paquete_instalar": "PLAN EMPRESA 100 MBPS",
        "Ticket_sf": "NA",
        "Num_tickets": "0",
        "Cita": "30/03/2021",
        "Numero_empresa": "5583699698",
        "Numero_contacto": "5567890453",
        "Ciudad": "CIUDAD DE MEXICO",
        "Municipio": "CIUDAD DE MÉXICO",
        "Colonia": "JARDINES DEL PEDREGAL",
        "Cp": "01900",
        "Direcccion_completa": "CIUDAD DE MEXICO, CIUDAD DE MÉXICO, JARDINES DEL PEDREGAL, SUR, CP:01900",
        "Dias_retrazo": "#f50400",
        "Confirmada": "0",
        "Id_intervencion": "48",
        "Id_tipo_ot": "1",
        "Letra_intervencion": "I",
        "Turno": "MATUTINO",
        "Id_os_sf": "a0iQ000000Bv3EUIAZ",
        "Color": "#C1CF00",
        "intervencion": "INSTALACIÓN"
    },
    {
        "Id_ot": "65728",
        "Id_os": "OS-25522",
        "Cliente": "NUEVAS BANDEJAS ENERO-",
        "Numero_cuenta": "0210009958",
        "Paquete_instalar": "LAN TO LAN 10 MBPS MICROONDAS PMP.",
        "Ticket_sf": "NA",
        "Num_tickets": "0",
        "Cita": "30/03/2021",
        "Numero_empresa": "5545655655",
        "Numero_contacto": "5557788988",
        "Ciudad": "CIUDAD DE MEXICO",
        "Municipio": "CIUDAD DE MÉXICO",
        "Colonia": "SACRAMENTO",
        "Cp": "01420",
        "Direcccion_completa": "CIUDAD DE MEXICO, CIUDAD DE MÉXICO, SACRAMENTO, SUR, CP:01420",
        "Dias_retrazo": "#f50400",
        "Confirmada": "0",
        "Id_intervencion": "48",
        "Id_tipo_ot": "1",
        "Letra_intervencion": "I",
        "Turno": "MATUTINO",
        "Id_os_sf": "a0iQ000000BqzslIAB",
        "Color": "#C1CF00",
        "intervencion": "INSTALACIÓN"
    },
    {
        "Id_ot": "65164",
        "Id_os": "OS-24709",
        "Cliente": "TESTQAA  AT APROVISIONAMIENTOUNIVERSAL16 12062019-",
        "Numero_cuenta": "0210008694",
        "Paquete_instalar": "INTERNET DEDICADO EMPRESARIAL 50 MB.",
        "Ticket_sf": "NA",
        "Num_tickets": "0",
        "Cita": "30/03/2021",
        "Numero_empresa": "5555454565",
        "Numero_contacto": "5512341231",
        "Ciudad": "CIUDAD DE MEXICO",
        "Municipio": "CIUDAD DE MÉXICO",
        "Colonia": "JARDINES DEL PEDREGAL",
        "Cp": "01900",
        "Direcccion_completa": "CIUDAD DE MEXICO, CIUDAD DE MÉXICO, JARDINES DEL PEDREGAL, SUR, CP:01900",
        "Dias_retrazo": "#f50400",
        "Confirmada": "0",
        "Id_intervencion": "48",
        "Id_tipo_ot": "1",
        "Letra_intervencion": "I",
        "Turno": "VESPERTINO",
        "Id_os_sf": "a0iQ000000BqYi1IAF",
        "Color": "#C1CF00",
        "intervencion": "INSTALACIÓN"
    },
    {
        "Id_ot": "66185",
        "Id_os": "OS-26489",
        "Cliente": "TESTER JUAN CARLOS QA PRUEBA  07052020-",
        "Numero_cuenta": "0210011656",
        "Paquete_instalar": "INTERNET DEDICADO EMPRESARIAL 100 MB.",
        "Ticket_sf": "NA",
        "Num_tickets": "0",
        "Cita": "30/03/2021",
        "Numero_empresa": "5582165897",
        "Numero_contacto": "5582196581",
        "Ciudad": "CIUDAD DE MEXICO",
        "Municipio": "IXTAPALUCA",
        "Colonia": "VALLE VERDE",
        "Cp": "56563",
        "Direcccion_completa": "CIUDAD DE MEXICO, IXTAPALUCA, VALLE VERDE, SUR, CP:56563",
        "Dias_retrazo": "#f50400",
        "Confirmada": "0",
        "Id_intervencion": "48",
        "Id_tipo_ot": "1",
        "Letra_intervencion": "I",
        "Turno": "VESPERTINO",
        "Id_os_sf": "a0iQ000000BljBKIAZ",
        "Color": "#C1CF00",
        "intervencion": "INSTALACIÓN"
    },
    {
        "Id_ot": "66129",
        "Id_os": "OS-26324",
        "Cliente": "TESTQAA MGUERRERO DESCUENTO MATERIALES 230420-",
        "Numero_cuenta": "0210011297",
        "Paquete_instalar": "INTERNET 3 E",
        "Ticket_sf": "NA",
        "Num_tickets": "0",
        "Cita": "30/03/2021",
        "Numero_empresa": "5589453164",
        "Numero_contacto": "5556456456",
        "Ciudad": "CIUDAD DE MEXICO",
        "Municipio": "CIUDAD DE MÉXICO",
        "Colonia": "JARDINES DEL PEDREGAL DE SAN ÁNGEL",
        "Cp": "04500",
        "Direcccion_completa": "CIUDAD DE MEXICO, CIUDAD DE MÉXICO, JARDINES DEL PEDREGAL DE SAN ÁNGEL, SUR, CP:04500",
        "Dias_retrazo": "#f50400",
        "Confirmada": "1",
        "Id_intervencion": "48",
        "Id_tipo_ot": "1",
        "Letra_intervencion": "I",
        "Turno": "VESPERTINO",
        "Id_os_sf": "a0iQ000000Br6PKIAZ",
        "Color": "#C1CF00",
        "intervencion": "INSTALACIÓN"
    },
    {
        "Id_ot": "66133",
        "Id_os": "OS-26328",
        "Cliente": "PRUEBAS DETENCIONES FEBRERO-",
        "Numero_cuenta": "0210010187",
        "Paquete_instalar": "INTERNET 10 CON VOZ 1 LÍNEA E",
        "Ticket_sf": "NA",
        "Num_tickets": "0",
        "Cita": "30/03/2021",
        "Numero_empresa": "5545655655",
        "Numero_contacto": "1234567898",
        "Ciudad": "CIUDAD DE MEXICO",
        "Municipio": "CIUDAD DE MÉXICO",
        "Colonia": "PROGRESO TIZAPÁN",
        "Cp": "01080",
        "Direcccion_completa": "CIUDAD DE MEXICO, CIUDAD DE MÉXICO, PROGRESO TIZAPÁN, SUR, CP:01080",
        "Dias_retrazo": "#f50400",
        "Confirmada": "0",
        "Id_intervencion": "48",
        "Id_tipo_ot": "1",
        "Letra_intervencion": "I",
        "Turno": "VESPERTINO",
        "Id_os_sf": "a0iQ000000Br6TrIAJ",
        "Color": "#C1CF00",
        "intervencion": "INSTALACIÓN"
    },
    {
        "Id_ot": "66181",
        "Id_os": "OS-26485",
        "Cliente": "TEST NEGOCIO 3P-OP",
        "Numero_cuenta": "0210011630",
        "Paquete_instalar": "MICRO 20 TRIPLE PLAY V4.",
        "Ticket_sf": "NA",
        "Num_tickets": "0",
        "Cita": "30/03/2021",
        "Numero_empresa": "5587297472",
        "Numero_contacto": "5564364587",
        "Ciudad": "CIUDAD DE MEXICO",
        "Municipio": "CIUDAD DE MÉXICO",
        "Colonia": "LORETO Y CAMPAMENTO",
        "Cp": "04510",
        "Direcccion_completa": "CIUDAD DE MEXICO, CIUDAD DE MÉXICO, LORETO Y CAMPAMENTO, SUR, CP:04510",
        "Dias_retrazo": "#f50400",
        "Confirmada": "0",
        "Id_intervencion": "48",
        "Id_tipo_ot": "1",
        "Letra_intervencion": "I",
        "Turno": "VESPERTINO",
        "Id_os_sf": "a0iQ000000Blj9TIAR",
        "Color": "#C1CF00",
        "intervencion": "INSTALACIÓN"
    },
    {
        "Id_ot": "66334",
        "Id_os": "OS-26835",
        "Cliente": "TESTQA ANGIE DETENCIONES EN FFM 20012020-OP",
        "Numero_cuenta": "0210010113",
        "Paquete_instalar": "PLAN EMPRESA 50 MBPS",
        "Ticket_sf": "NA",
        "Num_tickets": "0",
        "Cita": "30/03/2021",
        "Numero_empresa": "5454212121",
        "Numero_contacto": "5454212121",
        "Ciudad": "CIUDAD DE MEXICO",
        "Municipio": "CIUDAD DE MÉXICO",
        "Colonia": "JARDINES EN LA MONTAÑA",
        "Cp": "04500",
        "Direcccion_completa": "CIUDAD DE MEXICO, CIUDAD DE MÉXICO, JARDINES EN LA MONTAÑA, SUR, CP:04500",
        "Dias_retrazo": "#f50400",
        "Confirmada": "0",
        "Id_intervencion": "48",
        "Id_tipo_ot": "1",
        "Letra_intervencion": "I",
        "Turno": "MATUTINO",
        "Id_os_sf": "a0iQ000000Bv3EtIAJ",
        "Color": "#C1CF00",
        "intervencion": "INSTALACIÓN"
    },
    {
        "Id_ot": "64901",
        "Id_os": "OS-22407",
        "Cliente": "NULL",
        "Numero_cuenta": "0210007522",
        "Paquete_instalar": "SOPORTE EN SITIO",
        "Ticket_sf": "NA",
        "Num_tickets": "0",
        "Cita": "30/03/2021",
        "Numero_empresa": "5555454565",
        "Numero_contacto": "null",
        "Ciudad": "CIUDAD DE MEXICO",
        "Municipio": "CIUDAD DE MÉXICO",
        "Colonia": "JARDINES DEL PEDREGAL",
        "Cp": "01900",
        "Direcccion_completa": "CIUDAD DE MEXICO, CIUDAD DE MÉXICO, JARDINES DEL PEDREGAL, SUR, CP:01900",
        "Dias_retrazo": "#f50400",
        "Confirmada": "0",
        "Id_intervencion": "112",
        "Id_tipo_ot": "16",
        "Letra_intervencion": "S",
        "Turno": "MATUTINO",
        "Id_os_sf": "a0iQ000000BqVrYIAV",
        "Color": "#c88624",
        "intervencion": "SOPORTE DE MANTENIMIENTO"
    },
    {
        "Id_ot": "64884",
        "Id_os": "OS-19696",
        "Cliente": "NULL",
        "Numero_cuenta": "0210005493",
        "Paquete_instalar": "SOPORTE EN SITIO",
        "Ticket_sf": "NA",
        "Num_tickets": "0",
        "Cita": "30/03/2021",
        "Numero_empresa": "5588774455",
        "Numero_contacto": "5544778855",
        "Ciudad": "CIUDAD DE MEXICO",
        "Municipio": "TLALPAN",
        "Colonia": "FUENTES DEL PEDREGAL",
        "Cp": "14140",
        "Direcccion_completa": "CIUDAD DE MEXICO, TLALPAN, FUENTES DEL PEDREGAL, SUR, CP:14140",
        "Dias_retrazo": "#f50400",
        "Confirmada": "1",
        "Id_intervencion": "55",
        "Id_tipo_ot": "1",
        "Letra_intervencion": "S",
        "Turno": "VESPERTINO",
        "Id_os_sf": "a0iQ000000BqUbtIAF",
        "Color": "#EA4C31",
        "intervencion": "SOPORTE"
    },
    {
        "Id_ot": "64863",
        "Id_os": "OS-19656",
        "Cliente": "MARIA GUADALUPE PEREZ ZAVALETA-",
        "Numero_cuenta": "0210007420",
        "Paquete_instalar": "PLAN EMPRESA 50 MBPS",
        "Ticket_sf": "NA",
        "Num_tickets": "0",
        "Cita": "30/03/2021",
        "Numero_empresa": "5545655655",
        "Numero_contacto": "1234567898",
        "Ciudad": "PACHUCA",
        "Municipio": "PACHUCA DE SOTO",
        "Colonia": "ZONA PLATEADA",
        "Cp": "42083",
        "Direcccion_completa": "PACHUCA, PACHUCA DE SOTO, ZONA PLATEADA, PACHUCA, CP:42083",
        "Dias_retrazo": "#f50400",
        "Confirmada": "1",
        "Id_intervencion": "48",
        "Id_tipo_ot": "1",
        "Letra_intervencion": "I",
        "Turno": "MATUTINO",
        "Id_os_sf": "a0iQ000000BqUWyIAN",
        "Color": "#C1CF00",
        "intervencion": "INSTALACIÓN"
    },
    {
        "Id_ot": "64867",
        "Id_os": "OS-19662",
        "Cliente": "NULL",
        "Numero_cuenta": "0210005493",
        "Paquete_instalar": "SOPORTE EN SITIO",
        "Ticket_sf": "NA",
        "Num_tickets": "0",
        "Cita": "30/03/2021",
        "Numero_empresa": "5588774455",
        "Numero_contacto": "5544778855",
        "Ciudad": "CIUDAD DE MEXICO",
        "Municipio": "TLALPAN",
        "Colonia": "FUENTES DEL PEDREGAL",
        "Cp": "14140",
        "Direcccion_completa": "CIUDAD DE MEXICO, TLALPAN, FUENTES DEL PEDREGAL, SUR, CP:14140",
        "Dias_retrazo": "#f50400",
        "Confirmada": "1",
        "Id_intervencion": "112",
        "Id_tipo_ot": "16",
        "Letra_intervencion": "S",
        "Turno": "VESPERTINO",
        "Id_os_sf": "a0iQ000000BqUYBIA3",
        "Color": "#c88624",
        "intervencion": "SOPORTE DE MANTENIMIENTO"
    },
    {
        "Id_ot": "64868",
        "Id_os": "OS-19663",
        "Cliente": "NULL",
        "Numero_cuenta": "0210005493",
        "Paquete_instalar": "SOPORTE EN SITIO",
        "Ticket_sf": "NA",
        "Num_tickets": "0",
        "Cita": "30/03/2021",
        "Numero_empresa": "5588774455",
        "Numero_contacto": "5544778855",
        "Ciudad": "CIUDAD DE MEXICO",
        "Municipio": "TLALPAN",
        "Colonia": "FUENTES DEL PEDREGAL",
        "Cp": "14140",
        "Direcccion_completa": "CIUDAD DE MEXICO, TLALPAN, FUENTES DEL PEDREGAL, SUR, CP:14140",
        "Dias_retrazo": "#f50400",
        "Confirmada": "0",
        "Id_intervencion": "112",
        "Id_tipo_ot": "1",
        "Letra_intervencion": "S",
        "Turno": "VESPERTINO",
        "Id_os_sf": "a0iQ000000BqUYGIA3",
        "Color": "#c88624",
        "intervencion": "SOPORTE DE MANTENIMIENTO"
    },
    {
        "Id_ot": "64985",
        "Id_os": "OS-24183",
        "Cliente": "MARIA GUADALUPE PEREZ ZAVALETA-",
        "Numero_cuenta": "0210007421",
        "Paquete_instalar": "PLAN EMPRESA 50 MBPS",
        "Ticket_sf": "NA",
        "Num_tickets": "0",
        "Cita": "30/03/2021",
        "Numero_empresa": "5545655655",
        "Numero_contacto": "1234567898",
        "Ciudad": "PACHUCA",
        "Municipio": "PACHUCA DE SOTO",
        "Colonia": "ZONA PLATEADA",
        "Cp": "42083",
        "Direcccion_completa": "PACHUCA, PACHUCA DE SOTO, ZONA PLATEADA, PACHUCA, CP:42083",
        "Dias_retrazo": "#f50400",
        "Confirmada": "0",
        "Id_intervencion": "48",
        "Id_tipo_ot": "1",
        "Letra_intervencion": "I",
        "Turno": "VESPERTINO",
        "Id_os_sf": "a0iQ000000BqXVGIA3",
        "Color": "#C1CF00",
        "intervencion": "INSTALACIÓN"
    },
    {
        "Id_ot": "65315",
        "Id_os": "OS-24887",
        "Cliente": "TESTQAA  AT ALTAIPFIJA2 12062019-",
        "Numero_cuenta": "0210009024",
        "Paquete_instalar": "SDN RED IP 50 MBPS.",
        "Ticket_sf": "NA",
        "Num_tickets": "0",
        "Cita": "30/03/2021",
        "Numero_empresa": "5555454565",
        "Numero_contacto": "8765434567",
        "Ciudad": "CIUDAD DE MEXICO",
        "Municipio": "CIUDAD DE MÉXICO",
        "Colonia": "JARDINES DEL PEDREGAL",
        "Cp": "01900",
        "Direcccion_completa": "CIUDAD DE MEXICO, CIUDAD DE MÉXICO, JARDINES DEL PEDREGAL, SUR, CP:01900",
        "Dias_retrazo": "#f50400",
        "Confirmada": "0",
        "Id_intervencion": "48",
        "Id_tipo_ot": "1",
        "Letra_intervencion": "I",
        "Turno": "VESPERTINO",
        "Id_os_sf": "a0iQ000000Bqa5TIAR",
        "Color": "#C1CF00",
        "intervencion": "INSTALACIÓN"
    },
    {
        "Id_ot": "65831",
        "Id_os": "OS-25655",
        "Cliente": "GUARADA OPPORTUNITY",
        "Numero_cuenta": "0210010308",
        "Paquete_instalar": "INTERNET DEDICADO 100_MBPS.",
        "Ticket_sf": "NA",
        "Num_tickets": "0",
        "Cita": "30/03/2021",
        "Numero_empresa": "5520202010",
        "Numero_contacto": "5556456456",
        "Ciudad": "CIUDAD DE MEXICO",
        "Municipio": "CIUDAD DE MÉXICO",
        "Colonia": "JUÁREZ",
        "Cp": "06600",
        "Direcccion_completa": "CIUDAD DE MEXICO, CIUDAD DE MÉXICO, JUÁREZ, SUR, CP:06600",
        "Dias_retrazo": "#f50400",
        "Confirmada": "1",
        "Id_intervencion": "48",
        "Id_tipo_ot": "1",
        "Letra_intervencion": "I",
        "Turno": "VESPERTINO",
        "Id_os_sf": "a0iQ000000Br2vzIAB",
        "Color": "#C1CF00",
        "intervencion": "INSTALACIÓN"
    },
    {
        "Id_ot": "64858",
        "Id_os": "OS-19652",
        "Cliente": "MARIA GUADALUPE PEREZ ZAVALETA-",
        "Numero_cuenta": "0210007416",
        "Paquete_instalar": "INTERNET 30 CON VOZ 2 LÍNEAS E1",
        "Ticket_sf": "NA",
        "Num_tickets": "0",
        "Cita": "30/03/2021",
        "Numero_empresa": "5545655655",
        "Numero_contacto": "1234567898",
        "Ciudad": "PACHUCA",
        "Municipio": "PACHUCA DE SOTO",
        "Colonia": "ZONA PLATEADA",
        "Cp": "42083",
        "Direcccion_completa": "PACHUCA, PACHUCA DE SOTO, ZONA PLATEADA, PACHUCA, CP:42083",
        "Dias_retrazo": "#f50400",
        "Confirmada": "1",
        "Id_intervencion": "48",
        "Id_tipo_ot": "1",
        "Letra_intervencion": "I",
        "Turno": "MATUTINO",
        "Id_os_sf": "a0iQ000000BqUWeIAN",
        "Color": "#C1CF00",
        "intervencion": "INSTALACIÓN"
    },
    {
        "Id_ot": "64904",
        "Id_os": "OS-22422",
        "Cliente": "PAQUETES TE",
        "Numero_cuenta": "0210007713",
        "Paquete_instalar": "PLAN EMPRESA 100 MBPS TE.",
        "Ticket_sf": "NA",
        "Num_tickets": "0",
        "Cita": "30/03/2021",
        "Numero_empresa": "5566778822",
        "Numero_contacto": "8822449944",
        "Ciudad": "CIUDAD DE MEXICO",
        "Municipio": "CIUDAD DE MÉXICO",
        "Colonia": "LA OTRA BANDA",
        "Cp": "04510",
        "Direcccion_completa": "CIUDAD DE MEXICO, CIUDAD DE MÉXICO, LA OTRA BANDA, SUR, CP:04510",
        "Dias_retrazo": "#f50400",
        "Confirmada": "0",
        "Id_intervencion": "48",
        "Id_tipo_ot": "1",
        "Letra_intervencion": "I",
        "Turno": "MATUTINO",
        "Id_os_sf": "a0iQ000000BqVxWIAV",
        "Color": "#C1CF00",
        "intervencion": "INSTALACIÓN"
    },
    {
        "Id_ot": "64909",
        "Id_os": "OS-22431",
        "Cliente": "PAQUETES TE",
        "Numero_cuenta": "0210007739",
        "Paquete_instalar": "INTERNET DEDICADO 20 MBPS MICROONDAS PMP.",
        "Ticket_sf": "NA",
        "Num_tickets": "0",
        "Cita": "30/03/2021",
        "Numero_empresa": "5566778822",
        "Numero_contacto": "8822449944",
        "Ciudad": "CIUDAD DE MEXICO",
        "Municipio": "CIUDAD DE MÉXICO",
        "Colonia": "LA OTRA BANDA",
        "Cp": "04510",
        "Direcccion_completa": "CIUDAD DE MEXICO, CIUDAD DE MÉXICO, LA OTRA BANDA, SUR, CP:04510",
        "Dias_retrazo": "#f50400",
        "Confirmada": "0",
        "Id_intervencion": "48",
        "Id_tipo_ot": "1",
        "Letra_intervencion": "I",
        "Turno": "VESPERTINO",
        "Id_os_sf": "a0iQ000000BqW3ZIAV",
        "Color": "#C1CF00",
        "intervencion": "INSTALACIÓN"
    },
    {
        "Id_ot": "64910",
        "Id_os": "OS-22433",
        "Cliente": "TESTQAA  ANGIE ASIMÉTRICO 12062019-",
        "Numero_cuenta": "0210007747",
        "Paquete_instalar": "INTERNET 300.",
        "Ticket_sf": "NA",
        "Num_tickets": "0",
        "Cita": "30/03/2021",
        "Numero_empresa": "5555454565",
        "Numero_contacto": "5534567898",
        "Ciudad": "CIUDAD DE MEXICO",
        "Municipio": "CIUDAD DE MÉXICO",
        "Colonia": "JARDINES DEL PEDREGAL",
        "Cp": "01900",
        "Direcccion_completa": "CIUDAD DE MEXICO, CIUDAD DE MÉXICO, JARDINES DEL PEDREGAL, SUR, CP:01900",
        "Dias_retrazo": "#f50400",
        "Confirmada": "0",
        "Id_intervencion": "48",
        "Id_tipo_ot": "1",
        "Letra_intervencion": "I",
        "Turno": "VESPERTINO",
        "Id_os_sf": "a0iQ000000BqW3jIAF",
        "Color": "#C1CF00",
        "intervencion": "INSTALACIÓN"
    },
    {
        "Id_ot": "65150",
        "Id_os": "OS-24675",
        "Cliente": "TESTQAA  AT APROVISIONAMIENTOUNIVERSAL4 12062019-",
        "Numero_cuenta": "0210008599",
        "Paquete_instalar": "INTERNET DEDICADO EMPRESARIAL 150 MB.",
        "Ticket_sf": "NA",
        "Num_tickets": "0",
        "Cita": "30/03/2021",
        "Numero_empresa": "5555454565",
        "Numero_contacto": "5523456789",
        "Ciudad": "CIUDAD DE MEXICO",
        "Municipio": "CIUDAD DE MÉXICO",
        "Colonia": "JARDINES DEL PEDREGAL",
        "Cp": "01900",
        "Direcccion_completa": "CIUDAD DE MEXICO, CIUDAD DE MÉXICO, JARDINES DEL PEDREGAL, SUR, CP:01900",
        "Dias_retrazo": "#f50400",
        "Confirmada": "0",
        "Id_intervencion": "48",
        "Id_tipo_ot": "1",
        "Letra_intervencion": "I",
        "Turno": "VESPERTINO",
        "Id_os_sf": "a0iQ000000BqYfHIAV",
        "Color": "#C1CF00",
        "intervencion": "INSTALACIÓN"
    },
    {
        "Id_ot": "65151",
        "Id_os": "OS-24676",
        "Cliente": "TESTQAA  AT APROVISIONAMIENTOUNIVERSAL4 12062019-",
        "Numero_cuenta": "0210008601",
        "Paquete_instalar": "INTERNET DEDICADO EMPRESARIAL 30 MB.",
        "Ticket_sf": "NA",
        "Num_tickets": "0",
        "Cita": "30/03/2021",
        "Numero_empresa": "5555454565",
        "Numero_contacto": "5523456789",
        "Ciudad": "CIUDAD DE MEXICO",
        "Municipio": "CIUDAD DE MÉXICO",
        "Colonia": "JARDINES DEL PEDREGAL",
        "Cp": "01900",
        "Direcccion_completa": "CIUDAD DE MEXICO, CIUDAD DE MÉXICO, JARDINES DEL PEDREGAL, SUR, CP:01900",
        "Dias_retrazo": "#f50400",
        "Confirmada": "0",
        "Id_intervencion": "48",
        "Id_tipo_ot": "1",
        "Letra_intervencion": "I",
        "Turno": "VESPERTINO",
        "Id_os_sf": "a0iQ000000BqYfMIAV",
        "Color": "#C1CF00",
        "intervencion": "INSTALACIÓN"
    },
    {
        "Id_ot": "65152",
        "Id_os": "OS-24677",
        "Cliente": "TESTQAA  AT APROVISIONAMIENTOUNIVERSAL4 12062019-",
        "Numero_cuenta": "0210008598",
        "Paquete_instalar": "INTERNET DEDICADO EMPRESARIAL 100 MB.",
        "Ticket_sf": "NA",
        "Num_tickets": "0",
        "Cita": "30/03/2021",
        "Numero_empresa": "5555454565",
        "Numero_contacto": "5523456789",
        "Ciudad": "CIUDAD DE MEXICO",
        "Municipio": "CIUDAD DE MÉXICO",
        "Colonia": "JARDINES DEL PEDREGAL",
        "Cp": "01900",
        "Direcccion_completa": "CIUDAD DE MEXICO, CIUDAD DE MÉXICO, JARDINES DEL PEDREGAL, SUR, CP:01900",
        "Dias_retrazo": "#f50400",
        "Confirmada": "0",
        "Id_intervencion": "48",
        "Id_tipo_ot": "1",
        "Letra_intervencion": "I",
        "Turno": "VESPERTINO",
        "Id_os_sf": "a0iQ000000BqYfRIAV",
        "Color": "#C1CF00",
        "intervencion": "INSTALACIÓN"
    },
    {
        "Id_ot": "65153",
        "Id_os": "OS-24678",
        "Cliente": "TESTQAA  AT APROVISIONAMIENTOUNIVERSAL4 12062019-",
        "Numero_cuenta": "0210008600",
        "Paquete_instalar": "INTERNET DEDICADO EMPRESARIAL 20 MB.",
        "Ticket_sf": "NA",
        "Num_tickets": "0",
        "Cita": "30/03/2021",
        "Numero_empresa": "5555454565",
        "Numero_contacto": "5523456789",
        "Ciudad": "CIUDAD DE MEXICO",
        "Municipio": "CIUDAD DE MÉXICO",
        "Colonia": "JARDINES DEL PEDREGAL",
        "Cp": "01900",
        "Direcccion_completa": "CIUDAD DE MEXICO, CIUDAD DE MÉXICO, JARDINES DEL PEDREGAL, SUR, CP:01900",
        "Dias_retrazo": "#f50400",
        "Confirmada": "0",
        "Id_intervencion": "48",
        "Id_tipo_ot": "1",
        "Letra_intervencion": "I",
        "Turno": "VESPERTINO",
        "Id_os_sf": "a0iQ000000BqYfWIAV",
        "Color": "#C1CF00",
        "intervencion": "INSTALACIÓN"
    },
    {
        "Id_ot": "65156",
        "Id_os": "OS-24681",
        "Cliente": "TESTQAA  AT APROVISIONAMIENTOUNIVERSAL5 12062019-",
        "Numero_cuenta": "0210008611",
        "Paquete_instalar": "INTERNET SIMÉTRICO EMPRESARIAL 10/10.",
        "Ticket_sf": "NA",
        "Num_tickets": "0",
        "Cita": "30/03/2021",
        "Numero_empresa": "5555454565",
        "Numero_contacto": "5523456787",
        "Ciudad": "CIUDAD DE MEXICO",
        "Municipio": "CIUDAD DE MÉXICO",
        "Colonia": "JARDINES DEL PEDREGAL",
        "Cp": "01900",
        "Direcccion_completa": "CIUDAD DE MEXICO, CIUDAD DE MÉXICO, JARDINES DEL PEDREGAL, SUR, CP:01900",
        "Dias_retrazo": "#f50400",
        "Confirmada": "0",
        "Id_intervencion": "48",
        "Id_tipo_ot": "1",
        "Letra_intervencion": "I",
        "Turno": "VESPERTINO",
        "Id_os_sf": "a0iQ000000BqYflIAF",
        "Color": "#C1CF00",
        "intervencion": "INSTALACIÓN"
    },
    {
        "Id_ot": "65157",
        "Id_os": "OS-24682",
        "Cliente": "TESTQAA  AT APROVISIONAMIENTOUNIVERSAL5 12062019-",
        "Numero_cuenta": "0210008613",
        "Paquete_instalar": "INTERNET SIMÉTRICO EMPRESARIAL 150/150.",
        "Ticket_sf": "NA",
        "Num_tickets": "0",
        "Cita": "30/03/2021",
        "Numero_empresa": "5555454565",
        "Numero_contacto": "5523456787",
        "Ciudad": "CIUDAD DE MEXICO",
        "Municipio": "CIUDAD DE MÉXICO",
        "Colonia": "JARDINES DEL PEDREGAL",
        "Cp": "01900",
        "Direcccion_completa": "CIUDAD DE MEXICO, CIUDAD DE MÉXICO, JARDINES DEL PEDREGAL, SUR, CP:01900",
        "Dias_retrazo": "#f50400",
        "Confirmada": "0",
        "Id_intervencion": "48",
        "Id_tipo_ot": "1",
        "Letra_intervencion": "I",
        "Turno": "VESPERTINO",
        "Id_os_sf": "a0iQ000000BqYfqIAF",
        "Color": "#C1CF00",
        "intervencion": "INSTALACIÓN"
    },
    {
        "Id_ot": "65158",
        "Id_os": "OS-24683",
        "Cliente": "TESTQAA  AT APROVISIONAMIENTOUNIVERSAL5 12062019-",
        "Numero_cuenta": "0210008615",
        "Paquete_instalar": "INTERNET SIMÉTRICO EMPRESARIAL 30/30.",
        "Ticket_sf": "NA",
        "Num_tickets": "0",
        "Cita": "30/03/2021",
        "Numero_empresa": "5555454565",
        "Numero_contacto": "5523456787",
        "Ciudad": "CIUDAD DE MEXICO",
        "Municipio": "CIUDAD DE MÉXICO",
        "Colonia": "JARDINES DEL PEDREGAL",
        "Cp": "01900",
        "Direcccion_completa": "CIUDAD DE MEXICO, CIUDAD DE MÉXICO, JARDINES DEL PEDREGAL, SUR, CP:01900",
        "Dias_retrazo": "#f50400",
        "Confirmada": "0",
        "Id_intervencion": "48",
        "Id_tipo_ot": "1",
        "Letra_intervencion": "I",
        "Turno": "VESPERTINO",
        "Id_os_sf": "a0iQ000000BqYfvIAF",
        "Color": "#C1CF00",
        "intervencion": "INSTALACIÓN"
    },
    {
        "Id_ot": "65159",
        "Id_os": "OS-24684",
        "Cliente": "TESTQAA  AT APROVISIONAMIENTOUNIVERSAL5 12062019-",
        "Numero_cuenta": "0210008612",
        "Paquete_instalar": "INTERNET SIMÉTRICO EMPRESARIAL 100/100.",
        "Ticket_sf": "NA",
        "Num_tickets": "0",
        "Cita": "30/03/2021",
        "Numero_empresa": "5555454565",
        "Numero_contacto": "5523456787",
        "Ciudad": "CIUDAD DE MEXICO",
        "Municipio": "CIUDAD DE MÉXICO",
        "Colonia": "JARDINES DEL PEDREGAL",
        "Cp": "01900",
        "Direcccion_completa": "CIUDAD DE MEXICO, CIUDAD DE MÉXICO, JARDINES DEL PEDREGAL, SUR, CP:01900",
        "Dias_retrazo": "#f50400",
        "Confirmada": "0",
        "Id_intervencion": "48",
        "Id_tipo_ot": "1",
        "Letra_intervencion": "I",
        "Turno": "VESPERTINO",
        "Id_os_sf": "a0iQ000000BqYg0IAF",
        "Color": "#C1CF00",
        "intervencion": "INSTALACIÓN"
    },
    {
        "Id_ot": "65160",
        "Id_os": "OS-24685",
        "Cliente": "TESTQAA  AT APROVISIONAMIENTOUNIVERSAL5 12062019-",
        "Numero_cuenta": "0210008614",
        "Paquete_instalar": "INTERNET SIMÉTRICO EMPRESARIAL 20/20.",
        "Ticket_sf": "NA",
        "Num_tickets": "0",
        "Cita": "30/03/2021",
        "Numero_empresa": "5555454565",
        "Numero_contacto": "5523456787",
        "Ciudad": "CIUDAD DE MEXICO",
        "Municipio": "CIUDAD DE MÉXICO",
        "Colonia": "JARDINES DEL PEDREGAL",
        "Cp": "01900",
        "Direcccion_completa": "CIUDAD DE MEXICO, CIUDAD DE MÉXICO, JARDINES DEL PEDREGAL, SUR, CP:01900",
        "Dias_retrazo": "#f50400",
        "Confirmada": "0",
        "Id_intervencion": "48",
        "Id_tipo_ot": "1",
        "Letra_intervencion": "I",
        "Turno": "VESPERTINO",
        "Id_os_sf": "a0iQ000000BqYg5IAF",
        "Color": "#C1CF00",
        "intervencion": "INSTALACIÓN"
    },
    {
        "Id_ot": "65301",
        "Id_os": "OS-24871",
        "Cliente": "OP LUIS MICROONDA",
        "Numero_cuenta": "0210009078",
        "Paquete_instalar": "INTERNET DEDICADO 20 MBPS MICROONDAS PMP.",
        "Ticket_sf": "NA",
        "Num_tickets": "0",
        "Cita": "30/03/2021",
        "Numero_empresa": "5555555559",
        "Numero_contacto": "5556456456",
        "Ciudad": "CIUDAD DE MEXICO",
        "Municipio": "CIUDAD DE MÉXICO",
        "Colonia": "LORETO Y CAMPAMENTO",
        "Cp": "01090",
        "Direcccion_completa": "CIUDAD DE MEXICO, CIUDAD DE MÉXICO, LORETO Y CAMPAMENTO, SUR, CP:01090",
        "Dias_retrazo": "#f50400",
        "Confirmada": "0",
        "Id_intervencion": "48",
        "Id_tipo_ot": "1",
        "Letra_intervencion": "I",
        "Turno": "MATUTINO",
        "Id_os_sf": "a0iQ000000Bqa4BIAR",
        "Color": "#C1CF00",
        "intervencion": "INSTALACIÓN"
    },
    {
        "Id_ot": "65696",
        "Id_os": "OS-25435",
        "Cliente": "NULL",
        "Numero_cuenta": "0200045774",
        "Paquete_instalar": "SOPORTE EN SITIO",
        "Ticket_sf": "NA",
        "Num_tickets": "0",
        "Cita": "30/03/2021",
        "Numero_empresa": "1234567890",
        "Numero_contacto": "1234567890",
        "Ciudad": "CIUDAD DE MEXICO",
        "Municipio": "CHIHUAHUA",
        "Colonia": "JARDINES DEL SANTUARIO",
        "Cp": "31206",
        "Direcccion_completa": "CIUDAD DE MEXICO, CHIHUAHUA, JARDINES DEL SANTUARIO, SUR, CP:31206",
        "Dias_retrazo": "#f50400",
        "Confirmada": "0",
        "Id_intervencion": "106",
        "Id_tipo_ot": "1",
        "Letra_intervencion": "R",
        "Turno": "MATUTINO",
        "Id_os_sf": "a0iQ000000BuwFtIAJ",
        "Color": "#054AA5",
        "intervencion": "RENOVACION"
    },
    {
        "Id_ot": "65697",
        "Id_os": "OS-25438",
        "Cliente": "TESTQA ANGIE DETENCIONES EN FFM 20012020-OP",
        "Numero_cuenta": "0210010124",
        "Paquete_instalar": "MICRO 40.",
        "Ticket_sf": "NA",
        "Num_tickets": "0",
        "Cita": "30/03/2021",
        "Numero_empresa": "5598765432",
        "Numero_contacto": "5554654564",
        "Ciudad": "CIUDAD DE MEXICO",
        "Municipio": "CIUDAD DE MÉXICO",
        "Colonia": "LA OTRA BANDA",
        "Cp": "04510",
        "Direcccion_completa": "CIUDAD DE MEXICO, CIUDAD DE MÉXICO, LA OTRA BANDA, SUR, CP:04510",
        "Dias_retrazo": "#f50400",
        "Confirmada": "0",
        "Id_intervencion": "48",
        "Id_tipo_ot": "1",
        "Letra_intervencion": "I",
        "Turno": "VESPERTINO",
        "Id_os_sf": "a0iQ000000BuwG8IAJ",
        "Color": "#C1CF00",
        "intervencion": "INSTALACIÓN"
    },
    {
        "Id_ot": "64878",
        "Id_os": "OS-19684",
        "Cliente": "MARIA GUADALUPE PEREZ ZAVALETA-",
        "Numero_cuenta": "0210007411",
        "Paquete_instalar": "PLAN EMPRESA 50 MBPS",
        "Ticket_sf": "NA",
        "Num_tickets": "0",
        "Cita": "30/03/2021",
        "Numero_empresa": "5545655655",
        "Numero_contacto": "1234567898",
        "Ciudad": "PACHUCA",
        "Municipio": "PACHUCA DE SOTO",
        "Colonia": "SANTA JULIA",
        "Cp": "42080",
        "Direcccion_completa": "PACHUCA, PACHUCA DE SOTO, SANTA JULIA, PACHUCA, CP:42080",
        "Dias_retrazo": "#f50400",
        "Confirmada": "1",
        "Id_intervencion": "48",
        "Id_tipo_ot": "1",
        "Letra_intervencion": "I",
        "Turno": "VESPERTINO",
        "Id_os_sf": "a0iQ000000BqUZxIAN",
        "Color": "#C1CF00",
        "intervencion": "INSTALACIÓN"
    },
    {
        "Id_ot": "64880",
        "Id_os": "OS-19686",
        "Cliente": "INSTALACION EMPRESARIAL EMPRESARIAL-",
        "Numero_cuenta": "0210007021",
        "Paquete_instalar": "INTERNET 20/20",
        "Ticket_sf": "NA",
        "Num_tickets": "0",
        "Cita": "30/03/2021",
        "Numero_empresa": "5588448888",
        "Numero_contacto": "1234567898",
        "Ciudad": "CIUDAD DE MEXICO",
        "Municipio": "CIUDAD DE MÉXICO",
        "Colonia": "JARDINES DEL PEDREGAL",
        "Cp": "01900",
        "Direcccion_completa": "CIUDAD DE MEXICO, CIUDAD DE MÉXICO, JARDINES DEL PEDREGAL, SUR, CP:01900",
        "Dias_retrazo": "#f50400",
        "Confirmada": "0",
        "Id_intervencion": "48",
        "Id_tipo_ot": "1",
        "Letra_intervencion": "I",
        "Turno": "VESPERTINO",
        "Id_os_sf": "a0iQ000000BqUa7IAF",
        "Color": "#C1CF00",
        "intervencion": "INSTALACIÓN"
    },
    {
        "Id_ot": "65187",
        "Id_os": "OS-24733",
        "Cliente": "MINISO S.A. DE C.V.-",
        "Numero_cuenta": "0210008423",
        "Paquete_instalar": "RED IP 2 MBPS MICROONDAS PMP.",
        "Ticket_sf": "NA",
        "Num_tickets": "0",
        "Cita": "30/03/2021",
        "Numero_empresa": "5557788988",
        "Numero_contacto": "1234567898",
        "Ciudad": "CIUDAD DE MEXICO",
        "Municipio": "CIUDAD DE MÉXICO",
        "Colonia": "AJUSCO",
        "Cp": "04300",
        "Direcccion_completa": "CIUDAD DE MEXICO, CIUDAD DE MÉXICO, AJUSCO, SUR, CP:04300",
        "Dias_retrazo": "#f50400",
        "Confirmada": "0",
        "Id_intervencion": "48",
        "Id_tipo_ot": "1",
        "Letra_intervencion": "I",
        "Turno": "VESPERTINO",
        "Id_os_sf": "a0iQ000000BqYrrIAF",
        "Color": "#C1CF00",
        "intervencion": "INSTALACIÓN"
    },
    {
        "Id_ot": "65188",
        "Id_os": "OS-24734",
        "Cliente": "MINISO S.A. DE C.V.-",
        "Numero_cuenta": "0210008427",
        "Paquete_instalar": "PLAN EMPRESA 50 MBPS",
        "Ticket_sf": "NA",
        "Num_tickets": "0",
        "Cita": "30/03/2021",
        "Numero_empresa": "5557788988",
        "Numero_contacto": "1234567898",
        "Ciudad": "CIUDAD DE MEXICO",
        "Municipio": "CIUDAD DE MÉXICO",
        "Colonia": "AJUSCO",
        "Cp": "04300",
        "Direcccion_completa": "CIUDAD DE MEXICO, CIUDAD DE MÉXICO, AJUSCO, SUR, CP:04300",
        "Dias_retrazo": "#f50400",
        "Confirmada": "0",
        "Id_intervencion": "48",
        "Id_tipo_ot": "1",
        "Letra_intervencion": "I",
        "Turno": "VESPERTINO",
        "Id_os_sf": "a0iQ000000BqYrwIAF",
        "Color": "#C1CF00",
        "intervencion": "INSTALACIÓN"
    },
    {
        "Id_ot": "65296",
        "Id_os": "OS-24856",
        "Cliente": "TESTQAA  AT APROVUNIVERSALPOSTVENTA7 12062019-",
        "Numero_cuenta": "0210008990",
        "Paquete_instalar": "SDN RED IP 10 MBPS.",
        "Ticket_sf": "NA",
        "Num_tickets": "0",
        "Cita": "30/03/2021",
        "Numero_empresa": "5555454565",
        "Numero_contacto": "6546363456",
        "Ciudad": "CIUDAD DE MEXICO",
        "Municipio": "CIUDAD DE MÉXICO",
        "Colonia": "JARDINES DEL PEDREGAL",
        "Cp": "01900",
        "Direcccion_completa": "CIUDAD DE MEXICO, CIUDAD DE MÉXICO, JARDINES DEL PEDREGAL, SUR, CP:01900",
        "Dias_retrazo": "#f50400",
        "Confirmada": "0",
        "Id_intervencion": "48",
        "Id_tipo_ot": "1",
        "Letra_intervencion": "I",
        "Turno": "VESPERTINO",
        "Id_os_sf": "a0iQ000000BqZxtIAF",
        "Color": "#C1CF00",
        "intervencion": "INSTALACIÓN"
    },
    {
        "Id_ot": "65298",
        "Id_os": "OS-24858",
        "Cliente": "TESTQAA  AT APROVUNIVERSALPOSTVENTA7 12062019-",
        "Numero_cuenta": "0210008992",
        "Paquete_instalar": "SDN RED IP 50 MBPS.",
        "Ticket_sf": "NA",
        "Num_tickets": "0",
        "Cita": "30/03/2021",
        "Numero_empresa": "5555454565",
        "Numero_contacto": "6546363456",
        "Ciudad": "CIUDAD DE MEXICO",
        "Municipio": "CIUDAD DE MÉXICO",
        "Colonia": "JARDINES DEL PEDREGAL",
        "Cp": "01900",
        "Direcccion_completa": "CIUDAD DE MEXICO, CIUDAD DE MÉXICO, JARDINES DEL PEDREGAL, SUR, CP:01900",
        "Dias_retrazo": "#f50400",
        "Confirmada": "0",
        "Id_intervencion": "48",
        "Id_tipo_ot": "1",
        "Letra_intervencion": "I",
        "Turno": "VESPERTINO",
        "Id_os_sf": "a0iQ000000BqZy3IAF",
        "Color": "#C1CF00",
        "intervencion": "INSTALACIÓN"
    },
    {
        "Id_ot": "65399",
        "Id_os": "OS-24968",
        "Cliente": "PAPELERIA UNODOSTRES-",
        "Numero_cuenta": "0210009759",
        "Paquete_instalar": "MICRO 20.",
        "Ticket_sf": "NA",
        "Num_tickets": "0",
        "Cita": "30/03/2021",
        "Numero_empresa": "5511552244",
        "Numero_contacto": "5511552244",
        "Ciudad": "CIUDAD DE MEXICO",
        "Municipio": "CIUDAD DE MÉXICO",
        "Colonia": "2DO PARQUE LAS ÁGUILAS",
        "Cp": "01730",
        "Direcccion_completa": "CIUDAD DE MEXICO, CIUDAD DE MÉXICO, 2DO PARQUE LAS ÁGUILAS, SUR, CP:01730",
        "Dias_retrazo": "#f50400",
        "Confirmada": "1",
        "Id_intervencion": "48",
        "Id_tipo_ot": "1",
        "Letra_intervencion": "I",
        "Turno": "MATUTINO",
        "Id_os_sf": "a0iQ000000BqacwIAB",
        "Color": "#C1CF00",
        "intervencion": "INSTALACIÓN"
    },
    {
        "Id_ot": "65397",
        "Id_os": "OS-24961",
        "Cliente": "TEST APP EMPRESARIAL",
        "Numero_cuenta": "0210009227",
        "Paquete_instalar": "MICRO 40.",
        "Ticket_sf": "NA",
        "Num_tickets": "0",
        "Cita": "30/03/2021",
        "Numero_empresa": "5565544546",
        "Numero_contacto": "5549823749",
        "Ciudad": "CIUDAD DE MEXICO",
        "Municipio": "CIUDAD DE MÉXICO",
        "Colonia": "LORETO Y CAMPAMENTO",
        "Cp": "01090",
        "Direcccion_completa": "CIUDAD DE MEXICO, CIUDAD DE MÉXICO, LORETO Y CAMPAMENTO, SUR, CP:01090",
        "Dias_retrazo": "#f50400",
        "Confirmada": "0",
        "Id_intervencion": "48",
        "Id_tipo_ot": "1",
        "Letra_intervencion": "I",
        "Turno": "VESPERTINO",
        "Id_os_sf": "a0iQ000000BqabPIAR",
        "Color": "#C1CF00",
        "intervencion": "INSTALACIÓN"
    }
]
var conteoOtsDespacho={
		"Alertas": [{
			"IdTipoAlerta": "3",
			"IdIcono": "fas fa-microchip",
			"IdColor": "#F2CA3E",
			"IdDescripcion": "Cliente",
			"Contador": "3",
            "bgalerta":"#e6f7fb",
            "calerta":"#5bc8e5"

		}, {
			"IdTipoAlerta": "87",
			"IdIcono": "fas fa-house-damage",
			"IdColor": "#F4404A",
			"IdDescripcion": "Infraestructura",
			"Contador": "7",
            "bgalerta":"#fff5e2",
            "calerta":"#fdc149"
		}, {
			"IdTipoAlerta": "35",
			"IdIcono": "fas fa-user-friends",
			"IdColor": "#F26363",
			"IdDescripcion": "Integrador",
			"Contador": "2",
            "bgalerta":"#fce4ef",
            "calerta":"#ee4f97"
		}, {
			"IdTipoAlerta": "1",
			"IdIcono": "fas fa-tools",
			"IdColor": "#59B5D9",
			"IdDescripcion": "Planta Externa",
			"Contador": "20",
            "bgalerta":"#ebe4f0",
            "calerta":"#7f4c9d"
		}, {
			"IdTipoAlerta": "2",
			"IdIcono": "far fa-calendar-alt",
			"IdColor": "#77BF56",
			"IdDescripcion": "Planta Interna",
			"Contador": "2",
            "bgalerta":"#f9fae3",
            "calerta":"#ced638"
		}, {
			"IdTipoAlerta": "4",
			"IdIcono": "fas fa-broadcast-tower",
			"IdColor": "#F2A057",
			"IdDescripcion": "Tecnico",
			"Contador": "3",
            "bgalerta":"#dfe2e5",
            "calerta":"#314458"
		}, {
			"IdTipoAlerta": "75",
			"IdIcono": "fas fa-broadcast-tower",
			"IdColor": "#d45e82",
			"IdDescripcion": "Valida Corte Individual",
			"Contador": "5",
            "bgalerta":"#e6f7fb",
            "calerta":"#5bc8e5"
		}]
}

var testalistado=[
    {
      "userId": 1,
      "id": 1,
      "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
      "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
    },
    {
      "userId": 1,
      "id": 2,
      "title": "qui est esse",
      "body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
    },
    {
      "userId": 1,
      "id": 3,
      "title": "ea molestias quasi exercitationem repellat qui ipsa sit aut",
      "body": "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut"
    },
    {
      "userId": 1,
      "id": 4,
      "title": "eum et est occaecati",
      "body": "ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit"
    },
    {
      "userId": 1,
      "id": 5,
      "title": "nesciunt quas odio",
      "body": "repudiandae veniam quaerat sunt sed\nalias aut fugiat sit autem sed est\nvoluptatem omnis possimus esse voluptatibus quis\nest aut tenetur dolor neque"
    },
    {
      "userId": 1,
      "id": 6,
      "title": "dolorem eum magni eos aperiam quia",
      "body": "ut aspernatur corporis harum nihil quis provident sequi\nmollitia nobis aliquid molestiae\nperspiciatis et ea nemo ab reprehenderit accusantium quas\nvoluptate dolores velit et doloremque molestiae"
    },
    {
      "userId": 1,
      "id": 7,
      "title": "magnam facilis autem",
      "body": "dolore placeat quibusdam ea quo vitae\nmagni quis enim qui quis quo nemo aut saepe\nquidem repellat excepturi ut quia\nsunt ut sequi eos ea sed quas"
    },
    {
      "userId": 1,
      "id": 8,
      "title": "dolorem dolore est ipsam",
      "body": "dignissimos aperiam dolorem qui eum\nfacilis quibusdam animi sint suscipit qui sint possimus cum\nquaerat magni maiores excepturi\nipsam ut commodi dolor voluptatum modi aut vitae"
    },
    {
      "userId": 1,
      "id": 9,
      "title": "nesciunt iure omnis dolorem tempora et accusantium",
      "body": "consectetur animi nesciunt iure dolore\nenim quia ad\nveniam autem ut quam aut nobis\net est aut quod aut provident voluptas autem voluptas"
    },
    {
      "userId": 1,
      "id": 10,
      "title": "optio molestias id quia eum",
      "body": "quo et expedita modi cum officia vel magni\ndoloribus qui repudiandae\nvero nisi sit\nquos veniam quod sed accusamus veritatis error"
    },
    {
      "userId": 2,
      "id": 11,
      "title": "et ea vero quia laudantium autem",
      "body": "delectus reiciendis molestiae occaecati non minima eveniet qui voluptatibus\naccusamus in eum beatae sit\nvel qui neque voluptates ut commodi qui incidunt\nut animi commodi"
    },
    {
      "userId": 2,
      "id": 12,
      "title": "in quibusdam tempore odit est dolorem",
      "body": "itaque id aut magnam\npraesentium quia et ea odit et ea voluptas et\nsapiente quia nihil amet occaecati quia id voluptatem\nincidunt ea est distinctio odio"
    },
    {
      "userId": 2,
      "id": 13,
      "title": "dolorum ut in voluptas mollitia et saepe quo animi",
      "body": "aut dicta possimus sint mollitia voluptas commodi quo doloremque\niste corrupti reiciendis voluptatem eius rerum\nsit cumque quod eligendi laborum minima\nperferendis recusandae assumenda consectetur porro architecto ipsum ipsam"
    },
    {
      "userId": 2,
      "id": 14,
      "title": "voluptatem eligendi optio",
      "body": "fuga et accusamus dolorum perferendis illo voluptas\nnon doloremque neque facere\nad qui dolorum molestiae beatae\nsed aut voluptas totam sit illum"
    },
    {
      "userId": 2,
      "id": 15,
      "title": "eveniet quod temporibus",
      "body": "reprehenderit quos placeat\nvelit minima officia dolores impedit repudiandae molestiae nam\nvoluptas recusandae quis delectus\nofficiis harum fugiat vitae"
    },
    {
      "userId": 2,
      "id": 16,
      "title": "sint suscipit perspiciatis velit dolorum rerum ipsa laboriosam odio",
      "body": "suscipit nam nisi quo aperiam aut\nasperiores eos fugit maiores voluptatibus quia\nvoluptatem quis ullam qui in alias quia est\nconsequatur magni mollitia accusamus ea nisi voluptate dicta"
    },
    {
      "userId": 2,
      "id": 17,
      "title": "fugit voluptas sed molestias voluptatem provident",
      "body": "eos voluptas et aut odit natus earum\naspernatur fuga molestiae ullam\ndeserunt ratione qui eos\nqui nihil ratione nemo velit ut aut id quo"
    },
    {
      "userId": 2,
      "id": 18,
      "title": "voluptate et itaque vero tempora molestiae",
      "body": "eveniet quo quis\nlaborum totam consequatur non dolor\nut et est repudiandae\nest voluptatem vel debitis et magnam"
    },
    {
      "userId": 2,
      "id": 19,
      "title": "adipisci placeat illum aut reiciendis qui",
      "body": "illum quis cupiditate provident sit magnam\nea sed aut omnis\nveniam maiores ullam consequatur atque\nadipisci quo iste expedita sit quos voluptas"
    },
    {
      "userId": 2,
      "id": 20,
      "title": "doloribus ad provident suscipit at",
      "body": "qui consequuntur ducimus possimus quisquam amet similique\nsuscipit porro ipsam amet\neos veritatis officiis exercitationem vel fugit aut necessitatibus totam\nomnis rerum consequatur expedita quidem cumque explicabo"
    },
    {
      "userId": 3,
      "id": 21,
      "title": "asperiores ea ipsam voluptatibus modi minima quia sint",
      "body": "repellat aliquid praesentium dolorem quo\nsed totam minus non itaque\nnihil labore molestiae sunt dolor eveniet hic recusandae veniam\ntempora et tenetur expedita sunt"
    },
    {
      "userId": 3,
      "id": 22,
      "title": "dolor sint quo a velit explicabo quia nam",
      "body": "eos qui et ipsum ipsam suscipit aut\nsed omnis non odio\nexpedita earum mollitia molestiae aut atque rem suscipit\nnam impedit esse"
    },
    {
      "userId": 3,
      "id": 23,
      "title": "maxime id vitae nihil numquam",
      "body": "veritatis unde neque eligendi\nquae quod architecto quo neque vitae\nest illo sit tempora doloremque fugit quod\net et vel beatae sequi ullam sed tenetur perspiciatis"
    },
    {
      "userId": 3,
      "id": 24,
      "title": "autem hic labore sunt dolores incidunt",
      "body": "enim et ex nulla\nomnis voluptas quia qui\nvoluptatem consequatur numquam aliquam sunt\ntotam recusandae id dignissimos aut sed asperiores deserunt"
    },
    {
      "userId": 3,
      "id": 25,
      "title": "rem alias distinctio quo quis",
      "body": "ullam consequatur ut\nomnis quis sit vel consequuntur\nipsa eligendi ipsum molestiae et omnis error nostrum\nmolestiae illo tempore quia et distinctio"
    },
    {
      "userId": 3,
      "id": 26,
      "title": "est et quae odit qui non",
      "body": "similique esse doloribus nihil accusamus\nomnis dolorem fuga consequuntur reprehenderit fugit recusandae temporibus\nperspiciatis cum ut laudantium\nomnis aut molestiae vel vero"
    },
    {
      "userId": 3,
      "id": 27,
      "title": "quasi id et eos tenetur aut quo autem",
      "body": "eum sed dolores ipsam sint possimus debitis occaecati\ndebitis qui qui et\nut placeat enim earum aut odit facilis\nconsequatur suscipit necessitatibus rerum sed inventore temporibus consequatur"
    },
    {
      "userId": 3,
      "id": 28,
      "title": "delectus ullam et corporis nulla voluptas sequi",
      "body": "non et quaerat ex quae ad maiores\nmaiores recusandae totam aut blanditiis mollitia quas illo\nut voluptatibus voluptatem\nsimilique nostrum eum"
    },
    {
      "userId": 3,
      "id": 29,
      "title": "iusto eius quod necessitatibus culpa ea",
      "body": "odit magnam ut saepe sed non qui\ntempora atque nihil\naccusamus illum doloribus illo dolor\neligendi repudiandae odit magni similique sed cum maiores"
    },
    {
      "userId": 3,
      "id": 30,
      "title": "a quo magni similique perferendis",
      "body": "alias dolor cumque\nimpedit blanditiis non eveniet odio maxime\nblanditiis amet eius quis tempora quia autem rem\na provident perspiciatis quia"
    },
    {
      "userId": 4,
      "id": 31,
      "title": "ullam ut quidem id aut vel consequuntur",
      "body": "debitis eius sed quibusdam non quis consectetur vitae\nimpedit ut qui consequatur sed aut in\nquidem sit nostrum et maiores adipisci atque\nquaerat voluptatem adipisci repudiandae"
    },
    {
      "userId": 4,
      "id": 32,
      "title": "doloremque illum aliquid sunt",
      "body": "deserunt eos nobis asperiores et hic\nest debitis repellat molestiae optio\nnihil ratione ut eos beatae quibusdam distinctio maiores\nearum voluptates et aut adipisci ea maiores voluptas maxime"
    },
    {
      "userId": 4,
      "id": 33,
      "title": "qui explicabo molestiae dolorem",
      "body": "rerum ut et numquam laborum odit est sit\nid qui sint in\nquasi tenetur tempore aperiam et quaerat qui in\nrerum officiis sequi cumque quod"
    },
    {
      "userId": 4,
      "id": 34,
      "title": "magnam ut rerum iure",
      "body": "ea velit perferendis earum ut voluptatem voluptate itaque iusto\ntotam pariatur in\nnemo voluptatem voluptatem autem magni tempora minima in\nest distinctio qui assumenda accusamus dignissimos officia nesciunt nobis"
    },
    {
      "userId": 4,
      "id": 35,
      "title": "id nihil consequatur molestias animi provident",
      "body": "nisi error delectus possimus ut eligendi vitae\nplaceat eos harum cupiditate facilis reprehenderit voluptatem beatae\nmodi ducimus quo illum voluptas eligendi\net nobis quia fugit"
    },
    {
      "userId": 4,
      "id": 36,
      "title": "fuga nam accusamus voluptas reiciendis itaque",
      "body": "ad mollitia et omnis minus architecto odit\nvoluptas doloremque maxime aut non ipsa qui alias veniam\nblanditiis culpa aut quia nihil cumque facere et occaecati\nqui aspernatur quia eaque ut aperiam inventore"
    },
    {
      "userId": 4,
      "id": 37,
      "title": "provident vel ut sit ratione est",
      "body": "debitis et eaque non officia sed nesciunt pariatur vel\nvoluptatem iste vero et ea\nnumquam aut expedita ipsum nulla in\nvoluptates omnis consequatur aut enim officiis in quam qui"
    },
    {
      "userId": 4,
      "id": 38,
      "title": "explicabo et eos deleniti nostrum ab id repellendus",
      "body": "animi esse sit aut sit nesciunt assumenda eum voluptas\nquia voluptatibus provident quia necessitatibus ea\nrerum repudiandae quia voluptatem delectus fugit aut id quia\nratione optio eos iusto veniam iure"
    },
    {
      "userId": 4,
      "id": 39,
      "title": "eos dolorem iste accusantium est eaque quam",
      "body": "corporis rerum ducimus vel eum accusantium\nmaxime aspernatur a porro possimus iste omnis\nest in deleniti asperiores fuga aut\nvoluptas sapiente vel dolore minus voluptatem incidunt ex"
    },
    {
      "userId": 4,
      "id": 40,
      "title": "enim quo cumque",
      "body": "ut voluptatum aliquid illo tenetur nemo sequi quo facilis\nipsum rem optio mollitia quas\nvoluptatem eum voluptas qui\nunde omnis voluptatem iure quasi maxime voluptas nam"
    },
    {
      "userId": 5,
      "id": 41,
      "title": "non est facere",
      "body": "molestias id nostrum\nexcepturi molestiae dolore omnis repellendus quaerat saepe\nconsectetur iste quaerat tenetur asperiores accusamus ex ut\nnam quidem est ducimus sunt debitis saepe"
    },
    {
      "userId": 5,
      "id": 42,
      "title": "commodi ullam sint et excepturi error explicabo praesentium voluptas",
      "body": "odio fugit voluptatum ducimus earum autem est incidunt voluptatem\nodit reiciendis aliquam sunt sequi nulla dolorem\nnon facere repellendus voluptates quia\nratione harum vitae ut"
    },
    {
      "userId": 5,
      "id": 43,
      "title": "eligendi iste nostrum consequuntur adipisci praesentium sit beatae perferendis",
      "body": "similique fugit est\nillum et dolorum harum et voluptate eaque quidem\nexercitationem quos nam commodi possimus cum odio nihil nulla\ndolorum exercitationem magnam ex et a et distinctio debitis"
    },
    {
      "userId": 5,
      "id": 44,
      "title": "optio dolor molestias sit",
      "body": "temporibus est consectetur dolore\net libero debitis vel velit laboriosam quia\nipsum quibusdam qui itaque fuga rem aut\nea et iure quam sed maxime ut distinctio quae"
    },
    {
      "userId": 5,
      "id": 45,
      "title": "ut numquam possimus omnis eius suscipit laudantium iure",
      "body": "est natus reiciendis nihil possimus aut provident\nex et dolor\nrepellat pariatur est\nnobis rerum repellendus dolorem autem"
    },
    {
      "userId": 5,
      "id": 46,
      "title": "aut quo modi neque nostrum ducimus",
      "body": "voluptatem quisquam iste\nvoluptatibus natus officiis facilis dolorem\nquis quas ipsam\nvel et voluptatum in aliquid"
    },
    {
      "userId": 5,
      "id": 47,
      "title": "quibusdam cumque rem aut deserunt",
      "body": "voluptatem assumenda ut qui ut cupiditate aut impedit veniam\noccaecati nemo illum voluptatem laudantium\nmolestiae beatae rerum ea iure soluta nostrum\neligendi et voluptate"
    },
    {
      "userId": 5,
      "id": 48,
      "title": "ut voluptatem illum ea doloribus itaque eos",
      "body": "voluptates quo voluptatem facilis iure occaecati\nvel assumenda rerum officia et\nillum perspiciatis ab deleniti\nlaudantium repellat ad ut et autem reprehenderit"
    },
    {
      "userId": 5,
      "id": 49,
      "title": "laborum non sunt aut ut assumenda perspiciatis voluptas",
      "body": "inventore ab sint\nnatus fugit id nulla sequi architecto nihil quaerat\neos tenetur in in eum veritatis non\nquibusdam officiis aspernatur cumque aut commodi aut"
    },
    {
      "userId": 5,
      "id": 50,
      "title": "repellendus qui recusandae incidunt voluptates tenetur qui omnis exercitationem",
      "body": "error suscipit maxime adipisci consequuntur recusandae\nvoluptas eligendi et est et voluptates\nquia distinctio ab amet quaerat molestiae et vitae\nadipisci impedit sequi nesciunt quis consectetur"
    },
    {
      "userId": 6,
      "id": 51,
      "title": "soluta aliquam aperiam consequatur illo quis voluptas",
      "body": "sunt dolores aut doloribus\ndolore doloribus voluptates tempora et\ndoloremque et quo\ncum asperiores sit consectetur dolorem"
    },
    {
      "userId": 6,
      "id": 52,
      "title": "qui enim et consequuntur quia animi quis voluptate quibusdam",
      "body": "iusto est quibusdam fuga quas quaerat molestias\na enim ut sit accusamus enim\ntemporibus iusto accusantium provident architecto\nsoluta esse reprehenderit qui laborum"
    },
    {
      "userId": 6,
      "id": 53,
      "title": "ut quo aut ducimus alias",
      "body": "minima harum praesentium eum rerum illo dolore\nquasi exercitationem rerum nam\nporro quis neque quo\nconsequatur minus dolor quidem veritatis sunt non explicabo similique"
    },
    {
      "userId": 6,
      "id": 54,
      "title": "sit asperiores ipsam eveniet odio non quia",
      "body": "totam corporis dignissimos\nvitae dolorem ut occaecati accusamus\nex velit deserunt\net exercitationem vero incidunt corrupti mollitia"
    },
    {
      "userId": 6,
      "id": 55,
      "title": "sit vel voluptatem et non libero",
      "body": "debitis excepturi ea perferendis harum libero optio\neos accusamus cum fuga ut sapiente repudiandae\net ut incidunt omnis molestiae\nnihil ut eum odit"
    },
    {
      "userId": 6,
      "id": 56,
      "title": "qui et at rerum necessitatibus",
      "body": "aut est omnis dolores\nneque rerum quod ea rerum velit pariatur beatae excepturi\net provident voluptas corrupti\ncorporis harum reprehenderit dolores eligendi"
    },
    {
      "userId": 6,
      "id": 57,
      "title": "sed ab est est",
      "body": "at pariatur consequuntur earum quidem\nquo est laudantium soluta voluptatem\nqui ullam et est\net cum voluptas voluptatum repellat est"
    },
    {
      "userId": 6,
      "id": 58,
      "title": "voluptatum itaque dolores nisi et quasi",
      "body": "veniam voluptatum quae adipisci id\net id quia eos ad et dolorem\naliquam quo nisi sunt eos impedit error\nad similique veniam"
    },
    {
      "userId": 6,
      "id": 59,
      "title": "qui commodi dolor at maiores et quis id accusantium",
      "body": "perspiciatis et quam ea autem temporibus non voluptatibus qui\nbeatae a earum officia nesciunt dolores suscipit voluptas et\nanimi doloribus cum rerum quas et magni\net hic ut ut commodi expedita sunt"
    },
    {
      "userId": 6,
      "id": 60,
      "title": "consequatur placeat omnis quisquam quia reprehenderit fugit veritatis facere",
      "body": "asperiores sunt ab assumenda cumque modi velit\nqui esse omnis\nvoluptate et fuga perferendis voluptas\nillo ratione amet aut et omnis"
    },
    {
      "userId": 7,
      "id": 61,
      "title": "voluptatem doloribus consectetur est ut ducimus",
      "body": "ab nemo optio odio\ndelectus tenetur corporis similique nobis repellendus rerum omnis facilis\nvero blanditiis debitis in nesciunt doloribus dicta dolores\nmagnam minus velit"
    },
    {
      "userId": 7,
      "id": 62,
      "title": "beatae enim quia vel",
      "body": "enim aspernatur illo distinctio quae praesentium\nbeatae alias amet delectus qui voluptate distinctio\nodit sint accusantium autem omnis\nquo molestiae omnis ea eveniet optio"
    },
    {
      "userId": 7,
      "id": 63,
      "title": "voluptas blanditiis repellendus animi ducimus error sapiente et suscipit",
      "body": "enim adipisci aspernatur nemo\nnumquam omnis facere dolorem dolor ex quis temporibus incidunt\nab delectus culpa quo reprehenderit blanditiis asperiores\naccusantium ut quam in voluptatibus voluptas ipsam dicta"
    },
    {
      "userId": 7,
      "id": 64,
      "title": "et fugit quas eum in in aperiam quod",
      "body": "id velit blanditiis\neum ea voluptatem\nmolestiae sint occaecati est eos perspiciatis\nincidunt a error provident eaque aut aut qui"
    },
    {
      "userId": 7,
      "id": 65,
      "title": "consequatur id enim sunt et et",
      "body": "voluptatibus ex esse\nsint explicabo est aliquid cumque adipisci fuga repellat labore\nmolestiae corrupti ex saepe at asperiores et perferendis\nnatus id esse incidunt pariatur"
    },
    {
      "userId": 7,
      "id": 66,
      "title": "repudiandae ea animi iusto",
      "body": "officia veritatis tenetur vero qui itaque\nsint non ratione\nsed et ut asperiores iusto eos molestiae nostrum\nveritatis quibusdam et nemo iusto saepe"
    },
    {
      "userId": 7,
      "id": 67,
      "title": "aliquid eos sed fuga est maxime repellendus",
      "body": "reprehenderit id nostrum\nvoluptas doloremque pariatur sint et accusantium quia quod aspernatur\net fugiat amet\nnon sapiente et consequatur necessitatibus molestiae"
    },
    {
      "userId": 7,
      "id": 68,
      "title": "odio quis facere architecto reiciendis optio",
      "body": "magnam molestiae perferendis quisquam\nqui cum reiciendis\nquaerat animi amet hic inventore\nea quia deleniti quidem saepe porro velit"
    },
    {
      "userId": 7,
      "id": 69,
      "title": "fugiat quod pariatur odit minima",
      "body": "officiis error culpa consequatur modi asperiores et\ndolorum assumenda voluptas et vel qui aut vel rerum\nvoluptatum quisquam perspiciatis quia rerum consequatur totam quas\nsequi commodi repudiandae asperiores et saepe a"
    },
    {
      "userId": 7,
      "id": 70,
      "title": "voluptatem laborum magni",
      "body": "sunt repellendus quae\nest asperiores aut deleniti esse accusamus repellendus quia aut\nquia dolorem unde\neum tempora esse dolore"
    },
    {
      "userId": 8,
      "id": 71,
      "title": "et iusto veniam et illum aut fuga",
      "body": "occaecati a doloribus\niste saepe consectetur placeat eum voluptate dolorem et\nqui quo quia voluptas\nrerum ut id enim velit est perferendis"
    },
    {
      "userId": 8,
      "id": 72,
      "title": "sint hic doloribus consequatur eos non id",
      "body": "quam occaecati qui deleniti consectetur\nconsequatur aut facere quas exercitationem aliquam hic voluptas\nneque id sunt ut aut accusamus\nsunt consectetur expedita inventore velit"
    },
    {
      "userId": 8,
      "id": 73,
      "title": "consequuntur deleniti eos quia temporibus ab aliquid at",
      "body": "voluptatem cumque tenetur consequatur expedita ipsum nemo quia explicabo\naut eum minima consequatur\ntempore cumque quae est et\net in consequuntur voluptatem voluptates aut"
    },
    {
      "userId": 8,
      "id": 74,
      "title": "enim unde ratione doloribus quas enim ut sit sapiente",
      "body": "odit qui et et necessitatibus sint veniam\nmollitia amet doloremque molestiae commodi similique magnam et quam\nblanditiis est itaque\nquo et tenetur ratione occaecati molestiae tempora"
    },
    {
      "userId": 8,
      "id": 75,
      "title": "dignissimos eum dolor ut enim et delectus in",
      "body": "commodi non non omnis et voluptas sit\nautem aut nobis magnam et sapiente voluptatem\net laborum repellat qui delectus facilis temporibus\nrerum amet et nemo voluptate expedita adipisci error dolorem"
    },
    {
      "userId": 8,
      "id": 76,
      "title": "doloremque officiis ad et non perferendis",
      "body": "ut animi facere\ntotam iusto tempore\nmolestiae eum aut et dolorem aperiam\nquaerat recusandae totam odio"
    },
    {
      "userId": 8,
      "id": 77,
      "title": "necessitatibus quasi exercitationem odio",
      "body": "modi ut in nulla repudiandae dolorum nostrum eos\naut consequatur omnis\nut incidunt est omnis iste et quam\nvoluptates sapiente aliquam asperiores nobis amet corrupti repudiandae provident"
    },
    {
      "userId": 8,
      "id": 78,
      "title": "quam voluptatibus rerum veritatis",
      "body": "nobis facilis odit tempore cupiditate quia\nassumenda doloribus rerum qui ea\nillum et qui totam\naut veniam repellendus"
    },
    {
      "userId": 8,
      "id": 79,
      "title": "pariatur consequatur quia magnam autem omnis non amet",
      "body": "libero accusantium et et facere incidunt sit dolorem\nnon excepturi qui quia sed laudantium\nquisquam molestiae ducimus est\nofficiis esse molestiae iste et quos"
    },
    {
      "userId": 8,
      "id": 80,
      "title": "labore in ex et explicabo corporis aut quas",
      "body": "ex quod dolorem ea eum iure qui provident amet\nquia qui facere excepturi et repudiandae\nasperiores molestias provident\nminus incidunt vero fugit rerum sint sunt excepturi provident"
    },
    {
      "userId": 9,
      "id": 81,
      "title": "tempora rem veritatis voluptas quo dolores vero",
      "body": "facere qui nesciunt est voluptatum voluptatem nisi\nsequi eligendi necessitatibus ea at rerum itaque\nharum non ratione velit laboriosam quis consequuntur\nex officiis minima doloremque voluptas ut aut"
    },
    {
      "userId": 9,
      "id": 82,
      "title": "laudantium voluptate suscipit sunt enim enim",
      "body": "ut libero sit aut totam inventore sunt\nporro sint qui sunt molestiae\nconsequatur cupiditate qui iste ducimus adipisci\ndolor enim assumenda soluta laboriosam amet iste delectus hic"
    },
    {
      "userId": 9,
      "id": 83,
      "title": "odit et voluptates doloribus alias odio et",
      "body": "est molestiae facilis quis tempora numquam nihil qui\nvoluptate sapiente consequatur est qui\nnecessitatibus autem aut ipsa aperiam modi dolore numquam\nreprehenderit eius rem quibusdam"
    },
    {
      "userId": 9,
      "id": 84,
      "title": "optio ipsam molestias necessitatibus occaecati facilis veritatis dolores aut",
      "body": "sint molestiae magni a et quos\neaque et quasi\nut rerum debitis similique veniam\nrecusandae dignissimos dolor incidunt consequatur odio"
    },
    {
      "userId": 9,
      "id": 85,
      "title": "dolore veritatis porro provident adipisci blanditiis et sunt",
      "body": "similique sed nisi voluptas iusto omnis\nmollitia et quo\nassumenda suscipit officia magnam sint sed tempora\nenim provident pariatur praesentium atque animi amet ratione"
    },
    {
      "userId": 9,
      "id": 86,
      "title": "placeat quia et porro iste",
      "body": "quasi excepturi consequatur iste autem temporibus sed molestiae beatae\net quaerat et esse ut\nvoluptatem occaecati et vel explicabo autem\nasperiores pariatur deserunt optio"
    },
    {
      "userId": 9,
      "id": 87,
      "title": "nostrum quis quasi placeat",
      "body": "eos et molestiae\nnesciunt ut a\ndolores perspiciatis repellendus repellat aliquid\nmagnam sint rem ipsum est"
    },
    {
      "userId": 9,
      "id": 88,
      "title": "sapiente omnis fugit eos",
      "body": "consequatur omnis est praesentium\nducimus non iste\nneque hic deserunt\nvoluptatibus veniam cum et rerum sed"
    },
    {
      "userId": 9,
      "id": 89,
      "title": "sint soluta et vel magnam aut ut sed qui",
      "body": "repellat aut aperiam totam temporibus autem et\narchitecto magnam ut\nconsequatur qui cupiditate rerum quia soluta dignissimos nihil iure\ntempore quas est"
    },
    {
      "userId": 9,
      "id": 90,
      "title": "ad iusto omnis odit dolor voluptatibus",
      "body": "minus omnis soluta quia\nqui sed adipisci voluptates illum ipsam voluptatem\neligendi officia ut in\neos soluta similique molestias praesentium blanditiis"
    },
    {
      "userId": 10,
      "id": 91,
      "title": "aut amet sed",
      "body": "libero voluptate eveniet aperiam sed\nsunt placeat suscipit molestias\nsimilique fugit nam natus\nexpedita consequatur consequatur dolores quia eos et placeat"
    },
    {
      "userId": 10,
      "id": 92,
      "title": "ratione ex tenetur perferendis",
      "body": "aut et excepturi dicta laudantium sint rerum nihil\nlaudantium et at\na neque minima officia et similique libero et\ncommodi voluptate qui"
    },
    {
      "userId": 10,
      "id": 93,
      "title": "beatae soluta recusandae",
      "body": "dolorem quibusdam ducimus consequuntur dicta aut quo laboriosam\nvoluptatem quis enim recusandae ut sed sunt\nnostrum est odit totam\nsit error sed sunt eveniet provident qui nulla"
    },
    {
      "userId": 10,
      "id": 94,
      "title": "qui qui voluptates illo iste minima",
      "body": "aspernatur expedita soluta quo ab ut similique\nexpedita dolores amet\nsed temporibus distinctio magnam saepe deleniti\nomnis facilis nam ipsum natus sint similique omnis"
    },
    {
      "userId": 10,
      "id": 95,
      "title": "id minus libero illum nam ad officiis",
      "body": "earum voluptatem facere provident blanditiis velit laboriosam\npariatur accusamus odio saepe\ncumque dolor qui a dicta ab doloribus consequatur omnis\ncorporis cupiditate eaque assumenda ad nesciunt"
    },
    {
      "userId": 10,
      "id": 96,
      "title": "quaerat velit veniam amet cupiditate aut numquam ut sequi",
      "body": "in non odio excepturi sint eum\nlabore voluptates vitae quia qui et\ninventore itaque rerum\nveniam non exercitationem delectus aut"
    },
    {
      "userId": 10,
      "id": 97,
      "title": "quas fugiat ut perspiciatis vero provident",
      "body": "eum non blanditiis soluta porro quibusdam voluptas\nvel voluptatem qui placeat dolores qui velit aut\nvel inventore aut cumque culpa explicabo aliquid at\nperspiciatis est et voluptatem dignissimos dolor itaque sit nam"
    },
    {
      "userId": 10,
      "id": 98,
      "title": "laboriosam dolor voluptates",
      "body": "doloremque ex facilis sit sint culpa\nsoluta assumenda eligendi non ut eius\nsequi ducimus vel quasi\nveritatis est dolores"
    },
    {
      "userId": 10,
      "id": 99,
      "title": "temporibus sit alias delectus eligendi possimus magni",
      "body": "quo deleniti praesentium dicta non quod\naut est molestias\nmolestias et officia quis nihil\nitaque dolorem quia"
    },
    {
      "userId": 10,
      "id": 100,
      "title": "at nam consequatur ea labore ea harum",
      "body": "cupiditate quo est a modi nesciunt soluta\nipsa voluptas error itaque dicta in\nautem qui minus magnam et distinctio eum\naccusamus ratione error aut"
    }
  ]

  var paletaColors={
	"success": true,
	"result": {
		"result": "0",
		"resultDescription": "Operación exitosa.",
		"Colores": {
			"Operarios": {
				"Operario": [{
					"ID_StatusOp": "1",
					"Descripcion": "DISPONIBLE",
					"Value": "#5cbc5c"
				}, {
					"ID_StatusOp": "2",
					"Descripcion": "OCUPADO",
					"Value": "#f02d4f"
				}, {
					"ID_StatusOp": "3",
					"Descripcion": "DIA LIBRE",
					"Value": "#b8b5b6"
				}, {
					"ID_StatusOp": "4",
					"Descripcion": "EN COMIDA",
					"Value": "#ed7d00"
				}, {
					"ID_StatusOp": "5",
					"Descripcion": "VACACIONES",
					"Value": "#0f87ff"
				}, {
					"ID_StatusOp": "6",
					"Descripcion": "EN ALMACEN",
					"Value": "#9c24b4"
				}, {
					"ID_StatusOp": "7",
					"Descripcion": "FUERA DE SERVICIO",
					"Value": "#242425"
				}, {
					"ID_StatusOp": "8",
					"Descripcion": "APOYO TECNICO",
					"Value": "#4f688a"
				}, {
					"ID_StatusOp": "9",
					"Descripcion": "INCAPACIDAD",
					"Value": "#0f87ff"
				}]
			},
			"OTs": {
				"Intervenciones": {
					"Color": [{
						"ID_Intervencion": "48",
						"Descripcion": "INSTALACIÓN",
						"Value": "#C1CF00",
						"OverValue": "#C1CF00"
					}, {
						"ID_Intervencion": "55",
						"Descripcion": "SOPORTE",
						"Value": "#EA4C31",
						"OverValue": "#EA4C31"
					}, {
						"ID_Intervencion": "65",
						"Descripcion": "ADDONS",
						"Value": "#FEB431",
						"OverValue": "#FEB431"
					}, {
						"ID_Intervencion": "95",
						"Descripcion": "INSTALACION TP SOLUCIONES",
						"Value": "#995EA2",
						"OverValue": "#995EA2"
					}, {
						"ID_Intervencion": "106",
						"Descripcion": "RENOVACION",
						"Value": "#054AA5",
						"OverValue": "#054AA5"
					}, {
						"ID_Intervencion": "108",
						"Descripcion": "REUBICACION",
						"Value": "#DC0165",
						"OverValue": "#DC0165"
					}, {
						"ID_Intervencion": "112",
						"Descripcion": "SOPORTE DE MANTENIMIENTO",
						"Value": "#c88624",
						"OverValue": "#ebc893"
					}, {
						"ID_Intervencion": "113",
						"Descripcion": "AUDITORIA",
						"Value": "#ff66cc",
						"OverValue": "#ff66cc"
					}, {
						"ID_Intervencion": "122",
						"Descripcion": "INSTALACION ESPECIAL",
						"Value": "#c88624",
						"OverValue": "#c88624"
					}, {
						"ID_Intervencion": "141",
						"Descripcion": "UNIVERSAL",
						"Value": "#298A08",
						"OverValue": "#298A08"
					}, {
						"ID_Intervencion": "141",
						"Descripcion": "UNIVERSAL",
						"Value": "#298A08",
						"OverValue": "#298A08"
					}, {
						"ID_Intervencion": "163",
						"Descripcion": "IMPLEMENTACION",
						"Value": "#404AF4",
						"OverValue": "#404AF4"
					}, {
						"ID_Intervencion": "214",
						"Descripcion": "RECOLECCION",
						"Value": "#ffc0cb",
						"OverValue": "#ffc0cb"
					}, {
						"ID_Intervencion": "255",
						"Descripcion": "ENTREGA DE EQUIPOS",
						"Value": "#F8C471",
						"OverValue": "#F8C471"
					}, {
						"ID_Intervencion": "256",
						"Descripcion": "REUBICACION",
						"Value": "#A18E71",
						"OverValue": "#A18E71"
					}, {
						"ID_Intervencion": "257",
						"Descripcion": "CAMBIO DE DOMICILIO",
						"Value": "#8671A1",
						"OverValue": "#8671A1"
					}, {
						"ID_Intervencion": "258",
						"Descripcion": "SOPORTES SERVICE DESK",
						"Value": "#8671A1",
						"OverValue": "#8671A1"
					}, {
						"ID_Intervencion": "259",
						"Descripcion": "POSTVENTA",
						"Value": "#8671A1",
						"OverValue": "#8671A1"
					}, {
						"ID_Intervencion": "260",
						"Descripcion": "APOYO A VENTAS",
						"Value": "#8671A1",
						"OverValue": "#8671A1"
					}, {
						"ID_Intervencion": "261",
						"Descripcion": "INSTALACION UN",
						"Value": "#8671A1",
						"OverValue": "#8671A1"
					}, {
						"ID_Intervencion": "262",
						"Descripcion": "SERVICIOS ADMINISTRADOS",
						"Value": "#8671A1",
						"OverValue": "#8671A1"
					}, {
						"ID_Intervencion": "263",
						"Descripcion": "INFRAESTRUCTURA",
						"Value": "#8671A1",
						"OverValue": "#8671A1"
					}, {
						"ID_Intervencion": "264",
						"Descripcion": "SOPORTE RESIDENCIAL",
						"Value": "#8671A1",
						"OverValue": "#8671A1"
					}, {
						"ID_Intervencion": "265",
						"Descripcion": "SOLUCION A LA MEDIDA",
						"Value": "#8671A1",
						"OverValue": "#8671A1"
					}, {
						"ID_Intervencion": "274",
						"Descripcion": "SITE OWNER",
						"Value": "#8671A1",
						"OverValue": "#8671A1"
					}, {
						"ID_Intervencion": "275",
						"Descripcion": "PLANTA EXTERNA OU",
						"Value": "#8671A1",
						"OverValue": "#8671A1"
					}, {
						"ID_Intervencion": "276",
						"Descripcion": "ADECUACIONES",
						"Value": "#8671A1",
						"OverValue": "#8671A1"
					}, {
						"ID_Intervencion": "277",
						"Descripcion": "PLAZA COMERCIAL",
						"Value": "#8671A1",
						"OverValue": "#8671A1"
					}, {
						"ID_Intervencion": "278",
						"Descripcion": "OTROS",
						"Value": "#8671A1",
						"OverValue": "#8671A1"
					}]
				},
				"Status": {
					"Color": [{
						"ID_StatusOT": "3",
						"Descripcion": "DETENIDA",
						"Value": "#F02D4F",
						"OverValue": "#F08D9A"
					}, {
						"ID_StatusOT": "6",
						"Descripcion": "NO ASIGNADA",
						"Value": "#0050A1",
						"OverValue": "#416EA1"
					}, {
						"ID_StatusOT": "9",
						"Descripcion": "PROGRAMADA PERO NO INICIADA",
						"Value": "#1667B8",
						"OverValue": "#75B7FF"
					}, {
						"ID_StatusOT": "10",
						"Descripcion": "EN TRANSITO",
						"Value": "#03AD5C",
						"OverValue": "#53CF98"
					}, {
						"ID_StatusOT": "11",
						"Descripcion": "EN TRABAJO",
						"Value": "#783B78",
						"OverValue": "#DDBBDC"
					}, {
						"ID_StatusOT": "14",
						"Descripcion": "COMPLETA",
						"Value": "#7F7F7F",
						"OverValue": "#B8B8B8"
					}, {
						"ID_StatusOT": "18",
						"Descripcion": "CANCELADA",
						"Value": "#9C0752",
						"OverValue": "#EC5F9E"
					}, {
						"ID_StatusOT": "107",
						"Descripcion": "EN SITIO",
						"Value": "#83B9B6",
						"OverValue": "#7C9471"
					}, {
						"ID_StatusOT": "113",
						"Descripcion": "EN ESPERA",
						"Value": "#CD6F07",
						"OverValue": "#EDAC5F"
					}, {
						"ID_StatusOT": "207",
						"Descripcion": "VALIDACION DE CUENTA",
						"Value": "#EFCA52",
						"OverValue": "#EFCA52"
					}, {
						"ID_StatusOT": "230",
						"Descripcion": "INFRAESTRUCTURA PMP",
						"Value": "#F02D4F",
						"OverValue": "#F08D9A"
					}, {
						"ID_StatusOT": "319",
						"Descripcion": "CALENDARIZADO",
						"Value": "#5F9EA0",
						"OverValue": "#5F9EA0"
					}, {
						"ID_StatusOT": "342",
						"Descripcion": "GESTORÍA",
						"Value": "#E9967A",
						"OverValue": "#E9967A"
					}]
				}
			}
		}
	}
}

var arrayColors=[
    '#D32F2F',
    '#7B1FA2',
    '#303F9F',
    '#00796B',
    '#388E3C',
    '#455A64',
    '#795548',
    '#616161',
    '#0097A7'
]

var arrayhistorico=
[{
       "OT": "65880",
       "Descripcion": "OT CREADA DESDE SALESFORCE",
       "EstatusDescripcion": "PENDIENTE",
       "Id_Estado": "6",
       "EstadoDescripcion": "NO ASIGNADA",
       "Id_Motivo": "25",
       "MotivoDescripcion": "OT NUEVA",
       "Latitud": "19.304407430967913",
       "Longitud": "-99.20180785075684",
       "Id_Origen": "3",
       "OrigenDescripcion": "SALESFORCE",
       "Id_Operador": "4",
       "Nombre_Operador": "FFM SALESFORCE WEB",
       "FechaModificacion": "26/02/2020",
       "HoraModificacion": "18:07:56"
   }, {
       "OT": "65880",
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
       "FechaModificacion": "08/04/2020",
       "HoraModificacion": "16:29:08"
   }, {
       "OT": "65880",
       "Descripcion": "OT ASIGNADA DESDE FFM APP",
       "Id_Estatus": "2",
       "EstatusDescripcion": "ASIGNADA",
       "Id_Estado": "10",
       "EstadoDescripcion": "EN TRANSITO",
       "MotivoDescripcion": "-",
       "Latitud": "19.3340336",
       "Longitud": "-99.1985664",
       "Id_Origen": "1",
       "OrigenDescripcion": "FFM APP",
       "Id_Operador": "2661",
       "Nombre_Operador": "TECNICO FFM FFM",
       "FechaModificacion": "08/04/2020",
       "HoraModificacion": "18:30:21"
   }, {
       "OT": "65880",
       "Descripcion": "OT CREADA DESDE MAS",
       "Id_Estatus": "1",
       "EstatusDescripcion": "PENDIENTE",
       "Id_Estado": "7",
       "EstadoDescripcion": "REAGENDADA",
       "Id_Motivo": "376",
       "MotivoDescripcion": "REAGENDADA POR CALENDARIZACION VENCIDA",
       "Latitud": "1",
       "Longitud": "1",
       "Id_Origen": "5",
       "OrigenDescripcion": "MAS",
       "Id_Operador": "1",
       "Nombre_Operador": "FFM MIDDLEWARE SOA",
       "FechaModificacion": "30/03/2021",
       "HoraModificacion": "12:04:08"
   }, {
       "OT": "65880",
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
       "FechaModificacion": "04/06/2021",
       "HoraModificacion": "12:51:05"
   }]

var objectDetalleOT={"success":true,"result":{"result":"0","resultDescription":"Operación Exitosa","DatosGeneralesOT":{"OT":{"Paquete_instalar":"INTERNET 200 D","Id_ot":"65880","Status":"ASIGNADA","Num_cuenta":"0210005494","Nombre_cliente":"AQUAMATIC LAVANDERIA","Motivo":"ASIGNADO POR DESPACHO","Entre_calles":"NO ESPECIFICADO","Fecha_agenda":"04/06/2021","Estado":"PROGRAMADA PERO NO INICIADA","Referencias_urbanas":"NO ESPECIFICADO","Hora_agenda":"13:30","Folio_os":"OS-25737","Nombre_contacto":"LUIS QUINTERO BAUTISTA","Tipo_instervencion":"INSTALACIÓN","Subtipo_intervencion":"INSTALACIONES NUEVAS","Direccion_instalacion":"CIUDAD DE MEXICO, FUENTES DEL PEDREGAL, SAN FERNANDO 1, PERIFERICO SUR, CP: 14140","Telefono_empresa":"5588774455 EXT : NA","Telefono_contacto":"5544778855"}}}} 


  var alertas = 
  [{
	"Id_ot_pe": 80844,
	"IdOT": "66273",
	"LatitudAlerta": "19.278720",
	"Intervencion": "INSTALACI&Oacute;N",
	"idTecnico": "2661",
	"SubtipoAlerta": "FALTA DE CAPACIDAD PMP",
	"IdTipoOrden": "1",
	"TipoOrden": "OT PADRE",
	"Fecha_Registro": "27/05/2020",
	"NombreCliente": "PRUEBAS DETENCIONES FEBRERO-",
	"IdAlertaOT": "2428",
	"Direccion": "CALLE CALLE IGLESIA NO. 270A COL. LORETO Y CAMPAMENTO. CIUDAD DE MEXICO , SAN ANGEL",
	"LatitudTec": "19.3340149",
	"NombreTecnico": "TECNICO FFM FFM",
	"TelTecnico": "5577445566",
	"LongitudTec": "-99.1986144",
	"HexTiempoTrans": "#d83a31",
	"Id_Intervencion": "48",
	"ComentarioTecnico": "SE DETIENE ORDEN DE TRABAJO",
	"OrdenServicio": "OS-26734",
	"IdSubtipoAlerta": "88",
	"TipoDireccion": "CLIENTE",
	"LongitudAlerta": "-99.198364",
	"Hora_Registro": "10:12:05",
	"TiempoTranscurrido": "8888 Hrs",
	"Id_EstadoActual": 0,
	"Id_motivoActual_ot": 0,
	"idSubIntervencion": 0
}, {
	"Id_ot_pe": 0,
	"IdOT": "66169",
	"LatitudAlerta": "19.301282",
	"Intervencion": "INSTALACI&Oacute;N",
	"idTecnico": "2661",
	"SubtipoAlerta": "FALTA DE CAPACIDAD PMP",
	"IdTipoOrden": "1",
	"TipoOrden": "OT PADRE",
	"Fecha_Registro": "27/05/2020",
	"NombreCliente": "PRUEBAS DETENCIONES FEBRERO-",
	"IdAlertaOT": "2429",
	"Direccion": "CALLE CALLE IGLESIA NO. 270A COL. LORETO Y CAMPAMENTO. CIUDAD DE M&Eacute;XICO , SAN FERNANDO 3",
	"LatitudTec": "19.3340149",
	"NombreTecnico": "TECNICO FFM FFM",
	"TelTecnico": "5577445566",
	"LongitudTec": "-99.1986144",
	"HexTiempoTrans": "#d83a31",
	"Id_Intervencion": "48",
	"ComentarioTecnico": "SE DETIENE ORDEN DE TRABAJO",
	"OrdenServicio": "OS-26455",
	"IdSubtipoAlerta": "88",
	"TipoDireccion": "CLIENTE",
	"LongitudAlerta": "-99.232568",
	"Hora_Registro": "17:39:36",
	"TiempoTranscurrido": "8880 Hrs",
	"Id_EstadoActual": 0,
	"Id_motivoActual_ot": 0,
	"idSubIntervencion": 0
}, {
	"Id_ot_pe": 0,
	"IdOT": "66273",
	"LatitudAlerta": "19.278720",
	"Intervencion": "INSTALACI&Oacute;N",
	"idTecnico": "2661",
	"SubtipoAlerta": "FALTA DE CAPACIDAD PMP",
	"IdTipoOrden": "1",
	"TipoOrden": "OT PADRE",
	"Fecha_Registro": "27/05/2020",
	"NombreCliente": "PRUEBAS DETENCIONES FEBRERO-",
	"IdAlertaOT": "2428",
	"Direccion": "CALLE CALLE IGLESIA NO. 270A COL. LORETO Y CAMPAMENTO. CIUDAD DE MEXICO , SAN ANGEL",
	"LatitudTec": "19.3340149",
	"NombreTecnico": "TECNICO FFM FFM",
	"TelTecnico": "5577445566",
	"LongitudTec": "-99.1986144",
	"HexTiempoTrans": "#d83a31",
	"Id_Intervencion": "48",
	"ComentarioTecnico": "SE DETIENE ORDEN DE TRABAJO",
	"OrdenServicio": "OS-26734",
	"IdSubtipoAlerta": "88",
	"TipoDireccion": "CLIENTE",
	"LongitudAlerta": "-99.198364",
	"Hora_Registro": "10:12:05",
	"TiempoTranscurrido": "8888 Hrs",
	"Id_EstadoActual": 0,
	"Id_motivoActual_ot": 0,
	"idSubIntervencion": 0
}, {
	"Id_ot_pe": 0,
	"IdOT": "1000",
	"LatitudAlerta": "20.0937986530",
	"Intervencion": "SOPORTE",
	"idTecnico": "2661",
	"SubtipoAlerta": "NO HAY LINEA DE VISTA FRANCA PMP",
	"IdTipoOrden": "1",
	"TipoOrden": "OT PADRE",
	"Fecha_Registro": "14/10/2020",
	"NombreCliente": "TEST FFM ORDEN UNIVERSAL 2",
	"IdAlertaOT": "2743",
	"Direccion": "CALLE BARRANCA DEL MUERTO 2 NO. 2 COL. CREDITO CONSTRUCTOR. CIUDAD DE MEXICO , CIUDAD DE MEXICO",
	"LatitudTec": "19.3340149",
	"NombreTecnico": "TECNICO FFM FFM",
	"TelTecnico": "5577445566",
	"LongitudTec": "-99.1986144",
	"HexTiempoTrans": "#d83a31",
	"Id_Intervencion": "55",
	"ComentarioTecnico": "SE COMENTA QUE NO SE TIENE VECTOR ACTIVADO HACIA EL LADO DEL CLIENTE",
	"OrdenServicio": "OS-29310",
	"IdSubtipoAlerta": "89",
	"TipoDireccion": "CLIENTE",
	"LongitudAlerta": "-98.3583150663",
	"Hora_Registro": "19:45:06",
	"TiempoTranscurrido": "5518 Hrs",
	"Id_EstadoActual": 0,
	"Id_motivoActual_ot": 0,
	"idSubIntervencion": 0
}, {
	"Id_ot_pe": 0,
	"IdOT": "1000",
	"LatitudAlerta": "20.0937986530",
	"Intervencion": "SOPORTE",
	"idTecnico": "1001",
	"SubtipoAlerta": "NO HAY LINEA DE VISTA FRANCA PMP",
	"IdTipoOrden": "1",
	"TipoOrden": "OT PADRE",
	"Fecha_Registro": "14/10/2020",
	"NombreCliente": "TEST FFM ORDEN UNIVERSAL 2",
	"IdAlertaOT": "2742",
	"Direccion": "CALLE BARRANCA DEL MUERTO 2 NO. 2 COL. CREDITO CONSTRUCTOR. CIUDAD DE MEXICO , CIUDAD DE MEXICO",
	"LatitudTec": "19.3340436",
	"NombreTecnico": "INSTALADOR ADMINISTRADOR FFMTPE",
	"TelTecnico": "5553636382",
	"LongitudTec": "-99.1986971",
	"HexTiempoTrans": "#d83a31",
	"Id_Intervencion": "55",
	"ComentarioTecnico": "SE COMENTA QUE NO SE TIENE VECTOR ACTIVADO HACIA EL LADO DEL CLIENTE",
	"OrdenServicio": "OS-29310",
	"IdSubtipoAlerta": "89",
	"TipoDireccion": "CLIENTE",
	"LongitudAlerta": "-98.3583150663",
	"Hora_Registro": "19:44:00",
	"TiempoTranscurrido": "5518 Hrs",
	"Id_EstadoActual": 0,
	"Id_motivoActual_ot": 0,
	"idSubIntervencion": 0
}, {
	"Id_ot_pe": 0,
	"IdOT": "1000",
	"LatitudAlerta": "20.0937986530",
	"Intervencion": "SOPORTE",
	"idTecnico": "6",
	"SubtipoAlerta": "NO HAY LINEA DE VISTA FRANCA PMP",
	"IdTipoOrden": "1",
	"TipoOrden": "OT PADRE",
	"Fecha_Registro": "14/10/2020",
	"NombreCliente": "TEST FFM ORDEN UNIVERSAL 2",
	"IdAlertaOT": "2741",
	"Direccion": "CALLE BARRANCA DEL MUERTO 2 NO. 2 COL. CREDITO CONSTRUCTOR. CIUDAD DE MEXICO , CIUDAD DE MEXICO",
	"LatitudTec": "1.0",
	"NombreTecnico": "RICARDO HERNANDEZ MARTINEZ",
	"TelTecnico": "7715478596",
	"LongitudTec": "1.0",
	"HexTiempoTrans": "#d83a31",
	"Id_Intervencion": "55",
	"ComentarioTecnico": "SE COMENTA QUE NO SE TIENE VECTOR ACTIVADO HACIA EL LADO DEL CLIENTE",
	"OrdenServicio": "OS-29310",
	"IdSubtipoAlerta": "89",
	"TipoDireccion": "CLIENTE",
	"LongitudAlerta": "-98.3583150663",
	"Hora_Registro": "19:42:30",
	"TiempoTranscurrido": "5518 Hrs",
	"Id_EstadoActual": 0,
	"Id_motivoActual_ot": 0,
	"idSubIntervencion": 0
}, {
	"Id_ot_pe": 0,
	"IdOT": "66273",
	"LatitudAlerta": "19.27872",
	"Intervencion": "INSTALACI&Oacute;N",
	"idTecnico": "2661",
	"SubtipoAlerta": "DEVUELTA DE DETENCION",
	"IdTipoOrden": "1",
	"TipoOrden": "OT PADRE",
	"Fecha_Registro": "09/06/2020",
	"NombreCliente": "PRUEBAS DETENCIONES FEBRERO-",
	"IdAlertaOT": "2461",
	"Direccion": "CALLE CALLE IGLESIA NO. 270A COL. LORETO Y CAMPAMENTO. CIUDAD DE MEXICO , SAN ANGEL",
	"LatitudTec": "19.3340149",
	"NombreTecnico": "TECNICO FFM FFM",
	"TelTecnico": "5577445566",
	"LongitudTec": "-99.1986144",
	"HexTiempoTrans": "#d83a31",
	"Id_Intervencion": "48",
	"ComentarioTecnico": "OT DE DETENCION TERMINADA.",
	"OrdenServicio": "OS-26734",
	"IdSubtipoAlerta": "99",
	"TipoDireccion": "CLIENTE",
	"LongitudAlerta": "-99.198364",
	"Hora_Registro": "10:44:52",
	"TiempoTranscurrido": "8575 Hrs",
	"Id_EstadoActual": 0,
	"Id_motivoActual_ot": 0,
	"idSubIntervencion": 0
}, {
	"Id_ot_pe": 80844,
	"IdOT": "66273",
	"LatitudAlerta": "19.27872",
	"Intervencion": "INSTALACI&Oacute;N",
	"idTecnico": "2661",
	"SubtipoAlerta": "DEVUELTA DE DETENCION",
	"IdTipoOrden": "1",
	"TipoOrden": "OT PADRE",
	"Fecha_Registro": "09/06/2020",
	"NombreCliente": "PRUEBAS DETENCIONES FEBRERO-",
	"IdAlertaOT": "2461",
	"Direccion": "CALLE CALLE IGLESIA NO. 270A COL. LORETO Y CAMPAMENTO. CIUDAD DE MEXICO , SAN ANGEL",
	"LatitudTec": "19.3340149",
	"NombreTecnico": "TECNICO FFM FFM",
	"TelTecnico": "5577445566",
	"LongitudTec": "-99.1986144",
	"HexTiempoTrans": "#d83a31",
	"Id_Intervencion": "48",
	"ComentarioTecnico": "OT DE DETENCION TERMINADA.",
	"OrdenServicio": "OS-26734",
	"IdSubtipoAlerta": "99",
	"TipoDireccion": "CLIENTE",
	"LongitudAlerta": "-99.198364",
	"Hora_Registro": "10:44:52",
	"TiempoTranscurrido": "8575 Hrs",
	"Id_EstadoActual": 0,
	"Id_motivoActual_ot": 0,
	"idSubIntervencion": 0
}, {
	"Id_ot_pe": 80500,
	"IdOT": "65917",
	"LatitudAlerta": "19.3341577",
	"Intervencion": "INSTALACI&Oacute;N",
	"idTecnico": "1001",
	"SubtipoAlerta": "DEVUELTA DE DETENCION",
	"IdTipoOrden": "1",
	"TipoOrden": "OT PADRE",
	"Fecha_Registro": "05/03/2020",
	"NombreCliente": "PRUEBAS DETENCIONES FEBRERO-",
	"IdAlertaOT": "2150",
	"Direccion": "CALLE FRATERNIDAD NO. 4 COL. LORETO Y CAMPAMENTO. CIUDAD DE MEXICO , SAN ANGEL",
	"LatitudTec": "19.3340436",
	"NombreTecnico": "INSTALADOR ADMINISTRADOR FFMTPE",
	"TelTecnico": "5553636382",
	"LongitudTec": "-99.1986971",
	"HexTiempoTrans": "#d83a31",
	"Id_Intervencion": "48",
	"ComentarioTecnico": "OT DE DETENCION TERMINADA.",
	"OrdenServicio": "OS-25786",
	"IdSubtipoAlerta": "99",
	"TipoDireccion": "CLIENTE",
	"LongitudAlerta": "-99.1986562",
	"Hora_Registro": "19:17:16",
	"TiempoTranscurrido": "10871 Hrs",
	"Id_EstadoActual": 0,
	"Id_motivoActual_ot": 0,
	"idSubIntervencion": 0
}]


var comentariosAlerta = 
[{
	"FechaComentario": "05/05/2020",
	"Comentario": "ok",
	"Id_Origen": "3",
	"Origen": "SALESFORCE",
	"Id_Operario": "4",
	"Num_Empleado": "AGENTE_SF",
	"Nombre": "FFM",
	"ApellidoPaterno": "SALESFORCE",
	"ApellidoMaterno": "WEB",
	"NombreCompleto": "FFM SALESFORCE WEB"
}, {
	"FechaComentario": "20/05/2020",
	"Comentario": "FFM :: OK",
	"Id_Origen": "2",
	"Origen": "FFM WEB",
	"Id_Operario": "6",
	"Num_Empleado": "FFMENLACE",
	"Nombre": "RICARDO",
	"ApellidoPaterno": "HERNANDEZ",
	"ApellidoMaterno": "MARTINEZ",
	"NombreCompleto": "RICARDO HERNANDEZ MARTINEZ"
}, {
	"FechaComentario": "27/05/2020",
	"Comentario": "FFM : OT REAGENDADA DESDE SALESFORCE - OK",
	"Id_Origen": "3",
	"Origen": "SALESFORCE",
	"Id_Operario": "4",
	"Num_Empleado": "AGENTE_SF",
	"Nombre": "FFM",
	"ApellidoPaterno": "SALESFORCE",
	"ApellidoMaterno": "WEB",
	"NombreCompleto": "FFM SALESFORCE WEB"
}, {
	"FechaComentario": "27/05/2020",
	"Comentario": "FFM :: OK",
	"Id_Origen": "2",
	"Origen": "FFM WEB",
	"Id_Operario": "6",
	"Num_Empleado": "FFMENLACE",
	"Nombre": "RICARDO",
	"ApellidoPaterno": "HERNANDEZ",
	"ApellidoMaterno": "MARTINEZ",
	"NombreCompleto": "RICARDO HERNANDEZ MARTINEZ"
}, {
	"FechaComentario": "27/05/2020",
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
	"FechaComentario": "27/05/2020",
	"Comentario": "FFM : OT DESASIGNADA POR DESPACHO :  OK",
	"Id_Origen": "2",
	"Origen": "FFM WEB",
	"Id_Operario": "6",
	"Num_Empleado": "FFMENLACE",
	"Nombre": "RICARDO",
	"ApellidoPaterno": "HERNANDEZ",
	"ApellidoMaterno": "MARTINEZ",
	"NombreCompleto": "RICARDO HERNANDEZ MARTINEZ"
}, {
	"FechaComentario": "27/05/2020",
	"Comentario": "FFM :: OK",
	"Id_Origen": "2",
	"Origen": "FFM WEB",
	"Id_Operario": "6",
	"Num_Empleado": "FFMENLACE",
	"Nombre": "RICARDO",
	"ApellidoPaterno": "HERNANDEZ",
	"ApellidoMaterno": "MARTINEZ",
	"NombreCompleto": "RICARDO HERNANDEZ MARTINEZ"
}, {
	"FechaComentario": "27/05/2020",
	"Comentario": "FFM :: OK",
	"Id_Origen": "2",
	"Origen": "FFM WEB",
	"Id_Operario": "6",
	"Num_Empleado": "FFMENLACE",
	"Nombre": "RICARDO",
	"ApellidoPaterno": "HERNANDEZ",
	"ApellidoMaterno": "MARTINEZ",
	"NombreCompleto": "RICARDO HERNANDEZ MARTINEZ"
}, {
	"FechaComentario": "27/05/2020",
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
	"FechaComentario": "27/05/2020",
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
	"FechaComentario": "27/05/2020",
	"Comentario": "FFM : OT EN SITIO : ",
	"Id_Origen": "1",
	"Origen": "FFM APP",
	"Id_Operario": "2661",
	"Num_Empleado": "TECNICOFFM",
	"Nombre": "TECNICO",
	"ApellidoPaterno": "FFM",
	"ApellidoMaterno": "FFM",
	"NombreCompleto": "TECNICO FFM FFM"
}, {
	"FechaComentario": "27/05/2020",
	"Comentario": "FFM : OT EN TRABAJO : ",
	"Id_Origen": "1",
	"Origen": "FFM APP",
	"Id_Operario": "2661",
	"Num_Empleado": "TECNICOFFM",
	"Nombre": "TECNICO",
	"ApellidoPaterno": "FFM",
	"ApellidoMaterno": "FFM",
	"NombreCompleto": "TECNICO FFM FFM"
}, {
	"FechaComentario": "27/05/2020",
	"Comentario": "FFM : OT EN ESPERA : SE DETIENE ORDEN DE TRABAJO",
	"Id_Origen": "1",
	"Origen": "FFM APP",
	"Id_Operario": "2661",
	"Num_Empleado": "TECNICOFFM",
	"Nombre": "TECNICO",
	"ApellidoPaterno": "FFM",
	"ApellidoMaterno": "FFM",
	"NombreCompleto": "TECNICO FFM FFM"
}, {
	"FechaComentario": "27/05/2020",
	"Comentario": "FFM : OT EN ESPERA : SE DETIENE ORDEN DE TRABAJO",
	"Id_Origen": "1",
	"Origen": "FFM APP",
	"Id_Operario": "2661",
	"Num_Empleado": "TECNICOFFM",
	"Nombre": "TECNICO",
	"ApellidoPaterno": "FFM",
	"ApellidoMaterno": "FFM",
	"NombreCompleto": "TECNICO FFM FFM"
}, {
	"FechaComentario": "27/05/2020",
	"Comentario": "FFM - SE ENVIA ORDEN A BANDEJA CORRESPONDIENTE. :: OK",
	"Id_Origen": "2",
	"Origen": "FFM WEB",
	"Id_Operario": "6",
	"Num_Empleado": "FFMENLACE",
	"Nombre": "RICARDO",
	"ApellidoPaterno": "HERNANDEZ",
	"ApellidoMaterno": "MARTINEZ",
	"NombreCompleto": "RICARDO HERNANDEZ MARTINEZ"
}, {
	"FechaComentario": "05/08/2020",
	"Comentario": "FFM - SE CANCELA OT DESDE ALERTA DE &Aacute;REA RESOLUTORIA. :: OK",
	"Id_Origen": "2",
	"Origen": "FFM WEB",
	"Id_Operario": "6",
	"Num_Empleado": "FFMENLACE",
	"Nombre": "RICARDO",
	"ApellidoPaterno": "HERNANDEZ",
	"ApellidoMaterno": "MARTINEZ",
	"NombreCompleto": "RICARDO HERNANDEZ MARTINEZ"
}]

var historicoAlerta = 
[{
	"OT": "66169",
	"Descripcion": "OT CREADA DESDE SALESFORCE",
	"Id_Estatus": "1",
	"EstatusDescripcion": "PENDIENTE",
	"Id_Estado": "6",
	"EstadoDescripcion": "NO ASIGNADA",
	"Id_Motivo": "25",
	"MotivoDescripcion": "OT NUEVA",
	"Latitud": "19.267982620034285",
	"Longitud": "-99.20635095507811",
	"Id_Origen": "3",
	"OrigenDescripcion": "SALESFORCE",
	"Id_Operador": "4",
	"Nombre_Operador": "FFM SALESFORCE WEB",
	"FechaModificacion": "05/05/2020",
	"HoraModificacion": "11:53:21"
}, {
	"OT": "66169",
	"Descripcion": "OT CANCELADA DESDE FFM WEB",
	"Id_Estatus": "5",
	"EstatusDescripcion": "CANCELADA",
	"Id_Estado": "18",
	"EstadoDescripcion": "CANCELADA",
	"Id_Motivo": "396",
	"MotivoDescripcion": "DOMICILIO CERRADO",
	"Latitud": "19.4326",
	"Longitud": "-99.1332",
	"Id_Origen": "2",
	"OrigenDescripcion": "FFM WEB",
	"Id_Operador": "6",
	"Nombre_Operador": "RICARDO HERNANDEZ MARTINEZ",
	"FechaModificacion": "20/05/2020",
	"HoraModificacion": "13:58:10"
}, {
	"OT": "66169",
	"Descripcion": "OT CREADA DESDE SALESFORCE",
	"Id_Estatus": "1",
	"EstatusDescripcion": "PENDIENTE",
	"Id_Estado": "7",
	"EstadoDescripcion": "REAGENDADA",
	"Id_Motivo": "26",
	"MotivoDescripcion": "REAGENDAMIENTO DESDE SALESFORCE",
	"Latitud": "19.267982620034285",
	"Longitud": "-99.20635095507811",
	"Id_Origen": "3",
	"OrigenDescripcion": "SALESFORCE",
	"Id_Operador": "4",
	"Nombre_Operador": "FFM SALESFORCE WEB",
	"FechaModificacion": "27/05/2020",
	"HoraModificacion": "12:14:54"
}, {
	"OT": "66169",
	"Descripcion": "OT CALENDARIZADO DESDE FFM WEB",
	"Id_Estatus": "319",
	"EstatusDescripcion": "CALENDARIZADO",
	"Id_Estado": "320",
	"EstadoDescripcion": "CALENDARIZADO",
	"Id_Motivo": "321",
	"MotivoDescripcion": "CLIENTE SIN FECHA DE INSTALACION",
	"Latitud": "19.4326",
	"Longitud": "-99.1332",
	"Id_Origen": "2",
	"OrigenDescripcion": "FFM WEB",
	"Id_Operador": "6",
	"Nombre_Operador": "RICARDO HERNANDEZ MARTINEZ",
	"FechaModificacion": "27/05/2020",
	"HoraModificacion": "12:15:23"
}, {
	"OT": "66169",
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
	"FechaModificacion": "27/05/2020",
	"HoraModificacion": "12:16:32"
}, {
	"OT": "66169",
	"Descripcion": "OT CREADA DESDE FFM WEB",
	"Id_Estatus": "1",
	"EstatusDescripcion": "PENDIENTE",
	"Id_Estado": "6",
	"EstadoDescripcion": "NO ASIGNADA",
	"Id_Motivo": "24",
	"MotivoDescripcion": "DESASIGNADA POR DESPACHO",
	"Latitud": "19.4326",
	"Longitud": "-99.1332",
	"Id_Origen": "2",
	"OrigenDescripcion": "FFM WEB",
	"Id_Operador": "6",
	"Nombre_Operador": "RICARDO HERNANDEZ MARTINEZ",
	"FechaModificacion": "27/05/2020",
	"HoraModificacion": "13:11:00"
}, {
	"OT": "66169",
	"Descripcion": "OT CREADA DESDE FFM WEB",
	"Id_Estatus": "1",
	"EstatusDescripcion": "PENDIENTE",
	"Id_Estado": "7",
	"EstadoDescripcion": "REAGENDADA",
	"Id_Motivo": "88",
	"MotivoDescripcion": "CLIENTE REAGENDA",
	"Latitud": "19.4326",
	"Longitud": "-99.1332",
	"Id_Origen": "2",
	"OrigenDescripcion": "FFM WEB",
	"Id_Operador": "6",
	"Nombre_Operador": "RICARDO HERNANDEZ MARTINEZ",
	"FechaModificacion": "27/05/2020",
	"HoraModificacion": "13:11:22"
}, {
	"OT": "66169",
	"Descripcion": "OT CREADA DESDE FFM WEB",
	"Id_Estatus": "1",
	"EstatusDescripcion": "PENDIENTE",
	"Id_Estado": "7",
	"EstadoDescripcion": "REAGENDADA",
	"Id_Motivo": "88",
	"MotivoDescripcion": "CLIENTE REAGENDA",
	"Latitud": "19.4326",
	"Longitud": "-99.1332",
	"Id_Origen": "2",
	"OrigenDescripcion": "FFM WEB",
	"Id_Operador": "6",
	"Nombre_Operador": "RICARDO HERNANDEZ MARTINEZ",
	"FechaModificacion": "27/05/2020",
	"HoraModificacion": "17:37:29"
}, {
	"OT": "66169",
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
	"FechaModificacion": "27/05/2020",
	"HoraModificacion": "17:37:35"
}, {
	"OT": "66169",
	"Descripcion": "OT ASIGNADA DESDE FFM APP",
	"Id_Estatus": "2",
	"EstatusDescripcion": "ASIGNADA",
	"Id_Estado": "10",
	"EstadoDescripcion": "EN TRANSITO",
	"MotivoDescripcion": "-",
	"Latitud": "19.294315",
	"Longitud": "-99.216775",
	"Id_Origen": "1",
	"OrigenDescripcion": "FFM APP",
	"Id_Operador": "2661",
	"Nombre_Operador": "TECNICO FFM FFM",
	"FechaModificacion": "27/05/2020",
	"HoraModificacion": "17:38:34"
}, {
	"OT": "66169",
	"Descripcion": "OT ASIGNADA DESDE FFM APP",
	"Id_Estatus": "2",
	"EstatusDescripcion": "ASIGNADA",
	"Id_Estado": "107",
	"EstadoDescripcion": "EN SITIO",
	"MotivoDescripcion": "-",
	"Latitud": "19.294315",
	"Longitud": "-99.216775",
	"Id_Origen": "1",
	"OrigenDescripcion": "FFM APP",
	"Id_Operador": "2661",
	"Nombre_Operador": "TECNICO FFM FFM",
	"FechaModificacion": "27/05/2020",
	"HoraModificacion": "17:38:39"
}, {
	"OT": "66169",
	"Descripcion": "OT ASIGNADA DESDE FFM APP",
	"Id_Estatus": "2",
	"EstatusDescripcion": "ASIGNADA",
	"Id_Estado": "11",
	"EstadoDescripcion": "EN TRABAJO",
	"MotivoDescripcion": "-",
	"Latitud": "19.294315",
	"Longitud": "-99.216775",
	"Id_Origen": "1",
	"OrigenDescripcion": "FFM APP",
	"Id_Operador": "2661",
	"Nombre_Operador": "TECNICO FFM FFM",
	"FechaModificacion": "27/05/2020",
	"HoraModificacion": "17:38:42"
}, {
	"OT": "66169",
	"Descripcion": "OT ASIGNADA DESDE FFM APP",
	"Id_Estatus": "2",
	"EstatusDescripcion": "ASIGNADA",
	"Id_Estado": "113",
	"EstadoDescripcion": "EN ESPERA",
	"Id_Motivo": "221",
	"MotivoDescripcion": "FALTA CAPACIDAD PMP",
	"Latitud": "19.301282",
	"Longitud": "-99.232568",
	"Id_Origen": "1",
	"OrigenDescripcion": "FFM APP",
	"Id_Operador": "2661",
	"Nombre_Operador": "TECNICO FFM FFM",
	"FechaModificacion": "27/05/2020",
	"HoraModificacion": "17:39:36"
}, {
	"OT": "66169",
	"Descripcion": "OT ASIGNADA DESDE FFM APP",
	"Id_Estatus": "2",
	"EstatusDescripcion": "ASIGNADA",
	"Id_Estado": "113",
	"EstadoDescripcion": "EN ESPERA",
	"Id_Motivo": "69",
	"MotivoDescripcion": "SPLITTER ATENUADO",
	"Latitud": "19.301282",
	"Longitud": "-99.232568",
	"Id_Origen": "1",
	"OrigenDescripcion": "FFM APP",
	"Id_Operador": "2661",
	"Nombre_Operador": "TECNICO FFM FFM",
	"FechaModificacion": "27/05/2020",
	"HoraModificacion": "17:41:37"
}, {
	"OT": "66169",
	"Descripcion": "OT DETENIDA DESDE FFM WEB",
	"Id_Estatus": "3",
	"EstatusDescripcion": "DETENIDA",
	"Id_Estado": "12",
	"EstadoDescripcion": "PLANTA EXTERNA",
	"Id_Motivo": "43",
	"MotivoDescripcion": "SPLITTER ATENUADO",
	"Latitud": "19.4326",
	"Longitud": "-99.1332",
	"Id_Origen": "2",
	"OrigenDescripcion": "FFM WEB",
	"Id_Operador": "6",
	"Nombre_Operador": "RICARDO HERNANDEZ MARTINEZ",
	"FechaModificacion": "27/05/2020",
	"HoraModificacion": "17:41:55"
}, {
	"OT": "66169",
	"Descripcion": "OT CANCELADA DESDE FFM WEB",
	"Id_Estatus": "5",
	"EstatusDescripcion": "CANCELADA",
	"Id_Estado": "18",
	"EstadoDescripcion": "CANCELADA",
	"Id_Motivo": "277",
	"MotivoDescripcion": "EL CLIENTE YA NO DESEA EL SERVICIO",
	"Latitud": "19.4326",
	"Longitud": "-99.1332",
	"Id_Origen": "2",
	"OrigenDescripcion": "FFM WEB",
	"Id_Operador": "6",
	"Nombre_Operador": "RICARDO HERNANDEZ MARTINEZ",
	"FechaModificacion": "05/08/2020",
	"HoraModificacion": "10:29:25"
}]

let imagenesAlerta = {
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

let catalogoestatusJSON={
	"success": true,
	"result": {
		"result": "0",
		"resultDescription": "Operaci&oacute;n exitosa.",
		"Ststus": [{
			"ID": "2",
			"Descripcion": "ASIGNADA",
			"Nivel": "1"
		}, {
			"ID": "3",
			"Descripcion": "DETENIDA",
			"Nivel": "1"
		}, {
			"ID": "4",
			"Descripcion": "TERMINADA",
			"Nivel": "1"
		}, {
			"ID": "5",
			"Descripcion": "CANCELADA",
			"Nivel": "1"
		}, {
			"ID": "319",
			"Descripcion": "CALENDARIZADO",
			"Nivel": "1"
		}, {
			"ID": "342",
			"Descripcion": "GESTOR&Iacute;A",
			"Nivel": "1"
		}, {
			"ID": "1",
			"Descripcion": "PENDIENTE",
			"Nivel": "1"
		}, {
			"ID": "11",
			"Descripcion": "EN TRABAJO",
			"ID_Padre": "2",
			"Nivel": "2"
		}, {
			"ID": "10",
			"Descripcion": "EN TRANSITO",
			"ID_Padre": "2",
			"Nivel": "2"
		}, {
			"ID": "9",
			"Descripcion": "PROGRAMADA PERO NO INICIADA",
			"ID_Padre": "2",
			"Nivel": "2"
		}, {
			"ID": "230",
			"Descripcion": "INFRAESTRUCTURA PMP",
			"ID_Padre": "3",
			"Nivel": "2"
		}, {
			"ID": "234",
			"Descripcion": "INFRAESTRUCTURA PTP",
			"ID_Padre": "3",
			"Nivel": "2"
		}, {
			"ID": "12",
			"Descripcion": "PLANTA EXTERNA",
			"ID_Padre": "3",
			"Nivel": "2"
		}, {
			"ID": "14",
			"Descripcion": "COMPLETA",
			"ID_Padre": "4",
			"Nivel": "2"
		}, {
			"ID": "18",
			"Descripcion": "CANCELADA",
			"ID_Padre": "5",
			"Nivel": "2"
		}, {
			"ID": "182",
			"Descripcion": "PAQUETERIA",
			"ID_Padre": "169",
			"Nivel": "2"
		}, {
			"ID": "358",
			"Descripcion": "INFRAESTRUCTURA/IMPLEMENTACION",
			"ID_Padre": "169",
			"Nivel": "2"
		}, {
			"ID": "171",
			"Descripcion": "OT TERMINADA/COMPLETADA",
			"ID_Padre": "169",
			"Nivel": "2"
		}, {
			"ID": "170",
			"Descripcion": "PLANTA EXTERNA",
			"ID_Padre": "169",
			"Nivel": "2"
		}, {
			"ID": "320",
			"Descripcion": "CALENDARIZADO",
			"ID_Padre": "319",
			"Nivel": "2"
		}, {
			"ID": "343",
			"Descripcion": "GESTOR&Iacute;A",
			"ID_Padre": "342",
			"Nivel": "2"
		}, {
			"ID": "107",
			"Descripcion": "EN SITIO",
			"ID_Padre": "2",
			"Nivel": "2"
		}, {
			"ID": "113",
			"Descripcion": "EN ESPERA",
			"ID_Padre": "2",
			"Nivel": "2"
		}, {
			"ID": "207",
			"Descripcion": "VALIDACION DE CUENTA",
			"ID_Padre": "2",
			"Nivel": "2"
		}, {
			"ID": "6",
			"Descripcion": "NO ASIGNADA",
			"ID_Padre": "1",
			"Nivel": "2"
		}, {
			"ID": "7",
			"Descripcion": "REAGENDADA",
			"ID_Padre": "1",
			"Nivel": "2"
		}, {
			"ID": "8",
			"Descripcion": "INCUMPLIMIENTO",
			"ID_Padre": "1",
			"Nivel": "2"
		}, {
			"ID": "128",
			"Descripcion": "RECHAZADA",
			"ID_Padre": "1",
			"Nivel": "2"
		}, {
			"ID": "19",
			"Descripcion": "DEVUELTA DE DETENCION",
			"ID_Padre": "1",
			"Nivel": "2"
		}, {
			"ID": "25",
			"Descripcion": "OT NUEVA",
			"ID_Padre": "6",
			"ID_Abuelo": "1",
			"Nivel": "3"
		}, {
			"ID": "24",
			"Descripcion": "DESASIGNADA POR DESPACHO",
			"ID_Padre": "6",
			"ID_Abuelo": "1",
			"Nivel": "3"
		}, {
			"ID": "357",
			"Descripcion": "VISITA A CLIENTE",
			"ID_Padre": "7",
			"ID_Abuelo": "1",
			"Nivel": "3"
		}, {
			"ID": "88",
			"Descripcion": "CLIENTE REAGENDA",
			"ID_Padre": "7",
			"ID_Abuelo": "1",
			"Nivel": "3"
		}, {
			"ID": "71",
			"Descripcion": "MERCADO O TIANGUIS",
			"ID_Padre": "7",
			"ID_Abuelo": "1",
			"Nivel": "3"
		}, {
			"ID": "59",
			"Descripcion": "HORARIO NOCTURNO",
			"ID_Padre": "7",
			"ID_Abuelo": "1",
			"Nivel": "3"
		}, {
			"ID": "56",
			"Descripcion": "SIN PERMISOS MUNICIPALES",
			"ID_Padre": "7",
			"ID_Abuelo": "1",
			"Nivel": "3"
		}, {
			"ID": "34",
			"Descripcion": "CLIMA",
			"ID_Padre": "7",
			"ID_Abuelo": "1",
			"Nivel": "3"
		}, {
			"ID": "33",
			"Descripcion": "ZONA DE ALTO RIESGO",
			"ID_Padre": "7",
			"ID_Abuelo": "1",
			"Nivel": "3"
		}, {
			"ID": "32",
			"Descripcion": "CLIENTE SIN PERMISOS DE ACCESO",
			"ID_Padre": "7",
			"ID_Abuelo": "1",
			"Nivel": "3"
		}, {
			"ID": "30",
			"Descripcion": "NO SE CONCLUYO LA INSTALACION",
			"ID_Padre": "7",
			"ID_Abuelo": "1",
			"Nivel": "3"
		}, {
			"ID": "28",
			"Descripcion": "NO HAY SISTEMA",
			"ID_Padre": "7",
			"ID_Abuelo": "1",
			"Nivel": "3"
		}, {
			"ID": "41",
			"Descripcion": "INCUMPLIMIENTO",
			"ID_Padre": "8",
			"ID_Abuelo": "1",
			"Nivel": "3"
		}, {
			"ID": "40",
			"Descripcion": "FALTA DE MATERIALES",
			"ID_Padre": "8",
			"ID_Abuelo": "1",
			"Nivel": "3"
		}, {
			"ID": "39",
			"Descripcion": "FALTA DE EQUIPOS",
			"ID_Padre": "8",
			"ID_Abuelo": "1",
			"Nivel": "3"
		}, {
			"ID": "106",
			"Descripcion": "ASIGNACION AUTOMATICA",
			"ID_Padre": "9",
			"ID_Abuelo": "2",
			"Nivel": "3"
		}, {
			"ID": "23",
			"Descripcion": "ASIGNADO POR DESPACHO",
			"ID_Padre": "9",
			"ID_Abuelo": "2",
			"Nivel": "3"
		}, {
			"ID": "282",
			"Descripcion": "SPLITTER A MAS DE 300 METROS",
			"ID_Padre": "12",
			"ID_Abuelo": "3",
			"Nivel": "3"
		}, {
			"ID": "281",
			"Descripcion": "COLOCACION DE POSTERIA",
			"ID_Padre": "12",
			"ID_Abuelo": "3",
			"Nivel": "3"
		}, {
			"ID": "432",
			"Descripcion": "ROBO DE PUERTO",
			"ID_Padre": "12",
			"ID_Abuelo": "3",
			"Nivel": "3"
		}, {
			"ID": "105",
			"Descripcion": "SPLITTER SIN POTENCIA",
			"ID_Padre": "12",
			"ID_Abuelo": "3",
			"Nivel": "3"
		}, {
			"ID": "45",
			"Descripcion": "ANCHO DE BANDA INSUFICIENTE",
			"ID_Padre": "12",
			"ID_Abuelo": "3",
			"Nivel": "3"
		}, {
			"ID": "44",
			"Descripcion": "SPLITTER PUERTOS DA&Ntilde;ADOS",
			"ID_Padre": "12",
			"ID_Abuelo": "3",
			"Nivel": "3"
		}, {
			"ID": "43",
			"Descripcion": "SPLITTER ATENUADO",
			"ID_Padre": "12",
			"ID_Abuelo": "3",
			"Nivel": "3"
		}, {
			"ID": "42",
			"Descripcion": "SPLITTER SATURADO",
			"ID_Padre": "12",
			"ID_Abuelo": "3",
			"Nivel": "3"
		}, {
			"ID": "93",
			"Descripcion": "CLIENTE REAGENDA",
			"ID_Padre": "13",
			"ID_Abuelo": "3",
			"Nivel": "3"
		}, {
			"ID": "51",
			"Descripcion": "FALTA DE TIEMPO",
			"ID_Padre": "13",
			"ID_Abuelo": "3",
			"Nivel": "3"
		}, {
			"ID": "123",
			"Descripcion": "FOLIO DUPLICADO",
			"ID_Padre": "15",
			"ID_Abuelo": "4",
			"Nivel": "3"
		}, {
			"ID": "108",
			"Descripcion": "ASOCIADO A SD DE AFECTACION MASIVA",
			"ID_Padre": "15",
			"ID_Abuelo": "4",
			"Nivel": "3"
		}, {
			"ID": "103",
			"Descripcion": "DOMICILIO MOROSO",
			"ID_Padre": "15",
			"ID_Abuelo": "4",
			"Nivel": "3"
		}, {
			"ID": "100",
			"Descripcion": "FUERA DE COBERTURA",
			"ID_Padre": "15",
			"ID_Abuelo": "4",
			"Nivel": "3"
		}, {
			"ID": "99",
			"Descripcion": "CLIENTE YA NO DESEA EL SERVICIO",
			"ID_Padre": "15",
			"ID_Abuelo": "4",
			"Nivel": "3"
		}, {
			"ID": "73",
			"Descripcion": "IMPUTABLE AL CLIENTE",
			"ID_Padre": "15",
			"ID_Abuelo": "4",
			"Nivel": "3"
		}, {
			"ID": "65",
			"Descripcion": "PREDIO IRREGULAR",
			"ID_Padre": "15",
			"ID_Abuelo": "4",
			"Nivel": "3"
		}, {
			"ID": "64",
			"Descripcion": "IMPOSIBILIDAD TECNICA",
			"ID_Padre": "15",
			"ID_Abuelo": "4",
			"Nivel": "3"
		}, {
			"ID": "63",
			"Descripcion": "FUERA DE COBERTURA",
			"ID_Padre": "15",
			"ID_Abuelo": "4",
			"Nivel": "3"
		}, {
			"ID": "62",
			"Descripcion": "INCUMPLIMIENTO PLANTA INTERNA",
			"ID_Padre": "15",
			"ID_Abuelo": "4",
			"Nivel": "3"
		}, {
			"ID": "61",
			"Descripcion": "CLIENTE YA NO DESEA EL SERVICIO",
			"ID_Padre": "15",
			"ID_Abuelo": "4",
			"Nivel": "3"
		}, {
			"ID": "60",
			"Descripcion": "OT DUPLICADA",
			"ID_Padre": "15",
			"ID_Abuelo": "4",
			"Nivel": "3"
		}, {
			"ID": "50",
			"Descripcion": "INFORMACION INCOMPLETA",
			"ID_Padre": "15",
			"ID_Abuelo": "4",
			"Nivel": "3"
		}, {
			"ID": "278",
			"Descripcion": "SIN ACCESO AL EDIFICIO",
			"ID_Padre": "18",
			"ID_Abuelo": "5",
			"Nivel": "3"
		}, {
			"ID": "277",
			"Descripcion": "EL CLIENTE YA NO DESEA EL SERVICIO",
			"ID_Padre": "18",
			"ID_Abuelo": "5",
			"Nivel": "3"
		}, {
			"ID": "276",
			"Descripcion": "EXTRA COSTO",
			"ID_Padre": "18",
			"ID_Abuelo": "5",
			"Nivel": "3"
		}, {
			"ID": "275",
			"Descripcion": "IMPOSIBILIDAD TECNICA",
			"ID_Padre": "18",
			"ID_Abuelo": "5",
			"Nivel": "3"
		}, {
			"ID": "274",
			"Descripcion": "INMUEBLE EN CONSTRUCCION",
			"ID_Padre": "18",
			"ID_Abuelo": "5",
			"Nivel": "3"
		}, {
			"ID": "273",
			"Descripcion": "CORRECCION DE INFORMACION",
			"ID_Padre": "18",
			"ID_Abuelo": "5",
			"Nivel": "3"
		}, {
			"ID": "396",
			"Descripcion": "DOMICILIO CERRADO",
			"ID_Padre": "18",
			"ID_Abuelo": "5",
			"Nivel": "3"
		}, {
			"ID": "77",
			"Descripcion": "FALTA DE PAGO",
			"ID_Padre": "18",
			"ID_Abuelo": "5",
			"Nivel": "3"
		}, {
			"ID": "75",
			"Descripcion": "CLIENTE ILOCALIZABLE",
			"ID_Padre": "18",
			"ID_Abuelo": "5",
			"Nivel": "3"
		}, {
			"ID": "92",
			"Descripcion": "EDIFICIO SIN SPLITTER",
			"ID_Padre": "21",
			"ID_Abuelo": "3",
			"Nivel": "3"
		}, {
			"ID": "47",
			"Descripcion": "REQUIERE OBRA CIVIL",
			"ID_Padre": "21",
			"ID_Abuelo": "3",
			"Nivel": "3"
		}, {
			"ID": "48",
			"Descripcion": "DUCTOS OBSTRUIDOS",
			"ID_Padre": "22",
			"ID_Abuelo": "3",
			"Nivel": "3"
		}, {
			"ID": "115",
			"Descripcion": "TECNICO EN SITIO",
			"ID_Padre": "107",
			"ID_Abuelo": "2",
			"Nivel": "3"
		}, {
			"ID": "114",
			"Descripcion": "TECNICO NO ESTA EN SITIO",
			"ID_Padre": "107",
			"ID_Abuelo": "2",
			"Nivel": "3"
		}, {
			"ID": "350",
			"Descripcion": "SIN ACCESO A LA PLAZA (GESTORIA)",
			"ID_Padre": "113",
			"ID_Abuelo": "2",
			"Nivel": "3"
		}, {
			"ID": "349",
			"Descripcion": "SIN INFRAESTRUCTURA DE PE",
			"ID_Padre": "113",
			"ID_Abuelo": "2",
			"Nivel": "3"
		}, {
			"ID": "348",
			"Descripcion": "EN VOBO DE PLAN DE TRABAJO",
			"ID_Padre": "113",
			"ID_Abuelo": "2",
			"Nivel": "3"
		}, {
			"ID": "347",
			"Descripcion": "CLIENTE SIN INFRAESTRUCTURA",
			"ID_Padre": "113",
			"ID_Abuelo": "2",
			"Nivel": "3"
		}, {
			"ID": "346",
			"Descripcion": "CLIENTE SIN FECHA DE INSTALACION",
			"ID_Padre": "113",
			"ID_Abuelo": "2",
			"Nivel": "3"
		}, {
			"ID": "164",
			"Descripcion": "FALTA CABLEADO ESTRUCTURADO",
			"ID_Padre": "113",
			"ID_Abuelo": "2",
			"Nivel": "3"
		}, {
			"ID": "163",
			"Descripcion": "OT DUPLICADA",
			"ID_Padre": "113",
			"ID_Abuelo": "2",
			"Nivel": "3"
		}, {
			"ID": "162",
			"Descripcion": "CLIENTE YA NO DESEA EL SERVICIO",
			"ID_Padre": "113",
			"ID_Abuelo": "2",
			"Nivel": "3"
		}, {
			"ID": "125",
			"Descripcion": "DOMICILIO NO COINCIDE",
			"ID_Padre": "113",
			"ID_Abuelo": "2",
			"Nivel": "3"
		}, {
			"ID": "121",
			"Descripcion": "PROBLEMAS EN EL TRASLADO",
			"ID_Padre": "113",
			"ID_Abuelo": "2",
			"Nivel": "3"
		}, {
			"ID": "120",
			"Descripcion": "ANCHO DE BANDA INSUFICIENTE",
			"ID_Padre": "113",
			"ID_Abuelo": "2",
			"Nivel": "3"
		}, {
			"ID": "119",
			"Descripcion": "FUERA DE COBERTURA",
			"ID_Padre": "113",
			"ID_Abuelo": "2",
			"Nivel": "3"
		}, {
			"ID": "118",
			"Descripcion": "SPLITTER PUERTOS DA&Ntilde;ADOS",
			"ID_Padre": "113",
			"ID_Abuelo": "2",
			"Nivel": "3"
		}, {
			"ID": "116",
			"Descripcion": "NO EXISTE DOMICILIO",
			"ID_Padre": "113",
			"ID_Abuelo": "2",
			"Nivel": "3"
		}, {
			"ID": "112",
			"Descripcion": "SPLITTER NO ILUMINADO - GPON",
			"ID_Padre": "113",
			"ID_Abuelo": "2",
			"Nivel": "3"
		}, {
			"ID": "111",
			"Descripcion": "TRABAJO DE OTROS CARRIER",
			"ID_Padre": "113",
			"ID_Abuelo": "2",
			"Nivel": "3"
		}, {
			"ID": "109",
			"Descripcion": "PODA DE ARBOL",
			"ID_Padre": "113",
			"ID_Abuelo": "2",
			"Nivel": "3"
		}, {
			"ID": "102",
			"Descripcion": "MERCADO O TIANGUIS",
			"ID_Padre": "113",
			"ID_Abuelo": "2",
			"Nivel": "3"
		}, {
			"ID": "101",
			"Descripcion": "REPARACI&Oacute;N CFE",
			"ID_Padre": "113",
			"ID_Abuelo": "2",
			"Nivel": "3"
		}, {
			"ID": "98",
			"Descripcion": "AFECTACION MASIVA",
			"ID_Padre": "113",
			"ID_Abuelo": "2",
			"Nivel": "3"
		}, {
			"ID": "97",
			"Descripcion": "ZONA DE ALTO RIESGO",
			"ID_Padre": "113",
			"ID_Abuelo": "2",
			"Nivel": "3"
		}, {
			"ID": "96",
			"Descripcion": "ACCESO OLT",
			"ID_Padre": "113",
			"ID_Abuelo": "2",
			"Nivel": "3"
		}, {
			"ID": "95",
			"Descripcion": "SIN PERMISOS DE ACCESO",
			"ID_Padre": "113",
			"ID_Abuelo": "2",
			"Nivel": "3"
		}, {
			"ID": "70",
			"Descripcion": "SPLITTER SATURADO",
			"ID_Padre": "113",
			"ID_Abuelo": "2",
			"Nivel": "3"
		}, {
			"ID": "69",
			"Descripcion": "SPLITTER ATENUADO",
			"ID_Padre": "113",
			"ID_Abuelo": "2",
			"Nivel": "3"
		}, {
			"ID": "66",
			"Descripcion": "NO HAY SISTEMA",
			"ID_Padre": "113",
			"ID_Abuelo": "2",
			"Nivel": "3"
		}, {
			"ID": "58",
			"Descripcion": "SIN PERMISOS MUNICIPALES",
			"ID_Padre": "113",
			"ID_Abuelo": "2",
			"Nivel": "3"
		}, {
			"ID": "57",
			"Descripcion": "VECINOS NO PERMITEN TRABAJAR",
			"ID_Padre": "113",
			"ID_Abuelo": "2",
			"Nivel": "3"
		}, {
			"ID": "55",
			"Descripcion": "MAL CLIMA",
			"ID_Padre": "113",
			"ID_Abuelo": "2",
			"Nivel": "3"
		}, {
			"ID": "53",
			"Descripcion": "FALTA DE PERMISOS EN CALLE",
			"ID_Padre": "113",
			"ID_Abuelo": "2",
			"Nivel": "3"
		}, {
			"ID": "52",
			"Descripcion": "CLIENTE REAGENDA",
			"ID_Padre": "113",
			"ID_Abuelo": "2",
			"Nivel": "3"
		}, {
			"ID": "49",
			"Descripcion": "FALTA DE PAGO",
			"ID_Padre": "113",
			"ID_Abuelo": "2",
			"Nivel": "3"
		}, {
			"ID": "38",
			"Descripcion": "HORARIO NOCTURNO",
			"ID_Padre": "113",
			"ID_Abuelo": "2",
			"Nivel": "3"
		}, {
			"ID": "37",
			"Descripcion": "PERMISOS ADMINISTRATIVOS",
			"ID_Padre": "113",
			"ID_Abuelo": "2",
			"Nivel": "3"
		}, {
			"ID": "27",
			"Descripcion": "CLIENTE NO SE ENCUENTRA",
			"ID_Padre": "113",
			"ID_Abuelo": "2",
			"Nivel": "3"
		}, {
			"ID": "152",
			"Descripcion": "OT DE INTEGRADOR INCOMPLETA",
			"ID_Padre": "128",
			"ID_Abuelo": "1",
			"Nivel": "3"
		}, {
			"ID": "382",
			"Descripcion": "CLIENTE SI DESEA EL SERVICIO",
			"ID_Padre": "170",
			"ID_Abuelo": "169",
			"Nivel": "3"
		}, {
			"ID": "381",
			"Descripcion": "CLIENTE NO ESTA ACTIVO",
			"ID_Padre": "170",
			"ID_Abuelo": "169",
			"Nivel": "3"
		}, {
			"ID": "172",
			"Descripcion": "FALLA NO REPARADA",
			"ID_Padre": "170",
			"ID_Abuelo": "169",
			"Nivel": "3"
		}, {
			"ID": "173",
			"Descripcion": "SIN EVIDENCIAS DE REPARACION",
			"ID_Padre": "170",
			"ID_Abuelo": "169",
			"Nivel": "3"
		}, {
			"ID": "389",
			"Descripcion": "DETENCION NECESARIA",
			"ID_Padre": "170",
			"ID_Abuelo": "169",
			"Nivel": "3"
		}, {
			"ID": "175",
			"Descripcion": "SIN EVIDENCIAS DE INSTALACION",
			"ID_Padre": "171",
			"ID_Abuelo": "169",
			"Nivel": "3"
		}, {
			"ID": "174",
			"Descripcion": "INSTALACION DEFICIENTE",
			"ID_Padre": "171",
			"ID_Abuelo": "169",
			"Nivel": "3"
		}, {
			"ID": "235",
			"Descripcion": "FALTA CAPACIDAD PTP",
			"ID_Padre": "234",
			"ID_Abuelo": "3",
			"Nivel": "3"
		}, {
			"ID": "259",
			"Descripcion": "NO HAY LINEA DE VISTA FRANCA PTP",
			"ID_Padre": "234",
			"ID_Abuelo": "3",
			"Nivel": "3"
		}, {
			"ID": "292",
			"Descripcion": "ANCHO DE BANDA INSUFICIENTE PMP",
			"ID_Padre": "230",
			"ID_Abuelo": "3",
			"Nivel": "3"
		}, {
			"ID": "291",
			"Descripcion": "VLAN NO PROPAGADA PMP",
			"ID_Padre": "230",
			"ID_Abuelo": "3",
			"Nivel": "3"
		}, {
			"ID": "290",
			"Descripcion": "SIN SE&Ntilde;AL DE RF PMP",
			"ID_Padre": "230",
			"ID_Abuelo": "3",
			"Nivel": "3"
		}, {
			"ID": "233",
			"Descripcion": "FALTA CAPACIDAD PMP",
			"ID_Padre": "230",
			"ID_Abuelo": "3",
			"Nivel": "3"
		}, {
			"ID": "232",
			"Descripcion": "NO HAY LINEA DE VISTA FRANCA PMP",
			"ID_Padre": "230",
			"ID_Abuelo": "3",
			"Nivel": "3"
		}, {
			"ID": "231",
			"Descripcion": "NIVELES BAJOS DE RX PMP",
			"ID_Padre": "230",
			"ID_Abuelo": "3",
			"Nivel": "3"
		}, {
			"ID": "360",
			"Descripcion": "FALTA DE EQUIPAMIENTO",
			"ID_Padre": "320",
			"ID_Abuelo": "319",
			"Nivel": "3"
		}, {
			"ID": "341",
			"Descripcion": "CLIENTE SIN INFRAESTRUCTURA",
			"ID_Padre": "320",
			"ID_Abuelo": "319",
			"Nivel": "3"
		}, {
			"ID": "325",
			"Descripcion": "EN VOBO DE PLAN DE TRABAJO",
			"ID_Padre": "320",
			"ID_Abuelo": "319",
			"Nivel": "3"
		}, {
			"ID": "324",
			"Descripcion": "INMUEBLE EN CONSTRUCCION",
			"ID_Padre": "320",
			"ID_Abuelo": "319",
			"Nivel": "3"
		}, {
			"ID": "323",
			"Descripcion": "CLIENTE SIN PERMISOS DE ACCESO",
			"ID_Padre": "320",
			"ID_Abuelo": "319",
			"Nivel": "3"
		}, {
			"ID": "322",
			"Descripcion": "PERMISOS ADMINISTRATIVOS",
			"ID_Padre": "320",
			"ID_Abuelo": "319",
			"Nivel": "3"
		}, {
			"ID": "321",
			"Descripcion": "CLIENTE SIN FECHA DE INSTALACION",
			"ID_Padre": "320",
			"ID_Abuelo": "319",
			"Nivel": "3"
		}, {
			"ID": "345",
			"Descripcion": "SIN ACCESO A LA PLAZA (GESTORIA)",
			"ID_Padre": "343",
			"ID_Abuelo": "342",
			"Nivel": "3"
		}, {
			"ID": "344",
			"Descripcion": "SIN INFRAESTRUCTURA DE PE",
			"ID_Padre": "343",
			"ID_Abuelo": "342",
			"Nivel": "3"
		}, {
			"ID": "359",
			"Descripcion": "RECHAZO",
			"ID_Padre": "358",
			"ID_Abuelo": "169",
			"Nivel": "3"
		}, {
			"ID": "428",
			"Descripcion": "PROCESO DE VALIDACION",
			"ID_Padre": "427",
			"ID_Abuelo": "319",
			"Nivel": "3"
		}, {
			"ID": "183",
			"Descripcion": "PAQUETE NO LLEGO A PI",
			"ID_Padre": "182",
			"ID_Abuelo": "169",
			"Nivel": "3"
		}, {
			"ID": "185",
			"Descripcion": "CONFIGURACION ERRONEA",
			"ID_Padre": "182",
			"ID_Abuelo": "169",
			"Nivel": "3"
		}, {
			"ID": "184",
			"Descripcion": "PAQUETE DA&Ntilde;ADO",
			"ID_Padre": "182",
			"ID_Abuelo": "169",
			"Nivel": "3"
		}, {
			"ID": "390",
			"Descripcion": "DETENCION NECESARIA",
			"ID_Padre": "203",
			"ID_Abuelo": "1",
			"Nivel": "3"
		}, {
			"ID": "154",
			"Descripcion": "OT INCOMPLETA",
			"ID_Padre": "203",
			"ID_Abuelo": "1",
			"Nivel": "3"
		}]
	}
}

let catalogoTurnoJSON=[
    { id: 1,nombre: "MATUTINO"},
    { id: 2, nombre: "VESPERTINO"}
]
    
var accionesAlerta = 
{
	"success": true,
	"result": {
		"result": "0",
		"resultdescription": "Operaci&oacute;n exitosa.",
		"Acciones": [{
			"ID_Accion": "23",
			"Descripcion": "ENVIO A INFRAESTRUCTURA",
			"Color": "#F4404A",
			"ID_Status": "3",
			"Campo": [{
				"ID_Campo": "1",
				"Descripcion": "COMENTARIOS",
				"TipoCampo": "textarea"
			}, {
				"ID_Campo": "2",
				"Descripcion": "ESTADO",
				"TipoCampo": "select"
			}, {
				"ID_Campo": "3",
				"Descripcion": "MOTIVO",
				"TipoCampo": "select"
			}]
		}, {
			"ID_Accion": "5",
			"Descripcion": "LIBERAR ORDEN, CONTINUAR CON EL TRABAJO",
			"Color": "#93B8BE",
			"Campo": [{
				"ID_Campo": "1",
				"Descripcion": "COMENTARIOS",
				"TipoCampo": "textarea"
			}]
		}]
	}
}

var catalogoEstatusAlerta =
{
	"success": true,
	"result": {
		"result": "0",
		"resultDescription": "Operaci&oacute;n exitosa.",
		"Ststus": [{
			"ID": "2",
			"Descripcion": "ASIGNADA",
			"Nivel": "1"
		}, {
			"ID": "3",
			"Descripcion": "DETENIDA",
			"Nivel": "1"
		}, {
			"ID": "4",
			"Descripcion": "TERMINADA",
			"Nivel": "1"
		}, {
			"ID": "5",
			"Descripcion": "CANCELADA",
			"Nivel": "1"
		}, {
			"ID": "319",
			"Descripcion": "CALENDARIZADO",
			"Nivel": "1"
		}, {
			"ID": "342",
			"Descripcion": "GESTOR&Iacute;A",
			"Nivel": "1"
		}, {
			"ID": "1",
			"Descripcion": "PENDIENTE",
			"Nivel": "1"
		}, {
			"ID": "11",
			"Descripcion": "EN TRABAJO",
			"ID_Padre": "2",
			"Nivel": "2"
		}, {
			"ID": "10",
			"Descripcion": "EN TRANSITO",
			"ID_Padre": "2",
			"Nivel": "2"
		}, {
			"ID": "9",
			"Descripcion": "PROGRAMADA PERO NO INICIADA",
			"ID_Padre": "2",
			"Nivel": "2"
		}, {
			"ID": "230",
			"Descripcion": "INFRAESTRUCTURA PMP",
			"ID_Padre": "3",
			"Nivel": "2"
		}, {
			"ID": "234",
			"Descripcion": "INFRAESTRUCTURA PTP",
			"ID_Padre": "3",
			"Nivel": "2"
		}, {
			"ID": "12",
			"Descripcion": "PLANTA EXTERNA",
			"ID_Padre": "3",
			"Nivel": "2"
		}, {
			"ID": "14",
			"Descripcion": "COMPLETA",
			"ID_Padre": "4",
			"Nivel": "2"
		}, {
			"ID": "18",
			"Descripcion": "CANCELADA",
			"ID_Padre": "5",
			"Nivel": "2"
		}, {
			"ID": "182",
			"Descripcion": "PAQUETERIA",
			"ID_Padre": "169",
			"Nivel": "2"
		}, {
			"ID": "358",
			"Descripcion": "INFRAESTRUCTURA/IMPLEMENTACION",
			"ID_Padre": "169",
			"Nivel": "2"
		}, {
			"ID": "171",
			"Descripcion": "OT TERMINADA/COMPLETADA",
			"ID_Padre": "169",
			"Nivel": "2"
		}, {
			"ID": "170",
			"Descripcion": "PLANTA EXTERNA",
			"ID_Padre": "169",
			"Nivel": "2"
		}, {
			"ID": "320",
			"Descripcion": "CALENDARIZADO",
			"ID_Padre": "319",
			"Nivel": "2"
		}, {
			"ID": "343",
			"Descripcion": "GESTOR&Iacute;A",
			"ID_Padre": "342",
			"Nivel": "2"
		}, {
			"ID": "107",
			"Descripcion": "EN SITIO",
			"ID_Padre": "2",
			"Nivel": "2"
		}, {
			"ID": "113",
			"Descripcion": "EN ESPERA",
			"ID_Padre": "2",
			"Nivel": "2"
		}, {
			"ID": "207",
			"Descripcion": "VALIDACION DE CUENTA",
			"ID_Padre": "2",
			"Nivel": "2"
		}, {
			"ID": "6",
			"Descripcion": "NO ASIGNADA",
			"ID_Padre": "1",
			"Nivel": "2"
		}, {
			"ID": "7",
			"Descripcion": "REAGENDADA",
			"ID_Padre": "1",
			"Nivel": "2"
		}, {
			"ID": "8",
			"Descripcion": "INCUMPLIMIENTO",
			"ID_Padre": "1",
			"Nivel": "2"
		}, {
			"ID": "128",
			"Descripcion": "RECHAZADA",
			"ID_Padre": "1",
			"Nivel": "2"
		}, {
			"ID": "19",
			"Descripcion": "DEVUELTA DE DETENCION",
			"ID_Padre": "1",
			"Nivel": "2"
		}, {
			"ID": "25",
			"Descripcion": "OT NUEVA",
			"ID_Padre": "6",
			"ID_Abuelo": "1",
			"Nivel": "3"
		}, {
			"ID": "24",
			"Descripcion": "DESASIGNADA POR DESPACHO",
			"ID_Padre": "6",
			"ID_Abuelo": "1",
			"Nivel": "3"
		}, {
			"ID": "357",
			"Descripcion": "VISITA A CLIENTE",
			"ID_Padre": "7",
			"ID_Abuelo": "1",
			"Nivel": "3"
		}, {
			"ID": "88",
			"Descripcion": "CLIENTE REAGENDA",
			"ID_Padre": "7",
			"ID_Abuelo": "1",
			"Nivel": "3"
		}, {
			"ID": "71",
			"Descripcion": "MERCADO O TIANGUIS",
			"ID_Padre": "7",
			"ID_Abuelo": "1",
			"Nivel": "3"
		}, {
			"ID": "59",
			"Descripcion": "HORARIO NOCTURNO",
			"ID_Padre": "7",
			"ID_Abuelo": "1",
			"Nivel": "3"
		}, {
			"ID": "56",
			"Descripcion": "SIN PERMISOS MUNICIPALES",
			"ID_Padre": "7",
			"ID_Abuelo": "1",
			"Nivel": "3"
		}, {
			"ID": "34",
			"Descripcion": "CLIMA",
			"ID_Padre": "7",
			"ID_Abuelo": "1",
			"Nivel": "3"
		}, {
			"ID": "33",
			"Descripcion": "ZONA DE ALTO RIESGO",
			"ID_Padre": "7",
			"ID_Abuelo": "1",
			"Nivel": "3"
		}, {
			"ID": "32",
			"Descripcion": "CLIENTE SIN PERMISOS DE ACCESO",
			"ID_Padre": "7",
			"ID_Abuelo": "1",
			"Nivel": "3"
		}, {
			"ID": "30",
			"Descripcion": "NO SE CONCLUYO LA INSTALACION",
			"ID_Padre": "7",
			"ID_Abuelo": "1",
			"Nivel": "3"
		}, {
			"ID": "28",
			"Descripcion": "NO HAY SISTEMA",
			"ID_Padre": "7",
			"ID_Abuelo": "1",
			"Nivel": "3"
		}, {
			"ID": "41",
			"Descripcion": "INCUMPLIMIENTO",
			"ID_Padre": "8",
			"ID_Abuelo": "1",
			"Nivel": "3"
		}, {
			"ID": "40",
			"Descripcion": "FALTA DE MATERIALES",
			"ID_Padre": "8",
			"ID_Abuelo": "1",
			"Nivel": "3"
		}, {
			"ID": "39",
			"Descripcion": "FALTA DE EQUIPOS",
			"ID_Padre": "8",
			"ID_Abuelo": "1",
			"Nivel": "3"
		}, {
			"ID": "106",
			"Descripcion": "ASIGNACION AUTOMATICA",
			"ID_Padre": "9",
			"ID_Abuelo": "2",
			"Nivel": "3"
		}, {
			"ID": "23",
			"Descripcion": "ASIGNADO POR DESPACHO",
			"ID_Padre": "9",
			"ID_Abuelo": "2",
			"Nivel": "3"
		}, {
			"ID": "282",
			"Descripcion": "SPLITTER A MAS DE 300 METROS",
			"ID_Padre": "12",
			"ID_Abuelo": "3",
			"Nivel": "3"
		}, {
			"ID": "281",
			"Descripcion": "COLOCACION DE POSTERIA",
			"ID_Padre": "12",
			"ID_Abuelo": "3",
			"Nivel": "3"
		}, {
			"ID": "432",
			"Descripcion": "ROBO DE PUERTO",
			"ID_Padre": "12",
			"ID_Abuelo": "3",
			"Nivel": "3"
		}, {
			"ID": "105",
			"Descripcion": "SPLITTER SIN POTENCIA",
			"ID_Padre": "12",
			"ID_Abuelo": "3",
			"Nivel": "3"
		}, {
			"ID": "45",
			"Descripcion": "ANCHO DE BANDA INSUFICIENTE",
			"ID_Padre": "12",
			"ID_Abuelo": "3",
			"Nivel": "3"
		}, {
			"ID": "44",
			"Descripcion": "SPLITTER PUERTOS DA&Ntilde;ADOS",
			"ID_Padre": "12",
			"ID_Abuelo": "3",
			"Nivel": "3"
		}, {
			"ID": "43",
			"Descripcion": "SPLITTER ATENUADO",
			"ID_Padre": "12",
			"ID_Abuelo": "3",
			"Nivel": "3"
		}, {
			"ID": "42",
			"Descripcion": "SPLITTER SATURADO",
			"ID_Padre": "12",
			"ID_Abuelo": "3",
			"Nivel": "3"
		}, {
			"ID": "93",
			"Descripcion": "CLIENTE REAGENDA",
			"ID_Padre": "13",
			"ID_Abuelo": "3",
			"Nivel": "3"
		}, {
			"ID": "51",
			"Descripcion": "FALTA DE TIEMPO",
			"ID_Padre": "13",
			"ID_Abuelo": "3",
			"Nivel": "3"
		}, {
			"ID": "123",
			"Descripcion": "FOLIO DUPLICADO",
			"ID_Padre": "15",
			"ID_Abuelo": "4",
			"Nivel": "3"
		}, {
			"ID": "108",
			"Descripcion": "ASOCIADO A SD DE AFECTACION MASIVA",
			"ID_Padre": "15",
			"ID_Abuelo": "4",
			"Nivel": "3"
		}, {
			"ID": "103",
			"Descripcion": "DOMICILIO MOROSO",
			"ID_Padre": "15",
			"ID_Abuelo": "4",
			"Nivel": "3"
		}, {
			"ID": "100",
			"Descripcion": "FUERA DE COBERTURA",
			"ID_Padre": "15",
			"ID_Abuelo": "4",
			"Nivel": "3"
		}, {
			"ID": "99",
			"Descripcion": "CLIENTE YA NO DESEA EL SERVICIO",
			"ID_Padre": "15",
			"ID_Abuelo": "4",
			"Nivel": "3"
		}, {
			"ID": "73",
			"Descripcion": "IMPUTABLE AL CLIENTE",
			"ID_Padre": "15",
			"ID_Abuelo": "4",
			"Nivel": "3"
		}, {
			"ID": "65",
			"Descripcion": "PREDIO IRREGULAR",
			"ID_Padre": "15",
			"ID_Abuelo": "4",
			"Nivel": "3"
		}, {
			"ID": "64",
			"Descripcion": "IMPOSIBILIDAD TECNICA",
			"ID_Padre": "15",
			"ID_Abuelo": "4",
			"Nivel": "3"
		}, {
			"ID": "63",
			"Descripcion": "FUERA DE COBERTURA",
			"ID_Padre": "15",
			"ID_Abuelo": "4",
			"Nivel": "3"
		}, {
			"ID": "62",
			"Descripcion": "INCUMPLIMIENTO PLANTA INTERNA",
			"ID_Padre": "15",
			"ID_Abuelo": "4",
			"Nivel": "3"
		}, {
			"ID": "61",
			"Descripcion": "CLIENTE YA NO DESEA EL SERVICIO",
			"ID_Padre": "15",
			"ID_Abuelo": "4",
			"Nivel": "3"
		}, {
			"ID": "60",
			"Descripcion": "OT DUPLICADA",
			"ID_Padre": "15",
			"ID_Abuelo": "4",
			"Nivel": "3"
		}, {
			"ID": "50",
			"Descripcion": "INFORMACION INCOMPLETA",
			"ID_Padre": "15",
			"ID_Abuelo": "4",
			"Nivel": "3"
		}, {
			"ID": "278",
			"Descripcion": "SIN ACCESO AL EDIFICIO",
			"ID_Padre": "18",
			"ID_Abuelo": "5",
			"Nivel": "3"
		}, {
			"ID": "277",
			"Descripcion": "EL CLIENTE YA NO DESEA EL SERVICIO",
			"ID_Padre": "18",
			"ID_Abuelo": "5",
			"Nivel": "3"
		}, {
			"ID": "276",
			"Descripcion": "EXTRA COSTO",
			"ID_Padre": "18",
			"ID_Abuelo": "5",
			"Nivel": "3"
		}, {
			"ID": "275",
			"Descripcion": "IMPOSIBILIDAD TECNICA",
			"ID_Padre": "18",
			"ID_Abuelo": "5",
			"Nivel": "3"
		}, {
			"ID": "274",
			"Descripcion": "INMUEBLE EN CONSTRUCCION",
			"ID_Padre": "18",
			"ID_Abuelo": "5",
			"Nivel": "3"
		}, {
			"ID": "273",
			"Descripcion": "CORRECCION DE INFORMACION",
			"ID_Padre": "18",
			"ID_Abuelo": "5",
			"Nivel": "3"
		}, {
			"ID": "396",
			"Descripcion": "DOMICILIO CERRADO",
			"ID_Padre": "18",
			"ID_Abuelo": "5",
			"Nivel": "3"
		}, {
			"ID": "77",
			"Descripcion": "FALTA DE PAGO",
			"ID_Padre": "18",
			"ID_Abuelo": "5",
			"Nivel": "3"
		}, {
			"ID": "75",
			"Descripcion": "CLIENTE ILOCALIZABLE",
			"ID_Padre": "18",
			"ID_Abuelo": "5",
			"Nivel": "3"
		}, {
			"ID": "92",
			"Descripcion": "EDIFICIO SIN SPLITTER",
			"ID_Padre": "21",
			"ID_Abuelo": "3",
			"Nivel": "3"
		}, {
			"ID": "47",
			"Descripcion": "REQUIERE OBRA CIVIL",
			"ID_Padre": "21",
			"ID_Abuelo": "3",
			"Nivel": "3"
		}, {
			"ID": "48",
			"Descripcion": "DUCTOS OBSTRUIDOS",
			"ID_Padre": "22",
			"ID_Abuelo": "3",
			"Nivel": "3"
		}, {
			"ID": "115",
			"Descripcion": "TECNICO EN SITIO",
			"ID_Padre": "107",
			"ID_Abuelo": "2",
			"Nivel": "3"
		}, {
			"ID": "114",
			"Descripcion": "TECNICO NO ESTA EN SITIO",
			"ID_Padre": "107",
			"ID_Abuelo": "2",
			"Nivel": "3"
		}, {
			"ID": "350",
			"Descripcion": "SIN ACCESO A LA PLAZA (GESTORIA)",
			"ID_Padre": "113",
			"ID_Abuelo": "2",
			"Nivel": "3"
		}, {
			"ID": "349",
			"Descripcion": "SIN INFRAESTRUCTURA DE PE",
			"ID_Padre": "113",
			"ID_Abuelo": "2",
			"Nivel": "3"
		}, {
			"ID": "348",
			"Descripcion": "EN VOBO DE PLAN DE TRABAJO",
			"ID_Padre": "113",
			"ID_Abuelo": "2",
			"Nivel": "3"
		}, {
			"ID": "347",
			"Descripcion": "CLIENTE SIN INFRAESTRUCTURA",
			"ID_Padre": "113",
			"ID_Abuelo": "2",
			"Nivel": "3"
		}, {
			"ID": "346",
			"Descripcion": "CLIENTE SIN FECHA DE INSTALACION",
			"ID_Padre": "113",
			"ID_Abuelo": "2",
			"Nivel": "3"
		}, {
			"ID": "164",
			"Descripcion": "FALTA CABLEADO ESTRUCTURADO",
			"ID_Padre": "113",
			"ID_Abuelo": "2",
			"Nivel": "3"
		}, {
			"ID": "163",
			"Descripcion": "OT DUPLICADA",
			"ID_Padre": "113",
			"ID_Abuelo": "2",
			"Nivel": "3"
		}, {
			"ID": "162",
			"Descripcion": "CLIENTE YA NO DESEA EL SERVICIO",
			"ID_Padre": "113",
			"ID_Abuelo": "2",
			"Nivel": "3"
		}, {
			"ID": "125",
			"Descripcion": "DOMICILIO NO COINCIDE",
			"ID_Padre": "113",
			"ID_Abuelo": "2",
			"Nivel": "3"
		}, {
			"ID": "121",
			"Descripcion": "PROBLEMAS EN EL TRASLADO",
			"ID_Padre": "113",
			"ID_Abuelo": "2",
			"Nivel": "3"
		}, {
			"ID": "120",
			"Descripcion": "ANCHO DE BANDA INSUFICIENTE",
			"ID_Padre": "113",
			"ID_Abuelo": "2",
			"Nivel": "3"
		}, {
			"ID": "119",
			"Descripcion": "FUERA DE COBERTURA",
			"ID_Padre": "113",
			"ID_Abuelo": "2",
			"Nivel": "3"
		}, {
			"ID": "118",
			"Descripcion": "SPLITTER PUERTOS DA&Ntilde;ADOS",
			"ID_Padre": "113",
			"ID_Abuelo": "2",
			"Nivel": "3"
		}, {
			"ID": "116",
			"Descripcion": "NO EXISTE DOMICILIO",
			"ID_Padre": "113",
			"ID_Abuelo": "2",
			"Nivel": "3"
		}, {
			"ID": "112",
			"Descripcion": "SPLITTER NO ILUMINADO - GPON",
			"ID_Padre": "113",
			"ID_Abuelo": "2",
			"Nivel": "3"
		}, {
			"ID": "111",
			"Descripcion": "TRABAJO DE OTROS CARRIER",
			"ID_Padre": "113",
			"ID_Abuelo": "2",
			"Nivel": "3"
		}, {
			"ID": "109",
			"Descripcion": "PODA DE ARBOL",
			"ID_Padre": "113",
			"ID_Abuelo": "2",
			"Nivel": "3"
		}, {
			"ID": "102",
			"Descripcion": "MERCADO O TIANGUIS",
			"ID_Padre": "113",
			"ID_Abuelo": "2",
			"Nivel": "3"
		}, {
			"ID": "101",
			"Descripcion": "REPARACI&Oacute;N CFE",
			"ID_Padre": "113",
			"ID_Abuelo": "2",
			"Nivel": "3"
		}, {
			"ID": "98",
			"Descripcion": "AFECTACION MASIVA",
			"ID_Padre": "113",
			"ID_Abuelo": "2",
			"Nivel": "3"
		}, {
			"ID": "97",
			"Descripcion": "ZONA DE ALTO RIESGO",
			"ID_Padre": "113",
			"ID_Abuelo": "2",
			"Nivel": "3"
		}, {
			"ID": "96",
			"Descripcion": "ACCESO OLT",
			"ID_Padre": "113",
			"ID_Abuelo": "2",
			"Nivel": "3"
		}, {
			"ID": "95",
			"Descripcion": "SIN PERMISOS DE ACCESO",
			"ID_Padre": "113",
			"ID_Abuelo": "2",
			"Nivel": "3"
		}, {
			"ID": "70",
			"Descripcion": "SPLITTER SATURADO",
			"ID_Padre": "113",
			"ID_Abuelo": "2",
			"Nivel": "3"
		}, {
			"ID": "69",
			"Descripcion": "SPLITTER ATENUADO",
			"ID_Padre": "113",
			"ID_Abuelo": "2",
			"Nivel": "3"
		}, {
			"ID": "66",
			"Descripcion": "NO HAY SISTEMA",
			"ID_Padre": "113",
			"ID_Abuelo": "2",
			"Nivel": "3"
		}, {
			"ID": "58",
			"Descripcion": "SIN PERMISOS MUNICIPALES",
			"ID_Padre": "113",
			"ID_Abuelo": "2",
			"Nivel": "3"
		}, {
			"ID": "57",
			"Descripcion": "VECINOS NO PERMITEN TRABAJAR",
			"ID_Padre": "113",
			"ID_Abuelo": "2",
			"Nivel": "3"
		}, {
			"ID": "55",
			"Descripcion": "MAL CLIMA",
			"ID_Padre": "113",
			"ID_Abuelo": "2",
			"Nivel": "3"
		}, {
			"ID": "53",
			"Descripcion": "FALTA DE PERMISOS EN CALLE",
			"ID_Padre": "113",
			"ID_Abuelo": "2",
			"Nivel": "3"
		}, {
			"ID": "52",
			"Descripcion": "CLIENTE REAGENDA",
			"ID_Padre": "113",
			"ID_Abuelo": "2",
			"Nivel": "3"
		}, {
			"ID": "49",
			"Descripcion": "FALTA DE PAGO",
			"ID_Padre": "113",
			"ID_Abuelo": "2",
			"Nivel": "3"
		}, {
			"ID": "38",
			"Descripcion": "HORARIO NOCTURNO",
			"ID_Padre": "113",
			"ID_Abuelo": "2",
			"Nivel": "3"
		}, {
			"ID": "37",
			"Descripcion": "PERMISOS ADMINISTRATIVOS",
			"ID_Padre": "113",
			"ID_Abuelo": "2",
			"Nivel": "3"
		}, {
			"ID": "27",
			"Descripcion": "CLIENTE NO SE ENCUENTRA",
			"ID_Padre": "113",
			"ID_Abuelo": "2",
			"Nivel": "3"
		}, {
			"ID": "152",
			"Descripcion": "OT DE INTEGRADOR INCOMPLETA",
			"ID_Padre": "128",
			"ID_Abuelo": "1",
			"Nivel": "3"
		}, {
			"ID": "382",
			"Descripcion": "CLIENTE SI DESEA EL SERVICIO",
			"ID_Padre": "170",
			"ID_Abuelo": "169",
			"Nivel": "3"
		}, {
			"ID": "381",
			"Descripcion": "CLIENTE NO ESTA ACTIVO",
			"ID_Padre": "170",
			"ID_Abuelo": "169",
			"Nivel": "3"
		}, {
			"ID": "172",
			"Descripcion": "FALLA NO REPARADA",
			"ID_Padre": "170",
			"ID_Abuelo": "169",
			"Nivel": "3"
		}, {
			"ID": "173",
			"Descripcion": "SIN EVIDENCIAS DE REPARACION",
			"ID_Padre": "170",
			"ID_Abuelo": "169",
			"Nivel": "3"
		}, {
			"ID": "389",
			"Descripcion": "DETENCION NECESARIA",
			"ID_Padre": "170",
			"ID_Abuelo": "169",
			"Nivel": "3"
		}, {
			"ID": "175",
			"Descripcion": "SIN EVIDENCIAS DE INSTALACION",
			"ID_Padre": "171",
			"ID_Abuelo": "169",
			"Nivel": "3"
		}, {
			"ID": "174",
			"Descripcion": "INSTALACION DEFICIENTE",
			"ID_Padre": "171",
			"ID_Abuelo": "169",
			"Nivel": "3"
		}, {
			"ID": "235",
			"Descripcion": "FALTA CAPACIDAD PTP",
			"ID_Padre": "234",
			"ID_Abuelo": "3",
			"Nivel": "3"
		}, {
			"ID": "259",
			"Descripcion": "NO HAY LINEA DE VISTA FRANCA PTP",
			"ID_Padre": "234",
			"ID_Abuelo": "3",
			"Nivel": "3"
		}, {
			"ID": "292",
			"Descripcion": "ANCHO DE BANDA INSUFICIENTE PMP",
			"ID_Padre": "230",
			"ID_Abuelo": "3",
			"Nivel": "3"
		}, {
			"ID": "291",
			"Descripcion": "VLAN NO PROPAGADA PMP",
			"ID_Padre": "230",
			"ID_Abuelo": "3",
			"Nivel": "3"
		}, {
			"ID": "290",
			"Descripcion": "SIN SE&Ntilde;AL DE RF PMP",
			"ID_Padre": "230",
			"ID_Abuelo": "3",
			"Nivel": "3"
		}, {
			"ID": "233",
			"Descripcion": "FALTA CAPACIDAD PMP",
			"ID_Padre": "230",
			"ID_Abuelo": "3",
			"Nivel": "3"
		}, {
			"ID": "232",
			"Descripcion": "NO HAY LINEA DE VISTA FRANCA PMP",
			"ID_Padre": "230",
			"ID_Abuelo": "3",
			"Nivel": "3"
		}, {
			"ID": "231",
			"Descripcion": "NIVELES BAJOS DE RX PMP",
			"ID_Padre": "230",
			"ID_Abuelo": "3",
			"Nivel": "3"
		}, {
			"ID": "360",
			"Descripcion": "FALTA DE EQUIPAMIENTO",
			"ID_Padre": "320",
			"ID_Abuelo": "319",
			"Nivel": "3"
		}, {
			"ID": "341",
			"Descripcion": "CLIENTE SIN INFRAESTRUCTURA",
			"ID_Padre": "320",
			"ID_Abuelo": "319",
			"Nivel": "3"
		}, {
			"ID": "325",
			"Descripcion": "EN VOBO DE PLAN DE TRABAJO",
			"ID_Padre": "320",
			"ID_Abuelo": "319",
			"Nivel": "3"
		}, {
			"ID": "324",
			"Descripcion": "INMUEBLE EN CONSTRUCCION",
			"ID_Padre": "320",
			"ID_Abuelo": "319",
			"Nivel": "3"
		}, {
			"ID": "323",
			"Descripcion": "CLIENTE SIN PERMISOS DE ACCESO",
			"ID_Padre": "320",
			"ID_Abuelo": "319",
			"Nivel": "3"
		}, {
			"ID": "322",
			"Descripcion": "PERMISOS ADMINISTRATIVOS",
			"ID_Padre": "320",
			"ID_Abuelo": "319",
			"Nivel": "3"
		}, {
			"ID": "321",
			"Descripcion": "CLIENTE SIN FECHA DE INSTALACION",
			"ID_Padre": "320",
			"ID_Abuelo": "319",
			"Nivel": "3"
		}, {
			"ID": "345",
			"Descripcion": "SIN ACCESO A LA PLAZA (GESTORIA)",
			"ID_Padre": "343",
			"ID_Abuelo": "342",
			"Nivel": "3"
		}, {
			"ID": "344",
			"Descripcion": "SIN INFRAESTRUCTURA DE PE",
			"ID_Padre": "343",
			"ID_Abuelo": "342",
			"Nivel": "3"
		}, {
			"ID": "359",
			"Descripcion": "RECHAZO",
			"ID_Padre": "358",
			"ID_Abuelo": "169",
			"Nivel": "3"
		}, {
			"ID": "428",
			"Descripcion": "PROCESO DE VALIDACION",
			"ID_Padre": "427",
			"ID_Abuelo": "319",
			"Nivel": "3"
		}, {
			"ID": "183",
			"Descripcion": "PAQUETE NO LLEGO A PI",
			"ID_Padre": "182",
			"ID_Abuelo": "169",
			"Nivel": "3"
		}, {
			"ID": "185",
			"Descripcion": "CONFIGURACION ERRONEA",
			"ID_Padre": "182",
			"ID_Abuelo": "169",
			"Nivel": "3"
		}, {
			"ID": "184",
			"Descripcion": "PAQUETE DA&Ntilde;ADO",
			"ID_Padre": "182",
			"ID_Abuelo": "169",
			"Nivel": "3"
		}, {
			"ID": "390",
			"Descripcion": "DETENCION NECESARIA",
			"ID_Padre": "203",
			"ID_Abuelo": "1",
			"Nivel": "3"
		}, {
			"ID": "154",
			"Descripcion": "OT INCOMPLETA",
			"ID_Padre": "203",
			"ID_Abuelo": "1",
			"Nivel": "3"
		}]
	}
}


var dataarbol=[{
	"id": "115",
	"parent": "114",
	"text": "SAN LUIS POTOSI",
	"icon": "fa fa-globe",
	"state": {
		"opened": false,
		"selected": true
	}
}, {
	"id": "156",
	"parent": "124",
	"text": "MORELIA",
	"icon": "fa fa-globe",
	"state": {
		"opened": false,
		"selected": true
	}
}, {
	"id": "435",
	"parent": "73",
	"text": "IRAPUATO",
	"icon": "fa fa-globe",
	"state": {
		"opened": false,
		"selected": true
	}
}, {
	"id": "444",
	"parent": "73",
	"text": "ZACATECAS",
	"icon": "fa fa-globe",
	"state": {
		"opened": false,
		"selected": true
	}
}, {
	"id": "451",
	"parent": "124",
	"text": "COLIMA",
	"icon": "fa fa-globe",
	"state": {
		"opened": false,
		"selected": true
	}
}, {
	"id": "575",
	"parent": "459",
	"text": "PUERTO VALLARTA",
	"icon": "fa fa-globe",
	"state": {
		"opened": false,
		"selected": true
	}
}, {
	"id": "596",
	"parent": "592",
	"text": "SUR",
	"icon": "fa fa-globe",
	"state": {
		"opened": false,
		"selected": true
	}
}, {
	"id": "125",
	"parent": "124",
	"text": "GUADALAJARA",
	"icon": "fa fa-globe",
	"state": {
		"opened": false,
		"selected": true
	}
}, {
	"id": "782",
	"parent": "454",
	"text": "LAZARO CARDENAS",
	"icon": "fa fa-globe",
	"state": {
		"opened": false,
		"selected": true
	}
}, {
	"id": "785",
	"parent": "519",
	"text": "COZUMEL",
	"icon": "fa fa-globe",
	"state": {
		"opened": false,
		"selected": true
	}
}, {
	"id": "464",
	"parent": "124",
	"text": "URUAPAN",
	"icon": "fa fa-globe",
	"state": {
		"opened": false,
		"selected": true
	}
}, {
	"id": "793",
	"parent": "439",
	"text": "SAN JUAN DEL RIO",
	"icon": "fa fa-globe",
	"state": {
		"opened": false,
		"selected": true
	}
}, {
	"id": "440",
	"parent": "73",
	"text": "SAN MIGUEL ALLENDE",
	"icon": "fa fa-globe",
	"state": {
		"opened": false,
		"selected": true
	}
}, {
	"id": "520",
	"parent": "207",
	"text": "ISLA MUJERES",
	"icon": "fa fa-globe",
	"state": {
		"opened": false,
		"selected": true
	}
}, {
	"id": "441",
	"parent": "73",
	"text": "SILAO",
	"icon": "fa fa-globe",
	"state": {
		"opened": false,
		"selected": true
	}
}, {
	"id": "827",
	"parent": "826",
	"text": "TULA",
	"icon": "fa fa-globe",
	"state": {
		"opened": false,
		"selected": true
	}
}, {
	"id": "844",
	"parent": "436",
	"text": "MATEHUALA",
	"icon": "fa fa-globe",
	"state": {
		"opened": false,
		"selected": true
	}
}, {
	"id": "848",
	"parent": "847",
	"text": "TENANGO",
	"icon": "fa fa-globe",
	"state": {
		"opened": false,
		"selected": true
	}
}, {
	"id": "92",
	"parent": "73",
	"text": "LEON",
	"icon": "fa fa-globe",
	"state": {
		"opened": false,
		"selected": true
	}
}, {
	"id": "104",
	"parent": "73",
	"text": "QUERETARO",
	"icon": "fa fa-globe",
	"state": {
		"opened": false,
		"selected": true
	}
}, {
	"id": "157",
	"parent": "156",
	"text": "MORELIA",
	"icon": "fa fa-globe",
	"state": {
		"opened": false,
		"selected": true
	}
}, {
	"id": "208",
	"parent": "207",
	"text": "CANCUN",
	"icon": "fa fa-globe",
	"state": {
		"opened": false,
		"selected": true
	}
}, {
	"id": "217",
	"parent": "216",
	"text": "MERIDA",
	"icon": "fa fa-globe",
	"state": {
		"opened": false,
		"selected": true
	}
}, {
	"id": "572",
	"parent": "444",
	"text": "ZACATECAS",
	"icon": "fa fa-globe",
	"state": {
		"opened": false,
		"selected": true
	}
}, {
	"id": "592",
	"parent": "591",
	"text": "CIUDAD DE MEXICO",
	"icon": "fa fa-globe",
	"state": {
		"opened": false,
		"selected": true
	}
}, {
	"id": "804",
	"parent": "433",
	"text": "FRESNILLO",
	"icon": "fa fa-globe",
	"state": {
		"opened": false,
		"selected": true
	}
}, {
	"id": "433",
	"parent": "73",
	"text": "FRESNILLO",
	"icon": "fa fa-globe",
	"state": {
		"opened": false,
		"selected": true
	}
}, {
	"id": "817",
	"parent": "441",
	"text": "SILAO",
	"icon": "fa fa-globe",
	"state": {
		"opened": false,
		"selected": true
	}
}, {
	"id": "538",
	"parent": "591",
	"text": "TULANCINGO",
	"icon": "fa fa-globe",
	"state": {
		"opened": false,
		"selected": true
	}
}, {
	"id": "826",
	"parent": "591",
	"text": "TULA",
	"icon": "fa fa-globe",
	"state": {
		"opened": false,
		"selected": true
	}
}, {
	"id": "847",
	"parent": "591",
	"text": "TENANGO",
	"icon": "fa fa-globe",
	"state": {
		"opened": false,
		"selected": true
	}
}, {
	"id": "851",
	"parent": "528",
	"text": "VALLE DE BRAVO",
	"icon": "fa fa-globe",
	"state": {
		"opened": false,
		"selected": true
	}
}, {
	"id": "207",
	"parent": "1",
	"text": "SURESTE",
	"icon": "fa fa-globe",
	"state": {
		"opened": false,
		"selected": true
	}
}, {
	"id": "216",
	"parent": "207",
	"text": "MERIDA",
	"icon": "fa fa-globe",
	"state": {
		"opened": false,
		"selected": true
	}
}, {
	"id": "434",
	"parent": "73",
	"text": "GUANAJUATO",
	"icon": "fa fa-globe",
	"state": {
		"opened": false,
		"selected": true
	}
}, {
	"id": "574",
	"parent": "456",
	"text": "MANZANILLO",
	"icon": "fa fa-globe",
	"state": {
		"opened": false,
		"selected": true
	}
}, {
	"id": "597",
	"parent": "593",
	"text": "TOLUCA",
	"icon": "fa fa-globe",
	"state": {
		"opened": false,
		"selected": true
	}
}, {
	"id": "598",
	"parent": "594",
	"text": "PACHUCA",
	"icon": "fa fa-globe",
	"state": {
		"opened": false,
		"selected": true
	}
}, {
	"id": "594",
	"parent": "591",
	"text": "PACHUCA",
	"icon": "fa fa-globe",
	"state": {
		"opened": false,
		"selected": true
	}
}, {
	"id": "787",
	"parent": "432",
	"text": "CIUDAD VALLES",
	"icon": "fa fa-globe",
	"state": {
		"opened": false,
		"selected": true
	}
}, {
	"id": "450",
	"parent": "124",
	"text": "CIUDAD GUZMAN",
	"icon": "fa fa-globe",
	"state": {
		"opened": false,
		"selected": true
	}
}, {
	"id": "791",
	"parent": "445",
	"text": "APATZINGAN",
	"icon": "fa fa-globe",
	"state": {
		"opened": false,
		"selected": true
	}
}, {
	"id": "439",
	"parent": "73",
	"text": "SAN JUAN DEL RIO",
	"icon": "fa fa-globe",
	"state": {
		"opened": false,
		"selected": true
	}
}, {
	"id": "794",
	"parent": "440",
	"text": "SAN MIGUEL ALLENDE",
	"icon": "fa fa-globe",
	"state": {
		"opened": false,
		"selected": true
	}
}, {
	"id": "453",
	"parent": "124",
	"text": "LAGOS DE MORENO",
	"icon": "fa fa-globe",
	"state": {
		"opened": false,
		"selected": true
	}
}, {
	"id": "825",
	"parent": "824",
	"text": "TEPEJI",
	"icon": "fa fa-globe",
	"state": {
		"opened": false,
		"selected": true
	}
}, {
	"id": "829",
	"parent": "591",
	"text": "SAN JUAN TEOTIHUACAN",
	"icon": "fa fa-globe",
	"state": {
		"opened": false,
		"selected": true
	}
}, {
	"id": "832",
	"parent": "535",
	"text": "TIZAYUCA",
	"icon": "fa fa-globe",
	"state": {
		"opened": false,
		"selected": true
	}
}, {
	"id": "852",
	"parent": "525",
	"text": "JALMOLONGA",
	"icon": "fa fa-globe",
	"state": {
		"opened": false,
		"selected": true
	}
}, {
	"id": "75",
	"parent": "74",
	"text": "AGUASCALIENTES",
	"icon": "fa fa-globe",
	"state": {
		"opened": false,
		"selected": true
	}
}, {
	"id": "74",
	"parent": "73",
	"text": "AGUASCALIENTES",
	"icon": "fa fa-globe",
	"state": {
		"opened": false,
		"selected": true
	}
}, {
	"id": "573",
	"parent": "451",
	"text": "COLIMA",
	"icon": "fa fa-globe",
	"state": {
		"opened": false,
		"selected": true
	}
}, {
	"id": "456",
	"parent": "124",
	"text": "MANZANILLO",
	"icon": "fa fa-globe",
	"state": {
		"opened": false,
		"selected": true
	}
}, {
	"id": "588",
	"parent": "517",
	"text": "CAMPECHE",
	"icon": "fa fa-globe",
	"state": {
		"opened": false,
		"selected": true
	}
}, {
	"id": "590",
	"parent": "521",
	"text": "PLAYA DEL CARMEN",
	"icon": "fa fa-globe",
	"state": {
		"opened": false,
		"selected": true
	}
}, {
	"id": "591",
	"parent": "1",
	"text": "MEGACENTRO",
	"icon": "fa fa-globe",
	"state": {
		"opened": false,
		"selected": true
	}
}, {
	"id": "796",
	"parent": "795",
	"text": "SAN LUIS DE LA PAZ",
	"icon": "fa fa-globe",
	"state": {
		"opened": false,
		"selected": true
	}
}, {
	"id": "819",
	"parent": "453",
	"text": "LAGOS DE MORENO",
	"icon": "fa fa-globe",
	"state": {
		"opened": false,
		"selected": true
	}
}, {
	"id": "831",
	"parent": "532",
	"text": "APAN",
	"icon": "fa fa-globe",
	"state": {
		"opened": false,
		"selected": true
	}
}, {
	"id": "436",
	"parent": "73",
	"text": "MATEHUALA",
	"icon": "fa fa-globe",
	"state": {
		"opened": false,
		"selected": true
	}
}, {
	"id": "528",
	"parent": "591",
	"text": "VALLE DE BRAVO",
	"icon": "fa fa-globe",
	"state": {
		"opened": false,
		"selected": true
	}
}, {
	"id": "73",
	"parent": "1",
	"text": "BAJIO",
	"icon": "fa fa-globe",
	"state": {
		"opened": false,
		"selected": true
	}
}, {
	"id": "105",
	"parent": "104",
	"text": "QUERETARO",
	"icon": "fa fa-globe",
	"state": {
		"opened": false,
		"selected": true
	}
}, {
	"id": "571",
	"parent": "434",
	"text": "GUANAJUATO",
	"icon": "fa fa-globe",
	"state": {
		"opened": false,
		"selected": true
	}
}, {
	"id": "462",
	"parent": "124",
	"text": "TEPIC",
	"icon": "fa fa-globe",
	"state": {
		"opened": false,
		"selected": true
	}
}, {
	"id": "519",
	"parent": "207",
	"text": "COZUMEL",
	"icon": "fa fa-globe",
	"state": {
		"opened": false,
		"selected": true
	}
}, {
	"id": "445",
	"parent": "124",
	"text": "APATZINGAN",
	"icon": "fa fa-globe",
	"state": {
		"opened": false,
		"selected": true
	}
}, {
	"id": "792",
	"parent": "465",
	"text": "ZAMORA",
	"icon": "fa fa-globe",
	"state": {
		"opened": false,
		"selected": true
	}
}, {
	"id": "823",
	"parent": "538",
	"text": "TULANCINGO",
	"icon": "fa fa-globe",
	"state": {
		"opened": false,
		"selected": true
	}
}, {
	"id": "828",
	"parent": "533",
	"text": "IXMIQUILPAN",
	"icon": "fa fa-globe",
	"state": {
		"opened": false,
		"selected": true
	}
}, {
	"id": "1",
	"parent": "#",
	"text": "TOTALPLAY EMPRESARIAL",
	"icon": "fa fa-globe",
	"state": {
		"opened": false,
		"selected": true
	}
}, {
	"id": "84",
	"parent": "83",
	"text": "CELAYA",
	"icon": "fa fa-globe",
	"state": {
		"opened": false,
		"selected": true
	}
}, {
	"id": "209",
	"parent": "208",
	"text": "CANCUN",
	"icon": "fa fa-globe",
	"state": {
		"opened": false,
		"selected": true
	}
}, {
	"id": "459",
	"parent": "124",
	"text": "PUERTO VALLARTA",
	"icon": "fa fa-globe",
	"state": {
		"opened": false,
		"selected": true
	}
}, {
	"id": "576",
	"parent": "462",
	"text": "TEPIC",
	"icon": "fa fa-globe",
	"state": {
		"opened": false,
		"selected": true
	}
}, {
	"id": "518",
	"parent": "207",
	"text": "CHETUMAL",
	"icon": "fa fa-globe",
	"state": {
		"opened": false,
		"selected": true
	}
}, {
	"id": "432",
	"parent": "73",
	"text": "CIUDAD VALLES",
	"icon": "fa fa-globe",
	"state": {
		"opened": false,
		"selected": true
	}
}, {
	"id": "789",
	"parent": "452",
	"text": "LA PIEDAD",
	"icon": "fa fa-globe",
	"state": {
		"opened": false,
		"selected": true
	}
}, {
	"id": "465",
	"parent": "124",
	"text": "ZAMORA",
	"icon": "fa fa-globe",
	"state": {
		"opened": false,
		"selected": true
	}
}, {
	"id": "795",
	"parent": "73",
	"text": "SAN LUIS DE LA PAZ",
	"icon": "fa fa-globe",
	"state": {
		"opened": false,
		"selected": true
	}
}, {
	"id": "438",
	"parent": "73",
	"text": "SALAMANCA",
	"icon": "fa fa-globe",
	"state": {
		"opened": false,
		"selected": true
	}
}, {
	"id": "820",
	"parent": "73",
	"text": "SAN FRANCISCO DEL RINCON",
	"icon": "fa fa-globe",
	"state": {
		"opened": false,
		"selected": true
	}
}, {
	"id": "824",
	"parent": "591",
	"text": "TEPEJI",
	"icon": "fa fa-globe",
	"state": {
		"opened": false,
		"selected": true
	}
}, {
	"id": "535",
	"parent": "591",
	"text": "TIZAYUCA",
	"icon": "fa fa-globe",
	"state": {
		"opened": false,
		"selected": true
	}
}, {
	"id": "529",
	"parent": "591",
	"text": "ATLACOMULCO",
	"icon": "fa fa-globe",
	"state": {
		"opened": false,
		"selected": true
	}
}, {
	"id": "1977",
	"parent": "1976",
	"text": "TULUM",
	"icon": "fa fa-globe",
	"state": {
		"opened": false,
		"selected": true
	}
}, {
	"id": "114",
	"parent": "73",
	"text": "SAN LUIS POTOSI",
	"icon": "fa fa-globe",
	"state": {
		"opened": false,
		"selected": true
	}
}, {
	"id": "124",
	"parent": "1",
	"text": "OCCIDENTE",
	"icon": "fa fa-globe",
	"state": {
		"opened": false,
		"selected": true
	}
}, {
	"id": "517",
	"parent": "207",
	"text": "CAMPECHE",
	"icon": "fa fa-globe",
	"state": {
		"opened": false,
		"selected": true
	}
}, {
	"id": "589",
	"parent": "518",
	"text": "CHETUMAL",
	"icon": "fa fa-globe",
	"state": {
		"opened": false,
		"selected": true
	}
}, {
	"id": "454",
	"parent": "124",
	"text": "LAZARO CARDENAS",
	"icon": "fa fa-globe",
	"state": {
		"opened": false,
		"selected": true
	}
}, {
	"id": "790",
	"parent": "464",
	"text": "URUAPAN",
	"icon": "fa fa-globe",
	"state": {
		"opened": false,
		"selected": true
	}
}, {
	"id": "818",
	"parent": "438",
	"text": "SALAMANCA",
	"icon": "fa fa-globe",
	"state": {
		"opened": false,
		"selected": true
	}
}, {
	"id": "830",
	"parent": "829",
	"text": "SAN JUAN TEOTIHUACAN",
	"icon": "fa fa-globe",
	"state": {
		"opened": false,
		"selected": true
	}
}, {
	"id": "846",
	"parent": "529",
	"text": "ATLACOMULCO",
	"icon": "fa fa-globe",
	"state": {
		"opened": false,
		"selected": true
	}
}, {
	"id": "525",
	"parent": "591",
	"text": "JALMOLONGA",
	"icon": "fa fa-globe",
	"state": {
		"opened": false,
		"selected": true
	}
}, {
	"id": "1976",
	"parent": "207",
	"text": "TULUM",
	"icon": "fa fa-globe",
	"state": {
		"opened": false,
		"selected": true
	}
}, {
	"id": "83",
	"parent": "73",
	"text": "CELAYA",
	"icon": "fa fa-globe",
	"state": {
		"opened": false,
		"selected": true
	}
}, {
	"id": "93",
	"parent": "92",
	"text": "LEON",
	"icon": "fa fa-globe",
	"state": {
		"opened": false,
		"selected": true
	}
}, {
	"id": "570",
	"parent": "435",
	"text": "IRAPUATO",
	"icon": "fa fa-globe",
	"state": {
		"opened": false,
		"selected": true
	}
}, {
	"id": "521",
	"parent": "207",
	"text": "PLAYA DEL CARMEN",
	"icon": "fa fa-globe",
	"state": {
		"opened": false,
		"selected": true
	}
}, {
	"id": "595",
	"parent": "592",
	"text": "NORTE",
	"icon": "fa fa-globe",
	"state": {
		"opened": false,
		"selected": true
	}
}, {
	"id": "593",
	"parent": "591",
	"text": "TOLUCA",
	"icon": "fa fa-globe",
	"state": {
		"opened": false,
		"selected": true
	}
}, {
	"id": "600",
	"parent": "125",
	"text": "GUADALAJARA",
	"icon": "fa fa-globe",
	"state": {
		"opened": false,
		"selected": true
	}
}, {
	"id": "788",
	"parent": "450",
	"text": "CIUDAD GUZMAN",
	"icon": "fa fa-globe",
	"state": {
		"opened": false,
		"selected": true
	}
}, {
	"id": "452",
	"parent": "124",
	"text": "LA PIEDAD",
	"icon": "fa fa-globe",
	"state": {
		"opened": false,
		"selected": true
	}
}, {
	"id": "805",
	"parent": "520",
	"text": "ISLA MUJERES",
	"icon": "fa fa-globe",
	"state": {
		"opened": false,
		"selected": true
	}
}, {
	"id": "821",
	"parent": "820",
	"text": "SAN FRANCISCO DEL RINCON",
	"icon": "fa fa-globe",
	"state": {
		"opened": false,
		"selected": true
	}
}, {
	"id": "533",
	"parent": "591",
	"text": "IXMIQUILPAN",
	"icon": "fa fa-globe",
	"state": {
		"opened": false,
		"selected": true
	}
}, {
	"id": "532",
	"parent": "591",
	"text": "APAN",
	"icon": "fa fa-globe",
	"state": {
		"opened": false,
		"selected": true
	}
}, {
	"id": "850",
	"parent": "849",
	"text": "MANINALCO",
	"icon": "fa fa-globe",
	"state": {
		"opened": false,
		"selected": true
	}
}, {
	"id": "849",
	"parent": "591",
	"text": "MANINALCO",
	"icon": "fa fa-globe",
	"state": {
		"opened": false,
		"selected": true
	}
}]

var testing_intervenciones=
    [
        {
            "id": 1,
            "nombre": "DELIVERY",
            "nivel": 1,
            "idPadre": 0,
            "asignacionAutomatica": 1,
            "horasConfirmacion": 5
        },
        {
            "id": 2,
            "nombre": "DELIVERY II ",
            "nivel": 1,
            "idPadre": 0,
            "asignacionAutomatica": 1,
            "horasConfirmacion": 5
        }
        ,{
            "id": 3,
            "nombre": "DELIVERY CHILD I ",
            "nivel": 2,
            "idPadre": 1,
            "asignacionAutomatica": 1,
            "horasConfirmacion": 5
        }
        ,{
            "id": 4,
            "nombre": "1.-DELIVERY child II ",
            "nivel": 2,
            "idPadre": 2,
            "asignacionAutomatica": 1,
            "horasConfirmacion": 5
        }
        ,{
            "id": 5,
            "nombre": "2.-DELIVERY child II ",
            "nivel": 2,
            "idPadre": 2,
            "asignacionAutomatica": 1,
            "horasConfirmacion": 5
        }
        
    ]


var accionesOt = 
{
	"success": true,
	"result": {
		"result": "0",
		"resultdescription": "Operaci&oacute;n exitosa.",
		"Acciones": [{
			"ID_Accion": "23",
			"Descripcion": "ENVIO A INFRAESTRUCTURA",
			"Color": "#F4404A",
			"ID_Status": "3",
			"Campo": [{
				"ID_Campo": "1",
				"Descripcion": "COMENTARIOS",
				"TipoCampo": "textarea"
			}, {
				"ID_Campo": "2",
				"Descripcion": "ESTADO",
				"TipoCampo": "select"
			}, {
				"ID_Campo": "3",
				"Descripcion": "MOTIVO",
				"TipoCampo": "select"
			}]
		}, {
			"ID_Accion": "5",
			"Descripcion": "LIBERAR ORDEN, CONTINUAR CON EL TRABAJO",
			"Color": "#93B8BE",
			"Campo": [{
				"ID_Campo": "1",
				"Descripcion": "COMENTARIOS",
				"TipoCampo": "textarea"
			}]
		}]
	}
}

var evidenciaOT = {
    "result": {
        "evidencias": [
            {
                "idEvidencia": 864,
                "nombreEvidencia": "left_evidence2022-01-14-09-19-44-359.jpg",
                "extension": "jpg",
                "storagePath": "totalplay-ffm-core-dev.appspot.com/ordenes/mx/2022/soporte//left_evidence2022-01-14-09-19-44-359.jpg.jpg",
                "url": "https://firebasestorage.googleapis.com/v0/b/totalplay-ffm-core-dev.appspot.com/o/ordenes%2Fmx%2F2022%2Fsoporte%2F%2Fleft_evidence2022-01-14-09-19-44-359.jpg.jpg?alt=media&token=uuidv4()",
                "idOrden": 219017,
                "idUsuario": 125471,
                "noEmpleado": "65030867",
                "nombreEmpleado": "KARLA MONTSERRAT CAMACHO DOMINGUEZ",
                "idCatEvidencia": 100,
                "tipoEvidencia": "LATERAL IZQUIERDO",
                "idOrigen": 2,
                "origen": "FFM APP",
                "latitud": 19.3342595,
                "longitud": -99.1986679,
                "fechaRegistro": "2022/01/14",
                "fechaActualizacion": "2022/01/14"
            },
            {
                "idEvidencia": 865,
                "nombreEvidencia": "center_evidence2022-01-14-09-19-25-168.jpg",
                "extension": "jpg",
                "storagePath": "totalplay-ffm-core-dev.appspot.com/ordenes/mx/2022/soporte//center_evidence2022-01-14-09-19-25-168.jpg.jpg",
                "url": "https://firebasestorage.googleapis.com/v0/b/totalplay-ffm-core-dev.appspot.com/o/ordenes%2Fmx%2F2022%2Fsoporte%2F%2Fcenter_evidence2022-01-14-09-19-25-168.jpg.jpg?alt=media&token=uuidv4()",
                "idOrden": 219017,
                "idUsuario": 125471,
                "noEmpleado": "65030867",
                "nombreEmpleado": "KARLA MONTSERRAT CAMACHO DOMINGUEZ",
                "idCatEvidencia": 101,
                "tipoEvidencia": "FRONTAL",
                "idOrigen": 2,
                "origen": "FFM APP",
                "latitud": 19.3342595,
                "longitud": -99.1986679,
                "fechaRegistro": "2022/01/14",
                "fechaActualizacion": "2022/01/14"
            },
            {
                "idEvidencia": 866,
                "nombreEvidencia": "right_evidence2022-01-14-09-19-33-238.jpg",
                "extension": "jpg",
                "storagePath": "totalplay-ffm-core-dev.appspot.com/ordenes/mx/2022/soporte//right_evidence2022-01-14-09-19-33-238.jpg.jpg",
                "url": "https://firebasestorage.googleapis.com/v0/b/totalplay-ffm-core-dev.appspot.com/o/ordenes%2Fmx%2F2022%2Fsoporte%2F%2Fright_evidence2022-01-14-09-19-33-238.jpg.jpg?alt=media&token=uuidv4()",
                "idOrden": 219017,
                "idUsuario": 125471,
                "noEmpleado": "65030867",
                "nombreEmpleado": "KARLA MONTSERRAT CAMACHO DOMINGUEZ",
                "idCatEvidencia": 102,
                "tipoEvidencia": "LATERAL DERECHO",
                "idOrigen": 2,
                "origen": "FFM APP",
                "latitud": 19.3342595,
                "longitud": -99.1986679,
                "fechaRegistro": "2022/01/14",
                "fechaActualizacion": "2022/01/14"
            },
            {
                "idEvidencia": 867,
                "nombreEvidencia": "conos_acordonamiento2022-01-14-09-25-56-921.jpg",
                "extension": "jpg",
                "storagePath": "totalplay-ffm-core-dev.appspot.com/ordenes/mx/2022/soporte//conos_acordonamiento2022-01-14-09-25-56-921.jpg.jpg",
                "url": "https://firebasestorage.googleapis.com/v0/b/totalplay-ffm-core-dev.appspot.com/o/ordenes%2Fmx%2F2022%2Fsoporte%2F%2Fconos_acordonamiento2022-01-14-09-25-56-921.jpg.jpg?alt=media&token=uuidv4()",
                "idOrden": 219017,
                "idUsuario": 125471,
                "noEmpleado": "65030867",
                "nombreEmpleado": "KARLA MONTSERRAT CAMACHO DOMINGUEZ",
                "idCatEvidencia": 103,
                "tipoEvidencia": "CONOS Y ACORDONAMIENTO",
                "idOrigen": 2,
                "origen": "FFM APP",
                "latitud": 19.334266,
                "longitud": -99.1986709,
                "fechaRegistro": "2022/01/14",
                "fechaActualizacion": "2022/01/14"
            },
            {
                "idEvidencia": 868,
                "nombreEvidencia": "casco_bandola2022-01-14-09-26-03-745.jpg",
                "extension": "jpg",
                "storagePath": "totalplay-ffm-core-dev.appspot.com/ordenes/mx/2022/soporte//casco_bandola2022-01-14-09-26-03-745.jpg.jpg",
                "url": "https://firebasestorage.googleapis.com/v0/b/totalplay-ffm-core-dev.appspot.com/o/ordenes%2Fmx%2F2022%2Fsoporte%2F%2Fcasco_bandola2022-01-14-09-26-03-745.jpg.jpg?alt=media&token=uuidv4()",
                "idOrden": 219017,
                "idUsuario": 125471,
                "noEmpleado": "65030867",
                "nombreEmpleado": "KARLA MONTSERRAT CAMACHO DOMINGUEZ",
                "idCatEvidencia": 104,
                "tipoEvidencia": "CASCO, BANDOLA Y BOTAS",
                "idOrigen": 2,
                "origen": "FFM APP",
                "latitud": 19.334266,
                "longitud": -99.1986709,
                "fechaRegistro": "2022/01/14",
                "fechaActualizacion": "2022/01/14"
            },
            {
                "idEvidencia": 869,
                "nombreEvidencia": "linea_vida2022-01-14-09-26-11-979.jpg",
                "extension": "jpg",
                "storagePath": "totalplay-ffm-core-dev.appspot.com/ordenes/mx/2022/soporte//linea_vida2022-01-14-09-26-11-979.jpg.jpg",
                "url": "https://firebasestorage.googleapis.com/v0/b/totalplay-ffm-core-dev.appspot.com/o/ordenes%2Fmx%2F2022%2Fsoporte%2F%2Flinea_vida2022-01-14-09-26-11-979.jpg.jpg?alt=media&token=uuidv4()",
                "idOrden": 219017,
                "idUsuario": 125471,
                "noEmpleado": "65030867",
                "nombreEmpleado": "KARLA MONTSERRAT CAMACHO DOMINGUEZ",
                "idCatEvidencia": 105,
                "tipoEvidencia": "LINEA DE VIDA EN LA ESCALERA",
                "idOrigen": 2,
                "origen": "FFM APP",
                "latitud": 19.334266,
                "longitud": -99.1986709,
                "fechaRegistro": "2022/01/14",
                "fechaActualizacion": "2022/01/14"
            }
        ]
    },
    "resultDescripcion": "Accion completada",
    "mensajeException": null,
    "respuesta": true
}

var detalleEvidencias = {
    "result": {
        "evidencias": [
            {
                "idEvidencia": 864,
                "nombreEvidencia": "left_evidence2022-01-14-09-19-44-359.jpg",
                "extension": "jpg",
                "storagePath": "totalplay-ffm-core-dev.appspot.com/ordenes/mx/2022/soporte//left_evidence2022-01-14-09-19-44-359.jpg.jpg",
                "url": "https://firebasestorage.googleapis.com/v0/b/totalplay-ffm-core-dev.appspot.com/o/ordenes%2Fmx%2F2022%2Fsoporte%2F%2Fleft_evidence2022-01-14-09-19-44-359.jpg.jpg?alt=media&token=uuidv4()",
                "idOrden": 219017,
                "idUsuario": 125471,
                "noEmpleado": "65030867",
                "nombreEmpleado": "KARLA MONTSERRAT CAMACHO DOMINGUEZ",
                "idCatEvidencia": 100,
                "tipoEvidencia": "LATERAL IZQUIERDO",
                "idOrigen": 2,
                "origen": "FFM APP",
                "latitud": 19.3342595,
                "longitud": -99.1986679,
                "fechaRegistro": "2022/01/14",
                "fechaActualizacion": "2022/01/14"
            },
            {
                "idEvidencia": 865,
                "nombreEvidencia": "center_evidence2022-01-14-09-19-25-168.jpg",
                "extension": "jpg",
                "storagePath": "totalplay-ffm-core-dev.appspot.com/ordenes/mx/2022/soporte//center_evidence2022-01-14-09-19-25-168.jpg.jpg",
                "url": "https://firebasestorage.googleapis.com/v0/b/totalplay-ffm-core-dev.appspot.com/o/ordenes%2Fmx%2F2022%2Fsoporte%2F%2Fcenter_evidence2022-01-14-09-19-25-168.jpg.jpg?alt=media&token=uuidv4()",
                "idOrden": 219017,
                "idUsuario": 125471,
                "noEmpleado": "65030867",
                "nombreEmpleado": "KARLA MONTSERRAT CAMACHO DOMINGUEZ",
                "idCatEvidencia": 101,
                "tipoEvidencia": "FRONTAL",
                "idOrigen": 2,
                "origen": "FFM APP",
                "latitud": 19.3342595,
                "longitud": -99.1986679,
                "fechaRegistro": "2022/01/14",
                "fechaActualizacion": "2022/01/14"
            },
            {
                "idEvidencia": 866,
                "nombreEvidencia": "right_evidence2022-01-14-09-19-33-238.jpg",
                "extension": "jpg",
                "storagePath": "totalplay-ffm-core-dev.appspot.com/ordenes/mx/2022/soporte//right_evidence2022-01-14-09-19-33-238.jpg.jpg",
                "url": "https://firebasestorage.googleapis.com/v0/b/totalplay-ffm-core-dev.appspot.com/o/ordenes%2Fmx%2F2022%2Fsoporte%2F%2Fright_evidence2022-01-14-09-19-33-238.jpg.jpg?alt=media&token=uuidv4()",
                "idOrden": 219017,
                "idUsuario": 125471,
                "noEmpleado": "65030867",
                "nombreEmpleado": "KARLA MONTSERRAT CAMACHO DOMINGUEZ",
                "idCatEvidencia": 102,
                "tipoEvidencia": "LATERAL DERECHO",
                "idOrigen": 2,
                "origen": "FFM APP",
                "latitud": 19.3342595,
                "longitud": -99.1986679,
                "fechaRegistro": "2022/01/14",
                "fechaActualizacion": "2022/01/14"
            },
            {
                "idEvidencia": 867,
                "nombreEvidencia": "conos_acordonamiento2022-01-14-09-25-56-921.jpg",
                "extension": "jpg",
                "storagePath": "totalplay-ffm-core-dev.appspot.com/ordenes/mx/2022/soporte//conos_acordonamiento2022-01-14-09-25-56-921.jpg.jpg",
                "url": "https://firebasestorage.googleapis.com/v0/b/totalplay-ffm-core-dev.appspot.com/o/ordenes%2Fmx%2F2022%2Fsoporte%2F%2Fconos_acordonamiento2022-01-14-09-25-56-921.jpg.jpg?alt=media&token=uuidv4()",
                "idOrden": 219017,
                "idUsuario": 125471,
                "noEmpleado": "65030867",
                "nombreEmpleado": "KARLA MONTSERRAT CAMACHO DOMINGUEZ",
                "idCatEvidencia": 103,
                "tipoEvidencia": "CONOS Y ACORDONAMIENTO",
                "idOrigen": 2,
                "origen": "FFM APP",
                "latitud": 19.334266,
                "longitud": -99.1986709,
                "fechaRegistro": "2022/01/14",
                "fechaActualizacion": "2022/01/14"
            },
            {
                "idEvidencia": 868,
                "nombreEvidencia": "casco_bandola2022-01-14-09-26-03-745.jpg",
                "extension": "jpg",
                "storagePath": "totalplay-ffm-core-dev.appspot.com/ordenes/mx/2022/soporte//casco_bandola2022-01-14-09-26-03-745.jpg.jpg",
                "url": "https://firebasestorage.googleapis.com/v0/b/totalplay-ffm-core-dev.appspot.com/o/ordenes%2Fmx%2F2022%2Fsoporte%2F%2Fcasco_bandola2022-01-14-09-26-03-745.jpg.jpg?alt=media&token=uuidv4()",
                "idOrden": 219017,
                "idUsuario": 125471,
                "noEmpleado": "65030867",
                "nombreEmpleado": "KARLA MONTSERRAT CAMACHO DOMINGUEZ",
                "idCatEvidencia": 104,
                "tipoEvidencia": "CASCO, BANDOLA Y BOTAS",
                "idOrigen": 2,
                "origen": "FFM APP",
                "latitud": 19.334266,
                "longitud": -99.1986709,
                "fechaRegistro": "2022/01/14",
                "fechaActualizacion": "2022/01/14"
            },
            {
                "idEvidencia": 869,
                "nombreEvidencia": "linea_vida2022-01-14-09-26-11-979.jpg",
                "extension": "jpg",
                "storagePath": "totalplay-ffm-core-dev.appspot.com/ordenes/mx/2022/soporte//linea_vida2022-01-14-09-26-11-979.jpg.jpg",
                "url": "https://firebasestorage.googleapis.com/v0/b/totalplay-ffm-core-dev.appspot.com/o/ordenes%2Fmx%2F2022%2Fsoporte%2F%2Flinea_vida2022-01-14-09-26-11-979.jpg.jpg?alt=media&token=uuidv4()",
                "idOrden": 219017,
                "idUsuario": 125471,
                "noEmpleado": "65030867",
                "nombreEmpleado": "KARLA MONTSERRAT CAMACHO DOMINGUEZ",
                "idCatEvidencia": 105,
                "tipoEvidencia": "LINEA DE VIDA EN LA ESCALERA",
                "idOrigen": 2,
                "origen": "FFM APP",
                "latitud": 19.334266,
                "longitud": -99.1986709,
                "fechaRegistro": "2022/01/14",
                "fechaActualizacion": "2022/01/14"
            }
        ]
    },
    "resultDescripcion": "Accion completada",
    "mensajeException": null,
    "respuesta": true
}


var JSONArraysPagos = {
    "pagos": [
        {
            "idPago": 221,
            "idCveCliente": "0100000185",
            "folioSistema": "OS-7640234",
            "monto": 535,
            "fechaRegistroPago": "25/08/21 05:58",
            "hora": "168 dias",
            "idEstatusPago": 2,
            "descEstatusPago": "PENDIENTE",
            "idOrden": 95179,
            "fechaHoraCierreOT": "",
            "tipoIntervencion": "INSTALACION",
            "subTipoIntervencion": "INSTALACION HUAWEI"
        },
        {
            "idPago": 279,
            "idCveCliente": "2100703000",
            "folioSistema": "OS-7640234",
            "monto": 530,
            "fechaRegistroPago": "22/09/21 10:51",
            "hora": "140 dias",
            "idEstatusPago": 2,
            "descEstatusPago": "PENDIENTE",
            "idOrden": 2134,
            "fechaHoraCierreOT": "",
            "tipoIntervencion": "INSTALACION",
            "subTipoIntervencion": "INSTALACION NUEVA"
        },
        {
            "idPago": 247,
            "idCveCliente": "0100000185",
            "folioSistema": "OS-7640234",
            "monto": 530,
            "fechaRegistroPago": "10/09/21 11:40",
            "hora": "152 dias",
            "idEstatusPago": 2,
            "descEstatusPago": "PENDIENTE",
            "idOrden": 95179,
            "fechaHoraCierreOT": "",
            "tipoIntervencion": "INSTALACION",
            "subTipoIntervencion": "INSTALACION HUAWEI"
        }
    ]
}