import React, { Component } from 'react';
import Web3 from 'web3';
import Identicon from 'identicon.js';
import './App.css';
import { Alert } from 'react-bootstrap';

import Navbar from './Navbar'
import Main from './Main'
import Landregister from './Landregister';
import DRealEstate from '../abis/DRealEstate.json'
import AllRecords from '../Pages/AllRecords'
import UserRecords from '../Pages/UserRecords';
import Admin from '../Pages/Admin';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://localhost:2000';

//Declare IPFS
const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'http', apiPath: '/ipfs/api/v0'}) // leaving out the arguments will default to these values


class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    // Network ID
    const networkId = await web3.eth.net.getId()
    const networkData = DRealEstate.networks[networkId]
    if(networkData) {
      const dRealEstate = web3.eth.Contract(DRealEstate.abi, networkData.address)
      this.setState({ dRealEstate })
      const plotcount = await dRealEstate.methods.plotcount().call()
      this.setState({ plotcount })
      // Load Posts
      for (var i = 1; i <= plotcount; i++) {
        const landrecord = await dRealEstate.methods.landrecords(i).call()
        this.setState({
          landrecords: [...this.state.landrecords, landrecord]
        })
      }
      // Sort posts. Show highest tipped posts first
      this.setState({
        landrecords: this.state.landrecords.sort((a,b) => b.price - a.price )
      })
      this.setState({ loading: false})
    } else {
      window.alert(' contract not deployed to detected network.')
    }
  }

  captureFile = event => {

    event.preventDefault()
    const file = event.target.files[0]
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)

    reader.onloadend = () => {
      this.setState({ buffer: Buffer(reader.result) })
      console.log('buffer', this.state.buffer)
    }

    ipfs.add(this.state.buffer, (error, result) => {
      console.log('Ipfs result', result)
      if(error) {
        console.error(error)
        return
      }

      this.setState({result:result[0].hash})
    })
  }

  uploadImage = description => {
    console.log("Submitting file to ipfs...")

    //adding file to the IPFS
    ipfs.add(this.state.buffer, (error, result) => {
      console.log('Ipfs result', result)
      if(error) {
        console.error(error)
        return
      }

      this.setState({ loading: true })
      this.state.memeMedia.methods.uploadImage(result[0].hash, description).send({ from: this.state.account }).on('transactionHash', (hash) => {
        this.setState({ loading: false })
      })
    })

   
  }

   async createLandRecord(areaCode,length,breadth,address,price) {
    console.log('buffer', this.state.buffer)

    // console.log("adding file to the IPFS")
    // try{
    //   ipfs.add(this.state.buffer, (error, result) => {
    //     console.log('Ipfs result', result)
    //     if(error) {
    //       console.error(error)
    //       return
    //     }
    //     //console.log("Success")
       
    // this.setState({ loading: true })
    // this.state.dRealEstate.methods.registerLand(areaCode,length,breadth,address,price,"yyyyyy").send({ from: this.state.account })
    // .once('receipt', (receipt) => {
    //   this.setState({ loading: false })
    // })
    
      
    // })
    // }catch(error)
    // {
    //   console.error(error)
    // }

    this.setState({ loading: true })
    this.state.dRealEstate.methods.registerLand(areaCode,length,breadth,address,price,"yyyyyy").send({ from: this.state.account })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    })
    

}

 


  buyLand(plotId, price) {
    this.setState({ loading: true })
    this.state.dRealEstate.methods.buyLand(plotId).send({ from: this.state.account, value: price })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    })
  }

  async buyLandWithoutEther(plotId, price) {

    try {

      const config ={
                header:{
                    'Content-Type':'application/json'
                }
            }
      const res = await axios.post(`${API_URL}/buy`,{
                      plotId:plotId,
                      address:this.state.account,
                      price:price
                  }, config)
      console.log(res)
     
      
      
    } catch (err) {
      
    }
    
  }
  approveLandRecord(plotId){
    this.setState({ loading: true })
    this.state.dRealEstate.methods.approveLandRecord(plotId).send({ from: this.state.account })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    })
  }
  rejectLandRecord(plotId){
    this.setState({ loading: true })
    this.state.dRealEstate.methods.rejectLandRecord(plotId).send({ from: this.state.account })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    })
  }
  landForSale(plotId){
    this.setState({ loading: true })
    this.state.dRealEstate.methods.landForSale(plotId).send({ from: this.state.account })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    })

  }
  landNotForSale(plotId){
    this.setState({ loading: true })
    this.state.dRealEstate.methods.landNotForSale(plotId).send({ from: this.state.account })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    })

  }

  approveLandRecord(plotId){
    this.setState({ loading: true })
    this.state.dRealEstate.methods.approveLandRecord(plotId).send({ from: this.state.account })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    })

  }
  landNotForSale(plotId){
    this.setState({ loading: true })
    this.state.dRealEstate.methods.landNotForSale(plotId).send({ from: this.state.account })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    })

  }


  constructor(props) {
    super(props)
    this.state = {
      account: '',
      dRealEstate: null,
      plotcount: 0,
      landrecords: [],
      loading: true,
      
    }
    this.verificationStatus={
      0:"Pending",
      1:"Rejected",
      2:"Approved"
    }

    this.createLandRecord = this.createLandRecord.bind(this)
    this.buyLand = this.buyLand.bind(this)
    this.approveLandRecord=this.approveLandRecord.bind(this)
    this.rejectLandRecord=this.rejectLandRecord.bind(this)
    this.landNotForSale=this.landNotForSale.bind(this)
    this.landForSale=this.landForSale.bind(this)
    this.captureFile=this.captureFile.bind(this)
    this.buyLandWithoutEther=this.buyLandWithoutEther.bind(this)
  }

  render() {
    return (
      // <div>
      //   <Navbar account={this.state.account} />
      //   { this.state.loading
      //     ? <div id="loader" className="text-center mt-5"><p>Loading...</p></div>
      //     :  <Landregister
      //     createLandRecord={this.createLandRecord}/>
            
      //   }
      //   <AllRecords buyLand={this.buyLand} landrecords={this.state.landrecords}/>
      //   <UserRecords  
      //   buyLand={this.buyLand} 
      //   landrecords={this.state.landrecords}
      //   account={this.state.account}/>
      //   <Admin 
      //   landrecords={this.state.landrecords}
      //   approveLandRecord={this.approveLandRecord}
      //   rejectLandRecord={this.rejectLandRecord}/>

       
      // </div>

     // <Landregister createLandRecord={this.createLandRecord} captureFile={this.captureFile} />
      <>
       
      <Router>
      <Navbar account={this.state.account} />
       
        <Switch>
          <Route path='/' exact render ={()=> <Landregister createLandRecord={this.createLandRecord} captureFile={this.captureFile} />} />
          {/* <Route path='/reports' component={Reports} />
          <Route path='/products' component={Products} />
          <Route path='/login' component={LoginPage} />
          <Route path='/enterland' component={EnterRecord} /> */}
          <Route path='/allrecords'render ={()=> <AllRecords buyLand={this.buyLand} buyLandWithoutEther={this.buyLandWithoutEther} landrecords={this.state.landrecords} verificationStatus={this.verificationStatus}/>}/>
          <Route path='/myrecords'render ={()=> <UserRecords landForSale={this.landForSale} landNotForSale={this.landNotForSale} landrecords={this.state.landrecords} account={this.state.account} verificationStatus={this.verificationStatus}/>}/>
          <Route path='/admin'render ={()=> <Admin rejectLandRecord={this.rejectLandRecord} approveLandRecord={this.approveLandRecord} landrecords={this.state.landrecords} account={this.state.account} verificationStatus={this.verificationStatus}/>}/>
          
          
          
        </Switch>
      </Router>
    </>
    );
  }
}

export default App;
