// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract DopeToken{

    string public name = "Dope Token";
    string public symbol = "DOP";
    string public standard = "Dope Token v1.0";
    uint256 public totalSupply;

    mapping(address => uint256) public balanceOf;

    constructor (uint256 _initialSupply) public{
        balanceOf[msg.sender] = _initialSupply;
        totalSupply = _initialSupply;
    }
}