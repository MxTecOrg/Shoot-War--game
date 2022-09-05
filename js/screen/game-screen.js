/* PANTALLA DE JUEGO */
function GameScreen () {
  
}

GameScreen.open = function () {
  Connect();
  document.getElementById("main-screen").style.display = "none";
};


/* 
  data => {
    defaultTerrain: Textures[id],
    size.x,
    size.y,
    
    pjs: {
      "id": {
        id
        pos.x,
        pos.y,
        pos.a
      }
    }
    
    objects: {}
    terrain: {
      "x_y": {
        d: densidad
        t: Textures[id]
      }
    }
  }
*/
function createGame (data) {
  
  // capas del juego
  gameLayer = pixi.stage;
  layer1 = new Layer(gameLayer);
  layer2 = new Layer(gameLayer);
  
  ground = new PIXI.TilingSprite(Textures[data.defaultTerrain], WIDTH, HEIGHT);
  gameLayer.addChildAt(ground, 0);
  
  
  world = new World({ 
    // datos del mundo
    w: data.size.x,
    h: data.size.y,
    stage: layer1
  });
  
  world.setTerrain(data.terrain);
  
  for (let id in data.pjs) {
    let pjs = data.pjs[id];
    pjs = world.createPlayer(Textures[pjs.t || "hero_male"].textures, {
      id: pjs.id + "",
      nickname: pjs.nickname,
      x: pjs.x,
      y: pjs.y,
      w: parseTile(1),
      h: parseTile(1),
      speed: pjs.speed || 1
    });
    if (USER.nickname == pjs.nickname) player = pjs;
  }
  
  camera = new Camera(layer1, {w:world.width, h:world.height});
  
  setControls();
  
  
  boxDebug = new PIXI.Text("");
  boxDebug.x = WIDTH/2;
  boxDebug.y = 0;
  layer2.addChild(boxDebug);
  
  // bucle
  ticker.add(OnLoop);
  ticker.start();
}