// styles.js
const styles = {
  formWrapper: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '32px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
    maxWidth: '1000px',
    margin: '0 auto',
  },
  textField: {
    backgroundColor: '#fafafa',
    borderRadius: '8px',
  },
  label: {
    fontWeight: 600,
    fontSize: '16px',
    marginBottom: '8px',
    color: '#333',
  },
  editorIntro: {
    height: 200,
    menubar: false,
    plugins: [
      'lists link image paste help wordcount',
    ],
    toolbar:
      'undo redo | formatselect | bold italic underline | bullist numlist | link',
    content_style:
      'body { font-family: Inter, sans-serif; font-size: 15px; line-height: 1.6; }',
  },
  editorBody: {
    height: 400,
    menubar: true,
    plugins: [
      'advlist autolink lists link image charmap print preview anchor',
      'searchreplace visualblocks code fullscreen',
      'insertdatetime media table paste code help wordcount',
    ],
    toolbar:
      'undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist | link image',
    content_style:
      'body { font-family: Inter, sans-serif; font-size: 15px; line-height: 1.6; }',
  },
  fileInput: {
    marginTop: '8px',
    marginBottom: '12px',
  },
  thumbnail: {
    marginTop: '8px',
    maxWidth: '250px',
    maxHeight: '180px',
    borderRadius: '8px',
    objectFit: 'cover',
    boxShadow: '0 2px 10px rgba(0,0,0,0.15)',
    display: 'block',
  },
  submitBtn: {
    padding: '10px 28px',
    borderRadius: '8px',
    fontWeight: 600,
    textTransform: 'none',
    fontSize: '16px',
  },
};

export default styles;
