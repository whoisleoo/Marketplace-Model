import { prisma } from "../database/db.js";

export async function verificarDataBase(){
    try{
        await prisma.$connect();
        console.log('🐘 PostgreSQL conectado!');
    }catch(error){
        console.error(`⚠️ Erro de conexão com postgreSQL. ${error.message}`);
        return { success: false, error: error.message};
    }

}

