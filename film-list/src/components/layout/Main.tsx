import Grid from '@material-ui/core/Grid';
import { auth } from '@/firebase';
import { SignInButton } from '@/components/auth/SignInButton';
import FilmList from '@/components/film/FilmList';

const Main = () => {
  return (
    <Grid
      container
      id="main"
      component="main"
      alignItems="center"
      justify="center"
      spacing={2}
    >
      {auth.currentUser ? <FilmList /> : <SignInButton />}
    </Grid>
  );
};

export default Main;
