This package from X-Framework gives you fully integrated passwords system, with GraphQL endpoints and customisable emails. This bundle makes use of the original `PasswordBundle` to allow-it plug-in into your X-stack.

## Install

```typescript
import { XPasswordBundle } from "@kaviar/x-password-bundle";

// For this to work you need the following: SecurityBundle, ApolloBundle, ApolloSecurityBundle, SecurityMongoBundle, XBundle

kernel.addBundle(new XPasswordBundle());
```

## Emails

We have the following emails setup:

1. `Welcome` once that user has registered
2. `Verify Email` when we want to verify the user's email
3. `Forgot Password` to receive the reset password link on your email
4. `Reset Password Confirmation` after you've reset your password you'll get a confirmation.

All these emails can be overriden like this:

### Customise

```tsx
import { IReactEmailTemplate } from "@kaviar/email-bundle";
import { IWelcomeEmailProps } from "@kaviar/x-password-bundle";

export const CustomWelcomeEmail: IReactEmailTemplate<IWelcomeEmailProps> = (
  props
) => (
  <div>
    <p>Hello {props.name},</p>
    Go here: <a href={props.welcomeUrl}>{props.welcomeUrl}</a>
    <p>
      Regards, <br />
      {props.regardsName}
    </p>
  </div>
);

new XPasswordBundle({
  emails: {
    templates: {
      welcome: CustomWelcomeEmail,
      verifyEmail: "...",
      forgotPassword: "...",
      resetPasswordConfirmation: "...",
    },
  },
});
```

### Urls

You can also modify the paths based on the X-Framework application url:

```ts
new XPasswordBundle({
  emails: {
    paths: {
      welcomePath: "/welcome",
      resetPasswordPath: "/reset-password/:token",
      verifyEmailPath: "/verify-email/:token",
    },
  },
});
```

### Other Configuration

```ts
new XPasswordBundle({
  emails: {
    applicationName: "My App";
    regardsName: "My App Team";
    // Sometimes the email verification can be the welcome one
    // In that case, don't send an welcome email and customise your email verification one
    sendEmailVerification: true;
    sendWelcomeEmail: true;
  }
  // Don't allow users with email unverified to login:
  requiresEmailVerificationBeforeLoggingIn: false,
})
```

## Mutations & Queries

Once you added this bundle, you will see some mutations appearing in your GraphQL docs, these can be toggled on/off using this:

```ts
// The configuration is:
export interface IXPasswordBundleConfig {
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
```

## Override Logic

You can modify behavior of your mutation resolvers by creating your own `XPasswordService`:

```ts
import { RegistrationInput, XPasswordService } from "@kaviar/x-password-bundle";

class MyXPasswordService extends XPasswordService {
  register(input: RegistrationInput) {
    // Do your thingie here.
    // Or you can disable the mutation, and simply implement your own.
  }
}

// ...
new XPasswordBundle({
  services: {
    XPasswordService: MyXPasswordService,
  },
});
```
