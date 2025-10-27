// react
import { useState, useRef } from 'react';

// redux
import { useDispatch } from 'react-redux';
import { marga } from '@redux/combineActions';

// components
import LoadingScreen from '@components/common/LoadingScreen';
import SnackbarAlert from '@components/common/SnackbarAlert';

// react-router
import { useNavigate } from 'react-router-dom';

// mui
import {
  Container,
  Box,
  Paper,
  Typography,
  TextField,
  Button,
} from '@mui/material';

// styles
import styles from './styles';
import '@fontsource/orbitron';

const Page = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loadingRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('success');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (loadingRef.current) return;
    loadingRef.current = true;
    setLoading(true);

    dispatch(marga.user.loginAction(formData)).then((res) => {
      if (res.success) {
        navigate('/');
      } else {
        setOpenSnackbar(true);
        setMessage(res.payload);
        setSeverity('error');
      }
    }).finally(() => {
      setLoading(false);
      loadingRef.current = false;
    });
  };

  if (loading) return <LoadingScreen />;

  return (
    <Box sx={styles.root}>
      <Container sx={styles.brandingContainer}>
        <Typography variant="h2" textAlign="center" sx={styles.title}>
          WOTG Management
        </Typography>
        <Typography variant="h5" textAlign="center" sx={styles.subtitle}>
          Please login to continue
        </Typography>
      </Container>

      <Container sx={styles.formContainer}>
        <Paper elevation={0} sx={styles.paper}>
          <Box
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
            sx={styles.form}
          >
            <Typography variant="h5" textAlign="center" gutterBottom>
              Login
            </Typography>

            <TextField
              label="Username"
              type="text"
              name="email"
              fullWidth
              required
              onChange={handleChange}
            />

            <TextField
              label="Password"
              type="password"
              name="password"
              fullWidth
              required
              onChange={handleChange}
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              sx={styles.loginButton}
            >
              Login
            </Button>
          </Box>
        </Paper>
      </Container>

      <SnackbarAlert
        open={openSnackbar}
        onClose={() => setOpenSnackbar(false)}
        message={message}
        severity={severity}
        duration={3000}
      />
    </Box>
  );
};

export default Page;
