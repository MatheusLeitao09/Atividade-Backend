import prisma from '../utils/prismaClient.js';

export const create = async (data) => {
    return await prisma.food.create({ data });
};

export const findAll = async (filters = {}) => {
    const { name, description, price, category, available } = filters;
    const where = {};

    //Não consigo usar o insensitive pois o SQlite não suporta ele

    if (name) where.name = { contains: name,};
    if (description) where.description = { contains: description };
    if (category) where.category = { contains: category };
    if (price !== undefined) where.price = parseFloat(price);
    if (available !== undefined) where.available =available === 'true' || available === true;

    return await prisma.food.findMany({
        where,
        orderBy: { createdAt: 'desc' },
    });
};

export const findById = async (id) => {
    return await prisma.food.findUnique({
        where: { id: parseInt(id) },
    });
};

export const update = async (id, data) => {
    return await prisma.food.update({
        where: { id: parseInt(id) },
        data,
    });
};

export const remove = async (id) => {
    return await prisma.food.delete({
        where: { id: parseInt(id) },
    });
};

