function initElement (){
	/*
	 * Inicializa las funciones 
	 */
	
	var idParametro = urlGet("idParametro");
	var action		= urlGet("action");
	
	switch ( action ){
		case null:
			echo("Action: Inicio");	
			
			setTitulo("Asignaci&oacute;n parametros");
			parametrosPantallInicial ();
			parametroCargarModulos();
			break;
		
		case "editar":
			echo("Action: "+action);
			
			verParametrosDetalles();
			parametroCargarModulos();
			break;
			
		case "filtrar":
			echo("Action: "+action);
			
			setTitulo("Asignaci&oacute;n parametros");
			parametrosPantallaInicialFiltrar ();
			parametroCargarModulos();
			break;
			
		case "versiones":
			echo("Action: "+action);
			
			setTitulo("Versiones antiguas del Parametro");
			parametroCargarVersiones();
			parametroCargarModulos();
			
			break;
		
		case "rollback":
			echo("Action: "+action);
			
			setTitulo("Hacer Rollback");
			parametrosRollback();
			break;
			
		case "eliminados":
			echo("Action: "+action);
			
			setTitulo("Historial de Parametros Eliminados");
			parametroEliminados();
			parametroCargarModulos();
			break;
			
		case "habilitar":
			echo("Action: "+action);
			
			setTitulo("Activar Parametros");
			parametrosActivar ()
			break;
			
		case "nuevo":
			echo("Action: "+action);
			
			setTitulo("Crear Parametro");
			parametroCargarModulos();
			nuevoParametro ();
			break;
			
		case "eventos":
			echo("Action: "+action);
			
			setTitulo("Log de eventos");
			parametroCargarModulos();
			parametrosLog ();
			break;
	}
	
	var buttonHome	= document.getElementById("link_parametros");
	buttonHome.setAttribute("onclick","regresar();");
	
	var buttonHome	= document.getElementById("link_eliminados");
	buttonHome.setAttribute("onclick","eliminadosIr();");
	
	var buttonHome	= document.getElementById("link_nuevo");
	buttonHome.setAttribute("onclick","nuevoIr();");
	
	var buttonHome	= document.getElementById("link_eventos");
	buttonHome.setAttribute("onclick","eventosIr();");
}
