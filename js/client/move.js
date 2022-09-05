/*
  ws -> move
*/

function OnSocket_Move (pjs) {
  if (window.world) for (let id in pjs) {
    if (USER.id != id) {
      let data = pjs[id];
      let pj = world.pjs[id + ""];
      
      pj.a = data.a;
      pj.x = data.x;
      pj.y = data.y;
    }
  }
}