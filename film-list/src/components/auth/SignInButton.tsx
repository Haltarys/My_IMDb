import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { signInWithGoogle } from '@/firebase';
import GoogleIcon from './GoogleIcon';

export const SignInButton = () => {
  return (
    <Box mx={1}>
      <Button
        variant="contained"
        size="large"
        style={{}}
        startIcon={<GoogleIcon />}
        onClick={signInWithGoogle}
      >
        Sign in with Google
      </Button>
    </Box>
  );
};

export const SignInButtonText = () => {
  return (
    <Button color="inherit" onClick={signInWithGoogle}>
      Sign in with Google
    </Button>
  );
};
