const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();

const mongoURI = process.env.MONGODB_URI;
const client = new MongoClient(mongoURI);

async function seed() {
    try {
        await client.connect();
        const db = client.db('orion_financas_db');
        const missionsCollection = db.collection('missions');
        const userMissionsCollection = db.collection('user_missions');

        // Clear or update existing missions if needed, or just insert new ones
        const sampleMissions = [
            {
                title: "Mestre dos Quizzes",
                description: "Gabarite 3 quizzes perfeitos",
                frequency: "DAILY",
                targetCount: 3,
                reward: { xp: 100, coins: 50 },
                actionTrigger: "PERFECT_QUIZ",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                title: "Login Diário",
                description: "Abra o aplicativo hoje",
                frequency: "DAILY",
                targetCount: 1,
                reward: { xp: 20, coins: 10 },
                actionTrigger: "DAILY_LOGIN",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                title: "Criador de Metas",
                description: "Crie sua primeira meta financeira",
                frequency: "ONCE",
                targetCount: 1,
                reward: { xp: 50, coins: 25 },
                actionTrigger: "GOAL_CREATED",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                title: "Primeiros Passos",
                description: "Complete sua primeira aula",
                frequency: "ONCE",
                targetCount: 1,
                reward: { xp: 50, coins: 25 },
                actionTrigger: "COMPLETE_LESSON",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                title: "Estudante Aplicado",
                description: "Complete 5 aulas diferentes",
                frequency: "ONCE",
                targetCount: 5,
                reward: { xp: 200, coins: 100 },
                actionTrigger: "COMPLETE_LESSON",
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ];

        // Check if missions already exist to avoid duplicate sample data
        // Upsert missions by title to avoid duplicates and allow updates
        for (const mission of sampleMissions) {
            await missionsCollection.updateOne(
                { title: mission.title },
                { $set: mission },
                { upsert: true }
            );
        }
        console.log("Sample missions seeded/updated successfully.");

        // user_missions doesn't necessarily need a seed, but let's log the structure
        console.log("user_missions collection is ready for dynamic insertions by the service.");
        
    } catch (error) {
        console.error("Error seeding database:", error);
    } finally {
        await client.close();
    }
}

seed();
