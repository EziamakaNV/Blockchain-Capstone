// migrating the appropriate contracts
var Verifier = artifacts.require("./Verifier.sol");
var SolnSquareVerifier = artifacts.require("./SolnSquareVerifier.sol");
var EmpireHomesERC721Token = artifacts.require("./EmpireHomesERC721Token.sol");


module.exports = async (deployer) => {
  await deployer.deploy(Verifier);
  await deployer.deploy(EmpireHomesERC721Token);
  await deployer.deploy(SolnSquareVerifier, Verifier.address);
};
