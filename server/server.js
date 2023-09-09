import 'express-async-errors';
import * as dotenv from 'dotenv';
dotenv.config();
// express
import express from 'express';
const app = express();
import mongoose from 'mongoose';
import cors from 'cors';

// routers
import AuthRouter from './routes/AuthRouter.js';
import UserRouter from './routes/UserRouter.js';
import OrderRouter from './routes/OrderRoutes.js';

// public

// middleware
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';

app.use(cors());
app.use(express.json());

app.use('/api/v1/auth', AuthRouter);
app.use('/api/v1/user', UserRouter);
app.use('/api/v1/order', OrderRouter);

app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;
try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, console.log(`server is listening on port ${port}... `));
} catch (err) {
  console.log(err);
  process.exit(1);
}
