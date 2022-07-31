
// // Test if an ERC721 token can be minted for contract - SolnSquareVerifier
// var SolnSquareVerifier = artifacts.require('./SolnSquareVerifier.sol');
// var Verifier = artifacts.require('Verifier');
// const zokratesProof = require("../../zokrates/code/square/proof.json");

// contract("TestSolnSquareVerifier", accounts => {
//   const account1 = accounts[0];
//   const account2 = accounts[1];

//   beforeEach(async() => {
//     let VerifierContract = await Verifier.new({from: account1});
//     this.contract = await SolnSquareVerifier.new(VerifierContract.address, {from: account1});
//   });

//   // Test if a new solution can be added for contract - SolnSquareVerifier
//   it("should be able to add a new solution", async() => {
//     let result = false;

//     try {
//       await this.contract.addSolution(...Object.values(zokratesProof.proof), zokratesProof.inputs, account2, 1, { from: account2 });
//       result = true;
//     } 
//     catch(e) {
//       console.log(e);
//       result = false;
//     }
//     assert.equal(result, true);
//   });

//   it("should not add new solution if the proof was used previously", async() => {
//     let result = false;

//     try {
//       await this.contract.addSolution(...Object.values(zokratesProof.proof), zokratesProof.inputs, account2, 1, { from: account2 });
//       await this.contract.addSolution(...Object.values(zokratesProof.proof), zokratesProof.inputs, account2, 2, { from: account2 });
//       result = true;
//     } catch(e) {
//       result = false;
//     }
//     assert.equal(result, false);
//   });

//   // Test if an ERC721 token can be minted for contract - SolnSquareVerifier
//   it("should be able to mint new token after solution has been submitted", async() => {
//     let result = false;
//     try {
//       await this.contract.addSolution(...Object.values(zokratesProof.proof), zokratesProof.inputs, account2, 1, { from: account2 });
//       await this.contract.mint(account2, 1, { from: account1 });
//       result = true;
//     } catch(e) {
//       console.log(false);
//       result = false;
//     }
//     assert.equal(result, true);
//   });
// });