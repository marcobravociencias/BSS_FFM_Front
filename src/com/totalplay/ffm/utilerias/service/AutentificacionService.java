package com.totalplay.ffm.utilerias.service;

import com.totalplay.ffm.utilerias.model.LoginResult;

public interface AutentificacionService {

	LoginResult getAutentificacion(String username, String password);

}
