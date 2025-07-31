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


//===========================================================================================
//                              REMOVER PRODUTO AO CARRINHO
//===========================================================================================

export const removerProduto = async function (req, res){
    const { id } = req.params;
    const usuarioId = req.user.id;

    try{
        const item = await prisma.cartItem.findFirst({
            where: { id, usuarioId: usuarioId}
        })


        if(!item){
          return  res.status(400).json({
                error: "Esse item não está no seu carrinho."
            })
        }

        await prisma.cartItem.delete({
            where: { id: id}
        })

        res.status(200).json({
            message: "Produto removido com sucesso."
        })

}catch(error){
    res.status(500).json({
        error: "Erro interno do servidor.",
        message: error.message
    })
}
}

//===========================================================================================
//                              LIMPAR O CARRINHO
//===========================================================================================

export const limparCarrinho = async function (req, res){
    const usuarioId = req.user.id;

    try{
        const cart = await prisma.cartItem.deleteMany({ // DELETA TUDO que tá relcionado ao id do usuario
            where: { usuarioId }
        });

        res.status(200).json({
            message: "Carrinho limpo com sucesso",
            itens: cart.count
        })

}catch(error){
    res.status(500).json({
        error: "Erro interno do servidor.",
        message: error.message
    })
}
}

//===========================================================================================
//                              ATUALIZAR O CARRINHO
//===========================================================================================

export const updateCarrinho = async function (req, res){
    const { id } = req.params;
    const { quantidade } = req.body;
    const { usuarioId } = req.user.id;


    try{
        if(quantidade <= 0){
           return res.status(400).json({
                error: "Quantidade informada é inválida."
            })
        }

        const cart = await prisma.cartItem.findFirst({
            where: { id, usuarioId: usuarioId },
                include: {
                    product: {
                        select: {
                            nome: true,
                            quantidade: true,
                            estoque: true
                        }
                    }
                }
        });


        if(!cart){
           return res.status(400).json({
                error: "Esse produto não existe."
            })
        }

        if(cart.product.status == false){
            return res.status(400).json({
                error: "Esse produto está desativado."
            })
        }

        if(cart.product.estoque < quantidade){ 
            return res.status(400).json({
                error: "O estoque não pode ser um número negativo."
            })
        }

        const atualizado = await prisma.product.update({
            where: { id: id },
            data: {quantidade: quantidade},
            include: {
                product: {
                    select: {
                        nome: true,
                        quantidade: true,
                        estoque: true,
                        imagem: true
                    }
                }
            }
        })


        res.status(200).json({
            message: "Carrinho atualizado com sucesso.",
            item: atualizado
        })


    }catch(error){
        res.status(500).json({
            error: "Erro interno do servidor.",
            message: error.message
        })

    }
}