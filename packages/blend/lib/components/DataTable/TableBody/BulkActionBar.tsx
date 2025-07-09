import { forwardRef } from "react";
import { Download, X } from "lucide-react";
import Button from "../../Button/Button";
import { ButtonSize, ButtonType } from "../../Button/types";
import Block from "../../Primitives/Block/Block";
import PrimitiveText from "../../Primitives/PrimitiveText/PrimitiveText";
import { FOUNDATION_THEME } from "../../../tokens";
import { useComponentToken } from "../../../context/useComponentToken";
import { TableTokenType } from "../dataTable.tokens";

export type BulkActionBarProps = {
  selectedCount: number;
  onExport: () => void;
  onDeselectAll: () => void;
  customActions?: React.ReactNode;
};

const BulkActionBar = forwardRef<HTMLDivElement, BulkActionBarProps>(
  ({ selectedCount, onExport, onDeselectAll, customActions }, ref) => {
    const tableToken = useComponentToken("TABLE") as TableTokenType;
    if (selectedCount === 0) return null;

    return (
      <Block
        ref={ref}
        position="absolute"
        display="flex"
        alignItems="center"
        borderRadius={tableToken.dataTable.bulkActions.borderRadius}
        color={tableToken.dataTable.bulkActions.color}
        backgroundColor={tableToken.dataTable.bulkActions.backgroundColor}
        zIndex={tableToken.dataTable.bulkActions.zIndex}
        gap={tableToken.dataTable.bulkActions.gap}
        border={tableToken.dataTable.bulkActions.border}
        padding={tableToken.dataTable.bulkActions.padding}
        boxShadow={tableToken.dataTable.bulkActions.boxShadow}
        minWidth={tableToken.dataTable.bulkActions.minWidth}
        style={{
          top: tableToken.dataTable.bulkActions.top,
          left: tableToken.dataTable.bulkActions.left,
          transform: tableToken.dataTable.bulkActions.transform,
        }}
      >
        <PrimitiveText
          style={{
            fontSize: tableToken.dataTable.bulkActions.selectText.fontSize,
            fontWeight: tableToken.dataTable.bulkActions.selectText.fontWeight,
            flex: tableToken.dataTable.bulkActions.selectText.flex,
          }}
        >
          {selectedCount} selected
        </PrimitiveText>

        <Block
          display="flex"
          alignItems="center"
          gap={FOUNDATION_THEME.unit[8]}
        >
          <Button
            buttonType={ButtonType.SECONDARY}
            leadingIcon={Download}
            size={ButtonSize.SMALL}
            onClick={onExport}
          >
            Export
          </Button>

          {customActions}

          <Button
            buttonType={ButtonType.SECONDARY}
            leadingIcon={X}
            size={ButtonSize.SMALL}
            onClick={onDeselectAll}
          />
        </Block>
      </Block>
    );
  },
);

BulkActionBar.displayName = "BulkActionBar";

export default BulkActionBar;
