import { Schema, Is, a } from "@kaviar/validator-bundle";

@Schema()
export class LogoutInput {
  @Is(a.string().required())
  token: string;
}
