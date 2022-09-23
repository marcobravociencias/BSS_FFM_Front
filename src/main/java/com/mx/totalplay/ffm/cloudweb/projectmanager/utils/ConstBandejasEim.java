package com.mx.totalplay.ffm.cloudweb.projectmanager.utils;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import lombok.Data;

@Data
@Component
class ConstBandejasEim {
	@Value("${consultaBandejaSinEimApi}")
    private String consultaBandejaSinEimApi;
}
