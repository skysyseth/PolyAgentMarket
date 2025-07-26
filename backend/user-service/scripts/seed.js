const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  const hashedPassword = await bcrypt.hash('password123', 10);

  const user1 = await prisma.user.create({
    data: {
      email: 'alice@example.com',
      username: 'alice',
      password: hashedPassword,
      displayName: 'Alice Developer',
      walletAddress: '0x742d35Cc6634C0532925a3b844Bc9e7595f7E8c9',
      twitter: '@alice_dev',
      github: 'alice-dev',
      bio: 'Full-stack developer exploring AI agents'
    }
  });

  const user2 = await prisma.user.create({
    data: {
      email: 'bob@example.com',
      username: 'bob',
      password: hashedPassword,
      displayName: 'Bob Builder',
      walletAddress: '0x8ba1f109551bD432803012645Hac136c82C3e8C9',
      twitter: '@bob_builds',
      bio: 'Building the future with AI'
    }
  });

  const request1 = await prisma.request.create({
    data: {
      userId: user1.id,
      agentId: 'agent-001',
      content: '请帮我生成一个React组件，显示用户列表',
      type: 'text'
    }
  });

  const response1 = await prisma.response.create({
    data: {
      requestId: request1.id,
      agentId: 'agent-001',
      userId: user1.id,
      content: '```jsx\nimport React from "react";\n\nconst UserList = ({ users }) => (\n  <ul>\n    {users.map(user => (\n      <li key={user.id}>{user.name}</li>\n    ))}\n  </ul>\n);\n\nexport default UserList;\n```',
      type: 'markdown',
      metadata: {
        language: 'javascript',
        framework: 'react',
        confidence: 0.95
      }
    }
  });

  const request2 = await prisma.request.create({
    data: {
      userId: user2.id,
      agentId: 'agent-002',
      content: '优化这段Python代码的性能',
      type: 'text'
    }
  });

  const response2 = await prisma.response.create({
    data: {
      requestId: request2.id,
      agentId: 'agent-002',
      userId: user2.id,
      content: '```python\n# 原始代码\ndef find_duplicates(arr):\n    duplicates = []\n    for i in range(len(arr)):\n        for j in range(i+1, len(arr)):\n            if arr[i] == arr[j] and arr[i] not in duplicates:\n                duplicates.append(arr[i])\n    return duplicates\n\n# 优化后\ndef find_duplicates(arr):\n    seen = set()\n    duplicates = set()\n    for item in arr:\n        if item in seen:\n            duplicates.add(item)\n        else:\n            seen.add(item)\n    return list(duplicates)\n```',
      type: 'markdown',
      metadata: {
        language: 'python',
        optimization: 'time-complexity',
        confidence: 0.92
      }
    }
  });

  const request3 = await prisma.request.create({
    data: {
      userId: user1.id,
      agentId: 'agent-003',
      content: '创建一个SQL查询，查找最近30天注册的用户',
      type: 'text'
    }
  });

  console.log('✅ Database seeded successfully!');
  console.log(`Created users: ${user1.username}, ${user2.username}`);
  console.log(`Created requests: 3`);
  console.log(`Created responses: 2`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });