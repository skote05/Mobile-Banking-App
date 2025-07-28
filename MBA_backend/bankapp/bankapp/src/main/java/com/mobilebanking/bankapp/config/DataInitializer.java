package com.mobilebanking.bankapp.config;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.mobilebanking.bankapp.model.User;
import com.mobilebanking.bankapp.repository.UserRepository;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        // Check if test user already exists
        if (userRepository.findByEmail("test@example.com") == null) {
            User testUser = new User();
            testUser.setName("Test User");
            testUser.setEmail("test@example.com");
            testUser.setPassword(passwordEncoder.encode("Password123"));
            testUser.setContactNumber("1234567890");
            testUser.setAddress("Test Address");
            testUser.setDob(new Date());
            
            userRepository.save(testUser);
            System.out.println("Test user created: test@example.com / Password123");
        }
    }
} 