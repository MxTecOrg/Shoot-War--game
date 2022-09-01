/* jugador */

/* 
  options.x => x
  options.y => y
  options.w => ancho
  options.h => alto
*/
let id = 0;
function createPlayer (textures, options) {
  let cont = new Container();
  let pj = new AnimatedSprite(textures);
  let wp = new Sprite(Resources["src/wps/mp5.png"].texture);
  
  cont.addChild(pj);
  cont.addChild(wp);
  
  // sprite personaje 
  pj.anchor.set(0.5, 0.5);
  pj.width = options.w;
  pj.height = options.h;
  pj.w = options.w;
  pj.h = options.h;
  pj.x = pj.width / 2;
  pj.y = pj.height / 2;
  pj.animationSpeed = 0.1;
  
  // sprite weapon
  wp.anchor.set(0.2, 0.5);
  wp.width = pj.width / 1.2;
  wp.height = pj.width / 2.2;
  wp.w = wp.width;
  wp.h = wp.height;
  wp.x = pj.width / 2;
  wp.y = pj.height * 2/3;
  
  // contenedor
  cont.x = options.x;
  cont.y = options.y;
  cont.vx = 0;
  cont.vy = 0;
  cont.anchor.set(0.5, 0.5);
  cont.id = id + "";
  
  world.pjs[cont.id] = cont;
  layer1.addChild(cont);
  id++;

  return cont;
}