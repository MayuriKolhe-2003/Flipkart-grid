import React from 'react';
import { Modal, Box, Typography, Button, makeStyles } from '@material-ui/core';
import LockIcon from '@material-ui/icons/Lock';
import erc20abi from '../../pages/ERC20abi.json'
import axios from 'axios';
import { useSelector } from 'react-redux';

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
  const ethers = require('ethers');
  const { user } = useSelector((state) => state.userReducer);

  const addActivity = async() => {
    try {
      await axios.post("api/activity/add", {
        userId:user._id,
        debited:true,
        credited:false,
        activity:`Reward Redeemed : ${item.title}`,
        coins:item.coins
      });
    }
    catch(e) {
      console.log(e);
    }
  }

  const redeemOffer = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    const signerAddress = await signer.getAddress();
    const erc20 = new ethers.Contract("0x1A6A811dcD676888195a12f4d027AA7e600e3C69", erc20abi, signer);
    await erc20.transferUnlim(signerAddress,"0xd6976647ce4EDBE5760629Ca4481DDE1ceD4593a", ethers.parseEther(item.coins.toString()));
    addActivity();
    handleClose()

  }
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
          <Button onClick={redeemOffer} className={classes.button}>
            Unlock Offer
          </Button>}


      </Box>
    </Modal>
  );
};

export default RewardsModal;

