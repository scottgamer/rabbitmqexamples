const amqp = require('amqplib/callback_api');
const consumer = require('./consumer');
const publisher = require('./publisher');

amqp.connect('amqp://localhost', (err, conn) => {
    if (err) throw err;
    var msg = 'este es un mensaje';
    publisher.publisher(conn, msg);
    consumer.consumer(conn);
})
