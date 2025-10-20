const styles = {
  // 🔶 Root Form Wrapper (responsive)
  formWrapper: {
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    padding: '40px',
    maxWidth: '1080px',
    margin: '40px auto',
    boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
    transition: 'all 0.3s ease',
    '&:hover': {
      boxShadow: '0 10px 28px rgba(0,0,0,0.12)',
    },

    // 📱 Responsive adjustments
    '@media (max-width: 900px)': {
      padding: '24px',
      margin: '24px auto',
      overflowX: 'auto', // ✅ allows horizontal scroll when editors overflow
      WebkitOverflowScrolling: 'touch',
    },
    '@media (max-width: 600px)': {
      padding: '20px',
    },
  },

  // 🔶 Header
  headerTitle: {
    fontWeight: 700,
    color: '#222',
    fontSize: '1.8rem',
    letterSpacing: '-0.3px',
    '@media (max-width: 600px)': {
      fontSize: '1.5rem',
    },
  },
  headerSubtitle: {
    color: '#666',
    fontSize: '0.95rem',
    marginTop: '4px',
    '@media (max-width: 600px)': {
      fontSize: '0.9rem',
    },
  },

  // 🔶 Labels and Fields
  label: {
    fontWeight: 600,
    fontSize: '1rem',
    marginBottom: '8px',
    color: '#333',
  },
  textField: {
    backgroundColor: '#fafafa',
    borderRadius: '8px',
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#ddd',
      },
      '&:hover fieldset': {
        borderColor: '#999',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#3f51b5',
      },
    },
  },

  // 🔶 TinyMCE Editors (scrollable on smaller screens)
  editorIntro: {
    height: 300,
    menubar: false,
    skin: 'oxide',
    content_css: 'default',
    plugins: ['lists', 'link', 'wordcount'],
    toolbar:
      'undo redo | formatselect | bold italic underline | bullist numlist | link | removeformat',
    content_style:
      'body { font-family: Inter, sans-serif; font-size: 15px; color:#333; line-height: 1.6; background:#fff; padding:10px; }',

    '@media (max-width: 900px)': {
      width: '100%',
      minWidth: '700px', // ✅ prevents text from squishing
    },
  },
  editorBody: {
    height: 450,
    menubar: true,
    skin: 'oxide',
    content_css: 'default',
    plugins: [
      'advlist autolink lists link image charmap print preview anchor',
      'searchreplace visualblocks code fullscreen',
      'insertdatetime media table paste code help wordcount',
    ],
    toolbar:
      'undo redo | styleselect | bold italic underline | alignleft aligncenter alignright | bullist numlist | link image | removeformat',
    content_style:
      'body { font-family: Inter, sans-serif; font-size: 15px; color:#333; line-height: 1.6; background:#fff; padding:12px; }',

    '@media (max-width: 900px)': {
      width: '100%',
      minWidth: '800px',
    },
  },

  // 🔶 Upload Section
  uploadBox: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    marginTop: '8px',
    '@media (max-width: 600px)': {
      gap: '12px',
    },
  },
  uploadBtn: {
    borderRadius: '8px',
    textTransform: 'none',
    fontWeight: 600,
    borderColor: '#ccc',
    '&:hover': {
      borderColor: '#888',
      backgroundColor: '#f9f9f9',
    },
  },
  thumbnail: {
    width: '100%',
    maxWidth: '360px',
    height: 'auto',
    borderRadius: '10px',
    objectFit: 'cover',
    boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
    transition: 'transform 0.3s ease',
    '&:hover': {
      transform: 'scale(1.02)',
    },
    '@media (max-width: 600px)': {
      maxWidth: '100%',
    },
  },

  // 🔶 Submit Button
  submitBtn: {
    padding: '12px 32px',
    borderRadius: '10px',
    fontWeight: 700,
    fontSize: '16px',
    textTransform: 'none',
    letterSpacing: '0.5px',
    color: '#fff',
    background: 'linear-gradient(135deg, #d32f2f, #ef5350)',
    boxShadow: '0 4px 12px rgba(239, 83, 80, 0.3)',
    transition: 'all 0.3s ease',

    '&:hover': {
      background: 'linear-gradient(135deg, #b71c1c, #e53935)',
      boxShadow: '0 6px 18px rgba(244, 67, 54, 0.45)',
      transform: 'translateY(-1px)',
    },
    '&:active': {
      transform: 'translateY(1px)',
      boxShadow: '0 2px 8px rgba(244, 67, 54, 0.35)',
    },
    '&:disabled': {
      opacity: 0.6,
      cursor: 'not-allowed',
      background: 'linear-gradient(135deg, #c62828, #ef9a9a)',
      boxShadow: 'none',
    },

    '@media (max-width: 600px)': {
      width: '100%',
      fontSize: '15px',
      padding: '12px 0',
    },
  },
};

export default styles;
