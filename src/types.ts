export default () => {
  return `
    type Query {
      me: User
    }

    type Mutation {
      register(input: RegistrationInput!): RegistrationResponse!
      changePassword(input: ChangePasswordInput!): Boolean
      login(input: LoginInput!): LoginResponse!
      resetPassword(input: ResetPasswordInput!): Boolean
      forgotPassword(input: ForgotPasswordInput!): ForgotPasswordResponse!
      verifyEmail(input: VerifyEmailInput!): Boolean
    }

    input RegistrationInput {
      name: String!
      email: String!
      password: String!
    }

    type RegistrationResponse {
      token: String!
    }

    input ChangePasswordInput {
      oldPassword: String!
      newPassword: String!
    }

    input ResetPasswordInput {
      token: String!
      newPassword: String!
    }

    input LoginInput {
      username: String!
      password: String!
    }

    type LoginResponse {
      token: String!
    }

    input ForgotPasswordInput {
      username: String!
    }    

    type ForgotPasswordResponse {
      token: String!
    }

    input VerifyEmailInput {
      email: String!
      token: String!
    }
  `;
};
