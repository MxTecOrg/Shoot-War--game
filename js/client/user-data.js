/* 
  ws -> user-data 
*/

function OnSocket_UserData (data) {
  
  // salvar datos de jugador
  USER = Object.assign(USER, data);
  app.saveData("user-data", USER);
    
  // si es moderador o administrador 
  if (USER.acclevel > 1) createAdminControls();
  
}