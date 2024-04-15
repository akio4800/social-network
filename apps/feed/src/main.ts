import { PrismaClient } from '@prisma/client';
import express from 'express';

const host = process.env.HOST ?? 'localhost';
const prisma = new PrismaClient();
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();

app.get('/', (req, res) => {
  // return the last 10 posts as JSON

  const posts = prisma.post.findMany({
    take: 10,
    orderBy: { createdAt: 'desc' },
  });

  res.json(posts);
});

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
