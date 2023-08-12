import { makeStyles, Typography, Box, Button } from "@material-ui/core";
import { useSelector } from "react-redux";
import './SpinWheel.css';
import SpinningWheel from './SpinningWheel';
import { useState } from "react";
import { emptyCartUrl } from "../../constants/data";

const useStyle = makeStyles((theme) => ({
  component: {
    width: "80%",
    minWidth: 500,
    height:"100vh",
    background: "#fff",
    margin: "80px 140px",
    [theme.breakpoints.down("md")]: {
      margin: "80px 0px",
    },
  },
  image: {
    width: "20%",
    minWidth: 150,
  },
  container: {
    textAlign: "center",
    paddingTop: 70,
  },
  btn: {
    display: "block",
    margin: "0 auto",
    marginTop: 15,
    padding: "5px 60px",
  },
}));



const SpinWheel = () => {
  const classes = useStyle();
  const { isAuthenticate } = useSelector((state) => state.userReducer);
  const sections = ['1', '2', '3', '4', '5', '6','7','8'];
  const [result, setResult] = useState('Spin Me To get Coins');

  const handleSpin = (selectedSection) => {
    setResult(`You got : ${selectedSection} coins`);
  };

  return (
    <Box className={classes.component}>
      <Box className={classes.container}>
        
        {isAuthenticate ? (
          <div className="App">
          <h1>Spinning Wheel Game</h1>
          <SpinningWheel sections={sections} onSpin={handleSpin} />
          <div className="result">{result}</div>
        </div>
        ) : (
          <>
          <img src={emptyCartUrl} className={classes.image} />
            <Typography>Want to spin to earn rewards?</Typography>
            <span>Login to gain more rewards </span>
            <br />
            <Button
              variant="contained"
              className={classes.btn}
              color="primary"
              onClick={() => window.location.replace("/login")}
              style={{ background: "#fb641b", textTransform: "capitalize" }}
            >
              Login
            </Button>
          </>
        )}
      </Box>
    </Box>
  );
};

export default SpinWheel;
