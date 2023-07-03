import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// @mui
import { Stack, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';

export default function LoginForm() {
  const navigate = useNavigate();
  const formRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [csrfToken, setCsrfToken] = useState('');

  useEffect(() => {
    fetchCsrfToken();
  }, []);

  const fetchCsrfToken = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/token');
      setCsrfToken(response.data.csrfToken);
      console.log (csrfToken);
    } catch (error) {
      console.error('Failed to fetch CSRF token', error);
    }
  };

  const handleClick = () => {
    navigate('/dashboard', { replace: true });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError(null);

    const formData = new FormData(formRef.current);
    formData.append('_token', csrfToken);

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/uploadapplication', formData);

      console.log(response.data); // You can customize this based on your response from the backend

      handleClick(); // Redirect to the dashboard page or handle authentication success

      setLoading(false);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError('Invalid credentials');
      } else {
        setError('An error occurred. Please try again.');
      }

      setLoading(false);
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <Stack spacing={3}>
        <TextField
          name="organization"
          InputLabelProps={{ shrink: true }}
          label="Organization Name"
          placeholder="Organization Name"
        />
        <TextField
          name="customer_name"
          InputLabelProps={{ shrink: true }}
          label="Customer Name"
          placeholder="Customer Name"
        />
        <TextField
          name="purpose"
          InputLabelProps={{ shrink: true }}
          label="Purpose for USSD"
          placeholder="Purpose for USSD"
        />
        <TextField
          name="email"
          InputLabelProps={{ shrink: true }}
          label="Customer Email address"
          placeholder="Customer Email address"
        />
             <TextField
          name="shortcode_applied"
          InputLabelProps={{ shrink: true }}
          label="Shortcode Applied"
          placeholder="Shortcode"
        />
        <TextField
          name="password"
          InputLabelProps={{ shrink: true }}
          label="Password"
          placeholder="Password"
        />
        <TextField
          name="confirm_password"
          InputLabelProps={{ shrink: true }}
          label="Confirm Password"
          placeholder="Confirm Password"
        />
      </Stack>

      {error && <div>{error}</div>}

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        loading={loading}
      >
        APPLY
      </LoadingButton>
    </form>
  );
}
