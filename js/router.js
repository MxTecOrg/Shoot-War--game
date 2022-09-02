
if (TEST_ENABLED) app.script("libs/eruda.js", function(){eruda.init()});

/* css */
app.css("css/index.css");
app.css("css/components/screen.css");
app.css("css/components/loading.css");
app.css("css/screen/game-screen.css");
app.css("css/screen/main-screen.css");
app.css("libs/font-awesome/css/font-awesome.min.css");

/* libs */
app.script("libs/socket-io.js");
app.script("js/engine/pixi-extends.js");
app.script("libs/pixi-legacy.js");
app.script("libs/bump.js");

/* scripts */
app.script("js/client/client.js");

app.script("js/screen/main-screen.js");
app.script("js/screen/game-screen.js");
app.script("js/engine/loop.js");

app.script("js/engine/world.js");
app.script("js/engine/controls/joystick.js");
app.script("js/engine/controls/controls.js");

app.script("js/index.js");