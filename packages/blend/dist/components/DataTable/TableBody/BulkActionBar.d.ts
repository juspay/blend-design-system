export type BulkActionBarProps = {
    selectedCount: number;
    onExport: () => void;
    onDeselectAll: () => void;
    customActions?: React.ReactNode;
};
declare const BulkActionBar: import('react').ForwardRefExoticComponent<BulkActionBarProps & import('react').RefAttributes<HTMLDivElement>>;
export default BulkActionBar;
