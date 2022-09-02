
/* (event) inicializar */
function OnStart () {
  
  /* obligar landscape */
  if (app.height > app.width) {
    setInterval (function(){if (app.height < app.width) app.reload()}, 500);
    document.body.innerText = "Girar Pantalla";
    return;
  }
  
   
  /* (pixi) inicializar render */
  OnLoadPIXI();
  pixi = new PIXI.Application({ 
    width: app.width,
    height: app.height,
    transparent: false,
    view: document.getElementById("game-view"),
    
    forceCanvas: FORCE_CANVAS,
    resolution: GAME_RESOLUTION
  });
  ticker = pixi.ticker;
  renderer = pixi.renderer;
  view = renderer.view;
  WIDTH = renderer.screen.width;
  HEIGHT = renderer.screen.height;
  PIXEL_RATIO = WIDTH / GAME_SCREEN_SIZE;
  TILE_RATIO = TILE_SIZE * PIXEL_RATIO;
  
  
  /* (document) ajustar resolución */
  view.style.transformOrigin = "0 0";
  view.style.transform = "scale(" + 1/renderer.resolution + ")";
  
  /* (pixi) cargar texturas */
  Loader
    .add("src/pjs/hero_male_1.json")
    .add("src/pjs/pj.png")
    .add("src/world/ground.png")
    .add("src/world/water.png")
    .add("src/world/rock.png")
    .add("src/wps/mp5.png")
    .load(OnLoad);
}


/* (event) luego de cargar texturas */
function OnLoad () {
  Resources["src/pjs/hero_male_1.json"] = new TextureList(Resources["src/pjs/hero_male_1.json"].textures);
  
  // capas del juego
  gameLayer = pixi.stage;
  layer1 = new Layer(gameLayer);
  layer2 = new Layer(gameLayer);
  ground = new PIXI.TilingSprite(Resources["src/world/ground.png"].texture, WIDTH, HEIGHT);
  gameLayer.addChildAt(ground, 0);
  
  //layer1.filters = [new PixelateFilter()];
  
  world = new World({ 
    // datos del mundo
    w: 50,
    h: 50,
    stage: layer1
  });
  world.setTerrain({
    "1_1": {t:"rock"}
  });
  player = world.createPlayer(Resources["src/pjs/hero_male_1.json"].textures, {
    x: 0,
    y: 0,
    w: parseTile(1),
    h: parseTile(1),
    speed: 1
  });
  
  camera = new Camera(layer1, {w:world.width, h:world.height});
  
  setControls();
  
  
  boxDebug = new PIXI.Text("");
  boxDebug.x = WIDTH/2;
  boxDebug.y = 0;
  layer2.addChild(boxDebug);
  
  // bucle
  ticker.add(OnLoop);
  //ticker.stop();
}