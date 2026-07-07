const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Token Contracts", function () {
  let seleniumToken;
  let electrumToken;
  let multiToken;
  let owner;
  let addr1;
  let addr2;
  let addrs;

  beforeEach(async function () {
    // Get the ContractFactory and Signers here.
    const SeleniumCoin = await ethers.getContractFactory("SeleniumCoin");
    const ElectrumCoin = await ethers.getContractFactory("ElectrumCoin");
    const MultiTokenPayment = await ethers.getContractFactory("MultiTokenPayment");

    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

    // Deploy selenium token
    seleniumToken = await SeleniumCoin.deploy(ethers.utils.parseEther("1000000"));
    await seleniumToken.deployed();

    // Deploy electrum token
    electrumToken = await ElectrumCoin.deploy(ethers.utils.parseEther("1000000"));
    await electrumToken.deployed();

    // Deploy multi-token contract
    multiToken = await MultiTokenPayment.deploy(
      seleniumToken.address,
      electrumToken.address
    );
    await multiToken.deployed();
  });

  describe("Token Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await seleniumToken.owner()).to.equal(owner.address);
      expect(await electrumToken.owner()).to.equal(owner.address);
    });

    it("Should assign the total supply to the owner", async function () {
      const ownerBalance = await seleniumToken.balanceOf(owner.address);
      expect(await seleniumToken.totalSupply()).to.equal(ownerBalance);

      const ownerBalanceELC = await electrumToken.balanceOf(owner.address);
      expect(await electrumToken.totalSupply()).to.equal(ownerBalanceELC);
    });
  });

  describe("Token Transfers", function () {
    it("Should transfer tokens between accounts", async function () {
      // Transfer 50 tokens from owner to addr1
      await seleniumToken.transfer(addr1.address, ethers.utils.parseEther("50"));
      const addr1Balance = await seleniumToken.balanceOf(addr1.address);
      expect(addr1Balance).to.equal(ethers.utils.parseEther("50"));

      // Transfer 25 tokens from addr1 to addr2
      await seleniumToken.connect(addr1).transfer(addr2.address, ethers.utils.parseEther("25"));
      const addr2Balance = await seleniumToken.balanceOf(addr2.address);
      expect(addr2Balance).to.equal(ethers.utils.parseEther("25"));
    });

    it("Should fail if sender doesn't have enough tokens", async function () {
      const initialOwnerBalance = await seleniumToken.balanceOf(owner.address);
      await expect(
        seleniumToken.connect(addr1).transfer(owner.address, 1)
      ).to.be.revertedWith("ERC20: transfer amount exceeds balance");
      expect(await seleniumToken.balanceOf(owner.address)).to.equal(initialOwnerBalance);
    });

    it("Should update balances after transfers", async function () {
      const initialOwnerBalance = await seleniumToken.balanceOf(owner.address);

      // Transfer 100 tokens from owner to addr1
      await seleniumToken.transfer(addr1.address, ethers.utils.parseEther("100"));

      // Transfer another 50 tokens from owner to addr1
      await seleniumToken.transfer(addr1.address, ethers.utils.parseEther("50"));

      const finalOwnerBalance = await seleniumToken.balanceOf(owner.address);
      expect(finalOwnerBalance).to.equal(initialOwnerBalance.sub(ethers.utils.parseEther("150")));

      const addr1Balance = await seleniumToken.balanceOf(addr1.address);
      expect(addr1Balance).to.equal(ethers.utils.parseEther("150"));
    });
  });

  describe("Multi-Token Payment", function () {
    it("Should allow multi-token payments", async function () {
      // Transfer some tokens to addr1
      await seleniumToken.transfer(addr1.address, ethers.utils.parseEther("100"));
      await electrumToken.transfer(addr1.address, ethers.utils.parseEther("100"));

      // Approve multi-token contract to spend tokens
      await seleniumToken.connect(addr1).approve(multiToken.address, ethers.utils.parseEther("50"));
      await electrumToken.connect(addr1).approve(multiToken.address, ethers.utils.parseEther("50"));

      // Make a multi-token payment
      await multiToken.connect(addr1).pay(ethers.utils.parseEther("50"), ethers.utils.parseEther("50"));

      // Check balances
      const seleniumBalance = await seleniumToken.balanceOf(addr1.address);
      const electrumBalance = await electrumToken.balanceOf(addr1.address);

      expect(seleniumBalance).to.equal(ethers.utils.parseEther("50"));
      expect(electrumBalance).to.equal(ethers.utils.parseEther("50"));
    });

    it("Should fail if insufficient tokens", async function () {
      // Transfer some tokens to addr1
      await seleniumToken.transfer(addr1.address, ethers.utils.parseEther("100"));

      // Approve multi-token contract to spend tokens
      await seleniumToken.connect(addr1).approve(multiToken.address, ethers.utils.parseEther("50"));

      // Try to make a payment with insufficient ELC
      await expect(
        multiToken.connect(addr1).pay(ethers.utils.parseEther("50"), ethers.utils.parseEther("100"))
      ).to.be.revertedWith("Insufficient SLC");
    });
  });

  describe("Token Minting and Burning", function () {
    it("Should allow owner to mint tokens", async function () {
      const initialSupply = await seleniumToken.totalSupply();
      await seleniumToken.mint(addr1.address, ethers.utils.parseEther("1000"));
      const newSupply = await seleniumToken.totalSupply();
      expect(newSupply).to.equal(initialSupply.add(ethers.utils.parseEther("1000")));
    });

    it("Should prevent non-owner from minting", async function () {
      await expect(
        seleniumToken.connect(addr1).mint(addr2.address, ethers.utils.parseEther("1000"))
      ).to.be.revertedWith("Ownable: caller is not the owner");
    });

    it("Should allow token burning", async function () {
      // Transfer tokens to addr1
      await seleniumToken.transfer(addr1.address, ethers.utils.parseEther("100"));

      // Connect as addr1 and burn tokens
      await seleniumToken.connect(addr1).burn(ethers.utils.parseEther("50"));

      const addr1Balance = await seleniumToken.balanceOf(addr1.address);
      expect(addr1Balance).to.equal(ethers.utils.parseEther("50"));
    });

    it("Should prevent burning more than balance", async function () {
      await expect(
        seleniumToken.connect(addr1).burn(ethers.utils.parseEther("1000"))
      ).to.be.revertedWith("ERC20: burn amount exceeds balance");
    });
  });
});
