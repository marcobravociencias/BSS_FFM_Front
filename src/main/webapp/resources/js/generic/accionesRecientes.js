accionesRecientesModulo = function(moduloAccion, mensaje, tipo, user){
    return {
        identificadorModulo: moduloAccion,
        mensaje: mensaje,
        tipoMensaje: tipo,
        usuario: user
    }
}

guardarAccionesRecientesModulo = function(object){
    let accionesList;
    if (localStorage.getItem('MODULO_MENSAJES_ACCIONES_RECIENTES')) {
        accionesList = JSON.parse(localStorage.getItem('MODULO_MENSAJES_ACCIONES_RECIENTES'))
    } else{
        accionesList = []   
    }

    accionesList.push(object)
    localStorage.setItem('MODULO_MENSAJES_ACCIONES_RECIENTES', JSON.stringify(accionesList))
}

getAccionesRecientesUsuario = function(modulo){
    let accionesList;
    let usuario = document.getElementById('tipo1')
    if (localStorage.getItem('MODULO_MENSAJES_ACCIONES_RECIENTES')) {
        accionesList = JSON.parse(localStorage.getItem('MODULO_MENSAJES_ACCIONES_RECIENTES'))
    } else{
        accionesList = []   
    }

    let accionesUsuario = accionesList.filter(e => { return e.usuario === usuario && e.identificadorModulo === modulo })
    return accionesUsuario
}