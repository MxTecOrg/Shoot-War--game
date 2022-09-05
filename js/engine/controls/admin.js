/* inicializar controles */
function createAdminControls () {
  floatAdmin = new AdminControls();
  
  /* boton */
  floatAdmin.addButton("Boton", function(){
    console.log("tocaste el boton");
  });
  
  /* toggle */
  floatAdmin.addToggle("Palanca", true, function(on){
    console.log("La palanca está en " + on);
  });
  
  /* prompt */
  floatAdmin.addPrompt("Input", "escriba algo", function(text){
    console.log("introduciste: " + text);
  });
}


/* controles de administrador */
class AdminControls {
  
  constructor () {
    let that = this;
    let container = document.createElement("div");
    let float = document.createElement("div");
    let menu = document.createElement("div");
    let icon = document.createElement("i");
    
    float.setAttribute("class", "float");
    container.setAttribute("class", "float--container");
    menu.setAttribute("class", "float--menu");
    icon.setAttribute("class", "fa fa-cube");
    menu.active = false;
    
    float.appendChild(icon);
    container.appendChild(float);
    container.appendChild(menu);
    document.body.appendChild(container);
    
    
    float.onclick = function () {
      menu.style.display = menu.active ? "none":"flex"; 
      menu.active = !menu.active;
    };
    float.ontouchstart = function () {float.style.filter = "opacity(.5)"};
    float.ontouchend = function () {float.style.filter = "opacity(1)"};
    float.ontouchmove = function (event) {
      event = event.targetTouches[0];
      that.x = event.pageX;
      that.y = event.pageY;
      that.render();
    };
    
    this.float = float;
    this.menu = menu;
    this.container = container;
  }
  
  // añadir boton 
  addButton (textContent, callback) {
    let button = document.createElement("div");
    button.setAttribute("class", "float--menu-button");
    button.innerText = textContent;
    button.onclick = callback;
    
    this.menu.appendChild(button);
    return button;
  }
  
  //añadir boton con entrada de texto 
  addPrompt (textContent, placeholder, callback) {
    return this.addButton(textContent, function (event) {
      callback(window.prompt(textContent + " >>> " + placeholder), event);
    });
  }
  
  // añadir botón true y false
  addToggle (textContent, on, callback) {
    let icon = document.createElement("i");
    let button = this.addButton(textContent, function(event){
      updateToggle(!on);
      callback(on, event);
    });
    
    button.classList.add("float--menu-toggle");
    button.insertBefore(icon, button.childNodes[0]);
    
    function updateToggle (active) {
      on = active;
      icon.setAttribute("class", "fa fa-toggle-" + (on ? "on" : "off"));
    }
    
    updateToggle(on);
    return button;
  }
  
  // renderizar flotante
  render () {
    let contStyle = this.container.style;
    let float = this.float;
    contStyle.left = this.x - float.clientWidth/2 + "px";
    contStyle.top = this.y - float.clientHeight/2 + "px";
  }
  
  
}