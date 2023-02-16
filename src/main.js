
const fs = require('fs')

class ProductManager {

    constructor(path) {
        this.products = []
        this.path=path

    }

    leerArchivo =async () => {

        this.products= JSON.parse(await fs.readFileSync(this.path, 'utf-8' ));

    }
    guardarArchivo = async() => {

        await fs.writeFileSync(this.path,JSON.stringify(this.products));



    }

    addProduct = (producto) => {
         

        if (producto.title === undefined || producto.description === undefined ||
            producto.price === undefined || producto.thumbnail === undefined ||
            producto.code === undefined || producto.stock === undefined) { return }

            this.leerArchivo()

        if (this.products.find(x => x.code === producto.code) !== undefined)
            return

        producto.id = this.products.length


        this.products.push(producto)

        this.guardarArchivo()
    }
    getProducts = () => {

        this.leerArchivo()
        return this.products
    }

    getProductById = (id) => {

        this.leerArchivo()

        let elemento = this.products.find(y => y.id === id)
        if (elemento !== undefined)
            return elemento
        else
            console.log('Not found')

            


    }

    updateProduct= (producto)=>{

        let producOiginal = this.getProductById(producto.id)

        if (producOriginal!==undefined){

        producOiginal.title = producto.title
        producOiginal.description = producto.description
        producOiginal.price = producto.price
        producOiginal.thumbnail = producto.thumbnail
        producOiginal.code = producto.code
        producOiginal.stock = producto.stock

        this.deleteProduct(producto.id)
        
        this.products.push(producOiginal)

        this.guardarArchivo()

        }
       


    }

    deleteProduct=(id)=>{

      this.leerArchivo()

      let productoId= this.products.find(x=> x.id===id )

      if(productoId!== undefined){

        this.products=this.products.filter(x=> x.id!==id)

        this.guardarArchivo()
      }
      


    }
}

class product {
    constructor(title, description, price, thumbnail, code, stock) {

        this.title = title
        this.description = description
        this.price = price
        this.thumbnail = thumbnail
        this.code = code
        this.stock = stock

    }

}

let proManager = new ProductManager();
let pro1 = new product('pantalon', 'jean', 1500, 'https://static2.degriffstock.com/99829-thickbox/pantalon-jeans.jpg', 'pant86', 2);
proManager.addProduct(pro1);