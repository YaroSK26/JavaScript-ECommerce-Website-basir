/* eslint-disable no-unused-vars */
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import data from './data';
import config from './config';
import userRouter from './routers/userRouter';

console.log('MONGODB_URL:', config.MONGODB_URL);



mongoose
  .connect(config.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB.');
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB:', error);
  });

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/api/users', userRouter);
app.get('/api/products', (_req, res) => {
  res.send(data.products);
});
app.get('/api/products/:id', (req, res) => {
  const product = data.products.find((x) => x._id === req.params.id);
  if (product) {
    res.send(product); 
  } else {
    res.status(404).send({ message: 'Product Not Found!' });
  }
});
app.use((err, _req, res, next) => {
  const status = err.name && err.name === 'ValidationError' ? 400 : 500;
  res.status(status).send({ message: err.message });
});
app.listen(5000, () => {
  console.log('serve at http://localhost:5000');
});
/* blbost */ 