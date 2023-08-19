import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontSize: 20
  },
  palette: {
    type: 'dark',
    background: {
      default: '#000000',
    },
    text: {
      primary: '#ffffff',
    },
  },
});

export default function SignUp() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      name: data.get('name'),
      address: data.get('address'),
      email: data.get('email'),
      phone: data.get('phone'),
      password: data.get('password'),
      confirmPassword: data.get('confirmPassword'),
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          position: "absolute",
          top: "47%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          border: "2px solid white", // Add a border around the main container
          borderRadius: "8px", // Optional: Add some border radius for a rounded appearance
          marginTop: "20px", // Optional: Add some top margin
        }}
      >
        <Box
          sx={{
            marginTop: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "#ffc107" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <TextField
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="off"
              InputProps={{ style: { color: "white" } }}
              InputLabelProps={{ style: { color: "white" } }}
              variant="outlined"
              sx={{
                mb: 1.5,
                "& label.Mui-focused": {
                  color: "white",
                },
                "& .MuiInput-underline:after": {
                  borderBottomColor: "#ffc107", // Change focus color to gold
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "white",
                  },
                  "&:hover fieldset": {
                    borderColor: "#ffc107",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#ffc107", // Change focused border color to gold
                  },
                },
                "& .MuiOutlinedInput-input": {
                  backgroundColor: "black",
                },
              }}
            />
            <TextField
              required
              fullWidth
              id="address"
              label="Address"
              name="address"
              autoComplete="off"
              InputProps={{ style: { color: "white" } }}
              InputLabelProps={{ style: { color: "white" } }}
              variant="outlined"
              sx={{
                mb: 1.5,
                "& label.Mui-focused": {
                  color: "white",
                },
                "& .MuiInput-underline:after": {
                  borderBottomColor: "#ffc107", // Change focus color to gold
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "white",
                  },
                  "&:hover fieldset": {
                    borderColor: "#ffc107",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#ffc107", // Change focused border color to gold
                  },
                },
                "& .MuiOutlinedInput-input": {
                  backgroundColor: "black",
                },
              }}
            />
            <TextField
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="off"
              InputProps={{ style: { color: "white" } }}
              InputLabelProps={{ style: { color: "white" } }}
              variant="outlined"
              sx={{
                mb: 1.5,
                "& label.Mui-focused": {
                  color: "white",
                },
                "& .MuiInput-underline:after": {
                  borderBottomColor: "#ffc107", // Change focus color to gold
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "white",
                  },
                  "&:hover fieldset": {
                    borderColor: "#ffc107",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#ffc107", // Change focused border color to gold
                  },
                },
                "& .MuiOutlinedInput-input": {
                  backgroundColor: "black",
                },
              }}
            />
            <TextField
              required
              fullWidth
              id="phone"
              label="Phone"
              name="phone"
              autoComplete="off"
              InputProps={{ style: { color: "white" } }}
              InputLabelProps={{ style: { color: "white" } }}
              variant="outlined"
              sx={{
                mb: 1.5,
                "& label.Mui-focused": {
                  color: "white",
                },
                "& .MuiInput-underline:after": {
                  borderBottomColor: "#ffc107", // Change focus color to gold
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "white",
                  },
                  "&:hover fieldset": {
                    borderColor: "#ffc107",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#ffc107", // Change focused border color to gold
                  },
                },
                "& .MuiOutlinedInput-input": {
                  backgroundColor: "black",
                },
              }}
            />
            <TextField
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="off"
              InputProps={{ style: { color: "white" } }}
              InputLabelProps={{ style: { color: "white" } }}
              variant="outlined"
              sx={{
                mb: 0,
                "& label.Mui-focused": {
                  color: "white",
                },
                "& .MuiInput-underline:after": {
                  borderBottomColor: "#ffc107", // Change focus color to gold
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "white",
                  },
                  "&:hover fieldset": {
                    borderColor: "#ffc107",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#ffc107", // Change focused border color to gold
                  },
                },
                "& .MuiOutlinedInput-input": {
                  backgroundColor: "black",
                },
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 4,
                mb: 1,
                bgcolor: "#e0a800",
                ":hover": { bgcolor: "#ffc107", color: "black" },
              }}
            >
              Sign Up
            </Button>
            <Link href="#" variant="body2">
              Already have an account? Sign in
            </Link>
            <Box sx={{ mt: 3 }} />
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
