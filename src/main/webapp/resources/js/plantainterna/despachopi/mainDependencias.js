app.misProyectosDependencias=function($scope){

    $scope.draw_line = function(x1, y1, x2, y2,clasedot)  {

        // Iterators, counters required by algorithm
        let x,y,dx,dy,dx1,dy1,px,py,xe,ye,i;

        // Calculate line deltas
        dx=x2 - x1;
        dy=y2 - y1;

        // Create a positive copy of deltas (makes iterating easier)
        dx1 = Math.abs(dx);
        dy1 = Math.abs(dy);

        // Calculate error intervals for both axis
        px = 2 * dy1 - dx1;
        py = 2 * dx1 - dy1;

        ///The line is X-axis dominant
        if (dy1 <= dx1) {
            // Line is drawn left to right
            if (dx >= 0) {
                x = x1; y = y1; xe = x2;
            } else { // Line is drawn right to left (swap ends)
                x = x2; y = y2; xe = x1;
            }
           $scope.putpixel(x, y,clasedot); // Draw first pixel
            // Rasterize the line
            for (i = 0; x < xe; i++) {
                x = x + 1;
                // Deal with octants...
                if (px < 0) {
                    px = px + 2 * dy1;
                } else {
                    if ((dx < 0 && dy < 0) || (dx > 0 && dy > 0)) {
                        y = y + 1;
                    } else {
                        y = y - 1;
                    }
                    px = px + 2 * (dy1 - dx1);
                }
                // Draw pixel from line span at
                // currently rasterized position
                   $scope.putpixel(x, y,clasedot);
            }
        } else { // The line is Y-axis dominant
        // Line is drawn bottom to top
            if (dy >= 0) {
                x = x1; y = y1; ye = y2;
            } else { // Line is drawn top to bottom
                x = x2; y = y2; ye = y1;
            }
           $scope.putpixel(x, y,clasedot); // Draw first pixel
            // Rasterize the line
            for (i = 0; y < ye; i++) {
                y = y + 1;
                // Deal with octants...
                if (py <= 0) {
                    py = py + 2 * dx1;
                } else {
                    if ((dx < 0 && dy<0) || (dx > 0 && dy > 0)) {
                        x = x + 1;
                    } else {
                        x = x - 1;
                    }
                    py = py + 2 * (dx1 - dy1);
                }
                // Draw pixel from line span at
                // currently rasterized position
                   $scope.putpixel(x, y,clasedot);
            }
        }
    }

    $scope.pintarDependenciasHistorico = function() {
        var couth = 0;
        var contador = 0;
        var height = 0;
        angular.forEach($scope.historialOrdenTrabajo,function(element,index){
            couth++;
            contador++;
            if (contador !== $scope.historialOrdenTrabajo.length) {
                if (couth === 1) {
                    height = $("#content-historial-"+index).height();
                    let posicionOriginal = $("#content-historial-"+index).position();
                    posicionOriginal.top += 70;
                    posicionOriginal.left += (2 + $("#content-historial-"+index).width());
                    if (index === 0) {
                        $("#content-principal-historial").append("<span class='direccionactividad dot-dependencia content-historial-" + index + " fa fa-arrow-left' style='left: " + posicionOriginal.left + "px;top: " + (posicionOriginal.top + 10) + "px'></span>");
                    } else {
                        $("#content-principal-historial").append("<b class='content-historial-" + index + " dot-dependencia' style='left:" + (posicionOriginal.left + 5) + "px;top:" + posicionOriginal.top + "px'>.</b>");
                    }
                    $scope.pintarPunto(posicionOriginal, index);
                }
                if (couth === 2) {
                    if ($("#content-historial-"+index).height() > height) {
                        height = $("#content-historial-"+index).height();
                    }
                    let posicionOriginal = $("#content-historial-"+index).position();
                    posicionOriginal.top += 70;
                    posicionOriginal.left += (2 + $("#content-historial-"+index).width());
                    $("#content-principal-historial").append("<b class='content-historial-" + index + " dot-dependencia' style='left:" + (posicionOriginal.left + 5) + "px;top:" + posicionOriginal.top + "px'>.</b>");
                    $scope.pintarPunto(posicionOriginal, index);
                }
                if(couth === 3) {
                    if ($("#content-historial-"+index).height() > height) {
                        height = $("#content-historial-"+index).height();
                    }
                    couth = 0;
                    let posicionOriginal = $("#content-historial-"+index).position();
                    height += posicionOriginal.top;
                    posicionOriginal.top += 70;
                    posicionOriginal.left += (2 + $("#content-historial-"+index).width());
                    $("#content-principal-historial").append("<b class='content-historial-" + index + " dot-dependencia' style='left:" + (posicionOriginal.left + 5) + "px;top:" + posicionOriginal.top + "px'>.</b>");
                    $scope.pintarPunto(posicionOriginal, index);
                    /*
                    for (let i = 0; i < 8; i++) {
                        posicionOriginal.top += 10;
                        $scope.pintarPunto(posicionOriginal, index);
                    }
                    */
                    
                    height -=25;
                    do {
                        posicionOriginal.top += 10;
                        $scope.pintarPunto(posicionOriginal, index);
                    } while (height > posicionOriginal.top);
                    
                    for (let i = 0; i < 95; i++) {
                        posicionOriginal.left -= 10;
                        $scope.pintarPunto(posicionOriginal, index);
                    }
                    for (let i = 0; i < 9; i++) {
                        posicionOriginal.top += 10;
                        $scope.pintarPunto(posicionOriginal, index);
                    }
                    for (let i = 0; i < 1; i++) {
                        posicionOriginal.left += 10;
                        $scope.pintarPunto(posicionOriginal, index);
                    }
                }
            }
        });

    }

    $scope.pintarPunto = function(posicionOriginal, index) {
        $("#content-principal-historial").append("<b class='content-historial-" + index + " dot-dependencia' style='left:" + (posicionOriginal.left + 15) + "px;top:" + posicionOriginal.top + "px'>.</b>");
    }

    $scope.putpixel= function(mx,my,clasedot) {
        $("#v-tabs-consulta-historico").append("<b class='dotdependenciahov"+clasedot+" dot-dependencia' style='left:"+mx+"px;top:"+my+"px'>.</b>");
    }

    $scope.putpixeldireccionactividad= function(mx,my,claseactividad) {
        $("#v-tabs-consulta-historico").append("<span class='direccionactividad direccionactividad"+claseactividad+" fa fa-arrow-right' style='left:"+mx+"px;top:"+my+"px'></span>");
    }
    $scope.pintarDependencias=function(actividades){
        $(".dot-dependencia").remove()
        let tareas=[]
        let actividadescopy=angular.copy(actividades)
        angular.forEach(actividadescopy,function(element,index){
            if( element.Id_dependencia){
                let tempactividadep= $scope.listaActividades.filter(function(e){ return e.Id_actividad==element.Id_dependencia} )[0]
                if($scope.fechasPlaneadas) {
                
                   tareas.push(  { id:'content-historial-'+index,
                        dependencia:'content-historial-'+index+1 ,
                        idorigen:element.Id_actividad ,
                        iddepen:element.Id_dependencia ,
                        origenfechainicio:tempactividadep.Fecha_inicio_planeada,
                        origenfechafin:tempactividadep.Fecha_fin_real,
                        dependenciafechainicio:element.Fecha_inicio_planeada,
                        dependenciafechafin:element.Fecha_fin_real
                    } )
                }else{
                    tareas.push(  { id:'content-historial-'+element.Id_actividad,
                        dependencia:'content-historial-'+element.Id_dependencia ,
                        idorigen:element.Id_actividad ,
                        iddepen:element.Id_dependencia ,
                        origenfechainicio:tempactividadep.Fecha_inicio_real,
                        origenfechafin:tempactividadep.Fecha_fin_real,
                        dependenciafechainicio:element.Fecha_inicio_real,
                        dependenciafechafin:element.Fecha_fin_real
                     } )
                }
                
            }
        })  
    
        for(i = 0 ; i < tareas.length ;i ++){

            if( $( "."+tareas[i].id ).length <=0 || $( "."+tareas[i].dependencia ).length <=0  )
                continue;
            

            let posicactividadfin={left: $( "."+tareas[i].id ).position().left  +20,top:$( ".topactividades"+tareas[i].idorigen ).position().top }         
            let posicactividadinici={left: $( "."+tareas[i].dependencia ).position().left +20 , top:$( ".topactividades"+tareas[i].iddepen ).position().top } 
            
            let widthfinactivi=$( "."+tareas[i].id ).width();     
            let widthinicioactivi =$( "."+tareas[i].dependencia ).width();     

            
            //if( posicactividadfin.top <= posicactividadinici.top ){
                if( posicactividadfin.top <= posicactividadinici.top ){ 
                    console.log("#111")

                    if( posicactividadinici.left ==  posicactividadfin.left){
                        let borderradiudactiviy=8

                        let primerPuntoPrimerLinea=  { x :  posicactividadinici.left  + widthinicioactivi ,y: posicactividadinici.top }
                        let segundoPuntoPrimerLinea= { x :  posicactividadinici.left  + widthinicioactivi +borderradiudactiviy+10,y: posicactividadinici.top }

                        $scope.draw_line(  primerPuntoPrimerLinea.x  , primerPuntoPrimerLinea.y,
                                    segundoPuntoPrimerLinea.x , segundoPuntoPrimerLinea.y, tareas[i].idorigen )

                        let primerPuntoSegundaLinea= { x :  posicactividadinici.left  + widthinicioactivi +borderradiudactiviy+10,y: posicactividadinici.top  }
                        let segundoPuntoSegundaLinea={ x :  posicactividadinici.left  + widthinicioactivi +borderradiudactiviy+10,y: posicactividadinici.top +15 }
    
                        $scope.draw_line(  primerPuntoSegundaLinea.x  , primerPuntoSegundaLinea.y,
                                           segundoPuntoSegundaLinea.x , segundoPuntoSegundaLinea.y, tareas[i].idorigen )                            


                        let primerPuntoTercerLinea= { x :  posicactividadinici.left  + widthinicioactivi +borderradiudactiviy+10,y: posicactividadinici.top +15    }
                        let segundoPuntoTercerLinea={ x :  posicactividadfin.left  -25,y: posicactividadinici.top +15 }
    
                        $scope.draw_line(  primerPuntoTercerLinea.x  , primerPuntoTercerLinea.y,
                                           segundoPuntoTercerLinea.x , segundoPuntoTercerLinea.y , tareas[i].idorigen )   
                       
                        let primerPuntoCuartaLinea= { x :  posicactividadfin.left  -25,y: posicactividadinici.top +15     }
                        let segundoPuntoCuartaLinea={ x :  posicactividadfin.left  -25,y: posicactividadfin.top }
    
                        $scope.draw_line(  primerPuntoCuartaLinea.x  , primerPuntoCuartaLinea.y,
                                            segundoPuntoCuartaLinea.x , segundoPuntoCuartaLinea.y , tareas[i].idorigen )  
                     
                                                       
                        let primerPuntoQuintaLinea= {  x :  posicactividadfin.left  -25,y: posicactividadfin.top   }
                        let segundoPuntoQuintaLinea={  x :  posicactividadfin.left  -borderradiudactiviy,y: posicactividadfin.top  }
    
                        $scope.draw_line(  primerPuntoQuintaLinea.x  , primerPuntoQuintaLinea.y,
                                            segundoPuntoQuintaLinea.x -borderradiudactiviy, segundoPuntoQuintaLinea.y , tareas[i].idorigen )      
                    }else  if(  posicactividadinici.left <  posicactividadfin.left  ){
                        let borderradiudactiviy=8
                        let leftoutside=22;

                
              
                        //VALIDACION PARA SABER SI PINTA LA LINEA CON 4 PUNTOS 
                        //SI ES TRUE PINTA LA LINEA CON UN MARGEN HACIA LA IZQUIERDA DE LA DE FIN
                        if(tareas[i].origenfechafin.getTime() === tareas[i].dependenciafechainicio.getTime() ){
                                    
                            let primerPuntoPrimerLinea= { x :  posicactividadinici.left +widthinicioactivi,      y: posicactividadinici.top }
                            let segundoPuntoPrimerLinea={ x :  posicactividadinici.left + 10 +widthinicioactivi, y: posicactividadinici.top }
                            $scope.draw_line(  primerPuntoPrimerLinea.x  , primerPuntoPrimerLinea.y,
                                        segundoPuntoPrimerLinea.x , segundoPuntoPrimerLinea.y, tareas[i].idorigen )
                            
                            let primerPuntoSegundaLinea ={ x :  posicactividadinici.left + 10 +widthinicioactivi, y: posicactividadinici.top }
                            let segundoPuntoSegundaLinea={ x :  posicactividadinici.left + 10 +widthinicioactivi, y: posicactividadinici.top - 15}
                            $scope.draw_line(  primerPuntoSegundaLinea.x  , primerPuntoSegundaLinea.y,
                                        segundoPuntoSegundaLinea.x , segundoPuntoSegundaLinea.y ,tareas[i].idorigen  )  
    
    
                            let primerPuntoTercerLinea= { x :  posicactividadinici.left + 10 +widthinicioactivi, y: posicactividadinici.top - 15 }
                            let segundoPuntoTercerLinea={x :  posicactividadinici.left - 40 + widthinicioactivi, y: posicactividadinici.top - 15  }                 
                            $scope.draw_line(  primerPuntoTercerLinea.x  , primerPuntoTercerLinea.y,
                                               segundoPuntoTercerLinea.x , segundoPuntoTercerLinea.y, tareas[i].idorigen )   
                                  
                            let primerPuntoCuartaLinea= { x :  posicactividadinici.left - 40 + widthinicioactivi, y: posicactividadinici.top - 15  }
                            let segundoPuntoCuartLinea= { x :  posicactividadinici.left - 40 + widthinicioactivi, y: posicactividadfin.top   }                 
                            $scope.draw_line(  primerPuntoCuartaLinea.x  , primerPuntoCuartaLinea.y,
                                               segundoPuntoCuartLinea.x , segundoPuntoCuartLinea.y, tareas[i].idorigen )   
        
                            let primerPuntoQuintaLinea= { x :  posicactividadinici.left - 40 + widthinicioactivi, y: posicactividadfin.top  }  
                            let segundoPuntoQuintaLinea={ x :  posicactividadfin.left,                            y: posicactividadfin.top  }                                
                            $scope.draw_line(  primerPuntoQuintaLinea.x  , primerPuntoQuintaLinea.y,
                                               segundoPuntoQuintaLinea.x -borderradiudactiviy , segundoPuntoQuintaLinea.y, tareas[i].idorigen )   
                        }else if( tareas[i].origenfechafin.getTime() > tareas[i].dependenciafechainicio.getTime()  ){
                            let primerPuntoPrimerLinea= { x :  posicactividadinici.left +widthinicioactivi,      y: posicactividadinici.top }
                            let segundoPuntoPrimerLinea={ x :  posicactividadinici.left + 10 +widthinicioactivi, y: posicactividadinici.top }
                            $scope.draw_line(  primerPuntoPrimerLinea.x  , primerPuntoPrimerLinea.y,
                                        segundoPuntoPrimerLinea.x , segundoPuntoPrimerLinea.y, tareas[i].idorigen )
                            
                            let primerPuntoSegundaLinea ={ x :  posicactividadinici.left + 10 +widthinicioactivi, y: posicactividadinici.top }
                            let segundoPuntoSegundaLinea={ x :  posicactividadinici.left + 10 +widthinicioactivi, y: posicactividadinici.top - 15}
                            $scope.draw_line(  primerPuntoSegundaLinea.x  , primerPuntoSegundaLinea.y,
                                        segundoPuntoSegundaLinea.x , segundoPuntoSegundaLinea.y ,tareas[i].idorigen  )  
                                
                            let primerPuntoTercerLinea= { x : posicactividadinici.left + 10 + widthinicioactivi, y: posicactividadinici.top - 15  }
                            let segundoPuntoTercerLinea={ x : posicactividadfin.left - 15                      , y: posicactividadinici.top - 15  }                 
                            $scope.draw_line(  primerPuntoTercerLinea.x  , primerPuntoTercerLinea.y,
                                               segundoPuntoTercerLinea.x , segundoPuntoTercerLinea.y, tareas[i].idorigen )   
                                  
                            let primerPuntoCuartaLinea= { x : posicactividadfin.left - 15                      , y: posicactividadinici.top - 15  }
                            let segundoPuntoCuartLinea= { x : posicactividadfin.left - 15                      , y: posicactividadfin.top         }                 
                            $scope.draw_line(  primerPuntoCuartaLinea.x  , primerPuntoCuartaLinea.y,
                                               segundoPuntoCuartLinea.x , segundoPuntoCuartLinea.y, tareas[i].idorigen )   
        
                            let primerPuntoQuintaLinea= { x : posicactividadfin.left - 15                      , y: posicactividadfin.top    }  
                            let segundoPuntoQuintaLinea={ x : posicactividadfin.left -borderradiudactiviy,       y: posicactividadfin.top  }                                
                            $scope.draw_line(  primerPuntoQuintaLinea.x  , primerPuntoQuintaLinea.y,
                                               segundoPuntoQuintaLinea.x , segundoPuntoQuintaLinea.y, tareas[i].idorigen )   

                        }else  if( tareas[i].origenfechafin.getTime() < tareas[i].dependenciafechainicio.getTime()  ){
    
                            let primerPuntoPrimerLinea= { x :  posicactividadinici.left + widthinicioactivi,        y: posicactividadinici.top }
                            let segundoPuntoPrimerLinea={ x :  posicactividadinici.left + widthinicioactivi + 15,  y: posicactividadinici.top }
                            $scope.draw_line(  primerPuntoPrimerLinea.x  , primerPuntoPrimerLinea.y,
                                               segundoPuntoPrimerLinea.x , segundoPuntoPrimerLinea.y, tareas[i].idorigen )
                            
                            let primerPuntoSegundaLinea ={ x :  posicactividadinici.left + widthinicioactivi + 15,  y: posicactividadinici.top }
                            let segundoPuntoSegundaLinea={ x :  posicactividadinici.left + widthinicioactivi + 15,  y: posicactividadfin.top }
                            $scope.draw_line(  primerPuntoSegundaLinea.x  , primerPuntoSegundaLinea.y,
                                        segundoPuntoSegundaLinea.x , segundoPuntoSegundaLinea.y ,tareas[i].idorigen  )  
                                
                            let primerPuntoTercerLinea= { x :  posicactividadinici.left + widthinicioactivi + 15,  y: posicactividadfin.top  }
                            let segundoPuntoTercerLinea={ x :  posicactividadfin.left -borderradiudactiviy,  y: posicactividadfin.top  }                 
                            $scope.draw_line(  primerPuntoTercerLinea.x  , primerPuntoTercerLinea.y,
                                               segundoPuntoTercerLinea.x , segundoPuntoTercerLinea.y, tareas[i].idorigen )   
                                  
                        }                     
   
                       
                    }else if( posicactividadinici.left >  posicactividadfin.left ){
                        console.log("DERECHA IKZQUIERDAsaaa")
                        let borderradiudactiviy=8
                        let leftoutside=22;

                        let primerPuntoPrimerLinea=  { x :  posicactividadinici.left  + widthinicioactivi ,y: posicactividadinici.top }
                        let segundoPuntoPrimerLinea= { x :  posicactividadinici.left  + widthinicioactivi +borderradiudactiviy+10,y: posicactividadinici.top }

                        $scope.draw_line(  primerPuntoPrimerLinea.x  , primerPuntoPrimerLinea.y,
                                    segundoPuntoPrimerLinea.x , segundoPuntoPrimerLinea.y, tareas[i].idorigen )

                        let primerPuntoSegundaLinea= { x :  posicactividadinici.left  + widthinicioactivi +borderradiudactiviy+10,y: posicactividadinici.top  }
                        let segundoPuntoSegundaLinea={ x :  posicactividadinici.left  + widthinicioactivi +borderradiudactiviy+10,y: posicactividadinici.top +15 }
    
                        $scope.draw_line(  primerPuntoSegundaLinea.x  , primerPuntoSegundaLinea.y,
                                           segundoPuntoSegundaLinea.x , segundoPuntoSegundaLinea.y, tareas[i].idorigen )                            


                        let primerPuntoTercerLinea= { x :  posicactividadinici.left  + widthinicioactivi +borderradiudactiviy+10,y: posicactividadinici.top +15    }
                        let segundoPuntoTercerLinea={ x :  posicactividadfin.left  -25,y: posicactividadinici.top +15 }
    
                        $scope.draw_line(  primerPuntoTercerLinea.x  , primerPuntoTercerLinea.y,
                                           segundoPuntoTercerLinea.x , segundoPuntoTercerLinea.y , tareas[i].idorigen )   
                       
                        let primerPuntoCuartaLinea= { x :  posicactividadfin.left  -25,y: posicactividadinici.top +15     }
                        let segundoPuntoCuartaLinea={ x :  posicactividadfin.left  -25,y: posicactividadfin.top }
    
                        $scope.draw_line(  primerPuntoCuartaLinea.x  , primerPuntoCuartaLinea.y,
                                            segundoPuntoCuartaLinea.x , segundoPuntoCuartaLinea.y , tareas[i].idorigen )  
                     
                                                       
                        let primerPuntoQuintaLinea= {  x :  posicactividadfin.left  -25,y: posicactividadfin.top   }
                        let segundoPuntoQuintaLinea={  x :  posicactividadfin.left  -borderradiudactiviy,y: posicactividadfin.top  }
    
                        $scope.draw_line(  primerPuntoQuintaLinea.x  , primerPuntoQuintaLinea.y,
                                            segundoPuntoQuintaLinea.x -borderradiudactiviy, segundoPuntoQuintaLinea.y , tareas[i].idorigen )  
                            /**    **/
                    }

                    $scope.putpixeldireccionactividad( posicactividadfin.left -12 ,  posicactividadfin.top+11 ,tareas[i].iddepen )

                }else{
                    $scope.putpixeldireccionactividad( posicactividadfin.left -12 ,  posicactividadfin.top+11 ,tareas[i].iddepen )

                    if( posicactividadinici.left ==  posicactividadfin.left){
                        let borderradiudactiviy=5

                        let primerPuntoPrimerLinea= { x :  posicactividadinici.left +widthinicioactivi,      y: posicactividadinici.top }
                        let segundoPuntoPrimerLinea={ x :  posicactividadinici.left + 10 +widthinicioactivi, y: posicactividadinici.top }
                        $scope.draw_line(  primerPuntoPrimerLinea.x  , primerPuntoPrimerLinea.y,
                                    segundoPuntoPrimerLinea.x , segundoPuntoPrimerLinea.y, tareas[i].idorigen )
                        
                        let primerPuntoSegundaLinea ={ x :  posicactividadinici.left + 10 +widthinicioactivi, y: posicactividadinici.top }
                        let segundoPuntoSegundaLinea={ x :  posicactividadinici.left + 10 +widthinicioactivi, y: posicactividadinici.top + 15}
                        $scope.draw_line(  primerPuntoSegundaLinea.x  , primerPuntoSegundaLinea.y,
                                    segundoPuntoSegundaLinea.x , segundoPuntoSegundaLinea.y ,tareas[i].idorigen  )  
                            
                        let primerPuntoTercerLinea= { x : posicactividadinici.left + 10 + widthinicioactivi, y: posicactividadinici.top + 15  }
                        let segundoPuntoTercerLinea={ x : posicactividadfin.left - 25                      , y: posicactividadinici.top + 15  }                 
                        $scope.draw_line(  primerPuntoTercerLinea.x  , primerPuntoTercerLinea.y,
                                           segundoPuntoTercerLinea.x , segundoPuntoTercerLinea.y, tareas[i].idorigen )   
                              
                        let primerPuntoCuartaLinea= { x : posicactividadfin.left - 25                      , y: posicactividadinici.top + 15  }
                        let segundoPuntoCuartLinea= { x : posicactividadfin.left - 25                      , y: posicactividadfin.top         }                 
                        $scope.draw_line(  primerPuntoCuartaLinea.x  , primerPuntoCuartaLinea.y,
                                           segundoPuntoCuartLinea.x , segundoPuntoCuartLinea.y, tareas[i].idorigen )   
    
                        let primerPuntoQuintaLinea= { x : posicactividadfin.left - 25                      , y: posicactividadfin.top    }  
                        let segundoPuntoQuintaLinea={ x : posicactividadfin.left-borderradiudactiviy,                            y: posicactividadfin.top  }                                
                        $scope.draw_line(  primerPuntoQuintaLinea.x  , primerPuntoQuintaLinea.y,
                                           segundoPuntoQuintaLinea.x , segundoPuntoQuintaLinea.y, tareas[i].idorigen )   /**   **/      
                            
                        
                        
                            
                    }else if(  posicactividadinici.left <  posicactividadfin.left ){

    
                        //VALIDACION PARA SABER SI PINTA LA LINEA CON 4 PUNTOS 
                        //SI ES TRUE PINTA LA LINEA CON UN MARGEN HACIA LA IZQUIERDA DE LA DE FIN
                        if(tareas[i].origenfechafin.getTime() === tareas[i].dependenciafechainicio.getTime() ){
                                    
                            let primerPuntoPrimerLinea= { x :  posicactividadinici.left +widthinicioactivi,      y: posicactividadinici.top }
                            let segundoPuntoPrimerLinea={ x :  posicactividadinici.left + 10 +widthinicioactivi, y: posicactividadinici.top }
                            $scope.draw_line(  primerPuntoPrimerLinea.x  , primerPuntoPrimerLinea.y,
                                        segundoPuntoPrimerLinea.x , segundoPuntoPrimerLinea.y, tareas[i].idorigen )
                            
                            let primerPuntoSegundaLinea ={ x :  posicactividadinici.left + 10 +widthinicioactivi, y: posicactividadinici.top }
                            let segundoPuntoSegundaLinea={ x :  posicactividadinici.left + 10 +widthinicioactivi, y: posicactividadinici.top + 15}
                            $scope.draw_line(  primerPuntoSegundaLinea.x  , primerPuntoSegundaLinea.y,
                                        segundoPuntoSegundaLinea.x , segundoPuntoSegundaLinea.y ,tareas[i].idorigen  )  
    
    
                            let primerPuntoTercerLinea= { x : posicactividadinici.left + 10 + widthinicioactivi, y: posicactividadinici.top + 15  }
                            let segundoPuntoTercerLinea={x :  posicactividadinici.left - 40 + widthinicioactivi, y: posicactividadinici.top + 15  }                 
                            $scope.draw_line(  primerPuntoTercerLinea.x  , primerPuntoTercerLinea.y,
                                               segundoPuntoTercerLinea.x , segundoPuntoTercerLinea.y, tareas[i].idorigen )   
                                  
                            let primerPuntoCuartaLinea= { x :  posicactividadinici.left - 40 + widthinicioactivi, y: posicactividadinici.top + 15  }
                            let segundoPuntoCuartLinea= { x :  posicactividadinici.left - 40 + widthinicioactivi, y: posicactividadfin.top   }                 
                            $scope.draw_line(  primerPuntoCuartaLinea.x  , primerPuntoCuartaLinea.y,
                                               segundoPuntoCuartLinea.x , segundoPuntoCuartLinea.y, tareas[i].idorigen )   
        
                            let primerPuntoQuintaLinea= { x :  posicactividadinici.left - 40 + widthinicioactivi, y: posicactividadfin.top  }  
                            let segundoPuntoQuintaLinea={ x :  posicactividadfin.left,                            y: posicactividadfin.top  }                                
                            $scope.draw_line(  primerPuntoQuintaLinea.x  , primerPuntoQuintaLinea.y,
                                               segundoPuntoQuintaLinea.x , segundoPuntoQuintaLinea.y, tareas[i].idorigen )   /**   **/
                        }else if( tareas[i].origenfechafin.getTime() > tareas[i].dependenciafechainicio.getTime()  ){
                            let primerPuntoPrimerLinea= { x :  posicactividadinici.left +widthinicioactivi,      y: posicactividadinici.top }
                            let segundoPuntoPrimerLinea={ x :  posicactividadinici.left + 10 +widthinicioactivi, y: posicactividadinici.top }
                            $scope.draw_line(  primerPuntoPrimerLinea.x  , primerPuntoPrimerLinea.y,
                                        segundoPuntoPrimerLinea.x , segundoPuntoPrimerLinea.y, tareas[i].idorigen )
                            
                            let primerPuntoSegundaLinea ={ x :  posicactividadinici.left + 10 +widthinicioactivi, y: posicactividadinici.top }
                            let segundoPuntoSegundaLinea={ x :  posicactividadinici.left + 10 +widthinicioactivi, y: posicactividadinici.top + 15}
                            $scope.draw_line(  primerPuntoSegundaLinea.x  , primerPuntoSegundaLinea.y,
                                        segundoPuntoSegundaLinea.x , segundoPuntoSegundaLinea.y ,tareas[i].idorigen  )  
                                
                            let primerPuntoTercerLinea= { x : posicactividadinici.left + 10 + widthinicioactivi, y: posicactividadinici.top + 15  }
                            let segundoPuntoTercerLinea={ x : posicactividadfin.left - 15                      , y: posicactividadinici.top + 15  }                 
                            $scope.draw_line(  primerPuntoTercerLinea.x  , primerPuntoTercerLinea.y,
                                               segundoPuntoTercerLinea.x , segundoPuntoTercerLinea.y, tareas[i].idorigen )   
                                  
                            let primerPuntoCuartaLinea= { x : posicactividadfin.left - 15                      , y: posicactividadinici.top + 15  }
                            let segundoPuntoCuartLinea= { x : posicactividadfin.left - 15                      , y: posicactividadfin.top         }                 
                            $scope.draw_line(  primerPuntoCuartaLinea.x  , primerPuntoCuartaLinea.y,
                                               segundoPuntoCuartLinea.x , segundoPuntoCuartLinea.y, tareas[i].idorigen )   
        
                            let primerPuntoQuintaLinea= { x : posicactividadfin.left - 15                      , y: posicactividadfin.top    }  
                            let segundoPuntoQuintaLinea={ x : posicactividadfin.left,                            y: posicactividadfin.top  }                                
                            $scope.draw_line(  primerPuntoQuintaLinea.x  , primerPuntoQuintaLinea.y,
                                               segundoPuntoQuintaLinea.x , segundoPuntoQuintaLinea.y, tareas[i].idorigen )   /**   **/ 

                        }else if( tareas[i].origenfechafin.getTime() < tareas[i].dependenciafechainicio.getTime()  ){
                            let borderradiudactiviy=5

                            let primerPuntoPrimerLinea= { x :  posicactividadinici.left + widthinicioactivi,        y: posicactividadinici.top }
                            let segundoPuntoPrimerLinea={ x :  posicactividadinici.left + widthinicioactivi + 15,  y: posicactividadinici.top }
                            $scope.draw_line(  primerPuntoPrimerLinea.x  , primerPuntoPrimerLinea.y,
                                               segundoPuntoPrimerLinea.x , segundoPuntoPrimerLinea.y, tareas[i].idorigen )
                            
                            let primerPuntoSegundaLinea ={ x :  posicactividadinici.left + widthinicioactivi + 15,  y: posicactividadinici.top }
                            let segundoPuntoSegundaLinea={ x :  posicactividadinici.left + widthinicioactivi + 15,  y: posicactividadfin.top }
                            $scope.draw_line(  primerPuntoSegundaLinea.x  , primerPuntoSegundaLinea.y,
                                        segundoPuntoSegundaLinea.x , segundoPuntoSegundaLinea.y ,tareas[i].idorigen  )  
                                
                            let primerPuntoTercerLinea= { x :  posicactividadinici.left + widthinicioactivi + 15,  y: posicactividadfin.top  }
                            let segundoPuntoTercerLinea={ x :  posicactividadfin.left -borderradiudactiviy,  y: posicactividadfin.top  }                 
                            $scope.draw_line(  primerPuntoTercerLinea.x  , primerPuntoTercerLinea.y,
                                               segundoPuntoTercerLinea.x , segundoPuntoTercerLinea.y, tareas[i].idorigen )   
                                  
                        }
              
    
                    }else if( posicactividadinici.left >  posicactividadfin.left ){
                        let borderradiudactiviy=5

                        let primerPuntoPrimerLinea= { x :  posicactividadinici.left +widthinicioactivi,      y: posicactividadinici.top }
                        let segundoPuntoPrimerLinea={ x :  posicactividadinici.left + 10 +widthinicioactivi, y: posicactividadinici.top }
                        $scope.draw_line(  primerPuntoPrimerLinea.x  , primerPuntoPrimerLinea.y,
                                    segundoPuntoPrimerLinea.x , segundoPuntoPrimerLinea.y, tareas[i].idorigen )
                        
                        let primerPuntoSegundaLinea ={ x :  posicactividadinici.left + 10 +widthinicioactivi, y: posicactividadinici.top }
                        let segundoPuntoSegundaLinea={ x :  posicactividadinici.left + 10 +widthinicioactivi, y: posicactividadinici.top + 15}
                        $scope.draw_line(  primerPuntoSegundaLinea.x  , primerPuntoSegundaLinea.y,
                                    segundoPuntoSegundaLinea.x , segundoPuntoSegundaLinea.y ,tareas[i].idorigen  )  
                            
                        let primerPuntoTercerLinea= { x : posicactividadinici.left + 10 + widthinicioactivi, y: posicactividadinici.top + 15  }
                        let segundoPuntoTercerLinea={ x : posicactividadfin.left - 25                      , y: posicactividadinici.top + 15  }                 
                        $scope.draw_line(  primerPuntoTercerLinea.x  , primerPuntoTercerLinea.y,
                                           segundoPuntoTercerLinea.x , segundoPuntoTercerLinea.y, tareas[i].idorigen )   
                              
                        let primerPuntoCuartaLinea= { x : posicactividadfin.left - 25                      , y: posicactividadinici.top + 15  }
                        let segundoPuntoCuartLinea= { x : posicactividadfin.left - 25                      , y: posicactividadfin.top         }                 
                        $scope.draw_line(  primerPuntoCuartaLinea.x  , primerPuntoCuartaLinea.y,
                                           segundoPuntoCuartLinea.x , segundoPuntoCuartLinea.y, tareas[i].idorigen )   
    
                        let primerPuntoQuintaLinea= { x : posicactividadfin.left - 25                      , y: posicactividadfin.top    }  
                        let segundoPuntoQuintaLinea={ x : posicactividadfin.left-borderradiudactiviy,                            y: posicactividadfin.top  }                                
                        $scope.draw_line(  primerPuntoQuintaLinea.x  , primerPuntoQuintaLinea.y,
                                           segundoPuntoQuintaLinea.x , segundoPuntoQuintaLinea.y, tareas[i].idorigen )   /**   **/ 
                                    
                    }else{                    
                    }
                }
        }
    }

}