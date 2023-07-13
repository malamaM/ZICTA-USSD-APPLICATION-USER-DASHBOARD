import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';

const UpdateFormPopup = ({ selectedRow, closePopup, buttonText, handleChangeStatusEndpoint, dialogueTitle }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [formData, setFormData] = useState({
    id : selectedRow.id,
    appId: selectedRow.appId,
    custName: selectedRow.custName,
    shortCode: selectedRow.shortCode,
    expiryDate: selectedRow.expiryDate,
    licenseStatus: selectedRow.licenseStatus,
  });

  const handleClose = () => {
    setIsOpen(false);
    closePopup();
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/licenses/update', formData);
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
        console.log('API 1 response:', response.data);    } catch (error) {
      console.error('Error deleting:', error);
    }
    
  };

  const handleChangeStatus = async () => {
    try {
      // Perform the change status operation based on the chosen endpoint
      if (handleChangeStatusEndpoint === 'api1') {
        const response = await axios.post('http://127.0.0.1:8000/api/change-status', formData);
        console.log('API 1 response:', response.data);
      } else if (handleChangeStatusEndpoint === 'api2') {
        const response = await axios.post('http://127.0.0.1:8000/api/shortcode/setexpiry', formData);
        console.log('API 2 response:', response.data);
      }
    } catch (error) {
      console.error('Error changing status:', error);
    }
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
            label="Short Code"
            name="shortCode"
            value={formData.shortCode}
            onChange={handleInputChange}
            fullWidth
            disabled
          />
          <TextField
            label="Expiry Date"
            name="expiryDate"
            value={formData.expiryDate}
            onChange={handleInputChange}
            fullWidth
            disabled
          />
          <TextField
            label="License Status"
            name="licenseStatus"
            value={formData.licenseStatus}
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

UpdateFormPopup.propTypes = {
  selectedRow: PropTypes.object.isRequired,
  closePopup: PropTypes.func.isRequired,
  buttonText: PropTypes.string.isRequired,
  handleChangeStatusEndpoint: PropTypes.oneOf(['api1', 'api2']).isRequired,
  dialogueTitle: PropTypes.string.isRequired,
};

export default UpdateFormPopup;
