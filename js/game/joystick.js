/* joystick */
function distance (x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}

function semicircle (x, r) {
  return Math.sqrt(Math.pow(r,2) - Math.pow(x,2));
}


JoyStick = function (container, options) {
  let self = this;
  options = options || {};
  
  container = document.getElementById(container);
  let canvas = document.createElement("canvas");
  let ctx = canvas.getContext("2d");
  
  let W = container.clientWidth;
  let H = container.clientHeight;
  let centerX = W / 2;
  let centerY = H / 2;
  let radio = centerX;
  
  canvas.width = W;
  canvas.height = H;
  container.appendChild(canvas);
  
  // joystick posicion
  let joyX = centerX;
  let joyY = centerY;
  let joyRadio = radio/2;
  let joyMax = radio - joyRadio;
  let offsetX = canvas.offsetParent.offsetLeft;
  let offsetY = canvas.offsetParent.offsetTop;
  
  // eventos
  canvas.ontouchstart = function () {self.pressed = true};
  canvas.ontouchmove = function (event) {
    event = event.targetTouches[0];
    
    let touchX = event.pageX - offsetX;
    let touchY = event.pageY - offsetY;
    let sideX = touchX - radio;
    let sideY = touchY - radio;
    let radian = Math.atan2(sideY, sideX);

    if (sideX * sideX + sideY * sideY >= joyMax * joyMax) {
      joyX = joyMax * Math.cos(radian);
      joyY = joyMax * Math.sin(radian);
    }
    else {
      joyX = Math.abs(sideX) > joyMax ? joyMax : Math.abs(sideX);
      joyY = Math.abs(sideY) > joyMax ? joyMax : Math.abs(sideY);
    }
    
    if (sideY < 0) joyY = -Math.abs(joyY);
    if (sideX < 0) joyX = -Math.abs(joyX);
    //joyX = touchX > W ? W : touchX < 0 ? 0 : touchX;
    //joyY = touchY > H ? H : touchY < 0 ? 0 : touchY;
    
    joyX += radio;
    joyY += radio;
    
    let x = (joyX - centerX) / joyMax;
    let y = (joyY - centerY) / joyMax;
    
    
    self.x = x;// > 1 ? 1 : x < -1 ? -1 : x;
    self.y = y;// > 1 ? 1 : y < -1 ? -1 : y;

    draw();
  };
  canvas.ontouchend = function () {
    self.pressed = false;
    joyX = centerX;
    joyY = centerY;
    self.x = 0;
    self.y = 0;
    draw();
  };
  
  function drawLoop () {
    if (self.pressed) {
      draw();
      window.requestAnimationFrame(drawLoop);
    }
  }
  function draw () {
    ctx.clearRect(0, 0, W, H);
    
    // circulo externo
    ctx.beginPath();
    ctx.arc(centerX, centerY, radio, 0, Math.PI * 2, false);
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#ff0000";
    ctx.stroke();
    ctx.closePath();
    
    // circulo interno
    ctx.beginPath();
    ctx.arc(joyX, joyY, radio/2, 0, Math.PI * 2, false);
    ctx.fillStyle = "#ff0000";
    ctx.fill();
    ctx.closePath();
  }
  
  this.x = 0; //joy frac x
  this.y = 0; //joy frac y
  this.pressed = false;
  draw();
};