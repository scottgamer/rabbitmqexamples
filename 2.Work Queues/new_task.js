const amqp = require('amqplib/callback_api');

/**Connect to rabbitmq server */
amqp.connect('amqp://localhost', (err, conn) => {
    if (err) throw err;
    conn.createChannel((err, ch) => {
        if (err) throw err;
        /**Instantiate queue */
        const q = 'task_queue';
        let msg = process.argv.slice(2).join(' ') || "Hello World!";
        ch.assertQueue(q, { durable: true });
        for (let i = 0; i < 100; i++) {
            ch.sendToQueue(q, new Buffer.from(msg + " " + i), { persistent: true });
            console.log(` [x] Sent ${msg} ${i}`);
        }
    });
    setTimeout(() => {
        conn.close();
        process.exit(0)
    }, 500);
});