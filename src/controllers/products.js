import { Product } from "../models/Product"

export const productsController = {
    //GET /products
    index: async (req, res) => {
        const products = await Product.findaAll();
        res.json(products);

    },

    //POST /products
    create: async (req, res) => {
        const newProduct = await Product.create(req.body);
        res.status(201).json(newProduct);

    },

    //POST /products/:id
    show: async (req, res) => {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(401).json({ message: 'product not found' });
        res.json(product);

    },
    //PUT /products/:id
    update: async (req, res) => {
        const updatedProduct = await Product.update(req.params.id,
            req.body);
        if (!updatedProduct) return res.status(401).json({ message: 'product not found' });

        res.json(updatedProduct);

    },
    //DELETE /products/:id
    delete: async (req, res) => {
        const result = await Product.delete(req.params.id);

        res.status(201).json(result)

    }
}