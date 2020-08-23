import "@kaviar/security-bundle";
import "@kaviar/password-bundle";
import { IPasswordAuthenticationStrategy } from "@kaviar/password-bundle";

declare module "@kaviar/security-bundle" {
  export interface IUser {
    name: string;
    password: IPasswordAuthenticationStrategy;
  }
}
