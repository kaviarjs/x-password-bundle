import { Exception } from "@kaviar/core";

export class InvalidPasswordException extends Exception {
  getMessage() {
    return "Username or password are invalid.";
  }
}
