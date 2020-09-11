# X Password Bundle

- Ensure there is a `me` query that can properly fetch username, email, isEmailVerified, name, etc

```typescript
new XPasswordBundle({
  emails: {
    emailCheck: EmailCheck
    welcome: WelcomeEmail,
    forgotPassword: ForgotPasswordEmail,
    resetPassword,
    accountLockedInvalidPasswordAttempts,
    accountDisabled,
  },
  graphql: {
    queries: {
    mutations: {
      register,
      login,
      resetPassword,
      forgotPassword,
      verifyEmail,
    },
  },
});
```

## Support

This package is part of [KaviarJS](https://www.kaviarjs.com) family. If you enjoy this work please show your support by starring [the main package](https://github.com/kaviarjs/kaviar). If not, let us know what can we do to deserve it, [our feedback form is here](https://forms.gle/DTMg5Urgqey9QqLFA)
