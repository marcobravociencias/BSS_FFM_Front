package com.mx.totalplay.ffm.cloudweb.plantainterna.utils;

import lombok.Data;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Data
@Component
public class ConstGestionPlanning {
    @Value("${consultaPagosLiberarTecnico}")
    private String consultaPagosLiberarTecnico;

    @Value("${liberarPagosTecnico}")
    private String liberarPagosTecnico;
}
