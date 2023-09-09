import { StatusCodes } from 'http-status-codes';
import { BadRequestError } from '../errors/customError.js';
import User from '../models/UserModel.js';

export const addAddress = async (req, res) => {
  const { userId, address } = req.body;
  const user = await User.findById(userId);

  if (!user) throw new BadRequestError('User not found');

  user.addresses.push(address);
  await user.save();

  res.status(StatusCodes.OK).json({ msg: 'Address saved successfully' });
};

export const getAllAddresses = async (req, res) => {
  const { userId } = req.params;
  const user = await User.findById(userId);
  if (!user) throw new BadRequestError('User not found');
  res.status(StatusCodes.OK).json({ addresses: user.addresses });
};

export const getSingleUser = async (req, res) => {
  const { userId } = req.params;
  const user = await User.findById(userId);
  if (!user) throw new BadRequestError('User not found');
  res.status(StatusCodes.OK).json({ user });
};
