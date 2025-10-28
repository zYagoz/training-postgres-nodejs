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
            CREATE TABLE IF NOT EXIST clients(
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(100) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
            `)

        console.log('Created "products" table');
        process.exit(1);
};

syncDataBase()