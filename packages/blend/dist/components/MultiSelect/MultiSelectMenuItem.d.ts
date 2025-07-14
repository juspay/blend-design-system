import { MultiSelectMenuItemType } from './types';
declare const MultiSelectMenuItem: {
    ({ item, onSelect, selected, }: {
        item: MultiSelectMenuItemType;
        onSelect: (value: string) => void;
        selected: string[];
    }): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
export default MultiSelectMenuItem;
