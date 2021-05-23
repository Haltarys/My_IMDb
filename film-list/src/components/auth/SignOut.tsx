import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import { auth } from '@/firebase';

const SignOutButton = () => {
  return (
    <Button
      variant="text"
      color="inherit"
      endIcon={
        <Avatar
          alt={auth.currentUser?.displayName || ''}
          src={auth.currentUser?.photoURL || ''}
          imgProps={{ referrerPolicy: 'no-referrer' }}
        />
      }
      onClick={() => auth.signOut()}
    >
      Sign out from {auth.currentUser?.displayName}
    </Button>
  );
};

export default SignOutButton;
