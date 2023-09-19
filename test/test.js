/* eslint-disable no-undef */
// SPDX-License-Identifier: MIT
import { expect } from "chai";
import pkg from 'hardhat';
const { ethers } = pkg;

describe("OneDistrictOneProduct", function () {
  // let owner;
  let OneDistrictOneProduct;
  let oneDistrictOneProduct;

  const productId = 69;
  const checkpointId = 1;
  const location = "Kolkata";
  const description = "Milk";
  const author = "ArC";

  beforeEach(async function () {
    OneDistrictOneProduct = await ethers.getContractFactory("OneDistrictOneProduct");
    oneDistrictOneProduct = await OneDistrictOneProduct.deploy();
  });

  it("Should fetch author", async function () {
    const res = await oneDistrictOneProduct.getAuthor();

    expect(res).to.equal(author);
  });

  it("Should add a checkpoint", async function () {
    const unitTime = Date.now();
    await oneDistrictOneProduct.addCheckpoint(checkpointId, productId, unitTime, location, description);
    const checkpoint = await oneDistrictOneProduct.getCheckpoint(checkpointId);

    expect(checkpoint.location).to.equal(location);
    expect(checkpoint.description).to.equal(description);
    expect(checkpoint.timestamp).to.equal(unitTime);
  });

  it("Should get checkpoints by product ID", async function () {
    const unitTime = Date.now();
    await oneDistrictOneProduct.addCheckpoint(checkpointId, productId, unitTime, location, description);
    const checkpoints = await oneDistrictOneProduct.getCheckpointsByProductId(productId);

    expect(checkpoints.length).to.equal(1);
    expect(checkpoints[0].location).to.equal(location);
    expect(checkpoints[0].description).to.equal(description);
  });

  it("Should not add a checkpoint with the same ID", async function () {
    const unitTime = Date.now();
    await oneDistrictOneProduct.addCheckpoint(checkpointId, productId, unitTime, location, description);
 
    await expect(
      oneDistrictOneProduct.addCheckpoint(checkpointId, productId, unitTime, location, description)
    ).to.be.revertedWith("Checkpoint with this ID already exists");
  });

  it("Should not get a checkpoint with an invalid ID", async function () {
    await expect(
      oneDistrictOneProduct.getCheckpoint(0)
    ).to.be.revertedWith("Invalid checkpoint ID");
  });
});
