import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography, Tab, CircularProgress } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import { AppWidgetSummary, AppWebsiteVisits, AppCurrentVisits } from '../sections/@dashboard/app';
import UpdateApplicationFormPopup from './UpdateApplicationFormPopup';

// ----------------------------------------------------------------------

const columns = [
    { id: 'appId', label: 'Application ID', minWidth: 100 }, // Added column for Application ID
    { id: 'custName', label: 'Customer Name', minWidth: 170 },
    { id: 'organizationName', label:'Organization', minWidth: 100 },
    { id: 'shortCode', label: 'Short Code', minWidth: 100 },
    { id: 'status', label: 'Status', minWidth: 120 },
    { id: 'opened', label: 'Opened', minWidth: 120 },
    { id: 'actions', label: 'Actions', minWidth: 120 },
];
const createData = (appId, custName, organizationName, shortCode,  status, opened, actions) => {
  return { id: appId, appId, custName, organizationName, shortCode, status, opened, actions };
};

export default function DashboardAppPage() {
  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  const [pendingApplicationsCount, setPendingApplicationsCount] = useState(0);
  const [AwaitingActionCount, setAwaitingActionCount] = useState(0);
  const [expiring, setexpiring] = useState(0);
  const [availableshortcodes, setavailableshortcodes] = useState(0);
  const [activeCount, setActiveCount] = useState(0);
  const [expiredCount, setexpiredCount] = useState(0);

  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [action, setAction] = useState(null);

  const Navigate = useNavigate();
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleRowClick = (row) => {
    setSelectedRowData(row);
    openPopup();
  };

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleClose = () => {
    setIsPopupOpen(false);
  };
  const [open, setOpen] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = rows.filter(
      (row) =>
        row.custName.toLowerCase().includes(query) ||
        row.shortCode.toLowerCase().includes(query) ||
        row.expiryDate.toLowerCase().includes(query) ||
        row.licenseStatus.toLowerCase().includes(query)
    );
    setFilteredRows(filtered);
    setPage(0);
  };

  const handleClickkk = () => {
    window.open('https://example.com', '_blank');
  };

  useEffect(() => {
    const checkAuthentication = async () => {
      const token = localStorage.getItem('token');
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;

      try {
        const response = await axios.get('https://vulkantechnologylabs.com:8000/api/me');
        // User is authenticated, continue with the page load
      } catch (error) {
        console.error('User not authenticated:', error);
        Navigate('/login');
      }
    };

    checkAuthentication();
  }, []);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get('https://vulkantechnologylabs.com:8000/api/applicationsbyid');
        const appData = response.data;

        const newRows = appData.map((data) =>
          createData(
            data.id,
            data.customer_name,
            data.organization_name,
            data.shortcode_applied,
            data.status,
            data.opened,
            data.actions
          )
        );

        setRows(newRows);
        setLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        console.error('Error fetching applications:', error);
      }
    };

    fetchApplications();
    const intervalId = setInterval(fetchApplications, 10000); // Fetch every 10 seconds

    return () => {
      clearInterval(intervalId); // Cleanup the interval on component unmount
    };
  }, []);

  useEffect(() => {
    const fetchPendingApplicationsCount = async () => {
      try {
        const response = await axios.get('https://vulkantechnologylabs.com:8000/api/dashboard/pending-applications-count');
        const { count } = response.data;
        setPendingApplicationsCount(count);
      } catch (error) {
        console.error('Error fetching pending applications count:', error);
      }
    };

    fetchPendingApplicationsCount();
    const intervalId = setInterval(fetchPendingApplicationsCount, 10000); // Fetch every 10 seconds

    return () => {
      clearInterval(intervalId); // Cleanup the interval on component unmount
    };
  }, []);

  useEffect(() => {
    const fetchAwaitingActionCount = async () => {
      try {
        const response = await axios.get('https://vulkantechnologylabs.com:8000/api/dashboard/awaiting-action-count');
        const { count } = response.data;
        setAwaitingActionCount(count);
      } catch (error) {
        console.error('Error fetching awaiting action count:', error);
      }
    };

    fetchAwaitingActionCount();
    const intervalId = setInterval(fetchAwaitingActionCount, 10000); // Fetch every 10 seconds

    return () => {
      clearInterval(intervalId); // Cleanup the interval on component unmount
    };
  }, []);

  useEffect(() => {
    const fetchexpiring = async () => {
      try {
        const response = await axios.get('https://vulkantechnologylabs.com:8000/api/count-expiring-shortcodes');
        const { expiringCount } = response.data;
        setexpiring(expiringCount);
      } catch (error) {
        console.error('Error fetching expiring count:', error);
      }
    };

    fetchexpiring();
    const intervalId = setInterval(fetchexpiring, 10000); // Fetch every 10 seconds

    return () => {
      clearInterval(intervalId); // Cleanup the interval on component unmount
    };
  }, []);

  useEffect(() => {
    const fetchavailableshortcodes = async () => {
      try {
        const response = await axios.get('https://vulkantechnologylabs.com:8000/api/shortcode/combinations');
        const { count } = response.data;
        setavailableshortcodes(count);
      } catch (error) {
        console.error('Error fetching availableusdd count:', error);
      }
    };

    fetchavailableshortcodes();
    const intervalId = setInterval(fetchavailableshortcodes, 10000); // Fetch every 10 seconds

    return () => {
      clearInterval(intervalId); // Cleanup the interval on component unmount
    };
  }, []);

  useEffect(() => {
    const fetchActiveCount = async () => {
      try {
        const response = await axios.get('https://vulkantechnologylabs.com:8000/api/count-expiring-shortcodes');
        const { futureCount } = response.data;
        setActiveCount(futureCount);
      } catch (error) {
        console.error('Error fetching active count:', error);
      }
    };

    fetchActiveCount();
    const intervalId = setInterval(fetchActiveCount, 10000); // Fetch every 10 seconds

    return () => {
      clearInterval(intervalId); // Cleanup the interval on component unmount
    };
  }, []);

  useEffect(() => {
    const fetchexpiredCount = async () => {
      try {
        const response = await axios.get('https://vulkantechnologylabs.com:8000/api/count-expiring-shortcodes');
        const { expiredCount } = response.data;
        setexpiredCount(expiredCount);
      } catch (error) {
        console.error('Error fetching expired count:', error);
      }
    };

    fetchexpiredCount();
    const intervalId = setInterval(fetchexpiredCount, 10000); // Fetch every 10 seconds

    return () => {
      clearInterval(intervalId); // Cleanup the interval on component unmount
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>ZICTA USSD Applications</title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, track and pay for all your applications here
        </Typography>

        
          <Grid item xs={12} md={6} lg={13}>
            <Typography variant="h6" sx={{ mb: 5, color: 'black' }}>
              USSD Shortcode Applications
            </Typography>
            <Paper sx={{ width: '100%', overflow: 'hidden', backgroundColor: '#f5f5f5' }}>
              <TextField
                inputProps={{ style: { color: 'black' } }}
                InputLabelProps={{ style: { color: 'black' } }}
                label="Search"
                value={searchQuery}
                onChange={handleSearch}
                margin="normal"
                variant="outlined"
                fullWidth
              />
              {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 300 }}>
                  <CircularProgress />
                </div>
              ) : (
                <>
                  <TableContainer sx={{ maxHeight: 440, backgroundColor: '#f0f0f0' }}>
                    <Table stickyHeader aria-label="sticky table">
                      <TableHead>
                        <TableRow>
                          {columns.map((column) => (
                            <TableCell
                              key={column.id}
                              align="left"
                              style={{ minWidth: column.minWidth, color: '#fff' }}
                            >
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
                                key={row.appId}
                                onClick={() => handleRowClick(row)}
                              >
                                <TableCell>{row.appId}</TableCell>
                                 <TableCell>{row.custName}</TableCell> 
                                 <TableCell>{row.organizationName}</TableCell>
                                <TableCell>{row.shortCode}</TableCell>
                                <TableCell>{row.status}</TableCell>
                                <TableCell>{row.opened}</TableCell>
                                <TableCell>
                                  <DeleteIcon />
                                  <EditIcon />
                                  <CheckIcon />
                                </TableCell>
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
                </>
              )}
            </Paper>
          </Grid>
      </Container>
      {isPopupOpen && (
        <UpdateApplicationFormPopup
          selectedRow={selectedRowData}
          closePopup={handleClose}
          buttonText="Pay for Application"
          handleChangeStatusEndpoint="api1"
          dialogueTitle="Manage Application"
          headerBackgroundColor="#f5f5f5"
          headerTextColor="#f5f5f5"
          style={{ color: 'white' }}
        />
      )}
    </>
  );
}
