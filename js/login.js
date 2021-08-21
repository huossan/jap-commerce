//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    /*Todo lo que se encuentre aqui adentro se ejecutara luego de haber cargado 
    toda la pagina, en este caso "login.html" */

    let usuario = JSON.parse(localStorage.getItem('Usuario'));
    /*Levantamos los datos almacenados del localStorage, los cuales al ser un JSON
    deberemos "transformarlos" a Objeto, para que JavaScript pueda leerlo correctamente */
    if(usuario.estado == 'conectado') {
        location.href = "index.html";
    }
    /*Si se corrobora que el Objeto almacenado en la variable "usuario" contiene
    la propiedad estado como conectado, redireccionara a la pagina principal "index.html" */
     
});


function logearse () {

    let user = document.getElementById('username'); //input del html
    let pass = document.getElementById('password'); //input del html
    let usuario = {} // Creamos un objeto vacio

    user.classList.remove('error') // Quitamos la clase de estilo 'error', del input
    pass.classList.remove('error')

    if(user.value.trim() === "") {
        
        alert("Ingrese Usuario");
        user.classList.add('error');
    /* Si el campo de usuario se encuentra vacio... (con trim() estamos ignorando los espacios en blanco)
    mostraremos un cartel de alerta y agregaremos una clase de estilo 'error'*/  
    } else if(pass.value.trim() === "") {
        
        alert("Ingrese Contraseña")
        pass.classList.add('error');
    /*Si no, haremos la misma consulta pero para el campo de contraseña */
    } else {
        
        usuario.nombre = user.value;
        usuario.estado = "conectado"

        location.href = "index.html"

        localStorage.setItem('Usuario', JSON.stringify(usuario))
    /*Si ninguna de las dos condiciones se cumplen, redireccionaremos a "index.html,
    almacenando como propiedad 'nombre' del objeto 'usuario' el datos ingresado
    y a la propiedad 'estado' le asignaremos el string "conectado".
    Finalmente almacenaremos los datos en localStorage convirtiendo el objeto en un JSON */
    }
    
}