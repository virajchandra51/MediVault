const fs = require('fs');
const Web3 = require('web3');

const abi = JSON.parse(fs.readFileSync("C:\\Users\\HP\\Desktop\\safe\\backend\\contracts\\Cruds.abi"));
const bytecode = fs.readFileSync("C:\\Users\\HP\\Desktop\\safe\\backend\\contracts\\Cruds.bin").toString();

const web3 = new Web3(new Web3.providers.HttpProvider("HTTP://127.0.0.1:8545"));

async function deploy() {
    // const w3 = new Web3(window.ethereum);
    let contract = new web3.eth.Contract(abi);
    contract = contract.deploy({data: bytecode});

    const deployContract = await contract.send({
        from: "0x0AC807e7CE2866bAafC67DD702395b03F5a8d4c1",
        gas: "6721975",
    })
    console.log(deployContract.options.address);
}

deploy();
