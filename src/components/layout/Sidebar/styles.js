const styles = {
  // 🔸 Drawer Container
  drawerPaper: {
    width: 270,
    background: 'linear-gradient(180deg, #fff, #fef3f3)',
    borderRight: '1px solid rgba(0,0,0,0.05)',
    boxShadow: '4px 0 20px rgba(0,0,0,0.05)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },

  // 🔸 Header
  headerBox: {
    textAlign: 'center',
    py: 3,
  },
  logo: {
    width: 100,
    height: 'auto',
    objectFit: 'contain',
    mb: 1,
    transition: 'transform 0.3s ease',
    '&:hover': { transform: 'scale(1.05)' },
  },
  logoText: {
    fontWeight: 700,
    fontSize: '1.1rem',
    color: '#b71c1c',
    letterSpacing: '0.5px',
  },
  headerDivider: {
    mb: 2,
    borderColor: 'rgba(0,0,0,0.08)',
  },

  // 🔸 Menu
  menuList: {
    flexGrow: 1,
    px: 1,
  },
  listButton: {
    borderRadius: '10px',
    mx: 1,
    my: 0.5,
    transition: 'all 0.25s ease',
    '&:hover': {
      backgroundColor: 'rgba(211,47,47,0.08)',
      transform: 'translateX(4px)',
    },
  },
  listIcon: {
    color: '#b71c1c',
    minWidth: 42,
    '& svg': {
      fontSize: 22,
    },
  },
  listText: {
    fontWeight: 500,
    color: '#333',
    letterSpacing: '0.3px',
  },

  // 🔸 Dividers
  sectionDivider: {
    mt: 2,
    mb: 1,
    borderColor: 'rgba(0,0,0,0.08)',
  },

  // 🔸 Logout Section
  logoutBox: {
    mb: 2,
    px: 1,
  },
  logoutButton: {
    borderRadius: '10px',
    mx: 1,
    py: 1,
    transition: 'all 0.25s ease',
    backgroundColor: 'rgba(211,47,47,0.05)',
    '&:hover': {
      backgroundColor: 'rgba(211,47,47,0.15)',
      transform: 'translateX(4px)',
    },
  },
  logoutIconBox: {
    color: '#d32f2f',
    minWidth: 42,
    '& svg': {
      fontSize: 22,
    },
  },
  logoutText: {
    fontWeight: 600,
    color: '#b71c1c',
  },
};

export default styles;
