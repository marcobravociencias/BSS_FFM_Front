package com.mx.totalplay.ffm.cloudweb.plantainterna.service.impl;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import java.util.HashMap;
import java.util.Map;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import com.mx.totalplay.ffm.cloudweb.plantainterna.model.consultaOTPI.ParamConsultaOTPI;
import com.mx.totalplay.ffm.cloudweb.plantainterna.service.VistaChecklistService;
import com.mx.totalplay.ffm.cloudweb.plantainterna.utils.ConstVistaChecklist;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.DataTableResponse;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.LoginResult;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.ServiceResponseResult;
import com.mx.totalplay.ffm.cloudweb.utilerias.utils.ConstantesGeneric;
import com.mx.totalplay.ffm.cloudweb.utilerias.utils.ConsumeRest;
import com.mx.totalplay.ffm.cloudweb.utilerias.utils.UtileriaGeneral;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ImplVistaChecklistService implements VistaChecklistService{
    private  final Logger logger = LogManager.getLogger(ImplDespachoPIService.class.getName());
	private final ConstantesGeneric constantesAmbiente;
	private final ConstVistaChecklist constVistaChecklist;
	private final ConsumeRest restCaller;
	private final UtileriaGeneral utilerias;
	private Gson gson=new Gson();
	
	@Autowired
	public ImplVistaChecklistService(ConstantesGeneric constantesAmbiente, ConsumeRest restCaller, UtileriaGeneral utilerias, ConstVistaChecklist constVistaChecklist) {
		this.constantesAmbiente = constantesAmbiente;
		this.restCaller = restCaller;
		this.utilerias = utilerias;
		this.constVistaChecklist = constVistaChecklist;
	}
	
    @Override
	public DataTableResponse consultaEvidenciasChecklist(ParamConsultaOTPI paramsOT) {
		 logger.info("ImplVistaChecklistService.class [metodo consultaEvidenciasChecklist() ]\n" + gson.toJson(paramsOT));
	        LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
	        String[][] dataArray = new String[0][12];
	        DataTableResponse dataResponse = DataTableResponse.builder()
	                .isRespuesta(false)
	                .data( dataArray )
	                .paginaActual(0)
	                .registrosTotales(0)
	                .recordsFiltered("0")
	                .recordsTotal("0")
	                .draw(paramsOT.getDraw() + "")
	                .result(null).build();
	        paramsOT.setPagina((Integer.parseInt(paramsOT.getStart()) + 10) / 10);
	        paramsOT.setIdOrden(!paramsOT.getIdOrden().equals("") ? paramsOT.getIdOrden() : null);
	        paramsOT.setFolioSistema(!paramsOT.getFolioSistema().equals("") ? paramsOT.getFolioSistema() : null);

	        logger.info("### Object: " + gson.toJson(paramsOT));

	        String tokenAcces = principalDetail.getAccess_token();
	        logger.info("consultaEvidenciasChecklist ##+" + tokenAcces);
	        String urlRequest = principalDetail.getDireccionAmbiente().concat(constVistaChecklist.getConsultaEvidenciasChecklist());
	        logger.info("URL ##+" + urlRequest);

	        ServiceResponseResult response = restCaller.callPostBearerTokenRequest(gson.toJson(paramsOT), urlRequest,
	                ServiceResponseResult.class, tokenAcces);
	        
	        
	        if (response.getResult() == null || response.getResult() instanceof Integer){
	            dataResponse = DataTableResponse.builder()
	                    .isRespuesta(false)
	                    .data( dataArray )
	                    .paginaActual(0)
	                    .registrosTotales(0)
	                    .recordsFiltered("0")
	                    .recordsTotal("0")
	                    .draw(paramsOT.getDraw() + "")
	                    .result(response.getResult()).build();
	        } else {
	            JsonObject jsonObjectResponse = gson.fromJson(gson.toJson(response.getResult()), JsonObject.class);
	            JsonArray ordenesArray = jsonObjectResponse.getAsJsonArray("ordenes");
	            if (ordenesArray.size() > 0) {
	                if (jsonObjectResponse.get("registrosTotales").getAsInt() > 0) {
	                    int count = 0;
	                    dataArray = new String[ordenesArray.size()][12];
	                    int idOrden=0;
	                    for (int i = 0; i < ordenesArray.size(); i++) {
	                        JsonObject object = (JsonObject) ordenesArray.get(i);
	                        
	                        dataArray[count][0] = object.get("idOrden").getAsInt() != 0 ? String.valueOf(object.get("idOrden").getAsInt()) : "";
	                        dataArray[count][1] = ( object.get("folioSistema") != null && object.get("folioSistema").getAsString().trim() !="" )  ? object.get("folioSistema").getAsString().trim() : "Sin dato";
	                        dataArray[count][2] = ( object.get("nombreCliente") != null && object.get("nombreCliente").getAsString().trim() !="" )  ? object.get("nombreCliente").getAsString().trim() : "Sin dato";
	                        dataArray[count][3] = ( object.get("claveCliente") != null && object.get("claveCliente").getAsString().trim() !="" )  ? object.get("claveCliente").getAsString().trim() : "Sin dato";
	                        dataArray[count][4] = ( object.get("ciudad") != null && object.get("ciudad").getAsString().trim() !="" )  ? object.get("ciudad").getAsString().trim() : "Sin dato";
	                        dataArray[count][5] = ( object.get("fechaAgenda") != null && object.get("fechaAgenda").getAsString().trim() !="" )  ? object.get("fechaAgenda").getAsString().trim() : "Sin dato";
	                        dataArray[count][6] = ( object.get("descTipo") != null && object.get("descTipo").getAsString().trim() !="" )  ? object.get("descTipo").getAsString().trim() : "Sin dato";
	                        dataArray[count][7] = ( object.get("descSubTipo") != null && object.get("descSubTipo").getAsString().trim() !="" )  ? object.get("descSubTipo").getAsString().trim() : "Sin dato";
	                        dataArray[count][8] = ( object.get("descripcionEstatus") != null && object.get("descripcionEstatus").getAsString().trim() !="" )  ? object.get("descripcionEstatus").getAsString().trim() : "Sin dato";
	                        dataArray[count][9] = ( object.get("descripcionEstado") != null && object.get("descripcionEstado").getAsString().trim() !="" )  ? object.get("descripcionEstado").getAsString().trim() : "Sin dato";
	                        dataArray[count][10] = ( object.get("descripcionMotivo") != null && object.get("descripcionMotivo").getAsString().trim() !="" )  ? object.get("descripcionMotivo").getAsString().trim() : "Sin dato";
	                        dataArray[count][11] = "<div class='tooltip-btn'> <span onclick='consultaDetalle(" + String.valueOf(object.get("idOrden").getAsInt()) + ", "+ String.valueOf(object.get("idUsuario")) + ")' class='btn-option btn-floating btn-evidencia btn-sm btn-secondary waves-effect waves-light'><th><i class='icono_cons_bg fa fa-picture-o' aria-hidden='true'></i></th></span></div>";

	                        count++;

	                    }
	                    dataResponse = DataTableResponse.builder()
	                            .isRespuesta(true)
	                            .data( dataArray )
	                            .paginaActual(jsonObjectResponse.get("paginaActual").getAsInt())
	                            .registrosTotales(jsonObjectResponse.get("registrosTotales").getAsInt())
	                            .recordsFiltered(jsonObjectResponse.get("registrosTotales").getAsInt() + "")
	                            .recordsTotal(jsonObjectResponse.get("registrosTotales").getAsInt() + "")
	                            .draw(paramsOT.getDraw() + "")
	                             .result(response.getResult()) 
	                            .build();
	                } else {
	                    dataResponse = DataTableResponse.builder()
	                            .isRespuesta(true)
	                            .data( dataArray )
	                            .paginaActual(jsonObjectResponse.get("paginaActual").getAsInt())
	                            .registrosTotales(jsonObjectResponse.get("registrosTotales").getAsInt())
	                            .recordsFiltered(jsonObjectResponse.get("registrosTotales").getAsInt() + "")
	                            .recordsTotal(jsonObjectResponse.get("registrosTotales").getAsInt() + "")
	                            .draw(paramsOT.getDraw() + "").build();
	                }
	            }
	        }



	        logger.info("*** Objeto Response: " + gson.toJson(dataResponse));

	        return dataResponse;
	}
    
    @Override
	public ServiceResponseResult consultaDetalleEvidenciaChecklist(String params) {
		logger.info("ImplVistaChecklistService.class [metodo = consultaDetalleEvidenciaChecklist() ]\n");
        LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();

        JsonObject jsonObject = gson.fromJson(params, JsonObject.class);

        String tokenAcces = principalDetail.getAccess_token();
        String urlRequest = principalDetail.getDireccionAmbiente().concat(constVistaChecklist.getConsultaDetalleEvidenciaChecklist());
        logger.info("URL ##+" + urlRequest);

        Map<String, String> paramsRequestGet = new HashMap<String, String>();
        paramsRequestGet.put("idOt", jsonObject.get("idOt").getAsString());
        paramsRequestGet.put("idUsuario", jsonObject.get("idUsuario").getAsString());

        ServiceResponseResult response = restCaller.callGetBearerTokenRequest(paramsRequestGet, urlRequest,
                ServiceResponseResult.class, tokenAcces);
        return response;
	}
    
    @Override
   	public ServiceResponseResult guardarEvidenciaChecklist(String params) {
   		logger.info("ImplVistaChecklistService.class [metodo = guardarEvidenciaChecklist() ]\n");
           LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();

           JsonObject jsonObject = gson.fromJson(params, JsonObject.class);

           String tokenAcces = principalDetail.getAccess_token();
           String urlRequest = principalDetail.getDireccionAmbiente().concat(constVistaChecklist.getGuardarEvidenciaChecklist());
           logger.info("URL ##+" + urlRequest);

           ServiceResponseResult response = restCaller.callPatchBearerTokenRequest(params, urlRequest,
                   ServiceResponseResult.class, tokenAcces);
           return response;
   	}
}
