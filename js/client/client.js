/* Socket conexión */
 
function Connect () {
  loading.show("Conectando...");
  socket = io.connect(SERVER_URL, {
    query: "token=" + USER.token
  });
  
  socket.onAny((event, data) => {
    app.debug("ws->" + event, data);
  });
  
  socket.on("connect", data => {
    loading.hidden();
    app.debug("ws->connect", data);
    USER.connected = true;
  });
  
  socket.on("disconnect", data => {
    loading.show("Reconectando...");
    app.debug("ws->disconnect", data);
    USER.connected = false;
  });
  
  socket.on("reconnected", data => {
    app.debug("ws->reconnected", data);
    loading.hidden();
    USER.connected = true;
  });
  
  socket.on("user-data", data => {
    USER = Object.assign(USER, data);
    app.saveData("user-data", USER);
    
    if (USER.acclevel > 1) createAdminControls();
  });
}