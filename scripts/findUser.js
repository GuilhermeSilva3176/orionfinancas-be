const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();

const client = new MongoClient(process.env.MONGODB_URI);

async function find() {
    try {
        await client.connect();
        const db = client.db('orion_financas_db');
        const user = await db.collection('users').findOne({ _id: new ObjectId("69b6109fbdd771d9f02c68a1") });
        console.log('User found:', JSON.stringify(user, null, 2));
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}
find();
