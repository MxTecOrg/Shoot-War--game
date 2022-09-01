/* (event) bucle del juego */
PI = Math.PI;
function OnLoop (delay) {
  
  // lógica de jugadores
  for (let pj_id in world.pjs) {
    let pj = world.pjs[pj_id];
    let pj_sprite = pj.children[0]; //personaje
    let wp_sprite = pj.children[1]; //arma
   
    let watchX, watchY; //direccion en la que observa
   
    // si el personaje es el jugador
    if (pj.id == player.id) {
      // joystick
      let jlX = joyLeft.x;
      let jlY = joyLeft.y;
      let jrX = joyRight.x;
      let jrY = joyRight.y;
      if (joyRight.pressed) watchX = jrX, watchY = jrY;
      else if (joyLeft.pressed) watchX = jlX, watchY = jlY;
  
      player.vx = player.speed * jlX;
      player.vy = player.speed * jlY;
   
      // seguimiento cámara
      let tileGround = ground.tilePosition;
      camera.x = - player.x + WIDTH / 2;
      camera.y = - player.y + HEIGHT / 2;
      tileGround.x = camera.x;
      tileGround.y = camera.y;
    }
    else watchX = pj.vx, watchY = pj.vy;
    
    // iniciar animación caminar
    if (pj.vx || pj.vy) {
      if (!pj_sprite.playing) {
        pj_sprite.play();
        pj_sprite.update(delay);
      }
    }
    else if (pj_sprite.playing) pj_sprite.gotoAndStop(0);
    
    
    // si el personaje está observando
    if (watchX || watchY) {
      
      // rotación personaje
      let radian = Math.atan2(watchX, watchY);
      radian = - radian < 0 ? PI*2 - radian : - radian; // 0π comienza abajo en sentido de las manecillas
      wp_sprite.rotation = radian + PI/2;
    
      if (radian > 0 && radian < PI) {
        pj_sprite.scale.x = -1;
        wp_sprite.scale.y = -1;
      }
      else {
        pj_sprite.scale.x = 1;
        wp_sprite.scale.y = 1;
      }
      
      pj_sprite.width = pj_sprite.w;
      pj_sprite.height = pj_sprite.h;
      wp_sprite.width = wp_sprite.w;
      wp_sprite.height = wp_sprite.h;
      
      
      // caminar
      let mx = pj.x + pj.vx * delay; // nueva posicion X
      let my = pj.y + pj.vy * delay; // nueva posicion Y
    
      let collide = worldCollide(mx, my);
      if (!collide.x) pj.x = mx;
      if (!collide.y) pj.y = my;
    }
  }
  
  // lógica de proyectiles
  for (let shot_id in world.shots) {
    let shot = world.shots[shot_id];
    shot.x += shot.vx;
    shot.y += shot.vy;
  }
}