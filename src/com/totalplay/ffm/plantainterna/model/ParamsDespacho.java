package com.totalplay.ffm.plantainterna.model;


import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Builder 
@NoArgsConstructor
@AllArgsConstructor
public class ParamsDespacho implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	public String param1; 
	public String param2; 
	public String param3;	
	private LoginParam Login;

}
