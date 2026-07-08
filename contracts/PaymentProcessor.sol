// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./SeleniumCoin.sol";
import "./ElectrumCoin.sol";

contract PaymentProcessor is Ownable {
    SeleniumCoin public seleniumCoin;
    ElectrumCoin public electrumCoin;

    uint256 public combinedBonusRate = 5; // 5% bonus when using both

    event PaymentMade(address indexed payer, uint256 selAmount, uint256 elcAmount, uint256 bonus);

    constructor(address _seleniumCoin, address _electrumCoin, address initialOwner) 
        Ownable(initialOwner) 
    {
        seleniumCoin = SeleniumCoin(_seleniumCoin);
        electrumCoin = ElectrumCoin(_electrumCoin);
    }

    function makePayment(uint256 selAmount, uint256 elcAmount) external {
        require(selAmount > 0 || elcAmount > 0, "Pay with at least one coin");

        uint256 bonus = 0;
        if (selAmount > 0 && elcAmount > 0) {
            bonus = (selAmount + elcAmount) * combinedBonusRate / 100;
        }

        emit PaymentMade(msg.sender, selAmount, elcAmount, bonus);

        if (selAmount > 0) {
            require(seleniumCoin.transferFrom(msg.sender, address(this), selAmount), "SELC transfer failed");
        }
        if (elcAmount > 0) {
            require(electrumCoin.transferFrom(msg.sender, address(this), elcAmount), "ELC transfer failed");
        }
    }

    function setBonusRate(uint256 newRate) external onlyOwner {
        require(newRate <= 20, "Bonus rate too high");
        combinedBonusRate = newRate;
    }

    function withdrawTokens(address token, uint256 amount) external onlyOwner {
        IERC20(token).transfer(msg.sender, amount);
    }
}