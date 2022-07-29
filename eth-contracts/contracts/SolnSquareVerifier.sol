pragma solidity >=0.4.21 <0.6.0;

// TODO define a contract call to the zokrates generated solidity contract <Verifier> or <renamedVerifier>
import "./Verifier.sol";
// import library from Verifier.sol

import "./ERC721Mintable.sol";




// TODO define another contract named SolnSquareVerifier that inherits from your ERC721Mintable class
contract SolnSquareVerifier extends EmpireHomesERC721Token{

    Verifier private verifierContract;

    constructor(address verifierAddress) public {
        verifierContract = Verifier(address);
    }
    // TODO define a solutions struct that can hold an index & an address
    struct Solution {
        uint index;
        address address;
        uint256 tokenID;
        address owner;
    }


    // TODO define an array of the above struct
    mapping(bytes32 => Solution) private solutions;

    // TODO define a mapping to store unique solutions submitted
    mapping(uint256 => bytes32) private uniqueSolutions;



    // TODO Create an event to emit when a solution is added
    event SolutionAdded(address indexed owner, uint256 indexed tokenID);



    // TODO Create a function to add the solutions to the array and emit the event
    function addSolution(Solution solution) public {
        solutions[solution.index] = solution;
        emit SolutionAdded(msg.sender, solution.tokenID);
    }



    // TODO Create a function to mint new NFT only after the solution has been verified
    //  - make sure the solution is unique (has not been used before)
    //  - make sure you handle metadata as well as tokenSuplly
}



  


























