// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Recipient {
    event Data(bytes data);

    fallback() external {
        emit Data(msg.data);
    }
}
