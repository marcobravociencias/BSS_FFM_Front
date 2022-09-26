package com.mx.totalplay.ffm.cloudweb.projectmanager.service.impl;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.mx.totalplay.ffm.cloudweb.plantainterna.service.impl.ImplCoordInstalacionesService;
import com.mx.totalplay.ffm.cloudweb.projectmanager.model.ParamFFMBandejasEimVO;
import com.mx.totalplay.ffm.cloudweb.projectmanager.service.BandejasEimPMService;
import com.mx.totalplay.ffm.cloudweb.projectmanager.utils.ConstBandejasEim;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.DataTableResponse;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.LoginResult;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.ServiceResponseResult;
import com.mx.totalplay.ffm.cloudweb.utilerias.utils.ConsumeRest;
import com.mx.totalplay.ffm.cloudweb.utilerias.utils.UtileriaGeneral;


@Service
public class ImplBandejaEimService implements BandejasEimPMService {
	private  final Logger logger = LogManager.getLogger(ImplCoordInstalacionesService.class.getName());
	private Gson gson=new Gson();
	private final ConsumeRest restCaller;
	private final UtileriaGeneral utilerias;
	private final ConstBandejasEim constBandejasEim;
	
	@Autowired
	public ImplBandejaEimService(ConstBandejasEim constBandejasEim,ConsumeRest restCaller, UtileriaGeneral utilerias) {
		this.constBandejasEim = constBandejasEim;
		this.restCaller = restCaller;
		this.utilerias = utilerias;
	}
	
	@Override
	public DataTableResponse consultarBandejaEim(ParamFFMBandejasEimVO params) {
		//JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
				logger.info("ImplBandejaEimService.class [metodo = consultarBandejaEim() ]\n"+params);
				LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
				 String[][] dataArray = null;
				DataTableResponse dataResponse = DataTableResponse.builder()
		                .isRespuesta(false)
		                .data(new String[0][7])
		                .paginaActual(0)
		                .registrosTotales(0)
		                .recordsFiltered("0")
		                .recordsTotal("0")
		                .draw(params.getDraw() + "")
		                .result(null).build();
				params.setPagina((Integer.parseInt(params.getStart()) + 10) / 10);
				
				//jsonObject.set
				
				//jsonObject.get("name_os").getAsString();
				logger.info("### Object: " + gson.toJson(params));
				
		        try {
		        	ServiceResponseResult response = restCaller.callPostBearerTokenRequest(gson.toJson(params), principalDetail.getDireccionAmbiente().concat(constBandejasEim.getConsultaBandejaSinEimApi()),
		                    ServiceResponseResult.class, principalDetail.getAccess_token());
		    		logger.info("##### RESULT" + gson.toJson(response) + " #######");
		        	if (response.getResult() instanceof Integer){
		        		dataResponse = DataTableResponse.builder()
			                .isRespuesta(false)
			                .data(new String[0][7])
			                .paginaActual(0)
			                .registrosTotales(0)
			                .recordsFiltered("0")
			                .recordsTotal("0")
			                .draw(params.getDraw() + "")
			                .result(response.getResult()).build();
		        	} else {
		        		JsonObject jsonObjectResponse = gson.fromJson(gson.toJson(response.getResult()), JsonObject.class);
		        		JsonArray ordenesArray = jsonObjectResponse.getAsJsonArray("ordenes");
		        		if (ordenesArray.size() > 0) {
		        			if (jsonObjectResponse.get("registrosTotales").getAsInt() > 0) {
		        				//TABLA
		        				int count = 0;
		                        dataArray = new String[ordenesArray.size()][7];
		                        for (int i = 0; i < ordenesArray.size(); i++) {
		                        	JsonObject object = (JsonObject) ordenesArray.get(i);
		                        	dataArray[count][0] = "<input type='checkbox'/>";
		                        	dataArray[count][1] = object.get("idOrden").getAsInt() != 0 ? String.valueOf(object.get("idOrden").getAsInt()) : "";
		                        	dataArray[count][2] = object.get("folioSistema") != null ? object.get("folioSistema").getAsString().trim() : "";
		                        	dataArray[count][3] = object.get("claveCliente") != null ? object.get("claveCliente").getAsString().trim() : "";
		                        	dataArray[count][4] = object.get("cliente") != null ? object.get("cliente").getAsString().trim() : "";
		                        	dataArray[count][5] = object.get("fechaActualizacion") != null ? object.get("fechaActualizacion").getAsString().trim() : "";
		                        	dataArray[count][6] = object.get("estatus") != null ? object.get("estatus").getAsString().trim() : "";
		                        	//dataArray[count][6] = object.get("estado") != null ? object.get("estado").getAsString().trim() : "";
		                        	//dataArray[count][7] = object.get("motivo") != null ? object.get("motivo").getAsString().trim() : "";
		                        	//dataArray[count][8] = object.get("usuarioActualiza") != null ? object.get("usuarioActualiza").getAsString().trim() : "";
		                        	//dataArray[count][9] = object.get("tipoOrden") != null ? object.get("tipoOrden").getAsString().trim() : "";
		                        	//dataArray[count][10] = object.get("subTipoOrden") != null ? object.get("subTipoOrden").getAsString().trim() : "";
		                        	//dataArray[count][7] ="<div class='tooltip-btn'> <span onclick='consultaDetalleOt(" + object.get("idOrden").getAsInt() + 
		                        	//		")' class='btn-floating btn-option btn-sm btn-secondary waves-effect waves-light acciones'><th><i class='icono_cons_bg fa fa-bars' aria-hidden='true'></i></th></span></div>";
		                        	count++;
		                        }
		                        dataResponse = DataTableResponse.builder()
		                                .isRespuesta(true)
		                                .data(dataArray)
		                                .paginaActual(jsonObjectResponse.get("paginaActual").getAsInt())
		                                .registrosTotales(jsonObjectResponse.get("registrosTotales").getAsInt())
		                                .recordsFiltered(jsonObjectResponse.get("registrosTotales").getAsInt() + "")
		                                .recordsTotal(jsonObjectResponse.get("registrosTotales").getAsInt() + "")
		                                .draw(params.getDraw() + "")
		                                .result(response.getResult()).build();
		        			} else {
		        				dataResponse = DataTableResponse.builder()
		                                .isRespuesta(true)
		                                .data(new String[0][10])
		                                .paginaActual(jsonObjectResponse.get("paginaActual").getAsInt())
		                                .registrosTotales(jsonObjectResponse.get("registrosTotales").getAsInt())
		                                .recordsFiltered(jsonObjectResponse.get("registrosTotales").getAsInt() + "")
		                                .recordsTotal(jsonObjectResponse.get("registrosTotales").getAsInt() + "")
		                                .draw(params.getDraw() + "")
		                                .result(response.getResult()).build();
		        			}
		        		}
		        	}
		        } catch (Exception ex) {
		        	logger.info("Error: "+ex);
		        }
		        
		        logger.info("*** Objeto Response: " + gson.toJson(dataResponse));
				
				return dataResponse;
	}
	
}