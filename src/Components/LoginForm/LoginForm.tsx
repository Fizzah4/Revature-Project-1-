import { useState, FormEvent } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:8080/api/login',
        new URLSearchParams({ username, password }),
        { withCredentials: true } // Ensure cookies are included
      );
      navigate('/ticket-form'); // Redirect after login
    } catch (err: any) {
      if (err.response && err.response.status) {
        // Handle specific error codes
        if (err.response.status === 404) {
          setError("User not found!"); // Show user not found error
        } else if (err.response.status === 401) {
          setError("Invalid password!"); // Show invalid password error
        } else {
          setError('An error occurred during login');
        }
      } else {
        setError('An error occurred during login');
      }
    }
};

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <h2> Login </h2>
        <label>Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Login</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
};

export default LoginForm;
