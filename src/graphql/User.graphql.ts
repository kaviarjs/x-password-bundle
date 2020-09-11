export default /* GraphQL */ `
  type User {
    _id: ID!
    profile: UserProfile
  }

  type UserProfile {
    name: String!
  }
`;
