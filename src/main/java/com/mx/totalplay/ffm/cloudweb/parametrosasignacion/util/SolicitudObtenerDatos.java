package com.mx.totalplay.ffm.cloudweb.parametrosasignacion.util;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMethod;

import com.google.gson.Gson;
import com.mx.totalplay.ffm.cloudweb.parametrosasignacion.component.Constantes;
import com.mx.totalplay.ffm.cloudweb.parametrosasignacion.component.ParametrosEndpoints;
import com.mx.totalplay.ffm.cloudweb.parametrosasignacion.model.ParametroVO;
import com.mx.totalplay.ffm.cloudweb.parametrosasignacion.model.Solicitud;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.LoginResult;
import com.mx.totalplay.ffm.cloudweb.utilerias.utils.ConstantesGeneric;
import com.mx.totalplay.ffm.cloudweb.utilerias.utils.UtileriaGeneral;

@Service
public class SolicitudObtenerDatos {
	private final String NOMBRE_METODO="com.mx.totalplay.ffm.cloudweb.parametrosasignacion.util.SolicitudObtenerDatos";
	
	@Autowired ConsoleMessage console;
	@Autowired ParametrosEndpoints endpoints;
	
	private final ConstantesGeneric constantesAmbiente;
	private final UtileriaGeneral utilerias;
	private final Environment env;
	
	@Autowired
	public SolicitudObtenerDatos(ConstantesGeneric constantesAmbiente, UtileriaGeneral utilerias, Environment env) {
		this.constantesAmbiente = constantesAmbiente;
		this.utilerias = utilerias;
		this.env = env;
	}
	
	public Solicitud obtenerDatos (String solicitud) {
		solicitud = solicitud.replace("\"", "");
		solicitud = solicitud.replace("\\", "");
		solicitud = solicitud.replace("'", "\"");
		
		
		console.messages_console(NOMBRE_METODO, solicitud, Constantes.EXITO);
		Solicitud solicitudObj = convertirJsonAObjeto2(solicitud);
		
		console.messages_console(NOMBRE_METODO, solicitudObj.getKey());
		
		obtenerUrl(solicitudObj);
		obtenerTokenAcces(solicitudObj);
		return solicitudObj;
	}
	
	public Solicitud convertirJsonAObjeto ( String solicitud ) {
		Solicitud solicitudObj = null;
		
		try {
			solicitudObj = new Gson().fromJson(solicitud, Solicitud.class);
		} catch (Exception e) {
			console.messages_console(NOMBRE_METODO, "[error]Al crear Json: "+e.getMessage(),Constantes.ERROR);
		}
		
		return solicitudObj;
	}
	
	public Solicitud convertirJsonAObjeto2 ( String solcitud ) {
		Solicitud solicitudObj = new Solicitud();
		ParametroVO parametro = new ParametroVO();
		
		JSONObject jsonObject =  new JSONObject();
		JSONObject datosPost = new JSONObject();
		
		try {
			jsonObject = new JSONObject(solcitud);
		}
		catch (Exception e) {
			console.messages_console(NOMBRE_METODO, "[error]Algo Salió mal al crear el Objeto Json: "+e.getMessage(), Constantes.ERROR);
		}
		
		
		try {
			solicitudObj.setKey(jsonObject.getString("key"));
		}catch (Exception e) {
			console.messages_console(NOMBRE_METODO, "[error]Algo salio mal al tomar datos del Objeto Json: "+e.getMessage(),Constantes.ERROR);
		}
		
		try {
			solicitudObj.setDatosGET(jsonObject.getString("datosGET"));
		}catch (Exception e) {
			console.messages_console(NOMBRE_METODO, "[error]Algo salio mal al tomar datos del Objeto Json: "+e.getMessage(),Constantes.ERROR);
		}
		
		try {
			datosPost = jsonObject.getJSONObject("datosPost");
			
			try {
				parametro.setFCEM_ID_EMPRESA(datosPost.getInt("fcem_ID_EMPRESA"));
			} catch (Exception e) {
				console.messages_console(NOMBRE_METODO, "[error]Algo salio mal al tomar datos del Objeto Json: "+e.getMessage(),Constantes.ERROR);
			}

			try {
				parametro.setFCUN_ID_NEGOCIO(datosPost.getInt("fcun_ID_NEGOCIO"));
			} catch (Exception e) {
				console.messages_console(NOMBRE_METODO, "[error]Algo salio mal al tomar datos del Objeto Json: "+e.getMessage(),Constantes.ERROR);
			}
			
			try {
				parametro.setFAPA_ID(datosPost.getInt("fapa_ID"));
			}catch (Exception e) {
				console.messages_console(NOMBRE_METODO, "[error]Algo salio mal al tomar datos del Objeto Json: "+e.getMessage(),Constantes.ERROR);
			}
			
			try {
				parametro.setFAPA_COMENTARIO(datosPost.getString("fapa_COMENTARIO"));
			}catch (Exception e) {
				console.messages_console(NOMBRE_METODO, "[error]Algo salio mal al tomar datos del Objeto Json: "+e.getMessage(),Constantes.ERROR);
			}
			
			try {
				parametro.setFAPA_NUMERO(datosPost.getInt("fapa_NUMERO"));
			}catch (Exception e) {
				console.messages_console(NOMBRE_METODO, "[error]Algo salio mal al tomar datos del Objeto Json: "+e.getMessage(),Constantes.ERROR);
			}
			
			try {
				parametro.setFAPA_MODULO(datosPost.getString("fapa_MODULO"));
			} catch (Exception e) {
				console.messages_console(NOMBRE_METODO, "[error]Algo salio mal al tomar datos del Objeto Json: "+e.getMessage(),Constantes.ERROR);
			}
			
			try {
				parametro.setFAPA_VALOR_01(datosPost.getString("fapa_VALOR_01"));
			}catch (Exception e) {
				console.messages_console(NOMBRE_METODO, "[error]Algo salio mal al tomar datos del Objeto Json: "+e.getMessage(),Constantes.ERROR);
			}
			
			try {
				parametro.setFAPA_VALOR_02(datosPost.getString("fapa_VALOR_02"));
			}catch (Exception e) {
				console.messages_console(NOMBRE_METODO, "[error]Algo salio mal al tomar datos del Objeto Json: "+e.getMessage(),Constantes.ERROR);
			}
			
			try {
				parametro.setFAPA_VALOR_03(datosPost.getString("fapa_VALOR_03"));
			}catch (Exception e) {
				console.messages_console(NOMBRE_METODO, "[error]Algo salio mal al tomar datos del Objeto Json: "+e.getMessage(),Constantes.ERROR);
			}
		}
		catch (Exception e) {
			console.messages_console(NOMBRE_METODO, "[error]Algo salio mal al tomar datos del Objeto Json: "+e.getMessage(), Constantes.ERROR);
		}
		
		solicitudObj.setDatosPost(parametro);
		
		return solicitudObj;
	}
	
	public void obtenerUrl (Solicitud solicitudObj) {
		String key = solicitudObj.getKey();
		String datosGet = "";
		
		if ( solicitudObj.getDatosGET()!=null ) {
			datosGet = solicitudObj.getDatosGET();
		}
		
		switch (key) {
		case "PARAMETROS_GET":
			solicitudObj.setUrl(endpoints.getEndpointServer() + endpoints.getEndpointParametros() + datosGet);
			solicitudObj.setMethod(RequestMethod.GET.toString());
			break;
			
		case "PARAMETROS_POST":
			solicitudObj.setUrl(endpoints.getEndpointServer() + endpoints.getEndpointParametros());
			solicitudObj.setMethod(RequestMethod.POST.toString());
			break;

		case "PARAMETROS_DATA_GET":
			solicitudObj.setUrl(endpoints.getEndpointServer() + endpoints.getEndpointParametrosData().replace("{url_data}", datosGet));
			solicitudObj.setMethod(RequestMethod.GET.toString());
			break;
			
		case "PARAMETROS_MODULOS_GET":
			solicitudObj.setUrl(endpoints.getEndpointServer() + endpoints.getEndpointModulos() + datosGet);
			solicitudObj.setMethod(RequestMethod.GET.toString());
			break;
		
		case "PARAMETROS_MODULOS_DATA_GET":
			solicitudObj.setUrl(endpoints.getEndpointServer() + endpoints.getEndpointModulosData().replace("{url_data}", datosGet));
			solicitudObj.setMethod(RequestMethod.GET.toString());
			break;
			
		case "PARAMETROS_MODULOS_MAX_GET":
			solicitudObj.setUrl(endpoints.getEndpointServer() + endpoints.getEndpointModulosMax().replace("{url_data}", datosGet));
			solicitudObj.setMethod(RequestMethod.GET.toString());
			break;
			
		case "PARAMETROS_PATCH":
			solicitudObj.setUrl(endpoints.getEndpointServer() + endpoints.getEndpointParametrosGuardar().replace("{url_data}", datosGet) );
			solicitudObj.setMethod(RequestMethod.POST.toString());
			break;
		
		case "PARAMETROS_NUEVO":
			solicitudObj.setUrl(endpoints.getEndpointServer() + endpoints.getEndpointParametrosGuardar() .replace("{url_data}", datosGet) );
			solicitudObj.setMethod(RequestMethod.POST.toString());
			break;
			
		case "PARAMETROS_VERSIONES_GET":
			solicitudObj.setUrl(endpoints.getEndpointServer() + endpoints.getEndpointVersionesData().replace("{url_data}", datosGet));
			solicitudObj.setMethod(RequestMethod.GET.toString());
			break;
			
		case "PARAMETROS_ROLLBACK_GET":
			solicitudObj.setUrl(endpoints.getEndpointServer() + endpoints.getEndpointRollbackData().replace("{url_data}", datosGet));
			solicitudObj.setMethod(RequestMethod.GET.toString());
			break;
			
		case "PARAMETROS_INACTIVOS_GET":
			solicitudObj.setUrl(endpoints.getEndpointServer() + endpoints.getEndpointInactivos() );
			solicitudObj.setMethod(RequestMethod.GET.toString());
			break;
			
		case "PARAMETROS_ELIMINAR_GET":
			solicitudObj.setUrl(endpoints.getEndpointServer() + endpoints.getEndpointEliminar().replace("{url_data}", datosGet) );
			solicitudObj.setMethod(RequestMethod.GET.toString());
			break;
			
		case "PARAMETROS_ACTIVAR_GET":
			solicitudObj.setUrl(endpoints.getEndpointServer() + endpoints.getEndpointActivar().replace("{url_data}", datosGet) );
			solicitudObj.setMethod(RequestMethod.GET.toString());
			break;
			
		case "PARAMETROS_LOG_GET":
			solicitudObj.setUrl(endpoints.getEndpointServer() + endpoints.getEndpointLog() );
			solicitudObj.setMethod(RequestMethod.GET.toString());
			break;
			
		case "EMPRESAS_GET":
			solicitudObj.setUrl(endpoints.getEndpointServer() + endpoints.getEndpointEmpresas() );
			solicitudObj.setMethod(RequestMethod.GET.toString());
			break;
			
		case "UNIDADES_GET":
			solicitudObj.setUrl(endpoints.getEndpointServer() + endpoints.getEndpointUnidades() );
			solicitudObj.setMethod(RequestMethod.GET.toString());
			break;
			
		default:
			break;
		}
	}
	
	public void obtenerTokenAcces (Solicitud solicitudObj) {
		LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
		String tokenAcces = principalDetail.getAccess_token() ;
		int idPuesto = principalDetail.getIdPuesto();
		
		if ( idPuesto == 19 ) {
			// Solo el tipo de usuario 19 puede acceder
			solicitudObj.setToken(tokenAcces);
		}
		else {
			solicitudObj.setToken("Sin permisos de Acceso: idPuesto incorrecto");
		}
		
		
	}
}
