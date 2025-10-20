import React, { useState, useEffect } from 'react';
import {
  Box,
  Stack,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from '@mui/material';
import styles from './styles';

const UsersFiltersSection = ({ onFilterChange, initialFilters }) => {
  // 🗓️ Default date = today's date (YYYY-MM-DD)
  const today = new Date().toISOString().split('T')[0];

  const [filters, setFilters] = useState({
    search: initialFilters?.search || '',
    guestAccount: initialFilters?.guestAccount || 'both',
    dateFrom: initialFilters?.dateFrom || today,
    dateTo: initialFilters?.dateTo || today,
  });

  // ✅ Sync state when URL filters change
  useEffect(() => {
    setFilters({
      search: initialFilters?.search || '',
      guestAccount: initialFilters?.guestAccount || 'both',
      dateFrom: initialFilters?.dateFrom || today,
      dateTo: initialFilters?.dateTo || today,
    });
  }, [initialFilters, today]);

  // ✅ Auto-trigger when other filters change
  useEffect(() => {
    onFilterChange({
      ...filters,
      trigger: 'auto',
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.guestAccount, filters.dateFrom, filters.dateTo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearchClick = () => {
    onFilterChange({ ...filters, trigger: 'manual' });
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
    <Box sx={styles.root}>
      <Stack
        direction="row"
        spacing={2}
        rowGap={2}
        columnGap={2}
        flexWrap="wrap"
        alignItems="flex-start"
      >
        {/* 🔍 Search + Button */}
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={1}
          alignItems="center"
          sx={{ flex: '1 1 260px', minWidth: 240 }}
        >
          <TextField
            label="Search"
            name="search"
            value={filters.search}
            onChange={handleChange}
            placeholder="Search by name or email"
            variant="outlined"
            size="small"
            sx={styles.searchField}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSearchClick}
            sx={styles.searchButton}
          >
            Search
          </Button>
        </Stack>

        {/* 👤 Account Type */}
        <FormControl size="small" sx={styles.selectField}>
          <InputLabel>Account Type</InputLabel>
          <Select
            label="Account Type"
            name="guestAccount"
            value={filters.guestAccount}
            onChange={handleChange}
          >
            <MenuItem value="both">Both</MenuItem>
            <MenuItem value="guest">Guest Accounts Only</MenuItem>
            <MenuItem value="nonguest">Non-Guest Accounts</MenuItem>
          </Select>
        </FormControl>

        {/* 📅 Date Range */}
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={1}
          sx={styles.dateRangeGroup}
        >
          <TextField
            label="From"
            type="date"
            name="dateFrom"
            value={filters.dateFrom}
            onChange={handleChange}
            size="small"
            sx={styles.dateField}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="To"
            type="date"
            name="dateTo"
            value={filters.dateTo}
            onChange={handleChange}
            size="small"
            sx={styles.dateField}
            InputLabelProps={{ shrink: true }}
          />
        </Stack>

        {/* 🔁 Reset Button */}
        <Button
          variant="outlined"
          color="error"
          onClick={handleReset}
          sx={styles.resetButton}
        >
          Reset
        </Button>
      </Stack>
    </Box>
  );
};

export default React.memo(UsersFiltersSection);
