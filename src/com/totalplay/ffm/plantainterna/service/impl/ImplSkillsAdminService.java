package com.totalplay.ffm.plantainterna.service.impl;

import java.rmi.RemoteException;
import java.util.ArrayList;
import java.util.List;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.totalplay.ffm.plantainterna.model.catalogoVO;
import com.totalplay.ffm.plantainterna.repository.ReportesPIRepository;
import com.totalplay.ffm.plantainterna.repository.SkillsRepository;
import com.totalplay.ffm.plantainterna.model.TecnicoSoporteTemp;
import com.totalplay.ffm.plantainterna.model.CatalogoUsuarioPIVO;
import com.totalplay.ffm.plantainterna.model.IntervencionSkillVO;
import com.totalplay.ffm.plantainterna.model.ParamsSkills;
import com.totalplay.ffm.plantainterna.service.SkillsAdminService;
import com.totalplay.ffm.plantainterna.utils.ConstDespachoPI;
import com.totalplay.ffm.plantainterna.utils.ConstSkills;
import com.totalplay.ffm.utilerias.model.ServiceResponseResult;
import com.totalplay.ffm.utilerias.utils.ConstantesGeneric;
import com.totalplay.ffm.utilerias.utils.ConsumeRest;
//import com.oracle.xmlns.BPELS_PLANTA_EXTERNA.ADU_LocationUser_Cats_ENL.BPELArboles.ProcessResponseInformacionArbolArbol;
//import com.oracle.xmlns.SkillsDisponibilidad.GuadaInfoSkillsTec.BPELProcessGuardaInfoSkill.BPELProcessGuardaInfoSkillProxy;
//import com.oracle.xmlns.SkillsDisponibilidad.GuadaInfoSkillsTec.BPELProcessGuardaInfoSkill.ProcessListaTecnicos;
//import com.oracle.xmlns.SkillsDisponibilidad.GuadaInfoSkillsTec.BPELProcessGuardaInfoSkill.ProcessListaTecnicosListaSkills;
@Service
public class ImplSkillsAdminService implements SkillsAdminService{
	
	private  final Logger logger = LogManager.getLogger(ImplSkillsAdminService.class.getName());
	
	@Autowired
	private ConstantesGeneric constantesAmbiente;

	@Autowired
	ConstSkills constSkills;
	
	@Autowired
	private ConsumeRest restCaller;

	@Autowired
	private Environment env;
	
	@Autowired
	private SkillsRepository skillsAdminRepository;
	
	Gson gson=new Gson();
	
	@Override
	public ServiceResponseResult busqueda() {
		ServiceResponseResult response = ServiceResponseResult.builder().isRespuesta(false)
				.resultDescripcion("sin datos").result(null).build();
		try {
			
			List<Object> resultlist = new ArrayList<>();
			
			List<IntervencionSkillVO>listadoIntervenciones=skillsAdminRepository.obtenerIntervencionesSkillsDisp();
			List<TecnicoSoporteTemp>listadoTecnicos=skillsAdminRepository.obtenerTecnicosSkillsDisp();
			//List<catalogoVO> cat=skillsAdminRepository.selectHorario();
			
			logger.info("### RESULT  listado ### " + gson.toJson(resultlist));
			
			resultlist.add(listadoIntervenciones);
			resultlist.add(listadoTecnicos);
			//resultlist.add(cat);
			
			response = ServiceResponseResult.builder().isRespuesta(true)
					.resultDescripcion("Accion completada").result(resultlist).build();
		}catch(Exception ex) {
			
			logger.info(ex);
			response = ServiceResponseResult.builder().isRespuesta(false)
					.resultDescripcion("ERROR GENERAL").result(null).build();
		}
		return response;
	}

	@Override
	public ServiceResponseResult consultarCatalogosPI(String params) {
		JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
		
		JsonObject login = new JsonObject();		
		login.addProperty( env.getProperty("param.textus.pI") , constantesAmbiente.getTextIpUsuario());
		login.addProperty( env.getProperty("param.textus.drowssaP") , constantesAmbiente.getTextCredPad());
		login.addProperty( env.getProperty("param.textus.resU") , constantesAmbiente.getTextCredUs());	
		
		jsonObject.add("Login", login);
		
		logger.info("json object params## "+jsonObject.toString());
		
	    String url="http://10.216.47.89"+constSkills.getFiltrosSkills();
		ServiceResponseResult response= restCaller.callPostParamString(url, jsonObject.toString());
	    logger.info("RESULT"+gson.toJson(response));
		return response;
	}

	@Override
	public ServiceResponseResult guardarSkills(TecnicoSoporteTemp params) {
		
			JsonObject jsonObject = gson.fromJson("", JsonObject.class);
		
		JsonObject login = new JsonObject();		
		login.addProperty( env.getProperty("param.textus.pI") , constantesAmbiente.getTextIpUsuario());
		login.addProperty( env.getProperty("param.textus.drowssaP") , constantesAmbiente.getTextCredPad());
		login.addProperty( env.getProperty("param.textus.resU") , constantesAmbiente.getTextCredUs());	
		
		jsonObject.add("Login", login);
		
		logger.info("json object params## "+jsonObject.toString());
		
	    String url="http://10.216.47.89"+constSkills.getGuardarSkill();
		ServiceResponseResult response= restCaller.callPostParamString(url, jsonObject.toString());
	    logger.info("RESULT"+gson.toJson(response));
		
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
	public ServiceResponseResult consultarArbolCiudades2(String prop) {
		ServiceResponseResult response = ServiceResponseResult.builder()
				.isRespuesta(true)
				.resultDescripcion("Accion exitosa")
				.build();
	//	com.oracle.xmlns.BPELS_PLANTA_EXTERNA.ADU_LocationUser_Cats_ENL.BPELArboles.Process  process=new com.oracle.xmlns.BPELS_PLANTA_EXTERNA.ADU_LocationUser_Cats_ENL.BPELArboles.Process();
	//	com.oracle.xmlns.BPELS_PLANTA_EXTERNA.ADU_LocationUser_Cats_ENL.BPELArboles.ProcessLogin login=new com.oracle.xmlns.BPELS_PLANTA_EXTERNA.ADU_LocationUser_Cats_ENL.BPELArboles.ProcessLogin();
		
		/*login.setIp(constantesAmbiente.getTextIpUsuario());
		login.setPassword(constantesAmbiente.getTextCredPad());
		login.setUser(constantesAmbiente.getTextCredUs());
		
		process.setLogin(login);
		process.setPropietario(prop);*/
		
		try {
			
		}catch(Exception ex) {
			
			
		}
		return response;
	}

	@Override
	public ServiceResponseResult GuadaInfoSkillsTec(List<TecnicoSoporteTemp> skills) {
		logger.debug("Ingresa a guardarInfoSkills");
		ServiceResponseResult response=ServiceResponseResult.builder()
				.isRespuesta(true)
				.resultDescripcion("Accion exitosa")
				.build();
		
		try {
		/*	BPELProcessGuardaInfoSkillProxy proxy = new BPELProcessGuardaInfoSkillProxy("http://10.216.47.89/soa-infra/services/FFMEstructura/GuadaInfoSkillsTec/bpelprocessguardainfoskill_client_ep?WSDL");
			com.oracle.xmlns.SkillsDisponibilidad.GuadaInfoSkillsTec.BPELProcessGuardaInfoSkill.ProcessLogin login = new com.oracle.xmlns.SkillsDisponibilidad.GuadaInfoSkillsTec.BPELProcessGuardaInfoSkill.ProcessLogin();
			
			/*login.setIp("12.0.0.1");
			login.setPassword("SalesF0rc31557$");
			login.setUserId("574011");
			
			ProcessListaTecnicos[] listaTecnicos = new ProcessListaTecnicos[skills.size()];
			ProcessListaTecnicos tecnicos;
			
			ProcessListaTecnicosListaSkills sk;
			ProcessListaTecnicosListaSkills[] idSkills;
			*/
		}catch(Exception ex) {
			
			
		}
		return response;
	}

}
