package com.totalplay.ffm.plantaexterna.service.impl;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.totalplay.ffm.plantaexterna.service.DespachoPEService;
import com.totalplay.ffm.utilerias.model.ServiceResponseResult;

@Service
public class ImplDespachoPEService implements DespachoPEService {

	@Override
	public ServiceResponseResult consultarFiltrosPE(String params) {
		ServiceResponseResult response = ServiceResponseResult.builder()
				.isRespuesta(true)
				.resultDescripcion("Accion exitosa")
				.build();
		
		String intervencion = 
				"[{\r\n" + 
				"	\"descripcion\": \"PLANTA EXTERNA\",\r\n" + 
				"	\"id\": \"30\",\r\n" + 
				"	\"listadoSubInter\": [{\r\n" + 
				"		\"descripcion\": \"SPLITTER SATURADO\",\r\n" + 
				"		\"id\": \"31\"\r\n" + 
				"	}, {\r\n" + 
				"		\"descripcion\": \"SPLITTER ATENUADO\",\r\n" + 
				"		\"id\": \"32\"\r\n" + 
				"	}, {\r\n" + 
				"		\"descripcion\": \"SPLITTER BAJA POTENCIA\",\r\n" + 
				"		\"id\": \"33\"\r\n" + 
				"	}, {\r\n" + 
				"		\"descripcion\": \"SPLITTER PUERTOS DAÑADOS\",\r\n" + 
				"		\"id\": \"34\"\r\n" + 
				"	}, {\r\n" + 
				"		\"descripcion\": \"ANCHO DE BANDA INSUFICIENTE\",\r\n" + 
				"		\"id\": \"90\"\r\n" + 
				"	}, {\r\n" + 
				"		\"descripcion\": \"SPLITTER NO ILUMINADO\",\r\n" + 
				"		\"id\": \"91\"\r\n" + 
				"	}, {\r\n" + 
				"		\"descripcion\": \"SPLITTER SIN POTENCIA\",\r\n" + 
				"		\"id\": \"92\"\r\n" + 
				"	}, {\r\n" + 
				"		\"descripcion\": \"PLANTA EXTERNA - COBERTURA TX\",\r\n" + 
				"		\"id\": \"187\"\r\n" + 
				"	}, {\r\n" + 
				"		\"descripcion\": \"SPLITTER MAYOR A 300 METROS\",\r\n" + 
				"		\"id\": \"189\"\r\n" + 
				"	}, {\r\n" + 
				"		\"descripcion\": \"ZONA SIN POSTERIA\",\r\n" + 
				"		\"id\": \"190\"\r\n" + 
				"	}]\r\n" + 
				"}, {\r\n" + 
				"	\"descripcion\": \"INSPECTOR DE RED\",\r\n" + 
				"	\"id\": \"97\",\r\n" + 
				"	\"listadoSubInter\": [{\r\n" + 
				"		\"descripcion\": \"POSTES\",\r\n" + 
				"		\"id\": \"98\"\r\n" + 
				"	}, {\r\n" + 
				"		\"descripcion\": \"ACOMETIDAS\",\r\n" + 
				"		\"id\": \"99\"\r\n" + 
				"	}, {\r\n" + 
				"		\"descripcion\": \"ETIQUETADO\",\r\n" + 
				"		\"id\": \"100\"\r\n" + 
				"	}, {\r\n" + 
				"		\"descripcion\": \"RUTAS\",\r\n" + 
				"		\"id\": \"101\"\r\n" + 
				"	}, {\r\n" + 
				"		\"descripcion\": \"GASA\",\r\n" + 
				"		\"id\": \"102\"\r\n" + 
				"	}, {\r\n" + 
				"		\"descripcion\": \"CIERRE\",\r\n" + 
				"		\"id\": \"103\"\r\n" + 
				"	}, {\r\n" + 
				"		\"descripcion\": \"ANEXOS\",\r\n" + 
				"		\"id\": \"130\"\r\n" + 
				"	}, {\r\n" + 
				"		\"descripcion\": \"RESERVA INS 1\",\r\n" + 
				"		\"id\": \"137\"\r\n" + 
				"	}, {\r\n" + 
				"		\"descripcion\": \"RESERVA INS 2\",\r\n" + 
				"		\"id\": \"138\"\r\n" + 
				"	}, {\r\n" + 
				"		\"descripcion\": \"RESERVA INS 3 \",\r\n" + 
				"		\"id\": \"139\"\r\n" + 
				"	}, {\r\n" + 
				"		\"descripcion\": \"RESERVA INS 4\",\r\n" + 
				"		\"id\": \"140\"\r\n" + 
				"	}]\r\n" + 
				"}, {\r\n" + 
				"	\"descripcion\": \"CORTE MASIVO\",\r\n" + 
				"	\"id\": \"119\",\r\n" + 
				"	\"listadoSubInter\": [{\r\n" + 
				"		\"descripcion\": \"CORTE MASIVO\",\r\n" + 
				"		\"id\": \"118\"\r\n" + 
				"	}]\r\n" + 
				"}, {\r\n" + 
				"	\"descripcion\": \"MANTENIMIENTO PREVENTIVO PI\",\r\n" + 
				"	\"id\": \"127\",\r\n" + 
				"	\"listadoSubInter\": [{\r\n" + 
				"		\"descripcion\": \"DESVIACION\",\r\n" + 
				"		\"id\": \"128\"\r\n" + 
				"	}, {\r\n" + 
				"		\"descripcion\": \"SPLITTER\",\r\n" + 
				"		\"id\": \"129\"\r\n" + 
				"	}, {\r\n" + 
				"		\"descripcion\": \"MANTENIMIENTO MAYOR\",\r\n" + 
				"		\"id\": \"131\"\r\n" + 
				"	}, {\r\n" + 
				"		\"descripcion\": \"MANTENIMIENTO MENOR\",\r\n" + 
				"		\"id\": \"132\"\r\n" + 
				"	}, {\r\n" + 
				"		\"descripcion\": \"RESERVA PIPE 1\",\r\n" + 
				"		\"id\": \"133\"\r\n" + 
				"	}, {\r\n" + 
				"		\"descripcion\": \"RESERVA PIPE 2\",\r\n" + 
				"		\"id\": \"134\"\r\n" + 
				"	}, {\r\n" + 
				"		\"descripcion\": \"RESERVA PIPE 3\",\r\n" + 
				"		\"id\": \"135\"\r\n" + 
				"	}, {\r\n" + 
				"		\"descripcion\": \"INSPECCION DE CALIDAD\",\r\n" + 
				"		\"id\": \"136\"\r\n" + 
				"	}, {\r\n" + 
				"		\"descripcion\": \"HALLAZGO EMPRESARIAL\",\r\n" + 
				"		\"id\": \"246\"\r\n" + 
				"	}]\r\n" + 
				"}, {\r\n" + 
				"	\"descripcion\": \"PLANTA EXTERNA TX\",\r\n" + 
				"	\"id\": \"153\",\r\n" + 
				"	\"listadoSubInter\": [{\r\n" + 
				"		\"descripcion\": \"SPLITTER SIN POTENCIA\",\r\n" + 
				"		\"id\": \"229\"\r\n" + 
				"	}, {\r\n" + 
				"		\"descripcion\": \"ANCHO DE BANDA INSUFICIENTE\",\r\n" + 
				"		\"id\": \"230\"\r\n" + 
				"	}, {\r\n" + 
				"		\"descripcion\": \"ZONA SIN POSTERIA\",\r\n" + 
				"		\"id\": \"231\"\r\n" + 
				"	}, {\r\n" + 
				"		\"descripcion\": \"SPLITTER A MAS DE 300 METROS\",\r\n" + 
				"		\"id\": \"232\"\r\n" + 
				"	}, {\r\n" + 
				"		\"descripcion\": \"SPLITTER ATENUADO\",\r\n" + 
				"		\"id\": \"233\"\r\n" + 
				"	}, {\r\n" + 
				"		\"descripcion\": \"SPLITTER PUERTOS DAÑADOS\",\r\n" + 
				"		\"id\": \"234\"\r\n" + 
				"	}, {\r\n" + 
				"		\"descripcion\": \"SPLITTER SATURADO\",\r\n" + 
				"		\"id\": \"235\"\r\n" + 
				"	}, {\r\n" + 
				"		\"descripcion\": \"SPLITTER NO ILUMINADO\",\r\n" + 
				"		\"id\": \"239\"\r\n" + 
				"	}, {\r\n" + 
				"		\"descripcion\": \"SPLITTER BAJA POTENCIA\",\r\n" + 
				"		\"id\": \"240\"\r\n" + 
				"	}, {\r\n" + 
				"		\"descripcion\": \"SPLITTER SIN POTENCIA\",\r\n" + 
				"		\"id\": \"241\"\r\n" + 
				"	}, {\r\n" + 
				"		\"descripcion\": \"BACKLOG TX\",\r\n" + 
				"		\"id\": \"242\"\r\n" + 
				"	}]\r\n" + 
				"}]";
		
		String cluster = 
				"[{\r\n" + 
				"	\"descripcion\": \"TOTALPLAY EMPRESARIAL\",\r\n" + 
				"	\"nivel\": \"0\",\r\n" + 
				"	\"id\": \"1\",\r\n" + 
				"	\"idPadre\": \"nulo\"\r\n" + 
				"}, {\r\n" + 
				"	\"descripcion\": \"VERACRUZ\",\r\n" + 
				"	\"nivel\": \"1\",\r\n" + 
				"	\"id\": \"189\",\r\n" + 
				"	\"idPadre\": \"1\"\r\n" + 
				"}, {\r\n" + 
				"	\"descripcion\": \"BCN\",\r\n" + 
				"	\"nivel\": \"1\",\r\n" + 
				"	\"id\": \"2\",\r\n" + 
				"	\"idPadre\": \"1\"\r\n" + 
				"}, {\r\n" + 
				"	\"descripcion\": \"REGION 2 TX\",\r\n" + 
				"	\"nivel\": \"1\",\r\n" + 
				"	\"id\": \"1038\",\r\n" + 
				"	\"idPadre\": \"1\"\r\n" + 
				"}, {\r\n" + 
				"	\"descripcion\": \"REGION 3 TX\",\r\n" + 
				"	\"nivel\": \"1\",\r\n" + 
				"	\"id\": \"1039\",\r\n" + 
				"	\"idPadre\": \"1\"\r\n" + 
				"}, {\r\n" + 
				"	\"descripcion\": \"REGION 4 TX\",\r\n" + 
				"	\"nivel\": \"1\",\r\n" + 
				"	\"id\": \"1040\",\r\n" + 
				"	\"idPadre\": \"1\"\r\n" + 
				"}, {\r\n" + 
				"	\"descripcion\": \"REGION 5 TX\",\r\n" + 
				"	\"nivel\": \"1\",\r\n" + 
				"	\"id\": \"1041\",\r\n" + 
				"	\"idPadre\": \"1\"\r\n" + 
				"}, {\r\n" + 
				"	\"descripcion\": \"REGION 6 TX\",\r\n" + 
				"	\"nivel\": \"1\",\r\n" + 
				"	\"id\": \"1042\",\r\n" + 
				"	\"idPadre\": \"1\"\r\n" + 
				"}, {\r\n" + 
				"	\"descripcion\": \"REGION 7 TX\",\r\n" + 
				"	\"nivel\": \"1\",\r\n" + 
				"	\"id\": \"1043\",\r\n" + 
				"	\"idPadre\": \"1\"\r\n" + 
				"}, {\r\n" + 
				"	\"descripcion\": \"REGION 8 TX\",\r\n" + 
				"	\"nivel\": \"1\",\r\n" + 
				"	\"id\": \"1044\",\r\n" + 
				"	\"idPadre\": \"1\"\r\n" + 
				"}, {\r\n" + 
				"	\"descripcion\": \"REGION 9 TX\",\r\n" + 
				"	\"nivel\": \"1\",\r\n" + 
				"	\"id\": \"1045\",\r\n" + 
				"	\"idPadre\": \"1\"\r\n" + 
				"}, {\r\n" + 
				"	\"descripcion\": \"REGION TX\",\r\n" + 
				"	\"nivel\": \"1\",\r\n" + 
				"	\"id\": \"968\",\r\n" + 
				"	\"idPadre\": \"1\"\r\n" + 
				"}, {\r\n" + 
				"	\"descripcion\": \"SUR\",\r\n" + 
				"	\"nivel\": \"1\",\r\n" + 
				"	\"id\": \"164\",\r\n" + 
				"	\"idPadre\": \"1\"\r\n" + 
				"}, {\r\n" + 
				"	\"descripcion\": \"SURESTE\",\r\n" + 
				"	\"nivel\": \"1\",\r\n" + 
				"	\"id\": \"207\",\r\n" + 
				"	\"idPadre\": \"1\"\r\n" + 
				"}, {\r\n" + 
				"	\"descripcion\": \"NORESTE\",\r\n" + 
				"	\"nivel\": \"1\",\r\n" + 
				"	\"id\": \"43\",\r\n" + 
				"	\"idPadre\": \"1\"\r\n" + 
				"}, {\r\n" + 
				"	\"descripcion\": \"OCCIDENTE\",\r\n" + 
				"	\"nivel\": \"1\",\r\n" + 
				"	\"id\": \"124\",\r\n" + 
				"	\"idPadre\": \"1\"\r\n" + 
				"}, {\r\n" + 
				"	\"descripcion\": \"MEGACENTRO\",\r\n" + 
				"	\"nivel\": \"1\",\r\n" + 
				"	\"id\": \"591\",\r\n" + 
				"	\"idPadre\": \"1\"\r\n" + 
				"}, {\r\n" + 
				"	\"descripcion\": \"CHIHUAHUA\",\r\n" + 
				"	\"nivel\": \"1\",\r\n" + 
				"	\"id\": \"17\",\r\n" + 
				"	\"idPadre\": \"1\"\r\n" + 
				"}, {\r\n" + 
				"	\"descripcion\": \"BAJIO\",\r\n" + 
				"	\"nivel\": \"1\",\r\n" + 
				"	\"id\": \"73\",\r\n" + 
				"	\"idPadre\": \"1\"\r\n" + 
				"}, {\r\n" + 
				"	\"descripcion\": \"REGION 1 TX\",\r\n" + 
				"	\"nivel\": \"1\",\r\n" + 
				"	\"id\": \"1037\",\r\n" + 
				"	\"idPadre\": \"1\"\r\n" + 
				"}, {\r\n" + 
				"	\"descripcion\": \"CRUCECITA TX\",\r\n" + 
				"	\"nivel\": \"2\",\r\n" + 
				"	\"id\": \"1500\",\r\n" + 
				"	\"idPadre\": \"1043\"\r\n" + 
				"}, {\r\n" + 
				"	\"descripcion\": \"CUAHUTEMOC TX\",\r\n" + 
				"	\"nivel\": \"2\",\r\n" + 
				"	\"id\": \"1136\",\r\n" + 
				"	\"idPadre\": \"1039\"\r\n" + 
				"}, {\r\n" + 
				"	\"descripcion\": \"CUAUTLA TX\",\r\n" + 
				"	\"nivel\": \"2\",\r\n" + 
				"	\"id\": \"1501\",\r\n" + 
				"	\"idPadre\": \"1043\"\r\n" + 
				"}, {\r\n" + 
				"	\"descripcion\": \"ABASOLO TX\",\r\n" + 
				"	\"nivel\": \"2\",\r\n" + 
				"	\"id\": \"1352\",\r\n" + 
				"	\"idPadre\": \"1042\"\r\n" + 
				"}, {\r\n" + 
				"	\"descripcion\": \"ACAMBARO TX\",\r\n" + 
				"	\"nivel\": \"2\",\r\n" + 
				"	\"id\": \"1353\",\r\n" + 
				"	\"idPadre\": \"1042\"\r\n" + 
				"}, {\r\n" + 
				"	\"descripcion\": \"ACAPONETA TX\",\r\n" + 
				"	\"nivel\": \"2\",\r\n" + 
				"	\"id\": \"1222\",\r\n" + 
				"	\"idPadre\": \"1041\"\r\n" + 
				"}, {\r\n" + 
				"	\"descripcion\": \"ACAPULCO TX\",\r\n" + 
				"	\"nivel\": \"2\",\r\n" + 
				"	\"id\": \"1487\",\r\n" + 
				"	\"idPadre\": \"1043\"\r\n" + 
				"}, {\r\n" + 
				"	\"descripcion\": \"ACAYUCAN TX\",\r\n" + 
				"	\"nivel\": \"2\",\r\n" + 
				"	\"id\": \"1488\",\r\n" + 
				"	\"idPadre\": \"1043\"\r\n" + 
				"}]";
		Map<Object, Object> parametros = new HashMap<>();
		
		Object intervenci = new Gson().fromJson(intervencion, Object.class);
		Object clust = new Gson().fromJson(cluster, Object.class);
		parametros.put("listFilterIntervencion", intervenci);
		parametros.put("listArbolFilter", clust);
		response.setRespuesta(true);
		response.setResult(parametros);
		response.setResultDescripcion("Operacion Exitosa");
		
		
		return response;
	}

	@Override
	public ServiceResponseResult consultarOperariosPE(String params) {
		ServiceResponseResult response = ServiceResponseResult.builder()
				.isRespuesta(true)
				.resultDescripcion("Accion exitosa")
				.build();
		
		
		String jsonString = 
			"["
				+ "{" 
				+ "\"idempleado\": \"3881\","   
				+ "\"nempleado\": \"GTBCD00002\","   
				+ "\"nombre\": \"ANDRES ALMONAZI RUIZ\","   
				+ "\"telefono\": \"5525692781\","   
				+ "\"urlimg\": \"\","   
				+ "\"contador\": \"1\","   
				+ "\"status\": \"1\","   
				+ "\"descripcion\": \"DISPONIBLE\","   
				+ "\"latitud\": \"1\","   
				+ "\"longitud\": \"1\","   
				+ "\"intervencion\": \"97\","   
				+ "\"color\": \"#5cbc5c\""   
				+ "},"
				
				+ "{" 
				+ "\"idempleado\": \"3200\","   
				+ "\"nempleado\": \"ANGELMXGUI\","   
				+ "\"nombre\": \"ANGEL DE JESUS GONZALES FLORES\","   
				+ "\"telefono\": \"5542085242\","   
				+ "\"urlimg\": \"\","   
				+ "\"contador\": \"0\","   
				+ "\"status\": \"1\","   
				+ "\"descripcion\": \"DISPONIBLE\","   
				+ "\"latitud\": \"19.3339865\","   
				+ "\"longitud\": \"-99.1985449\","   
				+ "\"intervencion\": \"30,93,97,153\","   
				+ "\"color\": \"#5cbc5c\""   
				+ "},"
				
				+ "{" 
				+ "\"idempleado\": \"2241\","   
				+ "\"nempleado\": \"chatmoskob\","   
				+ "\"nombre\": \"BRANDON MANUEL LOPEZ CASTRO\","   
				+ "\"telefono\": \"5525583595\","   
				+ "\"urlimg\": \"\","   
				+ "\"contador\": \"0\","   
				+ "\"status\": \"7\","   
				+ "\"descripcion\": \"FUERA DE SERVICIO\","   
				+ "\"latitud\": \"19.3339865\","   
				+ "\"longitud\": \"-99.1985449\","   
				+ "\"intervencion\": \"30,93\","   
				+ "\"color\": \"#242425\""   
				+ "},"
				
				+ "{" 
				+ "\"idempleado\": \"2085\","   
				+ "\"nempleado\": \"65714620PE\","   
				+ "\"nombre\": \"EDUARDO ISRAEL AVILES NOGUEZ\","   
				+ "\"telefono\": \"5513908903\","   
				+ "\"urlimg\": \"\","   
				+ "\"contador\": \"0\","   
				+ "\"status\": \"1\","   
				+ "\"descripcion\": \"DISPONIBLE\","   
				+ "\"latitud\": \"19.3339865\","   
				+ "\"longitud\": \"-99.1985449\","   
				+ "\"intervencion\": \"30,93\","   
				+ "\"color\": \"#5cbc5c\""   
				+ "},"
				
				+ "{" 
				+ "\"idempleado\": \"2565\","   
				+ "\"nempleado\": \"GOCDM00002\","   
				+ "\"nombre\": \"EMETERIO RAMIREZ CUESTA\","   
				+ "\"telefono\": \"5514883725\","   
				+ "\"urlimg\": \"\","   
				+ "\"contador\": \"0\","   
				+ "\"status\": \"7\","   
				+ "\"descripcion\": \"FUERA DE SERVICIO\","   
				+ "\"latitud\": \"19.3339865\","   
				+ "\"longitud\": \"-99.1985449\","   
				+ "\"intervencion\": \"97\","   
				+ "\"color\": \"#242425\""   
				+ "}"
			+ "]";
		
			
		Object arr = new Gson().fromJson(jsonString, Object.class);
		response.setRespuesta(true);
		response.setResult(arr);
		response.setResultDescripcion("Operacion Exitosa");

		return response;
	}

	@Override
	public ServiceResponseResult consultarOrdenesPendientesPE(String params) {
		
		ServiceResponseResult response = ServiceResponseResult.builder()
				.isRespuesta(true)
				.resultDescripcion("Accion exitosa")
				.build();

		String ordenes = 
				"[{\r\n" + 
				"		\"primerNivel\": \"PLANTA EXTERNA\",\r\n" + 
				"		\"segundoNivel\": \"SPLITTER PUERTOS DAÑADOS\",\r\n" + 
				"		\"id_ot\": \"80002\",\r\n" + 
				"		\"horas_incidencia\": \"#dc1c1c\",\r\n" + 
				"		\"region\": \"MEGACENTRO\",\r\n" + 
				"		\"ciudad\": \"CIUDAD DE MEXICO\",\r\n" + 
				"		\"distrito\": \"DISTRITO 14\",\r\n" + 
				"		\"zona\": \"SZ\",\r\n" + 
				"		\"cluster\": \"SAN FERNANDO 2\",\r\n" + 
				"		\"id_intervencion\": \"30\",\r\n" + 
				"		\"des_intervencion\": \"PLANTA EXTERNA\",\r\n" + 
				"		\"id_subintervencion\": \"34\",\r\n" + 
				"		\"des_subintervencion\": \"SPLITTER PUERTOS DAÑADOS\",\r\n" + 
				"		\"all_os_pi\": \"\",\r\n" + 
				"		\"latitud\": \"19.3046007\",\r\n" + 
				"		\"longitud\": \"-99.2032532\"\r\n" + 
				"	}, {\r\n" + 
				"		\"primerNivel\": \"PLANTA EXTERNA\",\r\n" + 
				"		\"segundoNivel\": \"PLANTA EXTERNA - COBERTURA TX\",\r\n" + 
				"		\"id_ot\": \"80204\",\r\n" + 
				"		\"horas_incidencia\": \"#dc1c1c\",\r\n" + 
				"		\"region\": \"BCN\",\r\n" + 
				"		\"ciudad\": \"TIJUANA\",\r\n" + 
				"		\"distrito\": \"TIJUANA\",\r\n" + 
				"		\"zona\": \"SZ\",\r\n" + 
				"		\"cluster\": \"AGUA CALIENTE\",\r\n" + 
				"		\"id_intervencion\": \"30\",\r\n" + 
				"		\"des_intervencion\": \"PLANTA EXTERNA\",\r\n" + 
				"		\"id_subintervencion\": \"187\",\r\n" + 
				"		\"des_subintervencion\": \"PLANTA EXTERNA - COBERTURA TX\",\r\n" + 
				"		\"all_os_pi\": \"\",\r\n" + 
				"		\"latitud\": \"19.334062\",\r\n" + 
				"		\"longitud\": \"-99.198713\"\r\n" + 
				"	}, {\r\n" + 
				"		\"primerNivel\": \"PLANTA EXTERNA\",\r\n" + 
				"		\"segundoNivel\": \"SPLITTER ATENUADO\",\r\n" + 
				"		\"id_ot\": \"81211\",\r\n" + 
				"		\"horas_incidencia\": \"#dc1c1c\",\r\n" + 
				"		\"region\": \"OCCIDENTE\",\r\n" + 
				"		\"ciudad\": \"TOTALPLAY EMPRESARIAL\",\r\n" + 
				"		\"distrito\": \"CHAPULTEPEC\",\r\n" + 
				"		\"zona\": \"SZ\",\r\n" + 
				"		\"cluster\": \"GUADALAJARA\",\r\n" + 
				"		\"id_intervencion\": \"30\",\r\n" + 
				"		\"des_intervencion\": \"PLANTA EXTERNA\",\r\n" + 
				"		\"id_subintervencion\": \"32\",\r\n" + 
				"		\"des_subintervencion\": \"SPLITTER ATENUADO\",\r\n" + 
				"		\"all_os_pi\": \"\",\r\n" + 
				"		\"latitud\": \"19.5293848\",\r\n" + 
				"		\"longitud\": \"-99.2097573\"\r\n" + 
				"	}, {\r\n" + 
				"		\"primerNivel\": \"PLANTA EXTERNA\",\r\n" + 
				"		\"segundoNivel\": \"SPLITTER SATURADO\",\r\n" + 
				"		\"id_ot\": \"81223\",\r\n" + 
				"		\"horas_incidencia\": \"#dc1c1c\",\r\n" + 
				"		\"region\": \"MEGACENTRO\",\r\n" + 
				"		\"ciudad\": \"CIUDAD DE MEXICO\",\r\n" + 
				"		\"distrito\": \"LAS AGUILAS\",\r\n" + 
				"		\"zona\": \"SZ\",\r\n" + 
				"		\"cluster\": \"LAS AGUILAS/CENTENARIO\",\r\n" + 
				"		\"id_intervencion\": \"30\",\r\n" + 
				"		\"des_intervencion\": \"PLANTA EXTERNA\",\r\n" + 
				"		\"id_subintervencion\": \"31\",\r\n" + 
				"		\"des_subintervencion\": \"SPLITTER SATURADO\",\r\n" + 
				"		\"all_os_pi\": \"\",\r\n" + 
				"		\"latitud\": \"19.350435\",\r\n" + 
				"		\"longitud\": \"-99.2381757\"\r\n" + 
				"	}, {\r\n" + 
				"		\"primerNivel\": \"HALLAZGO EMPRESARIAL\",\r\n" + 
				"		\"segundoNivel\": \"ACOMETIDA\",\r\n" + 
				"		\"id_ot\": \"81043\",\r\n" + 
				"		\"horas_incidencia\": \"#dc1c1c\",\r\n" + 
				"		\"region\": \"MEGACENTRO\",\r\n" + 
				"		\"ciudad\": \"TOLUCA\",\r\n" + 
				"		\"distrito\": \"TOLUCA\",\r\n" + 
				"		\"zona\": \"SZ\",\r\n" + 
				"		\"cluster\": \"ZINACANTEPEC\",\r\n" + 
				"		\"id_intervencion\": \"127\",\r\n" + 
				"		\"des_intervencion\": \"MANTENIMIENTO PREVENTIVO PI\",\r\n" + 
				"		\"id_subintervencion\": \"246\",\r\n" + 
				"		\"des_subintervencion\": \"HALLAZGO EMPRESARIAL\",\r\n" + 
				"		\"all_os_pi\": \"\",\r\n" + 
				"		\"latitud\": \"19.4326\",\r\n" + 
				"		\"longitud\": \"-98.60585625\"\r\n" + 
				"	}, {\r\n" + 
				"		\"primerNivel\": \"HALLAZGO EMPRESARIAL\",\r\n" + 
				"		\"segundoNivel\": \"ACOMETIDA\",\r\n" + 
				"		\"id_ot\": \"81044\",\r\n" + 
				"		\"horas_incidencia\": \"#dc1c1c\",\r\n" + 
				"		\"region\": \"MEGACENTRO\",\r\n" + 
				"		\"ciudad\": \"PEDREGAL\",\r\n" + 
				"		\"distrito\": \"CIUDAD DE MEXICO\",\r\n" + 
				"		\"zona\": \"SZ\",\r\n" + 
				"		\"cluster\": \"COYOACAN 1\",\r\n" + 
				"		\"id_intervencion\": \"127\",\r\n" + 
				"		\"des_intervencion\": \"MANTENIMIENTO PREVENTIVO PI\",\r\n" + 
				"		\"id_subintervencion\": \"246\",\r\n" + 
				"		\"des_subintervencion\": \"HALLAZGO EMPRESARIAL\",\r\n" + 
				"		\"all_os_pi\": \"\",\r\n" + 
				"		\"latitud\": \"19.4326\",\r\n" + 
				"		\"longitud\": \"-99.1332\"\r\n" + 
				"	}]";
		Object arr = new Gson().fromJson(ordenes, Object.class);
		
		response.setRespuesta(true);
		response.setResult(arr);
		response.setResultDescripcion("Operacion Exitosa");
		
		
		return response;
	}

	@Override
	public ServiceResponseResult consultarOrdenesAsignadasPE(String params) {
		
		ServiceResponseResult response = ServiceResponseResult.builder()
				.isRespuesta(true)
				.resultDescripcion("Accion exitosa")
				.build();
		
		String ordenes = 
				"[{\r\n" + 
				"		\"nempleado\": \"GTBCD00002\",\r\n" + 
				"		\"idempleado\": \"1780\",\r\n" + 
				"		\"idot\": \"61812\",\r\n" + 
				"		\"idintervencion\": \"119\",\r\n" + 
				"		\"idsubintervencion\": \"118\",\r\n" + 
				"		\"color\": \"#CD6F07\",\r\n" + 
				"		\"colorh\": \"#EDAC5F\",\r\n" + 
				"		\"region\": \"MEGACENTRO\",\r\n" + 
				"		\"ciudad\": \"CIUDAD DE MEXICO\",\r\n" + 
				"		\"distrito\": \"DISTRITO 01\",\r\n" + 
				"		\"zona\": \"SZ\",\r\n" + 
				"		\"cluster_text\": \"COACALCO\",\r\n" + 
				"		\"id_status\": \"2\",\r\n" + 
				"		\"id_estado\": \"113\",\r\n" + 
				"		\"latitud\": \"19.334115719700932\",\r\n" + 
				"		\"longitud\": \"-99.19868342803943\",\r\n" + 
				"		\"nivel_uno\": \"CORTE MASIVO DE RED\",\r\n" + 
				"		\"nivel_dos\": \"TSF \\u003d 45646014 - TSD \\u003d 688249\",\r\n" + 
				"		\"locacion\": \"MEGACENTRO, CIUDAD DE MEXICO, DISTRITO 01, SZ, COACALCO\"\r\n" + 
				"	}, {\r\n" + 
				"		\"nempleado\": \"GTBCD00002\",\r\n" + 
				"		\"idempleado\": \"2643\",\r\n" + 
				"		\"idot\": \"79632\",\r\n" + 
				"		\"idintervencion\": \"119\",\r\n" + 
				"		\"idsubintervencion\": \"118\",\r\n" + 
				"		\"color\": \"#83B9B6\",\r\n" + 
				"		\"colorh\": \"#7C9471\",\r\n" + 
				"		\"region\": \"MEGACENTRO\",\r\n" + 
				"		\"ciudad\": \"CIUDAD DE MEXICO\",\r\n" + 
				"		\"distrito\": \"COBERTURA TX\",\r\n" + 
				"		\"zona\": \"SZ\",\r\n" + 
				"		\"cluster_text\": \"TX CENTRO SUR\",\r\n" + 
				"		\"id_status\": \"2\",\r\n" + 
				"		\"id_estado\": \"107\",\r\n" + 
				"		\"latitud\": \"11.142985747655473\",\r\n" + 
				"		\"longitud\": \"-75.21372225258455\",\r\n" + 
				"		\"nivel_uno\": \"CORTE MASIVO DE RED\",\r\n" + 
				"		\"nivel_dos\": \"TSF \\u003d 49118068 - TSD \\u003d 725434\",\r\n" + 
				"		\"locacion\": \"MEGACENTRO, CIUDAD DE MEXICO, COBERTURA TX, SZ, TX CENTRO SUR\"\r\n" + 
				"	}, {\r\n" + 
				"		\"nempleado\": \"GOCDM00002\",\r\n" + 
				"		\"idempleado\": \"2643\",\r\n" + 
				"		\"idot\": \"80271\",\r\n" + 
				"		\"idintervencion\": \"119\",\r\n" + 
				"		\"idsubintervencion\": \"118\",\r\n" + 
				"		\"color\": \"#CD6F07\",\r\n" + 
				"		\"colorh\": \"#EDAC5F\",\r\n" + 
				"		\"region\": \"MEGACENTRO\",\r\n" + 
				"		\"ciudad\": \"CIUDAD DE MEXICO\",\r\n" + 
				"		\"distrito\": \"XOCHIMILCO\",\r\n" + 
				"		\"zona\": \"SZ\",\r\n" + 
				"		\"cluster_text\": \"COAPA\",\r\n" + 
				"		\"id_status\": \"2\",\r\n" + 
				"		\"id_estado\": \"113\",\r\n" + 
				"		\"latitud\": \"19.2875835\",\r\n" + 
				"		\"longitud\": \"-99.12769759999998\",\r\n" + 
				"		\"nivel_uno\": \"CORTE MASIVO DE RED\",\r\n" + 
				"		\"nivel_dos\": \"TSF \\u003d 00119605 - TSD \\u003d 84546\",\r\n" + 
				"		\"locacion\": \"MEGACENTRO, CIUDAD DE MEXICO, XOCHIMILCO, SZ, COAPA\"\r\n" + 
				"	}, {\r\n" + 
				"		\"nempleado\": \"65714620PE\",\r\n" + 
				"		\"idempleado\": \"2643\",\r\n" + 
				"		\"idot\": \"80780\",\r\n" + 
				"		\"idintervencion\": \"153\",\r\n" + 
				"		\"idsubintervencion\": \"233\",\r\n" + 
				"		\"color\": \"#F7819F\",\r\n" + 
				"		\"colorh\": \"#F7819F\",\r\n" + 
				"		\"region\": \"REGION TX\",\r\n" + 
				"		\"ciudad\": \"CIUDAD TX\",\r\n" + 
				"		\"distrito\": \"DISTRITO TX\",\r\n" + 
				"		\"zona\": \"ZONA TX\",\r\n" + 
				"		\"cluster_text\": \"CLUSTER TX\",\r\n" + 
				"		\"id_status\": \"2\",\r\n" + 
				"		\"id_estado\": \"186\",\r\n" + 
				"		\"latitud\": \"19.289130\",\r\n" + 
				"		\"longitud\": \"-99.225015\",\r\n" + 
				"		\"nivel_uno\": \"PLANTA EXTERNA TX\",\r\n" + 
				"		\"nivel_dos\": \"SPLITTER ATENUADO\",\r\n" + 
				"		\"locacion\": \"REGION TX, CIUDAD TX, DISTRITO TX, ZONA TX, \"\r\n" + 
				"	}, {\r\n" + 
				"		\"nempleado\": \"ANGELMXGUI\",\r\n" + 
				"		\"idempleado\": \"3200\",\r\n" + 
				"		\"idot\": \"81245\",\r\n" + 
				"		\"idintervencion\": \"30\",\r\n" + 
				"		\"idsubintervencion\": \"31\",\r\n" + 
				"		\"color\": \"#1667B8\",\r\n" + 
				"		\"colorh\": \"#75B7FF\",\r\n" + 
				"		\"region\": \"MEGACENTRO\",\r\n" + 
				"		\"ciudad\": \"CIUDAD DE MEXICO\",\r\n" + 
				"		\"distrito\": \"PEDREGAL\",\r\n" + 
				"		\"zona\": \"SZ\",\r\n" + 
				"		\"cluster_text\": \"PEDREGAL\",\r\n" + 
				"		\"id_status\": \"2\",\r\n" + 
				"		\"id_estado\": \"9\",\r\n" + 
				"		\"latitud\": \"19.3340093\",\r\n" + 
				"		\"longitud\": \"-99.1986039\",\r\n" + 
				"		\"nivel_uno\": \"PLANTA EXTERNA\",\r\n" + 
				"		\"nivel_dos\": \"SPLITTER SATURADO\",\r\n" + 
				"		\"locacion\": \"MEGACENTRO, CIUDAD DE MEXICO, PEDREGAL, SZ, PEDREGAL\"\r\n" + 
				"	}]";
		
		Object arr = new Gson().fromJson(ordenes, Object.class);
		
		response.setRespuesta(true);
		response.setResult(arr);
		response.setResultDescripcion("Operacion Exitosa");
		
		return response;
	}

	@Override
	public ServiceResponseResult consultarDetalleOTInspector(String params) {
		ServiceResponseResult response = ServiceResponseResult.builder()
				.isRespuesta(true)
				.resultDescripcion("Accion exitosa")
				.build();
		
		String datos = 
				"[{\r\n" + 
				"	\"ID_Incidencia\": \"84950\",\r\n" + 
				"	\"reportoIncidencia\": \"65032053-JUAN ANTONIO RIVERA RODRIGUEZ\",\r\n" + 
				"	\"fechaReporte\": \"02/01/2019\",\r\n" + 
				"	\"horaReporte\": \"11:56\",\r\n" + 
				"	\"fallas\": [{\r\n" + 
				"		\"IDFallGral\": \"43\",\r\n" + 
				"		\"descrFallaGral\": \"ETIQUETADO - ETQ\",\r\n" + 
				"		\"IDFallHija\": \"45\",\r\n" + 
				"		\"descrFallaHija\": \"FALTA NOMENCLATURA\"\r\n" + 
				"	}]\r\n" + 
				"}, {\r\n" + 
				"	\"nombre\": \"ANDRES ALMONAZI RUIZ\",\r\n" + 
				"	\"ID_Operario\": \"3881\",\r\n" + 
				"	\"empleado\": \"GTBCD00002\"\r\n" + 
				"}, {\r\n" + 
				"	\"latitud\": \"25.7821499\",\r\n" + 
				"	\"longitud\": \"-100.2661803\",\r\n" + 
				"	\"ID_OT\": \"80963\",\r\n" + 
				"	\"fecha\": \"04/12/2020\",\r\n" + 
				"	\"hora\": \"13:50 HRS\",\r\n" + 
				"	\"estatus\": \"ASIGNADA\",\r\n" + 
				"	\"estado\": \"PROGRAMADA PERO NO INICIADA\",\r\n" + 
				"	\"motivo\": \"REASIGNACION DE OT\",\r\n" + 
				"	\"tipo\": \"INSPECTOR DE RED\",\r\n" + 
				"	\"subtipo\": \"ETIQUETADO\",\r\n" + 
				"	\"unidadNegocio\": \"PLANTA EXTERNA\"\r\n" + 
				"}]";
		
		Object arr = new Gson().fromJson(datos, Object.class);
		
		response.setRespuesta(true);
		response.setResult(arr);
		response.setResultDescripcion("Operacion Exitosa");
		
		
		return response;
	}

	@Override
	public ServiceResponseResult consultarOtsTrabajadasInspector(String params) {

		ServiceResponseResult response = ServiceResponseResult.builder()
				.isRespuesta(true)
				.resultDescripcion("Accion exitosa")
				.build();
		
		
		String dato = 
				"[{\r\n" + 
				"	\"ciudad\": \"APODACA\",\r\n" + 
				"	\"estado\": \"PROGRAMADA PERO NO INICIADA\",\r\n" + 
				"	\"status\": \"ASIGNADA\",\r\n" + 
				"	\"intervencion\": \"INSPECTOR DE RED\",\r\n" + 
				"	\"motivo\": \"REASIGNACION DE OT\",\r\n" + 
				"	\"subintervencion\": \"ETIQUETADO\",\r\n" + 
				"	\"fecha\": \"17/11/2020\",\r\n" + 
				"	\"idot\": \"80963\"\r\n" + 
				"}]";

		Object arr = new Gson().fromJson(dato, Object.class);
		
		response.setRespuesta(true);
		response.setResult(arr);
		response.setResultDescripcion("Operacion Exitosa");
		
		
		return response;
	}
}
