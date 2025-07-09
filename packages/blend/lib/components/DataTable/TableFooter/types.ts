import { PaginationConfig } from "../types";

export type TableFooterProps = {
  pagination?: PaginationConfig;
  currentPage: number;
  pageSize: number;
  totalRows: number;
  isLoading?: boolean;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
};
