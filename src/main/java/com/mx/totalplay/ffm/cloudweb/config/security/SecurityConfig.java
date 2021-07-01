package com.mx.totalplay.ffm.cloudweb.config.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.access.AccessDecisionManager;
import org.springframework.security.config.annotation.ObjectPostProcessor;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.access.intercept.FilterInvocationSecurityMetadataSource;
import org.springframework.security.web.access.intercept.FilterSecurityInterceptor;


@Configuration
@EnableWebSecurity
@ComponentScan("com.totalplay.ffm.config.security")
public class SecurityConfig extends WebSecurityConfigurerAdapter  {
    @Autowired
    SecurityCustomAuthenticationProvider customAuthProvider;
	
	@Autowired
	public void configureGlobal(AuthenticationManagerBuilder authenticationMgr)throws Exception {
			authenticationMgr.authenticationProvider(customAuthProvider);
	}
	
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		
			
		/*
			http.authorizeRequests()
			.antMatchers("/")
				.permitAll()		
			.antMatchers("/loginPage")
				.permitAll()	
            .anyRequest().authenticated() 
			.and()
				.formLogin()
					.loginPage("/loginPage")
					.defaultSuccessUrl("/homePage")
					.failureUrl("/loginPage?error")
					.usernameParameter("username").passwordParameter("password")				
			.and()
				.logout()
					.logoutSuccessUrl("/loginPage?logout")
			.and().csrf().disable().cors(); 
			*/
		http.
				sessionManagement().
				sessionCreationPolicy(SessionCreationPolicy.ALWAYS).and()
        	.authorizeRequests()
        	.antMatchers("/", "/resources/**", "/css", "/js/**")
        		.permitAll()		
        	.antMatchers("/loginPage")
        		.permitAll()	
        	.anyRequest().authenticated().withObjectPostProcessor(new ObjectPostProcessor<FilterSecurityInterceptor>() {
        		public <O extends FilterSecurityInterceptor> O postProcess(
                    O fsi) {
        				fsi.setSecurityMetadataSource(mySecurityMetadataSource());
        				fsi.setAccessDecisionManager(myAccessDecisionManager());
        				return fsi;
        			}
        	}).and()
        		.formLogin()
        			.loginPage("/loginPage")
        			.defaultSuccessUrl("/homePage")
        			.failureUrl("/loginPage?error")
        			.usernameParameter("username").passwordParameter("password")				
        	.and()
        		.logout()
        			.logoutSuccessUrl("/loginPage?logout")
        	.and().exceptionHandling().accessDeniedPage("/error_403")
        	.and().csrf().disable().cors(); 
		
	}
	
	@Bean
	 public PasswordEncoder passwordEncoder() {
	    return new BCryptPasswordEncoder();
	 }
	 
	 
	@Bean
	public FilterInvocationSecurityMetadataSource mySecurityMetadataSource() {
	 MyFilterInvocationSecurityMeatadataSource securityMetadataSource = new MyFilterInvocationSecurityMeatadataSource();
	    return securityMetadataSource;
	}
	
	@Bean
	public AccessDecisionManager myAccessDecisionManager() {
	    return new MyAccessDecisionManager();
	}
	
	@Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring().antMatchers("/resources/**");
    }
}
