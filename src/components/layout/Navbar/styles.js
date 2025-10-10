const styles = {
  appBar: {
    background: 'linear-gradient(135deg, #b71c1c, #d32f2f)', // 🔴 deep-to-bright red gradient
    borderBottom: '1px solid rgba(255,255,255,0.15)',
    boxShadow: '0 2px 12px rgba(211, 47, 47, 0.3)',
    backdropFilter: 'blur(6px)',
    zIndex: 1100,
  },

  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    px: { xs: 2, sm: 4, md: 6 },
    py: 1,
    minHeight: '72px',
  },

  logo: {
    height: 58,
    objectFit: 'contain',
    cursor: 'pointer',
    transition: 'transform 0.3s ease, opacity 0.3s ease',
    '&:hover': {
      transform: 'scale(1.05)',
      opacity: 0.9,
    },
  },

  menuButton: {
    color: '#fff',
    transition: 'all 0.3s ease',
    '&:hover': {
      color: '#ffebee',
      transform: 'scale(1.1)',
    },
  },
};

export default styles;
