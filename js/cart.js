let prodPreCargados = [];

let envio = document.getElementsByClassName('costo_envio');

document.addEventListener("DOMContentLoaded", function (e) {

/********FUNCION QUE CONTIENE EL FETCH, NOS TRAEMOS EL JSON COMO ARRAY********/
    getJSONData(CART_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            prodPreCargados = resultObj.data.articles;
            mostrar(prodPreCargados);
        }
    });

});

function mostrar(preCargados) {

            let listaPreCargados = "";
            let pesos = 0;
            for(let i = 0; i < preCargados.length; i++){

                //Este IF busca en el tipo de moneda y si es distinto a UYU lo pasa a UYU
                //Tambien aproveche para pushear el resultado dentro de un array
                if(preCargados[i].currency == "UYU"){
                    pesos = preCargados[i].unitCost;
                    // totales.push(subtotal);
                } else {
                    pesos = preCargados[i].unitCost * 44;
                    // totales.push(subtotal);
                };
                

                listaPreCargados += `
                                        <tr>
                                            <td align="center"><img src="${preCargados[i].src}" height=50></td>
                                            <td>${preCargados[i].name}</td>
                                            <td align="center"><input align="center" type="number" class="cantidad" min="1" max="100" value="${preCargados[i].count}" onchange="sumar()"></td>
                                            <td align="center"><span id="moneda${i}">${preCargados[i].currency}</span> <span >${preCargados[i].unitCost}</span></td>
                                            <td align="center"><span>UYU</span> <span class="costo">${pesos}</span></td>
                                            <td align="center">UYU <span class="subtotal" id="res${i}"></span></td>
                                            <td align="center"><i class="fas fa-trash-alt" style="cursor: pointer" onclick="borrar(${i})"></i></td>
                                        </tr>
                                    `

                
            }
            document.getElementById("lista-pre-cargados").innerHTML = (listaPreCargados);
            sumar();


};

function sumar (){

    let precios = document.getElementsByClassName('costo');
    let cantidades = document.getElementsByClassName('cantidad');

    let total = 0;
    let subtotal = 0;

    for(let i = 0; i < precios.length; i++){

        subtotal = parseFloat(precios[i].innerHTML) * parseFloat(cantidades[i].value);
        total += subtotal;

        document.getElementById('res'+i).innerHTML = subtotal;

    }

    document.getElementById('total_sin_envio').innerHTML = "UYU " + (total); //Muestra el Total en el ID correspondiente.

    costoEnvio = 0;
    for (let i = 0; i < envio.length; i++) {
        if (envio[i].checked) {
            costoEnvio = total * parseFloat(envio[i].value);
        }
        
    }

    document.getElementById('costo_de_envio').innerHTML = "UYU " + (costoEnvio).toFixed(2);
    document.getElementById('total_con_envio').innerHTML = "UYU " + (costoEnvio + total).toFixed(2);

};

function borrar (i) {

    prodPreCargados.splice(i, 1);
    mostrar(prodPreCargados);
    sumar();

};

function metodoDePago() {

    var boton = document.getElementById('seleccionar_metodo');
    var checks = document.getElementsByClassName('form-check-input');
    console.log(checks);
    
    for (let i = 0; i < checks.length; i++) {
        const element = checks[i];
        if (element.checked) {
            document.getElementById('forma_de_pago').innerHTML = element.value;
        }
        
    }

};



// Funcion para mostrar un spiner en formato gif una vez que damos al boton de realizar compra.
// function procesarCompra() {

//     const cargandoGif = document.getElementById('cargando');
//     cargandoGif.style.display = 'block';

//     const enviado = document.createElement('img');
//     enviado.src = "img/mail.gif";
//     enviado.style.display = 'block';
//     enviado.width = '150';

//     setTimeout(() => {
//         cargandoGif.style.display = 'none';
//         document.getElementById('loaders').appendChild(enviado);
//     }, 3000);

// }


// Evento para ejecutar la funcion procesarCompra al dar click sobre el lugar deseado.
// document.getElementById('procesar-compra').addEventListener('click', ()=>{

//     procesarCompra();

// })

