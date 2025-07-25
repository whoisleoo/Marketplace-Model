import { prisma } from "../database/db.js";

export async function verificarDataBase(req, res){
    try{
        await prisma.$connect();
        await prisma.$queryRaw`SELECT 1`;
        console.log('🐘 PostgreSQL conectado!');

        return res.status(200).json({
            success: true,
            message: "Servidor está funcionando.",
            timestamp: new Date().toISOString(),
            uptime: process.uptime()
        })
    }catch(error){
        console.error(`⚠️ Erro de conexão com postgreSQL. ${error.message}`);
        return res.status(500).json({
            success: false,
            message: "Erro interno no servidor",
            Erro: error.message,
            timestamp: new Date().toISOString()
        }
        )
    }

}

