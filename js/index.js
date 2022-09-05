
/* (event) inicializar */
function OnStart () {
  
  /* obligar landscape */
  if (app.height > app.width) {
    setInterval (function(){if (app.height < app.width) app.reload()}, 500);
    document.body.innerText = "Girar Pantalla";
    return;
  }
  
  /* inicializar secciones */
  MainScreen();
  GameScreen();
  
  /* cargar información de usuario */
  USER = app.loadData("user-data", {
    token: btoa("" + Date.now()).replace(/\=+/g, "")
  });
  USER.connected = false;
   
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
    .add("hero_male", "src/pjs/hero_male_1.json")
    .add("mp5", "src/wps/mp5.png")
    .add("g0", "src/world/ground.png")
    .add("w0", "src/world/water.png")
    .add("r0", "src/world/rock.png")
    .load(OnLoad);
}


/* (event) luego de cargar texturas */
function OnLoad () {
  Loader.loaded = true;
  Resources.hero_male =  new TextureList(Resources.hero_male);
  
  ticker.stop();
}