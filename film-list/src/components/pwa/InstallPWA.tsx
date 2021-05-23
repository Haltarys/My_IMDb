import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { GetApp } from '@material-ui/icons';

interface InstallPWAProps {
  installPWA: any;
}

const InstallPWA = ({ installPWA }: InstallPWAProps) => {
  return (
    <Box mx={1}>
      <Button
        variant="outlined"
        color="inherit"
        endIcon={<GetApp />}
        onClick={installPWA}
      >
        Install
      </Button>
    </Box>
  );
};

export default InstallPWA;
