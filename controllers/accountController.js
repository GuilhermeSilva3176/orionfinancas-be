const { getDB } = require("../config/database.js");
const { ObjectId } = require("mongodb");

const accountController = { 
    getProfile: async (req, res) => {
        try {
            const db = getDB();
            const userId = req.user.id;

            const user = await db.collection('users').findOne(
                { _id: new ObjectId(userId) },
                { projection: { password: 0, _id: 0} }
            );

            if (!user) {
                return res.status(404).json({
                    message: 'Usuário não encontrado',
                    status: 'ERROR'
                });
            }

            res.json({
                message: 'Perfil obtido com sucesso',
                status: 'OK',
                data: user
            });

        } catch (error) {
            console.error('Erro ao obter perfil:', error);
            res.status(500).json({
                message: 'Erro interno do servidor',
                status: 'ERROR'
            });
        }
    },

    deactivateAccount: async (req, res) => {
        try {
            const db = getDB();
            const userId = req.user.id;

            const user = await db.collection('users').findOne(
                { _id: new ObjectId(userId) } 
            )

            if (!user) {
                return res.status(404).json({
                    message: 'Usuário não encontrado',
                    status: 'ERROR'
                });
            }

            userDeactivated = await db.collection('users').updateOne(
                { _id: new ObjectId(userId) },
                { $set: { isActive: false, deactivatedAt: new Date() } }
            );

            res.json({
                message: "Conta deletada com sucesso",
                status: 'OK'
            });

        } catch (error) {
            console.error(error)
            res.status(500).json({
                message: 'Erro interno do servidor',
                status: 'ERROR'
            });
        }
    },

    updateAccount: async (req, res) => {
        try {
            const db = getDB();
            const userId = req.user.id;

            const updates = req.body;

            if (!updates || Object.keys(updates).length === 0) {
                return res.status(400).json({
                    message: 'Nenhum dado fornecido para atualização',
                    status: 'ERROR'
                });
            }

            const forbiddenFields = ['_id', 'password', 'email', 'createdAt'];

            const allowedUpdates = {};
            Object.keys(updates).forEach(field => {
                if (!forbiddenFields.includes(field)) {
                    allowedUpdates[field] = updates[field];
                }
            });

            if (Object.keys(allowedUpdates).legth === 0) {
                return res.status(400).json({
                    message: 'Nenhum campo válido para atualização',
                    status: 'ERROR'
                });
            }

            const user = await db.collection('users').findOne(
                { _id: new ObjectId(userId) } 
            )

            if (!user) {
                return res.status(404).json({
                    message: 'Usuário não encontrado',
                    status: 'ERROR'
                });
            }

            const result = await db.collection('users').updateOne(
                { _id: new ObjectId(userId)},
                { $set: allowedUpdates }
            );

            if (result.modifiedcount === 0) {
                return res.status(400).json({
                    message: 'Nenhuma alteração realizada',
                    status: 'ERROR'
                })
            }

            const updatedUser = await db.collection('users').findOne(
                { _id: new ObjectId(userId) },
                { projection: { password: 0 } }
            );

            res.json({
                message: 'Conta atualizada com sucesso',
                status: 'OK',
                data: updatedUser
            });
            
        } catch (error) {
            console.error(error)
            res.status(500).json({
                message: 'Erro interno do servidor',
                status: 'ERROR'
            });
        }
    }
};

module.exports = accountController;