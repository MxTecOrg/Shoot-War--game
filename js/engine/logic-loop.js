/*
  BUCLE DE LA LOGICA DEL JUEGO
*/

function OnLogicLoop () {
  
  // lógica de jugadores
  for (let pj_id in world.pjs) {
    let pj = world.pjs[pj_id];
    let isPlayer = pj.id == player.id; // si es el jugador
   
    // JoyStick
    if (isPlayer) {
      let jlX = joyLeft.x;
      let jlY = joyLeft.y;
      let jrX = joyRight.x;
      let jrY = joyRight.y;
      
      let jX, jY;
      if (joyRight.pressed) jX = jrX, jY = jrY;
      else if (joyLeft.pressed) jX = jlX, jY = jlY;
  
      player.vx = player.speed * jlX;
      player.vy = player.speed * jlY;
      player.moving = true;
      
      if (jX || jY) {
        let angle = Math.atan2(jY, jX) * 180/PI;
        player.a = - angle < 0 ? 360 - angle : - angle; // 0angle comienza abajo en sentido de las manecillas
        boxDebug.text = player.a.toFixed(2) + "°";
      }
    }
    
    
    
    // si el personaje está observando o moviendose
    if (pj.moving) {
      
      
      ///// FIXME LOGIC
      // caminar
      let mx = pj.x + scalePixel(pj.vx); // nueva posicion X
      let my = pj.y + scalePixel(pj.vy); // nueva posicion Y
    
      let collide = worldCollide(mx, my);
      if (!collide.x) pj.x = mx;
      if (!collide.y) pj.y = my;
      pj.moving = false;
      
      if (isPlayer) {
        // emitir al servidor
        socket.emit("move", [
          player.vx.toFixed(2), // movimiento en x
          player.vy.toFixed(2), // movimiento en y
          player.a.toFixed(2), //angulo
        ]);
      }
    }
  }
  
  // lógica de proyectiles
  for (let shot_id in world.shots) {
    let shot = world.shots[shot_id];
    shot.x += shot.vx;
    shot.y += shot.vy;
  }
}