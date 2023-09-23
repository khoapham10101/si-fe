import { UserProfile, UserRegister } from "@/types/auth";

export interface RegisterPayload {
  first_name: string;
  last_name: string;
  id_card: string;
  email: string;
  birthday: string | null;
  gender_id: number;
  password: string;
}

export interface RegisterResponse {
  user: UserRegister;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  user: UserProfile;
}

export interface LogoutResponse {
  message: string;
}
