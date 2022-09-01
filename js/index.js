
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
    view: document.getElementById("game-view"),
    
    forceCanvas: FORCE_CANVAS,
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
    .add("src/pjs/hero_male_1.json")
    .add("src/pjs/pj.png")
    .add("src/world/ground.png")
    .add("src/wps/mp5.png")
    .load(OnLoad);
}


/* (event) luego de cargar texturas */
function OnLoad () {
  Resources["src/pjs/hero_male_1.json"] = new TextureList(Resources["src/pjs/hero_male_1.json"].textures);
  
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
  
  // jugador
  player = createPlayer(Resources["src/pjs/hero_male_1.json"].textures, {
    x: 0,
    y: 0,
    w: 80,
    h: 80
  });
  player.speed = 1;
  
  
  boxDebug = new PIXI.Text("");
  boxDebug.x = WIDTH/2;
  boxDebug.y = 0;
  layer2.addChild(boxDebug);
  
  // iniciar bucle
  pixi.ticker.add(OnLoop);
}