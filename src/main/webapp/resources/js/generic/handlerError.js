function handleError(error) {
    switch (error.status) {
        case 403:
            document.getElementById('logout').submit()
            break;
        case 500:
            mostrarMensajeErrorAlert('Error interno en el servidor.')
            swal.close();
            break
    
        default:
            swal.close();
            break;
    }
}