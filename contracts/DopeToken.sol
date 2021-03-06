// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract DopeToken{

    string public name = "Dope Token";
    string public symbol = "DOP";
    string public standard = "Dope Token v1.0";
    uint256 public totalSupply;

    event Transfer(
        address indexed _from,
        address indexed _to,
        uint256 _value
    );

    mapping(address => uint256) public balanceOf;

    constructor (uint256 _initialSupply) public{
        balanceOf[msg.sender] = _initialSupply;
        totalSupply = _initialSupply;
    }

    function transfer(address _to , uint _value) 
    public 
    returns(bool success){

        require(balanceOf[msg.sender] >= _value);

        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;

        emit Transfer(msg.sender, _to, _value);

        return true;
    }



}