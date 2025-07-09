import { foundationToken } from "../../foundationToken";
import { ButtonSize } from "../Button/types";

const buttonGroupTokens = {
  container: {
    display: "inline-flex",
    alignItems: "center",
  },
  spacing: {
    [ButtonSize.SMALL]: foundationToken.spacing[12],
    [ButtonSize.MEDIUM]: foundationToken.spacing[16],
    [ButtonSize.LARGE]: foundationToken.spacing[16],
  },
  borderRadius: foundationToken.borderRadius[10],
  stacked: {
    positions: {
      first: {
        borderTopRightRadius: "0",
        borderBottomRightRadius: "0",
        borderRight: "0",
      },
      middle: {
        borderRadius: "0",
        borderRight: "0",
      },
      last: {
        borderTopLeftRadius: "0",
        borderBottomLeftRadius: "0",
      },
    },
  },
};

export default buttonGroupTokens;
