type DataTablePaginationProps = {
    currentPage: number;
    pageSize: number;
    totalRows: number;
    pageSizeOptions: number[];
    isLoading?: boolean;
    onPageChange: (page: number) => void;
    onPageSizeChange: (pageSize: number) => void;
};
export declare function DataTablePagination({ currentPage, pageSize, totalRows, pageSizeOptions, isLoading, onPageChange, onPageSizeChange, }: DataTablePaginationProps): import("react/jsx-runtime").JSX.Element;
export {};
