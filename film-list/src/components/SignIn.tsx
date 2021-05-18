import { Button } from '@material-ui/core';
import { firebase, auth } from '@/firebase/firebase';

const signInWithGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();

  auth.signInWithPopup(provider);
};

const SignIn = () => {
  return (
    <Button color="primary" variant="contained" onClick={signInWithGoogle}>
      Sign in with Google
    </Button>
  );
};

export default SignIn;
