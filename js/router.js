
if (TEST_ENABLED) app.script("libs/eruda.js", function(){eruda.init()});

app.script("js/engine/load-pixi.js");
app.script("libs/pixi-legacy.js", () => OnLoadPixi());

app.css("css/index.css");
app.script("libs/bump.js");
app.script("js/game/joystick.js");
app.script("js/engine/loop.js");

app.script("js/game/world.js");
app.script("js/game/controls.js");
app.script("js/game/player.js");

app.script("js/index.js");