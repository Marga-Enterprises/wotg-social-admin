// react
import React, { useState, useEffect } from 'react';

// mui
import {
  Box,
  Grid,
  TextField,
  Button,
  Stack,
  useMediaQuery,
  useTheme,
} from '@mui/material';

// styles
import styles from './styles';

const AlbumFiltersSection = ({ onFilterChange, initialFilters }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [search, setSearch] = useState(initialFilters?.search || '');

  // ✅ Sync when filters change externally
  useEffect(() => {
    setSearch(initialFilters?.search || '');
  }, [initialFilters]);

  const handleSearchClick = () => {
    onFilterChange({ search, trigger: 'manual' });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSearchClick();
  };

  const handleReset = () => {
    setSearch('');
    onFilterChange({ search: '', trigger: 'reset' });
  };

  return (
    <Box sx={styles.container}>
      {isMobile ? (
        // 📱 STACKED (MOBILE)
        <Stack spacing={1} sx={{ width: '100%' }}>
          <TextField
            fullWidth
            label="Search Albums"
            name="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyPress}
            size="small"
            sx={styles.textField}
            placeholder="Search by album title"
          />

          <Stack direction="row" spacing={1}>
            <Button
              fullWidth
              variant="contained"
              onClick={handleSearchClick}
              sx={styles.searchButton}
            >
              Search
            </Button>
            <Button
              fullWidth
              variant="outlined"
              color="error"
              onClick={handleReset}
              sx={styles.resetButton}
            >
              Reset
            </Button>
          </Stack>
        </Stack>
      ) : (
        // 💻 INLINE (DESKTOP)
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={8} md={6}>
            <TextField
              fullWidth
              label="Search Albums"
              name="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleKeyPress}
              size="small"
              sx={styles.textField}
              placeholder="Search by album title"
            />
          </Grid>
          <Grid item xs={12} sm={4} md={3}>
            <Stack direction="row" spacing={1} justifyContent="flex-end">
              <Button
                variant="contained"
                onClick={handleSearchClick}
                sx={styles.searchButton}
              >
                Search
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={handleReset}
                sx={styles.resetButton}
              >
                Reset
              </Button>
            </Stack>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default React.memo(AlbumFiltersSection);
