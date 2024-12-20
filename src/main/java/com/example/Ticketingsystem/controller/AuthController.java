package com.example.Ticketingsystem.controller;

import com.example.Ticketingsystem.model.User;
import com.example.Ticketingsystem.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")

public class AuthController {

    private final UserService userService;

    @Autowired
    public AuthController(UserService userService) {
        this.userService = userService;
    }
    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody User user) {
        Optional<User> existingUser = userService.findByUsername(user.getUsername());
        if (existingUser.isPresent()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Username already exists!");
        }
        
        // Set default role to EMPLOYEE if not provided
        if (user.getRole() == null || user.getRole().isEmpty()) {
            user.setRole("EMPLOYEE");
        }
    
        try {
            userService.registerUser(user.getUsername(), user.getPassword(), user.getRole());
            return ResponseEntity.status(HttpStatus.CREATED).body("User registered successfully!");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal server error occurred while registering the user.");
        }
    }
    
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestParam String username, @RequestParam String password, HttpServletRequest request) {
        Optional<User> userOpt = userService.findByUsername(username); 
    
        if (userOpt.isPresent()) {
            User user = userOpt.get();
    
            // Compare the entered password with the stored password
            if (user.getPassword().equals(password)) {
                HttpSession session = request.getSession();
                session.setAttribute("user", user);  // Store user data in session
                return ResponseEntity.ok("Login successful!");
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid password!");
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found!");
        }
    }
    



    @GetMapping("/logout")
    public String logout(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }
        return "Logged out successfully!";
    }
}
