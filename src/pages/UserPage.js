import { Helmet } from 'react-helmet-async';
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
} from '@mui/material';

// components
import Label from '../components/label';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
import { UserListHead } from '../sections/@dashboard/user';

// ----------------------------------------------------------------------

const columns = [
  { id: 'appId', label: 'Customer Name', minWidth: 100 },
  { id: 'custName', label: 'Organization', minWidth: 170 },
  { id: 'shortCode', label: 'Short Code', minWidth: 100 },
  { id: 'expiryDate', label: 'Status', minWidth: 120 },
  { id: 'licenseStatus', label: 'Opened', minWidth: 120 },
];

const createData = (appId, custName, shortCode, expiryDate, licenseStatus) => {
  return { appId, custName, shortCode, expiryDate, licenseStatus };
};

export default function UserPage() {
  const theme = useTheme();
  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
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
    const fetchApplications = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/applicationsbyid');
        const appData = response.data;

        // Transform appData into rows array
        const newRows = appData.map((data) =>
          createData(
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
    const intervalId = setInterval(fetchApplications, 10000); // Fetch every 10 seconds

    return () => {
      clearInterval(intervalId); // Cleanup the interval on component unmount
    };
  }, []);


  return (
    <Container>
      <Helmet>
        <title>User | Management</title>
      </Helmet>

      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5} sx={{ color: 'black' }}>
        <Typography variant="h4" sx={{ mb: 2, color: 'black' }}>
          Applications
        </Typography>
        <Button variant="contained" sx={{ color: 'black' }}>
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
      
    </Container>
  );
}
