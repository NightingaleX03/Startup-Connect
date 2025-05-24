export enum UserType {
  Startup = 'startup',
  VC = 'vc'
}

export interface LoginModel {
  name: string;
  password: string;
}

export interface SignupModel {
  name: string;
  type: string;
  email: string;
  phone: string;
  password: string;
}
