import { Client } from 'discord.js';
import statsSystem from './statsSystem';
import votingSystem from './votingSystem';

const client = new Client({
  intents: 104447,
  presence: {
    status: 'invisible',
  },
  shards: 'auto',
});

client.once('ready', () => {
  console.log('Client connection established.');
  votingSystem(client);
  console.log('Voting System started.');
  statsSystem(client);
  console.log('Post Stats System started.');
});

export { client };

export default {
  client,
  init: () => {
    client.login(process.env.DISCORD_BOT_TOKEN);
  }
}