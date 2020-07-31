import "@kaviar/security-bundle";
import "@kaviar/password-bundle";

declare module "@kaviar/security-bundle" {
  export interface IUser {
    name: string;
  }
}
