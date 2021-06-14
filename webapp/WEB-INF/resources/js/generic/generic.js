var idioma_espanol_not_font = {
	"sProcessing": "Procesando...",
	"sLengthMenu": "Mostrar _MENU_ registros",
	"sZeroRecords": "No se encontrar\u00F3n resultados",
	"sEmptyTable": "Ning\u00Fan dato disponible en esta tabla",
	"sInfo": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
	"sInfoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
	"sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
	"sInfoPostFix": "",
	"sSearch": "Buscar:",
	"sUrl": "",
	"sInfoThousands": ",",
	"sLoadingRecords": "Cargando...",
	"oPaginate": {
		"sFirst": "Primero",
		"sLast": "Último",
		"sNext": "Siguiente",
		"sPrevious": "Anterior"
	},
	"oAria": {
		"sSortAscending": ": Activar para ordenar la columna de manera ascendente",
		"sSortDescending": ": Activar para ordenar la columna de manera descendente"
	}
};

var espanol = {
	"sProcessing":     "Procesando...",
	"sLengthMenu":     "Mostrar _MENU_ registros",
	"sZeroRecords":    "No se encontrar\u00F3n resultados",
	"sEmptyTable":     "No se encontrar\u00F3n OT's",
	"sInfo":           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
	"sInfoEmpty":      "Mostrando registros del 0 al 0 de un total de 0 registros",
	"sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
	"sInfoPostFix":    "",
	"sSearch":         "Buscar:",
	"sUrl":            "",
	"sInfoThousands":  ",",
	"sLoadingRecords": "Cargando...",
	"oPaginate": {
		"sFirst":    "Primero",
		"sLast":     "Último",
		"sNext":     "<i class='fa fa-chevron-right fa-3' aria-hidden='true'></i>",
		"sPrevious": "<i class='fa fa-chevron-left fa-3' aria-hidden='true'></i>"
	},
	"oAria": {
		"sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
		"sSortDescending": ": Activar para ordenar la columna de manera descendente"
	}
};

let guidaDisponibilidad = [
	{
		intro: "<b>Modulo Disponibilidad<b>"
	},
	{
		element: '#opcionesTablero',
		intro: "Opciones para uso del tablero disponibilidad (<em>consta de las siguientes acciones c&oacute;mo consultar, agregar y modificar disponibilidad</em>)<small>"
	},
	{
		element: '#ref_consulta',
		intro: "Opci&oacute;n para desplegar el tablero con caracteristicas de <em>consultar disponibilidad.</em>"
	},
	{
		element: '.titulo_disponibilidad',
		intro: "Nombre del tablero <em>Consulta Disponibilidad.<em>"
	},
	{
		element: '#filtroCompania',
		intro: "Compa&ntilde;ia disponible."
	},
	{
		element: '#filtroRegiones',
		intro: 'Regiones disponibles.'
	},
	{
		element: '#ciudad_campo',
		intro: 'Ciudades disponibles.'
	},
	{
		element: '#distrito_campo',
		intro: 'Distritos disponibles.'
	},
	{
		element: '#tipo_intervencion',
		intro: 'Intervenciones disponibles.'
	},
	{
		element: '#ref_inserta',
		intro: 'Opci&oacute;n para desplegar el tablero con caracteristicas de <em>Agregar disponibilidad.</em>'
	},
	{
		element: '.titulo_disponibilidad',
		intro: "Nombre del tablero <em>Agregar Disponibilidad.</em>"
	},
	{
		element: '#turnoDisponibilidad',
		intro: 'Turnos disponibles para agregar la disponibilidad.'
	},
	{
		element: '#contenido_bloqueo',
		intro: 'Opci&oacute;n estado en que se encuentra la disponibilidad.'
	},
	{
		element: '#rangoFechas',
		intro: 'Rango de fechas para agregar la disponibilidad.'
	},
	{
		element: '#agregar_disponibilidad',
		intro: 'Bot&oacute;n para agregar la disponibilidad.'
	},
	{
		element: '#ref_modifica',
		intro: 'Opci&oacute;n que permite modificar la disponibilidad en las intervenciones de manera general.'
	},
	{
		element: '.titulo_disponibilidad',
		intro: "Nombre del tablero <em>Modificar Disponibilidad.</em>"
	},
	{
		element: '#modificar_disponibilidad',
		intro: 'Bot&oacute;n para modificar la disponibilidad.'
	}
];

/*
 * Función mostrar mensaje de exito  
 * @param mensaje [ mensaje a mostrar ]
 * @returns {undefined}   
 */
function mostrarMensajeExitoAlert(mensaje) {
	toastr.success(mensaje);
}


/*
* Función mostrar mensaje de error  
* @param mensaje [ mensaje a mostrar ]
* @returns {undefined}   
*/
function mostrarMensajeErrorAlert(mensaje) {
	toastr.error(mensaje);
}

mostrarMensajeWarningValidacion = function (mensaje) {
	toastr.warning(mensaje);
}