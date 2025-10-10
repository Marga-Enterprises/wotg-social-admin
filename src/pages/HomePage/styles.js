const styles = {
  outerBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: '100%',
    background: 'linear-gradient(135deg, #fff5f5, #ffeaea)',
    px: 3,
    py: 8,
  },

  // 🟥 Header Section
  headerBox: {
    textAlign: 'center',
    marginBottom: '3rem',
  },
  headerTitle: {
    fontWeight: 700,
    color: '#b71c1c',
    fontSize: '2.2rem',
    letterSpacing: '-0.3px',
  },
  headerSubtitle: {
    color: '#555',
    fontSize: '1rem',
    marginTop: '0.5rem',
  },

  // 🟥 Card Grid
  wrapperBox: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '2.5rem',
    width: '100%',
    maxWidth: 1200,
  },

  // 🟥 Each Card
  cardBox: {
    flex: '1 1 280px',
    minWidth: 260,
    maxWidth: 360,
    height: 200,
    background: 'linear-gradient(135deg, #d32f2f, #ef5350)',
    color: '#fff',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textDecoration: 'none',
    borderRadius: '16px',
    boxShadow: '0 8px 20px rgba(211, 47, 47, 0.25)',
    transition: 'all 0.35s ease',
    position: 'relative',
    overflow: 'hidden',
    cursor: 'pointer',

    '&:before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background:
        'radial-gradient(circle at 30% 20%, rgba(255,255,255,0.25), transparent 60%)',
      opacity: 0,
      transition: 'opacity 0.3s ease',
    },

    '&:hover': {
      transform: 'translateY(-6px) scale(1.03)',
      boxShadow: '0 12px 30px rgba(211, 47, 47, 0.4)',
      '&:before': {
        opacity: 1,
      },
    },

    '&:active': {
      transform: 'scale(0.98)',
      boxShadow: '0 4px 10px rgba(211, 47, 47, 0.25)',
    },
  },

  // 🟥 Icon & Label Styling
  cardIcon: {
    fontSize: 60,
    opacity: 0.95,
    transition: 'transform 0.3s ease, opacity 0.3s ease',
    '&:hover': {
      transform: 'scale(1.1)',
      opacity: 1,
    },
  },
  cardLabel: {
    marginTop: '1rem',
    fontWeight: 600,
    letterSpacing: '0.5px',
    fontSize: '1.1rem',
  },
};

export default styles;
