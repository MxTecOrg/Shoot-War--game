/* Socket conexión */

function Connect () {
  loading.show("Conectando...");
  socket = io.connect(SERVER_URL, {
    query: "token=" + USER.token
  });
  
  socket.onAny((event, data)=>{
    app.debug("ws-->" + event, data);
  });
  
  socket.on("connect", ()=>{
    loading.hidden();
    USER.connected = true;
  });
  
  socket.on("disconnect", ()=>{
    loading.show("Reconectando...");
    USER.connected = false;
  });
  
  socket.on("reconnected", ()=>{
    loading.hidden();
    USER.connected = true;
  });
}