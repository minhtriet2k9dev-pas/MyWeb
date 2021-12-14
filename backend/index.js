const path = require('path');
const http = require('http');
const server = http.createServer((req, res) => {
    switch (req.url) {
        case "/styles.css":
            res.writeHead(200, { "Content-Type": "text/css" });
            res.write(fs.readFileSync(path.join(__dirname, '..', 'frontend', 'styles.css')));
            break;
        case "/script.js":
            res.writeHead(200, { "Content-Type": "text/javascript" });
            res.write(fs.readFileSync(path.join(__dirname, '..', 'frontend', 'script.js')));
            break;
        default:
            res.writeHead(200, { "Content-Type": "text/html" });
            res.write(fs.readFileSync(path.join(__dirname, '..', 'frontend', 'index.html')));
    }
    res.end();
    //res.sendFile();
});
const {
    Server
} = require('socket.io');
const io = new Server(server);
const fs = require('fs');

if (!fs.existsSync('/chat.log')) {
    fs.writeFile(__dirname + '/chat.log', "", function(err) {
        if (err) {
            console.log(err);
        }
    })
}

if (!fs.existsSync('/info.log')) {
    fs.writeFile(__dirname + '/info.log', "", function(err) {
        if (err) {
            console.log(err);
        }
    })
}
// function getChatLog(){
//     fs.readFile(__dirname + '/chat.log','utf-8', function(err,data){
//         if (!err) {
//             return data;
//         } else {
//             console.log(err);
//         }
//     });
// }

// var chatLog = getChatLog();
// console.log(chatLog);
// io.emit('chat-log',chatLog);

io.on('connection', (socket) => {
    //var time = new Date();
    socket.on('new-user', (data) => {
        //console.log('User connected at',time.getHours()+':'+time.getMinutes()+':'+time.getSeconds(),`with name: "${name}"`);
        fs.appendFile(__dirname + "/info.log", JSON.stringify(data) + '\n', function(err) {
            if (err) {
                console.log(err);
            }
        });
    });
    socket.on('on-chat', (message) => {
        io.emit('user-chat', message);
        fs.appendFile(__dirname + "/chat.log", JSON.stringify(message) + '\n', function(err) {
            if (err) {
                return console.log(err);
            }
        });
    });
});

server.listen(3000, () => {
    console.log('Server listening on port 3000');
});