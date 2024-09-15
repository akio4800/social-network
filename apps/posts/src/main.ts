import { PrismaClient } from '@prisma/client';
import bodyParser from 'body-parser';
import express from 'express';

const prisma = new PrismaClient();
const app = express();
const port = process.env.PORT ? Number(process.env.PORT) :3002;
const host = process.env.IP ? process.env.IP : 'locahost';

app.use(bodyParser.json());

app.post('/posts', async (req, res) => {
  const newPost = req.body; // Type assertion to Post interface

  try {
    const post = await prisma.post.create({
      data: newPost,
    });
    res.json(post);
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ error: 'Error creating post.' });
  }
});

app.get('/posts/:postId', async (req, res) => {
  const postId: string = req.params.postId; // Type assertion to string

  try {
    const post = await prisma.post.findUnique({
      where: { id: parseInt(postId) }, // Convert string ID to number
    });

    if (!post) {
      res.status(404).json({ error: 'Post not found.' });
      return; // Early return to avoid sending a potentially null post
    }

    res.json(post);
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ error: 'Error getting post.' });
  }
});

app.listen(port, () => {
  console.log(`Post service listening at http://localhost:${port}`);
});
