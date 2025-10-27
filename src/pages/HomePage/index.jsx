import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import options from './options';
import styles from './styles';

const Page = () => {
  const { user } = useSelector((state) => state.marga);
  const role = user?.user_role || user?.user?.user_role;

  return (
    <Box sx={styles.outerBox}>
      <Box sx={styles.headerBox}>
        <Typography variant="h4" sx={styles.headerTitle}>
          Welcome{user ? `, ${user.user_fname || user.user?.user_fname}` : ' User'} to your dashboard
        </Typography>
        <Typography variant="body1" sx={styles.headerSubtitle}>
          Choose a section below to manage your content
        </Typography>
      </Box>

      <Box sx={styles.wrapperBox}>
        {options.map((option, index) => {
          const Icon = option.icon;

          // ✅ For non-admin/non-owner: only "Users" is active
          const isRestricted =
            !(role === 'admin' || role === 'owner') && option.label !== 'Users';

          return (
            <Box
              key={index}
              component={Link}
              to={isRestricted ? '#' : option.path}
              sx={[styles.cardBox, isRestricted && styles.cardBoxDisabled]}
            >
              <Icon sx={styles.cardIcon} />
              <Typography variant="h6" sx={styles.cardLabel}>
                {option.label}
              </Typography>

              {isRestricted && (
                <Typography
                  variant="caption"
                  sx={{
                    color: 'rgba(255,255,255,0.8)',
                    fontStyle: 'italic',
                    mt: 0.5,
                  }}
                >
                  Access restricted
                </Typography>
              )}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default Page;
