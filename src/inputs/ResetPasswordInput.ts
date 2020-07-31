import { Schema, Is, a } from "@kaviar/validator";

@Schema()
export class ResetPasswordInput {
  @Is(a.string().required())
  username: string;

  @Is(a.string().required())
  token: string;

  @Is(a.string().required())
  newPassword: string;
}
