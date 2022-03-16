import mongoose, { Schema } from 'mongoose';

interface Wilder {
  name: string;
  city: string;
  skills?: Array<object>;
  description?: string;
}

const WilderSchema = new Schema<Wilder>({
  name: {
    type: String,
    unique: true,
  },
  city: String,
  skills: [
    {
      title: String,
      votes: Number,
    },
  ],
});

module.exports = mongoose.model('wilder', WilderSchema);
