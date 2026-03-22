const { ObjectId } = require("mongodb");

async function runSeeder(db) {
    console.log("--- Initializing Database Seeding Check ---");
    try {
        // --- SEED TRAILS, MODULES, AND LESSONS ---
        // --- TRAIL 1: INICIANTE ---
        const trail1Id = new ObjectId("68e4532ae1124d17bafdd2cd");
        const lesson1Id = new ObjectId("68e44bc5e1124d17bafdd29e");
        const lesson2Id = new ObjectId("68e44bc5e1124d17bafdd29f");
        const lesson3Id = new ObjectId("68e44bc5e1124d17bafdd2a1"); // Ações
        const lesson4Id = new ObjectId("68e44bc5e1124d17bafdd2a2"); // 50/30/20
        const lesson5Id = new ObjectId("68e44bc5e1124d17bafdd2a4"); // Fundos
        const lesson6Id = new ObjectId("68e44bc5e1124d17bafdd2a5"); // Psicologia

        // --- TRAIL 2: AVANÇADO & CRIPTO ---
        const trail2Id = new ObjectId("68e4532ae1124d17bafdd2ce");
        const lesson7Id = new ObjectId("68e44bc5e1124d17bafdd2a6"); // Blockchain
        const lesson8Id = new ObjectId("68e44bc5e1124d17bafdd2a7"); // Bitcoin
        const lesson9Id = new ObjectId("68e44bc5e1124d17bafdd2a8"); // Marcação Mercado

        const allModules = [
            {
                _id: new ObjectId(),
                titulo: "Entendendo a Renda Fixa",
                licoes: [
                    {
                        _id: lesson1Id,
                        tituloLicao: "O que é o Tesouro Direto?",
                        conteudo: "O Tesouro Direto é um programa do Tesouro Nacional para venda de títulos públicos a pessoas físicas.",
                        bulletPoints: ["Segurança total", "Liquidez", "Baixo custo"],
                        imageUrl: "https://images.unsplash.com/photo-1580519542036-c47de6196ba5?auto=format&fit=crop&q=80&w=400"
                    },
                    {
                        _id: lesson2Id,
                        tituloLicao: "O que é o Tesouro Selic?",
                        conteudo: "É o título público mais conservador, indicado para reserva de emergência pois acompanha a taxa Selic.",
                        bulletPoints: ["Pós-fixado", "Reserva de emergência", "Rendimento diário"],
                        imageUrl: "https://images.unsplash.com/photo-1611974714158-f88c146d9a0d?auto=format&fit=crop&q=80&w=400"
                    }
                ]
            },
            {
                _id: new ObjectId(),
                titulo: "Fundamentos da Renda Variável",
                licoes: [
                    {
                        _id: lesson3Id,
                        tituloLicao: "O que são Ações?",
                        conteudo: "Ações representam a menor parte do capital social de uma empresa. Ao comprar uma ação, você se torna sócio.",
                        bulletPoints: ["Risco maior", "Potencial de retorno alto", "Dividendos"],
                        imageUrl: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80&w=400"
                    }
                ]
            },
            {
                _id: new ObjectId(),
                titulo: "Planejamento Financeiro",
                licoes: [
                    {
                        _id: lesson4Id,
                        tituloLicao: "A Regra 50/30/20",
                        conteudo: "Um método simples de organizar gastos: 50% necessidades, 30% desejos, 20% poupança/investimentos.",
                        bulletPoints: ["Organização", "Equilíbrio", "Simplicidade"],
                        imageUrl: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=400"
                    }
                ]
            },
            {
                _id: new ObjectId(),
                titulo: "Fundos de Investimento",
                licoes: [
                    {
                        _id: lesson5Id,
                        tituloLicao: "Como funcionam os Fundos?",
                        conteudo: "Fundos são como 'condomínios' de investidores que delegam a gestão a um profissional.",
                        bulletPoints: ["Diversificação", "Gestão profissional", "Taxa de administração"],
                        imageUrl: "https://images.unsplash.com/photo-1579532566591-953b1445b821?auto=format&fit=crop&q=80&w=400"
                    }
                ]
            },
            {
                _id: new ObjectId(),
                titulo: "Psicologia do Dinheiro",
                licoes: [
                    {
                        _id: lesson6Id,
                        tituloLicao: "Vieses Cognitivos",
                        conteudo: "Nosso cérebro prega peças na hora de investir, como o medo de perder que é maior que a alegria de ganhar.",
                        bulletPoints: ["Aversão à perda", "Excesso de confiança", "Efeito manada"],
                        imageUrl: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&q=80&w=400"
                    }
                ]
            }
        ];

        console.log("Seeding/Updating Trail 1...");
        await db.collection("content_trails").updateOne(
            { _id: trail1Id },
            { 
                $set: { 
                    title: "Guia do Investidor Iniciante",
                    description: "Aprenda os conceitos básicos para começar a investir com segurança.",
                    difficulty: "Iniciante",
                    modulos: allModules,
                    updatedAt: new Date()
                },
                $setOnInsert: { createdAt: new Date() }
            },
            { upsert: true }
        );

        const trail2Modules = [
            {
                _id: new ObjectId(),
                titulo: "Investimentos em Criptoativos",
                licoes: [
                    {
                        _id: lesson7Id,
                        tituloLicao: "O que é Blockchain?",
                        conteudo: "Blockchain é um livro-razão digital descentralizado e imutável que registra todas as transações.",
                        bulletPoints: ["Descentralização", "Segurança", "Transparência"],
                        imageUrl: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=400"
                    },
                    {
                        _id: lesson8Id,
                        tituloLicao: "Bitcoin: O Ouro Digital",
                        conteudo: "Bitcoin foi a primeira criptomoeda criada, servindo como reserva de valor e meio de troca global.",
                        bulletPoints: ["Oferta limitada", "Mineração", "Peer-to-peer"],
                        imageUrl: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?auto=format&fit=crop&q=80&w=400"
                    }
                ]
            },
            {
                _id: new ObjectId(),
                titulo: "Estratégias de Renda Fixa",
                licoes: [
                    {
                        _id: lesson9Id,
                        tituloLicao: "Marcação a Mercado",
                        conteudo: "Entenda como o preço dos títulos de renda fixa oscila conforme a taxa de juros da economia.",
                        bulletPoints: ["Preço x Juros", "Venda antecipada", "PU (Preço Unitário)"],
                        imageUrl: "https://images.unsplash.com/photo-1611974714158-f88c146d9a0d?auto=format&fit=crop&q=80&w=400"
                    }
                ]
            }
        ];

        console.log("Seeding/Updating Trail 2...");
        await db.collection("content_trails").updateOne(
            { _id: trail2Id },
            { 
                $set: { 
                    title: "Estratégias Avançadas",
                    description: "Aprofunde seus conhecimentos em criptoativos e técnicas de renda fixa.",
                    difficulty: "Avançado",
                    modulos: trail2Modules,
                    updatedAt: new Date()
                },
                $setOnInsert: { createdAt: new Date() }
            },
            { upsert: true }
        );

        // --- SEED QUIZZES ---
        console.log("Seeding/Updating quizzes...");
        const quizzes = [
            {
                title: "Teste seus conhecimentos sobre Tesouro Direto",
                lessonId: lesson1Id,
                questions: [
                    {
                        type: "multipleChoice",
                        question: "Quem emite os títulos do Tesouro Direto?",
                        options: ["Bancos Privados", "Governo Federal", "Empresas", "Corretoras"],
                        correctOptionIndex: 1
                    },
                    {
                        type: "multipleChoice",
                        question: "Qual o investimento mínimo aproximado no Tesouro Direto?",
                        options: ["R$ 1,00", "R$ 30,00", "R$ 1.000,00", "R$ 10.000,00"],
                        correctOptionIndex: 1
                    },
                    {
                        type: "multipleChoice",
                        question: "O Tesouro Direto é considerado um investimento de:",
                        options: ["Alto Risco", "Risco Moderado", "Baixíssimo Risco", "Risco Variável"],
                        correctOptionIndex: 2
                    }
                ]
            },
            {
                title: "Quiz: Renda Variável (Ações)",
                lessonId: lesson3Id,
                questions: [
                    {
                        type: "multipleChoice",
                        question: "O que você se torna ao comprar uma ação?",
                        options: ["Credor", "Sócio", "Cliente", "Funcionário"],
                        correctOptionIndex: 1
                    },
                    {
                        type: "multipleChoice",
                        question: "Como se chama a parcela do lucro distribuída aos acionistas?",
                        options: ["Juros", "Dividendos", "Comissão", "Taxa"],
                        correctOptionIndex: 1
                    },
                    {
                        type: "multipleChoice",
                        question: "A Bolsa de Valores brasileira é conhecida como:",
                        options: ["Nasdaq", "B3", "Dow Jones", "Nikkei"],
                        correctOptionIndex: 1
                    }
                ]
            },
            {
                title: "Quiz: Tesouro Selic",
                lessonId: lesson2Id,
                questions: [
                    {
                        type: "multipleChoice",
                        question: "Qual o principal objetivo de investir no Tesouro Selic?",
                        options: ["Ganhar muito dinheiro rápido", "Reserva de emergência", "Comprar uma casa hoje", "Apenas para aposentadoria daqui 30 anos"],
                        correctOptionIndex: 1
                    },
                    {
                        type: "multipleChoice",
                        question: "O rendimento do Tesouro Selic é:",
                        options: ["Fixo e imutável", "Acompanha a taxa básica de juros", "Depende do lucro das empresas", "É sempre negativo"],
                        correctOptionIndex: 1
                    }
                ]
            },
            {
                title: "Quiz: Planejamento 50/30/20",
                lessonId: lesson4Id,
                questions: [
                    {
                        type: "multipleChoice",
                        question: "Na regra 50/30/20, qual fatia vai para necessidades básicas?",
                        options: ["20%", "30%", "50%", "100%"],
                        correctOptionIndex: 2
                    },
                    {
                        type: "multipleChoice",
                        question: "Qual destino deve ter os 20% da regra?",
                        options: ["Desejos pessoais", "Aluguel", "Investimentos/Poupança", "Entretenimento"],
                        correctOptionIndex: 2
                    }
                ]
            },
            {
                title: "Quiz: Fundos de Investimento",
                lessonId: lesson5Id,
                questions: [
                    {
                        type: "multipleChoice",
                        question: "Quem é o responsável por escolher os ativos dentro de um fundo?",
                        options: ["O investidor", "O gestor profissional", "O governo", "Ninguém"],
                        correctOptionIndex: 1
                    },
                    {
                        type: "multipleChoice",
                        question: "A taxa paga para remunerar a gestão do fundo chama-se:",
                        options: ["Taxa de corretagem", "Taxa de administração", "Taxa de custódia", "Imposto de Renda"],
                        correctOptionIndex: 1
                    }
                ]
            },
            {
                title: "Quiz: Psicologia Financeira",
                lessonId: lesson6Id,
                questions: [
                    {
                        type: "multipleChoice",
                        question: "O que é o efeito manada?",
                        options: ["Seguir o que todos estão fazendo sem analisar", "Comprar ações de empresas de agropecuária", "Economizar dinheiro em grupo", "Investir apenas em cavalos"],
                        correctOptionIndex: 0
                    },
                    {
                        type: "multipleChoice",
                        question: "A aversão à perda nos faz:",
                        options: ["Vender rápido demais quando ganhamos e segurar demais quando perdemos", "Investir sempre em renda fixa", "Nunca investir", "Perder dinheiro propositalmente"],
                        correctOptionIndex: 0
                    }
                ]
            },
            {
                title: "Quiz: Blockchain",
                lessonId: lesson7Id,
                questions: [
                    {
                        type: "multipleChoice",
                        question: "O que melhor define a Blockchain?",
                        options: ["Um banco central digital", "Um livro-razão imutável e distribuído", "Um site de apostas", "Um tipo de vírus"],
                        correctOptionIndex: 1
                    },
                    {
                        type: "multipleChoice",
                        question: "Qual a principal característica da Blockchain?",
                        options: ["Centralização", "Descentralização", "Facilidade de deletar dados", "Dependência de bancos"],
                        correctOptionIndex: 1
                    }
                ]
            },
            {
                title: "Quiz: Bitcoin",
                lessonId: lesson8Id,
                questions: [
                    {
                        type: "multipleChoice",
                        question: "Qual o limite máximo de Bitcoins que existirão?",
                        options: ["Infinito", "21 Milhões", "100 Milhões", "1 Bilhão"],
                        correctOptionIndex: 1
                    },
                    {
                        type: "multipleChoice",
                        question: "Quem criou o Bitcoin em 2008?",
                        options: ["Satoshi Nakamoto", "Elon Musk", "Bill Gates", "Mark Zuckerberg"],
                        correctOptionIndex: 0
                    }
                ]
            },
            {
                title: "Quiz: Marcação a Mercado",
                lessonId: lesson9Id,
                questions: [
                    {
                        type: "multipleChoice",
                        question: "Se a taxa de juros sobe, o preço de um título pré-fixado tende a:",
                        options: ["Subir", "Cair", "Ficar igual", "Desaparecer"],
                        correctOptionIndex: 1
                    },
                    {
                        type: "multipleChoice",
                        question: "O investidor só perde dinheiro com a marcação a mercado se:",
                        options: ["Segurar até o vencimento", "Vender antecipadamente o título", "O governo quebrar", "O banco central baixar os juros"],
                        correctOptionIndex: 1
                    }
                ]
            }
        ];

        for (const quiz of quizzes) {
            await db.collection("quizzes").updateOne(
                { lessonId: quiz.lessonId },
                { 
                    $set: { 
                        title: quiz.title,
                        questions: quiz.questions,
                        updatedAt: new Date()
                    },
                    $setOnInsert: { createdAt: new Date() }
                },
                { upsert: true }
            );
        }

        // --- SEED MISSIONS ---
        const missionsCount = await db.collection("missions").countDocuments();
        if (missionsCount === 0) {
            console.log("Seeding missions...");
            const sampleMissions = [
                {
                    title: "Primeiros Passos",
                    description: "Complete sua primeira aula",
                    frequency: "ONCE",
                    targetCount: 1,
                    reward: { xp: 50, coins: 20 },
                    actionTrigger: "COMPLETE_LESSON",
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    title: "Mestre dos Quizzes",
                    description: "Gabarite 3 quizzes perfeitos",
                    frequency: "ONCE",
                    targetCount: 3,
                    reward: { xp: 150, coins: 100 },
                    actionTrigger: "PERFECT_QUIZ",
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
            ];
            await db.collection("missions").insertMany(sampleMissions);
            console.log("Missions seeded successfully.");
        }

    } catch (error) {
        console.error("Error during seeding:", error);
    }
}

module.exports = { runSeeder };
