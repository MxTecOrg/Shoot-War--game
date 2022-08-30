
function worldCollide ({x, y, width, height}) {
  let collide = {};
  if (x < 0 || x > world.width) collide.x = true;
  if (y < 0 || y > world.height) collide.y = true;
  return collide;
}