import { model, Schema } from "mongoose";
import { v4 } from "uuid";

//the user interface
export interface IUser {
  _id: string;
  active: boolean;
  email: string;
  hashedPassword: string;
  username: string;
}

//the schema of the user
const userSchema = new Schema<IUser>({
  _id: {
    type: String,
    required: true,
    default: v4,
  },
  active: {
    type: Boolean,
    required: true,
    default: true,
  },
  email: {
    type: String,
    required: true,
  },
  hashedPassword: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
});

//the exported model of the userSchema
export const UserModel = model<IUser>("user", userSchema);
