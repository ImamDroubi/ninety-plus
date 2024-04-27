import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function SuccessAlert({message = "This is a success Alert inside a Snackbar!"}) {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <div>
      <Snackbar anchorOrigin={{ vertical : "top" , horizontal : "center" }} open={open} autoHideDuration={5000} onClose={handleClose} >
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
          
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
