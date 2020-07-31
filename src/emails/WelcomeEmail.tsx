import React from "react";
import { IReactEmailTemplate } from "@kaviar/email-bundle";

export interface IWelcomeEmailProps {
  username: string;
  name: string;
  applicationName: string;
}

export const WelcomeEmail: IReactEmailTemplate<IWelcomeEmailProps> = (
  props
) => (
  <div>
    <p>Hello {props.name},</p>
    <p>Welcome to {props.applicationName}!</p>
    <p>
      Regards, <br />
      Kaviar Team
    </p>
  </div>
);
