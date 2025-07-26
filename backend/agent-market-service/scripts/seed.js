const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function seed() {
  console.log('Starting seed data...');

  await prisma.purchase.deleteMany();
  await prisma.priceHistory.deleteMany();
  await prisma.listing.deleteMany();

  const listings = [
    {
      agentId: 'agent-001',
      sellerId: 'user-001',
      title: '智能客服机器人',
      price: 199.99,
      description: '7x24小时在线客服，支持多语言回复',
      category: 'customer-service'
    },
    {
      agentId: 'agent-002',
      sellerId: 'user-002',
      title: '数据分析助手',
      price: 299.99,
      description: '自动化数据清洗、分析和可视化报告生成',
      category: 'data-analysis'
    },
    {
      agentId: 'agent-003',
      sellerId: 'user-003',
      title: '内容创作AI',
      price: 149.99,
      description: '高质量文章、社交媒体内容自动生成',
      category: 'content-creation'
    },
    {
      agentId: 'agent-004',
      sellerId: 'user-001',
      title: '代码审查助手',
      price: 249.99,
      description: '自动代码审查、bug检测和性能优化建议',
      category: 'development'
    }
  ];

  for (const listingData of listings) {
    const listing = await prisma.listing.create({
      data: listingData
    });
    console.log(`Created listing: ${listing.title} (${listing.id})`);
  }

  console.log('Seed data completed!');
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });