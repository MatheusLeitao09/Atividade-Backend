import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
async function main() {
    console.log('🌱 Iniciando seed...');

    await prisma.food.createMany({
        data: [
            {
            name: "Hambúrguer Artesanal",
            description: "Carne 180g, queijo cheddar e bacon.",
            price: 35.90,
            category: "Lanches",
            available: true
            }, 
            {
            name: "Pizza Margherita",
            description: "Molho de tomate e manjericão fresco.",
            price: 45.00,
            category: "Pizzas",
            available: true
            },
            {
            name: "Suco de Laranja",
            description: "Feito de laranja", 
            price: 12.50,
            category: "Bebidas",
            available: true
            },
            {
            name: "Brownie de Chocolate",
            description: "Com gotas de chocolate meio amargo.",
            price: 14.00,
            category: "Sobremesas",
            available: false 
            },
            {
            name: "Espetinho de Picanha",
            description: "Acompanha farofa e vinagrete.",
            price: 18.00,
            category: "Churrasco",
            available: false 
            }
        ],
    });

    console.log('✅ Seed concluído!');
}

main()
    .catch((e) => {
        console.error('❌ Erro no seed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });