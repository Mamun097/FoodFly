import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import '../assets/css/style.css'

const ActiveOrders = () => {
  return (
    <Box
      sx={{
        border: "2px",
        borderRadius: "5px",
        marginTop: "2px",
        padding: "20px",
        backgroundColor: "white",
      }}
    >
      <Typography variant="h5" gutterBottom sx={{ color: "black" }}>
        Active Orders
      </Typography>
      <Box
        sx={{
          backgroundColor: "white",
          borderRadius: "8px",
          padding: "10px",
          marginBottom: "10px",
        }}
      >
        <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: "bold" }}>
          Order #12345
        </Typography>
        <Typography variant="body1" gutterBottom>
          Item: Burger x 2
        </Typography>
        <Typography variant="body1" gutterBottom>
          Price per Item: $5.00
        </Typography>
        <Typography variant="body1" gutterBottom>
          Total Price: $10.00
        </Typography>
        <Button variant="contained" sx={{ bgcolor: "#e53935", color: "white", mt: 2 }}>
          Cancel
        </Button>
        <Button variant="contained" sx={{ bgcolor: "#43a047", color: "white", mt: 2, ml: 2 }}>
          Confirm
        </Button>
      </Box>
      <Box
        sx={{
          backgroundColor: "white",
          borderRadius: "8px",
          padding: "10px",
          marginBottom: "10px",
        }}
      >
        <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: "bold" }}>
          Order #12346
        </Typography>
        <Typography variant="body1" gutterBottom>
          Item: Pizza x 1
        </Typography>
        <Typography variant="body1" gutterBottom>
          Price per Item: $12.00
        </Typography>
        <Typography variant="body1" gutterBottom>
          Total Price: $12.00
        </Typography>
        <Button variant="contained" sx={{ bgcolor: "#e53935", color: "white", mt: 2 }}>
          Cancel
        </Button>
        <Button variant="contained" sx={{ bgcolor: "#43a047", color: "white", mt: 2, ml: 2 }}>
          Confirm
        </Button>
      </Box>
      {/* Add more order boxes as needed */}
    </Box>
  );
};

export default ActiveOrders;
