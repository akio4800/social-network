import { PrismaClient } from '@prisma/client';
import express from 'express';

const prisma = new PrismaClient();
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();

app.get('/', (req, res) => {
  const posts = prisma.post.findMany({
    take: 10,
    orderBy: { createdAt: 'desc' },
  });

  res.json(posts);
});

app.listen(port, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
