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
import {
  UsersCollection,
  USERS_COLLECTION_TOKEN,
} from "@kaviar/security-mongo-bundle";

export default (config: IXPasswordBundleConfig) => {
  const {
    graphql: { queries },
  } = config;

  const resolvers: IFunctionMap = {};

  if (queries.me) {
    resolvers.me = [
      X.CheckLoggedIn(),
      (_, args, context, ast) => {
        const userId = (context as any).userId;
        const usersCollection = context.container.get<UsersCollection<any>>(
          USERS_COLLECTION_TOKEN
        );

        return usersCollection.queryOneGraphQL(ast, {
          filters: {
            _id: userId,
          },
          intersect: {
            _id: 1,
            email: 1,
            roles: 1,
            profile: 1,
          },
        });
      },
    ];
  }

  return {
    Query: resolvers,
  };
};
