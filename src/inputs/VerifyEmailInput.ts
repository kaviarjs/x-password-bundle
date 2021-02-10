import { Schema, Is, a } from "@kaviar/validator-bundle";

@Schema()
export class VerifyEmailInput {
  @Is(a.string().required())
  token: string;

  @Is(a.string())
  username?: string;
}
