package com.totalplay.ffm.plantainterna.service.impl;

import java.util.List;

import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

import com.google.gson.Gson;
import com.totalplay.ffm.plantainterna.repository.ReportesPIRepository;
import com.totalplay.ffm.plantainterna.service.ReportesPIService;
import com.totalplay.ffm.plantainterna.utils.ConstReportesPI;
import com.totalplay.ffm.utilerias.model.ServiceResponseResult;
import com.totalplay.ffm.utilerias.utils.ConsumeRest;
import com.totalplay.ffm.config.mybatis.MyBatisConfigPI;
import com.totalplay.ffm.plantainterna.model.CoordinadorReporteVO;
import com.totalplay.ffm.plantainterna.model.OrdenesPIVO;
import com.totalplay.ffm.plantainterna.model.ParamsReporteCoorPi;
import com.totalplay.ffm.plantainterna.model.ParamsReporteOTPI;
import com.totalplay.ffm.plantainterna.model.ParamsReporteOrdenesPI;
import com.totalplay.ffm.plantainterna.model.ParamsReportesPI;
import com.totalplay.ffm.plantainterna.model.ReportesPIVO;
import com.totalplay.ffm.plantainterna.model.TecnicoAuxVO;
import com.totalplay.ffm.plantainterna.model.TecnicoReporteVO;

@Service
public class ImplReportesPIService implements ReportesPIService{

	private  final Logger logger = LogManager.getLogger(ImplReportesPIService.class.getName());
	
	
	@Autowired
	private ConsumeRest restCaller;
	
	
	
	@Autowired
	private Environment env;
	
	@Autowired
	private ConstReportesPI constReportesPI;
	Gson gson=new Gson();
	
	@Autowired
	private ReportesPIRepository reportesPIRepository;
	
	
	@Override
	public ServiceResponseResult consultarReporteTecnico(ParamsReportesPI params) {
		ServiceResponseResult response = ServiceResponseResult.builder().isRespuesta(false)
				.resultDescripcion("sin datos").result(null).build();
		try {
			List<TecnicoReporteVO> consulta =reportesPIRepository.selectRepTecnico(params); 
			logger.info("### RESULT  consultarReporteTecnico ### " + gson.toJson(consulta));
			
				response = ServiceResponseResult.builder().isRespuesta(true)
						.resultDescripcion("Accion completada").result(consulta).build();
			
		} catch (Exception e) {
			logger.info(e);
			response = ServiceResponseResult.builder().isRespuesta(false)
					.resultDescripcion("ERROR GENERAL").result(null).build();
		}
		return response;
	}


	@Override
	public ServiceResponseResult consultarCatalogosPI(String params) {
		// TODO Auto-generated method stub
		return null;
	}


	@Override
	public ServiceResponseResult consultarReporteOTSPT(ParamsReporteOTPI paramsRep) {
		ServiceResponseResult response = ServiceResponseResult.builder().isRespuesta(false)
				.resultDescripcion("sin datos").result(null).build();
		try {
			List<ReportesPIVO> consulta =reportesPIRepository.selectRepOTSPI(paramsRep);
			logger.info("### RESULT consultarReporteOTSPT ### " + gson.toJson(consulta));
			
				response = ServiceResponseResult.builder().isRespuesta(true)
						.resultDescripcion("Accion completada").result(consulta).build();
			
		} catch (Exception e) {
			logger.info(e);
			response = ServiceResponseResult.builder().isRespuesta(false)
					.resultDescripcion("ERROR GENERAL").result(null).build();
		}
		
		return response;
	}


	@Override
	public ServiceResponseResult consultarReporteCoordinador(ParamsReporteCoorPi paramsRep) {
		ServiceResponseResult response = ServiceResponseResult.builder().isRespuesta(false)
				.resultDescripcion("sin datos").result(null).build();
		try {
			List<CoordinadorReporteVO> consulta =reportesPIRepository.reporteCoordinadorProcedure(paramsRep); 
			logger.info("### RESULT consultarReporteCoordinador ### " + gson.toJson(consulta));
			
				response = ServiceResponseResult.builder().isRespuesta(true)
						.resultDescripcion("Accion completada").result(consulta).build();
			
		} catch (Exception e) {
			logger.info(e);
			response = ServiceResponseResult.builder().isRespuesta(false)
					.resultDescripcion("ERROR GENERAL").result(null).build();
		}
		return response;
	}


	@Override
	public ServiceResponseResult consultarReporteTecnicoAux(ParamsReportesPI paramsRep) {
		ServiceResponseResult response = ServiceResponseResult.builder().isRespuesta(false)
				.resultDescripcion("sin datos").result(null).build();
		try {
			List<TecnicoAuxVO> consulta =reportesPIRepository.reporteAuxiliarTecnico(paramsRep);
			logger.info("### RESULT  consultarReporteTecnicoAux ### " + gson.toJson(consulta));
			
				response = ServiceResponseResult.builder().isRespuesta(true)
						.resultDescripcion("Accion completada").result(consulta).build();
			
		} catch (Exception e) {
			logger.info(e);
			response = ServiceResponseResult.builder().isRespuesta(false)
					.resultDescripcion("ERROR GENERAL").result(null).build();
		}
		return response;
	}


	@Override
	public ServiceResponseResult consultarReporteOrdenesTerminadas(ParamsReporteOrdenesPI paramsRep) {
		ServiceResponseResult response = ServiceResponseResult.builder().isRespuesta(false)
				.resultDescripcion("sin datos").result(null).build();
		try {
			List<OrdenesPIVO> consulta =reportesPIRepository.reporteOrdenesTerminadas(paramsRep);
			logger.info("### RESULT  consultarReporteTecnicoAux ### " + gson.toJson(consulta));
			
				response = ServiceResponseResult.builder().isRespuesta(true)
						.resultDescripcion("Accion completada").result(consulta).build();
			
		} catch (Exception e) {
			logger.info(e);
			response = ServiceResponseResult.builder().isRespuesta(false)
					.resultDescripcion("ERROR GENERAL").result(null).build();
		}
		return response;
	}


	@Override
	public ServiceResponseResult consultarReporteOrdenesIntegrador(ParamsReporteOrdenesPI paramsRep) {
		ServiceResponseResult response = ServiceResponseResult.builder().isRespuesta(false)
				.resultDescripcion("sin datos").result(null).build();
		try {
			List<OrdenesPIVO> consulta =reportesPIRepository.reporteOt(paramsRep);
			logger.info("### RESULT  consultarReporteTecnicoAux ### " + gson.toJson(consulta));
			
				response = ServiceResponseResult.builder().isRespuesta(true)
						.resultDescripcion("Accion completada").result(consulta).build();
			
		} catch (Exception e) {
			logger.info(e);
			response = ServiceResponseResult.builder().isRespuesta(false)
					.resultDescripcion("ERROR GENERAL").result(null).build();
		}
		return response;
	}

}
