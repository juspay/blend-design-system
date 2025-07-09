import { useMemo } from "react";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { FOUNDATION_THEME } from "../../tokens";
import Block from "../Primitives/Block/Block";
import PrimitiveText from "../Primitives/PrimitiveText/PrimitiveText";
import PrimitiveButton from "../Primitives/PrimitiveButton/PrimitiveButton";
import Menu from "../Menu/Menu";
import { MenuAlignment } from "../Menu/types";
import { TableTokenType } from "./dataTable.tokens";
import { useComponentToken } from "../../context/useComponentToken";

type DataTablePaginationProps = {
  currentPage: number;
  pageSize: number;
  totalRows: number;
  pageSizeOptions: number[];
  isLoading?: boolean;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
};

export function DataTablePagination({
  currentPage,
  pageSize,
  totalRows,
  pageSizeOptions,
  isLoading = false,
  onPageChange,
  onPageSizeChange,
}: DataTablePaginationProps) {
  const tableToken = useComponentToken("TABLE") as TableTokenType;

  const totalPages = Math.ceil(totalRows / pageSize);

  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);

      if (currentPage <= 3) {
        endPage = Math.min(totalPages - 1, 4);
      }

      if (currentPage >= totalPages - 2) {
        startPage = Math.max(2, totalPages - 3);
      }

      if (startPage > 2) {
        pages.push("...");
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (endPage < totalPages - 1) {
        pages.push("...");
      }

      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const pageNumbers = useMemo(getPageNumbers, [currentPage, totalPages]);

  const pageSizeMenuItems = [
    {
      groupLabel: "Rows per page",
      showSeparator: false,
      items: pageSizeOptions.map((size) => ({
        label: `${size}`,
        value: String(size),
        onClick: () => onPageSizeChange(size),
      })),
    },
  ];

  return (
    <Block
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      width="100%"
    >
      <Block display="flex" alignItems="center" gap={FOUNDATION_THEME.unit[8]}>
        <PrimitiveText
          as="span"
          fontSize={
            tableToken.dataTable.table.footer.pagination.pageText.fontSize
          }
          color={tableToken.dataTable.table.footer.pagination.pageText.color}
        >
          Rows per page:
        </PrimitiveText>

        <Menu
          alignment={MenuAlignment.START}
          enableSearch={false}
          items={pageSizeMenuItems}
          trigger={
            <PrimitiveButton
              contentCentered
              gap={
                tableToken.dataTable.table.footer.pagination.pageSizeSelector
                  .gap
              }
              paddingX={
                tableToken.dataTable.table.footer.pagination.pageSizeSelector
                  .padding
              }
              paddingY={
                tableToken.dataTable.table.footer.pagination.pageSizeSelector
                  .padding
              }
              border="none"
              borderRadius={
                tableToken.dataTable.table.footer.pagination.pageSizeSelector
                  .borderRadius
              }
              backgroundColor={
                tableToken.dataTable.table.footer.pagination.pageSizeSelector
                  .backgroundColor
              }
              _hover={{
                backgroundColor:
                  tableToken.dataTable.table.footer.pagination.pageSizeSelector
                    .hoverColor,
              }}
              color={FOUNDATION_THEME.colors.gray[600]}
              disabled={isLoading}
              style={{
                fontSize: FOUNDATION_THEME.font.size.body.md.fontSize,
              }}
            >
              {pageSize}
            </PrimitiveButton>
          }
        />

        {isLoading && (
          <Block
            display="flex"
            alignItems="center"
            gap={FOUNDATION_THEME.unit[4]}
          >
            <Loader2
              size={FOUNDATION_THEME.unit[16]}
              className="animate-spin"
            />
            <PrimitiveText
              as="span"
              fontSize={FOUNDATION_THEME.font.size.body.sm.fontSize}
              color={FOUNDATION_THEME.colors.gray[500]}
            >
              Loading...
            </PrimitiveText>
          </Block>
        )}
      </Block>

      <Block
        display="flex"
        alignItems="center"
        gap={tableToken.dataTable.table.footer.pagination.pageNavigation.gap}
      >
        <PrimitiveButton
          contentCentered
          size={32}
          backgroundColor="transparent"
          borderRadius={FOUNDATION_THEME.border.radius[2]}
          color={
            currentPage === 1
              ? FOUNDATION_THEME.colors.gray[300]
              : FOUNDATION_THEME.colors.gray[600]
          }
          disabled={currentPage === 1 || isLoading}
          onClick={() => onPageChange(currentPage - 1)}
          aria-label="Previous page"
          _hover={{
            backgroundColor:
              currentPage === 1
                ? "transparent"
                : FOUNDATION_THEME.colors.gray[50],
          }}
        >
          <ArrowLeft size={FOUNDATION_THEME.unit[16]} />
        </PrimitiveButton>

        <Block
          display="flex"
          alignItems="center"
          gap={FOUNDATION_THEME.unit[4]}
        >
          {pageNumbers.map((page, index) =>
            typeof page === "number" ? (
              <PrimitiveButton
                key={index}
                contentCentered
                minWidth={32}
                height={32}
                backgroundColor={
                  currentPage === page
                    ? FOUNDATION_THEME.colors.gray[100]
                    : "transparent"
                }
                color={
                  currentPage === page
                    ? FOUNDATION_THEME.colors.gray[700]
                    : FOUNDATION_THEME.colors.gray[600]
                }
                borderRadius={FOUNDATION_THEME.border.radius[8]}
                disabled={isLoading}
                onClick={() => onPageChange(page)}
                _hover={{
                  backgroundColor:
                    currentPage === page
                      ? FOUNDATION_THEME.colors.gray[100]
                      : FOUNDATION_THEME.colors.gray[50],
                }}
                style={{
                  fontSize: FOUNDATION_THEME.font.size.body.sm.fontSize,
                }}
              >
                {page}
              </PrimitiveButton>
            ) : (
              <PrimitiveText
                as="span"
                key={index}
                fontSize={FOUNDATION_THEME.font.size.body.sm.fontSize}
                color={FOUNDATION_THEME.colors.gray[400]}
                padding={FOUNDATION_THEME.unit[4]}
              >
                {page}
              </PrimitiveText>
            ),
          )}
        </Block>

        <PrimitiveButton
          contentCentered
          size={32}
          backgroundColor="transparent"
          borderRadius={FOUNDATION_THEME.border.radius[2]}
          color={
            currentPage === totalPages
              ? FOUNDATION_THEME.colors.gray[300]
              : FOUNDATION_THEME.colors.gray[600]
          }
          disabled={currentPage === totalPages || isLoading}
          onClick={() => onPageChange(currentPage + 1)}
          aria-label="Next page"
          _hover={{
            backgroundColor:
              currentPage === totalPages
                ? "transparent"
                : FOUNDATION_THEME.colors.gray[50],
          }}
        >
          <ArrowRight size={FOUNDATION_THEME.unit[16]} />
        </PrimitiveButton>
      </Block>
    </Block>
  );
}
