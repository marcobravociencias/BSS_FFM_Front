package com.mx.totalplay.ffm.cloudweb.utilerias.daos;

import com.google.gson.Gson;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.ServiceResponseResult;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.TransactionException;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import javax.persistence.Tuple;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
public class GenericDao {
	private final Logger logger = LogManager.getLogger(GenericDao.class.getName());
	private Gson gson = new Gson();
	/*
	private final EntityManager entityManager;
	private final Environment environment;

	@Autowired
	public GenericDao(EntityManager entityManager, Environment environment) {
		this.entityManager = entityManager;
		this.environment = environment;
	}**/

	public ServiceResponseResult getNombresTablas() {
		ServiceResponseResult result =null;/** ServiceResponseResult.builder().build();
		try {
			Query query = entityManager.createNativeQuery(environment.getProperty("param.query_tablas"));
			result = ServiceResponseResult.builder().isRespuesta(true).result(query.getResultList())
					.resultDescripcion("Se consulto con éxito.").build();
		} catch (Exception e) {
			logger.info("ERROR CONSULTA getNombresTablas(): ", e);
			result = ServiceResponseResult.builder().isRespuesta(false).result(null)
					.resultDescripcion("No se pudieron consultar las tablas.").build();
		} */
		return result;
	}

	public ServiceResponseResult consultarQuery(String sql) {
		ServiceResponseResult response = null;/**ServiceResponseResult.builder().isRespuesta(true).build();
		List<Tuple> result = new ArrayList<>();
		try {
			Query query = entityManager.createNativeQuery(sql, Tuple.class);
			Query query2 = entityManager.createNativeQuery(sql);
			if (query.getResultList().size() > 0) {
				result = query.getResultList();
			}

			logger.info("RESULT CONSULTA: " + gson.toJson(query2.getResultList()));
			List<Tuple> finalResult = result;
			Map<String, Object> mapRespuesta = new HashMap<String, Object>() {
				{
					put("elementosColumna", finalResult.get(0).getElements());
					put("elementosResult", gson.toJson(query2.getResultList()));
				}
			};
			response = ServiceResponseResult.builder().isRespuesta(true).result(mapRespuesta).build();
		} catch (Exception e) {
			logger.info("ERROR QUERY: ", e);
			response = ServiceResponseResult.builder().isRespuesta(false)
					.resultDescripcion("Error al hacer la consulta.").build();
		} finally {
			if (entityManager.isOpen())
				entityManager.close();
		}**/
		return response;
	}

	@Transactional(readOnly = false)
	public ServiceResponseResult insetUpdateQuery(String sql) {
		ServiceResponseResult response =null;/** ServiceResponseResult.builder().isRespuesta(true).build();
		try {
			int i = entityManager.createNativeQuery(sql).executeUpdate();
			response = ServiceResponseResult.builder().isRespuesta(true).resultDescripcion("Se ejecuto correctamente.")
					.build();
		} catch (TransactionException ex) {
			logger.info("ERROR QUERY: ", ex);
			response = ServiceResponseResult.builder().isRespuesta(false).build();
		} catch (Exception e) {
			logger.info("ERROR QUERY: ", e);
			response = ServiceResponseResult.builder().isRespuesta(false).build();
		} finally {
			if (entityManager.isOpen())
				entityManager.close();
		}**/
		return response;
	}
}