var jsonHorarios=[{ "id": "41", "descripcion": "06:00-20:57" }, { "id": "42", "descripcion": "07:00-20:57" }, { "id": "1", "descripcion": "08:00-20:57" }, { "id": "43", "descripcion": "08:00-20:57" }, { "id": "21", "descripcion": "09:00-20:57" }, { "id": "44", "descripcion": "09:00-20:57" }, { "id": "45", "descripcion": "10:00-20:57" }, { "id": "46", "descripcion": "11:00-20:57" }, { "id": "2", "descripcion": "11:00-20:57" }, { "id": "47", "descripcion": "12:00-20:57" }, { "id": "48", "descripcion": "13:00-20:57" }, { "id": "49", "descripcion": "14:00-20:57" }]

var jsonIntervenciones=[{"id": "1", "descripcion": "ENTREGA DE CONTROL NETFLIX", "permiso": false}, {"id": "100", "descripcion": "ACOMETIDA TP", "permiso": false}, {"id": "49", "descripcion": "INSTALACION HUAWEI", "permiso": false}, {"id": "57", "descripcion": "SOPORTE CON POTENCIA ZTE", "permiso": false}, {"id": "58", "descripcion": "SOPORTE SIN POTENCIA ZTE", "permiso": false}, {"id": "59", "descripcion": "SOPORTE SIN POTENCIA HUAWEI", "permiso": false}, {"id": "60", "descripcion": "SOPORTE CON POTENCIA HUAWEI", "permiso": false}, {"id": "66", "descripcion": "CAMBIO DE DOMICILIO HUAWEI", "permiso": false}, {"id": "67", "descripcion": "ADICIONAL", "permiso": false}, {"id": "72", "descripcion": "CAMBIO DE DOMICILIO ZTE", "permiso": false}, {"id": "78", "descripcion": "COBRANZA", "permiso": false}, {"id": "79", "descripcion": "INVOLUNTARIA PI", "permiso": false}, {"id": "76", "descripcion": "INSTALACION ZTE", "permiso": false}, {"id": "52", "descripcion": "V_CALIDAD", "permiso": false}, {"id": "80", "descripcion": "VOLUNTARIA", "permiso": false}, {"id": "92", "descripcion": "TICKET PROACTIVO", "permiso": false}, {"id": "81", "descripcion": "PROFECO", "permiso": false}, {"id": "89", "descripcion": "SOPORTE EMPRESARIAL", "permiso": false}, {"id": "87", "descripcion": "INVOLUNTARIA", "permiso": false}, {"id": "35", "descripcion": "DISTRIBUIDOR", "permiso": false}, {"id": "51", "descripcion": "VENTA EXPRESS", "permiso": false}, {"id": "99", "descripcion": "CAMBIO DE EQUIPO", "permiso": false}, {"id": "100", "descripcion": "INSTALACION AR", "permiso": false}, {"id": "124", "descripcion": "INSTALACION PREPAGO", "permiso": false}, {"id": "126", "descripcion": "SOPORTE PREPAGO", "permiso": false}, {"id": "128", "descripcion": "ADDON PROACTIVO PREPAGO", "permiso": false}, {"id": "141", "descripcion": "APOYO A TECNICO", "permiso": false}, {"id": "144", "descripcion": "INS HOGAR SEGURO", "permiso": false}, {"id": "147", "descripcion": "INSTALACION ADDON WIFI EXT", "permiso": false}, {"id": "148", "descripcion": "SOPORTE ADDON WIFI EXT", "permiso": false}, {"id": "96", "descripcion": "CAMBIO DE DOMICILIO TP", "permiso": false}, {"id": "97", "descripcion": "CAMBIO DE DOMICILIO EMP", "permiso": false}, {"id": "146", "descripcion": "ADDON W", "permiso": false}, {"id": "133", "descripcion": "SOPORTE HOGAR SEGURO", "permiso": false}, {"id": "139", "descripcion": "INSTALACION VENTA TECNICO", "permiso": false}, {"id": "150", "descripcion": "CAMBIO DE PLAN WIFI EXT", "permiso": false}, {"id": "94", "descripcion": "INSTALACION EMPRESARIAL", "permiso": false}, {"id": "129", "descripcion": "PROACTIVO POR ATENUACION", "permiso": false}, {"id": "131", "descripcion": "ADDON HOGAR SEGURO", "permiso": false}, {"id": "138", "descripcion": "INSTALACION VIDEO VIGILANCIA", "permiso": false}, {"id": "140", "descripcion": "KIT VIDEO VIGILANCIA", "permiso": false}]

var jsonUsuarioTest=[
    {
      "idUsuario": 2,
      "usuario": "FFMBACK",
      "no_empleado": "15005909",
      "nombreCompleto": "ERNESTO PEREZ SANCHEZ",
      "nombre": "ERNESTO",
      "apellidoPaterno": "PEREZ",
      "apellidoMaterno": "SANCHEZ",
      "idGeografia": 1,
      "geografia": "ENLACE",
      "fechaActualizacion": "2021/05/24",
      "geografias": [
        {
          "idGeografia": 365,
          "geografia": "PELICANO 2"
        }
      ],
      "skills": [
        84,90
      ]
    },
     {
      "idUsuario": 3,
      "usuario": "FFM",
      "no_empleado": "15005910",
      "nombreCompleto": "FFM FFM FFM",
      "nombre": "FFM",
      "apellidoPaterno": "FFM",
      "apellidoMaterno": "FFM",
      "idGeografia": 1,
      "geografia": "ENLACE",
      "fechaActualizacion": "2021/05/24",
      "geografias": [
        {
          "idGeografia": 365,
          "geografia": "PELICANO 2"
        }
      ],
      "skills": [
        84,90
      ]
    },
     {
      "idUsuario": 4,
      "usuario": "FFM",
      "no_empleado": "15005911",
      "nombreCompleto": "TECNICO TECNICO FFM",
      "nombre": "TECNICO",
      "apellidoPaterno": "TECNICO",
      "apellidoMaterno": "FFM",
      "idGeografia": 1,
      "geografia": "ENLACE",
      "fechaActualizacion": "2021/05/24",
      "geografias": [
        {
          "idGeografia": 365,
          "geografia": "PELICANO 2"
        }
      ],
      "skills": [
        84,90
      ]
    }
  ]


let jsonTestingOperarios={
	"result": {
		"mensaje": "Operacion exitosa",
		"description": "Ordenes encontradas",
		"detalleTecnicos": [
      {
        
      },{
			"idTecnico": 11.0,
			"idEstatusTecnico": 1.0,
			"descipcionEstatusTecnico": "EN LINEA",
			"numeroEmpleado": "GABMXOP144",
			"usuarioFFM": "GABMXOP144",
			"numContacto": "5514555274",
			"nombre": "CARLOS ALBERTO",
			"apellidoPaterno": "SOLIS",
			"apellidoMaterno": "REYES",
			"urlFotoPerfil": "https://firebasestorage.googleapis.com/v0/b/totalplay-ffm-core-dev.appspot.com/o/usuarios%2FCarlos%20Alberto%20Solis%20Reyes.jpeg?alt=media&token=453064cc-4c1e-4a79-9abf-c5fc750f1ed3",
			"idTipoUsuario": 7.0,
			"descripcionTipoUsuario": "TECNICO",
			"centro": "SATE",
			"almacen": "S100",
			"color": "36A9FF",
			"latitud": 19.3278328723,
			"longitud": -22.89298238932
		}, {
			"idTecnico": 12.0,
			"idEstatusTecnico": 1.0,
			"descipcionEstatusTecnico": "EN LINEA",
			"numeroEmpleado": "GABMXOP143",
			"usuarioFFM": "GABMXOP143",
			"numContacto": "5514555274",
			"nombre": "ERIK GUSTAVO",
			"apellidoPaterno": "GORDILLO",
			"apellidoMaterno": "DELGADO",
			"urlFotoPerfil": "",
			"idTipoUsuario": 7.0,
			"descripcionTipoUsuario": "TECNICO",
			"centro": "SATE",
			"almacen": "S100",
			"color": "36A9FF",
			"latitud": 19.3278328723,
			"longitud": -22.89298238932
		}, {
			"idTecnico": 13.0,
			"idEstatusTecnico": 1.0,
			"descipcionEstatusTecnico": "EN LINEA",
			"numeroEmpleado": "GABMXOP142",
			"usuarioFFM": "GABMXOP142",
			"numContacto": "5514555274",
			"nombre": "EDER GUILLERMO",
			"apellidoPaterno": "MONTEJANO",
			"apellidoMaterno": "RAMIREZ",
			"urlFotoPerfil": "https://firebasestorage.googleapis.com/v0/b/totalplay-ffm-core-dev.appspot.com/o/usuarios%2FEder%20Guillermo%20Montejano%20Ram%C3%ADrez.jpeg?alt=media&token=f80a3155-9612-4429-b1c2-9a1bd1a337ae",
			"idTipoUsuario": 7.0,
			"descripcionTipoUsuario": "TECNICO",
			"centro": "SATE",
			"almacen": "S100",
			"color": "36A9FF",
			"latitud": 19.3278328723,
			"longitud": -22.89298238932
		}, {
			"idTecnico": 14.0,
			"idEstatusTecnico": 1.0,
			"descipcionEstatusTecnico": "EN LINEA",
			"numeroEmpleado": "GABMXOP141",
			"usuarioFFM": "GABMXOP141",
			"numContacto": "5514555274",
			"nombre": "URIEL",
			"apellidoPaterno": "MARTÍNEZ",
			"apellidoMaterno": "VAZQUEZ",
			"urlFotoPerfil": "",
			"idTipoUsuario": 7.0,
			"descripcionTipoUsuario": "TECNICO",
			"centro": "SATE",
			"almacen": "S100",
			"color": "36A9FF",
			"latitud": 19.3278328723,
			"longitud": -22.89298238932
		}, {
			"idTecnico": 15.0,
			"idEstatusTecnico": 1.0,
			"descipcionEstatusTecnico": "EN LINEA",
			"numeroEmpleado": "65005843",
			"usuarioFFM": "GABMXOP139",
			"numContacto": "5514555274",
			"nombre": "EDUARDO",
			"apellidoPaterno": "MEJIA",
			"apellidoMaterno": "TERCERO",
			"urlFotoPerfil": "",
			"idTipoUsuario": 7.0,
			"descripcionTipoUsuario": "TECNICO",
			"centro": "SATE",
			"almacen": "S100",
			"color": "36A9FF",
			"latitud": 19.3278328723,
			"longitud": -22.89298238932
		}]
	},
	"resultDescripcion": "Accion completada",
	"mensajeException": null,
	"respuesta": true
}