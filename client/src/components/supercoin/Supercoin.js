import React, { useEffect } from 'react';
import { makeStyles, Typography, Box, Button, Grid, Link } from '@material-ui/core';
import { useSelector,useDispatch } from 'react-redux';
import DashboardIcon from '@material-ui/icons/Dashboard';
import { Link as RouteLink } from 'react-router-dom'

import erc20abi from "../../pages/ERC20abi.json";
import { setSpCoin } from "../../actions/userActions";
import Reward from './Rewards';

const useStyles = makeStyles((theme) => ({
    component: {
        width: '60%',
        minWidth: 500,
        height: '100%',
        background: '#fff',
        margin: '80px auto',
        [theme.breakpoints.down('md')]: {
            margin: '80px 0',
        },
        padding: '20px 30px',
    },
    heading: {

        display: 'flex',
        alignItems: 'center',
        '& img': {
            marginLeft: theme.spacing(1),
        },
        '& h6': {
            margin: 0,
        },
    },
    container: {
        textAlign: 'center',
        paddingTop: theme.spacing(4),
    },
    btn: {
        display: 'block',
        margin: '0 auto',
        marginTop: theme.spacing(2),
        padding: '5px 60px',
        background: theme.palette.primary.main,
        textTransform: 'capitalize',
    },
    button: {
        margin: '30px 0',
        backgroundColor: '#d4d3cf', // Gray background color
        color: '#000', // White text color
        textTransform: 'none', // Prevents uppercase text transformation
        '&:hover': {
            backgroundColor: '#AAAAAA', // Lighter gray on hover
        },
        padding: "10px 30px"
    },
    icon: {
        marginRight: theme.spacing(1), // Space between icon and text
    },
    image: {
        height: "100px",
        width: "100%",
        marginTop: '20px',
    },
    faqContainer: {
        maxWidth: '90%',
        margin: '0 auto',
        marginTop: theme.spacing(4),
    },
    question: {
        fontWeight: 'bold',
        color: '#000000', // Black color for questions
        fontSize: '14px'
    },
    answer: {
        color: '#888888', // Gray color for answers
        fontSize: '12px',
        marginBottom: theme.spacing(1),
    },
    rewardsSection: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: theme.spacing(3),
    },
    rewardsHeading: {
        fontWeight: 'bold',
        fontSize: '24px',
    },
    rewardsButton: {
        background: "#2874f0",
        color: '#FFFFFF',
        padding: "15px 60px",
        textTransform: 'none',
        '&:hover': {
            background: theme.palette.primary.dark,
        },

    },
    image: {
        width: '100%', // Adjust the image size as needed
        display: 'block',
    },
}));

const Supercoin = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const ethers = require('ethers');
    const { spCoin,isAuthenticate } = useSelector((state) => state.userReducer);
    console.log(spCoin);

    useEffect(() => {
        getCoin()
      }, [spCoin])
    
      const getCoin = async () => {
        if (isAuthenticate) {
          const provider = new ethers.BrowserProvider(window.ethereum);
          await provider.send("eth_requestAccounts", []);
          const erc20 = new ethers.Contract("0xB1D52DA6A644789cC3144B58DC7d9cC650881783", erc20abi, provider);
          const signer = await provider.getSigner();
          const signerAddress = await signer.getAddress();
          const balancewei = await erc20.balanceOf(signerAddress);
          const balance = ethers.formatEther(balancewei, 18);
          console.log(balance);
          dispatch(setSpCoin(balance));
          // setSpCoin(balance);
    
        }
      }

    return (
        <Box className={classes.component}>
            <Box className={classes.heading}>
                <Typography variant="h5">Supercoin Balance</Typography>
                <img src="https://rukminim2.flixcart.com/lockin/32/32/images/super_coin_icon_22X22.png?q=90" alt="Supercoin Icon" />
                <Typography variant="h6">
                    <span style={{ color: '#0000AA', fontWeight: 'bold', margin: '0 10px' }}>{spCoin}</span>
                </Typography>
            </Box>

            <Link to='/coins-activity' component={RouteLink}>
                <Button className={classes.button} startIcon={<DashboardIcon >history</DashboardIcon>}>
                    View Coin Activity
                </Button>
            </Link>

            <Box className={classes.imageContainer}>
                <img
                    src="https://rukminim2.flixcart.com/lockin/1000/1000/images/01AvailExtra.jpg?q=50"
                    alt="img"
                    className={classes.image}
                />

                <img
                    src="https://rukminim2.flixcart.com/lockin/1000/1000/images/02TrendyProd.jpg?q=50"
                    alt="img"
                    className={classes.image}
                    style={{ marginTop: '20px' }}
                />
            </Box>

            <div className={classes.rewardsSection}>
                <Typography variant="h4" className={classes.rewardsHeading}>
                    Exciting Rewards for You
                </Typography>
                <Button className={classes.rewardsButton}>
                    View Rewards
                </Button>
            </div>



            <Reward />


            <div className={classes.faqContainer}>
                <Typography variant="h4" className={classes.rewardsHeading}>Frequently Asked Questions</Typography>
                <div style={{ marginTop: '20px' }}>
                    <Typography className={classes.question}>
                        Question 1: What is Lorem Ipsum?
                    </Typography>
                    <Typography className={classes.answer}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis id elit quis quam tristique luctus.
                    </Typography>
                </div>
                <div>
                    <Typography className={classes.question}>
                        Question 2: How does it work?
                    </Typography>
                    <Typography className={classes.answer}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut efficitur diam et dui dignissim dictum.
                    </Typography>
                </div>
                {/* Add more divs for additional questions */}
            </div>




        </Box>
    );
};

export default Supercoin;
