import { ReactElement } from "react";
import { ButtonV2Props } from "../ButtonV2";

export type ButtonGroupV2Props = {
  stacked?: boolean;
  children: ReactElement<ButtonV2Props> | ReactElement<ButtonV2Props>[];
};
