import Block from "../Primitives/Block/Block";
import { FOUNDATION_THEME } from "../../tokens";
import PrimitiveLink from "../Primitives/PrimitiveLink";
import { Ellipsis } from "lucide-react";
import PrimitiveButton from "../Primitives/PrimitiveButton/PrimitiveButton";
import PrimitiveText from "../Primitives/PrimitiveText/PrimitiveText";
import { BreadcrumbTokenType } from "./breadcrumb.tokens";
import { useComponentToken } from "../../context/useComponentToken";
import { BreadcrumbItemType } from "./types";

const MAX_ITEMS = 4;

const BreadcrumbItem = ({
  item,
  isActive,
}: {
  item: BreadcrumbItemType;
  isActive: boolean;
}) => {
  const breadcrumbTokens = useComponentToken(
    "BREADCRUMB",
  ) as BreadcrumbTokenType;
  return (
    <>
      <PrimitiveLink
        padding={breadcrumbTokens.item.padding}
        display="flex"
        height={"full"}
        gap={breadcrumbTokens.item.gap}
        color={breadcrumbTokens.item.color[isActive ? "active" : "inactive"]}
        href={isActive ? undefined : item.href}
        textDecoration="none"
      >
        {item.leftSlot && <Block contentCentered>{item.leftSlot}</Block>}
        <PrimitiveText
          as="span"
          fontWeight={
            breadcrumbTokens.item.fontWeight[isActive ? "active" : "inactive"]
          }
          fontSize={
            breadcrumbTokens.item.fontSize[isActive ? "active" : "inactive"]
          }
        >
          {item.label}
        </PrimitiveText>
        {item.rightSlot && <Block contentCentered>{item.rightSlot}</Block>}
      </PrimitiveLink>
      {!isActive && <Block color={FOUNDATION_THEME.colors.gray[400]}>/</Block>}
    </>
  );
};

const Breadcrumb = ({ items }: { items: BreadcrumbItemType[] }) => {
  const breadcrumbTokens = useComponentToken(
    "BREADCRUMB",
  ) as BreadcrumbTokenType;
  if (items.length === 0) return null;

  const baseItem = items[0];
  const shouldShowMenu = items.length > MAX_ITEMS;

  const breadcrumbMenuItems = shouldShowMenu
    ? items.slice(1, items.length - 3)
    : [];

  const menuItems = breadcrumbMenuItems.map((item) => {
    return {
      label: item.label,
      href: item.href,
      leftSlot: item.leftSlot,
      rightSlot: item.rightSlot,
    };
  });

  const restItems = shouldShowMenu ? items.slice(-3) : items.slice(1);

  return (
    <Block
      width={"full"}
      display="flex"
      height={breadcrumbTokens.height}
      alignItems="center"
    >
      {baseItem && (
        <BreadcrumbItem
          item={baseItem}
          key={`breadcrumb-item-${0}`}
          isActive={items.length == 1 ? true : false}
        />
      )}
      {menuItems.length > 0 && (
        <>
          <PrimitiveButton
            background={"none"}
            borderRadius={FOUNDATION_THEME.border.radius[6]}
            // TODO: add a menu when menu items are fixed
            // _hover={{
            //   outline: `1px solid ${FOUNDATION_THEME.colors.gray[400]}`,
            // }}
            contentCentered
            color={FOUNDATION_THEME.colors.gray[400]}
            size={24}
          >
            <Ellipsis
              size={FOUNDATION_THEME.unit[14]}
              color={FOUNDATION_THEME.colors.gray[400]}
            />
          </PrimitiveButton>
          <Block color={FOUNDATION_THEME.colors.gray[400]}>/</Block>
        </>
      )}
      {restItems.map((item, index) => (
        <BreadcrumbItem
          key={`breadcrumb-item-${index}`}
          item={item}
          isActive={index === restItems.length - 1}
        />
      ))}
    </Block>
  );
};

Breadcrumb.displayName = "Breadcrumb";

export default Breadcrumb;
