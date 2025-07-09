import { CSSObject } from 'styled-components';
import { FoundationTokenType } from '../../tokens/theme.token';
export type CalendarTokenType = {
    quickRange: {
        width: CSSObject["width"];
        trigger: {
            height: CSSObject["height"];
            borderLeft: CSSObject["borderLeft"];
            borderTop: CSSObject["borderTop"];
            borderBottom: CSSObject["borderBottom"];
            borderTopLeftRadius: CSSObject["borderTopLeftRadius"];
            borderBottomLeftRadius: CSSObject["borderBottomLeftRadius"];
            padding: CSSObject["padding"];
            display: CSSObject["display"];
            justifyContent: CSSObject["justifyContent"];
            alignItems: CSSObject["alignItems"];
            cursor: CSSObject["cursor"];
            width: CSSObject["width"];
            backgroundColor: CSSObject["backgroundColor"];
            iconSize: CSSObject["iconSize"];
            text: CSSObject;
        };
        content: {
            padding: CSSObject["padding"];
            width: CSSObject["width"];
            zIndex: CSSObject["zIndex"];
            backgroundColor: CSSObject["backgroundColor"];
            borderRadius: CSSObject["borderRadius"];
            boxShadow: CSSObject["boxShadow"];
            overflowY: CSSObject["overflowY"];
            overflowX: CSSObject["overflowX"];
        };
        item: {
            width: CSSObject["width"];
            textAlign: CSSObject["textAlign"];
            padding: CSSObject["padding"];
            borderRadius: CSSObject["borderRadius"];
            transition: CSSObject["transition"];
            cursor: CSSObject["cursor"];
            border: CSSObject["border"];
            backgroundColor: CSSObject["backgroundColor"];
            display: CSSObject["display"];
            active: CSSObject;
            text: CSSObject;
            "&:hover": CSSObject;
            "&:focus": CSSObject;
            "&[data-highlighted]": CSSObject;
        };
    };
    trigger: {
        height: CSSObject["height"];
        display: CSSObject["display"];
        alignItems: CSSObject["alignItems"];
        justifyContent: CSSObject["justifyContent"];
        padding: CSSObject["padding"];
        border: CSSObject["border"];
        borderRadius: CSSObject["borderRadius"];
        boxShadow: CSSObject["boxShadow"];
        backgroundColor: CSSObject["backgroundColor"];
        fontSize: CSSObject["fontSize"];
        color: CSSObject["color"];
        cursor: CSSObject["cursor"];
        disabled: {
            opacity: CSSObject["opacity"];
            cursor: CSSObject["cursor"];
        };
        borderRadiusWithPresets: CSSObject["borderRadius"];
        borderRadiusWithoutPresets: CSSObject["borderRadius"];
    };
    calendar: {
        minWidth: CSSObject["minWidth"];
        width: CSSObject["width"];
        backgroundColor: CSSObject["backgroundColor"];
        border: CSSObject["border"];
        borderRadius: CSSObject["borderRadius"];
        boxShadow: CSSObject["boxShadow"];
        zIndex: CSSObject["zIndex"];
        inputs: {
            padding: CSSObject["padding"];
            dateInput: {
                gap: CSSObject["gap"];
                label: {
                    color: CSSObject["color"];
                    minWidth: CSSObject["minWidth"];
                };
            };
        };
        calendarGrid: {
            container: {
                maxHeight: CSSObject["maxHeight"];
                overflowY: CSSObject["overflowY"];
                overflow: CSSObject["overflow"];
                position: CSSObject["position"];
            };
            month: {
                header: {
                    fontSize: CSSObject["fontSize"];
                    fontWeight: CSSObject["fontWeight"];
                    color: CSSObject["color"];
                    padding: CSSObject["padding"];
                };
                container: {
                    position: CSSObject["position"];
                    height: CSSObject["height"];
                };
            };
            week: {
                row: {
                    display: CSSObject["display"];
                    gridTemplateColumns: CSSObject["gridTemplateColumns"];
                    padding: CSSObject["padding"];
                };
                header: {
                    display: CSSObject["display"];
                    gridTemplateColumns: CSSObject["gridTemplateColumns"];
                    textAlign: CSSObject["textAlign"];
                    color: CSSObject["color"];
                    padding: CSSObject["padding"];
                    position: CSSObject["position"];
                    top: CSSObject["top"];
                    zIndex: CSSObject["zIndex"];
                    backgroundColor: CSSObject["backgroundColor"];
                    boxShadow: CSSObject["boxShadow"];
                };
                dayName: {
                    padding: CSSObject["padding"];
                };
            };
            day: {
                cell: {
                    cursor: CSSObject["cursor"];
                    textAlign: CSSObject["textAlign"];
                    padding: CSSObject["padding"];
                    position: CSSObject["position"];
                    fontWeight: CSSObject["fontWeight"];
                    boxSizing: CSSObject["boxSizing"];
                    border: CSSObject["border"];
                };
                hover: {
                    border: CSSObject["border"];
                    borderRadius: CSSObject["borderRadius"];
                };
                empty: {
                    padding: CSSObject["padding"];
                };
                states: {
                    startDate: CSSObject;
                    endDate: CSSObject;
                    singleDate: CSSObject;
                    rangeDay: CSSObject;
                    todayDay: CSSObject;
                    hoverState: CSSObject;
                    disabledDay: CSSObject;
                };
                text: {
                    dayNumber: CSSObject;
                    selectedDay: CSSObject;
                    rangeDay: CSSObject;
                    todayDay: CSSObject;
                };
                todayIndicator: {
                    position: CSSObject["position"];
                    width: CSSObject["width"];
                    height: CSSObject["height"];
                    backgroundColor: CSSObject["backgroundColor"];
                    borderRadius: CSSObject["borderRadius"];
                    bottom: CSSObject["bottom"];
                    left: CSSObject["left"];
                    transform: CSSObject["transform"];
                };
            };
        };
        footer: {
            padding: CSSObject["padding"];
            borderTop: CSSObject["borderTop"];
            timerange: {
                gap: CSSObject["gap"];
                color: CSSObject["color"];
                fontWeight: CSSObject["fontWeight"];
                fontSize: CSSObject["fontSize"];
            };
            button: {
                gap: CSSObject["gap"];
            };
        };
    };
};
export declare const getCalendarToken: (foundationToken: FoundationTokenType) => CalendarTokenType;
