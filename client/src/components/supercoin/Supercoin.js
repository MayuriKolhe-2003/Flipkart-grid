import React from 'react';
import { makeStyles, Typography, Box, Button } from '@material-ui/core';
import { useSelector } from 'react-redux';
import DashboardIcon from '@material-ui/icons/Dashboard';
const useStyles = makeStyles((theme) => ({
    component: {
        width: '60%',
        minWidth: 500,
        height: '65vh',
        background: '#fff',
        margin: '80px auto',
        [theme.breakpoints.down('md')]: {
            margin: '80px 0',
        },
    },
    heading: {
        padding: '10px 60px',
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
        margin: " 20px 60px",
        backgroundColor: 'gray', // Gray background color
        color: '#FFFFFF', // White text color
        textTransform: 'none', // Prevents uppercase text transformation
        '&:hover': {
            backgroundColor: '#AAAAAA', // Lighter gray on hover
        },
        padding: "10px 20px"
    },
    icon: {
        marginRight: theme.spacing(1), // Space between icon and text
    },
    imageContainer: {
    },
    image: {
        height: "100px",
        width: "100%",
        margin: '50px'
    },
    faqContainer: {
        maxWidth: '90%',
        margin: '0 auto',
        marginTop: theme.spacing(4),
    },
    question: {
        fontWeight: 'bold',
        color: '#000000', // Black color for questions

        fontSize:'14px'
    },
    answer: {
        color: '#888888', // Gray color for answers
        fontSize:'12px',
        marginBottom: theme.spacing(1),
    },
}));

const Supercoin = () => {
    const classes = useStyles();
    const { isAuthenticate } = useSelector((state) => state.userReducer);

    return (
        <Box className={classes.component}>
            <Box className={classes.heading}>
                <Typography variant="h6">Supercoin Balance</Typography>
                <img src="https://rukminim2.flixcart.com/lockin/32/32/images/super_coin_icon_22X22.png?q=90" alt="Supercoin Icon" />
                <Typography variant="h6">
                    <span style={{ color: '#0000AA', fontWeight: 'bold', margin: '0 10px' }}>0</span>
                </Typography>
            </Box>

            <Button className={classes.button} startIcon={<DashboardIcon >history</DashboardIcon>}>
                View Coin Activity
            </Button>

            <Box className={classes.imageContainer}>
                <img
                    src="https://www.passionateinmarketing.com/wp-content/uploads/2021/01/flipkart_plus.jpg"
                    alt="Image"
                    className={classes.image}
                />
            </Box>

            <div className={classes.faqContainer}>
                <div>
                    <Typography  className={classes.question}>
                        Question 1: What is Lorem Ipsum?
                    </Typography>
                    <Typography className={classes.answer}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis id elit quis quam tristique luctus.
                    </Typography>
                </div>
                <div>
                    <Typography  className={classes.question}>
                        Question 2: How does it work?
                    </Typography>
                    <Typography className={classes.answer}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut efficitur diam et dui dignissim dictum.
                    </Typography>
                </div>
                {/* Add more divs for additional questions */}
            </div>

            <Box className={classes.container}>
                <Typography>Your cart is empty!</Typography>
                <Typography component="span">Add items to it now.</Typography>
                <Button
                    variant="contained"
                    className={classes.btn}
                    onClick={() => window.location.replace('/')}
                >
                    Shop Now
                </Button>
            </Box>
        </Box>
    );
};

export default Supercoin;
