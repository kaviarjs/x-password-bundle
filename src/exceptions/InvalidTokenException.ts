import { Exception } from "@kaviar/core";

export class InvalidTokenException extends Exception<{ context: string }> {
  getMessage() {
    return `Token used for "${this.data.context}" is invalid.`;
  }
}
