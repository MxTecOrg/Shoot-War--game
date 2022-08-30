/* (event) bucle del juego */
PI = Math.PI;
function OnLoop (delay) {
  
  /* jugador */ 
  {
   // obtener posicion de joystick
   let jlX = joyLeft.x;
   let jlY = joyLeft.y;
   let jrX = joyRight.x;
   let jrY = joyRight.y;
  
   player.vx = player.speed * jlX;
   player.vy = player.speed * jlY;
   
   // rotar personaje
   if (joyRight.pressed) player.rotation = Math.atan2(jrY, jrX) + PI/2;
   else if (joyLeft.pressed) player.rotation = Math.atan2(jlY, jlX) + PI/2;
  }
  
  // lógica de jugadores
  for (let pj_id in world.pjs) {
    let pj = world.pjs[pj_id];
    let mx = pj.x + pj.vx * delay;
    let my = pj.y + pj.vy * delay;
    
    let collide = worldCollide({x: mx, y: my});
      
    if (!collide.x) pj.x = mx;
    if (!collide.y) pj.y = my;

    
    // si el personaje es el jugador
    if (pj.id == player.id) {
      let tileGround = ground.tilePosition;
      camera.x = -player.x + WIDTH / 2;
      camera.y = -player.y + HEIGHT / 2;
      tileGround.x = camera.x;
      tileGround.y = camera.y;
    }
  }
  
  // lógica de proyectiles
  for (let shot_id in world.shots) {
    let shot = world.shots[shot_id];
    shot.x += shot.vx;
    shot.y += shot.vy;
  }
}