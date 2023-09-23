import { GenderEnum } from "@/enums/common";

export interface GenderType {
  id: GenderEnum;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface UserStatus {
  id: number;
  name: string;
  created_at?: string;
  updated_at?: string;
}

export interface UserRegister {
  id: number;
  full_name: string;
  id_card: string;
  birthday: string | null;
  gender_id: GenderEnum;
  gender: GenderType;
  id_1: number | null;
  id_2: number | null;
  avatar: string | null;
  phone: string | null;
  address: string | null;
  user_status_id: number;
  user_status: UserStatus;
  email: string;
  created_at: string;
  updated_at: string;
  created_at_formatted: string;
  updated_at_formatted: string;
}

export interface UserProfile {
  id: number;
  first_name: string;
  last_name: string;
  id_card: string;
  birthday: string;
  gender_id: number;
  id_1: number | null;
  id_2: number;
  avatar: string | null;
  phone: string | null;
  address: string | null;
  user_status_id: number;
  email: string;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: null;
}
