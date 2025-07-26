const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 3002;

app.use(cors());
app.use(express.json());

// Listings routes
app.get('/listings', async (req, res) => {
  try {
    const { q, category, min, max } = req.query;
    const where = {
      ...(q && {
        OR: [
          { title: { contains: q } },
          { description: { contains: q } }
        ]
      }),
      ...(category && { category }),
      ...(min && { price: { gte: parseFloat(min) } }),
      ...(max && { price: { lte: parseFloat(max) } })
    };

    const listings = await prisma.listing.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    });
    res.json(listings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/listings/:id', async (req, res) => {
  try {
    const listing = await prisma.listing.findUnique({
      where: { id: req.params.id }
    });
    if (!listing) {
      return res.status(404).json({ error: 'Listing not found' });
    }
    res.json(listing);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/listings', async (req, res) => {
  try {
    const { agentId, sellerId, title, price, description, category } = req.body;
    const listing = await prisma.listing.create({
      data: {
        agentId,
        sellerId,
        title,
        price,
        description,
        category
      }
    });
    res.status(201).json(listing);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Purchases routes
app.get('/purchases', async (req, res) => {
  try {
    const { buyerId } = req.query;
    const purchases = await prisma.purchase.findMany({
      where: buyerId ? { buyerId } : {},
      include: { listing: true },
      orderBy: { createdAt: 'desc' }
    });
    res.json(purchases);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/purchases', async (req, res) => {
  try {
    const { listingId, buyerId } = req.body;
    
    const listing = await prisma.listing.findUnique({
      where: { id: listingId }
    });
    
    if (!listing) {
      return res.status(404).json({ error: 'Listing not found' });
    }

    if (listing.status !== 'active') {
      return res.status(400).json({ error: 'Listing not available' });
    }

    const purchase = await prisma.purchase.create({
      data: {
        listingId,
        buyerId,
        amount: listing.price
      }
    });

    await prisma.listing.update({
      where: { id: listingId },
      data: { status: 'sold' }
    });

    await prisma.priceHistory.create({
      data: {
        agentId: listing.agentId,
        price: listing.price
      }
    });

    res.status(201).json(purchase);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Market service running on port ${PORT}`);
});

module.exports = app;