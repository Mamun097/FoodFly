import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
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

function SignIn() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
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
          top: "35%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          border: "2px solid white", // Add a border around the main container
          borderRadius: "8px", // Optional: Add some border radius for a rounded appearance
          marginTop: "70px", // Optional: Add some top margin
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
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              InputProps={{
                style: {
                  color: "white",
                  backgroundColor: "black", // Set background color to black
                },
              }}
              InputLabelProps={{ style: { color: "white" } }}
              variant="outlined"
              sx={{
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
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              InputProps={{ style: { color: "white" } }}
              InputLabelProps={{ style: { color: "white" } }}
              variant="outlined"
              //make the outline color white all the time
              sx={{
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
                mt: 3,
                mb: 2,
                bgcolor: "#e0a800",
                color: "white",
                ":hover": { bgcolor: "#ffc107", color: "black" },
              }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="#" variant="body1">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Box sx={{ mt: 4 }} />
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default SignIn;
