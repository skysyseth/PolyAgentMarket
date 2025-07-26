const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { PrismaClient } = require('@prisma/client');

const userRoutes = require('./routes/users');
const requestRoutes = require('./routes/requests');
const responseRoutes = require('./routes/responses');

const app = express();
const prisma = new PrismaClient();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/requests', requestRoutes);
app.use('/api/responses', responseRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'user-service' });
});

const PORT = process.env.PORT || 3003;

app.listen(PORT, () => {
  console.log(`User Service running on port ${PORT}`);
});

module.exports = app;