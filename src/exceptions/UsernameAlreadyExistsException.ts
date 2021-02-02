import { Exception } from "@kaviar/core";

export class UsernameAlreadyExistsException extends Exception {
  getMessage() {
    return "Username already exists";
  }
}
