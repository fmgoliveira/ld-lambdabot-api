import mongoose from 'mongoose';

mongoose.connect(process.env.MONGO_URL!)
  .then(() => console.log('Connected to MongoDB Database.'))
  .catch((err) => console.log(err));