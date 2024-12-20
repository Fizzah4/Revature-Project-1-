import React, { useState, useEffect } from "react";

interface Ticket {
  username: string;
  id: number;
  description: string;
  amount: number;
  status: string;
}

export const EmployeeDashboard: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [description, setDescription] = useState<string>("");
  const [amount, setAmount] = useState<number | "">("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/tickets", {
          method: "GET", // Ensure the method is GET
          credentials: "include",
        });
        if (!response.ok) {
          setError("Error fetching tickets");
          return;
        }
        const fetchedTickets = await response.json();
        setTickets(fetchedTickets);
      } catch (err) {
        setError("Error fetching tickets");
      } finally {
        setLoading(false);
      }
    };
  
    fetchTickets();
  }, []);
  
  
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/tickets", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description, amount, status: "Pending" }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || "Error submitting ticket");
        return;
      }
      const newTicket = await response.json();
      setTickets([...tickets, newTicket]);
      setDescription("");
      setAmount("");
    } catch (err) {
      setError("Error submitting ticket");
    }
  };
  

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
    <h2>Employee Dashboard</h2>
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <th style={{ padding: '10px', textAlign: 'left', border: '1px solid #ddd', backgroundColor: '#f2f2f2' }}>Description</th>
          <th style={{ padding: '10px', textAlign: 'left', border: '1px solid #ddd', backgroundColor: '#f2f2f2' }}>Amount</th>
          <th style={{ padding: '10px', textAlign: 'left', border: '1px solid #ddd', backgroundColor: '#f2f2f2' }}>Status</th>
         
        </tr>
      </thead>
      <tbody>
        {tickets.map((ticket) => (
          <tr key={ticket.id}>
            <td style={{ padding: '10px', textAlign: 'left', border: '1px solid #ddd' }}>{ticket.description}</td>
            <td style={{ padding: '10px', textAlign: 'left', border: '1px solid #ddd' }}>${ticket.amount.toFixed(2)}</td>
            <td style={{ padding: '10px', textAlign: 'left', border: '1px solid #ddd' }}>{ticket.status}</td>

          </tr>
        ))}
      </tbody>
    </table>
  </div>
  
  );
};