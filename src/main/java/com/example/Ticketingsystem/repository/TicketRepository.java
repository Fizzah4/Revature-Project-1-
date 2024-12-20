package com.example.Ticketingsystem.repository;

import com.example.Ticketingsystem.model.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, Long> {
    List<Ticket> findByStatus(String status); // Query method for filtering tickets by status

}
