const bodyParser = require('body-parser');
const authController = require('./controllers/authController.js')
const { connectDB } = require('./config/database');
const express = require('express');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.json({
        message: 'Funcionando',
        status: 'OK'
    })
})

app.post('/api/v1/auth/login', async (req, res) => {
    const { email, password } = req.body;

    const token = await authController.generateToken(email, password);

    if (token) {
        res.json({
            message: 'Login realizado com sucesso',
            status: 'OK',
            token: token
        })
    } else {
        res.status(401).json({
            message: 'Email ou senha inválidos',
            status: 'ERROR',
            token: null
        })
    }
    
});

app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
    await connectDB();
});