"use client";

import type React from "react";
import { toast as sonnerToast, Toaster as Snackbar } from "sonner";
import { Info, X } from "lucide-react";
import { FOUNDATION_THEME } from "../../tokens";
import Block from "../Primitives/Block/Block";
import Text, { VariantType } from "../Text/Text";
import PrimitiveButton from "../Primitives/PrimitiveButton/PrimitiveButton";
import { AddToastOptions, CustomToastProps, SnackbarVariant } from "./types";
import snackbarTokens from "./snackbar.tokens";

const StyledToast: React.FC<CustomToastProps> = ({
  header,
  description,
  variant,
  onClose,
  actionButton,
}) => {
  const getIconColor = () => {
    switch (variant) {
      case "info":
        return snackbarTokens.icon.color.info;
      case "success":
        return snackbarTokens.icon.color.success;
      case "warning":
        return snackbarTokens.icon.color.warning;
      case "error":
        return snackbarTokens.icon.color.error;
    }
  };

  return (
    <Block
      backgroundColor={snackbarTokens.container.backgroundColor}
      borderRadius={snackbarTokens.container.borderRadius}
      padding={snackbarTokens.container.padding}
      minWidth={snackbarTokens.container.minWidth}
      maxWidth={snackbarTokens.container.maxWidth}
      boxShadow={snackbarTokens.container.boxShadow}
    >
      <Block
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        gap={snackbarTokens.header.layout.gap}
        marginBottom={snackbarTokens.header.layout.marginBottom}
      >
        <Block
          display="flex"
          alignItems="center"
          gap={snackbarTokens.header.layout.iconGap}
        >
          <Info size={16} color={getIconColor()} />
          <Text
            variant={snackbarTokens.header.text.variant as VariantType}
            color={snackbarTokens.header.text.color}
          >
            {header}
          </Text>
        </Block>
        <PrimitiveButton
          backgroundColor="transparent"
          contentCentered
          onClick={onClose}
        >
          <X size={16} color={FOUNDATION_THEME.colors["gray"][0]} />
        </PrimitiveButton>
      </Block>

      <Block
        paddingLeft={snackbarTokens.description.layout.paddingLeft}
        display="flex"
        flexDirection="column"
        gap={snackbarTokens.description.layout.gap}
      >
        <Text
          variant={snackbarTokens.description.text.variant}
          color={snackbarTokens.description.text.color}
        >
          {description}
        </Text>
        {actionButton && (
          <PrimitiveButton
            backgroundColor="transparent"
            contentCentered
            paddingX={snackbarTokens.actionButton.layout.paddingX}
            color={snackbarTokens.actionButton.text.color}
            onClick={actionButton.onClick}
          >
            <Text
              variant={snackbarTokens.actionButton.text.variant}
              color={snackbarTokens.actionButton.text.color}
            >
              {actionButton.label}
            </Text>
          </PrimitiveButton>
        )}
      </Block>
    </Block>
  );
};

export const addSnackbar = ({
  header,
  description,
  variant = SnackbarVariant.INFO,
  onClose,
  actionButton,
}: AddToastOptions) => {
  return sonnerToast.custom((t) => (
    <StyledToast
      header={header}
      description={description}
      variant={variant}
      onClose={() => {
        sonnerToast.dismiss(t);
        onClose?.();
      }}
      actionButton={actionButton}
    />
  ));
};

// Export the Toaster component
export default Snackbar;
