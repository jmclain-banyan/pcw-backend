import { Schema, Model, model } from 'mongoose';
import UserType from '../types/UserType';

const UserSchema = new Schema<UserType>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
  //   playRecord: { type: Array },
  registerDate: { type: Date, default: Date.now },
});

const UserModel: Model<UserType> = model('User', UserSchema);

export default UserModel;
