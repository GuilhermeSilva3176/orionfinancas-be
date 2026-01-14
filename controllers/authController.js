const jwt = require('jsonwebtoken');
const { getDB } = require('../config/database');
const bcrypt = require('bcrypt');
require('dotenv').config();

const SECRET_KEY = process.env.SECRET_KEY;

const authController = { 

    hashPassword: async function(password) {
        const saltRounds = 10;
        return await bcrypt.hash(password, saltRounds);
    },

    comparePasswords: async function(password, hashedPassword) {
        return await bcrypt.compare(password, hashedPassword);
    },

    validateEmail: function(email) { 
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },

    validateDate: function(dateString) {
        const date = new Date(dateString);
        return date instanceof Date && !isNaN(date);
    },

    login: async function(req, res) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({
                    message: 'Email e senha são obrigatórios',
                    status: 'ERROR'
                });
            }

            const token = await authController.generateToken(email, password);

            if (token) {
                res.json({
                    message: 'Login realizado com sucesso',
                    status: "OK",
                    token: token
                })
            } else {
                res.status(401).json({
                    message: 'Email ou senha inválidos',
                    status: "ERROR",
                    token: null
                });
            }
        } catch (error) {
            console.error('Erro no login:', error);
            res.status(500).json({ error: 'Erro interno do servidor' });
        }
    },

    register: async function(req, res) {
        try {
            const { name, email, password, birthdate } = req.body;
            const db = getDB();
            const usersCollection = db.collection('users');

            if (!name || !email || !password) {
                return res.status(400).json({ 
                    message: 'Campos não foram preenchidos', 
                    status: 'ERROR'
                });
            }

            if (!authController.validateEmail(email)) {
                return res.status(400).json({
                    message: 'Email inválido',
                    status: 'ERROR'
                })
            }

            const existingUser = await usersCollection.findOne({
                email: email.toLowerCase()
            });

            if (existingUser) {
                return res.status(400).json({
                    message: 'Email já cadastrado',
                    status: 'ERROR'
                });
            }

            let birthdateDate = null

            if (birthdate) {
                if (!authController.validateDate(birthdate)) {
                    return res.status(400).json({
                        message: 'Data de nascimento inválida',
                        status: 'ERROR'
                    });
                }
                birthdateDate = new Date(birthdate);
            }

            const payload = { 
                name: name,
                email: email.toLowerCase(),
                password: await authController.hashPassword(password),
                birthdate: birthdateDate,
                profile: { level: 1, points: 0, avatarUrl: ""},
                wallet: { coins: 0, xp: 0},
                inventory: [],
                equippedAvatar: "",
                createdAt: new Date(),
                updatedAt: new Date()
            }

            const registerUser = await usersCollection.insertOne(payload)

            res.status(201).json({
                message: 'Usuário registrado com sucesso',
                status: 'OK',
                userId: registerUser.insertedId
            })

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro interno do servidor' });
        }
    },

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
    
            const isValidPassword = await authController.comparePasswords(password, user.password);

            if (!isValidPassword) {
                return null;
            }

            const payload = {
                userId: user._id.toString(),
                email: user.email,
                name: user.name
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
    }
};

module.exports = authController;