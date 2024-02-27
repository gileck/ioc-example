import database from './database';

export function InventoryManager() {
    return {
        getAvailableProduct() {
            const inventory = database.getInventory();
            const availableProducts = inventory.filter(p => p.count > 0)
            return availableProducts
        }
    }
}

export function InventoryManager() {
    let inventory
    return {
        async init() {
            inventory = await database.getInventory();
        },
        getAvailableProduct() {
            const availableProducts = inventory.filter(p => p.count > 0)
            return availableProducts
        }
    }
}