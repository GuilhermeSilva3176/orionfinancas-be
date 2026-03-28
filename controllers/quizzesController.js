const { getDB } = require("../config/database.js");
const { ObjectId } = require("mongodb");
const missionService = require("../services/missionService.js");
const rewardService = require("../services/rewardService.js");
const streakService = require("../services/streakService.js");

const quizzesController = {
    // Admin/User: List all quizzes
    getAllQuizzes: async (req, res) => {
        try {
            const db = getDB();
            const quizzes = await db.collection("quizzes").find().toArray();
            return res.json({
                message: "Quizzes obtidos com sucesso",
                status: "OK",
                data: quizzes
            });
        } catch (error) {
            console.error("Erro ao obter quizzes:", error);
            return res.status(500).json({ message: "Erro interno do servidor", status: "ERROR" });
        }
    },

    // User: Get single quiz
    getQuizById: async (req, res) => {
        try {
            const db = getDB();
            const { id } = req.params;
            const quiz = await db.collection("quizzes").findOne({ _id: new ObjectId(id) });
            
            if (!quiz) {
                return res.status(404).json({ message: "Quiz não encontrado", status: "ERROR" });
            }

            return res.json({
                message: "Quiz obtido com sucesso",
                status: "OK",
                data: quiz
            });
        } catch (error) {
            console.error("Erro ao obter quiz:", error);
            return res.status(500).json({ message: "Erro interno do servidor", status: "ERROR" });
        }
    },

    // User: Complete a quiz
    completeQuiz: async (req, res) => {
        try {
            const db = getDB();
            const userId = req.user.id;
            const { quizId, score, answers, lessonId, moduleId, trailId } = req.body;

            if (!quizId || score === undefined) {
                return res.status(400).json({
                    message: "Dados incompletos",
                    status: "ERROR"
                });
            }

            // Fetch quiz to check total questions
            const quiz = await db.collection("quizzes").findOne({ _id: new ObjectId(quizId) });
            if (!quiz) {
                return res.status(404).json({ message: "Quiz não encontrado", status: "ERROR" });
            }

            const totalQuestions = quiz.questions.length;
            const passed = score >= (totalQuestions * 0.7); // 70% to pass

            // Check if already passed in the past
            const previousPass = await db.collection("user_quiz_attempts").findOne({
                 userId: new ObjectId(userId),
                 quizId: new ObjectId(quizId),
                 passed: true
            });
            const isAlreadyPassed = !!previousPass;

            await db.collection("user_quiz_attempts").insertOne({
                userId: new ObjectId(userId),
                quizId: new ObjectId(quizId),
                lessonId: lessonId ? new ObjectId(lessonId) : null,
                moduleId: moduleId ? new ObjectId(moduleId) : null,
                trailId: trailId ? new ObjectId(trailId) : null,
                score,
                answers: answers || [],
                passed,
                attemptedAt: new Date()
            });

            // Trigger mission progress if it's a perfect quiz (100%)
            if (score === totalQuestions || score === 100) {
                await missionService.updateProgress(userId, "PERFECT_QUIZ");
            }

            // Trigger generic quiz completion
            await missionService.updateProgress(userId, "COMPLETE_QUIZ");

            // Award base rewards (+30 XP, +10 Coins) or reduced if already passed (+5 XP, +5 Coins)
            let rewards = null;
            let streakUpdated = false;
            if (passed) {
                let rewardAmount = isAlreadyPassed ? { xp: 5, coins: 5 } : { xp: 30, coins: 10 };
                
                // Double rewards for PRO users
                const subscription = await db.collection('subscriptions').findOne({ userId: new ObjectId(userId), status: 'ACTIVE' });
                if (subscription) {
                    rewardAmount = { xp: rewardAmount.xp * 2, coins: rewardAmount.coins * 2 };
                }

                rewards = await rewardService.grantRewards(userId, rewardAmount);
                // Update streak
                const streakData = await streakService.updateStreak(userId);
                streakUpdated = streakData?.updated || false;
            }

            return res.json({
                message: "Quiz completado com sucesso",
                status: "OK",
                passed,
                rewards,
                streakUpdated
            });
        } catch (error) {
            console.error("Erro ao completar quiz:", error);
            return res.status(500).json({ message: "Erro interno do servidor", status: "ERROR" });
        }
    }
};

module.exports = quizzesController;
