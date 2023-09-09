import { BadRequestError, NotFoundError } from '../errors/customError.js';
import User from '../models/UserModel.js';
import Order from '../models/OrderModel.js';
import { StatusCodes } from 'http-status-codes';

export const createOrder = async (req, res) => {
  const { userId, cartItems, totalPrice, shippingAddress, paymentMethod } =
    req.body;

  const user = await User.findById(userId);
  if (!user) throw new BadRequestError('User not found');

  const products = cartItems.map((product) => {
    const { title, quantity, price, image } = product;
    return { name: title, quantity, price, image };
  });

  const order = await Order.create({
    user: userId,
    products,
    totalPrice,
    shippingAddress,
    paymentMethod,
  });

  res
    .status(StatusCodes.CREATED)
    .json({ msg: 'Order Created Successfully', order });
};

export const getAllOrders = async (req, res) => {
  const { userId } = req.params;
  const orders = await Order.find({ user: userId }).populate('user');

  res.status(StatusCodes.OK).json({ orderCount: orders.length, orders });
};
