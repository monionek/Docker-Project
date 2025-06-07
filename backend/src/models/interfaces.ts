
export interface UserInterface {
  id: string;
  username: string;
  password: string;
  email: string;
  role: string;
}

export interface JwtPayload {
  id: string;
  username: string;
  role: string
}
