const amqp = require('amqplib/callback_api');

/**Connect to queue service */
amqp.connect('amqp://localhost', (err, conn) => {
    if (err) throw err;
    conn.createChannel((err, ch) => {
        if (err) throw err;
        /**Set queue to receive from */
        let q = 'hello';
        /**Make queue not persistent */
        ch.assertQueue(q, { durable: false });
        console.log(`[*] Waiting for messages in ${q}. To exit press CTRL+C`);
        ch.consume(q, (msg) => {
            console.log(`[x] Received ${msg.content.toString()}`);
        },
            /**Do not send ACK */
            { noAck: true });
    });
});