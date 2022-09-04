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
  floatAdmin.addPrompt("Input", function(text){
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
    
    float.setAttribute("class", "float");
    container.setAttribute("class", "float--container");
    menu.setAttribute("class", "float--menu");
    menu.active = false;
   
    container.appendChild(float);
    container.appendChild(menu);
    document.body.appendChild(container);
    
    
    float.onclick = function () {
      menu.style.display = menu.active ? "none":"flex"; 
      menu.active = !menu.active;
    };
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
  addPrompt (textContent, callback) {
    return this.addButton(textContent, function (event) {
      callback(window.prompt(textContent), event);
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