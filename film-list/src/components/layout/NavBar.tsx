import { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { auth } from '@/firebase';
import { SignInButtonText } from '@/components/auth/SignInButton';
import AddFilmButton from '@/components/film/AddFilmButton';
import SignOutButton from '@/components/auth/SignOut';
import AddFilmModal from '@/components/film/AddFilmModal';

const NavBar = () => {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <AppBar id="navbar" component="header" position="sticky">
      <Toolbar>
        <Typography variant="h5" style={{ flexGrow: 1 }}>
          My IMDb film list
        </Typography>
        {auth.currentUser ? (
          <>
            <AddFilmButton onClick={() => setOpen(!open)} />
            <AddFilmModal open={open} onClose={handleClose} />
            <SignOutButton />
          </>
        ) : (
          <SignInButtonText />
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
