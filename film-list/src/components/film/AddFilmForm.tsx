import { useState } from 'react';
import firebase from 'firebase/app';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Box from '@material-ui/core/Box';
import { auth, firestore } from '@/firebase';

interface AddFilmFormProps {
  onSubmit?: any;
}

const AddFilmForm = ({ onSubmit }: AddFilmFormProps) => {
  const filmsRef = firestore.collection('films');
  const [title, setTitle] = useState('');
  const [seen, setSeen] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (auth.currentUser && title) {
      await filmsRef.add({
        uid: auth.currentUser.uid,
        title,
        seen,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
      setTitle('');
      setSeen(false);
      onSubmit && onSubmit();
    }
  };

  return (
    <form noValidate autoComplete="off" onSubmit={handleSubmit}>
      <DialogContent>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <TextField
            id="film-seen"
            label="Film title"
            variant="outlined"
            required
            autoFocus
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={seen}
                onChange={() => setSeen(!seen)}
                name="seen"
                required
              />
            }
            label="Seen"
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button type="submit" variant="contained" color="primary">
          Add
        </Button>
      </DialogActions>
    </form>
  );
};

export default AddFilmForm;
