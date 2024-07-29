package com.ssafy.ptpt;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;


//@SpringBootApplication(exclude = SecurityAutoConfiguration.class)	//임시로 스프링 시큐리티 비활성화
@SpringBootApplication
@EntityScan(basePackages = "com.ssafy.ptpt.db.entity")
public class PtptApplication {

	public static void main(String[] args) {
		SpringApplication.run(PtptApplication.class, args);
	}

}
