/* inicializar controles */
function createAdminControls () {
  floatAdmin = new AdminControls();
  
  floatAdmin.addButton("Crear Mapa", createMapMenu);
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
  
  // añadir select
  addSelect (list, callback) {
    let select = document.createElement("select");
    select.setAttribute("class", "float--menu-button");
    
    for (let item of list) {
      let option = document.createElement("option");
      option.innerText = item;
      select.appendChild(option);
      option = null;
    }
    
    select.onchange = function () {
      callback(select.value);
    };
    this.menu.appendChild(select);
    return select;
  }
  
  // renderizar flotante
  render () {
    let contStyle = this.container.style;
    let float = this.float;
    contStyle.left = this.x - float.clientWidth/2 + "px";
    contStyle.top = this.y - float.clientHeight/2 + "px";
  }
  
  
}

/* Creacion de mapas */
/* TODO - Organizar */

const createMapMenu = () => {
    /* Container Layout*/
    const cont = document.createElement("div");
    cont.style.width = "100vw";
    cont.style.height = "100vh";
    cont.style.position = "fixed";
    cont.style.display = "flex";
    cont.style.alignItems = "center";
    cont.style.justifyContent = "center";
    cont.style.zIndex = "100";
    cont.style.left = "0";
    cont.style.top = "0";
    document.body.appendChild(cont);
    /* On click outside menu we remove the container */
    cont.addEventListener("click", (ev) => {
        ev.stopPropagation();
        document.body.removeChild(cont);
    });

    /* Menu layout */
    const menu = document.createElement("div");
    menu.style.width = "50%";
    menu.style.height = "75%";
    menu.style.position = "absolute";
    menu.style.display = "flex";
    menu.style.flexDirection = "column";
    menu.style.alignItems = "center";
    menu.style.justifyContent = "center";
    menu.style.backgroundColor = "#313131";
    menu.style.color = "#cccccc";
    /* Prevent menu from closing on click */
    menu.addEventListener("click", (ev) => ev.stopPropagation());
    cont.appendChild(menu);

    /* inputs */
    /*id*/
    const idCont = document.createElement("div");
    idCont.style.width = "70%";
    idCont.style.height = "8vh";
    idCont.style.marginTop = "1vh";
    idCont.style.display = "flex";
    idCont.style.alignItems = "center";
    idCont.style.justifyContent = "space-between";
    menu.appendChild(idCont);

    const idLabel = document.createElement("p");
    idLabel.innerText = "ID: ";
    idCont.appendChild(idLabel);

    const idInput = document.createElement("input");
    idInput.setAttribute("type", "text");
    idCont.appendChild(idInput);

    /*name*/
    const nameCont = document.createElement("div");
    nameCont.style.width = "70%";
    nameCont.style.height = "8vh";
    nameCont.style.marginTop = "1vh";
    nameCont.style.display = "flex";
    nameCont.style.alignItems = "center";
    nameCont.style.justifyContent = "space-between";
    menu.appendChild(nameCont);

    const nameLabel = document.createElement("p");
    nameLabel.innerText = "Nombre: ";
    nameCont.appendChild(nameLabel);

    const nameInput = document.createElement("input");
    nameInput.setAttribute("type", "text");
    nameCont.appendChild(nameInput);

    /*size*/
    const sizeCont = document.createElement("div");
    sizeCont.style.width = "70%";
    sizeCont.style.height = "8vh";
    sizeCont.style.marginTop = "1vh";
    sizeCont.style.display = "flex";
    sizeCont.style.alignItems = "center";
    sizeCont.style.justifyContent = "space-between";
    menu.appendChild(sizeCont);

    const xLabel = document.createElement("p");
    xLabel.innerText = "size x: ";
    sizeCont.appendChild(xLabel);

    const xInput = document.createElement("input");
    xInput.setAttribute("type", "text");
    xInput.style.width = "15%";
    sizeCont.appendChild(xInput);

    const yLabel = document.createElement("p");
    yLabel.innerText = " y: ";
    sizeCont.appendChild(yLabel);

    const yInput = document.createElement("input");
    yInput.setAttribute("type", "text");
    yInput.style.width = "15%";
    sizeCont.appendChild(yInput);

    /*default terrain*/
    const dterrainCont = document.createElement("div");
    dterrainCont.style.width = "70%";
    dterrainCont.style.height = "10vh";
    dterrainCont.style.marginTop = "1vh";
    dterrainCont.style.display = "flex";
    dterrainCont.style.alignItems = "center";
    dterrainCont.style.justifyContent = "space-between";
    menu.appendChild(dterrainCont);

    const dterrainLabel = document.createElement("p");
    dterrainLabel.innerText = "Textura: ";
    dterrainCont.appendChild(dterrainLabel);

    const dterrainInput = document.createElement("select");
    dterrainCont.appendChild(dterrainInput);

    const dterrainImg = document.createElement("img");
    dterrainImg.width = 35;
    dterrainImg.height = 35;
    dterrainCont.appendChild(dterrainImg);

    for (let r in Resources) {
        const src = Resources[r].url;
        if(!src.includes("world")) continue;
        const opt = document.createElement("option");
        opt.innerText = src;
        dterrainInput.appendChild(opt);
    }

    dterrainInput.onchange = (ev) => {
        dterrainImg.src = dterrainInput.value;
    }

    /*Submit button*/
    const submitCont = document.createElement("div");
    submitCont.style.width = "70%";
    submitCont.style.height = "10vh";
    submitCont.style.marginTop = "1vh";
    submitCont.style.display = "flex";
    submitCont.style.alignItems = "center";
    submitCont.style.justifyContent = "center";
    menu.appendChild(submitCont);
    
    const submitBtn = document.createElement("button");
    submitBtn.innerText = "Crear";
    submitBtn.addEventListener("click" , (ev) => {
        const dt = dterrainInput.value.split("/");
        let id = idInput.value,
        name = nameInput.value,
        x = xInput.value,
        y = yInput.value,
        defaultTerrain = "g0"; //dt.replace(".png" , "");
        if(!id || !name || !x || !y || !defaultTerrain) return app.Alert("Parametros vacios");
        
        socket.emit("a-create-map" , {
            map_id: id,
            name,
            size: { x: parseInt(x),
            y: parseInt(y)},
            defaultTerrain
        });
    });
    submitCont.appendChild(submitBtn);
};

const teleport = (data) => {
    socket.emit("a-teleport" , data);
}
