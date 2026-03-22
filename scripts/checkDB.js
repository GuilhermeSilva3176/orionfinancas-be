const { MongoClient } = require('mongodb');
require('dotenv').config();

async function check() {
    const client = new MongoClient(process.env.MONGODB_URI);
    try {
        await client.connect();
        const db = client.db('orion_financas_db');
        const trails = await db.collection('content_trails').countDocuments();
        const quizzes = await db.collection('quizzes').countDocuments();
        const missions = await db.collection('missions').countDocuments();
        console.log(`Trails: ${trails}, Quizzes: ${quizzes}, Missions: ${missions}`);
    } finally {
        await client.close();
    }
}
check();
