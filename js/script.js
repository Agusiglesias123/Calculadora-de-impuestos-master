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



// capturas DOM

let historialProductos = document.getElementById("historial-btn") 
let VERhistorialProductos = document.getElementById("btn-historial") 
let botonAgregarIVA = document.getElementById("btn-agregarProducto")
let inputProducto = document.getElementById("nombreProducto")
let inputPrecio = document.getElementById("nombrePrecio")
let reset_form = document.getElementById("reset_form")
let inputDolarOficial = document.getElementById("inputDolarOficial");
let inputSinImpuestos = document.getElementById("inputSinImpuestos");
let inputIMPpais = document.getElementById("inputIMP-pais");
let inputIMPganancia = document.getElementById("inputIMP-ganancia");
let inputQatar = document.getElementById("inputQatar");
let checkbox = document.getElementById("flexCheck")
let btnTotal = document.getElementById("totalCimp")
let inputCalculo = document.getElementById("calculador");
let coincidencia = document.getElementById("coincidencia")
let mayorMenor = document.getElementById("mayorMenor")
let menorMayor = document.getElementById("menorMayor")
let buscador = document.getElementById("buscador")




// Ver y ocultar el catologo
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
    historialProductos.classList.add("mt-3")
    historialProductos.innerHTML = `
    <table class="table">
    <thead>
    <tr>
    <th scope="col-12">#</th>
    <th scope="col-12">Producto</th>
    <th scope="col-12">S/IVA</th>
    <th scope="col-12">C/IVA</th>
  </tr>
    </thead>
  </table>
    `
    for (let productos of array){
        let nuevoProducto = document.createElement("ul")
        nuevoProducto.innerHTML = `
        <table class="table align-middle">
        <tbody id="historial-btn ">
          <tr>
            <th scope="row">${productos.id}</th>
            <td>${productos.producto}</td>
            <td>$${productos.precio}</td>
            <td>$${productos.precioIVA}</td>
          </tr>
        </tbody>
      </table>
        `
        historialProductos.appendChild(nuevoProducto)
    }
}

// EVENTOS

botonAgregarIVA.addEventListener("click", () => {cargarProducto(estanteria)})





function cargarProducto(array) {


    let inputProducto = document.getElementById("nombreProducto");
    let inputPrecio = document.getElementById("nombrePrecio");
    let IVA = inputPrecio.value * 1.21;
    const ProductoNuevo = new productos(array.length+1, inputProducto.value, inputPrecio.value, IVA)
    if(inputPrecio.value != "" && inputProducto.value != ""){
        array.push(ProductoNuevo) 
        localStorage.setItem("estanteria", JSON.stringify(array))
        Swal.fire({
            icon: 'success',
            title: 'El producto se agrego correctamente',
            background: '#fff ',
            color: 'black',
            timer: 1500,
            confirmButtonColor: 'black',
            iconColor: '#33c733',
            backdrop: `#33c733
            url("./media/topography.svg")`
          })
    }else{
        Swal.fire({
            icon: 'error',
            title: 'ERROR',
            text: 'Por favor complete todos los campos',
            background: '#fffd',
            timer: 1500,
            color: 'black',
            confirmButtonColor: 'black',
            iconColor: 'red',
            backdrop: `#c71717
            url("./media/topography.svg")`
          })
    }
    inputProducto.value = ""
    inputPrecio.value = ""
}





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



mayorMenor.onclick = function(){
    ordenarMayormenor(estanteria)
}
menorMayor.onclick = function(){
    ordenarMenormayor(estanteria)
}

buscador.addEventListener("input", ()=>{
    buscarInfo(buscador.value, estanteria)
})


function buscarInfo (buscado, array){
    let busquedaArray = array.filter(
        (productos) => productos.producto.toLowerCase().includes(buscado.toLowerCase()) 
    )
    if (busquedaArray.length == 0) {
        coincidencia.innerHTML = `<h5> No hay productos con ese nombre</h5>`
        verHistorial(busquedaArray)
    } else {
    coincidencia.innerHTML = ""
    verHistorial(busquedaArray)
    }
}

