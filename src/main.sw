// contract;

// use std::{message::send_message, bytes::Bytes};

// abi Sender {
//     fn send_message(recipient: b256);
// }

// impl Sender for Contract {
//     fn send_message(recipient: b256) {
        // let mut data = Bytes::with_capacity(32);
        // // Message to be sent:
        // data.append(Bytes::from(0x616767726567617465526f6f7400000000000000000000000000000000000000));

        // send_message(recipient, data, 0);    
//     }
// }

script;

use std::{message::send_message, bytes::Bytes};

const RECIPIENT: b256 = 0x0000000000000000000000008d8bb34fb9a1a52ac0bddc9901c5c7b5e7347d05;
const MESSAGE: b256 = 0x616767726567617465526f6f7400000000000000000000000000000000000000;

fn main(recipient: b256) {
    let mut data = Bytes::with_capacity(32);
    // Message to be sent:
    data.append(Bytes::from(MESSAGE));

    send_message(RECIPIENT, data, 0);    
}