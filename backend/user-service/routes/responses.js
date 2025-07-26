const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { z } = require('zod');

const router = express.Router();
const prisma = new PrismaClient();

const responseSchema = z.object({
  requestId: z.string(),
  agentId: z.string(),
  userId: z.string(),
  content: z.string().min(1),
  type: z.string().optional().default('text'),
  metadata: z.any().optional(),
});

router.post('/', async (req, res) => {
  try {
    const { requestId, agentId, userId, content, type, metadata } = responseSchema.parse(req.body);

    const request = await prisma.request.findUnique({
      where: { id: requestId }
    });

    if (!request) {
      return res.status(404).json({ error: 'Request not found' });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const response = await prisma.response.create({
      data: {
        requestId,
        agentId,
        userId,
        content,
        type,
        metadata: metadata || {},
      },
      include: {
        request: {
          include: {
            user: {
              select: {
                id: true,
                username: true,
                displayName: true,
              }
            }
          }
        },
        user: {
          select: {
            id: true,
            username: true,
            displayName: true,
          }
        }
      }
    });

    res.status(201).json(response);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/', async (req, res) => {
  try {
    const { userId, agentId, requestId } = req.query;
    
    const where = {};
    if (userId) where.userId = userId;
    if (agentId) where.agentId = agentId;
    if (requestId) where.requestId = requestId;

    const responses = await prisma.response.findMany({
      where,
      include: {
        request: {
          include: {
            user: {
              select: {
                id: true,
                username: true,
                displayName: true,
              }
            }
          }
        },
        user: {
          select: {
            id: true,
            username: true,
            displayName: true,
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json(responses);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const response = await prisma.response.findUnique({
      where: { id },
      include: {
        request: {
          include: {
            user: {
              select: {
                id: true,
                username: true,
                displayName: true,
              }
            }
          }
        },
        user: {
          select: {
            id: true,
            username: true,
            displayName: true,
          }
        }
      }
    });

    if (!response) {
      return res.status(404).json({ error: 'Response not found' });
    }

    res.json(response);
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

    const responses = await prisma.response.findMany({
      where: { userId },
      include: {
        request: {
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

    const total = await prisma.response.count({
      where: { userId }
    });

    res.json({
      responses,
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

router.get('/agent/:agentId', async (req, res) => {
  try {
    const { agentId } = req.params;
    const { limit = '10', offset = '0' } = req.query;

    const responses = await prisma.response.findMany({
      where: { agentId },
      include: {
        request: {
          include: {
            user: {
              select: {
                id: true,
                username: true,
                displayName: true,
              }
            }
          }
        },
        user: {
          select: {
            id: true,
            username: true,
            displayName: true,
          }
        }
      },
      orderBy: { createdAt: 'desc' },
      take: parseInt(limit),
      skip: parseInt(offset)
    });

    const total = await prisma.response.count({
      where: { agentId }
    });

    res.json({
      responses,
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

router.get('/stats/:agentId', async (req, res) => {
  try {
    const { agentId } = req.params;

    const totalResponses = await prisma.response.count({
      where: { agentId }
    });

    const recentResponses = await prisma.response.findMany({
      where: { agentId },
      orderBy: { createdAt: 'desc' },
      take: 7,
      select: {
        createdAt: true,
      }
    });

    const dailyCount = {};
    recentResponses.forEach(response => {
      const date = response.createdAt.toISOString().split('T')[0];
      dailyCount[date] = (dailyCount[date] || 0) + 1;
    });

    res.json({
      totalResponses,
      dailyCount,
      recentResponses: recentResponses.length
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;