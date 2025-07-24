import express from 'express'
import publicRoutes from './src/routes/userRoutes.js'
import cors from 'cors'
import dotenv from 'dotenv'
import { prisma } from './src/database/db.js'


const app = express();
const PORT = process.env.PORT || 9090; //Usa ou a porta do .env ou a porta 3000
const corsOptions = {
    origin: ["http://localhost:5173"]
}


app.use(express.json()); 
app.use(cors(corsOptions)); // Configuração do CORS



// 🔨 ========================== ROTAS DO SISTEMA ==========================


// Rota padrão
app.get('/', async function (req, res){
    res.json([{ title: "Modelo de Marketplace"}, { content: "Futura home page para um marketplace"}, {status: "🟢 Funcionando"}])
});


// Rotas públicas
app.use('/', publicRoutes);



// Inicialização do servidor.
app.listen(PORT, () => {
    console.log(`====== Back-End | Modelo Marketplace ======
    ⚙️ Servidor rodando na porta ${PORT}
    🔨 Feito por CODDUO.`)
})

