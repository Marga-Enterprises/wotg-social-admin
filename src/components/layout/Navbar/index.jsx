// mui imports
import { AppBar, Toolbar, IconButton, Box } from '@mui/material';

// mui icons
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = ({ onMenuClick }) => {
  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: 'darkred', // 🔴 changed background to dark red
        borderBottom: '1px solid rgb(199, 199, 199)',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Logo on the left */}
        <Box
          component="img"
          src="https://wotg.sgp1.cdn.digitaloceanspaces.com/images/WOTG_logo2.webp"
          alt="Marga Logo"
          sx={{
            height: 60,
            objectFit: 'contain',
          }}
        />

        {/* Menu icon on the right */}
        <IconButton
          edge="end"
          onClick={onMenuClick}
          sx={{ color: '#fff' }} // make icon white for contrast
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
