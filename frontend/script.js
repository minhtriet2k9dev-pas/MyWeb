const socket = io();

var name = "";
var thisUserSent = false;

function getName() {
	name = prompt("Enter your name: ");
	if (name == null || name == "") {
		alert("Please enter a valid name");
		getName();
	}
	if (name == '"') {
		alert("Invalid name");
		getName();
	}
}

var time = new Date();
getName();
const login = {
	name: name,
	time:
		time.getDate() +
		"/" +
		time.getMonth() +
		"/" +
		time.getFullYear() +
		"  " +
		time.getHours() +
		":" +
		time.getHours() +
		":" +
		time.getMinutes() +
		":" +
		time.getSeconds(),
};

socket.emit("new-user", login);
const chatMes = document.querySelector("#message");
const chatForm = document.querySelector("#chatform");

function displayAccountName() {
	var account = document.querySelector("#title");
	account.setAttribute("style", "white-space: pre;");
	account.textContent = `${name}`;
}

displayAccountName();

chatForm.addEventListener("submit", (e) => {
	thisUserSent = true;
	const now = new Date();
	e.preventDefault();
	//const chatMes = document.querySelector('#message');
	var message = "";
	const fullTime =
		now.getDate() +
		"/" +
		now.getMonth() +
		"/" +
		now.getFullYear() +
		" " +
		now.getHours() +
		":" +
		now.getMinutes() +
		":" +
		now.getSeconds();
	time = now.getHours() + ":" + now.getMinutes();
	message = chatMes.value;
	//message = replaceEmoji(message);
	chatMes.value = "";

	if (message == '"') {
		alert("You can't use \"");
		return;
	}
	const chat = {
		name: name,
		message: message,
		time: time,
		fullTime: fullTime,
	};
	socket.emit("on-chat", chat);
});

var messages = document.querySelector("#messages");

socket.on("user-chat", (data) => {
	//alert("bruh");
	if (data.message == "") {
		return;
	}
	var chatLabel = document.createElement("i");
	if (thisUserSent) {
		chatLabel.textContent = `Me\r\n`;
		chatLabel.setAttribute(
			"style",
			"white-space: pre; font-weight: bold; font-size: 14px; color: #ff2354; padding-right: 15px; margin-top: 7px;"
		);
	} else {
		chatLabel.textContent = `${data.name}\r\n`;
		chatLabel.setAttribute(
			"style",
			"white-space: pre; font-weight: bold; font-size: 14px; color: #06f; padding-left: 15px; margin-top: 7px;"
		);
	}
	// TODO : add time
	// FIXME : add time
	var chatMsg = document.createElement("label");
	if (thisUserSent) {
		chatMsg.setAttribute(
			"style",
			"font-size: 20px; padding-right: 30px; white-space: pre; margin-top: 7px;"
		);
	} else {
		chatMsg.setAttribute(
			"style",
			"font-size: 20px; padding-left: 30px; white-space: pre; margin-top: 7px;"
		);
	}
	chatMsg.textContent = `${data.message}\r\n`;

	var chatTime = document.createElement("label");
	if (thisUserSent) {
		chatTime.setAttribute(
			"style",
			"font-size: 13px; padding-right: 15px; white-space: pre; margin-top: 7px;"
		);
	} else {
		chatTime.setAttribute(
			"style",
			"font-size: 13px; padding-left: 15px; white-space: pre; margin-top: 7px;"
		);
	}
	chatTime.textContent = `${data.time} `;

	var chatItem = document.createElement("div");
	if (thisUserSent) {
		chatItem.setAttribute(
			"style",
			"text-align: right; padding-bottom: 10px;"
		);
	} else {
		// chatItem.setAttribute('style', 'text-align: left; padding-bottom: 10px;');
	}
	chatItem.appendChild(chatLabel);
	chatItem.appendChild(chatMsg);
	chatItem.appendChild(chatTime);
	messages.appendChild(document.createElement("br"));
	messages.appendChild(chatItem);
	var elem = document.getElementById("messages");
	elem.scrollTop = elem.scrollHeight - elem.clientHeight;
});

document.getElementById("message").focus();
