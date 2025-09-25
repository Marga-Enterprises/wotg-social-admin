const styles = {
  formWrapper: {
    padding: '32px',
    borderRadius: '12px',
    backgroundColor: '#fff',
    maxWidth: '900px',
    margin: '40px auto',
    boxShadow: '0 6px 18px rgba(0,0,0,0.06)',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  label: {
    fontWeight: 600,
    marginBottom: '8px',
    display: 'block',
    color: '#2c3e50',
    fontSize: '0.95rem',
    letterSpacing: '0.3px',
  },
  textField: {
    backgroundColor: '#fafafa',
    borderRadius: '8px',
    '& .MuiOutlinedInput-root': {
      '&:hover fieldset': {
        borderColor: '#1976d2',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#1976d2',
        boxShadow: '0 0 0 2px rgba(25,118,210,0.2)',
      },
    },
  },
  editorIntro: {
    height: 200,
    menubar: false,
    plugins: [
      'advlist autolink lists link image charmap preview anchor',
      'searchreplace visualblocks code fullscreen',
      'insertdatetime media table paste code help wordcount',
    ],
    toolbar:
      'undo redo | formatselect | bold italic underline | ' +
      'alignleft aligncenter alignright alignjustify | ' +
      'bullist numlist outdent indent | removeformat | help',
    content_style:
      'body { font-family:Inter,Roboto,Arial,sans-serif; font-size:14px; color:#333; }',
  },
  editorBody: {
    height: 300,
    menubar: true,
    plugins: [
      'advlist autolink lists link image charmap preview anchor',
      'searchreplace visualblocks code fullscreen',
      'insertdatetime media table paste code help wordcount',
    ],
    toolbar:
      'undo redo | formatselect | bold italic underline | ' +
      'alignleft aligncenter alignright alignjustify | ' +
      'bullist numlist outdent indent | removeformat | help',
    content_style:
      'body { font-family:Inter,Roboto,Arial,sans-serif; font-size:14px; color:#333; }',
  },
  fileInput: {
    display: 'block',
    marginBottom: '12px',
    cursor: 'pointer',
  },
  thumbnail: {
    width: '100%',
    borderRadius: '10px',
    maxHeight: '240px',
    objectFit: 'cover',
    border: '1px solid #e0e0e0',
    boxShadow: '0 4px 10px rgba(0,0,0,0.08)',
    marginTop: '12px',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    '&:hover': {
      transform: 'scale(1.01)',
      boxShadow: '0 6px 14px rgba(0,0,0,0.12)',
    },
  },
  submitBtn: {
    minWidth: '160px',
    padding: '12px 28px',
    fontWeight: 600,
    borderRadius: '8px',
    textTransform: 'none',
    background: 'linear-gradient(90deg, #1976d2 0%, #2196f3 100%)',
    boxShadow: '0 4px 10px rgba(25,118,210,0.3)',
    '&:hover': {
      background: 'linear-gradient(90deg, #1565c0 0%, #1e88e5 100%)',
      boxShadow: '0 6px 14px rgba(25,118,210,0.4)',
    },
  },
};

export default styles;
