import { IReactEmailTemplate } from "@kaviar/email-bundle";
import { IXPasswordService } from "./services/IXPasswordService";
import { Constructor } from "@kaviar/core";
import { IForgotPasswordEmailProps } from "./emails/ForgotPasswordEmail";
import { IWelcomeEmailProps } from "./emails/WelcomeEmail";
import { IResetPasswordConfirmationEmailProps } from "./emails";
import { IVerifyEmailProps } from "./emails/VerifyEmail";
import "@kaviar/security-bundle";
import "@kaviar/password-bundle";
import { IPasswordAuthenticationStrategy } from "@kaviar/password-bundle";

declare module "@kaviar/security-bundle" {
  export interface IUser {
    password: IPasswordAuthenticationStrategy;
    profile: IUserProfile;
  }
  export interface IUserProfile {
    firstName: string;
    lastName: string;
  }
}

export interface IXPasswordBundleConfig {
  services: {
    XPasswordService: Constructor<IXPasswordService>;
  };
  emails: {
    templates: {
      welcome: IReactEmailTemplate<IWelcomeEmailProps>;
      forgotPassword: IReactEmailTemplate<IForgotPasswordEmailProps>;
      resetPasswordConfirmation: IReactEmailTemplate<IResetPasswordConfirmationEmailProps>;
      verifyEmail: IReactEmailTemplate<IVerifyEmailProps>;
    };
    paths: {
      welcomePath: string;
      resetPasswordPath: string;
      verifyEmailPath: string;
    };
    applicationName: string;
    regardsName: string;
    sendEmailVerification: boolean;
    sendWelcomeEmail: boolean;
  };
  requiresEmailVerificationBeforeLoggingIn: boolean;
  /**
   * This refers to the application, the web, the frontend, not the api.
   */
  graphql: {
    mutations: {
      register: boolean;
      changePassword: boolean;
      login: boolean;
      logout: boolean;
      resetPassword: boolean;
      forgotPassword: boolean;
      verifyEmail: boolean;
    };
  };
}
