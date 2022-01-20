package com.mx.totalplay.ffm.cloudweb.utilerias.model;

import java.util.List;
import java.util.Map;

import com.mx.totalplay.ffm.cloudweb.plantainterna.model.CatalogoUsuarioPIVO;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class LoginResult {
	private String mensaje;
	private String description;
	
	private String access_token;
	private String token_type;
	private String refresh_token;
	private String scope;
	private String usuario;
	private String usuarioNombre;
	private String usuarioApellidoPaterno;
	private String usuarioApellidoMaterno;
	private String puesto;
	private String unidadNegocio;
	private String propietario;
	private String directorioFoto;
	private String urlFoto;
	private String jti;
	private String customTocken;
	private String numEmpleado;
	private String geografia;
	private int idUsuario;
	private int idPuesto;
	private int idUnidadNegocio;
	private int idPropietario;
	private int idOrigen;
	private String celular;
	private String correo;

	private long expires_in;
	private Map<String,String> permiAccUs;
	private boolean banderaPintarOtros;
	private String googlAcceLla;
	private String direccionAmbiente;
	private Map<String ,Object>configuraciones;
	 
	private String instancia;
	private String version;
	private Map<String ,Object> configuracionesGenerales;
	private List<Permiso>modulos;
	
	private String creedResult;
}