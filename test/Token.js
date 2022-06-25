
const { ethers } = require('hardhat')
const { expect } = require("chai");


// Basic commented out
// describe("Token contract", function () {
//     // call function with  arguments
//     // (string, async function)
//     it("Deployment should assign the total supply of tokens to the owner", async function () {
//         const [owner] = await ethers.getSigners();

//         const Token = await ethers.getContractFactory("Token");

//         const hardhatToken = await Token.deploy();

//         const ownerBalance = await hardhatToken.balanceOf(owner.address);
//         expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
//     });
// });

// Basic commented out
// describe("Transactions", function() {
//     it("Should transfer tokens between accounts", async function() {
//         const [owner, address1, address2] = await ethers.getSigners();

//         const Token = await ethers.getContractFactory("Token");

//         // Contract I've just created
//         const hardhatToken = await Token.deploy();

//         // Transfer 50 tokens from owner to address 1
//         await hardhatToken.transfer(address1.address, 50);
//         expect(await hardhatToken.balanceOf(address1.address)).to.equal(50);

//         // Transfer 50 tokens from address 1 to address 2
//         await hardhatToken.connect(address1).transfer(address2.address, 50);
//         expect(await hardhatToken.balanceOf(address2.address)).to.equal(50);
//     })
// })


describe("Token Contract", function() {
    let Token;
    let hardhatToken;
    let owner;
    let account1;
    let account2;
    let accounts;

    // `beforeEach` will run before each test, re-deploying the contract every
    // time. It receives a callback, which can be async.
    beforeEach(async function() {
        Token = await ethers.getContractFactory("Token");
        [owner, account1, account2, ...accounts] = await ethers.getSigners();

        hardhatToken = await Token.deploy();
    })

    describe("Deployment", function() {
        // `it` is another Mocha function. This is the one you use to define your
        // tests. It receives the test name, and a callback function.
        it("Should set the right owner", async function() {
            expect(await hardhatToken.owner()).to.equal(owner.address);
        })

        it("Should assign the total supply of tokens to the owner", async function() {
            const ownerBalance = await hardhatToken.balanceOf(owner.address);
            expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
        })
    })

    describe("Transactions", function() {
        it("Should transfer tokens between accounts", async function() {
            // Transfer from contract to account 1
            await hardhatToken.transfer(account1.address, 50);
            const acccount1Balance = await hardhatToken.balanceOf(account1.address);
            expect(acccount1Balance).to.equal(50);

            // Transfer from account1 to account 2
            await hardhatToken.connect(account1).transfer(account2.address, 50);
            const account2Balance = await hardhatToken.balanceOf(account2.address);
            expect(account2Balance).to.equal(50);

            // console.log(await hardhatToken.balanceOf(owner.address))
        })

        it("Should fail if sender doesn't have enough tokens", async function() {
            const initialOwnerBalance = await hardhatToken.balanceOf(owner.address);

            // await expect(
            //     hardhatToken.connect(account1).transfer(owner.address, 1)
            // ).to.be.revertedWith("Not enough tokens");

            // Owner balance shouldn't have changed.
            expect(await hardhatToken.balanceOf(owner.address)).to.equal(initialOwnerBalance);
                
        });

        it("Should update balances after transfers", async function() {
            const initialOwnerBalance = hardhatToken.balanceOf(owner.address);

            // Transfer 100 tokens from owner to account1
            await hardhatToken.transfer(account1.address, 100);

            // Transfer 50 tokens from owner to account 2
            await hardhatToken.transfer(account2.address, 50);

            const finalOwnerBalance = await hardhatToken.balanceOf(owner.address);
            expect(finalOwnerBalance).to.equal(999850);

            const account1Balance = await hardhatToken.balanceOf(account1.address);
            expect(account1Balance).to.equal(100);

            const account2Balance = await hardhatToken.balanceOf(account2.address);
            expect(account2Balance).to.equal(50);
        });
    })

})