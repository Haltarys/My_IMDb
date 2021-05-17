import FilmList from '@/components/FilmList';
import { Film } from '@/film';

const data: Film[] = [
  {
    id: 'afac2',
    uid: 'me',
    title: 'The Dark Knight',
    seen: true,
    createdAt: new Date(Date.now()),
  },
  {
    id: 'afad5',
    uid: 'me',
    title: 'Batman begins',
    seen: true,
    createdAt: new Date(Date.now()),
  },
  {
    id: 'bb5c4',
    uid: 'me',
    title: 'Ava',
    seen: true,
    createdAt: new Date(Date.now()),
  },
  {
    id: 'b33c4',
    uid: 'me',
    title: 'Braveheart',
    seen: false,
    createdAt: new Date(Date.now()),
  },
  {
    id: 'cd1e8',
    uid: 'me',
    title: 'The Lord of the Rings: Return of the King',
    seen: true,
    createdAt: new Date(Date.now()),
  },
];

const Home = () => {
  return <FilmList films={data} />;
};

export default Home;
