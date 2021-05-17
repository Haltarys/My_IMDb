import { Container, Grid } from '@material-ui/core';
import { Film } from '@/film';
import FilmItem from './FilmItem';

export interface FilmListProps {
  films: Film[];
}

const FilmList = ({ films }: FilmListProps) => {
  return (
    <Container>
      <Grid
        container
        spacing={3}
        direction="row"
        justify="center"
        alignItems="center"
      >
        {films.map((film, i) => (
          <FilmItem key={i} film={film} />
        ))}
      </Grid>
    </Container>
  );
};

export default FilmList;
