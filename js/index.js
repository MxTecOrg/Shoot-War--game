if (TEST_ENABLED) app.script("libs/eruda.js", function(){eruda.init()});

app.css("css/index.css");
app.script("libs/pixi.js");
app.script("libs/bump.js");
app.script("js/game/joystick.js");
app.script("js/engine/prototype.js");
app.script("js/engine/loop.js");

app.script("js/game/world.js");
app.script("js/game/controls.js");
app.script("js/game/player.js");

/* (event) inicializar */
function OnStart () {
  
  /* obligar landscape */
  if (app.height > app.width) {
    setInterval (function(){if (app.height < app.width) app.reload()}, 500);
    return dom.body.appendChild(dom.createTextNode("Girar Pantalla"));
  }
  
  /* (pixi) inicializar detector de colisiones */
  bump = new Bump(PIXI);
  hit = bump.hit;
  bump = null;
   
  /* (pixi) inicializar aplicación */
  pixi = new PIXI.Application({ 
    width: app.width,
    height: app.height,
    transparent: false,
    forceCanvas: true,
    view: dom.getElementById("game-view"),
    resolution: GAME_RESOLUTION
  });
  renderer = pixi.renderer;
  view = renderer.view;
  WIDTH = renderer.screen.width;
  HEIGHT = renderer.screen.height;
  
  /* (dom) ajustar resolución */
  view.style.transformOrigin = "0 0";
  view.style.transform = "scale(" + 1/renderer.resolution + ")";
  
  /* (pixi) cargar texturas */
  Loader
    .add("src/pjs/pj.png")
    .add("src/world/ground.png")
    .load(OnLoad);
}


/* (event) luego de cargar texturas */
function OnLoad () {
  gameLayer = pixi.stage;
  world = { //datos del mundo
    width: 1000,
    height: 1000,
    pjs: {}, //jugadores
    obs: {}, //obstáculos
    obj: {}, //objetos
  };
  
  // suelo
  ground = new PIXI.TilingSprite(Resources["src/world/ground.png"].texture, WIDTH, HEIGHT);
  gameLayer.addChild(ground);
  
  // capas del juego
  layer1 = new Layer(gameLayer);
  layer2 = new Layer(gameLayer);
  camera = new Camera(layer1, {w:world.width, h:world.height});
  
  setControls();
  
  player = createPlayer(Resources["src/pjs/pj.png"].texture, {
    x: 0,
    y: 0,
    w: 80,
    h: 80
  });
  player.speed = 1;
  
  pixi.ticker.add(OnLoop);
}