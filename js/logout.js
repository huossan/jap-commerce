function logout () {

    localStorage.removeItem('Usuario');
   // localStorage.clear (); //Borra el LocalStorage
    signOut (); //Funcion de desconectar de Google
};

if (JSON.parse(localStorage.getItem('Usuario')) == null) {
    location.href = "login.html";
}

