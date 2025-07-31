import { prisma } from '../database/db.js';

//=================================================================
//                     CRIAÇÃO DE PRODUTO
//=================================================================


export const criarProduto = async function(req, res) {
    const { nome, descricao, preco, categoria, estoque, imagem, peso } = req.body

    try{
        if(preco <= 0){ //Verifica se o preço não é 0 
            return res.status(400).json({
                error: "O preço especificado precisa ser maior que zero."
            });
        }

        if(estoque < 0 ){ // Verifica se o estoque não tá negativo
            return res.status(400).json({
                error: "O estoque não pode ser definido como negativo."
            })
        }

        const newProduto = await prisma.product.create({ //Função que cria o produto e formata a data
            data: {
                nome: nome.trim(),
                descricao: descricao?.trim(),
                preco: parseFloat(preco),
                categoria: categoria,
                estoque: parseInt(estoque) || 0,
                imagem: imagem?.trim(),
                peso: peso ? parseFloat(peso) : null
            }
        });

        res.status(201).json({
            message: "Produto criado com sucesso!",
            produto: newProduto,
            data: new Date()
        })

    }catch(error){
        res.status(500).json({
            error: "Erro interno no servidor.",
            message: error.message
        })
    };
    
}


//=================================================================
//                     LISTAGEM DE PRODUTO
//=================================================================


export const listarProdutos = async function (req, res){
    try{
        const {
            categoria,
            search,
            minPreco,
            maxPreco,
            page = 1,
            limit = 12,
            orderBy = 'criado',
            order = 'desc'
        } = req.query;

        const pageNum = parseInt(page);
        const limitNum = parseInt(limit);
        const skip = (pageNum - 1) * limitNum; // faz a páginação de 12 em 12 de acordo com esse calculo

        const where = {
            status: true // Procura só pelos produto que tão ativado
        };

        if(categoria){
            where.categoria = categoria // Procura pela categoria
        }

        if(search){
            where.OR = [
                { nome: { contains: search, mode: 'insensitive'} }, // Procura ou pelo nome ou pela descrição e é case sensitive
                { descricao: { contains: search, mode: 'insensitive'} }
            ]
        }

        if (minPreco || maxPreco){
            where.preco = {};
            if(minPreco) where.preco.gte = parseFloat(minPreco); //Procura pelo preço minimo
            if(maxPreco) where.preco.lte = parseFloat(maxPreco); //Procura pelo preço maximo
        }

        const [produtos, total] = await Promise.all([ // Faz a requisição de tudo de uma vez
            prisma.product.findMany({
                where,
                select: {
                    id: true,
                    nome: true,
                    descricao: true,
                    preco: true,
                    categoria: true,
                    estoque: true,
                    imagem: true,
                    criado: true
                },
                orderBy: { [orderBy]: order },
                skip,
                take: limitNum
            }),
            prisma.product.count({ where })
        ])

        res.status(200).json({ //retorna os produto
            produtos,
            pagina: {
                pagina: pageNum,
                totalPaginas: Math.ceil(total / limitNum),
                totalItens: total,
                itensPorPagina: limitNum
            }
        })

    }catch(error){
        res.status(500).json({
            error: "Erro interno do servidor.",
            message: error.message
        })
    }
}


//=================================================================
//                     BUSCAR PRODUTO
//=================================================================

export const buscarProduto = async function (req, res){
    const { id } = req.params
    

    try{
        const produto = await prisma.product.findUnique({ 
            where: { id },
            select: {
              id: true,
              nome: true,
              descricao: true,
              preco: true,
              categoria: true,
              estoque: true,
              imagem: true,
              peso: true,
              criado: true,
              status: true

            }
        });

        if(!produto){
          return res.status(404).json({error: "Produto não encontrado."})
        }

        if(!produto.status){
            return res.status(404).json({
                error: "Produto não disponivel."
            })
        }
        res.status(200).json({message: "Produto encontrado com sucesso", produto: produto});
      }catch(error){
        res.status(500).json({error: "Erro interno doservidor", erro_encontrado: error.message});
      }
}

//=================================================================
//                     ATUALIZAR PRODUTO
//=================================================================


export const updateProduto = async function (req, res){
     const { id } = req.params;
        const { nome, descricao, preco, categoria, estoque, imagem, peso } = req.body
    try{
      const produto = await prisma.product.findUnique({
        where: { id }
      })

      if(!produto){
        return res.status(404).json({
            error: "Esse produto não existe."
        })
      }

      if(preco <= 0){
        return res.status(404).json({
            error: "O preço do produto deve ser maior que zero."
        })
      }

      if(estoque < 0){
        return res.status(404).json({
            error: "O estoque não pode ter um número negativo."
        })
      }

      const dadoAtualizado = {};
      if(nome) dadoAtualizado.nome = nome.trim();
      if(descricao !== undefined) dadoAtualizado.descricao = descricao.trim(); 
      if(preco) dadoAtualizado.preco = parseFloat(preco);
      if(categoria) dadoAtualizado.categoria = categoria;
      if(estoque !== undefined) dadoAtualizado.estoque = parseInt(estoque) || 0;
      if(imagem !== undefined) dadoAtualizado.imagem = imagem?.trim();
      if(peso !== undefined) dadoAtualizado.peso = peso ? parseFloat(peso) : null;


      const produtoAtualizado = await prisma.product.update({
        where: { id },
        data: dadoAtualizado
      })


      res.status(200).json({
        message: "Produto atualizado com sucesso!",
        produto: produtoAtualizado
      })
      

    }catch(error){

        res.status(500).json({
            error: "Erro interno do servidor.",
            message: error.message
        })
    }
}


//=================================================================
//                     DELETAR UM PRODUTO
//=================================================================

export const deleteProduto = async function (req, res){
    const { id } = req.params;
    try{
        const produto = await prisma.product.findUnique({
            where: { id }
        })

        if(!produto){
            return res.status(404).json({
                error: "Esse produto não existe."
            })
        }

        await prisma.product.update({
            where: { id },
            data: { status: false} 
        });

        res.status(200).json({
            message: "Produto removido com sucesso."
        })


    }catch(error){
        res.status(500).json({
            error: "Erro interno do servidor.",
            message: error.message
        });
    }

}