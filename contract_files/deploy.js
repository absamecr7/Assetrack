const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');

const compliedScript = require('./compile');
const bytecode = compliedScript.bytecode;
const abi_interface = compliedScript.abi_interface;


const provider = new HDWalletProvider(
  'bring merge vicious thing wash ethics enter cover blue denial zoo grit',
  'https://rinkeby.infura.io/v3/fe9849311ce14a179bc384560f8260d8'
  
);

const web3 = new Web3(provider);

const deploy = async () => {

  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(abi_interface))
    .deploy({ data: '0x'+ bytecode } )
    .send({ from: accounts[0]} );

  console.log('Contract deployed to', result.options.address);
  console.log(abi_interface);
};

deploy();
