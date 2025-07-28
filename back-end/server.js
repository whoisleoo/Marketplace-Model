import express from 'express'
import userRoutes from './src/routes/userRoutes.js'
import authRoutes from './src/routes/authRoutes.js'
import { verificarDataBase } from './src/utils/healthCheck.js'
import cors from 'cors'
import dotenv from 'dotenv'
import { prisma } from './src/database/db.js'


const app = express();
const PORT = process.env.PORT || 9090; //Usa ou a porta do .env ou a porta 3000
const corsOptions = {
    origin: ["http://localhost:5173"]
}


app.use(express.json()); 
app.use(cors(corsOptions));



//========================== ROTAS DO SISTEMA ==========================

// Rota padrão
app.get('/', async function (req, res){
    res.json([{ title: "Modelo de Marketplace"}, { content: "Futura home page para um marketplace lol"}, {status: "ONLINE"}])
});

//Rota de checagem de vida util
app.get('/health', verificarDataBase);


// Rotas públicas de usuario
app.use('/', userRoutes);

// Rotas privadas de usuario
app.use('/auth', authRoutes);


// Inicialização do servidor.
app.listen(PORT, async () => {
    console.log(`|====== Back-End | Modelo Marketplace ======|


⚙️ Servidor rodando na porta ${PORT}
🔨 Feito por CODDUO.
💻 Acesse por: http://localhost:${PORT}
📅 Ativado em: ${new Date().toISOString()}
`)

})

