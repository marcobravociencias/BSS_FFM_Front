package com.mx.totalplay.ffm.cloudweb.plantainterna.model.consultaOTPI;

import java.util.List;
import lombok.Data;

@Data
public class ResponseImagenEvidencia {
	private String resultDescription;
	private String result;
	private List<ImagenesConfig> Imagen;
	private List<ImagenesTipo> Tipo;
}
