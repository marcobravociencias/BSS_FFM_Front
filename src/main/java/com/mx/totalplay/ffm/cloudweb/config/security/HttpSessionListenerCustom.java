package com.mx.totalplay.ffm.cloudweb.config.security;

import com.mx.totalplay.ffm.cloudweb.utilerias.controller.GenericController;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.LoginResult;
import com.mx.totalplay.ffm.cloudweb.utilerias.utils.ConstantesGeneric;
import com.mx.totalplay.ffm.cloudweb.utilerias.utils.UtileriaGeneral;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;

import javax.servlet.http.HttpSession;
import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;

@Configuration
public class HttpSessionListenerCustom implements HttpSessionListener  {
    private  final Logger logger = LogManager.getLogger(GenericController.class.getName());
    private final ConstantesGeneric constantesGeneric;
    private final UtileriaGeneral utilerias;

    @Autowired
    public HttpSessionListenerCustom(ConstantesGeneric constantesGeneric, UtileriaGeneral utilerias) {
        this.constantesGeneric = constantesGeneric;
        this.utilerias = utilerias;
    }

    @Override
    public void sessionCreated(HttpSessionEvent event) {
        logger.info("####(( agregando intervalo ))))######## #");
        event.getSession().setMaxInactiveInterval(800000);
        event.getSession().setAttribute("versionDepl", constantesGeneric.getVersionDeploy());
    }

  public void sessionDestroyed(HttpSessionEvent arg0) {
        HttpSession httpSession = arg0.getSession();
        if (httpSession != null) {
             logger.info("!!!!!-----Se destruye la sesion---");
             try {
                 LoginResult principalDetail=utilerias.obtenerObjetoPrincipal();
                 String numEmpleado = (String) principalDetail.getUsuario();
                 logger.info("##########3---destruyecti"+numEmpleado);
                 arg0.getSession().getServletContext().removeAttribute(principalDetail.getUsuario());
                 arg0.getSession().removeAttribute("versionDepl");
             }catch(NullPointerException exception){
                 logger.info("#Destruyendo sesion exception");
             }

        }
    }

}
