package com.totalplay.ffm.plantainterna.repository;

import java.util.List;

import com.totalplay.ffm.plantainterna.model.consultaOTPI.ConsultaOTVO;
import com.totalplay.ffm.plantainterna.model.consultaOTPI.ConsultaTrayectoriaVO;
import com.totalplay.ffm.plantainterna.model.consultaOTPI.ParamConsultaOTPI;

public interface ConsultaOTPIRepository {
	public List<ConsultaOTVO> selectOTs(ParamConsultaOTPI paramsOT);

	public List<ConsultaOTVO> consultaMaterialesOt(ParamConsultaOTPI paramsOT);

	public List<ConsultaTrayectoriaVO> consultaInfoTrayectoria(String idot);

	public int countSelectOTs(ParamConsultaOTPI paramsOT);
}
