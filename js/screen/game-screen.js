/* PANTALLA DE JUEGO */
function GameScreen () {
  
}

GameScreen.open = function () {
  Connect();
  OnGame();
  document.getElementById("main-screen").style.display = "none";
};


function OnGame () {
  
  // capas del juego
  gameLayer = pixi.stage;
  layer1 = new Layer(gameLayer);
  layer2 = new Layer(gameLayer);
  ground = new PIXI.TilingSprite(Textures.g0, WIDTH, HEIGHT);
  gameLayer.addChildAt(ground, 0);
  
  
  world = new World({ 
    // datos del mundo
    w: 50,
    h: 50,
    stage: layer1
  });
  
  player = world.createPlayer(Textures.hero_male.textures, {
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
  ticker.start();
}