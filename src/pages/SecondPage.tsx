import { useEffect, useState } from 'react'; // Removed unused React import
import axios from 'axios';
import { Container, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid'; // Corrected import for GridColDef

import DepartmentList from '../components/DepartmentList';

const SecondPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/posts')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('There was an error fetching the data!', error);
      });
  }, []);

  const columns: GridColDef[] = [
    { field: 'userId', headerName: 'User ID', width: 90 },
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'title', headerName: 'Title', width: 150 },
    { field: 'body', headerName: 'Body', width: 300 },
  ];

  return (
    <Container className="container">
      <Typography variant="h4" gutterBottom>
        Second Page
      </Typography>
      <div className="data-grid">
        <DataGrid rows={data} columns={columns} pageSize={5} rowsPerPageOptions={[5]} />
      </div>
      <div className="department-list">
        <DepartmentList />
      </div>
    </Container>
  );
};

export default SecondPage;
