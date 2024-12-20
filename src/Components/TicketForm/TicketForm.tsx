import React, { useState } from "react";
import "./TicketForm.css";
import { createTicket } from "../services/ticketService";

// Ticket interface import to ensure correct typing
import { Ticket } from "../services/ticketService";

const TicketForm = () => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState(""); // State for error messages
  const [success, setSuccess] = useState(""); // State for success message

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate input
    if (!description || !amount) {
      setError("Both fields are required.");
      return;
    }

    // Clear any previous errors or success messages
    setError("");
    setSuccess("");

    try {
      // Create ticket via the service
      const ticket: Ticket = {
        id: 0, // Temporary value, can be overwritten by the backend
        description,
        amount: parseFloat(amount),
        status: "Pending", // Default status
      };

      // Call the backend API to create the ticket
      const response = await createTicket(ticket);

      // Show success message and clear form
      setSuccess("Ticket submitted successfully!");
      setDescription("");
      setAmount("");
    } catch (error) {
      setError("Failed to submit ticket. Please try again.");
    }
  };

  return (
    <form className="ticket-form" onSubmit={handleSubmit}>
      {error && <div className="error">{error}</div>} {/* Display error */}
      {success && <div className="success">{success}</div>} {/* Display success */}

      <div className="form-group">
        
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          placeholder="Enter ticket details here..."
        />
      </div>

      <div className="form-group">
        <label htmlFor="amount">Amount:</label>
        <input
          id="amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      

      <button type="submit">Submit</button>
      
    </form>
  );
};

export default TicketForm;
