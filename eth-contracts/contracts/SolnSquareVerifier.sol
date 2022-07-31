//pragma solidity >=0.4.21 <0.6.0;
// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <=0.8.1;
// TODO define a contract call to the zokrates generated solidity contract <Verifier> or <renamedVerifier>
import "./Verifier.sol";
import "./ERC721Mintable.sol";




// TODO define another contract named SolnSquareVerifier that inherits from your ERC721Mintable class
contract SolnSquareVerifier is EmpireHomesERC721Token{

    Verifier private verifierContract;

    constructor(address verifierAddress) {
        verifierContract = Verifier(verifierAddress);
    }
    // TODO define a solutions struct that can hold an index & an address
    struct Solution {
        uint index;
        uint256[2] input;
        uint256 tokenID;
        address owner;
        bool isMinted;
    }


    // TODO define an array of the above struct
    mapping(bytes32 => Solution) private solutions;

    // TODO define a mapping to store unique solutions submitted
    mapping(uint256 => bytes32) private uniqueSolutions;



    // TODO Create an event to emit when a solution is added
    event SolutionAdded(address indexed owner, uint256 indexed tokenID);



    // TODO Create a function to add the solutions to the array and emit the event
    function addSolution(Verifier.Proof memory proof, uint[2] memory input, address account, uint256 tokenID) public {
        require(verifierContract.verifyTx(proof, input), "unable to verify the solution");

        bytes32 solutionKey = keccak256(abi.encodePacked(input[0], input[1]));
        require(solutions[solutionKey].tokenID == 0, "This solution has already been used previously; You need to create a new one.");

        uniqueSolutions[tokenID] = solutionKey;
        solutions[solutionKey].owner = account;
        solutions[solutionKey].tokenID = tokenID;
        solutions[solutionKey].input = input;

        emit SolutionAdded(account, tokenID);
    }



    // TODO Create a function to mint new NFT only after the solution has been verified
    //  - make sure the solution is unique (has not been used before)
    //  - make sure you handle metadata as well as tokenSuplly
    function mint(address to, uint256 tokenID) public override returns(bool) {
    bytes32 solutionKey = uniqueSolutions[tokenID];
    require(solutionKey != bytes32(0), "no solution added for given token ID");
    require(!solutions[solutionKey].isMinted, "the token has already been minted");

    address owner = solutions[uniqueSolutions[tokenID]].owner;
    require(owner == to, "wrong token owner address provided");

    solutions[solutionKey].isMinted = true;
    return super.mint(to, tokenID);
  }
}



  


























