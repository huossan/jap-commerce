function logout () {

    localStorage.clear ();
    
};

if (JSON.parse(localStorage.getItem('Usuario')) == null) {
    location.href = "login.html";
}

