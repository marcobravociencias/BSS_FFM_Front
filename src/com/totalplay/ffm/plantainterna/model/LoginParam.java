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
public class LoginParam implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String User;
	private String Password;
	private String Ip;
}
