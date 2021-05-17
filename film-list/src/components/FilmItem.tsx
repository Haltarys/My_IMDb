import {
  Button,
  ButtonGroup,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { useState } from 'react';
import clsx from 'clsx';
import { Film } from '@/film';
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
    textDecoration: 'line-through',
  },
});

const FilmItem = ({ film }: FilmItemProps) => {
  const classes = useStyles();
  const [seen, setSeen] = useState(film.seen);

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <ButtonGroup variant="contained">
        <Button
          color={seen ? 'primary' : undefined}
          className={clsx(seen && classes.filmSeen)}
          onClick={() => setSeen(!seen)}
        >
          <Typography variant="h4">{film.title}</Typography>
        </Button>
        <Button color="default">Delete</Button>
      </ButtonGroup>
    </Grid>
  );
};

export default FilmItem;
