import {InventoryManager} from "./InventoryManager";
import {OrdersManager} from "./OrdersManager";

export async function App() {
    const inventoryManager = InventoryManager();
    const ordersManager = OrdersManager();

    const orders = await ordersManager.getNewOrders()
    const availableProducts = inventoryManager.getAvailableProduct()

    // process orders...
}


import Database from './Database';

export async function App() {
    const database = Database();
    const inventoryManager = InventoryManager(database);
    const ordersManager = OrdersManager(database);

    const orders = await ordersManager.getNewOrders()
    const availableProducts = await inventoryManager.getAvailableProduct()

    // process orders...
}

export async function App() {
    const database = Database();
    const inventoryManager = InventoryManager(database);
    const ordersManager = OrdersManager(database);

    const orders = await ordersManager.getNewOrders()
    const availableProducts = await inventoryManager.getAvailableProduct()

    // process orders...
}

export async function App() {
    const database = Database();
    await database.init()
    const inventoryManager = await import(() => InventoryManager(database))
    const ordersManager = await import(() => OrdersManager(database))

    const orders = await ordersManager.getNewOrders()
    const availableProducts = await inventoryManager.getAvailableProduct()

    // process orders...
}

export async function App() {
    const database = Database();
    await database.init()
    const inventoryManager = await import(() => InventoryManager(database))
    const ordersManager = await import(() => OrdersManager(database))
    await inventoryManager.init()
    await ordersManager.init()

    const orders = await ordersManager.getNewOrders()
    const availableProducts = await inventoryManager.getAvailableProduct()

    // process orders...
}

export function IocManager(moduleLoaders) {
    const instances = {}

    async function initModule(name) {
        if (!instances[name]) {
            const module = moduleLoaders[name]
            const factory = await moduleLoaders[name]()
            const resolveDeps = await Promise.all(factory.dependencies.map(initModule))
            const instance = factory(...resolveDeps)
            instances[name] = instance
            await instance.init()
            return instance
        }
        return instances[name]
    }
    return {
        async init(modulesToLoad) {
            await Promise.all(modulesToLoad.map(initModule))
        },
        get(name) {
            return instances[name]
        }
    }
}

export async function App() {
    const ioc = new IocManager({
        database: () => import('./Database'),
        inventoryManager: () => import('./InventoryManager'),
        ordersManager: () => import('./OrdersManager'),
    })

    await ioc.init(['inventoryManager', 'ordersManager'])

    const inventoryManager = ioc.get('inventoryManager')
    const ordersManager = ioc.get('ordersManager')

    const orders = await ordersManager.getNewOrders()
    const availableProducts = await inventoryManager.getAvailableProduct()

    // process orders...
}