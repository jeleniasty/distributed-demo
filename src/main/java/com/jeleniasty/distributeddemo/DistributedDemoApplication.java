package com.jeleniasty.distributeddemo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class DistributedDemoApplication {

    public static void main(String[] args) {
        SpringApplication.run(DistributedDemoApplication.class, args);
    }

}
