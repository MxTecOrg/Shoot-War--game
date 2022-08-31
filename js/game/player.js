/* jugador */

/* 
  options.x => x
  options.y => y
  options.w => ancho
  options.h => alto
*/
let id = 0;
function createPlayer (texture, options) {
  let pj = new Sprite(texture);
  
  pj.anchor.set(0.5, 0.7);
  pj.x = options.x;
  pj.y = options.y;
  pj.vx = 0;
  pj.vy = 0;
  //pj.width = options.w;
  pj.height = options.h;
  pj.id = id + "";
  
  world.pjs[pj.id] = pj;
  layer1.addChild(pj);
  id++;

  return pj;
}