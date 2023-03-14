const { ethers } = require("ethers");
const fs = require("fs-extra");

const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf-8");
const binary = fs.readFileSync(
  "./SimpleStorage_sol_SimpleStorage.bin",
  "utf-8"
);

const main = async () => {
  try {
    const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
    const wallet = new ethers.Wallet(
      "0x06949fb218237bd72b2d7e7d822a0f8ce5ab8698368d52249df087940c50d88c",
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
