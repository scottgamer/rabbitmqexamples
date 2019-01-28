const amqp = require('amqplib/callback_api');

/**Connect to RabbitMQ server */
amqp.connect('amqp://localhost', (err, conn) => {
    if (err) throw err;
    conn.createChannel((err, channel) => {
        if (err) throw err;
        let q = 'hello';

        channel.assertQueue(q, { durable: false });
        channel.sendToQueue(q, new Buffer.from('Hello World'));
        console.log(`[x] Sent 'Hello World!'`);
    });
    setTimeout(() => {
        conn.close();
        process.exit(0);
    }, 500);
});


