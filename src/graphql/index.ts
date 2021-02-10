import { ILoadOptions } from "@kaviar/graphql-bundle";
import mutationsResolversCreator from "./mutations.resolvers";
import mutationsTypeDefsCreator from "./mutations.graphql";
import queriesResolversCreator from "./queries.resolvers";
import queriesTypeDefsCreator from "./queries.graphql";
import { IXPasswordBundleConfig } from "../defs";

export function createGraphQLModule(
  config: IXPasswordBundleConfig
): ILoadOptions {
  return {
    typeDefs: [
      mutationsTypeDefsCreator(config),
      queriesTypeDefsCreator(config),
    ],
    resolvers: [
      mutationsResolversCreator(config),
      queriesResolversCreator(config),
    ],
  };
}
