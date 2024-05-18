import { getCartsFromFile, saveCartsToFile } from '../../models/modelsFilesystem/carts.model.js'

class CartDaoFilesystem {
    async getCarts() {
        return await getCartsFromFile();
    }

    async getCartById(id) {
        const carts = await getCartsFromFile();
        return carts.find(cart => cart.id === id);
    }

    async addCart(cart) {
        const carts = await getCartsFromFile();
        carts.push(cart);
        await saveCartsToFile(carts);
        return cart;
    }

    async updateCart(id, updatedCart) {
        const carts = await getCartsFromFile();
        const index = carts.findIndex(cart => cart.id === id);
        if (index !== -1) {
            carts[index] = { ...carts[index], ...updatedCart };
            await saveCartsToFile(carts);
            return carts[index];
        }
        return null;
    }

    async deleteCart(id) {
        let carts = await getCartsFromFile();
        carts = carts.filter(cart => cart.id !== id);
        await saveCartsToFile(carts);
        return { message: 'Carrito eliminado con éxito' };
    }
}

export default CartDaoFilesystem;
