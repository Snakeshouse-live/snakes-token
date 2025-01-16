// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.27;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";

contract SnakesToken is ERC20, ERC20Burnable, ERC20Permit, ERC20Votes, Ownable {
    // Mapping to track frozen accounts
    mapping(address => bool) private _frozenAccounts;
    // Events for freezing and unfreezing accounts
    event AccountFrozen(address indexed account);
    event AccountUnfrozen(address indexed account);

    constructor(
        address initialOwner
    )
        ERC20("Blue Snakes", "SNAKES")
        ERC20Permit("Blue Snakes")
        Ownable(initialOwner)
    {
        _mint(msg.sender, 1000000000 * 10 ** decimals()); // 1,000,000,000 tokens
    }

    // Modifier to check if account is frozen
    modifier notFrozen(address account) {
        require(!_frozenAccounts[account], "Blue Snakes: Account is frozen");
        _;
    }

    // Function to freeze an account (only owner can freeze)
    function freezeAccount(address account) external onlyOwner {
        _frozenAccounts[account] = true;
        emit AccountFrozen(account);
    }

    // Function to unfreeze an account (only owner can unfreeze)
    function unfreezeAccount(address account) external onlyOwner {
        _frozenAccounts[account] = false;
        emit AccountUnfrozen(account);
    }

    // Check if an account is frozen
    function isFrozen(address account) public view returns (bool) {
        return _frozenAccounts[account];
    }

    // The following functions are overrides required by Solidity.
    function _update(
        address from,
        address to,
        uint256 value
    ) internal override(ERC20, ERC20Votes) {
        // Check if the sender or recipient is frozen
        if (from != address(0)) {
            require(
                !_frozenAccounts[from],
                "Blue Snakes: Sender account is frozen"
            );
        }
        if (to != address(0)) {
            require(
                !_frozenAccounts[to],
                "Blue Snakes: Recipient account is frozen"
            );
        }
        // Call parent update logic
        super._update(from, to, value);
    }

    function nonces(
        address owner
    ) public view override(ERC20Permit, Nonces) returns (uint256) {
        return super.nonces(owner);
    }
}
