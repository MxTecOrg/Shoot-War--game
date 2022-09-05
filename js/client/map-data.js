/*
  ws -> map-data
*/

function OnSocket_MapData (data) {
  if (!window.world) createGame(data);
}

function OnSocket_NewPj (pj) {
  pj = world.createPlayer(Textures[pj.t || "hero_male"].textures, {
    id: pj.id + "",
    nickname: pj.nickname,
    x: pj.x,
    y: pj.y,
    w: parseTile(1),
    h: parseTile(1),
    speed: pj.speed || 1
  });
  if (USER.nickname == pj.nickname) player = pj;
}