// import { config } from 'dotenv';
import { createApp } from './utils/createApp';
import clientConnection from './client';
import './database';

// config();

const PORT = process.env.PORT || 3001;

async function main() {
  console.log(`Running in ${process.env.ENV} mode.`);

  try {
    const app = createApp();
    app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  } catch (err) {
    console.log(err);
  }

  try {
    clientConnection.init();
  } catch (err) {
    console.log(err);
  }
}

main();