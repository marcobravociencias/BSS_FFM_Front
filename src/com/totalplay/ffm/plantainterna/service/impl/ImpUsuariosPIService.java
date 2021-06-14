package com.totalplay.ffm.plantainterna.service.impl;



import java.util.ArrayList;
import java.util.List;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.totalplay.ffm.plantainterna.model.CatalogoUsuarioPIVO;
import com.totalplay.ffm.plantainterna.model.UsuarioPIVO;
import com.totalplay.ffm.plantainterna.service.UsuariosPIService;
import com.totalplay.ffm.utilerias.model.ServiceResponseResult;

@Service
public class ImpUsuariosPIService implements UsuariosPIService {
	private  final Logger logger = LogManager.getLogger(ImplDespachoPIService.class.getName());
	
	
	
	@Override
	public ServiceResponseResult consultarCompanias() {
		ServiceResponseResult response = ServiceResponseResult.builder()
				.isRespuesta(true)
				.resultDescripcion("Accion exitosa")
				.build();
		
		CatalogoUsuarioPIVO compania;
		List<CatalogoUsuarioPIVO> companias = new ArrayList<>(); 
		compania = CatalogoUsuarioPIVO.builder()
				.id("1")
				.descripcion("TOTALPLAY")
				.isActivo("false")
				.build();
		companias.add(compania);
		
		compania = CatalogoUsuarioPIVO.builder()
				.id("2")
				.descripcion("CC INSTALL")
				.isActivo("false")
				.build();
		companias.add(compania);
		
		response.setRespuesta(true);
		response.setResult(companias);
		response.setResultDescripcion("Operacion Exitosa");
		return response;
	}

	@Override
	public ServiceResponseResult consultarPuestos() {
		
		ServiceResponseResult response = ServiceResponseResult.builder()
				.isRespuesta(true)
				.resultDescripcion("Accion exitosa")
				.build();

		CatalogoUsuarioPIVO puesto;
		List<CatalogoUsuarioPIVO> puestos = new ArrayList<>(); 
		puesto = CatalogoUsuarioPIVO.builder()
				.id("1")
				.descripcion("DIRECTOR DE OPERACIONES EN CAMPO")
				.isActivo("false")
				.build();
		puestos.add(puesto);
		
		puesto = CatalogoUsuarioPIVO.builder()
				.id("2")
				.descripcion("GERENTE REGIONAL")
				.isActivo("false")
				.build();
		puestos.add(puesto);
		
		response.setRespuesta(true);
		response.setResult(puestos);
		response.setResultDescripcion("Operacion Exitosa");
		return response;
	}

	@Override
	public ServiceResponseResult consultarRegionesEstructura() {
		
		ServiceResponseResult response = ServiceResponseResult.builder()
				.isRespuesta(true)
				.resultDescripcion("Accion exitosa")
				.build();
		
		CatalogoUsuarioPIVO region;
		List<CatalogoUsuarioPIVO> regiones = new ArrayList<>(); 
		region = CatalogoUsuarioPIVO.builder()
				.id("1")
				.descripcion("BAJIO")
				.isActivo("false")
				.build();
		regiones.add(region);
		
		region = CatalogoUsuarioPIVO.builder()
				.id("2")
				.descripcion("BCN")
				.isActivo("false")
				.build();
		regiones.add(region);
		
		response.setRespuesta(true);
		response.setResult(regiones);
		response.setResultDescripcion("Operacion Exitosa");
		return response;
	
	}

	@Override
	public ServiceResponseResult consultarClasificacionUsuario() {
		
		ServiceResponseResult response = ServiceResponseResult.builder()
				.isRespuesta(true)
				.resultDescripcion("Accion exitosa")
				.build();
		
		CatalogoUsuarioPIVO clasificacion;
		List<CatalogoUsuarioPIVO> clasificaciones = new ArrayList<>(); 
		clasificacion = CatalogoUsuarioPIVO.builder()
				.id("1")
				.descripcion("PLANTA INTERNA")
				.isActivo("false")
				.build();
		clasificaciones.add(clasificacion);
		
		clasificacion = CatalogoUsuarioPIVO.builder()
				.id("2")
				.descripcion("PLANTA EXTERNA")
				.isActivo("false")
				.build();
		clasificaciones.add(clasificacion);
		
		response.setRespuesta(true);
		response.setResult(clasificaciones);
		response.setResultDescripcion("Operacion Exitosa");
		return response;
	}

	@Override
	public ServiceResponseResult consultarIntervencionesPorPropietarios(String params) {
		
		ServiceResponseResult response = ServiceResponseResult.builder()
				.isRespuesta(true)
				.resultDescripcion("Accion exitosa")
				.build();
		
		CatalogoUsuarioPIVO intervencion;
		List<CatalogoUsuarioPIVO> intervenciones = new ArrayList<>(); 
		intervencion = CatalogoUsuarioPIVO.builder()
				.id("2")
				.descripcion("INSTALACIÓN")
				.idpadre("1")
				.isActivo("false")
				.build();
		intervenciones.add(intervencion);
		
		intervencion = CatalogoUsuarioPIVO.builder()
				.id("3")
				.descripcion("SOPORTE")
				.idpadre("1")
				.isActivo("false")
				.build();
		intervenciones.add(intervencion);
		
		response.setRespuesta(true);
		response.setResult(intervenciones);
		response.setResultDescripcion("Operacion Exitosa");
		return response;
	}

	@Override
	public ServiceResponseResult consultarArbolesCiudades() {
		
		ServiceResponseResult response = ServiceResponseResult.builder()
				.isRespuesta(true)
				.resultDescripcion("Accion exitosa")
				.build();
		
		CatalogoUsuarioPIVO ciudad;
		List<CatalogoUsuarioPIVO> ciudades = new ArrayList<>(); 
		ciudad = CatalogoUsuarioPIVO.builder()
				.id("0")
				.descripcion("TOTALPLAY")
				.isActivo("false")
				.idpadre("-1")
				.nivel("0")
				.build();
		ciudades.add(ciudad);
		
		ciudad = CatalogoUsuarioPIVO.builder()
				.id("2")
				.descripcion("INCIDENCIAS PI")
				.isActivo("false")
				.idpadre("-1")
				.nivel("0")
				.build();
		ciudades.add(ciudad);
		
		response.setRespuesta(true);
		response.setResult(ciudades);
		response.setResultDescripcion("Operacion Exitosa");
		return response;
	}

	@Override
	public ServiceResponseResult consultarOperariosPorCiudad(String params) {
		
		ServiceResponseResult response = ServiceResponseResult.builder()
				.isRespuesta(true)
				.resultDescripcion("Accion exitosa")
				.build();
		
		CatalogoUsuarioPIVO operario;
		List<CatalogoUsuarioPIVO> operarios = new ArrayList<>(); 
		operario = CatalogoUsuarioPIVO.builder()
				.id("1")
				.id_propietario("1")
				.descripcion("JORGE IRVING ARREOLA MEJIA")
				.build();
		operarios.add(operario);
		
		operario = CatalogoUsuarioPIVO.builder()
				.id("2")
				.id_propietario("1")
				.descripcion("ARON MARTIN PEREZ PEREZ")
				.build();
		operarios.add(operario);
		
		response.setRespuesta(true);
		response.setResult(operarios);
		response.setResultDescripcion("Operacion Exitosa");
		return response;
	}

	@Override
	public ServiceResponseResult consultarCiudadesEstructura(String params) {
		
		ServiceResponseResult response = ServiceResponseResult.builder()
				.isRespuesta(true)
				.resultDescripcion("Accion exitosa")
				.build();
		
		JsonObject jsonObject = new Gson().fromJson(params, JsonObject.class);
		
		CatalogoUsuarioPIVO ciudad;
		List<CatalogoUsuarioPIVO> ciudades = new ArrayList<>(); 
		ciudad = CatalogoUsuarioPIVO.builder()
				.id("1")
				.descripcion("AGUASCALIENTES")
				.isActivo("false")
				.build();
		ciudades.add(ciudad);
		
		ciudad = CatalogoUsuarioPIVO.builder()
				.id("2")
				.descripcion("CELAYA")
				.isActivo("false")
				.build();
		ciudades.add(ciudad);
		
		response.setRespuesta(true);
		response.setResult(ciudades);
		response.setResultDescripcion("Operacion Exitosa");
		
		logger.info("RESULT"+new Gson().toJson(response));
		return response;
	}

	@Override
	public ServiceResponseResult consultarUsuarios(String params) {
		
		ServiceResponseResult response = ServiceResponseResult.builder()
				.isRespuesta(true)
				.resultDescripcion("Accion exitosa")
				.build();
		
		List<UsuarioPIVO> usuarios = new ArrayList<>();
		UsuarioPIVO usuario;
		usuario = UsuarioPIVO.builder()
				.id("1")
				.nombre("ARTURO GARZA MUÑOZ")
				.numero_empleado("65049245")
				.ciudad("MONTERREY")
				.tipoOperario("INTERNO")
				.unidadNegocio("TOTALPLAY EMPRESARIAL")
				.usuarioFFM("65049245")
				.build();
		usuarios.add(usuario);
		
		usuario = UsuarioPIVO.builder()
				.id("2")
				.nombre("CARLOS RIVERA JIMENEZ")
				.numero_empleado("65044959")
				.ciudad("CIUDAD DE MEXICO")
				.tipoOperario("INTERNO")
				.unidadNegocio("TOTALPLAY EMPRESARIAL")
				.usuarioFFM("65044959")
				.build();
		usuarios.add(usuario);
		
		response.setRespuesta(true);
		response.setResult(usuarios);
		response.setResultDescripcion("Operacion Exitosa");
		
		logger.info("RESULT"+new Gson().toJson(response));
		
		return response;
	}

	@Override
	public ServiceResponseResult consultarPrivilegios(String params) {
		ServiceResponseResult response = ServiceResponseResult.builder()
				.isRespuesta(true)
				.resultDescripcion("Accion exitosa")
				.build();
		
		JsonObject jsonObject = new Gson().fromJson(params, JsonObject.class);
		
		CatalogoUsuarioPIVO privilegio;
		List<CatalogoUsuarioPIVO> privilegios = new ArrayList<>(); 
		List<List> lista = new ArrayList<>();
		privilegio = CatalogoUsuarioPIVO.builder()
				.id("1")
				.idpadre("0")
				.descripcion("DISPONIBILIDAD")
				.isActivo("false")
				.img("disponibilidad.png")
				.precarga("0")
				.build();
		privilegios.add(privilegio);
		
		privilegio = CatalogoUsuarioPIVO.builder()
				.id("2")
				.idpadre("1")
				.descripcion("CONSULTA")
				.isActivo("false")
				.img("disponibilidad.png")
				.precarga("0")
				.build();
		privilegios.add(privilegio);
		
		privilegio = CatalogoUsuarioPIVO.builder()
				.id("3")
				.idpadre("1")
				.descripcion("AGREGA")
				.isActivo("false")
				.img("disponibilidad.png")
				.precarga("0")
				.build();
		privilegios.add(privilegio);
		
		lista.add(privilegios);
		
		privilegios = new ArrayList<>();
		
		privilegio = CatalogoUsuarioPIVO.builder()
				.id("4")
				.idpadre("0")
				.descripcion("ADMINISTRACION USUARIOS")
				.isActivo("false")
				.img("administracion_usuarios.png")
				.precarga("0")
				.build();
		privilegios.add(privilegio);
		
		privilegio = CatalogoUsuarioPIVO.builder()
				.id("5")
				.idpadre("4")
				.descripcion("CONSULTA")
				.isActivo("false")
				.img("disponibilidad.png")
				.precarga("0")
				.build();
		privilegios.add(privilegio);
		
		privilegio = CatalogoUsuarioPIVO.builder()
				.id("6")
				.idpadre("4")
				.descripcion("CREA")
				.isActivo("false")
				.img("disponibilidad.png")
				.precarga("1")
				.id_propietario("1,2,7,8,9,10,13,14,15,16,20")
				.build();
		privilegios.add(privilegio);
		lista.add(privilegios);
		
		response.setRespuesta(true);
		response.setResult(lista);
		response.setResultDescripcion("Operacion Exitosa");
		
		logger.info("RESULT"+new Gson().toJson(response));
		return response;
	}

}
