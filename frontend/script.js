const socket = io();

var name;
function getName() {
    name = prompt("Enter your name: ");
    if(name == null || name == "") 
        name = "anonymous";
    if(name == "\""){
        alert("Invalid name");
        getName();
    }
}
getName();
const ip = (Math.floor(Math.random() * 255) + 1)+"."+(Math.floor(Math.random() * 255))+"."+(Math.floor(Math.random() * 255))+"."+(Math.floor(Math.random() * 255))
    +(Math.floor(Math.random() * 255) + 1)+"."+(Math.floor(Math.random() * 255))+"."+(Math.floor(Math.random() * 255))+"."+(Math.floor(Math.random() * 255))
    +(Math.floor(Math.random() * 255) + 1)+"."+(Math.floor(Math.random() * 255))+"."+(Math.floor(Math.random() * 255))+"."+(Math.floor(Math.random() * 255))
    +(Math.floor(Math.random() * 255) + 1)+"."+(Math.floor(Math.random() * 255))+"."+(Math.floor(Math.random() * 255))+"."+(Math.floor(Math.random() * 255));
socket.emit('new-user', {
    ip  : ip,
    name: name
});
const chatMes = document.querySelector('#message');
const chatForm = document.querySelector('#chatform');
function displayAccountName(){
    var account = document.querySelector('#title');
    account.setAttribute('style','white-space: pre;');
    account.textContent = `${name}\r\n`;
    account.textContent += `${ip}`;
}
displayAccountName();
chatForm.addEventListener('submit', (e) => { 
    var now= new Date();
    fullTime = now.getDate() + '/' + now.getMonth() + '/' + now.getFullYear() + ' ' + now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds();
    time = now.getHours() + ':' + now.getMinutes() ;
    e.preventDefault();
    const message = chatMes.value; 
    if(message == "\""){
        alert("You can't use \"");
        return;
    }
    socket.emit('on-chat', {
        ip: ip,
        name: name,
        message: message,
        time: time,
        fullTime: fullTime
    });
    chatMes.value = '';
})
const messages = document.querySelector('#messages');
socket.on('user-chat', (data) => {
    if(data.message == ''){
        return;
    }
    const chatLabel = document.createElement('i');
    if(data.name == name && data.ip == ip){
        chatLabel.textContent =  `Me\r\n`;
        chatLabel.setAttribute('style', 'white-space: pre; font-weight: bold; font-size: 14px; color: #ff2354; padding-right: 15px; margin-top: 7px;');
    }else{
        chatLabel.textContent =  `${data.name}\r\n`;
        chatLabel.setAttribute('style', 'white-space: pre; font-weight: bold; font-size: 14px; color: #06f; padding-left: 15px; margin-top: 7px;');
    }
    const chatMsg = document.createElement('label');
    if(data.name == name && data.ip == ip)
       chatMsg.setAttribute('style', 'font-size: 20px; padding-right: 30px; white-space: pre; margin-top: 7px;');
    else
        chatMsg.setAttribute('style', 'font-size: 20px; padding-left: 30px; white-space: pre; margin-top: 7px;');
    chatMsg.textContent = `${data.message}\r\n`;

    const chatTime = document.createElement('label');
    if(data.name == name && data.ip == ip)
        chatTime.setAttribute('style', 'font-size: 13px; padding-right: 15px; white-space: pre; margin-top: 7px;');
    else
        chatTime.setAttribute('style', 'font-size: 13px; padding-left: 15px; white-space: pre; margin-top: 7px;');
    chatTime.textContent = `${data.time}`;

    const chatItem = document.createElement('div');
    if(data.name == name && data.ip == ip)
        chatItem.setAttribute('style','text-align: right; paddinng-bottom: 10px;');
    chatItem.appendChild(chatLabel);
    chatItem.appendChild(chatMsg);
    chatItem.appendChild(chatTime);

    messages.appendChild(document.createElement('br'));
    messages.appendChild(chatItem);
})
window.setInterval(function() {
    var elem = document.getElementById('messages');
    elem.scrollTop = elem.scrollHeight;
}, 1);
window.onscroll = function (ev) {
    document.getElementById("message").focus();
}