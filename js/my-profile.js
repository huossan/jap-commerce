//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

    let perfil = JSON.parse(localStorage.getItem('Perfil'));

    if(perfil != undefined) {
        nom.setAttribute("value", perfil.nombre);
        apell.setAttribute("value", perfil.apellido);
        correo.setAttribute("value", perfil.email);
        edad.setAttribute("value", perfil.edad);
        document.getElementById('cel').setAttribute("value", perfil.celular);
        document.getElementById('dir').setAttribute("value", perfil.direccion);
        document.getElementById('ciud').setAttribute("value", perfil.ciudad);
        document.getElementById('pais').setAttribute("value", perfil.pais);
        document.getElementById('dpto').setAttribute("value", perfil.departamento);
    
        document.getElementById('tarjeta_correo').innerHTML = perfil.email;
        document.getElementById('tarjeta_nombre').innerHTML = perfil.nombre + ' ' + perfil.apellido;

    }

    cambiarFoto();

});

let nom = document.getElementById('nom');
let apell = document.getElementById('apell');
let correo = document.getElementById('correo');
let edad = document.getElementById('edad');
let telefono = document.getElementById('cel');
let dire = document.getElementById('dir');
let ciu = document.getElementById('ciud');
let est = document.getElementById('pais');
let dep = document.getElementById('dpto');

let boton2 = document.getElementById('boton2');
let boton1 = document.getElementById('boton1');
boton2.disabled = true;



// ---------- NOMBRE DE USUARIO EN MENU HAMBURGUESA DE LA BARRA DE NAVEGACION ---------- //

let nickname = JSON.parse(localStorage.getItem('Usuario'));
document.getElementById('nickname').innerHTML = nickname.nombre;



// --------- GUARDA EN LOCALSTORAGE LO QUE ESTA EN LOS INPUT ----------- //

function guardarDatos() { //Se ejecuta sobre la escucha del evento click en boton
    
    let perfil = {};
    
    perfil.nombre = nom.value;
    perfil.apellido = apell.value;
    perfil.email = correo.value;
    perfil.edad = edad.value;
    perfil.celular = telefono.value;
    perfil.direccion = dire.value;
    perfil.ciudad = ciu.value;
    perfil.pais = est.value;
    perfil.departamento = dep.value;
    perfil.estado = "activo";

    localStorage.setItem('Perfil', JSON.stringify(perfil));

    cambiarVisual();
    window.scrollTo(0, 0);
    boton2.disabled = true;

    document.getElementById('tarjeta_correo').innerHTML = perfil.email;
    document.getElementById('tarjeta_nombre').innerHTML = perfil.nombre + ' ' + perfil.apellido;

};


// --------- HABILITA O DESABILITA EL BOTON DE GUARDAR PERFIL ----------- //

function comprobarBoton() { // Se ejecuta desde html con onkeyup sobre input

    if(nom.value.trim() != ""){
        boton2.disabled = false;
    } else {
        boton2.disabled = true;
    }
};


// --------------- EJECUTA FUNCION AL DAR CLICK EN BOTON ---------------- //

document.getElementById('boton2').addEventListener('click', (e)=>{

    guardarDatos();

});

document.getElementById('boton1').addEventListener('click', (e)=>{

    editarPerfil();

});


// ------------------ CAMBIAN LAS CLASES DE LOS INPUT ------------------- //

function cambiarVisual() {

    nom.setAttribute('disabled', 'disabled');
    nom.classList.remove('form-control');
    nom.classList.add('sinborde');

    apell.setAttribute('disabled', 'disabled');
    apell.classList.remove('form-control');
    apell.classList.add('sinborde');

    correo.setAttribute('disabled', 'disabled');
    correo.classList.remove('form-control');
    correo.classList.add('sinborde');

    edad.setAttribute('disabled', 'disabled');
    edad.classList.remove('form-control');
    edad.classList.add('sinborde');

    telefono.setAttribute('disabled', 'disabled');
    telefono.classList.remove('form-control');
    telefono.classList.add('sinborde');

    dire.setAttribute('disabled', 'disabled');
    dire.classList.remove('form-control');
    dire.classList.add('sinborde');

    ciu.setAttribute('disabled', 'disabled');
    ciu.classList.remove('form-control');
    ciu.classList.add('sinborde');

    est.setAttribute('disabled', 'disabled');
    est.classList.remove('form-control');
    est.classList.add('sinborde');

    dep.setAttribute('disabled', 'disabled');
    dep.classList.remove('form-control');
    dep.classList.add('sinborde');

    boton1.classList.remove('invisible');
    boton2.classList.add('invisible');

};

function editarPerfil() {

    nom.removeAttribute('disabled', 'disabled');
    nom.classList.add('form-control');
    nom.classList.remove('sinborde');

    apell.removeAttribute('disabled', 'disabled');
    apell.classList.add('form-control');
    apell.classList.remove('sinborde');

    correo.removeAttribute('disabled', 'disabled');
    correo.classList.add('form-control');
    correo.classList.add('sinborde');

    edad.removeAttribute('disabled', 'disabled');
    edad.classList.add('form-control');
    edad.classList.remove('sinborde');

    telefono.removeAttribute('disabled', 'disabled');
    telefono.classList.add('form-control');
    telefono.classList.remove('sinborde');

    dire.removeAttribute('disabled', 'disabled');
    dire.classList.add('form-control');
    dire.classList.remove('sinborde');

    ciu.removeAttribute('disabled', 'disabled');
    ciu.classList.add('form-control');
    ciu.classList.remove('sinborde');

    est.removeAttribute('disabled', 'disabled');
    est.classList.add('form-control');
    est.classList.remove('sinborde');

    dep.removeAttribute('disabled', 'disabled');
    dep.classList.add('form-control');
    dep.classList.remove('sinborde');


    boton2.classList.remove('invisible');
    boton1.classList.add('invisible');  

};




// ------------------ SUBIR Y GUARDAR FOTO DE PERFIL ------------------- //

document.getElementById('imagen').addEventListener('change', function(){ // Convierte la imagen subida en base64 y la guarda en localstorage

    const lectura = new FileReader();

    lectura.addEventListener('load', ()=> {
        localStorage.setItem("foto_perfil", lectura.result);
        cambiarFoto();
    });

    lectura.readAsDataURL(this.files[0]);

    cambiarFoto();

});

// ------------------ CAMBIAN FOTO DE PERFIL ------------------- //

function cambiarFoto() {

    let foto = localStorage.getItem('foto_perfil');

    if(foto.value != "") {

        document.getElementById('img').src = foto;

    }

};