import { bn } from "fuels";

export const FUEL_MESSAGE_PORTAL = "0x03f2901Db5723639978deBed3aBA66d4EA03aF73";
export const FUEL_CHAIN_STATE = "0xbe7aB12653e705642eb42EF375fd0d35Cfc45b03";

export const MESSAGE_OUT = {
  amount: bn(0),
  data: [
    79, 247, 70, 246, 97, 103, 103, 114, 101, 103, 97, 116, 101, 82, 111, 111,
    116, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ],
  digest: "a6d7e646102900dcbc590015d4688801cb29528e07ced88428606519f701a04e",
  len: 36,
  nonce: "6e73dbd15aba133ee97b8fb33e0b996e1768ddbf4f66d306c5e788747d7f9548",
  recipient: "0000000000000000000000008d8bb34fb9a1a52ac0bddc9901c5c7b5e7347d05",
  sender: "128573a29021c87688cd5cff01f2247400c210741b563c9ad8140009dea2b620",
};

export const MESSAGE_OUT_3 = {
  amount: 0,
  data: [
    79, 247, 70, 246, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 32, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 32, 114, 111, 111,
    116, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0,
  ],
  digest: "6b766ed4875c794d6b54f4713c862727cf8c32984b5c02d377bef7fa547d9bb5",
  len: 100,
  nonce: "c2081a769fe1e0938c9007c84c51f978e57655ac4074f0fde739760b4ec4bf7d",
  recipient: "0000000000000000000000008d8bb34fb9a1a52ac0bddc9901c5c7b5e7347d05",
  sender: "27fc60f2d13d959e5c756ac770e74ce34cf2e11f802ce2cd61961f2e6d399b14",
};
