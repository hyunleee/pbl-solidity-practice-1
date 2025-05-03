// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./interface/PokemonInterface.sol";

contract Pokemon is PokemonInterface {
    mapping(address => PokemonInfo) public pokemonDatas;
    mapping(address => bool) public isPokemonOwner;

    function birth(string memory name) external override {
        require(!isPokemonOwner[msg.sender], "Only one Pokemon allowed per address");

        pokemonDatas[msg.sender] = PokemonInfo(msg.sender, name, 0, Rarity.COMMON);
        isPokemonOwner[msg.sender] = true;
    }
    function feed() external override {
        require(isPokemonOwner[msg.sender], "You don't have a Pokemon!");
        PokemonInfo memory localPokemon = pokemonDatas[msg.sender];

        localPokemon.exp += 50;

        if (localPokemon.exp >= 50) {
            localPokemon.rarity = Rarity.RARE;
        } else if (localPokemon.exp >= 100) {
            localPokemon.rarity = Rarity.EPIC;
        } else if (localPokemon.exp >= 200) {
            localPokemon.rarity = Rarity.LEGENDARY;
        }

        pokemonDatas[msg.sender] = localPokemon; // localPokemon은 memory 변수이므로 복사본이라 실제 저장소에는 저장되지 않아서 따로 다시 저장해줘야 함.
    }
}
