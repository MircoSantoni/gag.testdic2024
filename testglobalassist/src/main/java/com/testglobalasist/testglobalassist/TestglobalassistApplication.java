package com.testglobalasist.testglobalassist;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import io.github.cdimascio.dotenv.Dotenv;

@SpringBootApplication
public class TestglobalassistApplication {

	public static void main(String[] args) {
		
		Dotenv dotenv = Dotenv.load();
		dotenv.entries().forEach(entry -> System.setProperty(entry.getKey(), entry.getValue()));
		System.setProperty("BBDD_URL", dotenv.get("BBDD_URL"));
        System.setProperty("BBDD_USERNAME", dotenv.get("BBDD_USERNAME"));
        System.setProperty("BBDD_PASSWORD", dotenv.get("BBDD_PASSWORD"));
		SpringApplication.run(TestglobalassistApplication.class, args);
	}

}
