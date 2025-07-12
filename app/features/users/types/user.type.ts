import { Document, Types } from 'mongoose';

export interface User extends Document {
  name: string;
  email: string;
  password: string;
  role: 'USER' | 'SELLER' | 'ADMIN';
  status: 'Active' | 'Inactive';
  createdAt: Date;
}
export interface AuthticatedUser {
  user: {
    id: string;
    name: string;
    email: string;
    role: 'USER' | 'SELLER' | 'ADMIN';
  };
  token: string;
  refreshToken: string
}

export interface SignupUser {
  name: string;
  email: string;
  password: string;
  phone?: string;
  role?: 'USER' | 'SELLER';
  receiveUpdates?: boolean;
}
export type SigninUser = Pick<User, 'email' | 'password'>;

export type LeanUser = User & { _id: Types.ObjectId };

export type Role = AuthticatedUser['user']['role'];
export type VerifyRole = Role;

export type UserUpdateInput = Pick<User, 'name' | 'email'>;


