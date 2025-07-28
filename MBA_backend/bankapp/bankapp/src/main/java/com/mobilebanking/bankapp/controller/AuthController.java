package com.mobilebanking.bankapp.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mobilebanking.bankapp.dto.LoginRequest;
import com.mobilebanking.bankapp.dto.SignupRequest;
import com.mobilebanking.bankapp.model.LoginResponse;
import com.mobilebanking.bankapp.service.AuthService;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
public class AuthController {
    @Autowired
    private AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody SignupRequest request) {
        try {
            // Manual validation
            Map<String, String> errors = validateSignupRequest(request);
            if (!errors.isEmpty()) {
                return ResponseEntity.badRequest().body(errors);
            }

            String result = authService.signup(
                    request.getName(),
                    request.getPassword(),
                    request.getEmail(),
                    request.getContactNumber(),
                    request.getAddress(),
                    request.getDob()
            );
            return ResponseEntity.ok(Map.of("message", result));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        try {
            // Manual validation
            Map<String, String> errors = validateLoginRequest(request);
            if (!errors.isEmpty()) {
                return ResponseEntity.badRequest().body(errors);
            }

            LoginResponse response = authService.login(request.getEmail(), request.getPassword());
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/health")
    public ResponseEntity<Map<String, String>> health() {
        return ResponseEntity.ok(Map.of("status", "UP", "message", "Auth service is running"));
    }

    private Map<String, String> validateSignupRequest(SignupRequest request) {
        Map<String, String> errors = new HashMap<>();

        if (request.getName() == null || request.getName().trim().isEmpty()) {
            errors.put("name", "Name is required");
        } else if (request.getName().trim().length() < 3) {
            errors.put("name", "Name must be at least 3 characters");
        }

        if (request.getEmail() == null || request.getEmail().trim().isEmpty()) {
            errors.put("email", "Email is required");
        } else if (!request.getEmail().matches("^[A-Za-z0-9+_.-]+@(.+)$")) {
            errors.put("email", "Please provide a valid email address");
        }

        if (request.getPassword() == null || request.getPassword().trim().isEmpty()) {
            errors.put("password", "Password is required");
        } else if (request.getPassword().length() < 6) {
            errors.put("password", "Password must be at least 6 characters");
        }

        if (request.getContactNumber() == null || request.getContactNumber().trim().isEmpty()) {
            errors.put("contactNumber", "Contact number is required");
        } else if (!request.getContactNumber().matches("^\\d{10}$")) {
            errors.put("contactNumber", "Contact number must be exactly 10 digits");
        }

        if (request.getAddress() == null || request.getAddress().trim().isEmpty()) {
            errors.put("address", "Address is required");
        }

        if (request.getDob() == null) {
            errors.put("dob", "Date of birth is required");
        }

        return errors;
    }

    private Map<String, String> validateLoginRequest(LoginRequest request) {
        Map<String, String> errors = new HashMap<>();

        if (request.getEmail() == null || request.getEmail().trim().isEmpty()) {
            errors.put("email", "Email is required");
        } else if (!request.getEmail().matches("^[A-Za-z0-9+_.-]+@(.+)$")) {
            errors.put("email", "Please provide a valid email address");
        }

        if (request.getPassword() == null || request.getPassword().trim().isEmpty()) {
            errors.put("password", "Password is required");
        }

        return errors;
    }
}