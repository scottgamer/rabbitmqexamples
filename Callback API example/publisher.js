exports.publisher = (conn, msg) => {
    var q = 'tasks';
    conn.createChannel(onOpen);
    onClose();

    function onOpen(err, ch) {
        if (err) throw err;
        ch.assertQueue(q);
        ch.sendToQueue(q, Buffer.from(msg));
    }

    function onClose() {
        setTimeout(() => {
            conn.close();
            process.exit(0);
        }, 100);
    }
}