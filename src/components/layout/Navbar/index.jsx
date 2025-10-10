// mui imports
import { AppBar, Toolbar, IconButton, Box } from '@mui/material';

// mui icons
import MenuIcon from '@mui/icons-material/Menu';

// styles
import styles from './styles.js';

const Navbar = ({ onMenuClick }) => {
  return (
    <AppBar position="static" elevation={0} sx={styles.appBar}>
      <Toolbar sx={styles.toolbar}>
        {/* Logo on the left */}
        <Box
          component="img"
          src="https://wotg.sgp1.cdn.digitaloceanspaces.com/images/WOTG_logo2.webp"
          alt="BreadHub Logo"
          sx={styles.logo}
        />

        {/* Menu icon on the right */}
        <IconButton edge="end" onClick={onMenuClick} sx={styles.menuButton}>
          <MenuIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
