import Button from '@material-ui/core/Button';
import { signInWithGoogle } from '@/firebase';
import GoogleIcon from './GoogleIcon';

export const SignInButton = () => {
  return (
    <Button
      variant="contained"
      size="large"
      startIcon={<GoogleIcon />}
      onClick={signInWithGoogle}
    >
      Sign in with Google
    </Button>
  );
};

export const SignInButtonText = () => {
  return (
    <Button color="inherit" onClick={signInWithGoogle}>
      Sign in with Google
    </Button>
  );
};
