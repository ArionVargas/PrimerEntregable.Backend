const socket = io()

socket.on("sendProducts", (obj) => {
  updateProductList(obj)
})


function updateProductList(productList) {
  const productsDiv = document.getElementById("list-products")

  let productosHTML = ""

  let cardsCount = 0
  productList.forEach((product, index) => {
    if (index % 3 === 0) {
      productosHTML += `<div class="row justify-content-center">`
    }
    productosHTML += `
    <div class="col-md-4 mb-4">
      <div class="card card-custom">
        <div class="card-header">Producto</div>
        <div class="card-body">
          <h5 class="card-title">Título del Producto ${product.title}</h5>
          <p class="card-text">ID: ${product.id}</p>
          <p class="card-text">Precio: ${product.price}</p>
          <p class="card-text">Imagen(URL): ${product.img}</p>
          <p>Código: ${product.code}</p>
          <p>Estado: ${product.status}</p>
          <p>Stock: ${product.stock} unidades</p>
          <p>Categoría: ${product.category}</p>
        </div>
        <button class="btn btn-primary" type="button" onclick="deleteProduct('${product.id}')">ELIMINAR</button>
      </div>
    </div>
  `
    cardsCount++
    if (cardsCount % 3 === 0 || index === productList.length - 1) {

      productosHTML += `</div>`
    }
  })

  productsDiv.innerHTML = productosHTML
}


let form = document.getElementById("formproducts")
form.addEventListener("submit", (evt) => {
  evt.preventDefault()

  let title = form.elements.title.value
  let description = form.elements.description.value
  let price = form.elements.price.value
  let img = form.elements.img.value
  let code = form.elements.code.value
  let stock = form.elements.stock.value
  let status = form.elements.status.value
  let category = form.elements.category.value

  socket.emit("addProduct", {
    title,
    description,
    price,
    img,
    code,
    stock,
    status,
    category
  })

  form.reset()

})

document.getElementById("delete-btn").addEventListener("click", function () {
  const deleteIdInput = document.getElementById("productID")
  const deleteId = deleteIdInput.value
  socket.emit("deleteProduct", deleteId)
  deleteIdInput.value = ""
  
})

function deleteProduct(productId) {
  socket.emit("deleteProduct", productId)
}

