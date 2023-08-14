import React from 'react';
import { Modal, Box, Typography, Button, makeStyles } from '@material-ui/core';
import LockIcon from '@material-ui/icons/Lock';

const useStyles = makeStyles((theme) => ({
  image: {
    width: '100%',
    display: 'block',
  },
  modal: {
    backgroundColor: 'white',
    borderRadius: '6px',
  },
  coins: {
    display: 'flex',
    alignItems: 'center',
    margin: '10px 0',
    '& img': {
      marginLeft: theme.spacing(1),
    },
    '& h6': {
      margin: 0,
    },
  },
  button: {
    margin: '30px 0',
    backgroundColor: 'gray', // Gray background color
    color: '#000', // White text color
    textTransform: 'none', // Prevents uppercase text transformation
    '&:hover': {
      backgroundColor: '#AAAAAA', // Lighter gray on hover
    },
    padding: "10px 30px",
    border: "none",
    outline: "none",
  },

}))
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1000,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const RewardsModal = ({ item, open, handleClose, spCoin }) => {
  const classes = useStyles();
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} className={classes.modal}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {item.title}
        </Typography>
        <Typography >
          Savings Pass
        </Typography>


        <Box className={classes.coins}>
          <img src="https://rukminim2.flixcart.com/lockin/32/32/images/super_coin_icon_22X22.png?q=90" alt="Supercoin Icon" />
          <Typography variant="h6">
            <span style={{ color: '#0000AA', fontWeight: 'bold', margin: '0 10px' }}>{item.coins}</span>
          </Typography>
        </Box>

        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <span style={{ fontWeight: 'bold', margin: '0 10px' }}>About the offer : </span><br />
          {item.desc}<br />
        </Typography>

        {(spCoin < item.coins) ?
          <Button className={classes.button}>
            <LockIcon />
            Not Enough Coins
          </Button> :
          <Button className={classes.button}>
            <LockIcon />
            Unlock Offer
          </Button>}


      </Box>
    </Modal>
  );
};

export default RewardsModal;

