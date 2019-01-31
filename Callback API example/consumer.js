exports.consumer = (conn) => {
    var q = 'tasks';
    conn.createChannel(onOpen);

    function onOpen(err, ch) {
        if (err) throw err;
        ch.assertQueue(q);
        ch.consume(q, (msg) => {
            if (msg !== null) {
                console.log(msg.content.toString());
                ch.ack(msg);
            }
        }, { noAck: false });
    }
}