import { IReactEmailTemplate } from "@kaviar/email-bundle";
import { XPasswordService } from "./services/XPasswordService";

export interface IXPasswordBundleConfig {
  services: {
    XPasswordService: typeof XPasswordService;
  };
  emails?: {
    templates?: {
      welcome?: IReactEmailTemplate<any>;
      forgotPassword?: IReactEmailTemplate<any>;
      resetPassword?: IReactEmailTemplate<any>;
    };
    paths?: {
      welcomePath?: string;
      resetPasswordPath?: string;
    };
    applicationName?: string;
    regardsName?: string;
  };
  graphql?: {
    mutations?: {
      register?: boolean;
      login?: boolean;
      resetPassword?: boolean;
      forgotPassword?: boolean;
      verifyEmail?: boolean;
    };
  };
}
