import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signers";
import { setup } from "./setup";
import { expect } from "chai";
import { network } from "hardhat";
import { Rarity, mockPokemonInfo } from "./mock/mock";
import { faker } from "@faker-js/faker";
import { Pokemon } from "@typechains";
import { ethers, BigNumber } from "ethers";

//await 간략하게 설명
describe("포켓몬 컨트랙트 테스트", () => {
  /* Signer */
  let admin: SignerWithAddress;
  let users: SignerWithAddress[];

  /* 컨트랙트 객체 */
  let pokemon: Pokemon;

  /* 테스트 스냅샷 */
  let initialSnapshotId: number;
  let snapshotId: number;

  before(async () => {
    /* 테스트에 필요한 컨트랙트 및 Signer 정보를 불러오는 함수 */
    ({ admin, users, pokemon } = await setup());
    initialSnapshotId = await network.provider.send("evm_snapshot");
  });

  beforeEach(async () => {
    snapshotId = await network.provider.send("evm_snapshot");
  });

  afterEach(async () => {
    await network.provider.send("evm_revert", [snapshotId]);
  });

  after(async () => {
    await network.provider.send("evm_revert", [initialSnapshotId]);
  });

  describe

  it("포켓몬이 정상적으로 생성되는가?", async () => {
    const pokemonInfo = mockPokemonInfo({ owner: users[0].address, exp: BigNumber.from(0), rarity: Rarity.COMMON });

    await pokemon.connect(users[0]).birth(pokemonInfo.name);
    const { owner, name, exp, rarity } = await pokemon.pokemonDatas(users[0].address);

    expect(owner).to.equal(pokemonInfo.owner);
    expect(name).to.equal(pokemonInfo.name);
    expect(exp).to.equal(pokemonInfo.exp);
    expect(rarity).to.equal(pokemonInfo.rarity);
  });

  it("포켓폰에게 먹이가 정상적으로 주어지는가?", async () => {
    await pokemon.connect(users[0]).birth("test");
    await pokemon.connect(users[0]).feed()

    const result = await pokemon.pokemonDatas(users[0].address); 
    expect(result.rarity).to.equal(Rarity.RARE); 
    expect(result.exp).to.equal(BigNumber.from(50)); 
    
  });
});