import { Bundle } from "@kaviar/core";
import { IXPasswordBundleConfig } from "./defs";
import { X_PASSWORD_SETTINGS } from "./constants";

export class XPasswordBundle extends Bundle<IXPasswordBundleConfig> {
  protected defaultConfig: Partial<IXPasswordBundleConfig> = {
    emails: {
      templates: {},
      paths: {
        welcomePath: "/",
        resetPasswordPath: "/reset-password/:token",
      },
      applicationName: "Kaviar",
      regardsName: "Kaviar Team",
    },
  };

  async prepare() {
    this.container.set(X_PASSWORD_SETTINGS, this.config);
  }
}
