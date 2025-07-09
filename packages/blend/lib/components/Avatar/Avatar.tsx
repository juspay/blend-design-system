import { forwardRef, useState } from "react";
import { AvatarProps, AvatarSize, AvatarShape } from "./types";
import {
  StyledAvatarContainer,
  StyledAvatarImage,
  StyledAvatarFallback,
  StyledAvatarIndicator,
  StyledAvatarWrapper,
  StyledAvatarLeadingSlot,
  StyledAvatarTrailingSlot,
} from "./StyledAvatar";
import { getInitialsFromText } from "./avatarUtils";

const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      src,
      alt = "",
      fallback,
      size = AvatarSize.MD,
      shape = AvatarShape.CIRCULAR,
      online = false,
      leadingSlot,
      trailingSlot,
      ...props
    },
    ref,
  ) => {
    const [imageError, setImageError] = useState(false);
    const hasImage = src && !imageError;

    const renderFallback = () => {
      if (fallback) {
        return typeof fallback === "string"
          ? fallback.substring(0, 2)
          : fallback;
      }

      return getInitialsFromText(alt);
    };

    const renderContent = () => (
      <StyledAvatarContainer
        ref={ref}
        $size={size}
        $shape={shape}
        $hasImage={!!hasImage}
        {...props}
      >
        {hasImage ? (
          <StyledAvatarImage
            src={src}
            alt={alt}
            onError={() => setImageError(true)}
          />
        ) : (
          <StyledAvatarFallback aria-hidden="true">
            {renderFallback()}
          </StyledAvatarFallback>
        )}

        {/* Visually hidden text for screen readers */}
        <span
          style={{
            position: "absolute",
            width: "1px",
            height: "1px",
            padding: 0,
            margin: "-1px",
            overflow: "hidden",
            clip: "rect(0, 0, 0, 0)",
            whiteSpace: "nowrap",
            borderWidth: 0,
          }}
        >
          {alt}
        </span>

        {online && <StyledAvatarIndicator $size={size} aria-hidden="true" />}
      </StyledAvatarContainer>
    );

    // If we have slots, use the wrapper
    if (leadingSlot || trailingSlot) {
      return (
        <StyledAvatarWrapper>
          {leadingSlot && (
            <StyledAvatarLeadingSlot>{leadingSlot}</StyledAvatarLeadingSlot>
          )}
          {renderContent()}
          {trailingSlot && (
            <StyledAvatarTrailingSlot>{trailingSlot}</StyledAvatarTrailingSlot>
          )}
        </StyledAvatarWrapper>
      );
    }

    // Otherwise just return the avatar
    return renderContent();
  },
);

Avatar.displayName = "Avatar";

export default Avatar;
