import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import './App.css';
import Decentrablog from '../abis/Decentrablog.json'
import Navbar from './Navbar'
import Main from './Main'

//Declare IPFS
const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' }) // leaving out the arguments will default to these values

// ===> to see the hashed img https://ipfs.infura.io/ipfs/{hash} <=== //

function App() {
  const [state, setState] = useState({
      account: '',
      decentrablog:null,
      posts: [],
      postsCount: 0,
      loading:true,
      buffer: ''
    }
  )
  
  const loadWeb3= async () => {
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

  const loadBlockchainData = async () => {

    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    setState(prevState => ({
          ...prevState,    
          account: accounts[0]       
      }
    ))

    // Network ID
    const networkId = await web3.eth.net.getId()
    const networkData = Decentrablog.networks[networkId]
    if(networkData) {
      const decentrablog = new web3.eth.Contract(Decentrablog.abi, networkData.address)
      setState(prevState => ({
          ...prevState,    
          decentrablog : decentrablog      
        }
      ))
      const postsCount = await decentrablog.methods.postCount().call()
      setState(prevState => ({
        ...prevState,    
        postsCount : postsCount      
      }
    ))
    // Load posts
    for (var i = 1; i <= postsCount; i++) {
      const post = await decentrablog.methods.posts(i).call()
        setState(prevState => ({
          ...prevState,    
          posts : [...prevState.posts, post]   
          }
        ))
    }
    //Sort posts. Show highest tipped posts first
    setState(prevState => ({
      ...prevState,    
      posts : prevState.posts.sort((a,b) => b.tipAmount - a.tipAmount )  
      }
    ))
    setState(prevState => ({
      ...prevState,    
      loading : false 
      }
    ))
    } else {
      window.alert('Decentrablog contract not deployed to detected network.')
    }
  }

  useEffect( () => {
    loadWeb3()
    loadBlockchainData()
  }, [])

  const captureFile = event => {

    event.preventDefault()
    const file = event.target.files[0]
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    console.log(reader);

    reader.onloadend = () => {
      setState({ ...state, buffer: Buffer(reader.result) })
      console.log('buffer', state.buffer)
    }
  }

  const createPost = body => {
    console.log("Submitting file to ipfs...")

    //adding file to the IPFS
    ipfs.add(state.buffer, (error, result) => {
      console.log('Ipfs result', result)
      if(error) {
        console.error(error)
        return
      }

      setState(prevState => ({
        ...prevState,    
        loading : true 
        }
      ))
      state.decentrablog.methods.createPost(body, result[0].hash)
        .send({ from: state.account })
        .once('confirmation', (confNr) => {
          console.log(confNr);
          setState(prevState => ({
            ...prevState,    
            loading : false 
            }
          ))
          if (confNr === 1) {
            //how to avoid?
            window.location.reload()
          }
      })
    })
  }

  const tipPostOwner = (id, tipAmount) => {
    setState(prevState => ({
      ...prevState,    
      loading : true 
      }
    ))
    state.decentrablog.methods.tipPostOwner(id)
      .send(
        { 
          from: state.account, 
          value: tipAmount 
        }
      )
      .on('confirmation', (confNr) => {
        console.log(confNr);
        if(confNr === 1) {
          setState(prevState => ({
            ...prevState,    
            loading : false 
            }
          ))
          //How to avoid this?
          window.location.reload()
        }
    })
  }

  
    return (
      <div>
        <Navbar account={state.account} />
        { state.loading
          ? <div id="loader" className="text-center mt-5"><p>Loading...</p></div>
          : <Main
              posts={state.posts}  
              captureFile={captureFile}
              createPost={createPost}
              tipPostOwner={tipPostOwner}
            />
        }
      </div>
    );

  }

export default App