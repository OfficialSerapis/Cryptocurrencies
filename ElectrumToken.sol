// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./SeleniumCoin.sol";
import "./ElectrumCoin.sol";

contract PaymentProcessor {
    SeleniumCoin public seleniumCoin;
    ElectrumCoin public electrumCoin;

    event PaymentMade(address payer, uint256 selAmount, uint256 elcAmount, uint256 bonus);

    constructor(address _seleniumCoin, address _electrumCoin) {
        seleniumCoin = SeleniumCoin(_seleniumCoin);
        electrumCoin = ElectrumCoin(_electrumCoin);
    }

    // Pay with Selenium only, Electrum only, or both (with bonus)
    function makePayment(uint256 selAmount, uint256 elcAmount) external {
        require(selAmount > 0 || elcAmount > 0, "Must pay with at least one coin");

        uint256 bonus = 0;

        if (selAmount > 0 && elcAmount > 0) {
            // Bonus when using both coins (e.g. 5% bonus on total value)
            bonus = (selAmount + elcAmount) * 5 / 100;
            emit PaymentMade(msg.sender, selAmount, elcAmount, bonus);
        } else if (selAmount > 0) {
            emit PaymentMade(msg.sender, selAmount, 0, 0);
        } else {
            emit PaymentMade(msg.sender, 0, elcAmount, 0);
        }

        if (selAmount > 0) {
            require(seleniumCoin.transferFrom(msg.sender, address(this), selAmount), "Selenium transfer failed");
        }
        if (elcAmount > 0) {
            require(electrumCoin.transferFrom(msg.sender, address(this), elcAmount), "Electrum transfer failed");
        }
    }

    // Owner can withdraw collected tokens
    function withdrawTokens(address token, uint256 amount) external onlyOwner {
        IERC20(token).transfer(msg.sender, amount);
    }
}
