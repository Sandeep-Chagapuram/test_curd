import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

const app = express();
const PORT = 5000;

app.use(cors());

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/curd')
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((err) => {
    console.log(err);
  });

const db = mongoose.connection;

app.get('/getdata', async (req, res) => {
  try {
    const data = await db.collection('users').find().toArray();
    res.json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.post('/insertdata', async (req, res) => {
  try {
    const newData = req.body;

    await db.collection('users').insertOne(newData);

    res.status(201).json({
      message: 'Inserted successfully',
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

app.put('/updateAge/:name', async (req, res) => {
  try {
    const Name = req.params.name;
    const updatedage = req.body;

    await db
      .collection('users')
      .updateOne(
        { name: Name },
        { $set: { age: updatedage.age } }
      );

    res.status(200).json({
      message: 'Age updated successfully',
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

app.delete('/delete/:name', async (req, res) => {
  try {
    const Name = req.params.name;

    await db.collection('users').deleteOne({
      name: Name,
    });

    res.status(200).json({
      message: 'User deleted successfully',
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});