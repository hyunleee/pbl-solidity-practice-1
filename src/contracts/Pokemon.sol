// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./interface/PokemonInterface.sol";

contract Pokemon is PokemonInterface {
    mapping(address => PokemonInfo) public pokemonDatas;
    mapping(address => bool) public isPokemonOwner;

    function birth(string memory name) external override {
        
    }

    function feed() external override {
        
    }
}
