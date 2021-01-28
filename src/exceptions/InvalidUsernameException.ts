import { Exception } from "@kaviar/core";

export class InvalidUsernameException extends Exception<{ username: string }> {
  getMessage() {
    return `The username could not be found.`;
  }
}
