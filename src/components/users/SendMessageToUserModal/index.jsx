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
      text: `Hello kapatid! Kamusta ka? Nais ko lang batiin ka at ipaabot ang aking dalangin na sana ay nasa mabuti kang kalagayan at patuloy na pinagpapala ng Diyos.`,
    },
    {
      label: 'Ask Prayer',
      text: `Kumusta kapatid! Mayroon ka bang gustong ipanalangin ko para sa iyo ngayon? Huwag kang mahiyang magbahagi — nais kong ipagdasal ka sa Panginoon.`,
    },
    {
      label: 'Invite',
      text: `Hi kapatid! Inaanyayahan kitang sumama sa aming pagsamba ngayong linggo. Isang magandang pagkakataon ito upang magpasalamat, sumamba, at makipag-fellowship sa iba.`,
    },
    {
      label: 'Devotion',
      text: `Kapatid, baka makatulong ito sa iyong araw — ang aming pinakabagong debosyon: https://community.wotgonline.com/blogs. Maglaan ng ilang minuto upang magbasa at magnilay. Nawa’y maging pagpapala ito sa iyo.`,
    },
    {
      label: 'Worship',
      text: `Kung gusto mong maglaan ng sandali upang manahimik at sumamba, maaari kang makiisa dito: https://community.wotgonline.com/worship. Hayaan mong punuin muli ng presensya ng Diyos ang iyong puso.`,
    },
    {
      label: 'WOTG Link',
      text: `Maaari kang kumonekta sa ating online community sa https://community.wotgonline.com/. May lugar dito para sa’yo — upang lumago, ma-encourage, at mapalakas sa pananampalataya.`,
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

  const handleClear = () => {
    setMessage('');
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
        <Button onClick={handleClear} sx={styles.clearBtn}>
          Clear
        </Button>
        <Button variant="contained" onClick={handleSend} sx={styles.saveBtn}>
          Send
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default React.memo(SendMessageToUserModal);
