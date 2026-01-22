const { default: rateLimit } = require('express-rate-limit');
const { connectDB } = require('./config/database.js');
const accountRoutes = require('./routes/account.js');
const { contentSecurityPolicy } = require('helmet');
const authRoutes = require('./routes/auth.js');
const bodyParser = require('body-parser');
const express = require('express');
const helmet = require('helmet');
const app = express();

app.use(helmet({
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"],
                styleSrc: ["'self'", "'unsafe-inline'"],
                scriptSrc: ["'self'"]
            }
        }
}));

const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Muitas requisições. Tente novamente mais tarde.',
    standardHeaders: true,
    legacyHeaders: false,
});

app.use(globalLimiter);
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

const PORT = process.env.PORT || 3000;

app.use('/api/auth', authRoutes);
app.use('/api/account', accountRoutes);

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