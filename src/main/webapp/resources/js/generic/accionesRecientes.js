accionesRecientesModulo = function(moduloAccion, mensaje, tipo, user){
    return {
        identificadorModulo: moduloAccion,
        mensaje: mensaje,
        tipoMensaje: tipo,
        usuario: user,
        hora: formatHora(new Date()),
        fecha: formatDate(new Date()),
        sysdateJs: new Date()
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

function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }
  
  function formatDate(date) {
    return [
      padTo2Digits(date.getDate()),
      padTo2Digits(date.getMonth() + 1),
      date.getFullYear(),
    ].join('/');
  }

  function formatHora(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }