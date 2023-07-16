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
      const response = await axios.get('https://vulkantechnologylabs.com/token');
      setCsrfToken(response.data.csrfToken);
      console.log(csrfToken);
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
      const response = await axios.post(
        'https://vulkantechnologylabs.com/api/uploadapplication',
        formData
      );

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
    <form ref={formRef} onSubmit={handleSubmit} style={{ margintop: '100px', width: '50%' }}>
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
      </Stack>

      {error && <div>{error}</div>}
      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        loading={loading}
        style={{ color: 'black', backgroundColor: '#f5f5f5', marginTop: '20px', display: 'flex', alignItems: 'center' }}
        loadingPosition="start"
        loadingIndicator={
          <div style={{ marginRight: '8px' }}>
            <svg className="w-5 h-5 text-black animate-spin" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          </div>
        }
        disabled={loading}
      >
        {loading ? 'Submitting Application...' : 'Submit Application'}
      </LoadingButton>
    </form>
  );
}
