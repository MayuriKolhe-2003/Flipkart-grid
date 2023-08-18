import { useState, useEffect } from "react";
import { Typography, List, ListItem, ListItemText, Button, Box, Container, TextField } from '@material-ui/core';
import axios from "axios";
import erc20abi from "./ERC20abi.json"
import "./Admin.css";

export default function AdminPanel() {
    const ethers = require('ethers');
    const [recipient, setRecipient] = useState('');
    const [amount, setAmount] = useState('');
    const [showDialog, setShowDialog] = useState(false);
    const [mntCoin, setMntCoin] = useState('');
    const [totalSupply, setTotalSupply] = useState(0)


    const handleTransfer = async () => {

    };

    const [transactions, setTransactions] = useState([]);

    const handleData = async () => {
        await axios.get("api/approve/get-approve")
            .then((res) => {
                setTransactions(res.data);
                console.log(res.data);
            }
            )
        const provider = new ethers.BrowserProvider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();
        const signerAddress = await signer.getAddress();
        const erc20 = new ethers.Contract("0xAA7A440B0EfBA778d3f0F4415A8541569bb405C7", erc20abi, provider);
        setTotalSupply(await erc20.totalSupply());
        if (signerAddress !== "0xd6976647ce4EDBE5760629Ca4481DDE1ceD4593a") {
            setShowDialog(true);
        }
    }

    useEffect(() => {
        handleData();
    }, [])

    function UnremovableDialog() {
        return (
            <div className="unremovable-dialog">
                {/* Dialog content */}
                <p>Please use the admin wallet to continue.</p>
                {/* <button onClick={() => setShowDialog(false)}>Dismiss</button> */}
            </div>
        );
    }

    const handleMint = async () => {
        const provider = new ethers.BrowserProvider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();
        const erc20 = new ethers.Contract("0xAA7A440B0EfBA778d3f0F4415A8541569bb405C7", erc20abi, signer);

        await erc20.mint(mntCoin);

        // console.log(`Minting ${amount} tokens to ${recipient}`);
    };

    const handleApprove = async (transaction) => {
        // Implement your approval logic here
        console.log(transaction.userId);
        const provider = new ethers.BrowserProvider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();
        const erc20 = new ethers.Contract("0xAA7A440B0EfBA778d3f0F4415A8541569bb405C7", erc20abi, signer);

        !transaction.isMultiple ?
            await erc20.transfer(transaction.userId, ethers.parseEther(transaction.Amount.toString()))
                .then(async () => {
                    console.log("Success");
                    await axios.delete(`/api/approve/del-approve/${transaction._id}`)
                    handleData();
                })
                .catch((err) => {
                    console.log(err);
                })
            :
            await erc20.performTwoTransactions(transaction.userId, ethers.parseEther(transaction.Amount.toString()), transaction.userId2, ethers.parseEther(transaction.Amount2.toString()))
                .then(async () => {
                    console.log("Success");
                    await axios.delete(`/api/approve/del-approve/${transaction._id}`)
                    handleData();
                })
                .catch((err) => {
                    console.log(err);
                })
        // console.log(`Transaction ${transactionId} approved`);
    };
    return (
        <div>
            <Container maxWidth="sm">
                {showDialog && (
                    <>
                        <div className="overlay" />
                        <UnremovableDialog />
                    </>
                )}
                <Box sx={{ mt: 5 }}>
                    <div>
                        {totalSupply}
                    </div>
                    <Typography variant="h4" align="center" gutterBottom>
                        Admin Panel
                    </Typography>
                    <form>
                        <TextField
                            label="Recipient Wallet Address"
                            fullWidth
                            value={recipient}
                            onChange={(e) => setRecipient(e.target.value)}
                            margin="normal"
                        />
                        <TextField
                            label="Amount"
                            type="number"
                            fullWidth
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            margin="normal"
                        />
                        <Button variant="contained" color="primary" onClick={handleTransfer}>
                            Transfer
                        </Button>
                    </form>
                </Box>

                <Box sx={{ mt: 5 }}>
                    <Typography variant="h4" align="center" gutterBottom>
                        Mint Tokens
                    </Typography>
                    <div>
                        <TextField
                            label="Amount"
                            fullWidth
                            value={mntCoin}
                            onChange={(e) => setMntCoin(e.target.value)}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleMint}
                        >
                            Mint Tokens
                        </Button>
                    </div>
                </Box>

                <Typography variant="h4" align="center" gutterBottom>
                    Approvals
                </Typography>
                <List>
                    {transactions.map((transaction) => (
                        <ListItem key={transaction._id}>
                            {!transaction.isMultiple ?
                                <ListItemText
                                    primary={`From: ${transaction.userId}`}
                                    secondary={`Amount: ${transaction.Amount}`}
                                />
                                :
                                <ListItemText
                                    primary={`From: ${transaction.userId} | To: ${transaction.userId2}`}
                                    secondary={`Amount 1: ${transaction.Amount} | Amount 2: ${transaction.Amount2}`}
                                />}
                            <Button
                                variant="outlined"
                                color="primary"
                                onClick={() => handleApprove(transaction)}
                            >
                                Approve
                            </Button>
                        </ListItem>
                    ))}
                </List>

            </Container>
        </div>
    )
}