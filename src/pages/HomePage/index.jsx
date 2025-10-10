// mui
import { Box, Typography } from '@mui/material';

// react router dom
import { Link } from 'react-router-dom';

// options
import options from './options';

// styles
import styles from './styles';

const Page = () => (
  <Box sx={styles.outerBox}>
    <Box sx={styles.headerBox}>
      <Typography variant="h4" sx={styles.headerTitle}>
        Welcome to Your Dashboard
      </Typography>
      <Typography variant="body1" sx={styles.headerSubtitle}>
        Choose a section below to manage your content
      </Typography>
    </Box>

    <Box sx={styles.wrapperBox}>
      {options.map((option, index) => {
        const Icon = option.icon;
        return (
          <Box
            key={index}
            component={Link}
            to={option.path}
            sx={styles.cardBox}
          >
            <Icon sx={styles.cardIcon} />
            <Typography variant="h6" sx={styles.cardLabel}>
              {option.label}
            </Typography>
          </Box>
        );
      })}
    </Box>
  </Box>
);

export default Page;
