import React, { useState } from "react";
import axios, { AxiosError } from "axios";

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/register", {
        username,  // Send username in the request body
        password,  // Send password in the request body
      });
      setMessage(response.data); // Display success or error message
    } catch (error: unknown) {
      // Type assertion to AxiosError
      if (axios.isAxiosError(error)) {
        setMessage("Error: " + (error.response?.data || error.message));
      } else {
        setMessage("An unexpected error occurred");
      }
    }
  };
  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Register</button>
      </form>
      {message && <div>{message}</div>}
    </div>
  );
};

export default RegisterForm;