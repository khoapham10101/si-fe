import { GenderType, UserStatus } from "./auth";

export interface Role {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}
export interface User {
  id: number;
  first_name: string;
  last_name: string;
  full_name: string;
  id_card: string;
  birthday: string;
  gender_id: number;
  gender: GenderType;
  id_1: string | null;
  id_2: string | null;
  avatar: string | null;
  phone: string | null;
  address: string | null;
  user_status_id: number;
  user_status: UserStatus;
  roles: Role[];
  email: string;
  created_at: string;
  updated_at: string;
  created_at_formatted: string;
  updated_at_formatted: string;
}
