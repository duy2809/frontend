import { RoleCode } from 'constants/roles';

export interface User {
  id: number;
  email: string;
  name: string;
  address: string;
  phone: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  role: RoleCode;
}
export interface NewUser {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
}
