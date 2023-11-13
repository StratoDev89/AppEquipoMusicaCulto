export interface User {
  nick: string;
  password: string;
}

export interface UserSaved extends User {
  _id: string;
}

export interface CreateUser extends User {
  adminPassword: string;
}

export interface UpdateUser extends Partial<User> {}

export interface Payload extends Omit<User, 'password'> {
  sub: string;
}
