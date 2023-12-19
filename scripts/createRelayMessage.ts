import { MessageProof, arrayify } from "fuels";

type MessageBlockHeader = {
  prevRoot: string;
  height: string;
  timestamp: string;
  daHeight: string;
  txCount: string;
  outputMessagesCount: string;
  txRoot: string;
  outputMessagesRoot: string;
};

// The BlockHeader structure.
type CommitBlockHeader = {
  prevRoot: string;
  height: string;
  timestamp: string;
  applicationHash: string;
};

// The MessageOut structure.
type Message = {
  sender: string;
  recipient: string;
  amount: string;
  nonce: string;
  data: string;
};

type Proof = {
  key: string;
  proof: Array<Uint8Array>;
};

export function createRelayMessage(proof: MessageProof) {
  // construct data objects for relaying message on L1
  const message: Message = {
    sender: proof.sender.toHexString(),
    recipient: proof.recipient.toHexString(),
    amount: proof.amount.toHex(),
    nonce: proof.nonce,
    data: proof.data,
  };
  const header = proof.messageBlockHeader;
  const blockHeader: MessageBlockHeader = {
    prevRoot: header.prevRoot,
    height: header.height.toString(),
    timestamp: header.time,
    daHeight: header.daHeight.toString(),
    txCount: header.transactionsCount.toString(),
    txRoot: header.transactionsRoot,
    outputMessagesRoot: header.messageReceiptRoot,
    outputMessagesCount: header.messageReceiptCount.toString(),
  };
  const messageProof = proof.messageProof;
  // Create the message proof object
  const messageInBlockProof: Proof = {
    key: messageProof.proofIndex.toString(),
    proof: messageProof.proofSet.map((p) => arrayify(p)),
  };

  // construct data objects for relaying message on L1 (cont)
  const rootHeader = proof.commitBlockHeader;
  const rootBlockHeader: CommitBlockHeader = {
    prevRoot: rootHeader.prevRoot,
    height: rootHeader.height.toString(),
    timestamp: rootHeader.time,
    applicationHash: rootHeader.applicationHash,
  };
  const blockProof = proof.blockProof;
  // Create the block proof object
  const blockInHistoryProof: Proof = {
    key: blockProof.proofIndex.toString(),
    proof: blockProof.proofSet.map((p) => arrayify(p)),
  };

  return {
    message,
    rootBlockHeader,
    blockHeader,
    blockInHistoryProof,
    messageInBlockProof,
  };
}
