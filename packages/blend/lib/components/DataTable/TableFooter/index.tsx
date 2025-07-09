import { forwardRef } from "react";
import { TableFooterProps } from "./types";
import { DataTablePagination } from "../DataTablePagination";
import Block from "../../Primitives/Block/Block";
import { TableTokenType } from "../dataTable.tokens";
import { useComponentToken } from "../../../context/useComponentToken";

const TableFooter = forwardRef<HTMLDivElement, TableFooterProps>(
  (
    {
      pagination,
      currentPage,
      pageSize,
      totalRows,
      isLoading,
      onPageChange,
      onPageSizeChange,
    },
    ref,
  ) => {
    const tableToken = useComponentToken("TABLE") as TableTokenType;

    if (!pagination) {
      return null;
    }

    return (
      <Block
        ref={ref}
        style={{
          ...tableToken.dataTable.table.footer,
        }}
      >
        <DataTablePagination
          currentPage={currentPage}
          pageSize={pageSize}
          totalRows={totalRows}
          pageSizeOptions={pagination.pageSizeOptions}
          isLoading={isLoading}
          onPageChange={onPageChange}
          onPageSizeChange={onPageSizeChange}
        />
      </Block>
    );
  },
);

TableFooter.displayName = "TableFooter";

export default TableFooter;
