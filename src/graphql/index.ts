import { ILoadOptions } from "@kaviar/graphql-bundle";
import resolversCreator from "./mutations.resolvers";
import typeDefsCreator from "./mutations.graphql";
import { IXPasswordBundleConfig } from "../defs";

export function createGraphQLModule(
  config: IXPasswordBundleConfig
): ILoadOptions {
  return {
    typeDefs: [typeDefsCreator(config)],
    resolvers: resolversCreator(config),
  };
}
