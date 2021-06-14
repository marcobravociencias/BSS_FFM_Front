package com.totalplay.ffm.plantainterna.utils;

import java.io.Serializable;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import lombok.Data;

@Data
@Component
public class ConstSkills implements Serializable{
	
	private static final long serialVersionUID = 1L;

	@Value("${urlfiltrosskills}")
	private String filtrosSkills;
	
	@Value("${urlguardarskills}")
	private String guardarSkill;
	
}
