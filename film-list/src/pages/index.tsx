import { useAuthState } from 'react-firebase-hooks/auth';
import { Grid } from '@material-ui/core';
import { auth } from '@/firebase/firebase';
import FilmList from '@/components/FilmList';
import FilmForm from '@/components/FilmForm';
import SignIn from '@/components/SignIn';
import SignOut from '@/components/SignOut';

const Home = () => {
  const [user] = useAuthState(auth);

  return (
    <Grid
      container
      direction="column"
      spacing={3}
      alignItems="center"
      justify="center"
    >
      {user ? (
        <>
          <Grid item>
            <SignOut />
          </Grid>
          <Grid item>
            <FilmList />
          </Grid>
          <Grid item>
            <FilmForm />
          </Grid>
        </>
      ) : (
        <SignIn />
      )}
    </Grid>
  );
};

export default Home;
