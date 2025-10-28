import { query } from "../database"

export class Client {
    constructor(clientRow) {
        this.id = clientRow.id
        this.name = clientRow.name
        this.email = clientRow.email
        this.createdAt = new Date(clientRow.created_at)
        this.updatedAt = new Date(clientRow.updated_at)
    };

    static async findaAll() {
        const { rows } = await query(`
            SELECT * FROM clients
            ;`);

        if (!rows) return null

        return rows.map((row) => new Client(row));
    }

    static async findById(id){
        const {row} = await query(`
            SELCT * FROM clients WHERE id = $1
            `, [id]);

        if(!row[0]) return null

        return new Client(row[0])
    }

    static async create({ name, email }) {
        const { rows } = await query(`
            INSERT INTO clients (name, email)
            VALUES ($1, S$2)
            RETURNING *
            ;`, [name, email]);

        if(!rows[0]) return null

        return new Client(rows[0])
    }

    static async update(id, newDate) {
        const { rows } = await query(`
            SELECT * FROM clients
            WHERE id = $1
            ;`, [id])

        const client = row[0]

        if(!client) null

        Object.assign(client, newDate);
        client.updatedAt = new Date();

        await query(`
            UPDATE clients SET name = $1,
            email = $2,
            updated_at = $3;
            `, [client.name, client.email, client.updatedAt]);

        return client;
    }

    static async delete(id){
        const {row} = await query(`
            DELETE FROM clientes WHERE id = $1
            `, [id]);

        if(!rows[0]) return null

        return {message: `Client deleted sucess`}
    }
}