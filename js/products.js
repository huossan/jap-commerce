var productosArray = [];
var listafiltrada = [];

/****************RECORRE ARRAY TRAIDA DE JSON Y LA MUESTRA****************/
function mostrarListaProd(arrayProd){

    let htmlContentToAppend = "";
    for(let i = 0; i < arrayProd.length; i++){
        let producto = arrayProd[i];

        // htmlContentToAppend += `
        // <a href="product-info.html" class="">
        //         <div class="card" onclick = "informacion ()">
        //             <img src="` + producto.imgSrc + `" alt="` + producto.description + `">
        //             <h4>`+ producto.name +`</h4>
        //             <p>` + producto.description + `</p>
        //             <small class="text-muted">` + producto.soldCount + ` vendidos</small><br>
        //             <h4 class = "costo">`+ producto.currency +` `+ producto.cost +`</h4>                                    
        //         </div></a>
        //     `
        htmlContentToAppend += `
        <a href="product-info.html" class="">
            <div class="card">
                <div>
                    <img src="` + producto.imgSrc + `" alt="` + producto.description + `">
                </div>
                <div class="cont">
                    <h4>`+ producto.name +`</h4>
                    <p>` + producto.description + `</p>
                    <small class="text-muted">` + producto.soldCount + ` vendidos</small>
                </div>
                <div class="cost">

                    <h4 class = "costo">`+ producto.currency +` `+ producto.cost +`</h4> 
                </div>                                     
            </div></a>
        `
        document.getElementById("cat-list-container").innerHTML = (htmlContentToAppend);   
    };
};

/**************BUSCA EN TIEMPO REAL Y MUESTRA EL NUEVO ARRAY**************/
function buscar () {
    var texto = document.getElementById('filtro').value; // Declaramos una variable en donde se guardara el valor ingresado en el input con id 'filtro'
    var listafiltrada = productosArray.filter(producto => { // Le ingresamos al array crerado como listafiltrada, los elementos de productosArray filtrados
        return producto.name.toLowerCase().indexOf(texto.toLowerCase()) > -1;
    });
    
    mostrarListaProd(listafiltrada);
};

/********************************** ORDENAR ******************************/
function ordenarPorNombre () {
    productosArray.reverse((a,b) => {
        if (a.name > b.name) {
            return 1;
        } else if (a.name < b.name) {
            return -1;
        } else {
            return 0;
        }
    });
    mostrarListaProd(productosArray);
};

function ordenarPorRelevancia () {
    productosArray.sort((a,b) => {
        if (a.soldCount > b.soldCount) {
            return 1;
        } else if (a.soldCount < b.soldCount) {
            return -1;
        } else {
            return 0;
        }
    });
    mostrarListaProd(productosArray);
};

function ordenarPorCosto () {
    productosArray.reverse(function(a,b) {
        let costoA = parseInt(a.cost);
        let costoB = parseInt(b.cost);

        return costoA - costoB;        
    });
    mostrarListaProd(productosArray);
};



/****************LANZA EL EVENTO LUEGO DE CARGAR EL HTML****************/
document.addEventListener("DOMContentLoaded", function (e) {

/********FUNCION QUE CONTIENE EL FETCH, NOS TRAEMOS EL JSON COMO ARRAY********/
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            productosArray = resultObj.data;
            mostrarListaProd(productosArray);
        }
    });

/********EVENTO QUE LANZA LA FUNCION CADA VEZ QUE SE TYPEA UNA TECLA********/
    document.getElementById('filtro').addEventListener('keyup', () => {
        buscar ();
    });

    document.getElementById("ordenarNombre").addEventListener("click", function(){
        ordenarPorNombre ();
    });

    document.getElementById("ordenarRelevancia").addEventListener("click", function(){
        ordenarPorRelevancia ();
    });

    document.getElementById("ordenarCosto").addEventListener("click", function(){
        ordenarPorCosto ();
    });
    
});






/*********************************************************************************************************/



    // document.getElementById("clearRangeFilter").addEventListener("click", function(){
    //     document.getElementById("precioMinimo").value = "";
    //     document.getElementById("precioMaximo").value = "";

    //     precioMinimo = undefined;
    //     precioMaximo = undefined;

    //     mostrarListaProd();
    // });

    // document.getElementById("filtrarPrecio").addEventListener("click", function(){
    //     //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
    //     //de productos por categoría.
    //     precioMinimo = document.getElementById("precioMinimo").value;
    //     precioMaximo = document.getElementById("precioMaximo").value;

    //     if ((precioMinimo != undefined) && (precioMinimo != "") && (parseInt(precioMinimo)) >= 0){
    //         precioMinimo = parseInt(precioMinimo);
    //     }
    //     else{
    //         precioMinimo = undefined;
    //     }

    //     if ((precioMaximo != undefined) && (precioMaximo != "") && (parseInt(precioMaximo)) >= 0){
    //         precioMaximo = parseInt(precioMaximo);
    //     }
    //     else{
    //         precioMaximo = undefined;
    //     }

    //     mostrarListaProd();
    // });



