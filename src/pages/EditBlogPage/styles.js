const styles = {
  container: {
    padding: '32px',
    backgroundColor: '#fafafa',
    minHeight: '100%',
  },

  // 🔙 Back Header Section
  backHeader: {
    mb: 3,
  },
  backButton: {
    color: '#b71c1c',
    backgroundColor: '#fff',
    border: '1px solid #e0e0e0',
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
    transition: 'all 0.25s ease',
    '&:hover': {
      backgroundColor: '#fff5f5',
      transform: 'translateX(-2px)',
      boxShadow: '0 4px 10px rgba(211,47,47,0.25)',
    },
  },
  backTitle: {
    fontWeight: 700,
    color: '#b71c1c',
    letterSpacing: '-0.3px',
  },
};

export default styles;
