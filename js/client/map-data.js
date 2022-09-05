/*
  ws -> map-data
*/

function OnSocket_MapData (data) {
  if (!window.world) createGame(data);
}