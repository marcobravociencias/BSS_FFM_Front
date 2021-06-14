package com.totalplay.ffm.plantainterna.repository;

import java.util.List;

import com.totalplay.ffm.plantainterna.model.IntervencionSkillVO;
import com.totalplay.ffm.plantainterna.model.ParamsSkills;
import com.totalplay.ffm.plantainterna.model.TecnicoSoporteTemp;
import com.totalplay.ffm.plantainterna.model.catalogoVO;

public interface SkillsRepository {
	
	public List<catalogoVO> selectHorario();
	
	public List<IntervencionSkillVO> obtenerIntervencionesSkillsDisp();
	
	public List<TecnicoSoporteTemp> obtenerTecnicosSkillsDisp();
}
