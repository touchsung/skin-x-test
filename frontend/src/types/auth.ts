import { JwtPayload } from "jwt-decode";

export interface userData {
  accessToken: string;
}

export interface userDataInput {
  email: string;
  password: string;
}

export interface userDataJTW extends JwtPayload {
  email: string;
}
