import { foundationToken } from "../../foundationToken";
import avatarTokens from "../Avatar/token";
import { AvatarSize } from "../Avatar/types";

const avatarGroupTokens = {
  container: {
    spacing: {
      [AvatarSize.SM]: foundationToken.spacing[6],
      [AvatarSize.MD]: foundationToken.spacing[8],
      [AvatarSize.LG]: foundationToken.spacing[12],
      [AvatarSize.XL]: foundationToken.spacing[16],
    },
  },
  avatar: {
    // Using the existing Avatar tokens for styling the avatars themselves
    stacking: {
      zIndex: 1, // Base z-index for stacking
    },
    selected: {
      ringColor: foundationToken.colors.primary[500],
      ringWidth: "2px",
      ringOffset: "2px",
    },
    border: {
      width: "2px",
      color: foundationToken.colors.gray[0],
    },
  },
  overflowCounter: {
    background: {
      default: foundationToken.colors.gray[900],
      hover: foundationToken.colors.gray[800],
      active: foundationToken.colors.gray[950],
    },
    text: {
      color: foundationToken.colors.gray[50],
    },
    border: {
      width: "2px",
      color: foundationToken.colors.gray[0],
    },
    // Reuse avatar sizing for consistency
    sizes: avatarTokens.sizes,
    // Reuse avatar shapes for consistency
    shapes: avatarTokens.shapes,
  },
  menu: {
    spacing: foundationToken.spacing[4], // Spacing between menu and avatars
    zIndex: 50, // z-index for the menu
  },
};

export default avatarGroupTokens;
