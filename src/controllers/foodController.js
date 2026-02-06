import * as model from '../models/foodModel.js';

export const getAll = async (req, res) => {
    try {
        const foods = await model.findAll(req.query);

        if (!foods || foods.length === 0) {
            return res.status(200).json({
                message: 'Nenhuma comida encontrada.',
            });
        }
        res.json(foods);
    } catch (error) {
        console.error('Erro ao buscar:', error);
        res.status(500).json({ error: 'Erro ao buscar comidas' });
    }
};

export const create = async (req, res) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({
                error: 'Corpo da requisição vazio. Envie os dados da comida!',
            });
        }

        const { name, description, price, category, available } = req.body;

        if (!name) return res.status(400).json({ error: 'O nome (nome) é obrigatório!' });
        if (!description) return res.status(400).json({ error: 'A descrição é obrigatória!' });
        if (!price) return res.status(400).json({ error: 'O preço (preco) é obrigatório!' });
        if (!category) return res.status(400).json({ error: 'A categoria é obrigatória!' });
    
        const validaCategoria = ['lanches', 'pizzas', 'bebidas', 'sobremesas', 'churrasco'];
       

        const data = await model.create({
            name,
            description,
            category,
            price: parseFloat(price),
            available: available !== undefined ? available: true,
        });

        res.status(201).json({
            message: 'Comida cadastrada com sucesso!',
            data,
        });
    } catch (error) {
        console.error('Erro ao criar:', error);
        res.status(500).json({ error: 'Erro interno no servidor ao salvar a comida.' });
    }
};

export const getById = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'O ID enviado não é um número válido.' });
        }

        const data = await model.findById(id);
        if (!data) {
            return res.status(404).json({ error: 'Comida não encontrada.' });
        }
        res.json({ data });
    } catch (error) {
        console.error('Erro ao buscar:', error);
        res.status(500).json({ error: 'Erro ao buscar comida' });
    }
};

export const update = async (req, res) => {
    try {
        const { id } = req.params;

        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({
                error: 'Corpo da requisição vazio. Envie os dados do exemplo!',
            });
        }

        if (isNaN(id)) return res.status(400).json({ error: 'ID inválido.' });

        const exists = await model.findById(id);
        if (!exists) {
            return res.status(404).json({ error: 'Comida não encontrada para atualizar.' });
        }

        const data = await model.update(id, req.body);
        res.json({
            message: `A comida "${data.name}" foi atualizada com sucesso!`,
            data,
        });
    } catch (error) {
        console.error('Erro ao atualizar:', error);
        res.status(500).json({ error: 'Erro ao atualizar comida' });
    }
};

export const remove = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) return res.status(400).json({ error: 'ID inválido.' });

        const exists = await model.findById(id);
        if (!exists) {
            return res.status(404).json({ error: 'Comida não encontrada para deletar.' });
        }

        await model.remove(id);
        res.json({
            message: `A comida "${exists.name}" foi deletada com sucesso!`,
            deletado: exists,
        });
    } catch (error) {
        console.error('Erro ao deletar:', error);
        res.status(500).json({ error: 'Erro ao deletar comida' });
    }
};

