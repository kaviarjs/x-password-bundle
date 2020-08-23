import { Listener, On, Inject } from "@kaviar/core";
import { EmailService } from "@kaviar/email-bundle";
import {
  PasswordResetRequestedEvent,
  PasswordService,
} from "@kaviar/password-bundle";
import { ForgotPasswordEmail } from "../emails/ForgotPasswordEmail";
import { X_PASSWORD_SETTINGS } from "../constants";
import { IXPasswordBundleConfig } from "../defs";
import { Router } from "@kaviar/x-bundle";
import { SecurityService } from "@kaviar/security-bundle";
import "@kaviar/password-bundle";

export class EmailListener extends Listener {
  @Inject(() => Router)
  router: Router;

  @Inject(() => PasswordService)
  passwordService: PasswordService;

  @Inject(() => SecurityService)
  securityService: SecurityService;

  @Inject(X_PASSWORD_SETTINGS)
  settings: IXPasswordBundleConfig;

  @On(PasswordResetRequestedEvent)
  async onPasswordReset(event: PasswordResetRequestedEvent) {
    const emailService = this.get<EmailService>(EmailService);

    const { userId, token } = event.data;
    const { paths } = this.settings.emails;
    const { name, email } = await this.getUserData(userId);

    emailService.send(
      {
        component: ForgotPasswordEmail,
        props: {
          resetPasswordUrl: this.router.path(paths.resetPasswordPath, {
            token,
          }),
          name,
          username: email,
          regardsName: this.settings.emails.regardsName,
        },
      },
      {
        to: email,
      }
    );
  }

  protected async getUserData(
    userId
  ): Promise<{
    name: string;
    email: string;
  }> {
    const user = await this.securityService.findUserById(userId);

    return {
      name: user.name,
      email: user.password?.username,
    };
  }
}
