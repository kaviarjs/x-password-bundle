import React from "react";
import { IReactEmailTemplate } from "@kaviar/email-bundle";

export interface IResetPasswordEmailProps {
  username: string;
  name: string;
}

export const ResetPasswordEmail: IReactEmailTemplate<IResetPasswordEmailProps> = (
  props
) => (
  <div>
    <p>Hello {props.name},</p>
    <p>Your password has been reset: {props.username}.</p>
    <p>If this was not you, please inform us as soon as possible.</p>
    <p>
      Regards, <br />
      Kaviar Team
    </p>
  </div>
);
