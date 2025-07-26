const request = require('supertest');
const app = require('../src/app');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

describe('Market Service API', () => {
  beforeAll(async () => {
    await prisma.listing.deleteMany();
    await prisma.purchase.deleteMany();
    await prisma.priceHistory.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe('Listings API', () => {
    let createdListingId;

    test('POST /listings - create new listing', async () => {
      const listingData = {
        agentId: 'agent-123',
        sellerId: 'user-456',
        title: 'AI Assistant Bot',
        price: 99.99,
        description: 'Advanced AI assistant for daily tasks',
        category: 'productivity'
      };

      const response = await request(app)
        .post('/listings')
        .send(listingData)
        .expect(201);

      expect(response.body).toMatchObject(listingData);
      expect(response.body.id).toBeDefined();
      expect(response.body.status).toBe('active');
      createdListingId = response.body.id;
    });

    test('GET /listings - get all listings', async () => {
      const response = await request(app)
        .get('/listings')
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
    });

    test('GET /listings - search with query', async () => {
      const response = await request(app)
        .get('/listings?q=AI')
        .expect(200);

      expect(response.body.length).toBeGreaterThan(0);
      expect(response.body[0].title).toContain('AI');
    });

    test('GET /listings/:id - get specific listing', async () => {
      const response = await request(app)
        .get(`/listings/${createdListingId}`)
        .expect(200);

      expect(response.body.id).toBe(createdListingId);
      expect(response.body.title).toBe('AI Assistant Bot');
    });

    test('GET /listings/:id - return 404 for non-existent listing', async () => {
      await request(app)
        .get('/listings/non-existent-id')
        .expect(404);
    });
  });

  describe('Purchases API', () => {
    let listingId;

    beforeAll(async () => {
      const listing = await prisma.listing.create({
        data: {
          agentId: 'agent-789',
          sellerId: 'user-456',
          title: 'Test Bot',
          price: 49.99,
          description: 'Test description',
          category: 'test'
        }
      });
      listingId = listing.id;
    });

    test('POST /purchases - create purchase', async () => {
      const purchaseData = {
        listingId: listingId,
        buyerId: 'user-999'
      };

      const response = await request(app)
        .post('/purchases')
        .send(purchaseData)
        .expect(201);

      expect(response.body.listingId).toBe(listingId);
      expect(response.body.buyerId).toBe('user-999');
      expect(response.body.amount).toBe(49.99);
      expect(response.body.status).toBe('completed');
    });

    test('GET /purchases - get all purchases', async () => {
      const response = await request(app)
        .get('/purchases')
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
    });

    test('GET /purchases - filter by buyer', async () => {
      const response = await request(app)
        .get('/purchases?buyerId=user-999')
        .expect(200);

      expect(response.body.length).toBeGreaterThan(0);
      expect(response.body[0].buyerId).toBe('user-999');
    });

    test('POST /purchases - fail for non-existent listing', async () => {
      const response = await request(app)
        .post('/purchases')
        .send({ listingId: 'non-existent', buyerId: 'user-999' })
        .expect(404);

      expect(response.body.error).toBe('Listing not found');
    });

    test('POST /purchases - fail for sold listing', async () => {
      const soldListing = await prisma.listing.create({
        data: {
          agentId: 'agent-111',
          sellerId: 'user-456',
          title: 'Sold Bot',
          price: 29.99,
          status: 'sold'
        }
      });

      await request(app)
        .post('/purchases')
        .send({ listingId: soldListing.id, buyerId: 'user-999' })
        .expect(400);
    });
  });

  describe('Health Check', () => {
    test('GET /health - health check', async () => {
      const response = await request(app)
        .get('/health')
        .expect(200);

      expect(response.body.status).toBe('ok');
    });
  });
});