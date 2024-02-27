import database from './database';

export function OrdersManager() {
    return {
        async getNewOrders() {
            const orders = await database.getOrders();
            const newOrders = { /* some logic */ }
            return newOrders;
        }
    }
}