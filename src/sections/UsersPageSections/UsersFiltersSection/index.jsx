// react
import React, { useState, useEffect } from 'react';

// mui
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

// styles
import styles from './styles';

const UsersFiltersSection = ({ onFilterChange, initialFilters }) => {
  const [filters, setFilters] = useState({
    search: initialFilters?.search || '',
    guestAccount: initialFilters?.guestAccount || 'both',
    dateFrom: initialFilters?.dateFrom || '',
    dateTo: initialFilters?.dateTo || '',
  });

  // ✅ Sync state if URL filters change
  useEffect(() => {
    setFilters({
      search: initialFilters?.search || '',
      guestAccount: initialFilters?.guestAccount || 'both',
      dateFrom: initialFilters?.dateFrom || '',
      dateTo: initialFilters?.dateTo || '',
    });
  }, [initialFilters]);

  // ✅ Trigger for filters (except search)
  useEffect(() => {
    onFilterChange({
      search: filters.search,
      guestAccount: filters.guestAccount,
      dateFrom: filters.dateFrom,
      dateTo: filters.dateTo,
      trigger: 'auto',
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.guestAccount, filters.dateFrom, filters.dateTo]);

  // ✅ Handle all field updates
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Search only triggers manually
  const handleSearchClick = () => {
    onFilterChange({ ...filters, trigger: 'manual' });
  };

  // ✅ Reset all filters
  const handleReset = () => {
    const reset = {
      search: '',
      guestAccount: 'both',
      dateFrom: '',
      dateTo: '',
    };
    setFilters(reset);
    onFilterChange({ ...reset, trigger: 'reset' });
  };

  return (
    <Box sx={styles.root}>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        alignItems="center"
        flexWrap="wrap"
      >
        {/* 🔍 Search */}
        <Stack direction="row" spacing={1} alignItems="center">
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

        {/* 👤 Guest Filter */}
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
