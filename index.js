const Parser = require('redis-parser');// to parse the data sent by user
const net = require('net');

const server = net.createServer(connection => {
    console.log("Connection has been successful");
    const store = {}; 

    const parser = new Parser({ // Parser is also *outside*
        returnReply: (reply) => {
            const command = reply[0].toLowerCase(); // Handle case variations
            switch (command) {
                case 'set': {
                    const key = reply[1];
                    const value = reply.slice(2).join(' ');
                    store[key] = value;
                    connection.write('+OK\r\n');
                    break;
                }
                case 'get': {
                    const key = reply[1];
                    const value = store[key];
                    if (value === undefined) {
                        connection.write('$-1\r\n');
                    } else {
                        connection.write(`$${value.length}\r\n${value}\r\n`);
                    }
                    break;
                }
                default: {
                    console.log("Unknown command:", command);
                    connection.write('-ERR unknown command\r\n');
                }
            }
        },
        returnError: (err) => {
            console.error('Parser Error:', err); // Use console.error for errors
            connection.write(`-ERR ${err.message}\r\n`); // Send error to client
        }
    });

    connection.on('data', data => {
        parser.execute(data); // Now use the *same* parser instance
        console.log("Received:", data.toString()); // Log received data
        // Remove this line. It's causing an extra, incorrect +OK
        // connection.write('+OK\r\n'); 
    });

    connection.on('end', () => {
        console.log("Client disconnected");
    });

    connection.on('error', (err) => {
        console.error("Connection error:", err);
    });
});

server.listen(7000, () => console.log("Custom Redis Server on the run"));