/* (event) bucle del juego */
PI = Math.PI;

function OnRenderLoop (delay) {
  
  // renderizar jugadores
  for (let pjId in world.pjs) {
    let pj = world.pjs[pjId];
    let pj_sprite = pj.getChildByName("character"); //personaje
    let wp_sprite = pj.getChildByName("weapon"); //arma
    
    
    // iniciar animación caminar
    if (pj.vx || pj.vy) {
      if (!pj_sprite.playing) {
        pj_sprite.play();
        pj_sprite.update(delay);
      }
    }
    else if (pj_sprite.playing) pj_sprite.gotoAndStop(0);
    
    // rotación personaje
    let angle = pj.a;
    wp_sprite.angle = -angle;
    
    if (angle > 90 && angle < 270) {
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
    
    
    if (pj.id == player.id) {
      // seguimiento de cámara
      let tileGround = ground.tilePosition;
      camera.x = - player.x + WIDTH / 2;
      camera.y = - player.y + HEIGHT / 2;
      tileGround.x = camera.x;
      tileGround.y = camera.y;
    }
  }
}