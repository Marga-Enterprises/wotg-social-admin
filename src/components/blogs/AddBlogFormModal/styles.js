const styles = {
  // 🔶 Dialog Container
  dialogPaper: {
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
    backgroundColor: '#ffffff',
  },

  // 🔶 Header
  dialogTitle: {
    fontWeight: 700,
    fontSize: '1.6rem',
    color: '#b71c1c',
    textAlign: 'center',
    py: 2,
    letterSpacing: '-0.3px',
  },
  divider: {
    borderColor: 'rgba(0,0,0,0.08)',
  },

  // 🔶 Content Area
  dialogContent: {
    py: 4,
    px: 3,
    backgroundColor: '#fffdfd',
  },

  // 🔶 Typography
  sectionLabel: {
    fontWeight: 600,
    fontSize: '1rem',
    mb: 1,
    color: '#333',
  },

  // 🔶 Input Fields
  textField: {
    backgroundColor: '#fafafa',
    borderRadius: '8px',
    '& .MuiOutlinedInput-root': {
      '& fieldset': { borderColor: '#ddd' },
      '&:hover fieldset': { borderColor: '#b71c1c' },
      '&.Mui-focused fieldset': { borderColor: '#d32f2f' },
    },
  },

  // 🔶 Editors
  editorIntro: {
    height: 300,
    menubar: false,
    plugins: ['lists', 'link', 'wordcount'],
    toolbar:
      'undo redo | formatselect | bold italic underline | bullist numlist | link | removeformat',
    content_style:
      'body { font-family: Inter, sans-serif; font-size: 15px; line-height: 1.6; color:#333; padding: 10px; background-color: #fff; }',
  },
  editorBody: {
    height: 400,
    menubar: true,
    plugins: [
      'advlist autolink lists link image charmap preview anchor',
      'searchreplace visualblocks code fullscreen',
      'insertdatetime media table paste code help wordcount',
    ],
    toolbar:
      'undo redo | styleselect | bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist | link image | removeformat',
    content_style:
      'body { font-family: Inter, sans-serif; font-size: 15px; line-height: 1.6; color:#333; padding: 12px; background-color: #fff; }',
  },

  // 🔶 Upload Section
  uploadBox: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    mt: 1,
  },
  uploadBtn: {
    borderRadius: '8px',
    fontWeight: 600,
    textTransform: 'none',
    borderColor: '#ccc',
    color: '#b71c1c',
    '&:hover': {
      borderColor: '#b71c1c',
      backgroundColor: '#fff5f5',
    },
  },
  previewImage: {
    width: '100%',
    maxHeight: '400px',
    borderRadius: '10px',
    objectFit: 'cover',
    boxShadow: '0 6px 20px rgba(0,0,0,0.12)',
  },

  // 🔶 Actions
  dialogActions: {
    px: 3,
    py: 2.5,
    backgroundColor: '#fafafa',
    borderTop: '1px solid rgba(0,0,0,0.05)',
    justifyContent: 'flex-end',
    gap: 1.5,
  },
  cancelBtn: {
    color: '#555',
    fontWeight: 500,
    textTransform: 'none',
    '&:hover': {
      backgroundColor: '#f5f5f5',
    },
  },
  saveBtn: {
    padding: '10px 28px',
    borderRadius: '8px',
    fontWeight: 700,
    textTransform: 'none',
    fontSize: '15px',
    color: '#fff',
    background: 'linear-gradient(135deg, #d32f2f, #ef5350)',
    boxShadow: '0 4px 14px rgba(211,47,47,0.3)',
    transition: 'all 0.3s ease',
    '&:hover': {
      background: 'linear-gradient(135deg, #b71c1c, #e53935)',
      boxShadow: '0 6px 18px rgba(211,47,47,0.4)',
      transform: 'translateY(-1px)',
    },
  },
};

export default styles;
