import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddFilmForm from './AddFilmForm';

interface AddFilmModalProps {
  open: boolean;
  onClose: any;
}

const AddFilmModal = ({ open, onClose }: AddFilmModalProps) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle id="form-dialog-title">Add a new film</DialogTitle>
      <AddFilmForm onSubmit={onClose} />
    </Dialog>
  );
};

export default AddFilmModal;
