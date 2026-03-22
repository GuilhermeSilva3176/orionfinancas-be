const { getDB } = require("../config/database.js");
const { ObjectId } = require("mongodb");

const trailsController = {
    // User: Get all learning trails/modules
    getAllTrails: async (req, res) => {
        try {
            const db = getDB();
            const trails = await db.collection("content_trails").find().toArray();
            return res.json({
                message: "Trilhas obtidas com sucesso",
                status: "OK",
                data: trails
            });
        } catch (error) {
            console.error("Erro ao obter trilhas:", error);
            return res.status(500).json({ message: "Erro interno do servidor", status: "ERROR" });
        }
    },

    // User: Get single trail with modules and lessons
    getTrailById: async (req, res) => {
        try {
            const db = getDB();
            const { id } = req.params;
            const trail = await db.collection("content_trails").findOne({ _id: new ObjectId(id) });
            
            if (!trail) {
                return res.status(404).json({ message: "Trilha não encontrada", status: "ERROR" });
            }

            return res.json({
                message: "Trilha obtida com sucesso",
                status: "OK",
                data: trail
            });
        } catch (error) {
            console.error("Erro ao obter trilha:", error);
            return res.status(500).json({ message: "Erro interno do servidor", status: "ERROR" });
        }
    }
};

module.exports = trailsController;
