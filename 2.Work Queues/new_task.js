const amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', (err, conn) => {
    if (err) throw err;
    conn.createChannel((err, ch) => {
        if (err) throw err;
        const q = 'task_queue';
        let msg = process.argv.slice(2).join(' ') || "Hello World!";

        ch.assertQueue(q, { durable: true });
        ch.sendToQueue(q, new Buffer.from(msg), { persistent: true });
        console.log(" [x] Sent '%s'", msg);
    });
    setTimeout(() => {
        conn.close();
        process.exit(0)
    }, 500);
});