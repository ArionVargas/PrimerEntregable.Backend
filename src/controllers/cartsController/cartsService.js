import CartDaoMongo from '../dao/mongodb/cartsDAO.js'
const cartDao = new CartDaoMongo()

//import CartDaoFilesystem from '../dao/filesystem/cartsDAO.js'// O '../dao/cartDaoMongo.js' para MongoDB
//const cartDao = new CartDaoFilesystem()

export const getAllCarts = async () => {
    return await cartDao.getCarts()
}

export const getCartById = async (cartId) => {
    return await cartDao.getCartById(cartId)
}

export const addCart = async (cart) => {
    return await cartDao.addCart(cart)
}

export const updateCart = async (cartId, updatedCart) => {
    return await cartDao.updateCart(cartId, updatedCart)
}

export const deleteCart = async (cartId) => {
    return await cartDao.deleteCart(cartId)
}
