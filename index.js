const { default: rateLimit } = require('express-rate-limit');
const { connectDB, getDB } = require('./config/database.js');
const { runSeeder } = require('./scripts/seedLearning.js');
const goalsRoutes = require('./routes/goals.js');
const accountRoutes = require('./routes/account.js');
const missionsRoutes = require('./routes/missions.js');
const quizzesRoutes = require('./routes/quizzes.js');
const lessonsRoutes = require('./routes/lessons.js');
const trailsRoutes = require('./routes/trails.js');
const { contentSecurityPolicy } = require('helmet');
const authRoutes = require('./routes/auth.js');
const bodyParser = require('body-parser');
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const app = express();

app.use(cors({
    origin: ['http://localhost:3000'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

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
app.use('/api/goals', goalsRoutes);
app.use('/api/missions', missionsRoutes);
app.use('/api/quizzes', quizzesRoutes);
app.use('/api/lessons', lessonsRoutes);
app.use('/api/trails', trailsRoutes);

app.get('/', (req, res) => {
    res.json({
        message: 'Funcionando',
        status: 'OK'
    })
})

app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
    await connectDB();
    const db = getDB();
    await runSeeder(db);
});