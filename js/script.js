let  impGanancias = 0.45
let  impPais = 0.3
let  impQatar = 0.25
let tax = impGanancias + impPais
let taxQatar = impGanancias + impPais + impQatar
let valorDolar = 195

// funciones generales

function multi(multi1, multi2){
    return multi1 * multi2
}
function suma(suma1, suma2){
    return suma1 + suma2
}
function ordenarMenormayor(array){
    const menorMayor = [].concat(array)
    menorMayor.sort((a,b)=> a.precio - b.precio)
    verHistorial(menorMayor)
}

function ordenarMayormenor(array){
    const mayorMenor = [].concat(array)
    mayorMenor.sort((a,b)=> b.precio - a.precio)
    verHistorial(mayorMenor)
}


 


// Ver y ocultar el catologo

let historialProductos = document.getElementById("historial-btn") 
let VERhistorialProductos = document.getElementById("btn-historial") 


VERhistorialProductos.onclick = () =>{
    VerOcultarElhistorial()
}

historialProductos.onclick = () =>{
    verHistorial(estanteria)
}

function VerOcultarElhistorial(array){
    if (estanteria) {
       VERhistorialProductos.addEventListener("click", function (){
           verHistorial(estanteria)
       })
   }
    if (estanteria) {
        VERhistorialProductos.addEventListener("dblclick", function (){     
            historialProductos.innerHTML = ""
        })
    }
}


function verHistorial(array){
    historialProductos.innerHTML = ""
    for (let productos of array){
        let nuevoProducto = document.createElement("ul")
        nuevoProducto.classList.add("my-2")
        nuevoProducto.innerHTML = `
        <ul class="list-group list-group-horizontal" id="${productos.id}">
        <li class="list-group-item node-bg">${productos.id}</li>
        <li class="list-group-item node-bg">${productos.producto}</li>
        <li class="list-group-item node-bg">S/IVA $${productos.precio}</li>
        <li class="list-group-item node-bg">C/IVA $${productos.precioIVA}</li>
      </ul>
        `
        historialProductos.appendChild(nuevoProducto)
    }
}

// agregar productos

let botonAgregarIVA = document.getElementById("btn-agregarProducto")
botonAgregarIVA.addEventListener("click", () => {cargarProducto(estanteria)})


let inputProducto = document.getElementById("nombreProducto")
let inputPrecio = document.getElementById("nombrePrecio")

function cargarProducto(array) {
    let inputProducto = document.getElementById("nombreProducto");
    let inputPrecio = document.getElementById("nombrePrecio")
    let IVA = inputPrecio.value * 1.21;
    const ProductoNuevo = new productos(array.length+1, inputProducto.value, inputPrecio.value, IVA)
    array.push(ProductoNuevo) 
    // verHistorial(array)
    inputProducto.value = ""
    inputPrecio.value = ""
    localStorage.setItem("estanteria", JSON.stringify(array))
}



let inputDolarOficial = document.getElementById("inputDolarOficial");
let inputSinImpuestos = document.getElementById("inputSinImpuestos");
let inputIMPpais = document.getElementById("inputIMP-pais");
let inputIMPganancia = document.getElementById("inputIMP-ganancia");
let inputQatar = document.getElementById("inputQatar");
let checkbox = document.getElementById("flexCheck")
let btnTotal = document.getElementById("totalCimp")
let inputCalculo = document.getElementById("calculador");



// valor dolar estatico
inputDolarOficial.innerHTML = `$${valorDolar}`

// calculo total de impuestos
inputDolarOficial.innerHTML = `$${valorDolar}`
inputCalculo.addEventListener("input",function(){
    
    multi(valorDolar, inputCalculo.value)
    let sinImpuestos = multi(valorDolar, inputCalculo.value);
    inputSinImpuestos.innerHTML = `$${sinImpuestos}`
    multi(sinImpuestos, tax)
    let conImpuestos = multi(sinImpuestos, tax);
    let totalCimp = suma(conImpuestos, sinImpuestos);
    let totalCimpp = totalCimp.toFixed()
    btnTotal.innerHTML = `$${totalCimpp}`;
    multi(sinImpuestos, impPais);
    let cPaisImp = multi(sinImpuestos, impPais).toFixed();
    inputIMPpais.innerHTML = `$${cPaisImp}`;
    multi(sinImpuestos, impGanancias);
    let cGananImp = multi(sinImpuestos, impGanancias).toFixed();
    inputIMPganancia.innerHTML =`$${cGananImp}`
    checkbox.addEventListener("change", function(){
        if (checkbox.checked) {
            let soloQatar = multi (sinImpuestos, impQatar).toFixed()
            inputQatar.innerHTML = `$${soloQatar}`
            let cImpuestos = multi(sinImpuestos, taxQatar);
            let totalCimpQatar = suma(cImpuestos, sinImpuestos);
            btnTotal.innerHTML = `$${totalCimpQatar}`
        } else {
            inputQatar.innerHTML = `$0`
            btnTotal.innerHTML = `$${totalCimpp}`
        }
    })
})

// ordenar historial

let mayorMenor = document.getElementById("mayorMenor")
let menorMayor = document.getElementById("menorMayor")

mayorMenor.onclick = function(){
    ordenarMayormenor(estanteria)
}
menorMayor.onclick = function(){
    ordenarMenormayor(estanteria)
}

let buscador = document.getElementById("buscador")
buscador.addEventListener("input", ()=>{
    buscarInfo(buscador.value, estanteria)
})


function buscarInfo (buscado, array){
    let busquedaArray = array.filter(
        (productos) => productos.producto.toLowerCase().includes(buscado.toLowerCase()) 
    )
    verHistorial(busquedaArray)
}