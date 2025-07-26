const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { z } = require('zod');

const router = express.Router();
const prisma = new PrismaClient();

const requestSchema = z.object({
  userId: z.string(),
  agentId: z.string(),
  content: z.string().min(1),
  type: z.string().optional().default('text'),
});

router.post('/', async (req, res) => {
  try {
    const { userId, agentId, content, type } = requestSchema.parse(req.body);

    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const request = await prisma.request.create({
      data: {
        userId,
        agentId,
        content,
        type,
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            displayName: true,
          }
        },
        responses: {
          include: {
            user: {
              select: {
                id: true,
                username: true,
                displayName: true,
              }
            }
          }
        }
      }
    });

    res.status(201).json(request);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/', async (req, res) => {
  try {
    const { userId, agentId } = req.query;
    
    const where = {};
    if (userId) where.userId = userId;
    if (agentId) where.agentId = agentId;

    const requests = await prisma.request.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            username: true,
            displayName: true,
          }
        },
        responses: {
          include: {
            user: {
              select: {
                id: true,
                username: true,
                displayName: true,
              }
            }
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const request = await prisma.request.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            displayName: true,
          }
        },
        responses: {
          include: {
            user: {
              select: {
                id: true,
                username: true,
                displayName: true,
              }
            }
          }
        }
      }
    });

    if (!request) {
      return res.status(404).json({ error: 'Request not found' });
    }

    res.json(request);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { limit = '10', offset = '0' } = req.query;

    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const requests = await prisma.request.findMany({
      where: { userId },
      include: {
        responses: {
          include: {
            user: {
              select: {
                id: true,
                username: true,
                displayName: true,
              }
            }
          }
        }
      },
      orderBy: { createdAt: 'desc' },
      take: parseInt(limit),
      skip: parseInt(offset)
    });

    const total = await prisma.request.count({
      where: { userId }
    });

    res.json({
      requests,
      pagination: {
        total,
        limit: parseInt(limit),
        offset: parseInt(offset)
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;