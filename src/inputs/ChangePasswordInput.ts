import { Schema, Is, a } from "@kaviar/validator-bundle";

@Schema()
export class ChangePasswordInput {
  @Is(a.string().required())
  oldPassword: string;

  @Is(a.string().required())
  newPassword: string;
}
