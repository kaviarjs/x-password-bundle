import { SecurityService } from "@kaviar/security-bundle";
import { PasswordService } from "@kaviar/password-bundle";
import { EmailService } from "@kaviar/email-bundle";
import { Service, Inject } from "@kaviar/core";
import { InvalidPasswordException } from "../exceptions/InvalidPasswordException";
import { IXPasswordService } from "./IXPasswordService";
import { InvalidTokenException } from "../exceptions/InvalidTokenException";
import { RegistrationInput } from "../inputs/RegistrationInput";
import { ChangePasswordInput } from "../inputs/ChangePasswordInput";
import { LoginInput } from "../inputs/LoginInput";
import { ResetPasswordInput } from "../inputs/ResetPasswordInput";
import { ForgotPasswordInput } from "../inputs/ForgotPasswordInput";
import { VerifyEmailInput } from "../inputs/VerifyEmailInput";
import { Router, APP_ROUTER } from "@kaviar/x-bundle";
import { IXPasswordBundleConfig } from "../defs";
import { X_PASSWORD_SETTINGS } from "../constants";

const ALLOWED_CHARS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split(
  ""
);

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

@Service()
export class XPasswordService implements IXPasswordService {
  constructor(
    @Inject(APP_ROUTER)
    protected readonly router: Router,
    protected readonly securityService: SecurityService,
    protected readonly passwordService: PasswordService,
    protected readonly emailService: EmailService,
    @Inject(X_PASSWORD_SETTINGS)
    protected readonly config: IXPasswordBundleConfig
  ) {}

  /**
   * Registers the user with email as username and
   * @param input
   */
  async register(input: RegistrationInput): Promise<{ token: string }> {
    const userId = await this.securityService.createUser();
    const {
      requiresEmailVerificationBeforeLoggingIn,
      emails: { sendEmailVerification, sendWelcomeEmail },
    } = this.config;

    await this.passwordService.attach(userId, {
      username: input.email,
      email: input.email,
      password: input.password,
      isEmailVerified: false,
    });

    this.securityService.updateUser(userId, {
      profile: {
        name: input.name,
      },
      isEnabled: requiresEmailVerificationBeforeLoggingIn ? false : true,
    });

    // The logic here would be that we send email verification, without welcoming
    // However if
    if (sendEmailVerification) {
      await this.sendEmailVerification(userId, input.name, input.email);
    }

    // If it's not mandatory to have his email checked and we don't send email verification
    // we'll send the welcome email. If we do send verification email, the welcome email is sent after email is verified
    if (
      sendWelcomeEmail &&
      !sendEmailVerification &&
      !requiresEmailVerificationBeforeLoggingIn
    ) {
      await this.sendWelcomeEmail(input.name, input.email);
    }

    const token = await this.securityService.login(userId, {
      authenticationStrategy: this.passwordService.method,
    });

    return {
      token: requiresEmailVerificationBeforeLoggingIn ? null : token,
    };
  }

  async changePassword(input: ChangePasswordInput, userId: any) {
    const isValid = await this.passwordService.isPasswordValid(
      userId,
      input.oldPassword,
      {
        failedAuthenticationAttemptsProcessing: false,
      }
    );

    if (!isValid) {
      throw new Error("Old password was invalid");
    }

    await this.passwordService.setPassword(userId, input.newPassword);
  }

  async login(input: LoginInput): Promise<{ token: string }> {
    const userId = await this.passwordService.findUserIdByUsername(
      input.username
    );
    const isValid = await this.passwordService.isPasswordValid(
      userId,
      input.password
    );

    if (isValid) {
      return {
        token: await this.securityService.login(userId, {
          authenticationStrategy: this.passwordService.method,
        }),
      };
    } else {
      throw new InvalidPasswordException();
    }
  }

  async logout(input) {
    await this.securityService.logout(input.token);
  }

  async resetPassword(input: ResetPasswordInput) {
    const userId = await this.passwordService.findUserIdByUsername(
      input.username
    );

    await this.passwordService.resetPassword(
      userId,
      input.token,
      input.newPassword
    );

    return {
      token: await this.securityService.login(userId, {
        authenticationStrategy: this.passwordService.method,
      }),
    };
  }

  async forgotPassword(input: ForgotPasswordInput) {
    const userId = await this.passwordService.findUserIdByUsername(input.email);

    if (userId) {
      // We don't want to expose if we have the user or not, so we "silently" fail
      // We want to emulate some "time" passing so they don't do time-based analysis of user email detection
      await sleep(150);
      return;
    }

    const token = await this.passwordService.createTokenForPasswordReset(
      userId
    );

    const {
      emails: { regardsName, paths, templates },
    } = this.config;

    // This will run in the background, we do not await on emails
    this.emailService.send(
      {
        component: templates.forgotPassword,
        props: {
          name: input.email,
          username: input.email,
          regardsName: regardsName,
          resetPasswordUrl: this.router.path(paths.resetPasswordPath, {
            token,
          }),
        },
      },
      {
        to: input.email,
      }
    );
  }

  async verifyEmail(input: VerifyEmailInput) {
    const userId = await this.passwordService.findUserIdByUsername(
      input.username
    );

    const userPasswordData = await this.passwordService.getData(userId, {
      emailVerificationToken: 1,
    });

    if (input.token === userPasswordData.emailVerificationToken) {
      // When token matches successfully
      await this.passwordService.updateData(userId, {
        isEmailVerified: true,
        emailVerificationToken: null,
      });

      const { requiresEmailVerificationBeforeLoggingIn } = this.config;
      if (requiresEmailVerificationBeforeLoggingIn) {
        await this.securityService.updateUser(userId, {
          isEnabled: true,
        });
      }

      if (this.config.emails.sendWelcomeEmail) {
        const userData = await this.securityService.findUserById(userId, {
          profile: 1,
        });

        this.sendWelcomeEmail(userData.profile.name, input.username);
      }
    } else {
      throw new InvalidTokenException({
        context: "email-verification",
      });
    }

    return {
      token: await this.securityService.login(userId, {
        authenticationStrategy: this.passwordService.method,
      }),
    };
  }

  /**
   * This function will generate a token and send for validation via email verification. It can be later verified using verifyEmail method
   * @param userId The id of the user
   * @param name The name of the user
   * @param email
   */
  async sendEmailVerification(userId: any, name: string, email: string) {
    const token = this.generateToken(32);
    this.passwordService.updateData(userId, {
      emailVerificationToken: token,
    });

    const {
      emails: { regardsName, paths, templates },
    } = this.config;

    // This will run in the background
    this.emailService.send(
      {
        component: templates.verifyEmail,
        props: {
          name: name,
          regardsName: regardsName,
          verifyEmailUrl: this.router.path(paths.verifyEmailPath, { token }),
        },
      },
      {
        to: email,
      }
    );
  }

  /**
   * This function will generate a token and send for validation via email verification. It can be later verified using verifyEmail method
   * @param userId The id of the user
   * @param name The name of the user
   * @param email
   */
  async sendWelcomeEmail(name: string, email: string) {
    const {
      emails: { regardsName, paths, templates, applicationName },
    } = this.config;

    // This will run in the background
    this.emailService.send(
      {
        component: templates.welcome,
        props: {
          name: name,
          applicationName: applicationName,
          regardsName: regardsName,
          welcomeUrl: this.router.path(paths.welcomePath),
        },
      },
      {
        to: email,
      }
    );
  }

  /**
   * Generates the token for email validation and maybe others
   * @param length
   */
  generateToken(length) {
    const b = [];
    for (let i = 0; i < length; i++) {
      const j = (Math.random() * (ALLOWED_CHARS.length - 1)).toFixed(0);
      b[i] = ALLOWED_CHARS[j];
    }
    return b.join("");
  }
}
