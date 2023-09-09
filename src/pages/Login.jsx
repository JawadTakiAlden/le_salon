import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Formik } from 'formik';
import * as Yup from 'yup'
import { request } from '../api/request';
import { useMutation } from '@tanstack/react-query';
import { login, useJawadAuthController } from '../context';
import { useNavigate } from 'react-router';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

const loginUser = (values) => {
  return request({
    url : '/login',
    method : "post",
    data : values
  })
}

export default function SignIn() {

  const [ , dispatch] = useJawadAuthController()
  const navigate = useNavigate()

  const handleLoginSubmit = (values) => {
    loginUserMutation.mutate(values)
  };

  const loginUserMutation = useMutation({
    mutationKey : ['login-user-in-server'],
    mutationFn : loginUser,
    onSuccess : (data) => {
      login(dispatch , {
        token : data.data.token,
        user : data.data.user
      })
      navigate('/')
    }
  })


  if(loginUserMutation.isLoading){
    return "loading ..."
  }


  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box sx={{ mt: 1 }}>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleLoginSubmit}
            >
              {
                ({
                  values,
                  errors,
                  touched,
                  handleBlur,
                  handleChange,
                  handleSubmit,
                  setFieldValue
                }) => (
                  <form onSubmit={handleSubmit}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={!!errors.email && !!touched.email}
                      helperText={errors.email && touched.email}
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      autoFocus
                    />
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={!!errors.password && !!touched.password}
                      helperText={errors.password && touched.password}
                      autoComplete="current-password"
                    />
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Sign In
                    </Button>
                  </form>
                )
              }
              
            </Formik>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}

const initialValues = {
  email : '',
  password : ''
}
const validationSchema = Yup.object({
  email : Yup.string().email().required('email field is required'),
  password : Yup.string().min(7).max(16).required('password field is required')
})