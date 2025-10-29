import { Client } from "../models/Clients"

export const clientsController = {
    // GET /clients
    index: async (req, res) => {
        const products = await Client.findAll();

        return res.json(products);
    },
    // POST /clients
    create: async (req, res) => {
        const product = await Client.create(req.body);

        if(!product) return res.status(400).json(
            {message: `Não foi possível criar o cliente`}
        )

        return res.staus(200)
    },
    // GET /clients/:id
    show: async (req, res) => {
        const product = await Client.findById(req.params.id);

        if(!product) return res.staus(400).json({
            message: `Não foi possível localizar o cliente`
        })
    },
    // PUT /clients/:id
    update: async (req, res) => {
        const product = await Client.update(req.params.id, req.body);

        if(!product) return res.status(400).json({
            message: `Não foi possível atualizar o cliente`
        });
    },
    // DELETE /clients/:id
    delete: async (req, res) => {
        const product = await Client.delete(req.params.id);

        if(!product) return res.status(400).json({
            message: `Não foi possível excluir o cliente 
            \n Ou cliente já excluído`
        });

        return res.status(200).json({
            message: `Cliente excluído`
        })
    },
}