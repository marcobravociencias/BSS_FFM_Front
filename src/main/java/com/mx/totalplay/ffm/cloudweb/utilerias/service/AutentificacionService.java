package com.mx.totalplay.ffm.cloudweb.utilerias.service;

import com.mx.totalplay.ffm.cloudweb.utilerias.model.LoginResult;

public interface AutentificacionService {

	LoginResult getAutentificacion(String username, String password);

}
