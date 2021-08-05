
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<sec:authentication property="principal" var="userStore"/>
<div class="modal" tabindex="-1" aria-labelledby="modalFotoDespachoLabel" aria-hidden="true" id="modalFotoDespacho">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-body">
                <div class="row">
                    <img src="${userStore.urlFoto}"  width="300" height="300" />
                </div>
                <div class="container">
                    <div class="row container-card-despacho">
                        <span class="nombrecompletodespacho">${userStore.usuarioNombre} ${userStore.usuarioApellidoPaterno} ${userStore.usuarioApellidoMaterno}</span>
                    </div>   
                    <div class="row container-card-despacho">
                        <b class="title-despacho-modal">Usuario:</b><p class="text-despacho-modal">${userStore.usuario}</p>
                    </div>   
                    <div class="row container-card-despacho">
                        <b class="title-despacho-modal">N&uacute;m. empleado:</b><p class="text-despacho-modal">${userStore.numEmpleado}</p>
                    </div>
                    <div class="row container-card-despacho">
                        <b class="title-despacho-modal">Geograf&iacute;a:</b><p class="text-despacho-modal">${userStore.geografia}</p>
                    </div>
                    <div class="row container-card-despacho">
                        <b class="title-despacho-modal">Propietario:</b><p class="text-despacho-modal">${userStore.propietario}</p>
                    </div>
                    <hr />
                    <div class="row container-card" style="font-weight: lighter;">
                        <div class="col-6">
                            <p class="text-despacho-modal text-despacho-modal-fotter">${userStore.puesto}</p>
                        </div>
                        <div class="col-6" style="text-align: end">
                            <p class="text-despacho-modal text-despacho-modal-fotter">${userStore.unidadNegocio}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>