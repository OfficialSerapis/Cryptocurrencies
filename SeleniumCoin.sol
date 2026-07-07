// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SeleniumCoin is ERC20, Ownable {
    constructor(address initialOwner) 
        ERC20("Selenium Coin", "SELC") 
        Ownable(initialOwner) 
    {
        // Initial supply can be 0 or small - owner can mint more
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    function burn(uint256 amount) public {
        _burn(msg.sender, amount);
    }
}
