import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';

const UpdateApplicationFormPopup = ({ selectedRow, closePopup, buttonText, handleChangeStatusEndpoint, dialogueTitle }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [formData, setFormData] = useState({
    id : selectedRow.id,
    appId: selectedRow.appId,
    custName: selectedRow.custName,
    shortCode: selectedRow.shortCode,
    organizationName: selectedRow.organizationName,
    status: selectedRow.status,
  });

  const handleClose = () => {
    setIsOpen(false);
    closePopup();
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/applications/update', formData);
      console.log('Form submitted successfully', response.data);
      // Optionally, you can show a success message or perform any other actions here
    } catch (error) {
      console.error('Error submitting form:', error);
      // Optionally, you can show an error message or perform any other error handling here
    }

    handleClose();
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleDelete = async () => {
    try {
      // Perform the delete operation here
 
      const response = await axios.post('http://127.0.0.1:8000/api/delete-application', formData);
      console.log('API 1 response:', response.data);
    } catch (error) {
      console.error('Error deleting:', error);
    }
    
  };
  const fetchUserData = async () => {
    const token = localStorage.getItem('token');
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;

    try {
      const response = await axios.get('http://127.0.0.1:8000/api/me');
      const userData = response.data;
      console.log('User Data:', userData);
      // Handle the user data as needed
    } catch (error) {
      console.error('User data fetch error:', error);
      // Handle the error
    }
  };
  const handleChangeStatus = () => {
    const appId = formData.appId; // Get the value of appId
  
    // Construct the URL with the appId as a path parameter
    const url = `http://127.0.0.1:8000/lstripe/${appId}`;
  
    // Open the URL in a new tab
    window.open(url, '_blank');
  };
  
  
  

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>{dialogueTitle}</DialogTitle>
      <DialogContent>
        {/* Render the form fields here */}
        <form onSubmit={handleFormSubmit}>
          <TextField
            label="Application ID"
            name="appId"
            value={formData.appId}
            onChange={handleInputChange}
            fullWidth
            disabled 
          />
          <TextField
            label="Customer Name"
            name="custName"
            value={formData.custName}
            onChange={handleInputChange}
            fullWidth
            disabled
          />
          <TextField
            label="Organization"
            name="organizationName"
            value={formData.organizationName}
            onChange={handleInputChange}
            fullWidth
            disabled
          /><TextField
            label="Short Code"
            name="shortCode"
            value={formData.shortCode}
            onChange={handleInputChange}
            fullWidth
            disabled 
          />
          <TextField
            label="Status"
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            fullWidth
            disabled 
          />
          {/* Add more form fields for other columns */}
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
           
            <Button onClick={handleChangeStatus} variant="contained" color="warning">
              {buttonText}
            </Button>
            
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

UpdateApplicationFormPopup.propTypes = {
  selectedRow: PropTypes.object.isRequired,
  closePopup: PropTypes.func.isRequired,
  buttonText: PropTypes.string.isRequired,
  handleChangeStatusEndpoint: PropTypes.oneOf(['api1', 'api2']).isRequired,
  dialogueTitle: PropTypes.string.isRequired,
};

export default UpdateApplicationFormPopup;
