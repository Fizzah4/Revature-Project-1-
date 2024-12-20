package com.example.Ticketingsystem.repository;

import com.example.Ticketingsystem.model.User;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);  // Find user by username

    boolean existsByUsername(String username);
}
