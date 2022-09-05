/* Socket conexión */
app.script("js/client/user-data.js");
app.script("js/client/map-data.js");
app.script("js/client/move.js");
app.script("js/client/admin.js");

function Connect () {
  loading.show("Conectando...");
  socket = io.connect(SERVER_URL, {
    query: "token=" + USER.token
  });
  
  socket.onAny((event, data) => {
    if (event != "move") app.debug("ws->" + event, data);
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
  
  socket.on("map-data", OnSocket_MapData);
  socket.on("user-data", OnSocket_UserData);
  socket.on("new-pj", OnSocket_NewPj);
  socket.on("move", OnSocket_Move);
  socket.on("a-create-map" , OnSocket_MapCreated)
}
