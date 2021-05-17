const socketClient = io("http://localhost:5000"); 
socketClient.on("connect", () => { console.log("connection server"); });


function inputHandler(value) {
// webSocket.send(JSON.stringify({client:"controller",value}))
socketClient.emit('set-curv',value)
}

function changeHandler(target){
    target.value = 0
}


