import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

const RestaurantInfo = () => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    // Save the edited restaurant information here
    setIsEditing(false);
  };

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
        Basic Information
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField
            label="Restaurant Name"
            fullWidth
            disabled={!isEditing}
            defaultValue="Your Restaurant"
            InputLabelProps={{
              style: { color: "black", fontSize: "1.5rem", fontWeight: "bold" },
            }}
            InputProps={{
              style: { color: "black", fontSize: "1.5rem", fontWeight: "bold" },
            }}
            variant="outlined"
            sx={{
                mb: 2,
                mt: 2,
              "& label.Mui-focused": {
                color: "black",
              },
              "& .MuiInput-underline:after": {
                borderBottomColor: "#ffc107",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "black",
                },
                "&:hover fieldset": {
                  borderColor: "#ffc107",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#ffc107",
                },
              },
              "& .MuiOutlinedInput-input": {
                backgroundColor: "white",
                fontSize: "1.5rem",
                fontWeight: "bold",
              },
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Restaurant ID"
            fullWidth
            disabled
            defaultValue="123456"
            InputLabelProps={{
              style: { color: "black", fontSize: "1.5rem", fontWeight: "bold" },
            }}
            InputProps={{
              style: { color: "black", fontSize: "1.5rem", fontWeight: "bold" },
            }}
            variant="outlined"
            sx={{
                mb: 2,
                mt: 2,
              "& label.Mui-focused": {
                color: "black",
              },
              "& .MuiInput-underline:after": {
                borderBottomColor: "#ffc107",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "black",
                },
                "&:hover fieldset": {
                  borderColor: "#ffc107",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#ffc107",
                },
              },
              "& .MuiOutlinedInput-input": {
                backgroundColor: "white",
                fontSize: "1.5rem",
                fontWeight: "bold",
              },
            }}
          />
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField
            label="Address"
            fullWidth
            disabled
            defaultValue="Lalbagh"
            InputLabelProps={{
              style: { color: "black", fontSize: "1.5rem", fontWeight: "bold" },
            }}
            InputProps={{
              style: { color: "black", fontSize: "1.5rem", fontWeight: "bold" },
            }}
            variant="outlined"
            sx={{
                mb: 2,
              "& label.Mui-focused": {
                color: "black",
              },
              "& .MuiInput-underline:after": {
                borderBottomColor: "#ffc107",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "black",
                },
                "&:hover fieldset": {
                  borderColor: "#ffc107",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#ffc107",
                },
              },
              "& .MuiOutlinedInput-input": {
                backgroundColor: "white",
                fontSize: "1.5rem",
                fontWeight: "bold",
              },
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Email"
            fullWidth
            disabled={!isEditing}
            defaultValue="email1@gmail.com"
            InputLabelProps={{
              style: { color: "black", fontSize: "1.5rem", fontWeight: "bold" },
            }}
            InputProps={{
              style: { color: "black", fontSize: "1.5rem", fontWeight: "bold" },
            }}
            variant="outlined"
            sx={{
                mb: 2,
              "& label.Mui-focused": {
                color: "black",
              },
              "& .MuiInput-underline:after": {
                borderBottomColor: "#ffc107",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "black",
                },
                "&:hover fieldset": {
                  borderColor: "#ffc107",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#ffc107",
                },
              },
              "& .MuiOutlinedInput-input": {
                backgroundColor: "white",
                fontSize: "1.5rem",
                fontWeight: "bold",
              },
            }}
          />
        </Grid>

      </Grid>

      {isEditing ? (
        <Button
          variant="contained"
          onClick={handleSaveClick}
          sx={{
            bgcolor: "#e0a800",
            color: "white",
            ":hover": { bgcolor: "#ffc107", color: "black" },
            mt: 2,
          }}
        >
          Save
        </Button>
      ) : (
        <Button
          variant="contained"
          onClick={handleEditClick}
          sx={{
            bgcolor: "#e0a800",
            color: "white",
            ":hover": { bgcolor: "#ffc107", color: "black" },
            mt: 2,
          }}
        >
          Edit
        </Button>
      )}
    </Box>
  );
};

export default RestaurantInfo;
