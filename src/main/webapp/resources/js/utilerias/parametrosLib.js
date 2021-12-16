/* Funciones Genericas */

function echo ( mensaje ){
	/*
	 * Esta funcion se encarga de mostrar mensajes en consola
	 */
	console.log(mensaje);
}

function inputGetValue (idInput){
	/*
	 * Esta funcion se encarga de Obtener valores de un input a traves de su ID
	 */
	
	var valor;
	
	try {
		console.log("Toma Valor de: "+idInput);
		valor 	= document.getElementById(idInput).value;
	}
	catch (error) {
		console.log(error);
		
		valor = null;
	}
	
	return valor;
}

function crearElemento (){
	
}

function removerElemento (elementoID){
	elemento = document.getElementById(elementoID);
	padre = elemento.parentNode;
	padre.removeChild(elemento);
}

function resetearElemento ( tipoElemento,elementoRemoverID ){
	elemento = document.getElementById(elementoRemoverID);
	padre = elemento.parentNode;
	padre.removeChild(elemento);
	
	elementoNuevo 	= document.createElement(tipoElemento);
	padre.appendChild(elementoNuevo);
	
}

/* ===================================================================================================== */
/* Funciones WEB */
function urlGet ( $_GET ){
	/*
	 * Esta funcion se encarga de tomar los valores que viajan en una url (GET) a traves de su nombre 
	 */
	
	const valores = window.location.search;
	const urlParams = new URLSearchParams(valores);
	var get = urlParams.get($_GET);
	
	return get;
}

function consumirRest2(urlDelServicio,metodoServicio,datosAEnviar){
	/*
	 * Esta funcion se encarga de consumir una api rest
	 * Recibe como parametros:
	 * urlDelServicio 	-> Es la url de la API que se va a consumir
	 * metodoServicio 	-> Es el método a traves del cual se va a consumir la API (GET/POST)
	 * datosAEnviar 	-> En caso de que la API necesite datos se pasan a traves de esta variables (puede ser null en caso de no necesitar datos)
	 */
	
	var xhttp = new XMLHttpRequest();
	
	/*
	echo("Inicia: consumirRest()");
	echo("Metodo: "+metodoServicio);
	echo("Url: "+urlDelServicio);
	echo("Datos: "+datosAEnviar);
	*/
	xhttp.open(metodoServicio,urlDelServicio, true);
	xhttp.setRequestHeader("Content-type", "application/json");
	xhttp.setRequestHeader("Accept", "application/json, text/plain, */*");
	xhttp.send(datosAEnviar);
	return xhttp;
}

function consumirRest(urlDelServicio,metodoServicio,datosAEnviar){
	/*
	 * Esta funcion se encarga de consumir una api rest
	 * Recibe como parametros:
	 * urlDelServicio 	-> Es la url de la API que se va a consumir
	 * metodoServicio 	-> Es el método a traves del cual se va a consumir la API (GET/POST)
	 * datosAEnviar 	-> En caso de que la API necesite datos se pasan a traves de esta variables (puede ser null en caso de no necesitar datos)
	 */
	
	var xhttp = new XMLHttpRequest();
	
	echo("==============================================================================");
	echo("Inicia: consumirRest()");
	echo("Metodo: "+metodoServicio);
	echo("Url: "+urlDelServicio);
	echo("Datos: "+datosAEnviar);
	
	
	xhttp.open(metodoServicio,urlDelServicio, true);
	xhttp.setRequestHeader("Content-type", "application/json");
	xhttp.setRequestHeader("Accept", "application/json;charset=utf-8");
	xhttp.send(datosAEnviar);
	return xhttp;
}

function obtenerDatosDeRest (xhttp){
	/*
	 * Esta funcion se encarga de procesar los datos que responde una API 
	 * Recibe como parametro un objeto tipo XMLHttpRequest() que ya consumio una api rest
	 */
	
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var respuesta = JSON.parse(this.responseText);
//			echo("obtenerDatosDeRest(): "+respuesta);
		}
		
		return respuesta;
	}
}

/* ===================================================================================================== */
/* Funciones para trabajar con formularios <form> */

function crearLabel ( texto ){
	var label 		= document.createElement("label");
	label.innerText = texto;
	
	return label;
}

function crearButton ( texto,id,classButton){
	var button = document.createElement("button");
	button.setAttribute("id",id);
	button.setAttribute("class",classButton);
	button.innerText = texto;
	
	return button;
}

function crearSubmit (value){
	var button = document.createElement("input");
	
	button.className = "btn btn-secondary";
	button.setAttribute("type", "submit");
	button.setAttribute("value", value);
	
	return button;
}

function crearForm (url,metodo,idForm){
	var form = document.createElement("form");
	form.setAttribute("action",url);
	form.setAttribute("method",metodo);
	form.setAttribute("id",idForm);
	
	return form;
}

function crearHiddenInput (inputName,inputValue,inputId) {
	/*
	 * Esta funcion se encarga de creaun un unput de tipo HIDDEN (oculto) 
	 */
	
	var input1		= document.createElement("input");
	input1.setAttribute("name",inputName);
	input1.setAttribute("value",inputValue);
	input1.setAttribute("type","hidden");
	input1.setAttribute("id",inputId);
	
	return input1; 
}

function crearDivGroupTextArea (textoLabel,inputValue,inputId){
	/*
	 * Esta funcion se encarga de crear un conjunto de Label/Input dentro de un DIV siguiendo la nomenclatura CSS Bootstrap 
	 */
	
	var divGroup1	=document.createElement("div");
	divGroup1.setAttribute("class","form-group");
				
	var label1		= document.createElement("label");
	label1.setAttribute("for","colFormLabelSm");
	label1.setAttribute("class","col-sm-2 col-form-label col-form-label");
	var textoLabel1	= document.createTextNode(textoLabel);
	label1.appendChild(textoLabel1);
			
	var input1		= document.createElement("textarea");
	input1.setAttribute("class","form-control form-control");
	input1.setAttribute("id",inputId);
	input1.setAttribute("rows","9");
	var textoArea1	= document.createTextNode(inputValue);
	input1.appendChild(textoArea1);
				
	var divInput1	=document.createElement("div");
	divInput1.setAttribute("class","col-sm-8");
	divInput1.appendChild(input1);
				
	divGroup1.appendChild(label1);
	divGroup1.appendChild(divInput1);
	
	return divGroup1;
}

function crearDivGroupInput (textoLabel,inputValue,inputId){
	/*
	 * Esta funcion se encarga de crear un conjunto de Label/Input dentro de un DIV siguiendo la nomenclatura CSS Bootstrap 
	 */
	
	var divGroup1	=document.createElement("div");
	divGroup1.setAttribute("class","form-group");
				
	var label1		= document.createElement("label");
	label1.setAttribute("for","colFormLabelSm");
	label1.setAttribute("class","col-sm-2 col-form-label col-form-label");
	var textoLabel1	= document.createTextNode(textoLabel);
	label1.appendChild(textoLabel1);
			
	var input1		= document.createElement("input");
	input1.setAttribute("value",inputValue);
	input1.setAttribute("class","form-control form-control");
	input1.setAttribute("id",inputId);
				
	var divInput1	=document.createElement("div");
	divInput1.setAttribute("class","col-sm-8");
	divInput1.appendChild(input1);
				
	divGroup1.appendChild(label1);
	divGroup1.appendChild(divInput1);
	
	return divGroup1;
}

function crearDivGroup (textoLabel,divId){
	/*
	 * Esta funcion se encarga de crear un conjunto de Label/Input dentro de un DIV siguiendo la nomenclatura CSS Bootstrap 
	 */
	
	var divGroup1	=document.createElement("div");
	divGroup1.setAttribute("class","form-group");
				
	var label1		= document.createElement("label");
	label1.setAttribute("for","colFormLabelSm");
	label1.setAttribute("class","col-sm-2 col-form-label col-form-label");
	var textoLabel1	= document.createTextNode(textoLabel);
	label1.appendChild(textoLabel1);
	
	divGroup1.appendChild(label1);
	
	return divGroup1;
}

function crearDivGroupInputList (textoLabel,inputValue,inputId,list){
	/*
	 * Esta funcion se encarga de crear un conjunto de Label/Input dentro de un DIV siguiendo la nomenclatura CSS Bootstrap 
	 */
	
	var divGroup1	=document.createElement("div");
	divGroup1.setAttribute("class","form-group");
				
	var label1		= document.createElement("label");
	label1.setAttribute("for","colFormLabelSm");
	label1.setAttribute("class","col-sm-2 col-form-label col-form-label");
	var textoLabel1	= document.createTextNode(textoLabel);
	label1.appendChild(textoLabel1);
			
	var input1		= document.createElement("input");
	input1.setAttribute("value",inputValue);
	input1.setAttribute("class","form-control form-control");
	input1.setAttribute("id",inputId);
	input1.setAttribute("list",list);
				
	var divInput1	=document.createElement("div");
	divInput1.setAttribute("class","col-sm-8");
	divInput1.appendChild(input1);
				
	divGroup1.appendChild(label1);
	divGroup1.appendChild(divInput1);
	
	return divGroup1;
}

function crearTextArea (textoLabel,textAreaValue,textAreaId){
	/*
	 * Esta funcion se encarga de crear un conjunto de Label/TextArea dentro de un DIV siguiendo la nomenclatura CSS Bootstrap 
	 */
	var valor01 = "";
	if ( textAreaValue != null ){
		valor01 = textAreaValue;
	}
				
	var divGroup3	=document.createElement("div");
	divGroup3.setAttribute("class","form-group");
			
	var label3		= document.createElement("label");
	label3.setAttribute("for","colFormLabelSm");
	label3.setAttribute("class","col-sm-2 col-form-label col-form-label");
	var textoLabel3	= document.createTextNode(textoLabel);
	label3.appendChild(textoLabel3);
				
	var textArea3	= document.createElement("textarea");
	var textoArea3 	= document.createTextNode(valor01);
	textArea3.setAttribute("class","form-control col-sm-8");
	textArea3.setAttribute("rows","15");
	textArea3.setAttribute("id",textAreaId);
	textArea3.appendChild(textoArea3);
		
	divGroup3.appendChild(label3);
	divGroup3.appendChild(textArea3);	
	
	return divGroup3;
}

/* ===================================================================================================== */
/* Funciones para trabajar con tablas <table> */

function crearTable ( id ){
	/*
	 * Esta funcion se encarga de crear una Tabla siguiendo la nomenclatura CSS Bootstrap 
	 */
	
	var tabla   = document.createElement("table");
	tabla.className = "display table table-hover";
	tabla.setAttribute("id",id);
	
	return tabla;
}


function crearTableBody (){
	/*
	 * Esta funcion se encarga de crear una elemento tbody
	 */
	 
	var tabla   = document.createElement("tbody");
	
	return tabla;
}

function crearThead ( arrayTh, tipoColumna ){
	/*
	 * Esta funcion se encarga de leer un array y escribir todas las columnas de el elemento TR
	 */
	
	var thead = document.createElement("thead");
	var tr = document.createElement("tr");
        
    for (var i = 0; i < arrayTh.length; i++) {
		var th     = document.createElement(tipoColumna);
		var thTexto= document.createTextNode(arrayTh[i]);
		
		th.appendChild(thTexto);
		tr.appendChild(th);
	}
	
	thead.appendChild(tr);
	
	return thead;
}

function crearTr ( arrayTh, tipoColumna ){
	/*
	 * Esta funcion se encarga de leer un array y escribir todas las columnas de el elemento TR
	 */
	
	var tr = document.createElement("tr");
        
    for (var i = 0; i < arrayTh.length; i++) {
		var th     = document.createElement(tipoColumna);
		var thTexto= document.createTextNode(arrayTh[i]);
		
		th.appendChild(thTexto);
		tr.appendChild(th);
	}
	
	return tr;
}

function crearTrForm ( arrayTh, tipoColumna ){
	/*
	 * Esta funcion se encarga de leer un array y escribir todas las columnas de el elemento TR
	 * Además, puede insertar objetos(por ejemplo un Form, Button, etc) a una columna del TR.
	 */
	 
	var tr = document.createElement("tr");
        
    for (var i = 0; i < arrayTh.length; i++) {
		var th     = document.createElement(tipoColumna);
		var thTexto= document.createTextNode(arrayTh[i]);
		
		/*
		echo ("crear: "+arrayTh[i]);
		echo (typeof(arrayTh[i]));
		*/
		
		if ( typeof(arrayTh[i]) == "object" && arrayTh[i]!=null ){
			th.appendChild(arrayTh[i]);
			tr.appendChild(th);
		}
		else{
			th.appendChild(thTexto);
			tr.appendChild(th);
		}
	}
	
	return tr;
}








/* Elementos temporales */


function setTitulo (tituloTexto){
	document.getElementById("titulo").innerHTML=tituloTexto;
}

function motrarElemento2 ( elemento ){
	delete elemento.style.display;
}

function motrarElemento ( elemento ){
	elemento.style.width='100%';
}

function ocultarElemento2 ( elemento ){
	elemento.style.width='0%';
}

function ocultarElemento ( elemento ){
	elemento.style.display = 'none';
}

function mostrarBlock ( elemento ){
	elemento.style.display='block';
	elemento.style.cellspacing='0';
}

function mostrarInLine ( elemento ){
	elemento.style.display = 'inline';
}






















