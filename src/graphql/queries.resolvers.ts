import * as X from "@kaviar/x-bundle";
import { RegistrationInput } from "../inputs/RegistrationInput";
import { LoginInput } from "../inputs/LoginInput";
import { ResetPasswordInput } from "../inputs/ResetPasswordInput";
import { ForgotPasswordInput } from "../inputs/ForgotPasswordInput";
import { VerifyEmailInput } from "../inputs/VerifyEmailInput";
import { XPasswordService } from "../services/XPasswordService";
import { ChangePasswordInput } from "../inputs/ChangePasswordInput";
import { IXPasswordBundleConfig } from "../defs";
import { IFunctionMap } from "@kaviar/graphql-bundle";
import { SecurityService } from "@kaviar/security-bundle";

export default (config: IXPasswordBundleConfig) => {
  const {
    graphql: { queries },
  } = config;

  const resolvers: IFunctionMap = {};

  if (queries.me) {
    resolvers.me = [
      X.CheckLoggedIn(),
      (_, args, context) => {
        const userId = (context as any).userId;
        const securityService = context.container.get(SecurityService);

        return securityService.findUserById(userId);
      },
    ];
  }

  return {
    Query: resolvers,
  };
};
