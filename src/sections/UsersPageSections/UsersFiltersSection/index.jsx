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

  // ✅ run only when filters object actually changes (deep compare workaround)
  useEffect(() => {
    onFilterChange({ ...filters });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.search, filters.guestAccount, filters.dateFrom, filters.dateTo]);

  // ✅ make sure setFilters always runs with a new reference
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => {
      const updated = { ...prev, [name]: value };
      return updated;
    });
  };

  const handleReset = () => {
    const reset = {
      search: '',
      guestAccount: 'both',
      dateFrom: '',
      dateTo: '',
    };
    setFilters(reset);
  };

  return (
    <Box sx={styles.root}>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center" flexWrap="wrap">
        {/* 🔍 Search */}
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

        <Button variant="outlined" color="error" onClick={handleReset} sx={styles.resetButton}>
          Reset
        </Button>
      </Stack>
    </Box>
  );
};

export default React.memo(UsersFiltersSection);
