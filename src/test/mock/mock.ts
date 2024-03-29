import { Pokemon } from "@typechains";
import { faker } from "@faker-js/faker";
import { ethers, BigNumber } from "ethers";

export enum Rarity {
  COMMON,
  RARE,
  EPIC,
  LEGENDARY,
}

export interface PokemonInfo {
  owner: string;
  name: string;
  exp: BigNumber;
  rarity: Rarity;
}

export const mockPokemonInfo = (data?: Partial<PokemonInfo>): PokemonInfo => {
  return {
    owner: faker.finance.ethereumAddress(),
    name: faker.name.firstName(),
    exp: BigNumber.from(faker.datatype.number({ min: 0, max: 1000 })), // Example to generate a random experience
    rarity: faker.helpers.arrayElement([Rarity.COMMON, Rarity.RARE, Rarity.EPIC, Rarity.LEGENDARY]),
    ...data,
  };
};