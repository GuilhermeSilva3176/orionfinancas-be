const { getDB } = require("../config/database.js");
const { ObjectId } = require("mongodb");
const missionService = require("../services/missionService.js");
const rewardService = require("../services/rewardService.js");

const lessonsController = {
    // User: Mark lesson as complete
    completeLesson: async (req, res) => {
        try {
            const db = getDB();
            const userId = req.user.id;
            const { lessonId, moduleId, trailId } = req.body;

            if (!lessonId) {
                return res.status(400).json({
                    message: "ID da aula é obrigatório",
                    status: "ERROR"
                });
            }

            // Save progress
            const progressCollection = db.collection("user_lesson_progress");
            
            await progressCollection.updateOne(
                { 
                    userId: new ObjectId(userId), 
                    lessonId: new ObjectId(lessonId) 
                },
                { 
                    $set: { 
                        moduleId: moduleId ? new ObjectId(moduleId) : null,
                        trailId: trailId ? new ObjectId(trailId) : null,
                        completedAt: new Date(),
                        status: "COMPLETED"
                    } 
                },
                { upsert: true }
            );

            // Trigger mission progress
            await missionService.updateProgress(userId, "COMPLETE_LESSON");

            // Award base rewards (+50 XP, +15 Coins)
            const rewards = await rewardService.grantRewards(userId, { xp: 50, coins: 15 });

            return res.json({
                message: "Aula marcada como concluída",
                status: "OK",
                rewards
            });
        } catch (error) {
            console.error("Erro ao completar aula:", error);
            return res.status(500).json({ message: "Erro interno do servidor", status: "ERROR" });
        }
    },

    // User: Get lesson progress
    getLessonProgress: async (req, res) => {
        try {
            const db = getDB();
            const userId = req.user.id;
            
            const progress = await db.collection("user_lesson_progress")
                .find({ userId: new ObjectId(userId) })
                .toArray();

            return res.json({
                message: "Progresso obtido com sucesso",
                status: "OK",
                data: progress
            });
        } catch (error) {
            console.error("Erro ao obter progresso:", error);
            return res.status(500).json({ message: "Erro interno do servidor", status: "ERROR" });
        }
    }
};

module.exports = lessonsController;
