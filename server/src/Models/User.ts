import { model, Schema } from "mongoose";

//the user interface
export interface IUser {
  _id: string;
  username: string;
  email: string;
  hashedPassword: string;
}

//the schema of the user
const userSchema = new Schema<IUser>({
  _id: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  hashedPassword: {
    type: String,
    required: true,
  },
});

//the exported model of the userSchema
export const UserModel = model<IUser>("user", userSchema);
