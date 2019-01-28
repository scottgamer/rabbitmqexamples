const amqp = require('amqplib/callback_api');

/**Connect to rabbitmq service */
amqp.connect('amqp://localhost', (err, conn) => {
    if (err) throw err;
    conn.createChannel((err, ch) => {
        if (err) throw err;
        /**Set exchange name*/
        let ex = 'logs';
        let msg = process.argv.slice(2).join(' ') || 'Hello World!';

        /**Set exchange type */
        ch.assertExchange(ex, 'fanout', { durable: false });
        /**Publish to exchange */
        ch.publish(ex, '', new Buffer.from(msg));
        console.log(`[x] Sent ${msg}`);
    });

    setTimeout(() => {
        conn.close();
        process.exit(0)
    }, 500);
});