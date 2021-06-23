package com.mx.totalplay.ffm.cloudweb.plantainterna.utils;

import lombok.Data;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Data
@Component
public class ConstDisponbilidadPI {

    @Value("${restagregadisponibilidad}")
    private String restagregadisponibilidad;

    @Value("${restconsultadisponibilidad}")
    private String restconsultadisponibilidad;

    @Value("${restactualizadisponibilidad}")
    private String restactualizadisponibilidad;

    @Value("${restconsultaintervencidisponibilidad}")
    private String restconsultaintervencidisponibilidad;

    @Value("${ffmDisponibilidad}")
    private String ffmDisponibilidad;

    @Value("${actualizarDisponibilidad}")
    private String actualizarDisponibilidad;

    @Value("${crearDisponibilidad}")
    private String crearDisponibilidad;
}
