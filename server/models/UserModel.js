import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
    verified: {
      type: Boolean,
      default: false,
    },
    verificationToken: String,
    addresses: [
      {
        name: String,
        mobileNo: String,
        houseNo: String,
        street: String,
        landmark: String,
        city: String,
        country: String,
        postalCode: String,
      },
    ],
    orders: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'Order',
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model('User', UserSchema);
