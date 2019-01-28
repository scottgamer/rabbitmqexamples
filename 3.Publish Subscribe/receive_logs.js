const amqp = require('amqplib/callback_api');

/**Connect to rabbitmq service */
amqp.connect('amqp://localhost', (err, conn) => {
    if (err) throw err;
    conn.createChannel((err, ch) => {
        if (err) throw err;
        /**Set exchange name */
        var ex = 'logs';
        /**Set exchange type */
        ch.assertExchange(ex, 'fanout', { durable: false });
        /**When connection closes, delete queue */
        ch.assertQueue('', { exclusive: true }, (err, q) => {
            if (err) throw err;
            console.log(`[*] Waiting for messages in ${q.queue}. To exit press CTRL+C`);
            /**Bind exchange to queue */
            ch.bindQueue(q.queue, ex, '');

            ch.consume(q.queue, (msg) => {
                if (msg.content) {
                    console.log(`[x] Message received: ${msg.content.toString()}`);
                }
            }, { noAck: true });
        });
    });
});