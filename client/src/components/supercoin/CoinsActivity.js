import React from 'react';
import { makeStyles, Typography, Box, Button, Grid, Link } from '@material-ui/core';
import { useSelector } from 'react-redux';
import DashboardIcon from '@material-ui/icons/Dashboard';


const useStyles = makeStyles((theme) => ({
    component: {
        width: '55%',
        minWidth: 500,
        height: '65vh',
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
    banner:{
        margin:'20px 0',
        '& img': {
            width:'100%',
            borderRadius:'5px'
        }
    },
    recent: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginLeft:  theme.spacing(3),
        marginTop:theme.spacing(1),
    },
    recentHeading: {
        fontWeight: 'bold',
        fontSize: '24px',
    },
    muted :{
        marginLeft:theme.spacing(3),
        marginBottom:theme.spacing(1),
        color:'gray',
        fontSize:'12px',
    },
    plus:{
        color:'green',
        fontWeight:'bold',
    },
    minus:{
        color:'red',
        fontWeight:'bold',
    },
    hrc:{
       border:'0.1px solid #dadada'
    }
}
))

const CoinsActivity = () => {
    const classes = useStyles();
    return (
        <Box className={classes.component}>
            <Box className={classes.heading}>
                <Typography variant="h6">Supercoin Balance</Typography>
                <img src="https://rukminim2.flixcart.com/lockin/32/32/images/super_coin_icon_22X22.png?q=90" alt="Supercoin Icon" />
                <Typography variant="h6">
                    <span style={{ color: '#0000AA', fontWeight: 'bold', margin: '0 10px' }}>0</span>
                </Typography>
            </Box>

            <Box className={classes.banner}>
            <img  src='https://rukminim2.flixcart.com/lockin/1000/1000/images/non-plus-coinbalance-slice.jpg?q=50' />
            </Box>

            <div className={classes.recent}>
                <Typography variant="h4" className={classes.recentHeading}>
                    Recent Coin Activity
                </Typography>
                
                <Typography>
                <img src="https://rukminim2.flixcart.com/lockin/32/32/images/super_coin_icon_22X22.png?q=90" alt="Supercoin Icon" style={{ height: '15px',margin:'0 5px'}}/>
                    <span style={{ color: 'gray'}}>Coins</span>
                </Typography>
            </div>

           

            <div className='coins'>
                <Box className={classes.recent}>
                <Typography>Expired Coins</Typography>
                <Typography className={classes.minus}>- 06</Typography>
                </Box>
                <Typography className={classes.muted}>Debited on 01 Jun 2023</Typography>
            </div>
            <hr className={classes.hrc}/>

            <div className='coins'>
                <Box className={classes.recent}>
                <Typography>Rigo Women Bodycon Black, Maroon, White Dress</Typography>
                <Typography className={classes.plus}>+ 04</Typography>
                </Box>
                <Typography className={classes.muted}>Credited on 24 May 2022</Typography>
            </div>
            <hr className={classes.hrc}/>

        </Box>
    )
}

export default CoinsActivity
