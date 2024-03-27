// Importation d'ethers depuis Hardhat
const hre = require("hardhat");

async function main() {
  // Compilation des contrats si nécessaire
  await hre.run('compile');

  // Récupération du contrat à déployer
  const LiquidityPool = await hre.ethers.getContractFactory("LiquidityPool");
  
  // Déploiement du contrat
  const liquidityPool = await LiquidityPool.deploy();
  await liquidityPool.deployed();

  console.log("LiquidityPool déployé à l'adresse :", liquidityPool.address);
}

// Nous recommandons cette approche de pattern pour pouvoir exécuter le script à la fois
// en tant que script 'standalone' (via `node script.js`) ou importé dans d'autres scripts.
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
