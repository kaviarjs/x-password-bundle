import * as X from "@kaviar/x-bundle";
import { RegistrationInput } from "./inputs/RegistrationInput";
import { LoginInput } from "./inputs/LoginInput";
import { ResetPasswordInput } from "./inputs/ResetPasswordInput";
import { ForgotPasswordInput } from "./inputs/ForgotPasswordInput";
import { VerifyEmailInput } from "./inputs/VerifyEmailInput";
import { XPasswordService } from "./services/XPasswordService";

export default {
  register: [
    X.ToModel(RegistrationInput),
    X.Validate(),
    X.ToService(XPasswordService, "register"),
  ],
  changePassword: [
    X.ToModel(RegistrationInput),
    X.Validate(),
    X.ToService(XPasswordService, "changePassword"),
  ],
  login: [
    X.ToModel(LoginInput),
    X.Validate(),
    X.ToService(XPasswordService, "login"),
  ],
  resetPassword: [
    X.ToModel(ResetPasswordInput),
    X.Validate(),
    X.ToService(XPasswordService, "resetPassword"),
  ],
  forgotPassword: [
    X.ToModel(ForgotPasswordInput),
    X.Validate(),
    X.ToService(XPasswordService, "forgotPassword"),
  ],
  verifyEmail: [
    X.ToModel(VerifyEmailInput),
    X.Validate(),
    X.ToService(XPasswordService, "verifyEmail"),
  ],
};
