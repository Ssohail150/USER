import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { GridColDef, Container, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid'; // Use '@mui/x-data-grid' for DataGrid

import DepartmentList from '../components/DepartmentList';
import '../styles/SecondPage.css'; // Import custom CSS file for styling

const SecondPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
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
