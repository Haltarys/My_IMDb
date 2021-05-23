import { useCollectionData } from 'react-firebase-hooks/firestore';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
// import makeStyles from '@material-ui/core/styles/makeStyles';
// import useTheme from '@material-ui/core/styles/useTheme';
// import Masonry from 'react-masonry-css';
import { auth, firestore } from '@/firebase';
import { Film } from '@/film';
import FilmItem from './FilmItem';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     margin: theme.spacing(3, 0, 2, 0),
//   },
//   paper: {
//     marginBottom: theme.spacing(4),
//   },
//   masonryGrid: {
//     display: 'flex',
//     marginLeft: theme.spacing(-4),
//     width: 'inherit',
//   },
//   masonryColumn: {
//     paddingLeft: theme.spacing(4),
//     backgroundClip: 'padding-box',
//   },
// }));

const FilmList = () => {
  const filmsRef = firestore.collection('films');
  const query = filmsRef.where('uid', '==', auth.currentUser?.uid);
  const [films] = useCollectionData(query, {
    idField: 'id',
    transform: (val): Film => val as Film,
  });

  // const theme = useTheme();

  // const breakpointCols = {
  //   default: 4,
  //   [theme.breakpoints.values.xl]: 5,
  //   [theme.breakpoints.values.lg]: 4,
  //   [theme.breakpoints.values.md]: 3,
  //   [theme.breakpoints.values.sm]: 2,
  //   [theme.breakpoints.values.xs]: 1,
  // };

  // const classes = useStyles();

  return (
    // <Box mx={0}>
    //   <Masonry
    //     breakpointCols={breakpointCols}
    //     className={classes.masonryGrid}
    //     columnClassName={classes.masonryColumn}
    //   >
    //     {films?.map((film, i) => (
    //       <FilmItem key={i} film={film} />
    //     ))}
    //   </Masonry>
    // </Box>
    <Box
      mr={0} // No idea why but it doesn't look equal if absent
      m={2}
      style={{
        maxWidth: '100%',
      }}
    >
      <Grid container spacing={2}>
        {films?.map((film, i) => (
          <FilmItem key={i} film={film} />
        ))}
      </Grid>
    </Box>
  );
};

export default FilmList;
