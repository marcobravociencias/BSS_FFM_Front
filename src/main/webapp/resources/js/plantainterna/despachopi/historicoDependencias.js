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
                if(i% 6 === 0){
                   $scope.putpixel(x, y,clasedot);
                }
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
                if(i% 6 === 0){
                   $scope.putpixel(x, y,clasedot);
                }
            }
        }
    }

    $scope.putpixel= function(mx,my,clasedot) {
        $("#contenedor").append("<b class='dotdependenciahov"+clasedot+" dot-dependencia' style='left:"+mx+"px;top:"+my+"px'>.</b>");
    }

    $scope.putpixeldireccionactividad= function(mx,my,claseactividad) {
        $("#contenedor").append("<span class='direccionactividad direccionactividad"+claseactividad+" fa fa-arrow-right' style='left:"+mx+"px;top:"+my+"px'></span>");
    }
    $scope.pintarLineasHistorico=function(historico){
        $(".dot-dependencia").remove()
        

        let primerPuntoPrimerLinea=  { x :  posicactividadinici.left  + widthinicioactivi ,y: posicactividadinici.top }
        let segundoPuntoPrimerLinea= { x :  posicactividadinici.left  + widthinicioactivi +borderradiudactiviy+10,y: posicactividadinici.top }

        $scope.draw_line(  primerPuntoPrimerLinea.x  , primerPuntoPrimerLinea.y,
                    segundoPuntoPrimerLinea.x , segundoPuntoPrimerLinea.y, tareas[i].idorigen )

        
         
    }

}