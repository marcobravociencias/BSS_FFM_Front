<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<div class="modal fade" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" id="modalComentariosPI">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <img class="img-comentarios" src="${pageContext.request.contextPath}/resources/img/plantainterna/despacho/tecnicootasignada.png" class="img-despacho-comentario" alt="">
                <div class="content-usuario-mensaje">
                    <p class="top-title-comentario" >Agrega un comentario a la orden <b>37</b> </p>
                    <p class="bottom-title-comentario" >Historial de comentarios </p>
                </div>
                <button
                    type="button"
                    class="btn-close"
                    data-mdb-dismiss="modal"
                    aria-label="Close" >
                </button>
            </div>
			<div class="modal-body modal-body-comentarios">
				<div class="container container-mensajes">                    
                    <div class="row">
                        <div class="col-12">                           
                        </div>
                    </div>
				</div>
			</div>
            <div class="modal-footer">
                <div  class="container-envio-mensaje">
                    <input type="text" placeholder="Escribe un mensaje" class="form-control textarea-comentario">
                    <button type="button" class="btn input-enviar-comentario btn-ligh" data-mdb-dismiss="modal">
                        Enviar
                    </button>
                </div>
                
           </div>
        </div>
    </div>
</div>