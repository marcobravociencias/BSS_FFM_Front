package com.mx.totalplay.ffm.cloudweb.plantainterna.service;


import com.mx.totalplay.ffm.cloudweb.utilerias.model.ServiceResponseResult;

public interface BusquedaService {
    ServiceResponseResult busquedaGeneralSF(String params);

    ServiceResponseResult consultarDetalleObjectSF(String params);

    ServiceResponseResult consultaComentariosNoticiasSF(String params);

    ServiceResponseResult agregarComentariosNoticiaSF(String params);

    ServiceResponseResult consultarEquiposConfigurados(String params);
    
    ServiceResponseResult consultarEquipos(String params);
    
    ServiceResponseResult consultarCotizacionesEquipos(String params);
    
    ServiceResponseResult configurarServicios(String params);
    
    ServiceResponseResult configurarDns(String params);
    
    ServiceResponseResult activarServicios(String params);
    
    ServiceResponseResult consultarEstatusActivacion(String params);

    ServiceResponseResult agregarSubComentarioNoticiaSF(String params);

    ServiceResponseResult eliminarComentarioNoticias(String params);

    ServiceResponseResult eliminarSubComentarioNoticias(String params);
    
    ServiceResponseResult consultarSerieExistenteActivacion(String params);
	
    ServiceResponseResult consultarMacNumeroSerie(String params);
	
    ServiceResponseResult consultarAutofindActivacion(String params);
    
    ServiceResponseResult generarDnsActivacion(String params);
    
    ServiceResponseResult consultarResumenPaquetePorCSP(String params);
    
    ServiceResponseResult consultarCatalogoJustificacionActivacion();

}
