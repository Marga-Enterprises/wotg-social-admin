// LoginPage/style.js

const styles = {
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100svh',
    flexWrap: 'wrap',
    backgroundColor: '#CF4444',
  },
  brandingContainer: {
    width: 500,
  },
  title: {
    fontFamily: 'Orbitron, sans-serif',
    fontWeight: 'bold',
    color: '#fff',
    fontSize: '2.5rem',
    mb: 4,
  },
  subtitle: {
    mb: 4,
  },
  formContainer: {
    width: 450,
  },
  paper: {
    p: 4,
    borderRadius: 3,
    border: '1px solid #ccc',
    height: '500px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
    mt: 6,
  },
  loginButton: {
    borderRadius: 5,
    textTransform: 'none',
    py: 1,
    fontWeight: 'bold',
    fontSize: '1rem',
    '&:hover': {
      backgroundColor: 'darkred',
      color: 'white',
    },
  },
};

export default styles;
