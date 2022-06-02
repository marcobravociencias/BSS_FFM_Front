package com.mx.totalplay.ffm.cloudweb.plantainterna.model;

import lombok.Data;

import java.io.Serializable;

@Data
public class TestingModel implements Serializable {
    private Long id;
    private String nombre;
    private String apellido;
    private int edad;
}
