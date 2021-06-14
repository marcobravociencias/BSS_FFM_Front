package com.totalplay.ffm.plantainterna.repository;

import java.util.List;
import java.util.Map;

import com.totalplay.ffm.plantainterna.model.ReportesPIVO;
import com.totalplay.ffm.plantainterna.model.TecnicoAuxVO;
import com.totalplay.ffm.plantainterna.model.TecnicoReporteVO;
import com.totalplay.ffm.plantainterna.model.CoordinadorReporteVO;
import com.totalplay.ffm.plantainterna.model.OrdenesPIVO;
import com.totalplay.ffm.plantainterna.model.ParamsReporteCoorPi;
import com.totalplay.ffm.plantainterna.model.ParamsReporteOTPI;
import com.totalplay.ffm.plantainterna.model.ParamsReporteOrdenesPI;
import com.totalplay.ffm.plantainterna.model.ParamsReportesPI;
public interface ReportesPIRepository {
	
	public List<TecnicoReporteVO> selectRepTecnico(ParamsReportesPI params);
	
	public List<ReportesPIVO> selectRepOTSPI(ParamsReporteOTPI params);
	
	public List<CoordinadorReporteVO> reporteCoordinadorProcedure(ParamsReporteCoorPi params);
	
	public List<TecnicoAuxVO> reporteAuxiliarTecnico(ParamsReportesPI params);
	
	public List<OrdenesPIVO> reporteOrdenesTerminadas(ParamsReporteOrdenesPI params);
	
	public List<OrdenesPIVO> reporteOt(ParamsReporteOrdenesPI params);

}
