import { Schema, Is, a } from "@kaviar/validator";

@Schema()
export class VerifyEmailInput {
  @Is(a.string().required())
  token: string;
}
