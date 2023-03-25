let Web3 = require('web3');
let Solc = require('solc');
let web3 = new Web3(new Web3.providers.HttpProvider("HTTP://127.0.0.1:8545"));
const fs = require('fs');

const sourceCode = fs.readFileSync('C:\\Users\\HP\\Desktop\\safe\\backend\\contracts\\Cruds.sol').toString();

const compiledCode = Solc.compile(sourceCode, 1);
// const contractABI = JSON.parse(compiledCode.contracts['Cruds'].interface);
console.log(compiledCode.contracts);
// const addContract = web3.eth.contract(contractABI);
// const byteCode = compiledCode.contracts[':Cruds'].bytecode;
// const addDeployed = addContract.new({data: byteCode, from: web3.eth.accounts[0], gas: 4700000});