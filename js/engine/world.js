let idPlayer = 0;


class World {
  constructor (opt) {
    this.width = parseTile(opt.w);
    this.height = parseTile(opt.h);
    this.stage = opt.stage;
    this.pjs = {};
    this.terrain = {};
    this.texture_pack = {
      water: Resources["src/world/water.png"].texture,
      rock: Resources["src/world/rock.png"].texture
    };
   
  }
  
  destroy () {
    
  }
  
  /*
  terrain {
    "x_y": {
      w: ancho en tiles
      h: largo en tiles
      d: 0 -> traspasable
         1 -> destructible
         2 -> indestructible
    }
  }
  */
  setTerrain (terrain) {
    for (let tile in terrain) {
      let terr = terrain[tile];
      let sprite = new Sprite(this.texture_pack[terr.t]);
      let [x, y] = tile.split("_");
    
      sprite.x = parseTile(parseFloat(x));
      sprite.y = parseTile(parseFloat(y));
      sprite.width = parseTile(terr.w || 1);
      sprite.height = parseTile(terr.h || 1);
      sprite.density = terr.d || 0;
      this.stage.addChild(sprite);
     
      this.terrain[tile] = sprite;
    }
  }
  
  // jugador 
  // textures Array[PIXI.Texture]
  // opt {x, y, w, h}
  createPlayer (textures, opt) {
    let cont = new Container();
    let pj = new AnimatedSprite(textures);
    let wp = new Sprite(Resources["src/wps/mp5.png"].texture);
  
    cont.addChild(pj);
    cont.addChild(wp);
  
    // sprite personaje 
    pj.name = "character";
    pj.anchor.set(0.5, 0.5);
    pj.width = opt.w;
    pj.height = opt.h;
    pj.w = opt.w;
    pj.h = opt.h;
    pj.x = pj.width / 2;
    pj.y = pj.height / 2;
    pj.animationSpeed = 0.1;
  
    // sprite arma
    wp.name = "weapon";
    wp.anchor.set(0.2, 0.5);
    wp.width = pj.width / 1.2;
    wp.height = pj.width / 2.2;
    wp.w = wp.width;
    wp.h = wp.height;
    wp.x = pj.width / 2;
    wp.y = pj.height * 2/3;
  
    // contenedor
    cont.speed = opt.speed || 1;
    cont.x = opt.x;
    cont.y = opt.y;
    cont.vx = 0;
    cont.vy = 0;
    cont.anchor.set(0.5, 0.5);
    cont.id = idPlayer + "";
  
    this.pjs[cont.id] = cont;
    this.stage.addChild(cont);
    idPlayer ++;

    return cont;
  }
}


function worldCollide (x, y) {
  let collide = {};
  if (x < 0 || x > world.width) collide.x = true;
  if (y < 0 || y > world.height) collide.y = true;
  return collide;
}

function scalePixel (px) {return px * PIXEL_RATIO}
function parseTile (tile) {return tile * TILE_RATIO}
function toTile (px) {return Math.floor(px / TILE_RATIO)}
