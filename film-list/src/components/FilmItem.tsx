import {
  Button,
  ButtonGroup,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import clsx from 'clsx';
import { Film } from '@/film';
import { firestore } from '@/firebase/firebase';
import { Delete } from '@material-ui/icons';

export interface FilmItemProps {
  film: Film;
}

const useStyles = makeStyles({
  filmBtn: {
    textTransform: 'none',
  },
  filmItem: {
    padding: '0.5em',
  },
  filmSeen: {
    textDecorationLine: 'line-through',
    textDecorationThickness: '0.3em',
  },
});

const FilmItem = ({ film }: FilmItemProps) => {
  const classes = useStyles();
  const filmRef = firestore.collection('films').doc(film.id);

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <ButtonGroup variant="contained">
        <Button
          color={film.seen ? undefined : 'primary'}
          className={clsx(classes.filmBtn, film.seen && classes.filmSeen)}
          onClick={async () =>
            await filmRef.update({
              seen: !film.seen,
            })
          }
        >
          <Typography variant="h4">{film.title}</Typography>
        </Button>
        <Button
          className={classes.filmBtn}
          color="default"
          onClick={async () => filmRef.delete()}
        >
          <Delete />
        </Button>
      </ButtonGroup>
    </Grid>
  );
};

export default FilmItem;
