// scripts/deploy.js
import pkg from 'hardhat';
const { ethers } = pkg;

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const OneDistrictOneProduct = await ethers.getContractFactory("OneDistrictOneProduct");
  const oneDistrictOneProduct = await OneDistrictOneProduct.deploy();
  await oneDistrictOneProduct.deployed();

  console.log("OneDistrictOneProduct contract deployed to:", oneDistrictOneProduct.address);

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
