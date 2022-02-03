
class GenericMapa {
	/**
	 * 
	 * @param {*} mapa  objeto mapa google maps
	 * @param {*} contenedorId id contenedor mapa Ej: [ mapa-ubicacion ]
	 * @param {*} positionCard position del card , arribaabajo-izquierdaderecha Ej: [ 'bottom-rigth' ] Ej: [ 'top-left' ]
	 */
	constructor(mapa, contenedorId, positionCard) {
		this.mapa = mapa
		this.contenedorId = contenedorId
		this.positionCard = positionCard
		this.arrayKmzLayerMapa = []
	}
	inicializarKmz() {
		let kmzArray = this.arrayKmzLayerMapa
		$.each(this.kmzConfigArray, function (index, elemento) {
			let ctaLayer = new google.maps.KmlLayer({
				url: elemento.value,
				map: null,
				clickable: false,
				preserveViewport: true,
				elemento: elemento
			});
			kmzArray.push(ctaLayer)
		})
	}
	inicializar_data() {
		this.inicializarKmz()

		let optionCheckBox = ''
		let tempCont = this.contenedorId
		$.each(this.kmzConfigArray, function (index, elm) {
			optionCheckBox += `
				<div class="form-check form-check-vistamapa">
					<input tag-index="${index}" id="${tempCont}-${index}"  type="checkbox" class="form-check-input checkinput-${tempCont}">			
					<label for="${tempCont}-${index}"  class="form-check-label label-form " >${elm.text}</label>
				</div>    
			`
		});
		let postionvertical = this.positionCard.split("-")[0]
		let postionhorizontal = this.positionCard.split("-")[1]

		$('#' + this.contenedorId).parent().append(
			`
					<div style="${postionvertical}:0; ${postionhorizontal}:0 ;" class="card div-contenedor-kmz-buttons">
						<div class="card-header"> 
							<span class="title-tipoot-map-filtros">FILTROS MAPA</span> 
							<span class="icono-hideoptions-${this.contenedorId} icono-accion-card icono-ocultar-mostrar-map fa fa-minus"></span>
						</div>
						<div class="card-body">
							<form class="form-body-filter">
								${optionCheckBox}                             
							</form>
						</div>
					</div>
				`)

		let kmzArray = this.arrayKmzLayerMapa
		let mapaTemp = this.mapa
		setTimeout(function () {
			$(document.body).on('change', '.checkinput-' + tempCont, function () {
				let indexKmz = parseInt($(this).attr('tag-index'));
				let isCheckedInput = $(this).is(':checked')

				if (isCheckedInput) {
					swal({ text: 'Espera ...', allowOutsideClick: false });
					swal.showLoading();
					setTimeout(function () {
						kmzArray[indexKmz].setMap(mapaTemp)
						swal.close()
					}, 1500)
				} else {
					kmzArray[indexKmz].setMap(null)
				}
			});

			$(document.body).on('click', '.icono-hideoptions-' + tempCont, function () {
				if ($(this).hasClass('fa-minus')) {
					$(this).removeClass('fa-minus fa-plus').addClass('fa-plus')
					$(this).closest('.div-contenedor-kmz-buttons').find('.card-body').hide()

				} else {
					$(this).removeClass('fa-plus fa-minus').addClass('fa-minus')
					$(this).closest('.div-contenedor-kmz-buttons').find('.card-body').show()

				}
			});
		}, 1000)
	}
}
GenericMapa.prototype.callPrototypeMapa = function (listadoData) {
	let listadoKmzConfig = []
	for (const elm in listadoData) {
		if (elm.toUpperCase().includes("KMZ_")) {
			listadoKmzConfig.push({
				identificador: elm,
				text: elm.substring(elm.indexOf("_") + 1, elm.length).replaceAll('_', ' '),
				value: listadoData[elm]
			});
		}
	}
	console.log(listadoKmzConfig)
	GenericMapa.prototype.kmzConfigArray = listadoKmzConfig;
}



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
	"sProcessing": "Procesando...",
	"sLengthMenu": "Mostrar _MENU_ registros",
	"sZeroRecords": "No se encontrar\u00F3n resultados",
	"sEmptyTable": "No se encontrar\u00F3n OT's",
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
		"sNext": "<i class='fa fa-chevron-right fa-3' aria-hidden='true'></i>",
		"sPrevious": "<i class='fa fa-chevron-left fa-3' aria-hidden='true'></i>"
	},
	"oAria": {
		"sSortAscending": ": Activar para ordenar la columna de manera ascendente",
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

mostrarMensajeInformativo = function (mensaje) {
	toastr.info(mensaje);
}

var validateCreed;
var validateCreedMask;
var validateCreedText;

cambiarContraseniaUserLogin = function () {
	regex = /^(?=.*[a-z])\S{9,20}$/;
	numero = /(?=.*\d)/;
	allow = /(?=.*[\u0040]|[\u0024]|[\u0021]|[\u0025]|[\u002A]|[\u0023]|[\u003F]|[\u0026])/;
	refuse = /(?=.*[\u0020]|[\u0022]|[\u0027]|[\u0028]|[\u0029]|[\u002B]|[\u002C]|[\u002D]|[\u002E]|[\u002F]|[\u003A]|[\u003B]|[\u003C]|[\u003D]|[\u003E]|[\u007B-\u00FF])/;

	if ($("#newPasswordUserLogin").val() == '' || $("#actualPasswordUserLogin").val() == '') {
		toastr.warning('Todos los campos son obligatorios');
		return false;
	}
	
	if (validateCreed) {
		if (validateCreedMask && validateCreedMask !== null) {
			if (!validateCreedMask.test($("#newPasswordUserLogin").val())) {
				toastr.warning('Formato invalido');
				return false;
			}
		} else {
			if ($("#newPasswordUserLogin").val().length <= 8 || !regex.test($("#newPasswordUserLogin").val()) || !numero.test($("#newPasswordUserLogin").val())
				|| !allow.test($("#newPasswordUserLogin").val()) || refuse.test($("#newPasswordUserLogin").val())) {
				toastr.warning('Formato invalido');
				return false;
			}
		}
	}


	if ($("#newPasswordUserLogin").val() !== $("#confirmPasswordUserLogin").val()) {
		toastr.warning('Las contrase\u00F1as no coinciden');
		return false;
	}

	let params = {
		idUsuario: null,
		actualCreed: $("#actualPasswordUserLogin").val(),
		nuevoPassword: $("#newPasswordUserLogin").val(),
		newcred: $("#newPasswordUserLogin").val()
	}

	swal({ text: 'Espera un momento...', allowOutsideClick: false });
	swal.showLoading();
	$.ajax({
		url: "req/restaurarContrasena",
		type: "POST",
		data: JSON.stringify(params),
		headers: {
			'Content-Type': 'application/json'
		},
		error: function (xhr, error, thrown) {
			handleError(xhr);
			swal.close();
		},
		complete: function (response) {
			$("#actualPasswordUserLogin").val('');
			$("#newPasswordUserLogin").val('');
			$("#confirmPasswordUserLogin").val('');
			$("#comentariosPasswordUserLogin").val('');
			swal.close();
			if (response.responseJSON.respuesta) {
				$("#modalCambiaContraseniaLogin").modal('hide');
				toastr.success('Contrase\u00F1a restablecida correctamente');
			} else {
				if (response.responseJSON.result === 'credencialInvalida') {
					toastr.warning('La contrase\u00F1a actual no coincide');
				} else {
					toastr.error(response.responseJSON.resultDescripcion);
				}
			}
		}
	})

}

$("#modalCambiaContraseniaLogin").on("shown.bs.modal", function () {
	$("#actualPasswordUserLogin").val('');
	$("#newPasswordUserLogin").val('');
	$("#confirmPasswordUserLogin").val('');
	$("#comentariosPasswordUserLogin").val('');
	$("#msj-valida").css("display", validateCreed ? 'block' : 'none')
})

$('.dropdown-menu-login-info').on("click.bs.dropdown", function (e) {
	e.stopPropagation();
});

inOutImg = function (size) {
	if (size == 'out') {
		$('#content-in-img').css('display', 'none');
		$('#content-out-img').css('display', 'block');

	} else {
		$('#content-out-img').css('display', 'none');
		$('#content-in-img').css('display', 'block');

	}
}

var monster = document.getElementById('monsterPlay');
var timer = Math.floor(Math.random() * (180000 - 6000));
var monsterAnimation = Math.floor(Math.random() * (3 - 0));
setInterval(() => {
	monster.style.animation = 'none';
	setTimeout(() => {
		switch (monsterAnimation) {
			case 0:
				monster.style.animation = 'monster-play 5s 1';
				break;

			case 1:
				monster.style.animation = 'monster-show 10s 1';
				break;

			case 2:
				monster.style.animation = 'monster-run 5s 1';
				break;

			default:
				break;
		}
		
	}, 1000);
	timer = Math.floor(Math.random() * 190000) + 6000;
	monsterAnimation = Math.floor(Math.random() * (3 - 0));

}, timer);

