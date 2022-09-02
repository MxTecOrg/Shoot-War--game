/* Class joystick */

JoyStick = function (container, options = {}) {
  let that = this;
  
  // canvas
  let canvas = document.createElement("canvas");
  let ctx = canvas.getContext("2d");
  
  ctx.fillStyle = options.fillStyle || "#000000";
  ctx.strokeStyle = options.strokeStyle || "#000000";
  
  
  // contantes
  let W = container.clientWidth;
  let H = container.clientHeight;
  let centerX = W / 2;
  let centerY = H / 2;
  let radius = centerX;
  
  canvas.width = W;
  canvas.height = H;
  container.appendChild(canvas);
  
  // joystick posicion
  let joyX = centerX;
  let joyY = centerY;
  let joyRadius = radius/2;
  let joyMax = radius - joyRadius;
  let offsetParent = canvas.offsetParent;
  let offsetX = offsetParent.offsetLeft;
  let offsetY = offsetParent.offsetTop;
  
  // eventos
  (options.dinamicArea || canvas).addEventListener("touchstart", function () {that.pressed = true});
  (options.dinamicArea || canvas).addEventListener("touchmove", function (event) {
    event = event.targetTouches[0];
    
    let touchX = event.pageX - offsetX;
    let touchY = event.pageY - offsetY;
    let sideX = touchX - radius;
    let sideY = touchY - radius;
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
    
    joyX += radius;
    joyY += radius;
    
    let x = (joyX - centerX) / joyMax;
    let y = (joyY - centerY) / joyMax;
    
    
    that.x = x;
    that.y = y;
    
    offsetX = offsetParent.offsetLeft;
    offsetY = offsetParent.offsetTop;
    draw();
  });
  
  (options.dinamicArea || canvas).addEventListener("touchend", function () {
    that.pressed = false;
    joyX = centerX;
    joyY = centerY;
    that.x = 0;
    that.y = 0;
    draw();
  });
  
  function drawLoop () {
    if (that.pressed) {
      draw();
      window.requestAnimationFrame(drawLoop);
    }
  }
  function draw () {
    ctx.clearRect(0, 0, W, H);
    
    // circulo externo
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * 3/4, 0, Math.PI * 2, false);
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();
    
    // circulo interno
    ctx.beginPath();
    ctx.arc(joyX, joyY, joyRadius, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.closePath();
  }
  
  this.container = container;
  this.canvas = canvas;
  this.x = 0; //joy frac x
  this.y = 0; //joy frac y
  this.pressed = false;
  draw();
};