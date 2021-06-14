package com.totalplay.ffm.utilerias.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;


@Controller
public class PlantaExternaViewsController {
	
	
	@GetMapping("/despachoplantaexterna")
	public String despachoPlantaExterna() {	
		return "plantaexterna/despacho/despachope";				
	}
}
