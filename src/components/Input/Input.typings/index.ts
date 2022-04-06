import React, { InputHTMLAttributes } from "react";

import { IClassNameProps } from "utils/core";

export interface IInputProps extends IClassNameProps {
  InputIcon?: React.FunctionComponent<React.SVGProps<SVGSVGElement> & { title?: string }>;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
  onChange?(): void;
}
