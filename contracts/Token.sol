// SPDX-License-Identifier: UNLICENSED

import "hardhat/console.sol";

pragma solidity ^0.7.0;

// This is the main building block for smart contracts.
contract Token {

    // Some string type variables to identify the token.
    // The `public` modifier makes a variable readable from outside the contract.
    string public name = "My Hardhar Token";
    string public symbol = "MHT";

    // The fixed amount of tokens stored in an unsigned integer type variable.
    uint256 public totalSupply = 1000000;

    // An address type variable is used to store ethereum accounts.
    address public owner;

    // A mapping is a key/value map. Here we store each account balance.
    mapping(address => uint256) balances;

    constructor() {
        // The totalSupply is assigned to transaction sender
        // which is the account that is deploying the contract.
        balances[msg.sender] = totalSupply;
        owner = msg.sender;
    }

    /**
     * A function to transfer tokens.
     *
     * The `external` modifier makes a function *only* callable from outside
     * the contract.
     * if wanna call inside, you need 'this' keyword
     */
    function transfer(address to, uint256 amount) external {

        console.log("Sender balance is %s token", balances[msg.sender]);
        console.log("Trying to send %s tokens to %s", amount, to);
        // Check if the transaction sender has enough tokens.
        // If `require`'s first argument evaluates to `false` then the
        // transaction will revert.
        require(balances[msg.sender] >= amount, "Insufficient balance");

        // Transfer the amount
        balances[msg.sender] -= amount;
        balances[to] += amount;
    }

    function balanceOf(address account) external view returns (uint256) {
        return balances[account];
    }
}