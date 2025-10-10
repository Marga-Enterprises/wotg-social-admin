// mui imports
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
  Typography,
} from '@mui/material';

// options
import options from './options';

// styles
import styles from './styles';

// mui icons
import LogoutIcon from '@mui/icons-material/Logout';

// react router dom
import { Link } from 'react-router-dom';

// redux imports
import { useDispatch } from 'react-redux';
import { marga } from '@redux/combineActions';

const Sidebar = ({ open, onClose }) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(marga.user.logoutAction());
    onClose();
    window.location.href = '/login';
  };

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: styles.drawerPaper,
      }}
    >
      {/* 🔴 Sidebar Header */}
      <Box sx={styles.headerBox}>
        <Typography sx={styles.logoText}>WOTG Admin</Typography>
      </Box>

      <Divider sx={styles.headerDivider} />

      {/* 🔸 Menu Options */}
      <List sx={styles.menuList}>
        {options.map((option, index) => {
          const Icon = option.icon;
          return (
            <ListItem key={index} disablePadding>
              <ListItemButton
                component={Link}
                to={option.path}
                onClick={onClose}
                sx={styles.listButton}
              >
                <ListItemIcon sx={styles.listIcon}>
                  <Icon />
                </ListItemIcon>
                <ListItemText
                  primary={option.label}
                  primaryTypographyProps={{ sx: styles.listText }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      <Divider sx={styles.sectionDivider} />

      {/* 🚪 Logout Section */}
      <Box sx={styles.logoutBox}>
        <ListItem disablePadding>
          <ListItemButton onClick={handleLogout} sx={styles.logoutButton}>
            <ListItemIcon sx={styles.logoutIconBox}>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText
              primary="Logout"
              primaryTypographyProps={{ sx: styles.logoutText }}
            />
          </ListItemButton>
        </ListItem>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
