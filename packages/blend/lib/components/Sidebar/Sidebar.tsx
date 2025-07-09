import React, { forwardRef, useState } from "react";
import { PanelsTopLeft } from "lucide-react";
import styled from "styled-components";
import Block from "../Primitives/Block/Block";
import Text from "../Text/Text";
import Button from "../Button/Button";
import { ButtonSize, ButtonSubType, ButtonType } from "../Button";
import Directory from "../Directory/Directory";
import { SidebarProps } from "./types";
import GradientBlur from "../GradientBlur/GradientBlur";
import { FOUNDATION_THEME } from "../../tokens";
import { Select } from "../Select";
import { SelectMenuVariant } from "../Select/types";

const DirectoryContainer = styled(Block)`
  flex: 1;
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const MainContentContainer = styled(Block)`
  width: 100%;
  height: 100%;
  background-color: ${FOUNDATION_THEME.colors.gray[0]};
  position: relative;
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const Sidebar = forwardRef<HTMLDivElement, SidebarProps>(
  (
    {
      children,
      data,
      topbar,
      activeTenant,
      setActiveTenant,
      activeMerchant,
      setActiveMerchant,
      tenants,
      merchants,
      footer,
    },
    ref,
  ) => {
    const [isExpanded, setIsExpanded] = useState<boolean>(true);

    return (
      <Block
        ref={ref}
        width="100%"
        height="100%"
        display="flex"
        backgroundColor={FOUNDATION_THEME.colors.gray[25]}
      >
        <Block
          maxWidth={isExpanded ? "300px" : "0"}
          width="100%"
          borderRight={
            isExpanded
              ? `1px solid ${FOUNDATION_THEME.colors.gray[200]}`
              : "none"
          }
          display="flex"
          style={{
            willChange: "transform",
            transitionDuration: "150ms",
            animation: "slide-in-from-left 0.3s ease-out",
          }}
        >
          {isExpanded && (
            <>
              {/* TENANTS SIDE BAR _ SECONDARY SIDE BAR */}
              <Block
                width="fit-content"
                height="100%"
                borderRight={`1px solid ${FOUNDATION_THEME.colors.gray[200]}`}
                backgroundColor={FOUNDATION_THEME.colors.gray[25]}
                display="flex"
                flexDirection="column"
                gap="16px"
                alignItems="center"
                padding="10px"
              >
                {tenants &&
                  tenants.map((tenant, index) => (
                    // TODO: Add theme config
                    <Block
                      border="none"
                      backgroundColor="transparent"
                      width="32px"
                      height="32px"
                      borderRadius={FOUNDATION_THEME.border.radius[4]}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      cursor="pointer"
                      style={{
                        outline: `1px solid ${
                          activeTenant === tenant.label
                            ? FOUNDATION_THEME.colors.primary[500]
                            : FOUNDATION_THEME.colors.gray[150]
                        }`,
                        transitionDuration: "75ms",
                      }}
                      onClick={() => setActiveTenant?.(tenant.label)}
                      key={index}
                    >
                      {tenant.icon}
                    </Block>
                  ))}
              </Block>

              {/* PRIMARY SIDE BAR */}
              <Block
                width="100%"
                height="100%"
                display="flex"
                flexDirection="column"
                position="relative"
              >
                {/* MERCHANT SWITCHER  */}
                <Block
                  width="100%"
                  height="64px"
                  position="sticky"
                  top="0"
                  zIndex="10"
                  backgroundColor={FOUNDATION_THEME.colors.gray[25]}
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  gap="12px"
                  padding="0 8px"
                >
                  {merchants.length > 1 ? (
                    <Block width="100%">
                      <Select
                        helpIconText=""
                        required={false}
                        subLabel=""
                        hintText=""
                        label=""
                        placeholder="Select Merchant"
                        variant={SelectMenuVariant.CONTAINER}
                        items={[
                          {
                            items: merchants.map((merchant) => ({
                              label: merchant.label,
                              value: merchant.label,
                              slot1: merchant.icon,
                            })),
                          },
                        ]}
                        selected={activeMerchant || ""}
                        onSelectChange={(value) => {
                          if (setActiveMerchant && typeof value === "string") {
                            setActiveMerchant(value);
                          }
                        }}
                      />
                    </Block>
                  ) : (
                    <Text
                      variant="body.sm"
                      fontWeight={400}
                      color={FOUNDATION_THEME.colors.gray[600]}
                    >
                      {activeMerchant}
                    </Text>
                  )}
                  <Button
                    style={{ flexShrink: 0 }}
                    onClick={() => setIsExpanded(!isExpanded)}
                    buttonType={ButtonType.SECONDARY}
                    subType={ButtonSubType.ICON_ONLY}
                    size={ButtonSize.SMALL}
                    leadingIcon={PanelsTopLeft}
                  />
                </Block>

                {/* DIRECTORY */}
                <DirectoryContainer>
                  <Directory directoryData={data} className="pb-20" />
                </DirectoryContainer>

                <SidebarFooter footer={footer} />
              </Block>
            </>
          )}
        </Block>

        <MainContentContainer>
          {/* TOPBAR  */}
          <Block
            width="100%"
            height="64px"
            position="sticky"
            top="0"
            zIndex="10"
            borderBottom={`1px solid ${FOUNDATION_THEME.colors.gray[200]}`}
            backgroundColor={FOUNDATION_THEME.colors.gray[0]}
            display="flex"
            alignItems="center"
            gap="16px"
            padding="0 32px"
          >
            {isExpanded === false && (
              <Block
                display="flex"
                alignItems="center"
                gap="16px"
                width="fit-content"
                flexShrink={0}
              >
                <Button
                  onClick={() => setIsExpanded(!isExpanded)}
                  style={{ flexShrink: 0 }}
                  buttonType={ButtonType.SECONDARY}
                  subType={ButtonSubType.ICON_ONLY}
                  size={ButtonSize.SMALL}
                  leadingIcon={PanelsTopLeft}
                />
                {merchants.length > 1 ? (
                  <Select
                    helpIconText=""
                    required={false}
                    subLabel=""
                    hintText=""
                    label=""
                    placeholder="Select Merchant"
                    variant={SelectMenuVariant.CONTAINER}
                    items={[
                      {
                        items: merchants.map((merchant) => ({
                          label: merchant.label,
                          value: merchant.label,
                          slot1: merchant.icon,
                        })),
                      },
                    ]}
                    selected={activeMerchant || ""}
                    onSelectChange={(value) => {
                      if (setActiveMerchant && typeof value === "string") {
                        setActiveMerchant(value);
                      }
                    }}
                  />
                ) : (
                  <Text
                    variant="body.sm"
                    fontWeight={400}
                    color={FOUNDATION_THEME.colors.gray[600]}
                  >
                    {activeMerchant}
                  </Text>
                )}
              </Block>
            )}
            <Block flexGrow={1}>{topbar}</Block>
          </Block>

          <Block>{children}</Block>
        </MainContentContainer>
      </Block>
    );
  },
);

const SidebarFooter = ({ footer }: { footer: React.ReactNode }) => {
  return (
    <Block
      width="100%"
      backgroundColor={FOUNDATION_THEME.colors.gray[25]}
      height="64px"
      position="sticky"
      bottom="0"
      zIndex="10"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      gap="12px"
      padding="0 8px"
      borderTop={`1px solid ${FOUNDATION_THEME.colors.gray[200]}`}
    >
      <Block
        aria-hidden={true}
        position="absolute"
        left="0"
        top="-65px"
        right="0"
        height="64px"
        style={{ transform: "rotate(180deg)" }}
        pointerEvents="none"
        zIndex="10"
      >
        <GradientBlur />
      </Block>
      {footer}
    </Block>
  );
};

Sidebar.displayName = "Sidebar";

export default Sidebar;
