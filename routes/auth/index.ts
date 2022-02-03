import express, { Router } from 'express';
import { Document } from 'mongoose';
import UserModel from '../../models/User';
import UserType from '../../types/UserType';
import * as bcrypt from 'bcrypt';

const router: Router = express.Router();

type RegisterPostBody = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type LoginPostBody = {
  email: string;
  password: string;
};

router.route('/register').post(async (request, response) => {
  const { name, email, password, confirmPassword }: RegisterPostBody =
    request.body;
  const passRegEx: RegExp =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/g;
  try {
    const user = await UserModel.findOne({ email });
    if (user)
      return response
        .status(400)
        .json({ message: `The email ${email} is already registered` });

    const errorMessages: Array<string> = [];
    if (!name || !email || !password || !confirmPassword)
      errorMessages.push('Please fill out all fields');
    if (password !== confirmPassword)
      errorMessages.push('Passwords do not match');
    if (!passRegEx.test(password))
      errorMessages.push(
        'Password needs to contain one uppercase, one lowercase, and one number'
      );
    if (password.length < 8)
      errorMessages.push('Password needs to at least 8 charaters long');

    if (errorMessages.length > 0) {
      return response.status(400).json({ message: errorMessages });
    } else {
      const hash: string = await bcrypt.hash(password, 14);
      const newUser: Document<unknown, any, UserType> = new UserModel({
        name,
        email,
        password: hash,
      });
      newUser.save().then((user) => {
        if (user)
          return response.status(201).json({
            message: `Player ${name} has been created, you can log in with your credentials`,
          });
      });
    }
  } catch (error: any) {
    console.log(error);
    return response.status(500).json({ error });
  }
});

router.route('/login').post(async (request, response) => {
  const { email, password }: LoginPostBody = request.body;
  if (!email || !password)
    return response.status(400).json({ message: 'Please enter all fields' });
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return response.status(400).json({ message: 'User does not exist' });
    } else {
      const isMatch: boolean = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return response.status(400).json({ message: 'Passwords do not match' });
      else
        return response.status(200).json({
          message: 'Login Successful',
          user: { id: user._id, name: user.name, email: user.email },
        });
    }
  } catch (error: any) {
    console.log(error);
    return response.status(500).json({ error });
  }
});

export default router;
