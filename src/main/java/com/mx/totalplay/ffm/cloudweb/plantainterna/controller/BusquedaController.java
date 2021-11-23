package com.mx.totalplay.ffm.cloudweb.plantainterna.controller;

import com.mx.totalplay.ffm.cloudweb.plantainterna.service.BusquedaService;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.ServiceResponseResult;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/req")
public class BusquedaController {
    private final Logger logger = LogManager.getLogger(BusquedaController.class.getName());
    private final BusquedaService busquedaService;

    public BusquedaController(BusquedaService busquedaService) {
        this.busquedaService = busquedaService;
    }

    @PostMapping("/busquedaGeneralSF")
    public ResponseEntity<?> busquedaGeneralSF(@RequestBody String params){
        logger.info("#### BUSQUEDA GENERAL SALEFORCES ### \n" + params);
        ServiceResponseResult response = busquedaService.busquedaGeneralSF(params);
        if (response.getResult() instanceof Integer){
            return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
    }

    @PostMapping("/consultarDetalleObjectSF")
    public ResponseEntity<?> consultarDetalleObjectSF(@RequestBody String params){
        logger.info("#### CONSULTA DETALLE OBJETO SF ### \n" + params);
        ServiceResponseResult response = busquedaService.consultarDetalleObjectSF(params);
        if (response.getResult() instanceof Integer){
            return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
    }

    @PostMapping("/consultaComentariosNoticiasSF")
    public ResponseEntity<?> consultaComentariosNoticiasSF(@RequestBody String params){
        logger.info("#### CONSULTA NOTICIAS ### \n" + params);
        ServiceResponseResult response = busquedaService.consultaComentariosNoticiasSF(params);
        if (response.getResult() instanceof Integer){
            return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
    }

    @PostMapping("/agregarComentariosNoticiaSF")
    public ResponseEntity<?> agregarComentariosNoticiaSF(@RequestBody String params){
        logger.info("#### CREACION NOTICIAS ### \n" + params);
        ServiceResponseResult response = busquedaService.agregarComentariosNoticiaSF(params);
        if (response.getResult() instanceof Integer){
            return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
    }

    @PostMapping("/agregarSubComentarioNoticiaSF")
    public ResponseEntity<?> agregarSubComentarioNoticiaSF(@RequestBody String params){
        logger.info("#### CREACION NOTICIAS ### \n" + params);
        ServiceResponseResult response = busquedaService.agregarSubComentarioNoticiaSF(params);
        if (response.getResult() instanceof Integer){
            return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
    }

    @PostMapping("/consultarEquiposConfigurados")
    public ResponseEntity<?> consultarEquiposConfigurados(@RequestBody String params){
        logger.info("#### CONSULTAR EQUIPOS CONFIGURADOS ### \n" + params);
        ServiceResponseResult response = busquedaService.consultarEquiposConfigurados(params);
        if (response.getResult() instanceof Integer){
            return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
    }
    
    @PostMapping("/consultarEquipos")
    public ResponseEntity<?> consultarEquipos(@RequestBody String params){
        logger.info("#### CONSULTAR EQUIPOS ### \n" + params);
        ServiceResponseResult response = busquedaService.consultarEquipos(params);
        if (response.getResult() instanceof Integer){
            return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
    }
    
    @PostMapping("/consultarCotizacionesEquipos")
    public ResponseEntity<?> consultarCotizacionesEquipos(@RequestBody String params){
        logger.info("#### CONSULTAR COTIZACIONES EQUIPOS ### \n" + params);
        ServiceResponseResult response = busquedaService.consultarCotizacionesEquipos(params);
        if (response.getResult() instanceof Integer){
            return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
    }

    @PostMapping("/consultarResumenServicios")
    public ResponseEntity<?> consultarResumenServicios(@RequestBody String params){
        logger.info("#### CONSULTAR RESUMEN SERVICIOS ### \n" + params);
        Map<Object, Object> result = new HashMap<>();
        ServiceResponseResult response = busquedaService.consultarResumenFactura(params);
        ServiceResponseResult res = busquedaService.consultarServicios(params);
        result.put("resumen", response);
        result.put("servicios", res);
        if (response.getResult() instanceof Integer){
            return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(result, HttpStatus.ACCEPTED);
    }

    @PostMapping("/consultarIps")
    public ResponseEntity<?> consultarIps(@RequestBody String params){
        logger.info("#### CONSULTAR IPS SF ### \n" + params);
        ServiceResponseResult response = busquedaService.consultarIps(params);
        if (response.getResult() instanceof Integer){
            return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
    }
    
    @PostMapping("/configurarServicios")
    public ResponseEntity<?> configurarServicios(@RequestBody String params){
        logger.info("#### CONFIGURAR SERVICIOS ### \n" + params);
        ServiceResponseResult response = busquedaService.configurarServicios(params);
        if (response.getResult() instanceof Integer){
            return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
    }
    
    @PostMapping("/configurarDns")
    public ResponseEntity<?> configurarDns(@RequestBody String params){
        logger.info("#### CONFIGURAR DNS ### \n" + params);
        ServiceResponseResult response = busquedaService.configurarDns(params);
        if (response.getResult() instanceof Integer){
            return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
    }
    
    @PostMapping("/activarServicios")
    public ResponseEntity<?> activarServicios(@RequestBody String params){
        logger.info("#### ACTIVAR SERVICIOS ### \n" + params);
        ServiceResponseResult response = busquedaService.activarServicios(params);
        if (response.getResult() instanceof Integer){
            return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
    }
    
    @PostMapping("/consultarEstatusActivacion")
    public ResponseEntity<?> consultarEstatusActivacion(@RequestBody String params){
        logger.info("#### CONSULTAR ESTATUS ACTIVACION ### \n" + params);
        ServiceResponseResult response = busquedaService.consultarEstatusActivacion(params);
        if (response.getResult() instanceof Integer){
            return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
    }
}
