package com.example.Ticketingsystem.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // Allow cross-origin requests from the frontend
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:3000")  // Frontend origin
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")  // Allowed methods
                .allowedHeaders("*")  // Allow any headers
                .allowCredentials(true);  // Allow credentials

    }
}
