function handleError(error) {
    switch (error.status) {
        case 403:
            window.location.href = contex_project.concat("/logout");
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