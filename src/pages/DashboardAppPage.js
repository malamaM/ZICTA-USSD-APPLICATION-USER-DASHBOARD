import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { DataGrid } from '@mui/x-data-grid';

import axios from 'axios';
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import { AppWidgetSummary, AppWebsiteVisits, AppCurrentVisits } from '../sections/@dashboard/app';

const columns = [
  { id: 'appId', label: 'App ID', minWidth: 100 },
  { id: 'custName', label: 'Customer Name', minWidth: 170 },
  { id: 'shortCode', label: 'Short Code', minWidth: 100 },
  { id: 'expiryDate', label: 'Expiry Date', minWidth: 120 },
  { id: 'licenseStatus', label: 'License Status', minWidth: 120 },
];

const createData = (appId, custName, shortCode, expiryDate, licenseStatus) => {
  return { appId, custName, shortCode, expiryDate, licenseStatus };
};

export default function DashboardAppPage() {
  const theme = useTheme();
  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);


  const [pendingApplicationsCount, setPendingApplicationsCount] = useState(0);
  const [AwaitingActionCount, setAwaitingActionCount] = useState(0);
  const [expiring, setexpiring] = useState(0);
  const [availableshortcodes, setavailableshortcodes] = useState(0);
  const [activeCount, setActiveCount] = useState(0);
  const [expiredCount, setexpiredCount] = useState(0);

  
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
        row.appId.toLowerCase().includes(query) ||
        row.custName.toLowerCase().includes(query) ||
        row.shortCode.toLowerCase().includes(query) ||
        row.expiryDate.toLowerCase().includes(query) ||
        row.licenseStatus.toLowerCase().includes(query)
    );
    setFilteredRows(filtered);
    setPage(0);
  };
 
  

  useEffect(() => {
    const fetchPendingApplicationsCount = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/dashboard/pending-applications-count');
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
    const fetchApplications = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/searchuserlicense');
        const appData = response.data;

        // Transform appData into rows array
        const newRows = appData.map((data) =>
          createData(
            data.app_id,
            data.cust_name,
            data.short_code,
            data.expiry_date,
            data.license_status
          )
        );

        setRows(newRows);
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
    const fetchAwaitingActionCount = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/dashboard/awaiting-action-count');
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
        const response = await axios.get('http://127.0.0.1:8000/api/count-expiring-shortcodes');
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
        const response = await axios.get('http://127.0.0.1:8000/api/shortcode/combinations');
        const { count } = response.data;
        setavailableshortcodes(count);
      } catch (error) {
        console.error('Error fetching available usdd count:', error);
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
        const response = await axios.get('http://127.0.0.1:8000/api/count-expiring-shortcodes');
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
        const response = await axios.get('http://127.0.0.1:8000/api/count-expiring-shortcodes');
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
        <title>ZICTA USSD Portal</title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome to the ZICTA USSD Portal
        </Typography>

        <Grid container spacing={3}>
          

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Applications"
              total={AwaitingActionCount}
              color="info"
              icon={'ant-design:apple-filled'}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Licenses" total={expiring} color="warning" icon={'ant-design:windows-filled'} />
          </Grid>


       

         
          <Grid item xs={19} md={16} lg={10}>
          <Typography variant="h6" sx={{ mb: 5 }}>
          Your USSD Shortcode Licenses
        </Typography>
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
                <TableCell
                  key={column.id}
                  align="left"
                  style={{ minWidth: column.minWidth }}
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
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.appId}>
                    <TableCell>{row.appId}</TableCell>
                    <TableCell>{row.custName}</TableCell>
                    <TableCell>{row.shortCode}</TableCell>
                    <TableCell>{row.expiryDate}</TableCell>
                    <TableCell>{row.licenseStatus}</TableCell>
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

            </Grid>
        </Grid>
      </Container>
    </>
  );

}
