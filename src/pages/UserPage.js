import { Helmet } from 'react-helmet-async';
import { useNavigate, BrowserRouter } from 'react-router-dom';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
import axios from 'axios';

// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Button,
  Popover,
  Checkbox,
  TableHead,
  MenuItem,
  TableBody,
  TableRow,
  TextField,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
  CircularProgress,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent
} from '@mui/material';

// components
import Label from '../components/label';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
import { UserListHead } from '../sections/@dashboard/user';
import UpdateApplicationFormPopup from './UpdateApplicationFormPopup';


// ----------------------------------------------------------------------

const columns = [
  { id: 'appId', label: 'Application ID', minWidth: 100 }, // Added column for Application ID
  { id: 'custName', label: 'Customer Name', minWidth: 170 },
  { id: 'organizationName', label:'Organization', minWidth: 100 },
  { id: 'shortCode', label: 'Short Code', minWidth: 100 },
  { id: 'status', label: 'Status', minWidth: 120 },
  { id: 'opened', label: 'Opened', minWidth: 120 },
];

const createData = (appId, custName, organizationName, shortCode,  status, opened) => {
  return { id: appId, appId, custName, organizationName, shortCode, status, opened };
};

const HandleButtonClick = () => {
  const navigate = useNavigate();
  navigate('/apply');
};

export default function UserPage() {
  const theme = useTheme();
  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedRow, setSelectedRow] = useState(null);
  const [open, setOpen] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
  
    const filtered = rows.filter(
      (row) =>
        (row.custName && row.custName.toLowerCase().includes(query)) ||
        (row.organizationName && row.organizationName.toLowerCase().includes(query)) ||
        (row.shortCode && row.shortCode.toLowerCase().includes(query)) ||
        (row.status && row.status.toLowerCase().includes(query)) ||
        (row.opened && row.opened.toLowerCase().includes(query))
    );
    setFilteredRows(filtered);
    setPage(0);
  };
  

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/applicationsbyid');
        const appData = response.data;

        const newRows = appData.map((data) =>
          createData(
            data.id,
            data.customer_name,
            data.organization_name,
            data.shortcode_applied,
            data.status,
            data.opened
          )
        );

        setRows(newRows);
      } catch (error) {
        console.error('Error fetching applications:', error);
      }
    };

    fetchApplications();
    const intervalId = setInterval(fetchApplications, 10000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const handleRowClick = (row) => {
    handleOpenUpdateForm(row);
  };

  const handleOpenUpdateForm = (row) => {
    setSelectedRowData(row);
    setShowUpdateForm(true);
  };

  const handleClose = () => {
    setOpen(false);
    setShowUpdateForm(false);
  };

  return (
    <Container>
      <Helmet>
        <title>User | Management</title>
      </Helmet>

      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5} sx={{ color: 'black' }}>
        <Typography variant="h4" sx={{ mb: 2, color: 'black' }}>
          Applications
        </Typography>
        <Button variant="contained" onClick={HandleButtonClick} sx={{ color: 'black', '&:hover': { color: 'white' } }}>
          Add New Application
        </Button>
      </Stack>

      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TextField
          label="Search"
          value={searchQuery}
          onChange={handleSearch}
          margin="normal"
          variant="outlined"
          fullWidth
        />
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column.id} align="left" style={{ minWidth: column.minWidth }}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
  {(searchQuery ? filteredRows : rows)
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .map((row) => {
      return (
        <TableRow
          hover
          role="checkbox"
          tabIndex={-1}
          key={row.id}
          onClick={() => handleRowClick(row)}
        >
          <TableCell>{row.appId}</TableCell> 
          <TableCell>{row.custName}</TableCell>
          <TableCell>{row.organizationName}</TableCell>
          <TableCell>{row.shortCode}</TableCell>
          <TableCell>{row.status}</TableCell>
          <TableCell>{row.opened}</TableCell>
        </TableRow>
      );
    })}
</TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={(searchQuery ? filteredRows : rows).length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Application Details</DialogTitle>
        <DialogContent>
          {selectedRow && (
            <>
              <div>Application ID: {selectedRow.appId}</div>
              <div>Customer Name: {selectedRow.custName}</div>
              <div>Organization: {selectedRow.organizationName}</div>
              <div>Short Code: {selectedRow.shortCode}</div>
              <div>Status: {selectedRow.status}</div>
              <div>Opened: {selectedRow.opened}</div>
            </>
          )}
          <Button onClick={handleClose}>Close</Button>
        </DialogContent>
      </Dialog>

      {showUpdateForm && (
        <UpdateApplicationFormPopup
          selectedRow={selectedRowData}
          closePopup={handleClose}
          buttonText="Make Payment"
          handleChangeStatusEndpoint="api1"
          dialogueTitle="Update ApplicationDetails"
        />
      )}
    </Container>
  );
}
