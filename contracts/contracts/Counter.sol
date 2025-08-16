// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Counter {
    uint256 private count;
    event Increment(address indexed by, uint256 newCount);

    function getCount() external view returns (uint256) {
        return count;
    }

    function increment() external {
        unchecked { count += 1; }
        emit Increment(msg.sender, count);
    }
}