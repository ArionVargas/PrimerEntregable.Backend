import fs from 'fs';
import path from 'path';

const cartsFilePath = path.join(__dirname, '..', '..', 'data', 'carts.json');

export const getCartsFromFile = async () => {
    try {
        const data = await fs.promises.readFile(cartsFilePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error al leer los carritos desde el archivo:', error);
        return [];
    }
};

export const saveCartsToFile = async (carts) => {
    try {
        await fs.promises.writeFile(cartsFilePath, JSON.stringify(carts, null, 2));
    } catch (error) {
        console.error('Error al guardar los carritos en el archivo:', error);
    }
};
