script;

use std::{message::send_message, bytes::Bytes};

const RECIPIENT: b256 = 0x0000000000000000000000008d8bb34fb9a1a52ac0bddc9901c5c7b5e7347d05;
// const MESSAGE: b256 = 0x4ff746f6616767726567617465526f6f7400000000000000000000000000000000000000
fn main(recipient: b256) {
    let mut data = Bytes::with_capacity(32);
    // Message to be sent:
    data.push(0x4fu8);
    data.push(0xf7u8);
    data.push(0x46u8);
    data.push(0xf6u8);
    data.append(Bytes::from(0x616767726567617465526f6f7400000000000000000000000000000000000000));

    send_message(RECIPIENT, data, 0);    
}