import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import routes from './routes/index.js';
import SwaggerUI from 'swagger-ui-express';
import { readFileSync } from 'fs';
const SwaggerSchemaString = readFileSync(
  new URL('./swagger.json', import.meta.url),
  { encoding: 'utf-8' }
);
const PORT = 5000;
const DB_URL = 'mongodb+srv://user:user@cluster0.h8e3c.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api-docs', SwaggerUI.serve, SwaggerUI.setup(JSON.parse(SwaggerSchemaString)));

app.use('/api', routes);

app.get('/', (req, res) => {
  res.status(200).json('Server is working')
});

async function startApp() {
  try {
    await mongoose.connect(DB_URL, { useUnifiedTopology: true, useNewUrlParser: true })
    app.listen(PORT, () => console.log('SERVER STARTED'));
  } catch (e) {
    console.log(e);
  }
}
startApp();
