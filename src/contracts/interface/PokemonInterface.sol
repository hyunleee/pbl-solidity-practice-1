// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;
interface PokemonInterface {
    enum Rarity {
        COMMON,
        RARE,
        EPIC,
        LEGENDARY
    }

    struct PokemonInfo {
        address owner;
        string name;
        uint256 exp;
        Rarity rarity;
    }

    function birth(string memory name) external;

    function feed() external;
}