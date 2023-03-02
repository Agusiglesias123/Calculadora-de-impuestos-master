// Clase constructora

class productos {
    constructor(id, producto, precio, precioIVA){
        this.id = id,
        this.producto = producto,
        this.precio = precio,
        this.precioIVA = precioIVA
    }
}
const productos1= new productos(1,"Arroz",200, 242)

const productos2 = new productos(2,"Atun",700, 847)

const productos3 = new productos(3,"fideos", 500, 605)

const productos4= new productos(4,"papa", 150, 181)


let estanteria = []
if(localStorage.getItem("estanteria")){
    estanteria = JSON.parse(localStorage.getItem("estanteria"))
}else{
    console.log("Seteando historial de productos")
    estanteria.push(productos1, productos2, productos3, productos4)
    localStorage.setItem("estanteria", JSON.stringify(estanteria))
}
