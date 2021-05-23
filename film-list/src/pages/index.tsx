import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase';
import NavBar from '@/components/layout/NavBar';
import Main from '@/components/layout/Main';

const Home = () => {
  // Even though the variable isn't actually used, it triggers
  // the re-render of the child components
  const [user] = useAuthState(auth);

  return (
    <>
      <NavBar />
      <Main />
    </>
  );
};

export default Home;
