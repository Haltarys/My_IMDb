import { SyntheticEvent, useState } from 'react';
import firebase from 'firebase/app';
import {
  Button,
  Checkbox,
  Grid,
  FormControlLabel,
  TextField,
} from '@material-ui/core';
import { auth, firestore } from '@/firebase/firebase';

const FilmForm = () => {
  const filmsRef = firestore.collection('films');
  const [title, setTitle] = useState('');
  const [seen, setSeen] = useState(false);

  const handleSubmit = async (e: SyntheticEvent) => {
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
    }
  };

  return (
    <form noValidate autoComplete="off" onSubmit={handleSubmit}>
      <Grid container direction="column">
        <TextField
          id="film-seen"
          label="Film seen"
          variant="outlined"
          required
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
        <Button type="submit" variant="contained">
          Add film
        </Button>
      </Grid>
    </form>
  );
};

export default FilmForm;
