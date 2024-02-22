import { PrismaClient } from '@prisma/client';
import bodyParser from 'body-parser';
import express from 'express';

const prisma = new PrismaClient();
const app = express();
const port = 3002;

app.use(bodyParser.json());

interface Post {
  // Define interface properties based on your post schema
  id: number;
  title: string;
  content: string;
  // Other post properties...
}

app.post('/posts', async (req, res) => {
  const newPost: Post = req.body; // Type assertion to Post interface

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
