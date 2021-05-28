import { useCollectionData } from 'react-firebase-hooks/firestore';
import Grid from '@material-ui/core/Grid';
import { auth, firestore } from '@/firebase';
import { Film } from '@/types/film';
import FilmItem from './FilmItem';

const FilmList = () => {
  const filmsRef = firestore.collection('films');
  const query = filmsRef.where('uid', '==', auth.currentUser?.uid);
  const [films] = useCollectionData(query, {
    idField: 'id',
    transform: (val): Film => val as Film,
  });

  return (
    <Grid container spacing={2}>
      {films?.map((film, i) => (
        <FilmItem key={i} film={film} />
      ))}
    </Grid>
  );
};

export default FilmList;
