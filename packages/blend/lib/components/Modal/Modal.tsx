import { forwardRef, useCallback } from "react";
import { X } from "lucide-react";
import Block from "../Primitives/Block/Block";
import useScrollLock from "../../hooks/useScrollLock";
import { ModalProps } from "./types";
import { FOUNDATION_THEME } from "../../tokens";
import { ModalTokensType } from "./modal.tokens";
import Text from "../Text/Text";
import { ButtonSubTypeV2, ButtonTypeV2, ButtonV2 } from "../ButtonV2";
import { useComponentToken } from "../../context/useComponentToken";

const ModalHeader = ({
  title,
  subtitle,
  onClose,
  showCloseButton,
  headerRightSlot,
  showDivider,
}: {
  title?: string;
  subtitle?: string;
  onClose: () => void;
  showCloseButton?: boolean;
  headerRightSlot?: React.ReactNode;
  showDivider?: boolean;
}) => {
  const modalTokens = useComponentToken("MODAL") as ModalTokensType;
  if (!title && !subtitle) return null;

  return (
    <Block
      display="flex"
      justifyContent="space-between"
      alignItems="flex-start"
      padding={modalTokens.headerContainer.padding}
      flexShrink={0}
      overflow="auto"
      maxHeight="20vh"
      gap={FOUNDATION_THEME.unit[16]}
      borderBottom={
        showDivider ? modalTokens.headerContainer.borderBottom : undefined
      }
    >
      <Block
        display="flex"
        flexDirection="column"
        flexGrow={1}
        gap={FOUNDATION_THEME.unit[4]}
      >
        <Block
          display="flex"
          alignItems="center"
          gap={FOUNDATION_THEME.unit[8]}
        >
          {title && (
            <Text
              variant="heading.sm"
              fontWeight={600}
              color={modalTokens.headerContainer.header.color}
            >
              {title}
            </Text>
          )}
          {headerRightSlot}
        </Block>
        {subtitle && (
          <Text
            variant="code.lg"
            color={modalTokens.headerContainer.subtitle.color}
            fontWeight={400}
          >
            {subtitle}
          </Text>
        )}
      </Block>
      {showCloseButton && (
        <ButtonV2
          subType={ButtonSubTypeV2.INLINE}
          buttonType={ButtonTypeV2.SECONDARY}
          leadingIcon={<X size={16} />}
          onClick={onClose}
          // ariaLabel="Close"
        />
      )}
    </Block>
  );
};

const ModalFooter = ({
  primaryAction,
  secondaryAction,
  showDivider,
}: {
  primaryAction?: ModalProps["primaryAction"];
  secondaryAction?: ModalProps["secondaryAction"];
  showDivider?: boolean;
}) => {
  const modalTokens = useComponentToken("MODAL") as ModalTokensType;
  if (!primaryAction && !secondaryAction) return null;

  return (
    <Block
      display="flex"
      backgroundColor={modalTokens.footerContainer.backgroundColor}
      justifyContent={modalTokens.footerContainer.alignItems}
      gap={modalTokens.footerContainer.gap}
      padding={modalTokens.footerContainer.padding}
      flexShrink={0}
      borderTop={
        showDivider ? modalTokens.footerContainer.borderTop : undefined
      }
      borderRadius={modalTokens.footerContainer.borderRadius}
    >
      {secondaryAction && (
        <ButtonV2
          buttonType={secondaryAction.buttonType || ButtonTypeV2.SECONDARY}
          text={secondaryAction.text}
          onClick={secondaryAction.onClick}
          disabled={secondaryAction.disabled}
          subType={secondaryAction.subType}
          size={secondaryAction.size}
          leadingIcon={secondaryAction.leadingIcon}
          trailingIcon={secondaryAction.trailingIcon}
          loading={secondaryAction.loading}
        />
      )}
      {primaryAction && (
        <ButtonV2
          buttonType={primaryAction.buttonType || ButtonTypeV2.PRIMARY}
          text={primaryAction.text}
          onClick={primaryAction.onClick}
          disabled={primaryAction.disabled}
          subType={primaryAction.subType}
          size={primaryAction.size}
          leadingIcon={primaryAction.leadingIcon}
          trailingIcon={primaryAction.trailingIcon}
          loading={primaryAction.loading}
        />
      )}
    </Block>
  );
};

const Modal = forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      isOpen,
      onClose,
      title,
      subtitle,
      children,
      primaryAction,
      secondaryAction,
      className,
      showCloseButton = true,
      closeOnBackdropClick = true,
      headerRightSlot,
      showDivider = true,
    },
    ref,
  ) => {
    const modalTokens = useComponentToken("MODAL") as ModalTokensType;
    useScrollLock(isOpen);

    const handleBackdropClick = useCallback(() => {
      if (closeOnBackdropClick) {
        onClose();
      }
    }, [closeOnBackdropClick, onClose]);

    if (!isOpen) return null;

    return (
      <Block
        position="fixed"
        inset={0}
        zIndex={modalTokens.zIndex}
        display="flex"
        alignItems="center"
        justifyContent="center"
        overflow="auto"
        padding={FOUNDATION_THEME.unit[16]}
      >
        <Block
          onClick={handleBackdropClick}
          display="flex"
          alignItems="center"
          justifyContent="center"
          position="fixed"
          inset={0}
          backgroundColor={FOUNDATION_THEME.colors.gray[700]}
          opacity={0.5}
          pointerEvents="auto"
          role="presentation"
          aria-hidden="true"
        />

        <Block
          ref={ref}
          className={className}
          display="flex"
          flexDirection="column"
          position="relative"
          backgroundColor={FOUNDATION_THEME.colors.gray[0]}
          maxWidth="500px"
          maxHeight="500px"
          borderRadius={FOUNDATION_THEME.border.radius[12]}
          boxShadow={FOUNDATION_THEME.shadows.xs}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <ModalHeader
            title={title}
            subtitle={subtitle}
            onClose={onClose}
            showCloseButton={showCloseButton}
            headerRightSlot={headerRightSlot}
            showDivider={showDivider}
          />

          <Block
            padding={modalTokens.bodyContainer.padding}
            overflow="auto"
            flexGrow={1}
          >
            {children}
          </Block>

          <ModalFooter
            primaryAction={primaryAction}
            secondaryAction={secondaryAction}
            showDivider={showDivider}
          />
        </Block>
      </Block>
    );
  },
);

Modal.displayName = "Modal";

export default Modal;
