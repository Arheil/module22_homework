const wsUri = "wss://echo-ws-service.herokuapp.com/";

document.addEventListener("DOMContentLoaded", pageLoaded);

function pageLoaded() {
    const infoOutput = document.querySelector(".info-output");
    const chatOutput = document.querySelector(".messenger-body");
    const input = document.querySelector("input");
    const sendBtn = document.querySelector(".send-btn");
    const location = document.querySelector(".location");
    const mapLink = document.getElementById("map-link");

    let socket = new WebSocket(wsUri);

    socket.onopen = () => {
        infoOutput.innerText = "Соединение установлено";
    }

    socket.onmessage = (event) => {
        writeToChat(event.data, true);
    }

    socket.onerror = () => {
        infoOutput.innerText = "При передаче данных произошла ошибка";
    }

    sendBtn.addEventListener("click", sendMessage);
    location.addEventListener("click", sendLocation);

    function sendMessage() {
        if (!input.value) return;
        socket.send(input.value);
        writeToChat(input.value, false);
        input.value = "";
    }
    
    
    function sendLocation() {
        const error = () => {
            infoOutput.textContent = 'Невозможно получить ваше местоположение';
        }

        const success = (position) => {
            const latitude  = position.coords.latitude;
            const longitude = position.coords.longitude;

            mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
            mapLink.textContent = 'Гео-локация';
            mapLink.style.color = '#fff';
            mapLink.style.textDecoration = 'none';

            const link = `<a href=${mapLink.href} target=_blank>Гео-локация</a>` 

            socket.send(mapLink.href);
            writeToChat(link, false);

            socket.onmessage = (event) => {
                return
            }
        }

        
        if (!navigator.geolocation) {
            infoOutput.textContent = 'Гео-локация не поддерживается вашим браузером';
        } else {
            navigator.geolocation.getCurrentPosition(success, error);
        }
    }

    function writeToChat(message, isRecieved) {
        let messageHTML = `<div class="${isRecieved ? "recieved" : "sent"}">${message}</div>`;
        chatOutput.innerHTML += messageHTML;
    }
}