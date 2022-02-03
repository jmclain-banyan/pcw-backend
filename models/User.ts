import { Schema, Model, model } from 'mongoose';
import User from '../types/UserType';

const UserSchema = new Schema<User>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
  //   playRecord: { type: Array },
  registerDate: { type: Date, default: Date.now },
});

export const UserModel: Model<User> = model('User', UserSchema);
