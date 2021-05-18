import { Container, Grid } from '@material-ui/core';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { auth, firestore } from '@/firebase/firebase';
import { Film } from '@/film';
import FilmItem from './FilmItem';

const FilmList = () => {
  const filmsRef = firestore.collection('films');
  const query = auth.currentUser
    ? filmsRef.where('uid', '==', auth.currentUser.uid)
    : undefined;
  const [films] = useCollectionData(query, {
    idField: 'id',
    transform: (val): Film => ({
      id: val.id,
      uid: val.uid,
      title: val.title,
      seen: val.seen,
      createdAt: val.createdAt,
    }),
  });

  return (
    <Container>
      <Grid
        container
        spacing={3}
        direction="row"
        justify="center"
        alignItems="center"
      >
        {films && films.map((film, i) => <FilmItem key={i} film={film} />)}
      </Grid>
    </Container>
  );
};

export default FilmList;
