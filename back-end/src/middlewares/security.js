import helmet from "helmet";

// EXPLORAR MAIS FUNÇÕES DA BIBLIOTECA HELMET QUANDO POSSIVEL!!!

export const security = helmet({

    contentSecurityPolicy: { // algumas politicas de segurança a serem executadas via helmet
        directives: {
            defaultSrc: ["'self'"], // Apenas o dominio
            styleSrc: ["'self'", "'unsafe-inline'"], // Carrega o style.css e o style inline
            scriptSrc: ["'self'", "trusted-cdn.com"], // Apenas o dominio e bloqueia script externo
            imgSrc: ["'self'", "data", "https:"], // Apenas dominio e imagens externas em https
            objectSrc: ["'none'"],
            frameSrc: ["'none'"] 
        }
    },


    frameguard:{  // Bloqueia possivel ataque de click jacking
        action: 'deny'
    },
    hsts: { // força https
        includeSubDomains: true,
        preload: true
    },
    noSniff: true, // permite que o browser identifique possiveis ataques de sniffing
    xssFilter: true, // bloqueia ataque de cross site scripting
    hidePoweredBy: true
})