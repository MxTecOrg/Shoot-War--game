/* controles */
function setControls () {
  let area = dom.getElementById("joy-left--area");
  
  joyLeft = new JoyStick(dom.getElementById("joy-left"), {
    fillStyle: "#000000",
    strokeStyle: "#000000",
    dinamicArea: area
  });
  joyRight = new JoyStick(dom.getElementById("joy-right"), {
    fillStyle: "#000000",
    strokeStyle: "#000000"
  });
  
  let cont = joyLeft.container;
  cont.style.display = "none";
  
  area.addEventListener("touchstart", function (event) {
    event = event.targetTouches[0];
    cont.style.left = event.pageX - joyLeft.canvas.width/2 + "px";
    cont.style.top = event.pageY - joyLeft.canvas.height/2 + "px";
    cont.style.display = "inline";
  });
  
  area.addEventListener("touchend", function (event) {
    cont.style.display = "none";
  });
  
}