import { Schema, Is, a } from "@kaviar/validator";

@Schema()
export class ForgotPasswordInput {
  @Is(a.string().required())
  email: string;
}
