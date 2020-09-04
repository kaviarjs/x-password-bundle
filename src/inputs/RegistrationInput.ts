import { Schema, Is, a } from "@kaviar/validator-bundle";

@Schema()
export class RegistrationInput {
  @Is(a.string().required())
  name: string;

  @Is(a.string().email().required())
  email: string;

  @Is(a.string().required())
  password: string;
}
