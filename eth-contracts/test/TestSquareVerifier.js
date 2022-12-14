// define a variable to import the <Verifier> or <renamedVerifier> solidity contract generated by Zokrates
var Verifier = artifacts.require('Verifier');
const zokratesProof = require("../../zokrates/code/square/proof.json");



contract('TestVerifier', accounts => {
    const owner = accounts[0];

    beforeEach(async() => {
        this.contract = await Verifier.new({from: owner});
    });

    // Test verification with correct proof
    // - use the contents from proof.json generated from zokrates steps
    it("should verify the contents from proof.json generated from zokrates steps", async() => {
        let result = await this.contract.verifyTx.call(...Object.values(zokratesProof.proof), zokratesProof.inputs);
        assert.equal(result, true)
    });
    
    // Test verification with incorrect proof
    it("should not verify incorrect proof", async() => {
        let result = await this.contract.verifyTx.call(...Object.values(zokratesProof.proof), [9, 10]);
        assert.equal(result, false);
    });
});