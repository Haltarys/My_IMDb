import Button from '@material-ui/core/Button';
import Create from '@material-ui/icons/Create';

interface AddFilmButtonProps {
  onClick: any;
}

const AddFilmButton = ({ onClick }: AddFilmButtonProps) => {
  return (
    <Button
      variant="contained"
      color="default"
      endIcon={<Create />}
      onClick={onClick}
    >
      Add a new film
    </Button>
  );
};

export default AddFilmButton;
