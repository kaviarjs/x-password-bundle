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
