// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.9;

interface FuelChainState {
    error UnknownBlock();
    event CommitSubmitted(uint256 indexed commitHeight, bytes32 blockHash);

    function blockHashAtCommit(uint256 commitHeight) external view returns (bytes32);
    function finalized(bytes32 blockHash, uint256 blockHeight) external view returns (bool);
}