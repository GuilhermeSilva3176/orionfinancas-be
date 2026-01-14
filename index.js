const bodyParser = require('body-parser');
const authController = require('./controllers/authController.js')
const { connectDB } = require('./config/database');
const authRoutes = require('./routes/auth.js');
const express = require('express');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;

app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
    res.json({
        message: 'Funcionando',
        status: 'OK'
    })
})

app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
    await connectDB();
});