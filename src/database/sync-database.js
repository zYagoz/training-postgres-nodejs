import { query } from ".";

async function syncDataBase() {
    await query(`
        CREATE TABLE IF NOT EXISTS products(
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT FULL,
        description TEXT,
        price DECIMAL (10,2) NOT NULL,
        stock_quantity INT NOT NULL,
        create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        update_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        is_active BOOLEAN DEFAULT TRUE
        );
        `);

        await query(`
            CREATE TABLE IF NOT EXISTS clients(
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(100) UNIQUE NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
            `)

        await query(`
            CREATE TABLE IF NOT EXISTS orders(
            id SERIAL PRIMAY KEY,
            client_id INT NOT NULL,
            total DECIMAL(10,2) NOT NULL DEFAULT 0,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (client_id) REFERENCES clients(id)
            );
            `)

        await query(`
            CREATE TABLE IF NOT EXISTS order_products(
            order_id INT,
            product_id INT,
            quantity INT NOT NULL DEFAULT 1,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (order_id, product_id),
            FOREIGN KEY (order_id) REFERENCES orders (id) ON DELETE CASCADE,
            FOREIGN KEY (product_id) REFERENCES products(id),
            );
            `)

        console.log('Created tables');
        process.exit(1);
};

syncDataBase()