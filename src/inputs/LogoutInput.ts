import { Schema, Is, a } from "@kaviar/validator";

@Schema()
export class LogoutInput {
  @Is(a.string().required())
  token: string;
}
