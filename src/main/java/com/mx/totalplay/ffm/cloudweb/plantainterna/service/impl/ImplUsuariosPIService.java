package com.mx.totalplay.ffm.cloudweb.plantainterna.service.impl;

import java.util.HashMap;
import java.util.Map;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.mx.totalplay.ffm.cloudweb.plantainterna.model.usuario.ObjConsultaUsuario;
import com.mx.totalplay.ffm.cloudweb.plantainterna.service.UsuariosPIService;
import com.mx.totalplay.ffm.cloudweb.plantainterna.utils.ConstUsuarioPI;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.DataTableResponse;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.LoginResult;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.ServiceResponseResult;
import com.mx.totalplay.ffm.cloudweb.utilerias.utils.ConstantesGeneric;
import com.mx.totalplay.ffm.cloudweb.utilerias.utils.ConsumeRest;
import com.mx.totalplay.ffm.cloudweb.utilerias.utils.UtileriaGeneral;

@Service
public class ImplUsuariosPIService implements UsuariosPIService {
	private  final Logger logger = LogManager.getLogger(ImplDespachoPIService.class.getName());
	private final ConstantesGeneric constantesAmbiente;
	private final ConstUsuarioPI constUsuario;
	private final ConsumeRest restCaller;
	private final UtileriaGeneral utilerias;
	private final Environment env;
	private Gson gson=new Gson();
	
	@Autowired
	public ImplUsuariosPIService(ConstantesGeneric constantesAmbiente, ConstUsuarioPI constUsuario, ConsumeRest restCaller, UtileriaGeneral utilerias, Environment env) {
		this.constantesAmbiente = constantesAmbiente;
		this.constUsuario = constUsuario;
		this.restCaller = restCaller;
		this.utilerias = utilerias;
		this.env = env;
	}

	@Override
	public ServiceResponseResult consultaCompanias() {
		logger.info("ImplUsuariosPIService.class [metodo = consultaCompanias() ]\n");
		LoginResult principalDetail=utilerias.obtenerObjetoPrincipal();
		Map<String, String> paramsRequestGet = new HashMap<String, String>();
		String tokenAcces=principalDetail.getAccess_token(); 
		String url = principalDetail.getDireccionAmbiente().concat(constUsuario.getConsultaCompanias());
		ServiceResponseResult response= restCaller.callGetBearerTokenRequest(paramsRequestGet, url, ServiceResponseResult.class, tokenAcces);
		logger.info("RESULT consultaCompanias "+gson.toJson(response));
		return response;
	}

	@Override
	public ServiceResponseResult consultaPuestos() {
		logger.info("ImplUsuariosPIService.class [metodo = consultaPuestos() ]\n");
		LoginResult principalDetail=utilerias.obtenerObjetoPrincipal();
		Map<String, String> paramsRequestGet = new HashMap<String, String>();
		String tokenAcces=principalDetail.getAccess_token(); 
		String url = principalDetail.getDireccionAmbiente().concat(constUsuario.getConsultaPuestos());
		ServiceResponseResult response= restCaller.callGetBearerTokenRequest(paramsRequestGet, url, ServiceResponseResult.class, tokenAcces);
		logger.info("RESULT consultaPuestos "+gson.toJson(response));
		return response;
	}
	
	@Override
	public ServiceResponseResult consultaPermisos() {
		logger.info("ImplUsuariosPIService.class [metodo = consultaPermisos() ]\n");
		LoginResult principalDetail=utilerias.obtenerObjetoPrincipal();
		Map<String, String> paramsRequestGet = new HashMap<String, String>();
		String tokenAcces=principalDetail.getAccess_token(); 
		String url = principalDetail.getDireccionAmbiente().concat(constUsuario.getConsultaPermisos());
		ServiceResponseResult response= restCaller.callGetBearerTokenRequest(paramsRequestGet, url, ServiceResponseResult.class, tokenAcces);
		logger.info("RESULT consultaPermisos "+gson.toJson(response));
		return response;
	}
	
	@Override
	public ServiceResponseResult consultaUsuarioPorId(String params) {
		logger.info("ImplUsuariosPIService.class [metodo = consultaUsuarioPorId() ]\n");
		LoginResult principalDetail=utilerias.obtenerObjetoPrincipal();
		JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
		Map<String, String> paramsRequestGet = new HashMap<String, String>();
		paramsRequestGet.put("idUsuario", jsonObject.get("idUsuario").getAsString());
		logger.info("json object params## "+ params);
		String tokenAcces=principalDetail.getAccess_token(); 
		String url = principalDetail.getDireccionAmbiente().concat(constUsuario.getConsultaUsuarioPorId());
		ServiceResponseResult response= restCaller.callGetBearerTokenRequest(paramsRequestGet, url, ServiceResponseResult.class, tokenAcces);
		logger.info("RESULT consultaUsuarioPorId "+gson.toJson(response));
		return response;
	}
	
//	@Override
//	public ServiceResponseResult consultaUsuariosPorGeoCompPuestos(String params) {
//		logger.info("ImplUsuariosPIService.class [metodo = consultaUsuariosPorGeoCompPuestos() ]\n");
//		logger.info("PARAMS " + params);
//		LoginResult principalDetail=utilerias.obtenerObjetoPrincipal();
//		JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
//		String tokenAcces=principalDetail.getAccess_token() ;
//		String url = principalDetail.getDireccionAmbiente().concat(constUsuario.getConsultaUsuariosPorGeoCompPuestos());
//		ServiceResponseResult response=restCaller.callPostBearerTokenRequest(jsonObject.toString(), url, ServiceResponseResult.class, tokenAcces);
//		logger.info("URL " + url);
//		logger.info("RESULT guardarUsuario " + gson.toJson(response));
//		return response;
//	}
	@Override
	public DataTableResponse consultaUsuariosPorGeoCompPuestos(ObjConsultaUsuario params) {
		logger.info("ImplUsuariosPIService.class [metodo = consultaUsuariosPorGeoCompPuestos() ]\n");
		LoginResult principalDetail=utilerias.obtenerObjetoPrincipal();
		String[][] dataArray = null;
        DataTableResponse dataResponse = DataTableResponse.builder()
                .isRespuesta(false)
                .data(new String[0][10])
                .paginaActual(0)
                .registrosTotales(0)
                .recordsFiltered("0")
                .recordsTotal("0")
                .draw(params.getDraw() + "")
                .result(null).build();
//        params.setPagina((Integer.parseInt(params.getStart()) + 10) / 10);
        
		String tokenAcces = principalDetail.getAccess_token() ;
		logger.info("consultaUsuariosPorGeoCompPuestos ##+ " + tokenAcces);
		String url = principalDetail.getDireccionAmbiente().concat(constUsuario.getConsultaUsuariosPorGeoCompPuestos());
		ServiceResponseResult response = restCaller.callPostBearerTokenRequest(gson.toJson(params), url, ServiceResponseResult.class, tokenAcces);
		logger.info("RESULT consultaUsuariosPorGeoCompPuestos " + gson.toJson(response));
		
		if (response.getResult() instanceof Integer){
            dataResponse = DataTableResponse.builder()
                    .isRespuesta(false)
                    .data(new String[0][10])
                    .paginaActual(0)
                    .registrosTotales(0)
                    .recordsFiltered("0")
                    .recordsTotal("0")
                    .draw(params.getDraw() + "")
                    .result(response.getResult()).build();
        } else {
        	JsonObject jsonObjectResponse = gson.fromJson(gson.toJson(response.getResult()), JsonObject.class);
            JsonArray usuariosArray = jsonObjectResponse.getAsJsonArray("usuarios");
            if (usuariosArray.size() > 0) {
                if (jsonObjectResponse.get("registrosTotales").getAsInt() > 0) {
                    int count = 0;
                    dataArray = new String[usuariosArray.size()][11];
                    for (int i = 0; i < usuariosArray.size(); i++) {
                        JsonObject object = (JsonObject) usuariosArray.get(i);
                        logger.info("objeto: " + object);
                        //dataArray[count][0] = object.get("numeroEmpleado") != 0 ? String.valueOf(object.get("numeroEmpleado").getAsString()) : "";
                        dataArray[count][0] = object.get("numeroEmpleado") != null ? object.get("numeroEmpleado").getAsString().trim() : "";
                        dataArray[count][1] = object.get("usuario") != null ? object.get("usuario").getAsString().trim() : "";
                        dataArray[count][2] = object.get("nombre") != null ? object.get("nombre").getAsString().trim() : "";
                        dataArray[count][3] = object.get("tipoUsuario") != null ? object.get("tipoUsuario").getAsString().trim() : "";
                        dataArray[count][4] = object.get("ciudad") != null ? object.get("ciudad").getAsString().trim() : "";
                        dataArray[count][5] = object.get("unidadNegocio") != null ? object.get("unidadNegocio").getAsString().trim() : "";
                        dataArray[count][6] = "<div class='tooltip-btn'> <span onclick='consultarDetalleUsuario(" + object.get("idUsuario").getAsString().trim() + ")' class='btn-floating btn-option btn-sm btn-secondary waves-effect waves-light acciones btnModificarUsuario'><th><i class='fas fa-pen' aria-hidden='true'></i></th></span></div>";
                        dataArray[count][7] = "<div class='tooltip-btn'> <span onclick='consultarDetalleUsuario(" + object.get("idUsuario").getAsString().trim() + ")' class='btn-floating btn-option btn-sm btn-secondary waves-effect waves-light acciones btnEliminarUsuario'><th><i class='fas fa-trash-alt' aria-hidden='true'></i></th></span></div>";
                        count++;
                    }
                    
                    dataResponse = DataTableResponse.builder()
                            .isRespuesta(true)
                            .data(dataArray)
                            .paginaActual(jsonObjectResponse.get("paginaActual").getAsInt())
                            .registrosTotales(jsonObjectResponse.get("registrosTotales").getAsInt())
                            .recordsFiltered(jsonObjectResponse.get("registrosTotales").getAsInt() + "")
                            .recordsTotal(jsonObjectResponse.get("registrosTotales").getAsInt() + "")
                            .draw(params.getDraw() + "").build();
                } else {
                    dataResponse = DataTableResponse.builder()
                            .isRespuesta(true)
                            .data(new String[0][10])
                            .paginaActual(jsonObjectResponse.get("paginaActual").getAsInt())
                            .registrosTotales(jsonObjectResponse.get("registrosTotales").getAsInt())
                            .recordsFiltered(jsonObjectResponse.get("registrosTotales").getAsInt() + "")
                            .recordsTotal(jsonObjectResponse.get("registrosTotales").getAsInt() + "")
                            .draw(params.getDraw() + "").build();
                }
            }
        }
		
		logger.info("*** Objeto Response: " + gson.toJson(dataResponse));
		return dataResponse;
	}
	
	@Override
	public ServiceResponseResult consultaGeografias() {
		logger.info("ImplUsuariosPIService.class [metodo = consultaGeografias() ]\n");
		LoginResult principalDetail=utilerias.obtenerObjetoPrincipal();
		String tokenAcces=principalDetail.getAccess_token();
		logger.info("consultaGeografias ## " + tokenAcces);							
	    String urlRequest=principalDetail.getDireccionAmbiente().concat(constUsuario.getConsultaGeografias());
	    Map<String, String> paramsRequestGet = new HashMap<String, String>();	    
		ServiceResponseResult response= restCaller.callGetBearerTokenRequest(paramsRequestGet, urlRequest, ServiceResponseResult.class, tokenAcces);
	    logger.info("RESULT consultaGeografias " + gson.toJson(response));
		return response;
	}
	
	public ServiceResponseResult consultaIntervenciones() {
		logger.info("ImplUsuariosPIService.class [metodo = consultaIntervenciones() ]\n");
		LoginResult principalDetail=utilerias.obtenerObjetoPrincipal();
		String tokenAcces=principalDetail.getAccess_token();
		logger.info("consultaIntervenciones ##+ " + tokenAcces);
		String urlRequest=principalDetail.getDireccionAmbiente().concat(constUsuario.getConsultaIntervenciones());
		Map<String, String> paramsRequestGet = new HashMap<String, String>();
		paramsRequestGet.put("idUsuario", String.valueOf( principalDetail.getIdUsuario()));
		ServiceResponseResult response= restCaller.callGetBearerTokenRequest(paramsRequestGet, urlRequest, ServiceResponseResult.class, tokenAcces);
		logger.info("RESULT"+gson.toJson(response));
		return response;
	}
	
	@Override
	public ServiceResponseResult guardarUsuario(String params) {
		logger.info("ImplUsuariosPIService.class [metodo = guardarUsuario() ]\n");
		logger.info("PARAMS " + params);
		LoginResult principalDetail=utilerias.obtenerObjetoPrincipal();
		JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
		String tokenAcces=principalDetail.getAccess_token() ;
		String url = principalDetail.getDireccionAmbiente().concat(constUsuario.getGuardarUsuario());
		ServiceResponseResult response=restCaller.callPostBearerTokenRequest(jsonObject.toString(), url, ServiceResponseResult.class, tokenAcces);
		logger.info("URL " + url);
		logger.info("RESULT guardarUsuario " + gson.toJson(response));
		return response;
	}
	
	@Override
	public ServiceResponseResult consultarTecnicosRegistroUsuario(String params) {
		logger.info("ImplUsuariosPIService.class [metodo = consultarTecnicosRegistroUsuario() ]\n");
		LoginResult principalDetail=utilerias.obtenerObjetoPrincipal();
		JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
		String tokenAcces=principalDetail.getAccess_token();
		logger.info("json object params## "+jsonObject.toString());	 
		String url = principalDetail.getDireccionAmbiente().concat(constUsuario.getConsultarTecnicosRegistroUsuario());
		ServiceResponseResult response= restCaller.callPostBearerTokenRequest(jsonObject.toString(), url, ServiceResponseResult.class, tokenAcces);
		logger.info("RESULT consultarTecnicosRegistroUsuario " + gson.toJson(response));
		return response;
	}
	
	//-------------------------------------------------------------------------------------------
	//-------------------------------------------------------------------------------------------

	@Override
	public ServiceResponseResult consultarRegionesEstructura() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public ServiceResponseResult consultarClasificacionUsuario() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public ServiceResponseResult consultarIntervencionesPorPropietarios(String params) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public ServiceResponseResult consultarArbolesCiudades() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public ServiceResponseResult consultarOperariosPorCiudad(String params) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public ServiceResponseResult consultarCiudadesEstructura(String params) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public ServiceResponseResult consultarUsuarios(String params) {
		// TODO Auto-generated method stub
		return null;
	}

	
	
}
