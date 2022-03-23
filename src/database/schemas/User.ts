import mongoose, { Schema } from 'mongoose';

export interface User {
  id: string;
  
  discordId: string;
  discordUsername: string;
  discordDiscriminator: string;
  discordAvatar: string;
  email: string;

  blacklisted: boolean;
  acceptedPolicy: boolean;

  voted: boolean;
  voteAmount: number;

  accessToken: string;
  refreshToken: string;
}

const UserSchema = new Schema<User>({
  discordId: {
    type: mongoose.SchemaTypes.String,
    required: true,
    unique: true,
  },
  discordUsername: {
    type: mongoose.SchemaTypes.String,
    default: "",
  },
  discordDiscriminator: {
    type: mongoose.SchemaTypes.String,
    default: "",
  },
  discordAvatar: {
    type: mongoose.SchemaTypes.String,
    default: "",
  },
  email: {
    type: mongoose.SchemaTypes.String,
    default: "",
  },

  blacklisted: {
    type: mongoose.SchemaTypes.Boolean,
    default: false,
  },
  acceptedPolicy: {
    type: mongoose.SchemaTypes.Boolean,
    default: true,
  },

  voted: {
    type: mongoose.SchemaTypes.Boolean,
    default: false,
  },
  voteAmount: {
    type: mongoose.SchemaTypes.Number,
    default: 0,
  },

  accessToken: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  refreshToken: {
    type: mongoose.SchemaTypes.String,
    required: true,
  }
});

export default mongoose.model('users', UserSchema);