import { PrismaClient } from '@prisma/client';
import bodyParser from 'body-parser';
import express from 'express';

const prisma = new PrismaClient();
const app = express();
const port = process.env.PORT ? Number(process.env.PORT) : 3000;
const host = process.env.IP ? process.env.IP : 'locahost';

app.use(bodyParser.json());

interface User {
  id: number;
}

app.post('/users', async (req, res) => {
  const newUser: User = req.body; // Type cast to User interface

  try {
    const user = await prisma.user.create({
      data: newUser,
    });
    res.json(user);
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ error: 'Error creating user.' });
  }
});

app.get('/users/:userId', async (req, res) => {
  const userId: string = req.params.userId; // Type cast to string

  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(userId) }, // Convert string ID to number
    });

    if (!user) {
      res.status(404).json({ error: 'User not found.' });
      return; // Early return to avoid sending a potentially null user
    }

    res.json(user);
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ error: 'Error getting user.' });
  }
});

app.listen(port, () => {
  console.log(`User service listening at http://${host}:${port}`);
});
