import { CSSObject } from 'styled-components';
import { FoundationTokenType } from '../../tokens/theme.token';
export type TableTokenType = {
    padding: CSSObject['padding'];
    width: CSSObject['width'];
    display: CSSObject['display'];
    flexDirection: CSSObject['flexDirection'];
    position: CSSObject['position'];
    header: {
        display: CSSObject['display'];
        justifyContent: CSSObject['justifyContent'];
        alignItems: CSSObject['alignItems'];
        marginBottom: CSSObject['marginBottom'];
        gap: CSSObject['gap'];
        maxWidth: CSSObject['maxWidth'];
        overflowX: CSSObject['overflowX'];
        title: CSSObject;
        description: CSSObject;
        headerSlot1: CSSObject;
        headerSlot2: CSSObject;
        headerSlot3: CSSObject;
    };
    dataTable: {
        borderRadius: CSSObject['borderRadius'];
        border: CSSObject['border'];
        maxHeight: CSSObject['maxHeight'];
        minHeight: CSSObject['minHeight'];
        bulkActions: {
            top: CSSObject['top'];
            left: CSSObject['left'];
            transform: CSSObject['transform'];
            zIndex: CSSObject['zIndex'];
            backgroundColor: CSSObject['backgroundColor'];
            color: CSSObject['color'];
            borderRadius: CSSObject['borderRadius'];
            padding: CSSObject['padding'];
            boxShadow: CSSObject['boxShadow'];
            display: CSSObject['display'];
            alignItems: CSSObject['alignItems'];
            gap: CSSObject['gap'];
            minWidth: CSSObject['minWidth'];
            border: CSSObject['border'];
            selectText: CSSObject;
        };
        table: {
            width: CSSObject['width'];
            tableLayout: CSSObject['tableLayout'];
            borderCollapse: CSSObject['borderCollapse'];
            borderSpacing: CSSObject['borderSpacing'];
            position: CSSObject['position'];
            minWidth: CSSObject['minWidth'];
            header: {
                backgroundColor: CSSObject['backgroundColor'];
                borderBottom: CSSObject['borderBottom'];
                height: CSSObject['height'];
                row: CSSObject;
                cell: CSSObject;
                sortable: {
                    cursor: CSSObject['cursor'];
                    userSelect: CSSObject['userSelect'];
                };
            };
            body: {
                backgroundColor: CSSObject['backgroundColor'];
                borderTop: CSSObject['borderTop'];
                row: CSSObject;
                cell: {
                    padding: CSSObject['padding'];
                    fontWeight: CSSObject['fontWeight'];
                    color: CSSObject['color'];
                    fontSize: CSSObject['fontSize'];
                    borderTop: CSSObject['borderTop'];
                    expandable: {
                        padding: CSSObject['padding'];
                        borderTop: CSSObject['borderTop'];
                        expandButton: {
                            display: CSSObject['display'];
                            alignItems: CSSObject['alignItems'];
                            justifyContent: CSSObject['justifyContent'];
                            width: CSSObject['width'];
                            height: CSSObject['height'];
                            borderRadius: CSSObject['borderRadius'];
                            backgroundColor: CSSObject['backgroundColor'];
                            cursor: CSSObject['cursor'];
                            transition: CSSObject['transition'];
                            color: CSSObject['color'];
                            border: CSSObject['border'];
                            '&:hover': CSSObject['&:hover'];
                        };
                    };
                };
            };
            footer: {
                display: CSSObject['display'];
                justifyContent: CSSObject['justifyContent'];
                alignItems: CSSObject['alignItems'];
                padding: CSSObject['padding'];
                borderTop: CSSObject['borderTop'];
                height: CSSObject['height'];
                position: CSSObject['position'];
                bottom: CSSObject['bottom'];
                backgroundColor: CSSObject['backgroundColor'];
                zIndex: CSSObject['zIndex'];
                flexShrink: CSSObject['flexShrink'];
                pagination: {
                    pageText: {
                        fontSize: CSSObject['fontSize'];
                        color: CSSObject['color'];
                    };
                    pageSizeSelector: {
                        gap: CSSObject['gap'];
                        padding: CSSObject['padding'];
                        borderRadius: CSSObject['borderRadius'];
                        display: CSSObject['display'];
                        alignItems: CSSObject['alignItems'];
                        backgroundColor: CSSObject['backgroundColor'];
                        border: CSSObject['border'];
                        background: CSSObject['background'];
                        cursor: CSSObject['cursor'];
                        color: CSSObject['color'];
                        fontSize: CSSObject['fontSize'];
                        hoverColor: CSSObject['backgroundColor'];
                    };
                    pageNavigation: {
                        gap: CSSObject['gap'];
                    };
                };
            };
        };
    };
};
export declare const getTableToken: (foundationToken: FoundationTokenType) => TableTokenType;
