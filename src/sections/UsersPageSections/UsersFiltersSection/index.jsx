import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Stack,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import styles from './styles';

const UsersFiltersSection = ({ onFilterChange, initialFilters }) => {
  const today = new Date().toISOString().split('T')[0];
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [filters, setFilters] = useState({
    search: initialFilters?.search || '',
    guestAccount: initialFilters?.guestAccount || 'both',
    dateFrom: initialFilters?.dateFrom || today,
    dateTo: initialFilters?.dateTo || today,
  });

  useEffect(() => {
    setFilters({
      search: initialFilters?.search || '',
      guestAccount: initialFilters?.guestAccount || 'both',
      dateFrom: initialFilters?.dateFrom || today,
      dateTo: initialFilters?.dateTo || today,
    });
  }, [initialFilters, today]);

  useEffect(() => {
    onFilterChange({ ...filters, trigger: 'auto' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.guestAccount, filters.dateFrom, filters.dateTo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearchClick = () => {
    onFilterChange({ ...filters, trigger: 'manual' });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSearchClick();
  };

  const handleReset = () => {
    const reset = {
      search: '',
      guestAccount: 'both',
      dateFrom: today,
      dateTo: today,
    };
    setFilters(reset);
    onFilterChange({ ...reset, trigger: 'reset' });
  };

  return (
    <Box sx={styles.container}>
      {isMobile ? (
        // 📱 STACKED (MOBILE)
        <Stack spacing={1} sx={{ width: '100%' }}>
          <TextField
            fullWidth
            label="Search"
            name="search"
            value={filters.search}
            onChange={handleChange}
            onKeyDown={handleKeyPress}
            size="small"
            sx={styles.textField}
          />
          <FormControl fullWidth size="small" sx={styles.textField}>
            <InputLabel>Account Type</InputLabel>
            <Select
              label="Account Type"
              name="guestAccount"
              value={filters.guestAccount}
              onChange={handleChange}
            >
              <MenuItem value="both">Both</MenuItem>
              <MenuItem value="guest">Guest Only</MenuItem>
              <MenuItem value="nonguest">Non-Guest</MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="From"
            type="date"
            name="dateFrom"
            value={filters.dateFrom}
            onChange={handleChange}
            size="small"
            InputLabelProps={{ shrink: true }}
            sx={styles.textField}
          />
          <TextField
            fullWidth
            label="To"
            type="date"
            name="dateTo"
            value={filters.dateTo}
            onChange={handleChange}
            size="small"
            InputLabelProps={{ shrink: true }}
            sx={styles.textField}
          />
          <Stack direction="row" spacing={1}>
            <Button fullWidth variant="contained" onClick={handleSearchClick} sx={styles.searchButton}>
              Search
            </Button>
            <Button fullWidth variant="outlined" color="error" onClick={handleReset} sx={styles.resetButton}>
              Reset
            </Button>
          </Stack>
        </Stack>
      ) : (
        // 💻 INLINE (DESKTOP)
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={4} md={3}>
            <TextField
              fullWidth
              label="Search"
              name="search"
              value={filters.search}
              onChange={handleChange}
              onKeyDown={handleKeyPress}
              size="small"
              sx={styles.textField}
            />
          </Grid>
          <Grid item xs={12} sm={3} md={2}>
            <FormControl fullWidth size="small" sx={styles.textField}>
              <InputLabel>Account Type</InputLabel>
              <Select
                label="Account Type"
                name="guestAccount"
                value={filters.guestAccount}
                onChange={handleChange}
              >
                <MenuItem value="both">Both</MenuItem>
                <MenuItem value="guest">Guest Only</MenuItem>
                <MenuItem value="nonguest">Non-Guest</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={2} md={2}>
            <TextField
              fullWidth
              label="From"
              type="date"
              name="dateFrom"
              value={filters.dateFrom}
              onChange={handleChange}
              size="small"
              InputLabelProps={{ shrink: true }}
              sx={styles.textField}
            />
          </Grid>
          <Grid item xs={12} sm={2} md={2}>
            <TextField
              fullWidth
              label="To"
              type="date"
              name="dateTo"
              value={filters.dateTo}
              onChange={handleChange}
              size="small"
              InputLabelProps={{ shrink: true }}
              sx={styles.textField}
            />
          </Grid>
          <Grid item xs={12} sm={3} md={3}>
            <Stack direction="row" spacing={1} justifyContent="flex-end">
              <Button variant="contained" onClick={handleSearchClick} sx={styles.searchButton}>
                Search
              </Button>
              <Button variant="outlined" color="error" onClick={handleReset} sx={styles.resetButton}>
                Reset
              </Button>
            </Stack>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default React.memo(UsersFiltersSection);
