import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  CircularProgress,
  Grid,
  Typography,
} from '@mui/material';

const UpdateApplicationFormPopup = ({
  selectedRow,
  closePopup,
  buttonText,
  handleChangeStatusEndpoint,
  dialogueTitle,
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [formData, setFormData] = useState({
    id: selectedRow.id,
    appId: selectedRow.appId,
    custName: selectedRow.custName,
    shortCode: selectedRow.shortCode,
    expiry: selectedRow.expiryDate,
    licenseStatus: selectedRow.licenseStatus,
  });
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [renewLoading, setRenewLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
    closePopup();
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setUpdateLoading(true);

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/applications/update', formData);
      console.log('Form submitted successfully', response.data);
    } catch (error) {
      console.error('Error submitting form:', error);
    }

    setUpdateLoading(false);
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
    setDeleteLoading(true);

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/delete-application', formData);
      console.log('API response:', response.data);
      handleClose();
    } catch (error) {
      console.error('Error deleting:', error);
    }

    setDeleteLoading(false);
  };

  const handleChangeStatus = async () => {
    setRenewLoading(true);

    try {
      if (handleChangeStatusEndpoint === 'api1') {
        const response = await axios.post('http://127.0.0.1:8000/api/licenserenewalrequest', formData);
        console.log('API 1 response:', response.data);
        handleClose();
      } else if (handleChangeStatusEndpoint === 'api2') {
        const response = await axios.post('http://127.0.0.1:8000/api/endpoint2', formData);
        console.log('API 2 response:', response.data);
        handleClose();
      }
    } catch (error) {
      console.error('Error changing status:', error);
    }

    setRenewLoading(false);
  };

  const handlepay = () => {
    const id = formData.id; // Get the value of appId
  
    // Construct the URL with the appId as a path parameter
    const url = `http://127.0.0.1:8000/lstripe/${id}`;
  
    // Open the URL in a new tab
    window.open(url, '_blank');
  };

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>{dialogueTitle}</DialogTitle>
      <DialogContent style={{ backgroundColor: '#f5f5f5' }}>
        <form
          style={{ backgroundColor: '#f5f5f5', color: 'black' }}
          onSubmit={handlepay}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" component="div">
                <strong>License ID:</strong>
              </Typography>
              <Typography variant="body1" component="div">
                {formData.id}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" component="div">
                <strong>Application ID:</strong>
              </Typography>
              <Typography variant="body1" component="div">
                {formData.appId}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" component="div">
                <strong>Customer Name:</strong>
              </Typography>
              <Typography variant="body1" component="div">
                {formData.custName}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" component="div">
                <strong>Expiry Date:</strong>
              </Typography>
              <Typography variant="body1" component="div">
                {formData.expiry}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" component="div">
                <strong>Short Code:</strong>
              </Typography>
              <Typography variant="body1" component="div">
                {formData.shortCode}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" component="div">
                <strong>License Status:</strong>
              </Typography>
              <Typography variant="body1" component="div">
                {formData.licenseStatus}
              </Typography>
            </Grid>
          </Grid>
          <DialogActions style={{ marginTop: '40px', backgroundColor: '#f5f5f5' }}>
            <Button onClick={handleClose} style={{ backgroundColor: 'black', color: 'white' }}>
              Cancel
            </Button>

            <Button
              onClick={handleChangeStatus}
              variant="contained"
              style={{ backgroundColor: 'blue', color: 'white' }}
              disabled={renewLoading}
            >
              {renewLoading ? <CircularProgress color="inherit" size={20} /> : buttonText}
            </Button>

            <Button
              type="submit"
              variant="contained"
              style={{ backgroundColor: 'green', color: 'white' }}
              disabled={updateLoading}
            >
              {updateLoading ? <CircularProgress color="inherit" size={20} /> : 'Pay for Renewal'}
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
