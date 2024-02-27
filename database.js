export default function database() {
    const products = [ /* ... */ ]

    return {
        getInventory(productId) {
            return products.find(p => p.id === productId).count
        },
        getOrders() {
            return Promise.resolve([
                { id: 1, name: 'Order 1' },
                { id: 2, name: 'Order 2' },
                { id: 3, name: 'Order 3' },
            ])
        }
    }

}