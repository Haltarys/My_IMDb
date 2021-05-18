import { auth } from '@/firebase/firebase';
import { Button } from '@material-ui/core';

const SignOut = () => {
  return (
    auth.currentUser && <Button onClick={() => auth.signOut()}>Sign out</Button>
  );
};

export default SignOut;
