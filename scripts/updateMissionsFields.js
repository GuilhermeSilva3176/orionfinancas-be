const { MongoClient } = require('mongodb');
require('dotenv').config();

const client = new MongoClient(process.env.MONGODB_URI);

async function updateExistingMissions() {
    try {
        await client.connect();
        const db = client.db('orion_financas_db');
        const missionsCollection = db.collection('missions');

        // Update all missions that are missing 'createdAt' and 'updatedAt'
        const result = await missionsCollection.updateMany(
            { $or: [ { createdAt: { $exists: false } }, { updatedAt: { $exists: false } } ] },
            { 
                $set: { 
                    createdAt: new Date(),
                    updatedAt: new Date()
                } 
            }
        );

        console.log(`Updated ${result.modifiedCount} missions with createdAt/updatedAt fields.`);
        
    } catch (error) {
        console.error("Error updating missions:", error);
    } finally {
        await client.close();
    }
}

updateExistingMissions();
