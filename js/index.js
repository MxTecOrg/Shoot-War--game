
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
    token: btoa("" + Date.now()).replaceAll("=", "")
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
  Loader.loaded = true;
  Textures = {
    "g0": Resources["src/world/ground.png"].texture,
    "r0": Resources["src/world/rock.png"].texture,
    "w0": Resources["src/world/water.png"].texture,
    
    "hero_male": new TextureList(Resources["src/pjs/hero_male_1.json"].textures)
  };
  ticker.stop();
}