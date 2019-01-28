const amqp = require('amqplib/callback_api');

/**Connect to rabbitmq server */
amqp.connect('amqp://localhost', (err, conn) => {
    if (err) throw err;
    conn.createChannel((err, ch) => {
        if (err) throw err;
        /**Receive from queue */
        const q = 'task_queue';
        /**Make queue persistant */
        ch.assertQueue(q, { durable: true });
        /**Dispatch msgs to less busy workers */
        ch.prefetch(1);
        console.log(`[*] Waiting for messages in ${q}. To exit press CTRL+C`);
        ch.consume(q, (msg) => {
            let secs = msg.content.toString().split('.').length - 1;
            console.log(" [x] Received %s", msg.content.toString());
            setTimeout(() => {
                console.log(" [x] Done");
                ch.ack(msg);
            }, secs * 1000);
        }, { noAck: false });
    });
});