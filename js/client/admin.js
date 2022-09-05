const OnSocket_MapCreated = (data) => {
    if(data == true) alert("Se creo el mapa");
    else alert("Ocurrio un error al crear el mapa.");   
}

const OnSocket_Teleport = (data) => {
    if(data == true) alert("Se teletransportó correctamente");
    else alert("Ocurrio un error al teletransportar.");   
}
