import crypto from 'crypto';
import User from '../models/UserModel.js';
import {
  BadRequestError,
  UnauthorizedError,
  UnauthenticatedError,
} from '../errors/customError.js';
import { StatusCodes } from 'http-status-codes';
import { hashPassword, comparePassword } from '../utils/passwordUtils.js';
import { sendVerificationEmail } from '../utils/verificationEmail.js';
import { createJWT } from '../utils/tokenUtils.js';

export const register = async (req, res) => {
  const emailAllReadyExists = await User.findOne({ email: req.body.email });
  if (emailAllReadyExists) throw new BadRequestError('Email already exists');

  req.body.password = await hashPassword(req.body.password);
  req.body.verificationToken = crypto.randomBytes(20).toString('hex');

  const user = await User.create(req.body);
  sendVerificationEmail(user.email, user.verificationToken);
  res.status(StatusCodes.CREATED).json({
    msg: 'Confirm your registration by clicking on verify link sent on your email',
  });
};

export const verifyEmail = async (req, res) => {
  const verificationToken = req.params.token;
  const user = await User.findOne({ verificationToken });

  if (!user) throw new UnauthorizedError('Invalid verification token');

  user.verified = true;
  user.verificationToken = undefined;
  await user.save();

  res.status(StatusCodes.OK).json({ msg: 'Email verified successfully' });
};

export const login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  const isValidUser =
    user && (await comparePassword(req.body.password, user.password));

  if (!isValidUser) throw new UnauthenticatedError('invalid credentials');

  const token = createJWT({ userId: user._id });

  res
    .status(StatusCodes.OK)
    .json({ msg: 'user logged in', token, verified: user.verified });
};

export const logout = async (req, res) => {
  // res.cookie('token', 'logout', {
  //   httpOnly: true,
  //   expires: new Date(Date.now()),
  // });
  // res.status(StatusCodes.OK).json({ msg: 'user logged out' });
};
