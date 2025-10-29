import { query } from "../database"

export class Client {
    constructor(clientRow) {
        this.id = clientRow.id
        this.name = clientRow.name
        this.email = clientRow.email
        this.createdAt = new Date(clientRow.created_at)
        this.updatedAt = new Date(clientRow.updated_at)
    };

    static async findAll() {
        const { rows } = await query(`
            SELECT * FROM clients
            ;`);

        if (!rows.length) return null

        return rows.map((row) => new Client(row));
    }

    static async findById(id) {
        const { rows } = await query(`
            SELECT * FROM clients WHERE id = $1
            ;`, [id]);

        if (!rows[0]) return null

        return new Client(rows[0])
    }

    static async create({ name, email }) {
        const emailExist = await this.findByEmail(email);

        if (emailExist) return null;

        const { rows } = await query(`
            INSERT INTO clients (name, email)
            VALUES ($1, $2)
            RETURNING *
            ;`, [name, email]);

        if (!rows[0]) return null

        return new Client(rows[0])
    }

    static async update(id, newDate) {
        const newEmail = await this.findByEmail(newDate.email);
        if (newEmail) return null

        const { rows } = await query(`
            SELECT * FROM clients
            WHERE id = $1
            ;`, [id])

        const client = rows[0]

        if (!client) null

        Object.assign(client, newDate);
        client.updatedAt = new Date(); 

        await query(`
            UPDATE clients SET name = $1,
            email = $2,
            updated_at = $3
            WHERE id = $4
            ;`, [client.name, client.email, client.updatedAt, client.id]);

        return new Client(client);
    }

    static async delete(id) {
        const { rows } = await query(`
            DELETE FROM clients WHERE id = $1
            RETURNING *
            `, [id]);

        if (!rows[0]) return null

        return { message: `Client deleted sucess` }
    }

    static async findByEmail(email) {
        const { rows } = await query(`
            SELECT * FROM clients WHERE email = $1
            ;`, [email]);

        if (!rows[0]) return null;

        return new Client(rows[0])

    }
}