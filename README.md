# Sending a message from Fuel to ETH

1. Modify `main.sw` with the desired recipient and message data
2. Run `forc build`
3. Run `npm run send -- <SIGNING_KEY>` where the key is the private key with proper funds on Fuel.

Anotate the output 's `MessageOut`, you will need it later

## Example sent message:

```json
[
  {
    "MessageOut": {
      "amount": 0,
      "data": [
        97, 103, 103, 114, 101, 103, 97, 116, 101, 82, 111, 111, 116, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
      ],
      "digest": "3503cc2708f3f91c16e00dfcb4cad647e7d7a98a332e324339b53ffcd6133901",
      "len": 32,
      "nonce": "52a2d864323716ccda6c9c660ffd6e128f4e8f4159949b4aa9bf8bacdf0c3f82",
      "recipient": "0000000000000000000000008d8bb34fb9a1a52ac0bddc9901c5c7b5e7347d05",
      "sender": "1dea0b3859c120208de2322822f65b186618c005c7aa0994cb77f85269b4e680"
    }
  },
  {
    "Return": {
      "id": "0000000000000000000000000000000000000000000000000000000000000000",
      "is": 10344,
      "pc": 10628,
      "val": 0
    }
  },
  { "ScriptResult": { "gas_used": 258, "result": "Success" } }
]
```


# Relaying the sent message in ETH network

Replace:

```ts
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

```

With your own message that you have noted on the first step. Then run:

- `npx hardhat run scripts/simulate_relay.ts` to do a static call and check that the message can be correctly relayed
- `ETH_PRIVATE_KEY="PRIVATE_KEY" npx hardhat run scripts/relay.ts` (or configure it via `.env`) to actually send the transaction and relay the message