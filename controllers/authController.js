const jwt = require('jsonwebtoken');
const { getDB } = require('../config/database');
require('dotenv').config();

const SECRET_KEY = process.env.SECRET_KEY;

const authController = { 

    generateToken: async function(email, password) {
        try {
            const db = getDB();
            const usersCollection = db.collection('users');
            
            const user = await usersCollection.findOne({
                email: email.toLowerCase()
            });
    
            if (!user) {
                return null;
            }
    
            if (user.password !== password) {
                return null;
            }

            const payload = {
                userId: user._id.toString(),
                email: user.email
            }
    
            const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '12h' });

            return token;
        } catch (error) {
            return null;
        }
    },

    verifyToken: function(token) {
         try {
            const decoded = jwt.verify(token, SECRET_KEY);
            return decoded;
         } catch (error) {
            return null;
         }
    },

    authenticateToken: function(req, res, next) {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Token de acesso necessário', status: 'ERROR' });
        }

        const decoded = this.verifyToken(token);
        if (!decoded) {
            return res.status(401).json({ message: 'Token inválido ou expirado', status: 'ERROR' });
        }

        req.user = decoded;
        next();
    }
};

module.exports = authController;