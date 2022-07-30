var EmpireHomesERC721Token = artifacts.require('EmpireHomesERC721Token');

contract('TestERC721Mintable', accounts => {

    const account_one = accounts[0];
    const account_two = accounts[1];
    const totalSupply = 3;

    describe('match erc721 spec', function () {
        
        beforeEach(async function () { 
            this.contract = await EmpireHomesERC721Token.new({from: account_one});

            // TODO: mint multiple tokens
            this.contract.mint(account_one, 1, {from: account_one});
            this.contract.mint(account_one, 2, {from: account_one});
            this.contract.mint(account_two, 3, {from: account_one});
        })

        it('should return total supply', async function () { 
            let result = await this.contract.totalSupply.call();
            assert.equal(totalSupply, result);
        })

        it('should get token balance', async function () { 
            let result = await this.contract.balanceOf(account_one);
            assert.equal(2, result);

            result = await this.contract.balanceOf(account_two);
            assert.equal(1, result);
        })

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async function () { 
            let result = await this.contract.tokenURI(1);
            assert.equal("https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1", result);
        })

        it('should transfer token from one owner to another', async function () { 
            await this.contract.transferFrom(account_two, account_one, 3, {from: account_two});
            let result = await this.contract.ownerOf(3);
            assert.equal(account_one, result);

            result = await this.contract.balanceOf(account_one);
            assert.equal(3, result, "account 1 gains 1 token");

            result = await this.contract.balanceOf(account2);
            assert.equal(0, result, "account 2 loses 1 token");

            result = await this.contract.totalSupply.call();
            assert.equal(totalSupply, result, "total supply stays");
        })
    });

    describe('have ownership properties', function () {
        beforeEach(async function () { 
            this.contract = await EmpireHomesERC721Token.new({from: account_one});
        })

        it('should fail when minting when address is not contract owner', async function () { 
            try {
                await this.contract.mint(account_two, 1, {from: account_two});
              } catch(err) {
                assert.equal(err.reason, "only the owner of the contract can call this method");
              }
        })

        it('should return contract owner', async function () { 
            let result = await this.contract.owner();
            assert.equal(account_one, result);
        })

    });
})