import Box from '@material-ui/core/Box';
import { auth } from '@/firebase';
import { SignInButton } from '@/components/auth/SignInButton';
import FilmList from '@/components/film/FilmList';

const Main = () => {
  return (
    <Box id="main" component="main" margin={2}>
      {auth.currentUser ? <FilmList /> : <SignInButton />}
    </Box>
  );
};

export default Main;
