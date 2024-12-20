import axios from 'axios';

const API_URL = 'http://localhost:8080/api/tickets';

// Updated Ticket interface to include `id` and `status`
export interface Ticket {
  id?: number;           // Add id
  description: string;
  amount: number;
  status?: string;       // Add status
}

// Create a new ticket (send the data to the backend)
export const createTicket = async (ticket: Ticket): Promise<any> => {
  try {
    const response = await axios.post(API_URL, ticket);
    return response.data;
  } catch (error) {
    console.error('Error submitting ticket:', error);
    throw error;
  }
};

// Fetch all tickets from the backend
export const getTickets = async (): Promise<Ticket[]> => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching tickets:', error);
    throw error;
  }
};

// Approve a ticket (by ticket ID)
export const approveTicket = async (ticketId: number): Promise<any> => {
  try {
    const response = await axios.put(`${API_URL}/${ticketId}/approve`);
    return response.data;
  } catch (error) {
    console.error('Error approving ticket:', error);
    throw error;
  }
};

// Deny a ticket (by ticket ID)
export const denyTicket = async (ticketId: number): Promise<any> => {
  try {
    const response = await axios.put(`${API_URL}/${ticketId}/deny`);
    return response.data;
  } catch (error) {
    console.error('Error denying ticket:', error);
    throw error;
  }
};
