import { Bundle } from "@kaviar/core";
import { IXPasswordBundleConfig } from "./defs";
import { X_PASSWORD_SETTINGS } from "./constants";
import { createGraphQLModule } from "./graphql";
import { Loader } from "@kaviar/apollo-bundle";
import { XPasswordService } from "./services/XPasswordService";
import { SecurityBundle } from "@kaviar/security-bundle";
import { PasswordBundle } from "@kaviar/password-bundle";
import { VerifyEmail } from "./emails/VerifyEmail";
import {
  ForgotPasswordEmail,
  ResetPasswordConfirmationEmail,
  WelcomeEmail,
} from "./emails";

export class XPasswordBundle extends Bundle<IXPasswordBundleConfig> {
  dependencies = [PasswordBundle, SecurityBundle];

  protected defaultConfig: Partial<IXPasswordBundleConfig> = {
    services: {
      XPasswordService,
    },
    emails: {
      templates: {
        forgotPassword: ForgotPasswordEmail,
        resetPasswordConfirmation: ResetPasswordConfirmationEmail,
        welcome: WelcomeEmail,
        verifyEmail: VerifyEmail,
      },
      paths: {
        welcomePath: "/login",
        resetPasswordPath: "/reset-password/:token",
        verifyEmailPath: "/verify-email/:token",
      },
      applicationName: "Kaviar",
      regardsName: "Kaviar Team",
      sendEmailVerification: true,
      sendWelcomeEmail: true,
    },
    requiresEmailVerificationBeforeLoggingIn: false,
    graphql: {
      mutations: {
        register: true,
        login: true,
        logout: true,
        changePassword: true,
        resetPassword: true,
        forgotPassword: true,
        verifyEmail: true,
      },
    },
  };

  async prepare() {
    this.container.set(X_PASSWORD_SETTINGS, this.config);

    // Override password service if necessary
    if (this.config.services?.XPasswordService) {
      this.container.set({
        id: XPasswordService,
        type: this.config.services.XPasswordService,
      });
    }
  }

  async init() {
    this.container.get(XPasswordService);
    const graphqlModule = createGraphQLModule(this.config);
    this.container.get<Loader>(Loader).load(graphqlModule);
  }
}
