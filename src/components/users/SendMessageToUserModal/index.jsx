// react
import React, { useState } from 'react';

// mui
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack,
  Divider,
  Typography,
  Box,
} from '@mui/material';

// styles
import styles from './styles';

const SendMessageToUserModal = ({ open, onClose, userId, onSendMessage }) => {
  const [message, setMessage] = useState('');

  const draftMessages = [
    {
      label: 'Greet',
      text: `Hi there! I just wanted to drop by and say hello. How’s your day going so far? Hope you’re doing well!`,
    },
    {
      label: 'Ask Prayer',
      text: `Hey! I was wondering if there’s anything I can pray for you about today. You can share anything — I’d love to lift it up in prayer.`,
    },
    {
      label: 'Invite',
      text: `Hi! We’d love to see you at church this week. It’s always such a joy to worship and connect with others. Let me know if you’d like more details!`,
    },
    {
      label: 'Devotion',
      text: `Here’s something that might encourage you today — our latest devotion post: https://community.wotgonline.com/blogs. Take a few minutes to read and reflect. It might bless your heart.`,
    },
    {
      label: 'Worship',
      text: `If you need a moment to slow down and worship, you can join us here anytime: https://community.wotgonline.com/worship. Let this be your pause in God’s presence today.`,
    },
    {
      label: 'WOTG Link',
      text: `You can always connect with our growing community at https://community.wotgonline.com/. There’s a place here for you to grow, be encouraged, and belong.`,
    },
  ];

  const handleSelectDraft = (text) => {
    setMessage(text);
  };

  const handleSend = () => {
    if (!message.trim()) return;
    onSendMessage(message, userId);
    setMessage('');
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{ sx: styles.dialogPaper }}
    >
      <DialogTitle sx={styles.dialogTitle}>Send Message</DialogTitle>
      <Divider sx={styles.divider} />

      <DialogContent sx={styles.dialogContent}>
        <Stack spacing={3}>
          <Box>
            <Typography variant="subtitle1" sx={styles.sectionLabel}>
              Quick Drafts
            </Typography>
            <Stack direction="row" flexWrap="wrap" gap={1.5} sx={{ mt: 1 }}>
              {draftMessages.map((item) => (
                <Button
                  key={item.label}
                  variant="outlined"
                  onClick={() => handleSelectDraft(item.text)}
                  sx={styles.draftButton}
                >
                  {item.label}
                </Button>
              ))}
            </Stack>
          </Box>

          <TextField
            label="Your Message"
            multiline
            rows={4}
            fullWidth
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type or edit your message here..."
            sx={styles.textField}
          />
        </Stack>
      </DialogContent>

      <DialogActions sx={styles.dialogActions}>
        <Button onClick={onClose} sx={styles.cancelBtn}>
          Cancel
        </Button>
        <Button variant="contained" onClick={handleSend} sx={styles.saveBtn}>
          Send
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default React.memo(SendMessageToUserModal);
