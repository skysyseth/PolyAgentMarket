const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

const agentsRouter = require('./routes/agents');
app.use('/api/agents', agentsRouter);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Agent Registry Service running on port ${PORT}`);
});