<div class="row" style="margin: 0;">
    <div class="col-2" style="margin-top: 1em; margin-left: 1em; margin-left: 0; padding-right: 0;">
        <div class="input-group input-group-sm content-seach-group  ">
            <input type="text" id="input-element-bsq-general" class="form-control form-control-sm buscar-input-operario" placeholder="Buscar sitio">
            <span class="search-icon-operario-busq fa fa-search" id="inputGroup-sizing-sm"></span>
        </div>
    </div>
</div><br>
<div class="row content-busqueda-general">
    
        <div class="col-2">
            <div class="element-busqueda-title" id="contentCuentaFactura">
                <div class="iconsf-container">
                    <img class="img-oportunidad" src="./resources/img/plantainterna/iconossf/cuentafactura.png" alt="">
                </div>     
                <div class="textcontainer-header">
                    <span class="text-title-elementoh">CUENTA FACTURA</span>
                    <span class="text-title-elementohcantidad" id="totalCuentaFactura"> 0 </span>
                </div>
            </div>
            <div class="element-busqueda-title" id="contentOS">
                <div class="iconsf-container">
                    <img class="img-os" src="./resources/img/plantainterna/iconossf/cuenta.png" alt="">
                </div>     
                <div class="textcontainer-header">
                    <span class="text-title-elementoh">OS</span>
                    <span class="text-title-elementohcantidad" id="totalOs"> 0</span>
                </div>
            </div>
            <div class="element-busqueda-title" id="contentCSP">
                <div class="iconsf-container">
                    <img class="img-csp" src="./resources/img/plantainterna/iconossf/csp.png" alt="">
                </div>     
                <div class="textcontainer-header">
                    <span class="text-title-elementoh">COT SITIOS PLAN</span>
                    <span class="text-title-elementohcantidad" id="totalCSP">0</span>
                </div>
           </div>
        </div>
        <div class="col-10">
            <div class="contentTableBsqGeneral" id="datos-tablas">
                <div class="wraper_table contentInfoTableBsqGeneral" id="container_no_results">
                    <div class="col-12"><br>
                        <div class=" text-center">
                            <img src="./resources/img/plantainterna/iconossf/no-results.png" alt="">
                            <br>
                            <span class="span-no-result">No se encontraron resultados</span>
                        </div>
                    </div>
                </div>
                <div class="wraper_table contentInfoTableBsqGeneral" id="container-cuenta-factura-bsq-general" style="display:none">
                    <div class="col-12"><br>
                        <center><h3 id="text_header_bsq_general">Informaci&oacute;n cuenta factura</h3></center>
                    </div>
                    <div class="col-12">
                        <div class="content-fluid">
                            <jsp:include page="./infoTableBsqGeneral.jsp"></jsp:include>
                        </div>
                    </div>
                </div>
                <div class="wraper_table contentInfoTableBsqGeneral" id="container-os-bsq-general" style="display:none">
                    <div class="col-12"><br>
                        <center><h3 id="text_header_bsq_general">Informaci&oacute;n OS</h3></center>
                    </div>
                    <div class="col-12">
                        <div class="content-fluid">
                            <jsp:include page="./infoTableOS.jsp"></jsp:include>
                        </div>
                    </div>
                </div>
                <div class="wraper_table contentInfoTableBsqGeneral" id="container-csp-bsq-general" style="display:none">
                    <div class="col-12"><br>
                        <center><h3 id="text_header_bsq_general">Informaci&oacute;n cot sitio plan</h3></center>
                    </div>
                    <div class="col-12">
                        <div class="content-fluid">
                            <jsp:include page="./infoTableCotSitoPlan.jsp"></jsp:include>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    
</div>