const amqp = require('amqplib/callback_api');

/**Connect to rabbitmq server */
amqp.connect('amqp://localhost', (err, conn) => {
    if (err) throw err;
    conn.createChannel((err, ch) => {
        if (err) throw err;
        /**Instantiate queue */
        const q = 'task_queue';
        let msg = process.argv.slice(2).join(' ') || "Hello World!";
        /**Make queue persistant */
        ch.assertQueue(q, { durable: true });
        ch.sendToQueue(q, new Buffer.from(msg), { persistent: true });
        console.log(" [x] Sent '%s'", msg);
    });
    setTimeout(() => {
        conn.close();
        process.exit(0)
    }, 500);
});