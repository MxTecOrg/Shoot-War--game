const OnSocket_MapCreated = (data) => {
    if(data == true) app.Alert("Se creo el mapa");
    else app.Alert("Ocurrio un error al crear el mapa.");   
}

const OnSocket_Teleport = (data) => {
    if(data == true) app.Alert("Se teletransportó correctamente");
    else app.Alert("Ocurrio un error al teletransportar.");   
}
