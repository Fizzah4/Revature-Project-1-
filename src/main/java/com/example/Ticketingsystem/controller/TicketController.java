package com.example.Ticketingsystem.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Ticketingsystem.model.Ticket;
import com.example.Ticketingsystem.repository.TicketRepository;

@RestController
@RequestMapping("/api/tickets")
public class TicketController {

    @Autowired
    private TicketRepository ticketRepository;
    
 @GetMapping
    public ResponseEntity<List<Ticket>> getAllTickets() {
        return ResponseEntity.ok(ticketRepository.findAll());
    }

    // Create a new ticket
    @PostMapping
    public ResponseEntity<Ticket> createTicket(@RequestBody Ticket ticket) {
        ticket.setStatus("Pending"); // Set default status
        return ResponseEntity.status(HttpStatus.CREATED).body(ticketRepository.save(ticket));
    }
    // Method to approve a ticket
    @PutMapping("/{ticketId}/approve")
    public ResponseEntity<Ticket> approveTicket(@PathVariable Long ticketId) {
        Optional<Ticket> ticketOpt = ticketRepository.findById(ticketId);
        if (ticketOpt.isPresent()) {
            Ticket ticket = ticketOpt.get();
            ticket.setStatus("Approved");  // Set the status to "Approved"
            ticketRepository.save(ticket);  // Save the updated ticket
            return ResponseEntity.ok(ticket);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    // Method to deny a ticket
    @PutMapping("/{ticketId}/deny")
    public ResponseEntity<Ticket> denyTicket(@PathVariable Long ticketId) {
        Optional<Ticket> ticketOpt = ticketRepository.findById(ticketId);
        if (ticketOpt.isPresent()) {
            Ticket ticket = ticketOpt.get();
            ticket.setStatus("Denied");  // Set the status to "Denied"
            ticketRepository.save(ticket);  // Save the updated ticket
            return ResponseEntity.ok(ticket);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
