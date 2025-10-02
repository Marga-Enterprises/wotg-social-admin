const styles = {
  root: {
    p: { xs: 2, sm: 3 },
  },

  header: {
    direction: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    mb: 2,
  },

  addButton: {
    fontWeight: 'bold',
    textTransform: 'none',
    borderRadius: 2,
    px: 2,
    py: 1,
    fontSize: {
      xs: '12px',
      sm: '13px',
      md: '14px',
    },
  },

  tableContainer: {
    borderRadius: 2,
    overflow: 'hidden',
    boxShadow: 2,
    width: '100%',
    overflowX: 'auto',
    border: '1px solid #e0e0e0',
    '@media (max-width: 600px)': {
      boxShadow: 'none',
    },
  },

  tableHeadCell: {
    fontWeight: 'bold',
    backgroundColor: '#f4f6f8',
    border: '1px solid #e0e0e0',
    fontSize: {
      xs: '12px',
      sm: '13px',
      md: '14px',
    },
    padding: '12px 16px',
    whiteSpace: 'nowrap',
  },

  tableBodyCell: {
    fontSize: {
      xs: '12px',
      sm: '13px',
      md: '14px',
    },
    border: '1px solid #e0e0e0',
    padding: '16px',
    verticalAlign: 'middle',
    whiteSpace: 'normal',
  },

  mediaCell: {
    minWidth: 200,
    minHeight: 140,
    textAlign: 'center',
  },

  mediaPreview: {
    width: { xs: '100%', sm: 240, md: 320 },
    height: { xs: 160, sm: 180, md: 200 },
    borderRadius: 2,
    objectFit: 'cover',
    display: 'block',
    margin: '0 auto',
  },

  selectStatus: {
    minWidth: 120,
    textTransform: 'capitalize',
    fontSize: {
      xs: '12px',
      sm: '13px',
      md: '14px',
    },
  },

  pagination: {
    mt: 3,
    display: 'flex',
    justifyContent: 'center',
  },
};

export default styles;
