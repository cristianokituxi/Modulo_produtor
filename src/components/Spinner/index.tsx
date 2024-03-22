
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const Spinner = () => {
  return (
    <div>
      <Backdrop
        sx={{ color: '#ffff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open
      >
        <CircularProgress color="primary" />
      </Backdrop>
    </div>
  );
};
export default Spinner;

