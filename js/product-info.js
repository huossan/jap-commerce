var comentariosArray = [];


/*************PONER USUARIO EN CAJA DE COMENTARIOS**************************/
let coment = JSON.parse(localStorage.getItem('Usuario'));

document.getElementById('comentador').innerHTML = coment.nombre;



/****************FETCH MOSTRANDO LA INFO DEL ARRAY EN PAGINA****************/

fetch(PRODUCT_INFO_URL) //Realizamos el fetch que devolverá una promesa
    .then( respuesta=>respuesta.json()) //Obtenemos una promesa que trataremos como json
    .then(datos=> { //obtenemos una nueva promesa, pero los datos ya están como json.
        document.getElementById('nombre').innerHTML= datos.name;
        document.getElementById('precio').innerHTML= datos.cost;
        document.getElementById('descripcion').innerHTML= datos.description;
        document.getElementById('imagen').innerHTML= `<img class="card-img-top mb-5 mb-md-0" src=" ${datos.images[0]}" alt="..." />`;
        
        
        /*RELACIONADOS*/
        let relacionados = "";

        fetch(PRODUCTS_URL)
        .then(respuesta => respuesta.json())
        .then(dato => {
        
            for(i = 0; i < datos.relatedProducts.length; i++) {
        
                let prod = datos.relatedProducts[i];
                console.log(prod);
                let fotoRelacionado = dato[prod];

                relacionados += `

                <div class="col mb-5">
                    <div class="card h-100">
                        <!-- Imagen-->
                        <img class="card-img-top" src="${fotoRelacionado.imgSrc}" alt="..." />
                        <!-- Detalle-->
                        <div class="card-body p-4">
                            <div class="text-center">
                                <!-- Nombre-->
                                <h5 class="fw-bolder">${fotoRelacionado.name}</h5>
                                <!-- Precio-->
                                <h6 class="fw-bolder">$ ${fotoRelacionado.cost}</h5>
                            </div>
                        </div>
                        <!-- Acciones-->
                        <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                            <div class="text-center"><a class="btn btn-outline-dark mt-auto" href="#">Mas Info.</a>
                            </div>
                        </div>
                    </div>
                </div>

                `;

                document.getElementById('relaprod').innerHTML = relacionados;
        
            };
        
        });
        
    })
    .catch( error => alert("Hubo un error: " + error));




/*****************************COMENTARIOS DEL ARRAY********************************/

    function mostrarComentarios(arrayCom){

        let htmlContentToAppend = "";
        for(let i = 0; i < arrayCom.length; i++){
            let comentario = arrayCom[i];
    
    
            htmlContentToAppend += `
            <li>
				<div class="comment-main-level">
					<div class="comment-avatar"><img src="../img/avatar.png" alt=""></div>
					<div class="comment-box">
						<div class="comment-head">
							<h6 class="comment-name by-author">${comentario.user}</h6>
							<span class="score">${comentario.dateTime} - ${comentario.score}</span>
							<i class="fa fa-reply"></i>
							<i class="fa fa-heart"></i>
						</div>
						<div class="comment-content">
							${comentario.description}
						</div>
					</div>
				</div>
			</li>
            `
            document.getElementById("comments-list").innerHTML = (htmlContentToAppend);   
        };
    };

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            comentariosArray = resultObj.data;
            mostrarComentarios(comentariosArray);
        };
    });

});



/********************************NUEVO COMENTARIO***************************/

function mostrar () {
    let caja = document.getElementById('nuevo-comentario');
    let mensaje = document.getElementById('msj').value;
    let filas = ""

        filas += `
        <li>
            <div class="comment-main-level">
                <div class="comment-avatar"><img src="../img/avatar.png" alt=""></div>
                <div class="comment-box">
                    <div class="comment-head">
                        <h6 class="comment-name by-author">${coment.nombre}</h6>
                        
                        <i class="fa fa-reply"></i>
                        <i class="fa fa-heart"></i>
                    </div>
                    <div class="comment-content">
                        ${mensaje}
                    </div>
                </div>
            </div>
        </li>
        `;
    
    caja.innerHTML += filas;
    document.getElementById('msj').value = "";
    document.getElementById('msj').focus();
};

document.getElementById("enviar").addEventListener("click", function(){
    mostrar ();
});



/*****************************PRODUCTOS RELACIONADOS********************************/










/**************************** */

// let nuevoComentario = [];

// function comentar () {

//     let mensaje = document.getElementById('username'); //input del html
//     let comentario = {} // Creamos un objeto vacio

//     mensaje.classList.remove('error') // Quitamos la clase de estilo 'error', del input

//     if(mensaje.value.trim() === "") {
        
//         alert("Ingrese Usuario");
//         mensaje.classList.add('error');
//     /* Si el campo de usuario se encuentra vacio... (con trim() estamos ignorando los espacios en blanco)
//     mostraremos un cartel de alerta y agregaremos una clase de estilo 'error'*/  
//     } else {

//         comentario.nombre = mensaje.value;

//         localStorage.setItem('Usuario', JSON.stringify(comentario));
//     /*Si ninguna de las dos condiciones se cumplen, redireccionaremos a "index.html,
//     almacenando como propiedad 'nombre' del objeto 'usuario' el datos ingresado
//     y a la propiedad 'estado' le asignaremos el string "conectado".
//     Finalmente almacenaremos los datos en localStorage convirtiendo el objeto en un JSON */
//     }
    
// }