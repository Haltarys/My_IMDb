import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch';
import Tooltip from '@material-ui/core/Tooltip';
import Delete from '@material-ui/icons/Delete';
import useTheme from '@material-ui/core/styles/useTheme';
import grey from '@material-ui/core/colors/grey';
import { Film } from '@/film';
import { firestore } from '@/firebase';

interface FilmItemProps {
  film: Film;
}

const FilmItem = ({ film }: FilmItemProps) => {
  const theme = useTheme();
  const filmRef = firestore.collection('films').doc(film.id);

  const handleSeen = (e: any) => {
    e.stopPropagation();
    return filmRef.update({
      seen: !film.seen,
    });
  };

  const handleDelete = async () => filmRef.delete();

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card
        elevation={6}
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto',
        }}
      >
        <ButtonBase component="div" onClick={handleSeen}>
          <Box
            bgcolor={film.seen ? 'primary.light' : grey.A100}
            style={{ width: '100%' }}
          >
            <CardHeader
              title={
                <Typography variant="h4" component="h4">
                  {film.title}
                </Typography>
              }
              subheader={film.seen ? 'Seen' : 'Not seen'}
            />
            <CardContent>
              <Tooltip title={`Mark as ${film.seen ? 'not ' : ''}seen`}>
                <Switch
                  checked={film.seen}
                  color="primary"
                  onChange={handleSeen}
                />
              </Tooltip>
              <Fab color="primary" onClick={handleDelete}>
                <Tooltip title="Delete this film">
                  <Delete />
                </Tooltip>
              </Fab>
            </CardContent>
          </Box>
        </ButtonBase>
      </Card>
    </Grid>
  );
};

export default FilmItem;
