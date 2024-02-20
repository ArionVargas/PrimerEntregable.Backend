const socket = io()

/* socket.emit("mensaje","hola desde el cliente ") */

socket.on("products",products =>{
    console.log(products)
})