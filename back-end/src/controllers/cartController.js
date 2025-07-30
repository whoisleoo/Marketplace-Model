import { prisma } from '../database/db.js';


//===========================================================================================
//                              ADICIONAR PRODUTO AO CARRINHO
//===========================================================================================

export const adicionarProduto = async (req, res) => {
    const { produtoId, quantidade = 1 } = req.body;
    const usuarioId = req.user.id;
    
    try {
        if (quantidade <= 0) {
            return res.status(400).json({
                error: "Quantidade deve ser maior que zero"
            });
        }
        
        const produto = await prisma.product.findUnique({
            where: { id: produtoId },
            select: {
                id: true,
                nome: true,
                preco: true,
                estoque: true,
                status: true
            }
        });
        
        if (!produto) {
            return res.status(404).json({
                error: "Produto não encontrado"
            });
        }
        if (!produto.status) {
            return res.status(400).json({
                error: "Produto não disponível"
            });
        }
        if (produto.estoque < quantidade) {
            return res.status(400).json({
                error: `Estoque insuficiente. Disponível: ${produto.estoque}`
            });
        }
        
        const itemExiste = await prisma.cartItem.findUnique({
            where: {
                usuarioId_produtoId: {
                    usuarioId: usuarioId,
                    produtoId: produtoId
                }
            }
        });
        
        if (itemExiste) {
            const novaQuantidade = itemExiste.quantidade + quantidade;
            
            if (produto.estoque < novaQuantidade) {
                return res.status(400).json({
                    error: `Estoque insuficiente. Máximo: ${produto.estoque}. No carrinho: ${itemExiste.quantidade}`
                });
            }
            const itemAtualizado = await prisma.cartItem.update({
                where: { id: itemExiste.id },
                data: { quantidade: novaQuantidade },
                include: {
                    produto: {
                        select: {
                            id: true,
                            nome: true,
                            preco: true,
                            imagem: true
                    }
                }
                }
            });
            
            res.status(200).json({
                message: "Quantidade atualizada no carrinho",
                item: itemAtualizado
            });
            
        } else {
            const novoItem = await prisma.cartItem.create({
                data: {
                    usuarioId: usuarioId,
                    produtoId: produtoId,
                    quantidade: quantidade
                },
                include: {
                    produto: {
                        select: {
                            id: true,
                            nome: true,
                            preco: true,
                            imagem: true
                    }
                }
                }
        });
            
            res.status(201).json({
                message: "Item adicionado ao carrinho",
                item: novoItem
            });
        }
        
    } catch (error) {
        res.status(500).json({
            error: "Erro interno do servidor",
            message: error.message
        });
    }
};