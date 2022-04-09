import mongoose, { Schema } from 'mongoose';

export interface Logs {
  guildId: string;
  action: string;
  module: string;
  timestamp: string;
  user: {
    id: string;
    username: string;
    discriminator: string;
    avatar: string;
  };
}

const LogsSchema = new Schema<Logs>({
  guildId: { type: String, required: true },
  action: { type: String, required: true },
  module: { type: String, required: true },
  timestamp: { type: String, required: true },
  user: {
    id: { type: String, required: true },
    username: { type: String, required: true },
    discriminator: { type: String, required: true },
    avatar: { type: String, required: false },
  },
});

export default mongoose.model('logs', LogsSchema);