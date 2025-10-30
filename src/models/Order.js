import { getClient, query } from "../database"
import { Product } from "./Product"

export class Order{
    constructor(orderRow, populateClient, 
        populateProducts){
            this.id = orderRow.id
            this.clientId = orderRow.client_id
            this.total = +orderRow.total
            this.createdAt = new Date(orderRow.created_at)
            this.updatedAt = new Date(orderRow.updated_at)

            this.client = undefined

            if(populateClient){
                this.client = populateClient
            }

            this.products = undefined

            if(populateProducts){
                this.products = populateProducts
            }
    }

    static async findAll(){
        const result = await query(`
            SELECT 
                orders.*,
                clients.id AS "client.id",
                clients.name AS "client.name",
                clients.email AS "client.email",
                clients.created_at AS "client.created_at",
                clients.updated_at AS "client.updated_at"
            FROM orders JOIN clients on clients.id = orders.client_id
            ;`)

        return result.rows.map((row) => new Order(row));
    }

    static async create(clientId, orderProducts){
        const storedOrderProducts = await query(`
            SELECT  * FROM products
            WHERE id = ANY($1::int[])
            ;`,[orderProducts.map((product) => product.id)]);

        let orderTotal = 0;
        const populateOrderProduct = storedOrderProducts.rows.map((row) =>{
            const {quantity} = orderProducts.find((product) => product.id === row.id)
            orderTotal += row.price * quantity;
            return { product: new Product(row), quantity}
        });

        const dbClient = await getClient();

        let response;
        try {
            await dbClient.query(`BEGIN`);

            const orderCreationResult = await dbClient.query(`
                INSERT INTO orders (client_id, total)
                VALUES ($1, $2)
                RETURNING *
                ;`, [clientId, orderTotal]);

            const order = new Order(orderCreationResult.rows[0], null, populateOrderProduct)

            for(const entry of populateOrderProduct){
                await dbClient.query(`
                    INSERT INTO order_products (order_id, product_id, quantity)
                    VALUES ($1,$2,$3)
                    ;`, [order.id, entry.product.id, entry.product.quantity ]);
            }

            await dbClient.query("COMMIT");
            response = order;
        } catch (error) {
            await dbClient.query(`ROLLBACK`);
            response = {message: `Error while create order: ${error.message}`}
        } finally{
            dbClient.release();
        }

        return response;
    }
}