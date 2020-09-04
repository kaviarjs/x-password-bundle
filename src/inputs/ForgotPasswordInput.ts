import { Schema, Is, a } from "@kaviar/validator-bundle";

@Schema()
export class ForgotPasswordInput {
  @Is(a.string().required())
  email: string;
}
