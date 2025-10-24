// react
import React, { useState, useEffect } from 'react';

// mui
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

// styles
import styles from './styles';

const MusicFiltersSection = ({ onFilterChange, initialFilters, albums }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [filters, setFilters] = useState({
    search: initialFilters?.search || '',
    albumId: initialFilters?.albumId || '',
  });

  // ✅ Sync when filters change externally
  useEffect(() => {
    setFilters({
      search: initialFilters?.search || '',
      albumId: initialFilters?.albumId || '',
    });
  }, [initialFilters]);

  // ✅ Auto trigger when album changes
  useEffect(() => {
    onFilterChange({ ...filters, trigger: 'auto' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.albumId]);

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
    const reset = { search: '', albumId: '' };
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
            label="Search Music"
            name="search"
            value={filters.search}
            onChange={handleChange}
            onKeyDown={handleKeyPress}
            size="small"
            sx={styles.textField}
            placeholder="Search by title"
          />
          <FormControl fullWidth size="small" sx={styles.albumSelect}>
            <InputLabel>Album</InputLabel>
            <Select
              label="Album"
              name="albumId"
              value={filters.albumId}
              onChange={handleChange}
            >
              <MenuItem value="">All Albums</MenuItem>
              {albums?.map((album) => (
                <MenuItem key={album.id} value={album.id}>
                  {album.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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
          <Grid item xs={12} sm={6} md={5}>
            <TextField
              fullWidth
              label="Search Music"
              name="search"
              value={filters.search}
              onChange={handleChange}
              onKeyDown={handleKeyPress}
              size="small"
              sx={styles.textField}
              placeholder="Search by title"
            />
          </Grid>
          <Grid item xs={12} sm={4} md={3}>
            <FormControl fullWidth size="small" sx={styles.albumSelect}>
              <InputLabel>Album</InputLabel>
              <Select
                label="Album"
                name="albumId"
                value={filters.albumId}
                onChange={handleChange}
              >
                <MenuItem value="">All Albums</MenuItem>
                {albums?.map((album) => (
                  <MenuItem key={album.id} value={album.id}>
                    {album.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={2} md={2}>
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

export default React.memo(MusicFiltersSection);
