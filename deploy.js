const { ethers } = require("ethers");
const fs = require("fs-extra");
const dotenv = require('dotenv')

dotenv.config()

const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf-8");
const binary = fs.readFileSync(
  "./SimpleStorage_sol_SimpleStorage.bin",
  "utf-8"
);

const main = async () => {
  try {
    const provider = new ethers.JsonRpcProvider(process.env.PROVIDER_URL);
    // console.log(provider)
    const wallet = new ethers.Wallet(
      process.env.WALLET_KEY,
      provider
    );
    const contractFractory = new ethers.ContractFactory(abi, binary, wallet);
    console.log("deploying.......");
    const contract = await contractFractory.deploy();
    const deploymentReciept = await contract.deploymentTransaction().wait(1);
    console.log(`Contract deployed on ${deploymentReciept.contractAddress}`);

    // access contract

    let favNumber = await contract.retrieve();
    console.log("Your Favorite Number is " + favNumber);
    let transactionResponce = await contract.store("10");
    let transactionReciept = await transactionResponce.wait(1);
    favNumber = await contract.retrieve();
    console.log("New Favorite number " + favNumber);
  } catch (err) {
    console.log(err);
  }
};

main();
