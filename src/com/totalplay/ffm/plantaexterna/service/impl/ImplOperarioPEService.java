package com.totalplay.ffm.plantaexterna.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.totalplay.ffm.plantaexterna.model.OperarioPEVO;
import com.totalplay.ffm.plantaexterna.repository.OperarioPERepository;
import com.totalplay.ffm.plantaexterna.service.OperarioPEService;

@Service
public class ImplOperarioPEService implements OperarioPEService{
	
	@Autowired
	OperarioPERepository operarioRepository;
	
	@Override
	public List<OperarioPEVO> obtenerListadoOperario() {
		// TODO Auto-generated method stub
		List<OperarioPEVO> operario=null;
		try {
			operario=operarioRepository.obtenerOperarios();
			
		}catch(Exception e) {
			e.printStackTrace();
		}
		return operario;
	}
	
}
