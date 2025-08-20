import mongoose, { Document, Schema, Model } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export interface Captain extends Document {
  fullname: {
    firstname: string;
    lastname: string;
  };
  email: string;
  password: string;
  socketId: string;
  status: string;
  vehicle: vehicle;
  location?: {
    latitude: number;
    longitude: number;
  };
  generateAuthToken: () => string;
  comparePassword: (password: string) => Promise<boolean>;
}

type vehicle = {
  color: string;
  plate: string;
  capacity: number;
  vehicleType: string;
};

export interface CaptainModelType extends Model<Captain> {
  hashPassword(password: string): Promise<string>;
}

const CaptainSchema: Schema<Captain> = new Schema({
  fullname: {
    firstname: {
      type: String,
      require: [true, "Enter your name"],
      minLength: [3, "Your name must have 3 characters"],
    },
    lastname: {
      type: String,
      minLength: [3, "Your name must have 3 characters"],
    },
  },
  email: {
    type: String,
    required: [true, "Enter your email"],
    unique: true,
    match: [
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Enter a valid email",
    ],
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "Enter your password"],
    select: false,
  },
  socketId: {
    type: String,
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "inactive",
  },
  vehicle: {
    color: {
      type: String,
      required: true,
    },
    plate: {
      type: String,
      required: true,
    },
    capacity: {
      type: Number,
      required: true,
      min: [1, "Not enough space"],
    },
    vehicleType: {
      type: String,
      enum: ["Select", "two wheeler", "four wheeler"],
      required: true,
    },
  },
  location: {
    latitude: {
      type: Number,
    },
    longitude: {
      type: Number,
    },
  },
});

CaptainSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id },
    process.env.JWT_SECRET!,
    { expiresIn: "24h" }
  );
  return token;
};

CaptainSchema.methods.comparePassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

CaptainSchema.statics.hashPassword = async function (password: string) {
  return await bcrypt.hash(password, 10);
};

const CaptainModel = mongoose.model<Captain, CaptainModelType>(
  "Captain",
  CaptainSchema
);

export default CaptainModel;
