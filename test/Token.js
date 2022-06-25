
const { ethers } = require('hardhat')
const { expect } = require("chai");

describe("Token contract", function () {
    // call function with  arguments
    // (string, async function)
    it("Deployment should assign the total supply of tokens to the owner", async function () {
        const [owner] = await ethers.getSigners();

        const Token = await ethers.getContractFactory("Token");

        const hardhatToken = await Token.deploy();

        const ownerBalance = await hardhatToken.balanceOf(owner.address);
        expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
    });
});


describe("Transactions", function() {
    it("Should transfer tokens between accounts", async function() {
        const [owner, address1, address2] = await ethers.getSigners();

        const Token = await ethers.getContractFactory("Token");

        // Contract I've just created
        const hardhatToken = await Token.deploy();

        // Transfer 50 tokens from owner to address 1
        await hardhatToken.transfer(address1.address, 50);
        expect(await hardhatToken.balanceOf(address1.address)).to.equal(50);

        // Transfer 50 tokens from address 1 to address 2
        await hardhatToken.connect(address1).transfer(address2.address, 50);
        expect(await hardhatToken.balanceOf(address2.address)).to.equal(50);
    })
})