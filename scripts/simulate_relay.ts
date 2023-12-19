import hre from "hardhat";

import { Provider, ReceiptMessageOutCoder, bn } from "fuels";
import {
  FUEL_CHAIN_STATE,
  FUEL_MESSAGE_PORTAL,
  MESSAGE_OUT,
} from "./constants";
import {
  FuelChainState__factory,
  FuelMessagePortal__factory,
} from "../typechain-types";
import { createRelayMessage } from "./createRelayMessage";

const FUEL_RPC_URL = "https://beta-4.fuel.network/graphql";

const main = async () => {
  const eth_provider = hre.ethers.provider;
  const fuel_provider = await Provider.create(FUEL_RPC_URL);

  const chain_state = FuelChainState__factory.connect(
    FUEL_CHAIN_STATE,
    eth_provider
  );

  const message_portal = FuelMessagePortal__factory.connect(
    FUEL_MESSAGE_PORTAL,
    eth_provider
  );

  const filter = chain_state.filters.CommitSubmitted();
  const currentBlock = await eth_provider.getBlockNumber();

  const [lastCommittedBlock] = await chain_state.queryFilter(
    filter,
    currentBlock - 1000
  );

  const lastFinalizedBlock = await chain_state.blockHashAtCommit(
    lastCommittedBlock.args.commitHeight - 1n
  );

  const messageId = ReceiptMessageOutCoder.getMessageId({
    sender: "0x" + MESSAGE_OUT.sender,
    recipient: "0x" + MESSAGE_OUT.recipient,
    nonce: "0x" + MESSAGE_OUT.nonce,
    amount: bn(MESSAGE_OUT.amount),
    data: new Uint8Array(MESSAGE_OUT.data),
  });

  const transactionId = `0x${MESSAGE_OUT.sender}`;

  const receipts = await fuel_provider.operations.getTransactionWithReceipts({
    transactionId,
  });

  if (receipts.transaction?.status?.type !== "SuccessStatus") {
    throw new Error("Transaction was not successful");
  }

  const message_proof = await fuel_provider.getMessageProof(
    transactionId,
    messageId,
    lastFinalizedBlock
  );

  if (!message_proof) {
    throw new Error("Could not create proof");
  }

  const {
    message,
    rootBlockHeader,
    blockHeader,
    blockInHistoryProof,
    messageInBlockProof,
  } = createRelayMessage(message_proof);

  await message_portal.relayMessage.staticCall(
    message,
    rootBlockHeader,
    blockHeader,
    blockInHistoryProof,
    messageInBlockProof
  ); // If it does not revert, then all is good
};

main()
  .then(() => {
    console.log("\t>Simulation successful");
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
