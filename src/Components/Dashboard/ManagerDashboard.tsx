import React, { useState, useEffect } from "react";
import { approveTicket, denyTicket } from "../services/ticketService";
import { useNavigate } from "react-router-dom";

interface Ticket {
  username: string;
  id: number;
  description: string;
  amount: number;
  status: string;
}

const ManagerDashboard: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Check if the user is a manager
  useEffect(() => {
    const role = localStorage.getItem("userRole");
    if (role !== "MANAGER") {
      navigate("/manager-dashboard"); // Redirect if not a manager
    }
  }, [navigate]);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/tickets", {
          method: "GET",
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

  const handleApprove = async (id: number) => {
    try {
      await approveTicket(id);
      setTickets((prevTickets) =>
        prevTickets.map((ticket) =>
          ticket.id === id ? { ...ticket, status: "Approved" } : ticket
        )
      );
    } catch (error) {
      setError("Error approving ticket");
    }
  };

  const handleDeny = async (id: number) => {
    try {
      await denyTicket(id);
      setTickets((prevTickets) =>
        prevTickets.map((ticket) =>
          ticket.id === id ? { ...ticket, status: "Denied" } : ticket
        )
      );
    } catch (error) {
      setError("Error denying ticket");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Manager Dashboard</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ padding: '10px', textAlign: 'left', border: '1px solid #ddd', backgroundColor: '#f2f2f2' }}>Description</th>
            <th style={{ padding: '10px', textAlign: 'left', border: '1px solid #ddd', backgroundColor: '#f2f2f2' }}>Amount</th>
            <th style={{ padding: '10px', textAlign: 'left', border: '1px solid #ddd', backgroundColor: '#f2f2f2' }}>Status</th>
            <th style={{ padding: '10px', textAlign: 'left', border: '1px solid #ddd', backgroundColor: '#f2f2f2' }}>Username</th>
            <th style={{ padding: '10px', textAlign: 'left', border: '1px solid #ddd', backgroundColor: '#f2f2f2' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket.id}>
              <td style={{ padding: '10px', textAlign: 'left', border: '1px solid #ddd' }}>{ticket.description}</td>
              <td style={{ padding: '10px', textAlign: 'left', border: '1px solid #ddd' }}>${ticket.amount.toFixed(2)}</td>
              <td style={{ padding: '10px', textAlign: 'left', border: '1px solid #ddd' }}>{ticket.status}</td>
              <td style={{ padding: '10px', textAlign: 'left', border: '1px solid #ddd' }}>{ticket.username || "Unknown"}</td>
              <td style={{ padding: '10px', textAlign: 'center', border: '1px solid #ddd' }}>
                <button
                  onClick={() => handleApprove(ticket.id)}
                  disabled={ticket.status !== "Pending"}
                  style={{
                    backgroundColor: ticket.status !== "Pending" ? "#ccc" : "#007bff",
                    color: ticket.status !== "Pending" ? "#666" : "#fff",
                    marginRight: '5px',
                    padding: '5px 10px',
                    border: 'none',
                    cursor: ticket.status === "Pending" ? 'pointer' : 'not-allowed',
                  }}
                >
                  Approve
                </button>
                <button
                  onClick={() => handleDeny(ticket.id)}
                  disabled={ticket.status !== "Pending"}
                  style={{
                    backgroundColor: ticket.status !== "Pending" ? "#ccc" : "#dc3545",
                    color: ticket.status !== "Pending" ? "#666" : "#fff",
                    padding: '5px 10px',
                    border: 'none',
                    cursor: ticket.status === "Pending" ? 'pointer' : 'not-allowed',
                  }}
                >
                  Deny
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManagerDashboard;
