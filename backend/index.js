const express = require('express');
const { body } = require('express-validator');
const Web3 = require('web3')
var cors = require('cors');
const HDWalletProvider = require('@truffle/hdwallet-provider')
const MyContract= require('../src/abis/DRealEstate.json')



const buy = async (plotId,address,price)=>{
    const web3 = new Web3('http://localhost:7545')
    
    
    const id = await web3.eth.net.getId()
    const deployedNetwok = MyContract.networks[id];
    const contract = new web3.eth.Contract(MyContract.abi,deployedNetwok.address)

    // transaction
    const adddresses = await web3.eth.getAccounts();
    const receipt = await contract.methods.buyLandWithoutEther(plotId,address).send({
        from: adddresses[0] , gas: 1000000, value: price
    });
    console.log(receipt);

    
    
}


const app = express();
app.use(cors());
//look for environment variable
const PORT = process.env.PORT || 2000;

//this is new way of bringing the body parser
app.use(express.json({extended: false}))

app.get('/',(req,res)=> {
    
    res.send('API running')});


app.post('/buy',(req,res)=> {

    const plotId = req.body.plotId
    const address= req.body.address
    const price = req.body.price
    console.log(plotId)
    console.log(price)
    buy(plotId,address,price)
    
    res.send('sucessfully bought land')});

app.listen(PORT, ()=> console.log(`server started on port ${PORT} `))