const { MongoClient }  = require('mongodb');

let db;

const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGODB_URI
        const client = new MongoClient(mongoURI);

        await client.connect();
        db = client.db('orion_financas_db');

        return db;
    } catch (error) {
        process.exit(1);
    }
};

const getDB = () => {
    if (!db) {
        throw new Error('Banco de dados não conectado')
    }

    return db;
}

module.exports = { connectDB, getDB };