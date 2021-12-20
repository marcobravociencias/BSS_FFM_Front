package com.mx.totalplay.ffm.cloudweb.parametrosasignacion.util;

import static org.fusesource.jansi.Ansi.ansi;
import static org.fusesource.jansi.Ansi.Color.CYAN;
import static org.fusesource.jansi.Ansi.Color.GREEN;
import static org.fusesource.jansi.Ansi.Color.RED;
import static org.fusesource.jansi.Ansi.Color.WHITE;

import java.time.LocalDate;
import java.time.LocalTime;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;

import com.mx.totalplay.ffm.cloudweb.plantaexterna.controller.InspectorIncidenciaController;

import lombok.extern.slf4j.Slf4j;

@Service
public class ConsoleMessage {
	private final Logger log = LogManager.getLogger(InspectorIncidenciaController.class.getName());
	
	public void messages_console ( String metodo, String mensaje ) {
		log.info(metodo + ", "+ mensaje); 
	}
	
	public void messages_console(String metodo, String mensaje, String tipo){
		String straux=metodo+ ", ";
		
             
		
        if ( tipo.equalsIgnoreCase("error") ) {
        	straux += ansi().fg(RED).a(mensaje).fg(WHITE);
        }
        else if ( tipo.equalsIgnoreCase("titulo") ) {
        	straux += ansi().fg(GREEN).a(mensaje).fg(WHITE);
        }
        else if ( tipo.equalsIgnoreCase("exito") ) {
        	straux += ansi().fg(CYAN).a(mensaje).fg(WHITE);
        }
        else {
        	straux += ansi().fg(RED).a("[error]Bandera incorrecta en messages_console").fg(WHITE);
        }
        
        log.info(straux);
	}
}
