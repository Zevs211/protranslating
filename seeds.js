import mongoose from 'mongoose';
import config from './config';
import Provider from './models/provider';
import Client from './models/client';

await mongoose.connect(config.DB_URL);

console.log(`connected to db ${config.DB_URL}`);

const providers = [];
new Array(10).fill().forEach(async (_, index) => {
  providers.push(new Provider({
    name: `Provider Name ${index}`
  }).save());
});
const clients = [];
new Array(5).fill().forEach(async (_, index) => {
  clients.push(new Client({
    name: `Name ${index}`,
    email: `Email ${index}`,
    phone: `1112223334${index}`,
    providers: []
  }).save());
});

const seed = async () => {
  try {
    await Promise.all(providers);
    await Promise.all(clients);
  } catch (err) {
    const message = err.message || err;
    if (message.includes('E11000')) {
      console.log('No need to seed - documents are already in place');
      process.exit(0);
    }
    console.error(message);
  }
  console.log('Filled db with test providers and clients');
  process.exit(0);
};
seed();