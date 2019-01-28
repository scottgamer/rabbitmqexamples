const amqp = require('amqplib/callback_api');

/**Connect to queue service */
amqp.connect('amqp://localhost', (err, conn) => {
    if (err) throw err;
    conn.createChannel((err, ch) => {
        if (err) throw err;
        let q = 'hello';
        ch.assertQueue(q, { durable: false });
        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q);
        ch.consume(q, (msg) => {
            console.log(" [x] Received %s", msg.content.toString());
        }, { noAck: true });
    });
});