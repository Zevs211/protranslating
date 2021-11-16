import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import config from './config'
import logger from './logger';
import SwaggerUI from 'swagger-ui-express';
import { readFileSync } from 'fs';
import routes from './routes';

const SwaggerSchemaString = readFileSync(
  new URL('./swagger.json', import.meta.url),
  { encoding: 'utf-8' }
);

const app = express();

app.use(cors());
app.use(express.json());

const swaggerSchema = JSON.parse(SwaggerSchemaString);
swaggerSchema.host = `http://localhost:${config.PORT}`;
app.use('/api-docs', SwaggerUI.serve, SwaggerUI.setup(swaggerSchema));
app.use('/api', routes);

async function bootstrap() {
  try {
    await mongoose.connect(config.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    app.listen(
      config.PORT,
      () => console.log(`Server has successfuly 🚀 on http://localhost:${config.PORT}/api-docs`)
    );
  } catch (e) {
    console.log(e);
    logger.error(e);
  }
}
bootstrap();
